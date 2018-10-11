<?php

class Torotha extends SuperLight {
	public $name = "Torotha";
	public $display = "Torotha";
	public $role = "Assault Frigate";
	public $faction = "Minbari Federation";
	public static $value = 300;
	public $mass = 1600;

	public $integrity = 380;
	public $ep = 90;
	public $ew = 600;
	public $power = 0;
	public $negation = 13;
	public $jamming = 20;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new FusionCannon($this->getId(), $this->parentId, 300, 60);
		$front->systems[] = new AntimatterConverter($this->getId(), $this->parentId, 315, 45);
		$front->systems[] = new TwinEMProjector($this->getId(), $this->parentId, 270, 90);
		$structs[] = $front;

	/*	$right = new Section(60, 180);
		$right->systems[] = new TwinEMProjector($this->getId(), $this->parentId, 270, 90);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new TwinEMProjector($this->getId(), $this->parentId, 270, 90);
		$structs[] = $left;
	*/	
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}