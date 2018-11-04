<?php

class Vorchora extends SuperLight {
	public $name = "Vorchora";
	public $display = "Vorchora";
	public $role = "Support Frigate";
	public $faction = "Centauri Republic";
	public static $value = 270;
	public $mass = 1250;
	public $integrity = 400;

	public $ep = 120;
	public $ew = 525;
	public $power = 3;
	public $negation = 11;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addSystems(){
		$this->addSubSystem(new LightParticle($this->getId(), $this->parentId, 270, 90), 0);
		$this->addSubSystem(new LightPlasmaShredder($this->getId(), $this->parentId, 315, 45), 120);
		$this->addSubSystem(new LightPlasmaShredder($this->getId(), $this->parentId, 315, 45), 240);
	}
}

?>