<?php

class Crius extends Light {
	public $name = "Crius";
	public $display = "Crius";
	public $role = "ESCORT / Patrol Corvette";
	public $faction = "Earth Alliance";
	public static $value =  280;
	public $cost = 280;
	public $mass = 1400;

	public $integrity = 500;
	public $ep = 90;
	public $ew = 525;
	public $power = 2;
	public $negation = 13;

	public $effiency = 2;

	function __construct($id, $parentId){
        parent::__construct($id, $parentId);
		$this->boostEffect[] = new Effect("Armour", 2);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new LightLaser($this->getId(), $this->parentId, 300, 60);
		//$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new LightPulse($this->getId(), $this->parentId, 300, 120);
		$right->systems[] = new LightPulse($this->getId(), $this->parentId, 60, 240);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new LightPulse($this->getId(), $this->parentId, 240, 60);
		$left->systems[] = new LightPulse($this->getId(), $this->parentId, 120, 300);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>