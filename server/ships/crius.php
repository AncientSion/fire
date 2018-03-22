<?php

class Crius extends Light {
	public $name = "Crius";
	public $display = "Crius";
	public $role = "Light Support Frigate";
	public $faction = "Earth Alliance";
	public static $value = 310;
	public $mass = 1400;

	public $integrity = 450;
	public $ep = 90;
	public $ew = 500;
	public $power = 2;
	public $negation = 13;

	public $effiency = 2;

	function __construct($id, $parentId){
        parent::__construct($id, $parentId);
		$this->boostEffect[] = new Effect("Armour", 2);
	}

	public function addStructures(){
		$structs = array();

		$right = new Section(60, 180);
		$right->systems[] = new Dual($this->getId(), $this->parentId, 300, 120, 0, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->parentId, 60, 240, 0, array("LightPulse", "LightParticleBeam"));
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new Dual($this->getId(), $this->parentId, 240, 60, 0, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->parentId, 120, 300, 0, array("LightPulse", "LightParticleBeam"));
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>