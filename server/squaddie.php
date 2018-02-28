<?php



class Squaddie extends Single {

	public $baseHitChance;
	public $baseTurnDelay;
	public $baseImpulseCost;
	public $dropout = array(80, 50);

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
	public $remainingNegation = 0;
	public $parentIntegrity = 0;
	public $parentPow;

	public $slots = 0;
	
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
		//$this->baseImpulseCost = Math::getBaseImpulseCost($this->mass);
	}

	public function setSubunitState($turn, $phase){
		//Debug::log("setSubunitState ".get_class($this));
		if ($this->isDestroyed()){
			$this->destroyed = 1;
		}
		$this->setNegation($this->integrity, 0);
		return true;
	}

	public function getBaseImpulse(){
		return $this->baseImpulse;
	}

	public function getSubHitChance($fire){
		return $this->baseHitChance;
	}

	public function getOverkillSystem($fire){
		return false;
	}

	public function setNegation($main, $armourDmg){
		$p = 1.25;
		$this->parentIntegrity = round($main*1.5);

		$this->parentPow = round(pow($this->parentIntegrity, $p));
		$this->armourDmg += $armourDmg;
		$this->remainingNegation = round((pow($this->parentIntegrity - $this->armourDmg, $p) / $this->parentPow) * $this->negation);
	}

	public function getRemNegation(){
		$p = 1.25;
		return round(pow($this->parentIntegrity - $this->armourDmg, $p) / $this->parentPow * $this->negation);
	}
	
	public function getArmourValue($system){
		return array(
			"stock" => round($this->getRemNegation() * $system->getArmourMod()),
			"bonus" => round($this->getBonusNegation() * $system->getArmourMod())
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
	
	public function getValidEffects(){
		return array( // type, min, max, dura
			array("Damage", 30, 0, 20),
			array("Disabled", 65, 1, 0.00),
			array("Destroyed", 80, 0, 0.00),
		);
	}

	public function checkSystemCrits($new, $old, $turn){
		if ($this->destroyed){return;}
		$effects = $this->getValidEffects();
		$trigger =  round(($new + $old/2) / $this->integrity * 100);
		//if ($trigger < 5){return;}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				if ($this->structures[$i]->systems[$j]->destroyed){continue;}
				$roll = mt_rand(0, 20) + $trigger + sizeof($this->structures[$i]->systems[$j]->crits)*20;
				//Debug::log("in crit, determine effect, tresh: ".$trigger." roll: ".$roll);
				if ($roll < $effects[0][1]){continue;}

				for ($k = sizeof($effects)-1; $k >= 0; $k--){
					if ($roll >= $effects[$k][1] && mt_rand(0, 2)){//66 % chance to crit
						$this->structures[$i]->systems[$j]->crits[] = new Crit(
							0, $this->parentId, $this->structures[$i]->systems[$j]->id, $turn,
							 $effects[$k][0],  $effects[$k][2],  $effects[$k][3], 1
						);
						break 2;
					}
				}
			}
		}
	}


	public function getName(){
		return "Main";
	}

	public function addPowerEntry($power){
		$this->powers[] = $power;
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
	public $size = 60;
	public $baseImpulseCost = 50;
	public $space = 4;
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class SuperLight extends Light {
	public $baseImpulse = 185;
	public $size = 50;
	public $baseImpulseCost = 55;
	public $space = 3;
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}


?>