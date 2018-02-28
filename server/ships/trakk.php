<?php

class Trakk extends Light {
	public $name = "Trakk";
	public $display = "Trakk";
	public $role = "Attack Frigate";
	public $faction = "Narn Regime";
	public static $value = 290;
	public $cost = 290;
	public $mass = 1250;

	public $integrity = 400;
	public $ep = 100;
	public $ew = 475;
	public $power = 0;
	public $negation = 12;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new MediumPlasmaPulse($this->getId(), $this->parentId, 315, 45);
		//$front->systems[] = new LightPlasmaPulse($this->getId(), $this->parentId, 240, 120);
		$front->systems[] = new MediumPlasmaPulse($this->getId(), $this->parentId, 315, 45);
		$structs[] = $front;
		
		/*
		$right = new Section(60, 180);
		$right->systems[] = new LightPlasmaPulse($this->getId(), $this->parentId, 300, 120);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new LightPlasmaPulse($this->getId(), $this->parentId, 240, 60);
		$structs[] = $left;
		*/
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>