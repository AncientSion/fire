<?php

class Shokos extends UltraLight {
	public $name = "Shokos";
	public $display = "Shokos";
	public $role = "Light Corvette";
	public $faction = "Narn Regime";
	public static $value = 220;
	public $mass = 1000;

	public $integrity = 330;
	public $ep = 130;
	public $ew = 400;
	public $power = 2;
	public $negation = 8;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){	
		$this->addSubSystem(new LightPlasmaPulse($this->getId(), $this->parentId, 270, 90), 0);
		$this->addSubSystem(new TwinParticleBolter($this->getId(), $this->parentId, 240, 120), 120);
		$this->addSubSystem(new TwinParticleBolter($this->getId(), $this->parentId, 240, 120), 240);
	}
}

?>