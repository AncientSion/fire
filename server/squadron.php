<?php

class Squadron extends Ship {
	public $ship = false;
	public $squad = true;
	public $name = "Squadron";
	public $display = "Squadron";

	public $baseEP = 0;

	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes){
		$this->id = $id;
		$this->userid = $userid;
		$this->available = $available;
		$this->status = $status;
		$this->destroyed = $destroyed;
		$this->x = $x;
		$this->y = $y;
		$this->facing = $facing;
		$this->remainingDelay = $delay;
		$this->currentImpulse = $thrust;
		$this->notes = $notes;

		$this->primary = new Shared();
		$this->primary->systems[] = new Sensor(0, $this->id, array(90, 3), 750, 10);
	}

	/*
	public function addSubUnits($elements){
		for ($i = 0; $i < sizeof($elements); $i++){
			for ($j = 1; $j <= $elements[$i]["amount"]; $j++){
				$this->structures[] = new $elements[$i]["name"](
					$this->getId(),
					$this->id
				);
				for ($k = 0; $k < sizeof($this->structures[sizeof($this->structures)-1]->systems); $k++){
					$this->structures[sizeof($this->structures)-1]->systems[$k]->id = $this->getId();
				}
			}
		}
		return true;
	}*/

	public function getId(){
		if (!sizeof($this->structures)){
			return 1;
		}
		return ($this->structures[sizeof($this->structures)-1]->index+1);
	}
	
	public function addSubUnits($elements){
		Debug::log("SQUADRON addSubUnits ".sizeof($elements));

		for ($i = 0; $i < sizeof($elements); $i++){
			for ($j = 1; $j <= $elements[$i]["amount"]; $j++){
				$this->structures[] = new $elements[$i]["name"](
					$this->getId(),
					$this->id
				);
			}
		}
		return true;
	}

	public function setUnitState($turn, $phase){
		Debug::log("SQUADRON setUnitState ".$this->display." #".$this->id);

		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			$this->primary->systems[$i]->setState($turn, $phase);
		}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->setUnitState($turn, $phase);
		}

		$this->setProps($turn, $phase);

		return true;
	}

	public function setBaseStats(){
		Debug::log("setBaseStats");
		$this->baseHitChance = 50;
		$this->baseTurnCost = 5;
		$this->baseTurnDelay = 5;
		$this->baseImpulseCost = 5;
		$this->baseImpulse = 180;

		$this->baseEP = 100;
		$this->size = 40 + sizeof($this->structures)*20;
	}	


	public function hidePowers($turn){
		for ($j = 0; $j < sizeof($this->structures); $j++){
			for ($k = 0; $k < sizeof($this->structures[$j]->systems); $k++){
				for ($l = sizeof($this->structures[$j]->systems[$k]->powers)-1; $l >= 0; $l--){
					if ($this->structures[$j]->systems[$k]->powers[$l]->turn == $turn){
						if ($this->structures[$j]->systems[$k]->powers[$l]->type == 0){
							$this->structures[$j]->systems[$k]->disabled = 0;
						}
						array_splice($this->structures[$j]->systems[$k]->powers, $l, 1);
					} else break;
				}
			}
		}
	}
}

class Squaddie extends Single {
	public $id;
	public $parentId;
	public $integrity = 0;
	public $negation = 0;

	public $destroyed = 0;
	public $disabled = 0;
	public $systems = array();
	public $damages = array();
	public $crits = array();

	public $baseHitChance;
	public $baseTurnCost;
	public $baseTurnDelay;
	public $baseImpulseCost;


	public $name;
	public $display;
	public $faction = "";
	public $size = 0;
	public static $value;
	public $cost;
	public $profile = array();
	public $mass = 0;
	public $start = 0;
	public $end = 360;
	public $ep = 0;
	public $damaged = 0;
	
	public $index = 0;

	
	function __construct($id, $parentId){
		//Debug::log("  construct Squaddie ".$id."/".$parentId);
		$this->id = $id;
		$this->parentId = $parentId;

		$this->index = $this->id;
		$this->setBaseStats();
		$this->addPrimary();
		$this->addStructures();
	}

	public function getId(){
		$this->index++;
		//Debug::log("returning id " . $this->index);
		return $this->index;
	}

	public function setBaseStats(){
		$this->baseHitChance = floor($this->mass/50);
		$this->baseTurnCost = floor($this->mass/50);
		$this->baseTurnDelay = floor($this->mass/50);
		$this->baseImpulseCost = floor($this->mass/50);
	}

	public function setUnitState($turn, $phase){
		Debug::log("  setUnitState ".$this->display." #".$this->id);
		if ($this->primary->isDestroyed()){
			$this->destroyed = 1;
		}

		for ($i = 0; $i < sizeof($this->primary->systems); $i++){ // check primary criticals
			$this->primary->systems[$i]->setState($turn, $phase);
		}

		$this->primary->setNegation();
		/*for ($i = 0; $i < sizeof($this->structures); $i++){ // 
			$armourDmg = 0;
			$structDmg = 0;
			for ($j = 0; $j < sizeof($this->primary->damages); $j++){
				if ($this->primary->damages[$j]->structureid == $this->structures[$i]->id){
					$armourDmg += $this->primary->damages[$j]->armourDmg;
					$structDmg += $this->primary->damages[$j]->structDmg;
				}
			}
		}
		*/
		return true;
	}
}

class Light extends Squaddie {
	public $baseImpulse = 190;
	public $traverse = -1;
	public $slipAngle = 23;
	public $size = 60;

	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class SuperLight extends Squaddie {
	public $baseImpulse = 200;
	public $traverse = -2;
	public $slipAngle = 25;
	public $size = 50;
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}


?>