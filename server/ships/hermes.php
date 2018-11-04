<?php

class Hermes extends SuperLight {
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

	public function addSystems(){
		$this->addSubSystem(new LightPulse($this->getId(), $this->parentId, 270, 90), 0);
		$this->addSubSystem(new MissileLauncher($this->getId(), $this->parentId, 270, 90, 0, array(array("Needle", 8, 4), array("Naga", 6, 3))), 0);
		$this->addSubSystem(new LightPulse($this->getId(), $this->parentId, 270, 90), 0);
	}
}

?>