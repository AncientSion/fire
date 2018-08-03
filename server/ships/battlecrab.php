<?php

class Battlecrab extends SuperHeavy {
	public $name = "Battlecrab";
	public $display = "Battlecrab";
	public $faction = "The Shadows";
	public $size =  100;
	public static $value = 1800;
	public $profile = array(0.9, 1.1);
	public $mass = 12000;

	public $integrity = 1525;
	public $vitalHP = 180;
	public $ep = 60;
	public $ew = 800;
	public $power = 6;

	function __construct($data){
	        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();


		$front = new Structure($this->getId(), $this->id, 324, 36, 1050, 24, 1);
		$front->systems[] = new MolecularSlicer($this->getId(), $this->id, 300, 60, 0, 2);
		$structs[] = $front;

		$rightTop = new Structure($this->getId(), $this->id, 36, 120, 800, 22);
		$structs[] = $rightTop;

		$rightBottomm = new Structure($this->getId(), $this->id, 120, 180, 800, 22);
		$structs[] = $rightBottomm;

		$leftBottom = new Structure($this->getId(), $this->id, 180, 240, 800, 22);
		$structs[] = $leftBottom;

		$leftTop = new Structure($this->getId(), $this->id, 240, 324, 800, 22);
		$structs[] = $leftTop;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>