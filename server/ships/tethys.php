<?php

class Tethys extends UltraLight {
	public $name = "Tethys";
	public $display = "Tethys";
	public $role = "Police Cutter";
	public $faction = "Earth Alliance";
	public static $value = 200;
	public $mass = 1000;

	public $integrity = 320;
	public $ep = 110;
	public $ew = 375;
	public $negation = 8;

	public $effiency = 2;

	function __construct($id, $parentId){
        parent::__construct($id, $parentId);
		$this->boostEffect[] = new Effect("Armour", 2);
	}

	public function addSystems(){
		$this->addSubSystem(new LightPulseCannon($this->getId(), $this->parentId, 240, 120), 120);
		$this->addSubSystem(new LightLaser($this->getId(), $this->parentId, 300, 60), 0);
		$this->addSubSystem(new LightPulseCannon($this->getId(), $this->parentId, 240, 120), 240);
	}
}

?>