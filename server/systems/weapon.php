<?php

class Weapon extends System {
	public $weapon = 1;
	public $decayVar = 1000;
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
	public $fc = array(0 => 100, 1 => 100);

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
		if ($w <= 60){$this->armourMod = 0.9;}
		else if ($w <= 120){$this->armourMod = 0.7;}
		else if ($w <= 360){$this->armourMod = 0.5;}
	}

	public function getTraverseMod($fire){
		//Debug::log("this: ".$this->traverse);
		//Debug::log("target: ".$fire->target->traverse);
		return max(0, $this->traverse - $fire->target->traverse);
	}

	public function getCritEffects(){
		return array("range1", "damage1", "range2", "damage2", "disabled");
	}

	public function getCritTreshs(){
		return array(20, 30, 45, 55, 80);
	}

	public function getCritDuration(){
		return array(0, 0, 0, 0, 1);
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

		if ($totalDmg <= $negation*0.75){ 
			$armourDmg = ceil($totalDmg/2);
		}
		else if ($totalDmg <= $negation){ 
			$armourDmg = ceil($totalDmg);
		}
		else {
			$armourDmg = ceil(min($totalDmg, $negation));
			$structDmg = ceil($totalDmg - $armourDmg);
		}

		return new Divider($shieldDmg * $this->linked, $armourDmg * $this->linked, $structDmg * $this->linked);
	}

	public function doDamage($fire, $roll, $system){
		Debug::log("doDamage, weapon: ".get_class($this).", target: ".$fire->target->id."/".$system->id);

		$destroyed = false;
		$totalDmg = floor($this->getBaseDamage($fire) * $this->getDamageMod($fire));
		$remInt = $system->getCurrentIntegrity();
		$negation = $fire->target->getArmourValue($fire, $system);
		$dmg = $this->determineDamage($totalDmg, $negation);

		if ($remInt - $dmg->structDmg < 1){
			$destroyed = true;
			Debug::log(" => target system ".$system->name." #".$system->id." DESTROYED ----  rem: ".$remInt.", doing: ".$dmg->structDmg.", OK for: ".(abs($remInt - $dmg->structDmg)." dmg"));
		}

		$dmg = new Damage(
			-1,
			$fire->id,
			$fire->gameid,
			$fire->targetid,
			$fire->section,
			$system->id,
			$fire->turn,
			$roll,
			$fire->weapon->type,
			$totalDmg,
			$dmg->shieldDmg,
			$dmg->structDmg,
			$dmg->armourDmg,
			0,
			$negation,
			$destroyed,
			"",
			1
		);
		$fire->damages[] = $dmg;
		$fire->target->applyDamage($dmg);
	}

	public function getAccLoss($dist){
		$mod = 1;
		for ($i = 0; $i < sizeof($this->crits); $i++){
			switch ($this->crits[$i]->type){
				case "range1": 
					$mod = $mod + 0.1;
					break;
				case "range2":
					$mod = $mod + 0.2;
					break;
			}
		}
		//if ($mod != 1){Debug::log("weapon id: ".$this->id.", ACCURAVY mod: ".$mod);}
		return ceil(($this->accDecay * $mod) * $dist / $this->decayVar);
	}

	public function getDmgPenaltyRange($fire){
		return 0;
	}

	public function getBaseDamage($fire){
		return mt_rand($this->getMinDamage(), $this->getMaxDamage());
	}

	public function getDamageMod($fire){
		$mod = 1;

		$crit = $this->getCritMod($fire->turn);
		$boost = $this->getBoostLevel($fire->turn) * $this->getBoostDamageEffect();
		$range = $this->getDmgPenaltyRange($fire);

		//if ($crit || $boost || $range){Debug::log(" => total mod: ".($crit + $boost + $range)." (crits: ".$crit.", boost: ".$boost.". range: ".$range.")");}
		return $mod + $crit + $boost + $range;
	}

	public function getBoostDamageEffect(){
		return 0.25;
	}

	public function getCritMod($turn){
		$mod = 0;
		for ($i = 0; $i < sizeof($this->crits); $i++){
			switch ($this->crits[$i]->type){
				case "damage1": 
					$mod -= 0.1;
					break;
				case "damage2":
					$mod -= 0.2;
					break;
			}
		}
		//if ($mod){Debug::log("crit mod level: ".$mod);}
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
}

?>