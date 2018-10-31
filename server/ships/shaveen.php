<?php

class Shaveen extends SuperLight {
	public $name = "Shaveen";
	public $display = "Shaveen";
	public $role = "Police Frigate";
	public $faction = "Minbari Federation";
	public static $value = 260;

	public $integrity = 310;
	public $ep = 120;
	public $ew = 550;
	public $power = -3;
	public $negation = 12;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new FusionCannon($this->getId(), $this->parentId, 270, 90);
		$front->systems[] = new FusionCannon($this->getId(), $this->parentId, 270, 90);
		$structs[] = $front;

		$right = new Section(60, 180);
			$right->systems[] = new TwinEMProjector($this->getId(), $this->parentId, 300, 120);
		$structs[] = $right;

		$left = new Section(180, 300);
			$left->systems[] = new TwinEMProjector($this->getId(), $this->parentId, 240, 60);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}



?>