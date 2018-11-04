<?php

class Trakk extends SuperLight {
	public $name = "Trakk";
	public $display = "Trakk";
	public $role = "Attack Frigate";
	public $faction = "Narn Regime";
	public static $value = 260;
	public $mass = 1250;

	public $integrity = 380;
	public $ep = 100;
	public $ew = 450;
	public $negation = 10;
	public $power = 1;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){	
		$this->addSubSystem(new MediumPlasmaPulse($this->getId(), $this->parentId, 315, 45), 0);
		$this->addSubSystem(new TwinParticleBolter($this->getId(), $this->parentId, 270, 90), 0);
		$this->addSubSystem(new MediumPlasmaPulse($this->getId(), $this->parentId, 315, 45), 0);
	}
}

?>