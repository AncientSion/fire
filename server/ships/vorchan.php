<?php

class Vorchan extends SuperLight {
	public $name = "Vorchan";
	public $display = "Vorchan";
	public $role = "Attack Frigate";
	public $faction = "Centauri Republic";
	public static $value = 280;
	public $mass = 1250;
	public $integrity = 370;
	
	public $ep = 120;
	public $ew = 525;
	public $power = 2;
	public $negation = 11;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addSystems(){
		$this->addSubSystem(new MissileLauncher($this->getId(), $this->parentId, 300, 60, 0, array(array("Javelin", 9, 3), array("Hasta", 12, 4))), 0);
		$this->addSubSystem(new LightPlasma($this->getId(), $this->parentId, 315, 45), 120);
		$this->addSubSystem(new LightPlasma($this->getId(), $this->parentId, 315, 45), 240);
	}
}

?>