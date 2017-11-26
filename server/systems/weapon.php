<?php

class Weapon extends System {
	public $weapon = 1;
	public $minDmg;
	public $maxDmg;
	public $accDecay;
	public $shots = 1;
	public $guns = 1;
	public $reload = 1;
	public $powerReq = 2;
	public $fireOrders = array();
	public $priority;
	public $traverse = 0;
	public $projSize = 10;
	public $projSpeed = 5;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
		$this->start = $start;
		$this->end = $end;
        parent::__construct($id, $parentId, $output, $destroyed);
	}

	public function getArcWidth(){
		$w = 0;
		if ($this->start < $this->end){ $w = $this->end - $this->start;}
		else if ($this->start > $this->end){ $w += 360 - $this->start; $w += $this->end;}		
		return $w;
	}

	public function setArmourMod(){
		$w = $this->getArcWidth();
		if ($w <= 60){$this->armourMod = 0.75;}
		else if ($w <= 120){$this->armourMod = 0.6;}
		else if ($w <= 360){$this->armourMod = 0.45;}
	}

	public function getCritModMax($dmg){
		return min(0.3, (round($dmg/20)/10)) - (mt_rand(0, 1) * 0.1); // round to 0.x, half % mod, 0.1 variance
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
			$notes = "block";
			$shieldDmg = round(min($totalDmg, $negation["bonus"]));
			$armourDmg = round(min($totalDmg-$shieldDmg, $negation["stock"])/2);
		}
		else {
			$notes = "pen";
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
		$destroyed = 0;
		$totalDmg = $this->getTotalDamage($fire);
		$overkill = 0;
		$okSystem = 0;
		$remInt = $system->getRemainingIntegrity();
		
		$negation = $fire->target->getArmour($fire, $system);
		$dmg = $this->determineDamage($totalDmg, $negation);

		Debug::log("doDamage, weapon: ".(get_class($this)).", target #".$fire->target->id."/".$system->id."/".get_class($system).", totalDmg: ".$totalDmg.", remaining: ".$remInt.", armour: ".$negation["stock"]."+".$negation["bonus"]);

		if ($remInt - $dmg->structDmg < 1){
			$destroyed = 1;
			$name = get_class($system);
			$okSystem = $fire->target->getOverKillSystem($fire);

			if ($okSystem){
				$overkill = abs($remInt - $dmg->structDmg);
				$dmg->structDmg = $remInt;
				Debug::log(" => OVERKILL ship target system ".$name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->structDmg.", OK for: ".$overkill." dmg");
			}
			else {
				Debug::log(" => destroying non-ship target system ".$name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->structDmg);
			}
		}

		$entry = new Damage(
			-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $roll, $fire->weapon->type,
			$totalDmg, $dmg->shieldDmg, $dmg->structDmg, $dmg->armourDmg, $overkill, $negation["stock"], $destroyed, $dmg->notes, 1
		);
		$fire->damages[] = $entry;
		$fire->target->applyDamage($entry);	
	}

	public function getAccuracyLoss($fire){
		if (!$fire->dist){return 0;}
		if ($fire->shooter->flight){
			//Debug::log("fire id #".$fire->id." dist: ".$fire->dist);
		}
		return ceil($this->accDecay * $fire->weapon->getAccuracyMod($fire) * $fire->dist / 1000);
	}

	public function getAccuracyMod($fire){
		$mod = 1;
		$mod += $this->getCritMod("Accuracy", $fire->turn);
		$mod -= $this->getBoostEffect("Accuracy")* $this->getBoostLevel($fire->turn);

		if ($mod != 1){Debug::log("weapon id: ".$this->id.", RANGE LOSS mod: ".$mod);}
		return $mod;
	}

	public function getDmgRangeMod($fire){
		return 1;
	}

	public function getBaseDamage($fire){
		return mt_rand($this->getMinDamage(), $this->getMaxDamage());
	}

	public function getDamageMod($fire){
		$mod = 1;

		$crit = $this->getCritMod("Damage", $fire->turn);
		$boost = $this->getBoostEffect("Damage") * $this->getBoostLevel($fire->turn);

		$mod = $mod + $crit + $boost;
		if ($mod != 1){Debug::log(get_class($this).", weapon id: ".$this->id.", DAMAGE mod: ".($crit + $boost )." (crits: ".$crit.", boost: ".$boost.")");
		}
		return $mod;
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