<?php

class Torotha extends Light {
	public $name = "Torotha";
	public $display = "Torotha";
	public $role = "Patrol Frigate";
	public $faction = "Minbari Federation";
	public static $value = 350;
	public $mass = 1600;

	public $integrity = 450;
	public $ep = 100;
	public $ew = 650;
	public $power = 0;
	public $negation = 15;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new FusionCannon($this->getId(), $this->parentId, 300, 60);
		$front->systems[] = new FusionCannon($this->getId(), $this->parentId, 300, 60);
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new EMNeedler($this->getId(), $this->parentId, 0, 180);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new EMNeedler($this->getId(), $this->parentId, 180, 360);
		$structs[] = $left;
		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}