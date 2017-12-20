<?php

class Squadron extends Ship {
	public $ship = false;
	public $squad = true;
	public $name = "SquadName";
	public $display = "SquadDisplay";

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

		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->setUnitState($turn, $phase);
		}

		$this->setProps($turn, $phase);

		return true;
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
		Debug::log("  construct Squaddie ".$id."/".$parentId);
		$this->id = $id;
		$this->parentId = $parentId;
		$this->setBaseStats();
		$this->addPrimary();
		$this->addStructures();
	}

	public function getId(){
		$this->index++;
		return $this->index;
	}

	public function setBaseStats(){
		$this->baseHitChance = 0;
		$this->baseTurnCost = 0;
		$this->baseTurnDelay = 0;
		$this->baseImpulseCost = 0;
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

	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class SuperLight extends Squaddie {
	public $baseImpulse = 200;
	public $traverse = -2;
	public $slipAngle = 25;
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}


?>