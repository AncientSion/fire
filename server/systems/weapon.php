<?php

class Weapon extends System {
	public $weapon = 1;
	public $minDmg;
	public $maxDmg;
	public $accDecay;
	public $exploSize;
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
		if ($w <= 60){$this->armourMod = 0.8;}
		else if ($w <= 120){$this->armourMod = 0.6;}
		else if ($w <= 360){$this->armourMod = 0.4;}
	}

	public function getTraverseMod($fire){
		//Debug::log("this: ".$this->traverse);
		//Debug::log("target: ".$fire->target->traverse);
		return max(0, $this->traverse - $fire->target->traverse);
	}

	public function rollToHit($fire){
		for ($i = 0; $i < $this->shots; $i++){
			$roll = mt_rand(1, 100);
			$fire->rolls[] = $roll;
			$fire->notes = $fire->notes." ".$roll;
			if ($roll <= $fire->req){
				$fire->hits++;
			}
		}
		return true;
	}

	public function determineDamage($totalDmg, $negation){
		$shieldDmg = 0;
		$armourDmg = 0;
		$structDmg = 0;
		$notes = "";

		if ($totalDmg <= $negation){ 
			$notes = "block";
			$armourDmg = round($totalDmg/2);
		}
		else {
			$notes = "pen";
			$armourDmg = round(min($totalDmg, $negation));
			$structDmg = round($totalDmg - $armourDmg);
		}

		return new Divider($shieldDmg * $this->linked, $armourDmg * $this->linked, $structDmg * $this->linked, $notes);
	}

	public function doDamage($fire, $roll, $system){
		Debug::log("doDamage, weapon: ".(get_class($this)).", target: ".$fire->target->id."/".$system->id);

		$destroyed = false;
		$totalDmg = floor($this->getBaseDamage($fire) * $this->getDamageMod($fire));
		$remInt = $system->getRemainingIntegrity();

		if ($remInt == 0){
			Debug::log("applying damage to destroyed unit: ".$system->isDestroyed());
		}
		$negation = $fire->target->getArmourValue($fire, $system);
		$dmg = $this->determineDamage($totalDmg, $negation);
		$overkill = 0;

		if ($remInt - $dmg->structDmg < 1){
			$destroyed = true;
			$name = get_class($system);
			if ($fire->target->ship){
				$overkill = abs($remInt - $dmg->structDmg);
				$dmg->structDmg = $remInt;
				Debug::log(" => OK ship target system ".$name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->structDmg.", OK for: ".$overkill." dmg");
			}
			else {
				Debug::log(" => overkilling non-ship target system ".$name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->structDmg);
			}
		}

		$dmg = new Damage(
			-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $roll, $fire->weapon->type,
			$totalDmg, $dmg->shieldDmg, $dmg->structDmg, $dmg->armourDmg, $overkill, $negation, $destroyed, $dmg->notes, 1
		);
		$fire->damages[] = $dmg;
		$fire->target->applyDamage($dmg);	
	}

	public function getAccuracyLoss($fire){
		return ceil($this->accDecay * $fire->weapon->getAccuracyMod($fire) * $fire->dist / 1000);
	}

	public function getAccuracyMod($fire){
		$mod = 1;
		$mod += $this->getCritMod("Accuracy", $fire->turn);
		$mod -= $this->getBoostEffect("Accuracy")* $this->getBoostLevel($fire->turn);

		if ($mod != 1){Debug::log("weapon id: ".$this->id.", RANGE LOSS mod: ".$mod);}
		return $mod;
	}

	public function getDmgPenaltyRange($fire){
		return 0;
	}

	public function getBaseDamage($fire){
		return mt_rand($this->getMinDamage(), $this->getMaxDamage());
	}

	public function getDamageMod($fire){
		$mod = 1;

		$crit = $this->getCritMod("Damage", $fire->turn);
		$boost = $this->getBoostEffect("Damage")* $this->getBoostLevel($fire->turn);
		$range = $this->getDmgPenaltyRange($fire);

		$mod = $mod + $crit + $boost + $range;
		if ($mod != 1){Debug::log("weapon id: ".$this->id.", DAMAGE mod: ".($crit + $boost + $range)." (crits: ".$crit.", boost: ".$boost.". range: ".$range.")");
		}
		return $mod;
	}

	public function getBoostEffect($type){
		for ($i = 0; $i < sizeof($this->boostEffect); $i++){
			if ($this->boostEffect[$i]->type == $type){
				//Debug::log("return:".$this->boostEffect[$i]->value/100);
				return $this->boostEffect[$i]->value;
			}
		}
		return 0;
	}

	public function getCritMod($type, $turn){
		$mod = 0;
		for ($i = 0; $i < sizeof($this->crits); $i++){
			switch ($this->crits[$i]->type){
				case $type: 
					$mod = $mod - $this->crits[$i]->value; break;
				default: break;
			}
		}
		return $mod;
	}

	public function getBoostLevel($turn){
		$boost = 0;
		for ($i = sizeof($this->powers)-1; $i >= 0; $i--){
			if ($this->powers[$i]->turn == $turn){
				switch ($this->powers[$i]->type){
					case 1: 
					$boost++;
					break;
				}
			}
			else break;
		}
		//if ($boost){Debug::log("power boost level: ".$boost);}
		return $boost;
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

	public function getValidEffects(){
		return array(// attr, %-tresh, duration, modifier
			array("Disabled", 80, 1, 0),
			array("Damage", 30, 0, 0),
			array("Accuracy", 30, 0, 0)
		);
	}
}

?>