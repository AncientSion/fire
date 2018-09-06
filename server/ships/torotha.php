<?php

class Torotha extends SuperLight {
	public $name = "Torotha";
	public $display = "Torotha";
	public $role = "Patrol Frigate";
	public $faction = "Minbari Federation";
	public static $value = 320;
	public $mass = 1600;

	public $integrity = 380;
	public $ep = 100;
	public $ew = 600;
	public $power = 0;
	public $negation = 13;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new FusionCannon($this->getId(), $this->parentId, 300, 60);
		$front->systems[] = new FusionCannon($this->getId(), $this->parentId, 300, 60);
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new TwinEMProjector($this->getId(), $this->parentId, 90, 270);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new TwinEMProjector($this->getId(), $this->parentId, 90, 270);
		$structs[] = $left;
		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}