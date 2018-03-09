<?php

class Thentus extends Light {
	public $name = "Thentus";
	public $display = "Thentus";
	public $role = "Patrol Frigate";
	public $faction = "Narn Regime";
	public static $value = 290;
	public $cost = 290;
	public $mass = 1250;

	public $integrity = 440;
	public $ep = 110;
	public $ew = 500;
	public $power = 1;
	public $negation = 13;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new MediumLaser($this->getId(), $this->parentId, 315, 45);
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new LightPlasmaPulse($this->getId(), $this->parentId, 300, 120);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new LightPlasmaPulse($this->getId(), $this->parentId, 240, 60);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>