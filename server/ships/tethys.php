<?php

class Tethys extends SuperLight {
	public $name = "Tethys";
	public $display = "Tethys";
	public $role = "Police Cutter";
	public $faction = "Earth Alliance";
	public static $value =  250;
	public $cost = 250;
	public $mass = 1100;

	public $integrity = 360;
	public $ep = 110;
	public $ew = 400;
	public $power = 2;
	public $negation = 11;

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