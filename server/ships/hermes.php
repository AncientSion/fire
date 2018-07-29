<?php

class Hermes extends Light {
	public $name = "Hermes";
	public $display = "Hermes";
	public $role = "Courier Corvette";
	public $faction = "Earth Alliance";
	public static $value = 230;
	public $mass = 1200;

	public $integrity = 380;
	public $ep = 120;
	public $ew = 425;
	public $power = 2;
	public $negation = 10;

	public $effiency = 2;

	function __construct($id, $parentId){
        parent::__construct($id, $parentId);
		$this->boostEffect[] = new Effect("Armour", 2);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new LightPulse($this->getId(), $this->parentId, 270, 90);
		$front->systems[] = new MissileLauncher($this->getId(), $this->parentId, 270, 90, 0, array(array("Needle", 8, 4), array("Naga", 6, 3)));
		$front->systems[] = new LightPulse($this->getId(), $this->parentId, 270, 90);
		$structs[] = $front;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>