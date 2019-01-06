<?php

class Thentus extends Light {
	public $name = "Thentus";
	public $display = "Thentus";
	public $role = "Heavy Patrol Frigate";
	public $faction = "Narn Regime";
	public static $value = 325;
	public $mass = 1300;

	public $integrity = 390;
	public $ep = 110;
	public $ew = 500;
	public $negation = 10;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->addSubSystem(new LightPLasmaPulse($this->getId(), $this->parentId, 240, 120), 0);
		$this->addSubSystem(new MediumLaser($this->getId(), $this->parentId, 300, 60), 0);
		$this->addSubSystem(new LightPLasmaPulse($this->getId(), $this->parentId, 240, 120), 0);
		$this->addSubSystem(new TwinParticleBolter($this->getId(), $this->parentId, 270, 90), 120);
		$this->addSubSystem(new TwinParticleBolter($this->getId(), $this->parentId, 270, 90), 240);
	}
}

?>