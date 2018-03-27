<?php

class Tethys extends SuperLight {
	public $name = "Tethys";
	public $display = "Tethys";
	public $role = "Police Cutter";
	public $faction = "Earth Alliance";
	public static $value = 210;
	public $mass = 1000;

	public $integrity = 320;
	public $ep = 110;
	public $ew = 375;
	public $power = 2;
	public $negation = 10;

	//public $effiency = 2;

	function __construct($id, $parentId){
        parent::__construct($id, $parentId);
		//$this->boostEffect[] = new Effect("Armour", 2);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new LightPulse($this->getId(), $this->parentId, 270, 90);
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new LightLaser($this->getId(), $this->parentId, 300, 60);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new LightLaser($this->getId(), $this->parentId, 300, 60);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>