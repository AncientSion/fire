<?php

class Squaddie extends Single {

	public $baseHitChance;
	public $baseTurnDelay;
	public $baseImpulseCost;

	public $faction = "";
	public $size = 0;
	public $damaged = 0;

	public $start = 0;
	public $end = 360;
	public $ep = 0;
	public $ew = 0;
	public $power = 0;

	public $effiency = 0;

	public $bonusNegation = 0;
	public $remNegation = 0;
	public $parentIntegrity = 0;
	public $parentPow;
	public $jamming = 0;

	public $slots = 0;
	public $squaddie = 1;
	public $traverse = 3;
	
	public $critEffects =  array( // type, mag, dura, effect
		array("Disabled", 140, 0, 0.00),
	);
	
	function __construct($id, $parentId){
		$this->integrity = floor($this->integrity * 0.8);
		parent::__construct($id, $parentId);
	}

	public function setPowerOutput(){
		$need = 0;
		for ($i = 0; $i < sizeof($this->systems); $i++){
			$need += $this->systems[$i]->powerReq;
		}
		$this->power += $need;
	}

	public function setBaseStats($phase, $turn){
	}
	
	public function getBaseImpulse(){
		return $this->baseImpulse;
	}

	public function getSubHitChance($fire){
		return $this->baseHitChance;
	}

	public function setNegation($main, $armourDmg){
		$p = 1.25;
		$this->parentIntegrity = round($main*1.5);

		$this->parentPow = round(pow($this->parentIntegrity, $p));
		$this->armourDmg += $armourDmg;

		if ($this->armourDmg >= $this->parentIntegrity){$this->remNegation = 0; return;}
		$this->remNegation = round((pow($this->parentIntegrity - $this->armourDmg, $p) / $this->parentPow) * $this->negation);
	}

	public function getRemNegation(){
		$p = 1.25;
		return round(pow($this->parentIntegrity - $this->armourDmg, $p) / $this->parentPow * $this->negation);
	}
	
	public function getArmourValue($system){
		return array(
			"stock" => round($this->getRemNegation() * $system->getArmourMod()),
			"bonus" => round($this->getBonusNegation())
			//"bonus" => round($this->getBonusNegation() * $system->getArmourMod())
		);
	}

	public function getArmourMod(){
		return 1;
	}

	public function getName(){
		return "Main";
	}

	public function getBoostEffect($type){
		for ($i = 0; $i < sizeof($this->boostEffect); $i++){
			if ($this->boostEffect[$i]->type == $type){
				return $this->boostEffect[$i]->value;
			}
		}
		return 0;
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
		return $boost;
	}
}

class Light extends Squaddie {
	public $baseImpulse = 175;
	public $baseImpulseCost = 30;
	public $baseTurnDelay = 1.3;
	public $baseHitChance = 60;
	public $size = 48;
	public $space = 4;
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class SuperLight extends Light {
	public $size = 42;
	public $space = 3;
	public $baseTurnDelay = 1.2;
	public $baseHitChance = 55;
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class UltraLight extends SuperLight {
	public $size = 37;
	public $space = 2;
	public $baseTurnDelay = 1.1;
	public $baseHitChance = 50;
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}


?>