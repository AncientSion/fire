<?php

class Hermes extends Light {
	public $name = "Hermes";
	public $display = "Hermes";
	public $role = "Courier Corvette";
	public $faction = "Earth Alliance";
	public $cost = 280;
	public $mass = 1200;

	public $integrity = 380;
	public $ep = 100;
	public $ew = 425;
	public $power = 2;
	public $negation = 11;


	function __construct($id, $parentId){
        parent::__construct($id, $parentId);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new MissileLauncher($this->getId(), $this->id, 270, 90, array(array("Needle", 9, 3), array("Naga", 6, 2)));
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new LightPulse($this->getId(), $this->parentId, 0, 180);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new LightPulse($this->getId(), $this->parentId, 180, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>