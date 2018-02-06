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

	public $particle = 0;
	public $laser = 0;
	public $plasma = 0;
	public $pulse = 0;
	public $usage = 2;

	public $fireMode = "Standard";
	public $dmgType = "Standard";

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
		$this->start = $start;
		$this->end = $end;
        parent::__construct($id, $parentId, $output, $width);
	}

	public function setArmourMod(){
   		$w = Math::getArcWidth($this);
		if ($w <= 60){$this->armourMod = 0.75;}
		else if ($w <= 120){$this->armourMod = 0.6;}
		else if ($w <= 360){$this->armourMod = 0.45;}
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

class Hangar extends Weapon {
	public $type = "Hangar";
	public $name = "Hangar";
	public $display = "Hangar";
	public $loads = array();
	public $reload = 2;
	public $utility = 1;
	public $capacity;
	public $launchRate;
	public $usage = -1;

	function __construct($id, $parentId, $launchRate, $loads, $capacity, $width = 1){
		parent::__construct($id, $parentId, 0, 0, 0, $width);
		$this->launchRate = $launchRate;
		$this->capacity = $capacity;
		$this->powerReq = 0;
		//$this->powerReq = floor($launchRate/3);
		$this->mass = $capacity*5;
		$this->integrity = $this->mass *2;


		for ($i = 0; $i < sizeof($loads); $i++){
			$fighter = new $loads[$i](0,0);
			$this->loads[] = array(
				"name" => $loads[$i],
				"display" => $fighter->display,
				"amount" => 0,
				"cost" => $fighter::$value,
				"mass" => $fighter->mass,
				"integrity" => $fighter->integrity,
				"launch" => 0
			);
		}
	}

	public function setArmourMod(){
		$this->armourMod = 0.5;
	}

	public function getHitChance(){
		return $this->mass/2;
	}
	
	public function adjustLoad($dbLoad){
		for ($i = 0; $i < sizeof($dbLoad); $i++){
			for ($j = 0; $j < sizeof($this->loads); $j++){
				if ($dbLoad[$i]["name"] == $this->loads[$j]["name"]){
					$this->loads[$j]["amount"] = $dbLoad[$i]["amount"];
					break; 
				}
			}
		}
	}

	public function getValidEffects(){
		return array();
	}
}

?>