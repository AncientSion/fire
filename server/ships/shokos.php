<?php

class Shokos extends SuperLight {
	public $name = "Shokos";
	public $display = "Shokos";
	public $role = "Police Cutter";
	public $faction = "Narn Regime";
	public $cost = 250;
	public $mass = 1000;

	public $integrity = 350;
	public $ep = 125;
	public $ew = 400;
	public $power = 2;
	public $negation = 10;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		//$front->systems[] = new LightPlasmaPulse($this->getId(), $this->parentId, 270, 90);
		//$front->systems[] = new LightPlasmaPulse($this->getId(), $this->parentId, 270, 90);
		$front->systems[] = new LightLaser($this->getId(), $this->parentId, 240, 120);
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new LightPlasmaPulse($this->getId(), $this->parentId, 0, 180);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new LightPlasmaPulse($this->getId(), $this->parentId, 180, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>