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
	public $slipAngle = 15;

	public $powers = array();
	public $boostEffect = array();
	public $effiency = 0;

	public $bonusNegation = 0;
	public $remNegation = 0;
	public $parentIntegrity = 0;
	public $parentPow;

	public $slots = 0;
	public $squaddie = 1;
	public $traverse = 3;
	
	function __construct($id, $parentId){
		$this->integrity = floor($this->integrity * 0.8);
		parent::__construct($id, $parentId);
	}

	public function setPowerOutput(){
		$need = 0;
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				$need += $this->structures[$i]->systems[$j]->powerReq;
			}
		}
		$this->power += $need;
	}

	public function setBaseStats($phase, $turn){
		$this->baseHitChance = Math::getBaseHitChance($this->mass);
		$this->baseTurnDelay = Math::getBaseTurnDelay($this->mass);
	}

	public function setSubunitState($turn, $phase){
		//Debug::log("setSubunitState ".get_class($this));
		if ($this->isDestroyed()){
			$this->destroyed = 1;
		}
		$this->setNegation($this->integrity, 0);

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				$this->structures[$i]->systems[$j]->setState($turn, $phase);
			}
		}

		return true;
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

	public function getNewCrits($turn){
		$crits = array();


		for ($i = 0; $i < sizeof($this->crits); $i++){
			if ($this->crits[$i]->new){
				$crits[] = $this->crits[$i];
			}	
		}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				for ($k = 0; $k < sizeof($this->structures[$i]->systems[$j]->crits); $k++){
					if ($this->structures[$i]->systems[$j]->crits[$k]->new){
						$crits[] = $this->structures[$i]->systems[$j]->crits[$k];
					}
				}
			}
		}
		return $crits;
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
	public $size = 48;
	public $space = 4;
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class SuperLight extends Light {
	public $size = 42;
	public $space = 3;
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class UltraLight extends SuperLight {
	public $size = 37;
	public $space = 2;
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}


?>