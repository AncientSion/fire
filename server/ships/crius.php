<?php

class Crius extends Light {
	public $name = "Crius";
	public $display = "Crius";
	public $role = "Medium Patrol Frigate";
	public $faction = "Earth Alliance";
	public static $value = 290;
	public $mass = 1400;

	public $integrity = 400;
	public $ep = 80;
	public $ew = 500;
	public $power = 2;
	public $negation = 11;

	public $effiency = 2;

	function __construct($id, $parentId){
        parent::__construct($id, $parentId);
		$this->boostEffect[] = new Effect("Armour", 2);
	}

	public function addSystems(){
		$this->addSubSystem(new MediumRailGun($this->getId(), $this->parentId, 300, 60), 0);
		$this->addSubSystem(new Dual($this->getId(), $this->parentId, 300, 120, 0, array("LightPulse", "LightParticleBeam")), 120);
		$this->addSubSystem(new Dual($this->getId(), $this->parentId, 60, 240, 0, array("LightPulse", "LightParticleBeam")), 120);
		$this->addSubSystem(new Dual($this->getId(), $this->parentId, 240, 60, 0, array("LightPulse", "LightParticleBeam")), 240);
		$this->addSubSystem(new Dual($this->getId(), $this->parentId, 120, 300, 0, array("LightPulse", "LightParticleBeam")), 240);
	}
}

?>