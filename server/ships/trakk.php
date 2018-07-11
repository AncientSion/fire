<?php

class Trakk extends Light {
	public $name = "Trakk";
	public $display = "Trakk";
	public $role = "Attack Frigate";
	public $faction = "Narn Regime";
	public static $value = 290;
	public $mass = 1250;

	public $integrity = 380;
	public $ep = 100;
	public $ew = 450;
	public $negation = 10;
	public $power = 1;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new TwinParticleBolter($this->getId(), $this->parentId, 270, 90);
		$structs[] = $front;
		
		
		$right = new Section(60, 180);
		$right->systems[] = new MediumPlasmaPulse($this->getId(), $this->parentId, 315, 45);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new MediumPlasmaPulse($this->getId(), $this->parentId, 315, 45);
		$structs[] = $left;
		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>