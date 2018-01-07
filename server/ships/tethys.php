<?php

class Tethys extends Light {
	public $name = "Tethys";
	public $display = "Tethys";
	public $role = "Law Enforcement Unit";
	public $faction = "Earth Alliance";
	public static $value =  240;
	public $cost = 240;
	public $mass = 1100;

	public $integrity = 400;
	public $ep = 100;
	public $ew = 425;
	public $power = 2;
	public $negation = 12;

	public $effiency = 2;

	function __construct($id, $parentId){
        parent::__construct($id, $parentId);
		$this->boostEffect[] = new Effect("Armour", 2);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		//$front->systems[] = new LightPulse($this->getId(), $this->parentId, 270, 90);
		$front->systems[] = new LightLaser($this->getId(), $this->parentId, 300, 60);
		//$front->systems[] = new LightPulse($this->getId(), $this->parentId, 270, 90);
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new LightPulse($this->getId(), $this->parentId, 270, 90);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new LightPulse($this->getId(), $this->parentId, 270, 90);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>