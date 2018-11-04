<?php

class Darkner extends SuperLight {
	public $name = "Darkner";
	public $display = "Darkner";
	public $role = "Ballistic Attack Frigate";
	public $faction = "Centauri Republic";
	public static $value =  180;
	public $mass = 1200;

	public $integrity = 370;
	public $ep = 80;
	public $ew = 475;
	public $negation = 11;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->addSubSystem(new MissileLauncher($this->getId(), $this->parentId, 300, 60, 0, array(array("Javelin", 18, 3), array("Hasta", 12, 2))), 0);
		$this->addSubSystem(new LightParticle($this->getId(), $this->parentId, 240, 120), 0);
		$this->addSubSystem(new MissileLauncher($this->getId(), $this->parentId, 300, 60, 0, array(array("Javelin", 18, 3), array("Hasta", 12, 2))), 0);
	}
}

?>