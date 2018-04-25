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
	public $priority = 0;

	public $particle = 0;
	public $laser = 0;
	public $plasma = 0;
	public $pulse = 0;
	public $usage = 2;
	public $aoe = 0;

	public $melt = 0;
	public $dmgLoss = 0;
	public $flashDiv;

	public $em = 0;
	public $fireMode = "Standard";
	public $dmgType = "Standard";

	function __construct($id, $parentId, $start, $end, $output, $width){
		$this->start = $start;
		$this->end = $end;
		$this->priority = static::$prio;
		//Debug::log("setting priority to: ".$this->priority.", from static: ".static::$prio);
        parent::__construct($id, $parentId, $output, $width);
	}

	public function setArmourData($rem){
   		$w = Math::getArcWidth($this);
		if ($w <= 60){$this->armourMod = 0.75; $this->mount = "Fixed";}
		else if ($w <= 120){$this->armourMod = 0.6; $this->mount = "Embedded";}
		else if ($w <= 360){$this->armourMod = 0.45; $this->mount = "Turret";}
		$this->armour = floor($rem * $this->armourMod);
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
		$base = $this->getBaseDamage($fire);
		$mod = $this->getDamageMod($fire);
		$range = $this->getDmgRangeMod($fire);

		//Debug::log("base: ".$base.", mod: ".$mod.", range: ".$range);
		return floor($base*$mod*$range);

		return floor($this->getBaseDamage($fire) * $this->getDamageMod($fire) * $this->getDmgRangeMod($fire));
	}
	
	public function getBaseDamage($fire){
		return mt_rand($this->getMinDamage(), $this->getMaxDamage());
	}

	public function setFlashData(){
		$data = array(1, 2, 6, 10);
		$this->flashDiv = array(40, 60);

		for ($i = 0; $i < sizeof($data); $i++){
			$this->dmgs[$i] = $data[$i] * $this->minDmg;
		}
		
		$this->notes[] = "<u>Salvo</u>: ".$this->dmgs[0]." dmg / unit";
		$this->notes[] = "<u>Flight</u>: ".$this->dmgs[1]." dmg / unit";
		$this->notes[] = "<u>Squadron</u>: ".$this->dmgs[2]." dmg / unit";

		$html = "<u>Ship</u></br>";
		$html .= $this->dmgs[3]." (+".floor($this->dmgs[3]*0.5)." per target size) damage</br>";
		$html .= $this->flashDiv[0]."% directed towards main structure</br>";
		$html .= $this->flashDiv[1]."% evenly divided directed towards each facing system. Overkill applies.</br>";
	
		$this->notes[] = $html;
		$this->maxDmg = $this->dmgs[3];
	}

	public function getFlashBaseDamage($fire){
		if ($fire->target->ship){
			return floor($this->dmgs[3] + $this->dmgs[3]*0.5 * $fire->target->traverse);
		} else if ($fire->target->squad){
			return $this->dmgs[2];
		} else if ($fire->target->flight){
			return $this->dmgs[1];
		} else if ($fire->target->salvo){
			return $this->dmgs[0];
		}

		Debug::log("getFlashBaseDamage DMG error");
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
		//if ($mod != 1){Debug::log(get_class($this).", weapon id: ".$this->id.", DAMAGE mod: ".(-$crit + $boost )." (crits: ".$crit.", boost: ".$boost.")");}
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