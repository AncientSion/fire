<?php

class Weapon extends System {
	public $weapon = 1;
	public $shots = 1;
	public $guns = 1;
	public $reload = 1;
	public $powerReq = 2;
	public $fireOrders = array();
	public $arc = array();
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

	public $amBonus = 0;
	public $amMax = 0;

	public $em = 0;
	public $fireMode = "Standard";
	public $dmgType = "Standard";

	function __construct($id, $parentId, $start, $end, $output, $width){
		$this->arc = array(0 => array($start, $end));
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

	public function getTotalDamage($fire, $hit){
		$base = $this->getBaseDamage($fire, $hit);
		$bonus = $this->getBonusDamage($fire, $base, $hit);
		$mod = $this->getDamageMod($fire);
		$range = $this->getDmgRangeMod($fire);

		Debug::log("base: ".$base.", bonus: ".$bonus.", mod: ".$mod.", range: ".$range);
		return floor(($base+$bonus)*$mod*$range);
	}
	
	public function getBaseDamage($fire, $hit){
		return mt_rand($this->getMinDamage(), $this->getMaxDamage());
	}
	
	public function getBonusDamage($fire, $baseDmg, $hit){
		return 0;
	}

	public function setFlashData(){
		$data = array(1, 2, 0, 6, 10, 15, 20);
		$this->flashDiv = array(40, 60);

		for ($i = 0; $i < sizeof($data); $i++){
			$this->dmgs[$i] = $data[$i] * $this->minDmg;
		}
		
		$this->notes[] = "<u>Salvo</u>: ".$this->dmgs[0]." dmg / unit";
		$this->notes[] = "<u>Flight</u>: ".$this->dmgs[1]." dmg / unit";
		$this->notes[] = "<u>Squadron</u>: ".$this->dmgs[3]." dmg / unit";

		$html = "<u>Ship</u></br>";
		$html .= $this->dmgs[4]." (+".floor($this->dmgs[4]*0.5)." per target size) damage</br>";
		$html .= $this->flashDiv[1]."% evenly divided directed towards each facing system. Overkill fully applies.</br>";
		$html .= $this->flashDiv[0]."% directed towards main structure</br>";
	
		$this->notes[] = $html;
		$this->maxDmg = $this->dmgs[sizeof($this->dmgs)-1];
	}

	public function setAntimatterData(){		
		$this->amBonus = 2;
		$this->amMax = 30;
		$this->notes[] = "<span class='yellow'>".$this->amBonus."</span> Points of extra damage for each 1 point of undercutting the required roll";
		$this->notes[] = "Extra damage is capped at <span class='yellow'>".$this->amMax."%</span> of base damage";
	}

	public function setEMData(){
        $this->notes = array("Deals only EM damage.", "EM damage dissipates at end of turn.", "Armour fully applies.", "EM Damage is 2x as effective when testing criticals.", "Fighters and Ballistics are disabled immediatly if EM > Full HP");
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
		return $this->shots + $this->getBoostEffect("Shots") * $this->getBoostLevel($turn);
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