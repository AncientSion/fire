<?php

class Weapon extends System {
	public $weapon = 1;
	public $shots = 1;
	public $guns = 1;
	public $reload = 1;
	public $powerReq = 2;
	public $fireOrders = array();
	public $traverse = 0;
	public $projSize = 10;
	public $projSpeed = 5;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
		$this->start = $start;
		$this->end = $end;
        parent::__construct($id, $parentId, $output, $destroyed);
	}

	public function setArmourMod(){
   		$w = Math::getArcWidth($this);
		if ($w <= 60){$this->armourMod = 0.75;}
		else if ($w <= 120){$this->armourMod = 0.6;}
		else if ($w <= 360){$this->armourMod = 0.45;}
	}

	public function getCritModMax($dmg){
		return min(20, (round($dmg/20)*10)) - (mt_rand(0, 1) * 10); // round to 0.x, half % mod, 0.1 variance
	}
	
	public function getTraverseMod($fire){
		//Debug::log("this: ".$this->traverse);
		//Debug::log("target: ".$fire->target->traverse);
		return max(0, $this->traverse - $fire->target->traverse);
	}
	
	public function determineDamage($totalDmg, $negation){
		$shieldDmg = 0;
		$armourDmg = 0;
		$structDmg = 0;
		$notes = "";

		if ($totalDmg <= array_sum($negation)){ 
			$notes = "b;";
			$shieldDmg = round(min($totalDmg, $negation["bonus"]));
			$armourDmg = round(min($totalDmg-$shieldDmg, $negation["stock"])/2);
		}
		else {
			$notes = "p;";
			$shieldDmg = round(min($totalDmg, $negation["bonus"]));
			$armourDmg = round(min($totalDmg-$shieldDmg, $negation["stock"]));
			$structDmg = round($totalDmg - $shieldDmg - $armourDmg);
		}

		return new Divider($shieldDmg * $this->linked, $armourDmg * $this->linked, $structDmg * $this->linked, $notes);
	}

	public function getTotalDamage($fire){
		return floor($this->getBaseDamage($fire) * $this->getDamageMod($fire) * $this->getDmgRangeMod($fire));
	}

	public function doDamage($fire, $roll, $system){
		//Debug::log("hitting: ".get_class($system));
		$destroyed = 0;
		$totalDmg = $this->getTotalDamage($fire);
		$okSystem = 0;
		$remInt = $system->getRemainingIntegrity();
		
		$negation = $fire->target->getArmour($fire, $system);
		
		$dmg = $this->determineDamage($totalDmg, $negation);
		$dmg = $system->setMaxDmg($fire, $dmg);

		Debug::log("fire #".$fire->id.", doDamage, weapon: ".(get_class($this)).", target #".$fire->target->id."/".$system->id."/".get_class($system).", totalDmg: ".$totalDmg.", remaining: ".$remInt.", armour: ".$negation["stock"]."+".$negation["bonus"]);

		if ($remInt - $dmg->structDmg < 1){
			$destroyed = 1;
			$name = get_class($system);
			$okSystem = $fire->target->getOverKillSystem($fire);

			if ($okSystem){
				$dmg->overkill += abs($remInt - $dmg->structDmg);
				$dmg->structDmg = $remInt;
				Debug::log(" => OVERKILL ship target system ".$name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->structDmg.", OK for: ".$dmg->overkill." dmg");
			}
			else {
				Debug::log(" => destroying non-ship target system ".$name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->structDmg);
			}
		}

		$entry = new Damage(
			-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $roll, $fire->weapon->type,
			$totalDmg, $dmg->shieldDmg, $dmg->structDmg, $dmg->armourDmg, $dmg->overkill, array_sum($negation), $destroyed, $dmg->notes, 1
		);
		$fire->target->applyDamage($entry);	
	}

	public function getAccuracyLoss($fire){
		if (!$fire->dist){return 0;}
		return ceil($this->accDecay * $fire->weapon->getAccuracyMod($fire) * $fire->dist / 1000);
	}

	public function getAccuracyMod($fire){
		$mod = 100;
		$mod += $this->getCritMod("Accuracy", $fire->turn);
		$mod -= $this->getBoostEffect("Accuracy")* $this->getBoostLevel($fire->turn);

		//if ($mod != 100){Debug::log("weapon id: ".$this->id.", RANGE LOSS mod: ".$mod);}
		return $mod / 100;
	}

	public function getDmgRangeMod($fire){
		return 1;
	}

	public function getBaseDamage($fire){
		return mt_rand($this->getMinDamage(), $this->getMaxDamage());
	}

	public function getDamageMod($fire){
		$mod = 100;

		$crit = $this->getCritMod("Damage", $fire->turn);
		$boost = $this->getBoostEffect("Damage") * $this->getBoostLevel($fire->turn);

		$mod = $mod + $crit + $boost;
		//if ($mod != 1){Debug::log(get_class($this).", weapon id: ".$this->id.", DAMAGE mod: ".($crit + $boost )." (crits: ".$crit.", boost: ".$boost.")");}
		return $mod / 100;
	}

	public function getShots($turn){
		return $this->shots;
	}

	public function getMinDamage(){
		return $this->minDmg;
	}

	public function getMaxDamage(){
		return $this->maxDmg;
	}
}

?>