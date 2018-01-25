<?php

class Darkner extends Light {
	public $name = "Darkner";
	public $display = "Darkner";
	public $role = "Long-range Support Frigate";
	public $faction = "Centauri Republic";
	public static $value =  300;
	public $cost = 300;
	public $mass = 1400;

	public $integrity = 480;
	public $ep = 100;
	public $ew = 550;
	public $power = 2;
	public $negation = 14;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		//$front->systems[] = new MediumIon($this->getId(), $this->parentId, 315, 45);
		$front->systems[] = new SuperHeavyIon($this->getId(), $this->parentId, 315, 45);
		$front->systems[] = new LightIon($this->getId(), $this->parentId, 240, 120);
		$structs[] = $front;
/*
		$right = new Section(60, 180);
		$right->systems[] = new MediumIon($this->getId(), $this->parentId, 0, 120);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new MediumIon($this->getId(), $this->parentId, 240, 360);
		$structs[] = $left;
*/		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>