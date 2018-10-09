<?php

class Shaveen extends SuperLight {
	public $name = "Shaveen";
	public $display = "Shaveen";
	public $role = "Police Frigate";
	public $faction = "Minbari Federation";
	public static $value = 280;

	public $integrity = 310;
	public $ep = 120;
	public $ew = 550;
	public $power = 0;
	public $negation = 12;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new EMSubjugator($this->getId(), $this->parentId, 315, 45);
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new FusionCannon($this->getId(), $this->parentId, 270, 90);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new FusionCannon($this->getId(), $this->parentId, 270, 90);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}



?>