<?php

class Weapon extends System {
	public $weapon = 1;
	public $shots = 1;
	public $guns = 1;
	public $reload = 1;
	public $powerReq = 2;
	public $fireOrders = array();
	public $arc = array();
	public $tracking = 0;
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

	public $critEffects =  array( // type, mag, dura, effect
		array("Accuracy", 100, 0, 0),
		array("Damage", 120, 0, 0),
		array("Destroyed", 180, 0, 1),
	);

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
	
	public function getTrackingMod($fire){
		//Debug::log("this: ".$this->tracking);
		//Debug::log("target: ".$fire->target->traverse);
		return max(0, $this->tracking - $fire->target->traverse);
	}

	public function getTotalDamage($fire, $hit, $system){
		$base = $this->getBaseDamage($fire, $hit, $system);
		$bonus = $this->getBonusDamage($fire, $base, $hit);
		$mod = $this->getDamageMod($fire);
		$range = $this->getDmgRangeMod($fire);

		Debug::log("base: ".$base.", bonus: ".$bonus.", mod: ".$mod.", range: ".$range);
		return max(0, floor(($base+$bonus)*$mod*$range));
	}
	
	public function getBaseDamage($fire, $hit, $system){
		return mt_rand($this->getMinDamage(), $this->getMaxDamage());
	}
	
	public function getBonusDamage($fire, $baseDmg, $hit){
		return 0;
	}

	public function setFlashData(){
		$data = array(100, 140, 50, 30, 20); // main target

		for ($i = 0; $i < sizeof($data); $i++){
			$this->dmgs[$i] = floor($data[$i] / 100 * $this->minDmg);
		}

		$this->notes[] = "Intial hit scores ".$this->dmgs[0]." damage against</br>target hull.";
		$this->notes[] = "</br><u>Squadron</u>";
		$this->notes[] = "Instead ".$this->dmgs[1]." damage";
		$this->notes[] = "</br><u>Ship</u>";
		$this->notes[] = "Facing systems: Either</br>".$this->dmgs[2].", ".$this->dmgs[3]." or ".$this->dmgs[4]." damage each, no overkill";
	}

	public function setShockData(){

		$this->dmgs[0] = ($this->minDmg . "-" . $this->maxDmg);
		$this->dmgs[1] = ($this->minDmg . "-" . $this->maxDmg);

		for ($i = 2; $i <= 6; $i++){
			$this->dmgs[$i] = (($this->minDmg*$i) . "-" . ($this->maxDmg*$i));
		}


		$this->notes[] = "<u>Salvo</u>: ".$this->dmgs[0]." damage each";
		$this->notes[] = "<u>Flight</u>: ".$this->dmgs[1]." damage each";
		$this->notes[] = "<u>Squadron</u>: ".$this->dmgs[3]." damage each";

		$html = "</br><u>Ship</u></br>";
		$html .= "Hull: ".$this->dmgs[4]." damage</br>Extra " .$this->dmgs[0]." damage per size > Medium</br>";
		$html .= "Facing systems: ".$this->dmgs[0]." damage each</br>No overkill";	
		$this->notes[] = $html;
		//$this->notes[] = "Armour applies, no Overkill";
	}

	public function setShockD1ata(){
		$data = array(1, 1, 2, 5, 9, 13, 17);

		for ($i = 0; $i < sizeof($data); $i++){
			$this->dmgs[$i] = $data[$i];
		}

		$this->notes[] = "<u>Salvo</u>: $data[0] hit each";
		$this->notes[] = "<u>Flight</u>: $data[1] hits each";
		$this->notes[] = "<u>Squadron</u>: $data[3] hits each";

		$html = "<u>Ship target</u></br>";
		$html .= "Hull is subject to $data[4] / $data[5] / $data[6] hits pending size.</br>";
		$html .= "Facing systems are subject to $data[1] - $data[2] hits each.";	
		$this->notes[] = $html;
		$this->notes[] = "Armour applies, no Overkill";
	}

	public function setShdockData(){
		$data = array(1, 2, 0, 5, 10, 15, 20);

		for ($i = 0; $i < sizeof($data); $i++){
			$this->dmgs[$i] = floor($data[$i] / 100 * $this->minDmg);
		}
		
		$this->notes[] = "<u>Salvo</u>: $data[0]% / $this->dmgs[0] hit each";
		$this->notes[] = "<u>Flight</u>: $data[1]% / $this->dmgs[1] hits each";
		$this->notes[] = "<u>Squadron</u>: $data[3]% / $this->dmgs[3] hits each";

		$values = array(200, 50);

		$html = "<u>Ship target</u></br>";
		$html .= $this->dmgs[4]." (+".floor($this->dmgs[4]*0.5)." per target size) damage</br>";
		$html .= "Intial hit scores ".$values[0]." damage against</br>target Structure";
		$html .= "All facing systems are subject to $values[1] damage</br>";
		$this->notes[] = "Armour applies, no Overkill";
	
		$this->notes[] = $html;
	}

	public function setAntimatterData(){
		$this->notes[] = "<span class='yellow'>".$this->amBonus."</span> extra damage per 1 point of passing the to-hit roll.";
		$this->notes[] = "Extra damage is capped at <span class='yellow'>".$this->amMax."%</span>";
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
		$mod -= $this->getCritMod("Accuracy", $fire->turn);
		$mod -= $this->getBoostEffect("Accuracy")* $this->getBoostLevel($fire->turn);

		//if ($mod != 100){Debug::log("weapon id: ".$this->id.", RANGE LOSS mod: ".$mod);}
		return $mod / 100;
	}

	public function getDmgRangeMod($fire){
		if (!$this->dmgLoss){return 1;}
		Debug::log("getDmgRangeMod");

		$multi = 100;
		$multi += $this->getBoostEffect("Damage Loss") * $this->getBoostLevel($fire->turn);
		$multi += $this->getCritMod("Damage Loss", $fire->turn);

		$dist = $fire->dist;

		if ($this->fireMode[0] == "L"){
			if ($fire->dist <= $this->optRange){return 1;}
			else $dist = $fire->dist - $this->optRange;
		}

		return (1 - ($dist / 100 * $this->dmgLoss / 10000 * $multi));
	}

	public function getDamageMod($fire){
		$mod = 100;
		$mod += $this->getBoostEffect("Damage") * $this->getBoostLevel($fire->turn);
		$mod += $this->getCritMod("Damage", $fire->turn);
		return $mod / 100;
	}

	public function getShots($turn){
		return $this->shots + $this->getBoostEffect("Shots") * $this->getBoostLevel($turn);
	}

	public function getMinDamage(){
		//return 100;
		return $this->minDmg;
	}

	public function getMaxDamage(){
		//return 200;
		return $this->maxDmg;
	}

	public function postDmg($fire){
		return false;
	}
}

?>