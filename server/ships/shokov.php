<?php

class Shokov extends Shokos {
	public $name = "Shokov";
	public $display = "Shokov";
	public $variant = "Shokos";
	public $rarity = 1;
	public $role = "Torpedo Cutter";
	public $faction = "Narn Regime";
	public static $value = 250;

	public $ew = 425;
	public $power = 0;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){	
		$this->addSubSystem(new TwinParticleBolter($this->getId(), $this->parentId, 240, 120), 0);
		$this->addSubSystem(new TorpedoLauncher($this->getId(), $this->parentId, 315, 45, 0, array(array("Vran", 8, 2))), 120);
		$this->addSubSystem(new TorpedoLauncher($this->getId(), $this->parentId, 315, 45, 0, array(array("Vran", 8, 2))), 240);
	}

	static function getKit($faction){
		return array();
	}
}

?>