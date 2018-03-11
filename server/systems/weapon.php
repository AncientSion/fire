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
	public $animation = "projectile";

	public $particle = 0;
	public $laser = 0;
	public $plasma = 0;
	public $pulse = 0;
	public $usage = 2;

	public $melt = 0;
	public $dmgLoss = 0;

	public $em = 0;
	public $fireMode = "Standard";
	public $dmgType = "Standard";

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
		$this->start = $start;
		$this->end = $end;
        parent::__construct($id, $parentId, $output, $width);
	}

	public function setArmourData($rem){
   		$w = Math::getArcWidth($this);
		if ($w <= 60){$this->armourMod = 0.75; $this->mount = "Fixed";}
		else if ($w <= 120){$this->armourMod = 0.6; $this->mount = "Embedded";}
		else if ($w <= 360){$this->armourMod = 0.45; $this->mount = "Turret";}
		$this->armour = floor($rem * $this->armourMod);
	}

	public function setFlashData(){
		$this->maxDmg = $this->minDmg * $this->dmgs[2];
		for ($i = 0; $i < sizeof($this->dmgs); $i++){
			$this->dmgs[$i] *= $this->minDmg;
		}
		
		$this->notes[] = "Fixed damage based on target";
		$this->notes[] = "<b>Salvo</b>: ".$this->dmgs[0]." dmg / unit";
		$this->notes[] = "<b>Flight</b>: ".$this->dmgs[1]." dmg / unit";
		$this->notes[] = "<b>Squadron</b>: ".$this->dmgs[2]." dmg / unit";
		$this->notes[] = "<b>Ship</b>: ".$this->dmgs[3]." dmg to each system on facing side, ".$this->dmgs[3]." per target size to structure";
	}

	public function getCritModMax($dmg){
		return min(20, (round($dmg/20)*10));
	}
	
	public function getTraverseMod($fire){
		//Debug::log("this: ".$this->traverse);
		//Debug::log("target: ".$fire->target->traverse);
		return max(0, $this->traverse - $fire->target->traverse);
	}

	public function getTotalDamage($fire){
		return floor($this->getBaseDamage($fire) * $this->getDamageMod($fire) * $this->getDmgRangeMod($fire));
	}

	public function getBaseDamage($fire){
		return mt_rand($this->getMinDamage(), $this->getMaxDamage());
	}

	public function getFlashDamage($fire){
		if ($fire->target->ship){
			return $this->dmgs[3];
		} else if ($fire->target->squad){
			return $this->dmgs[2];
		} else if ($fire->target->flight){
			return $this->dmgs[1];
		} else if ($fire->target->salvo){
			return $this->dmgs[0];
		}

		Debug::log("getFlashDamage DMG error");
		return 1;
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

	public function getDamageMod($fire){
		$mod = 100;

		$boost = $this->getBoostEffect("Damage") * $this->getBoostLevel($fire->turn);
		$crit = $this->getCritMod("Damage", $fire->turn);

		$mod = $mod + $boost - $crit;
		if ($mod != 1){Debug::log(get_class($this).", weapon id: ".$this->id.", DAMAGE mod: ".(-$crit + $boost )." (crits: ".$crit.", boost: ".$boost.")");}
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

	public function postDmg($fire){
		return false;
	}
}

?>