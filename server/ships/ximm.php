<?php

class Ximm extends Light {
	public $name = "Ximm";
	public $display = "Ximm";
	public $role = "Escort Frigate";
	public $faction = "Vree Conglomerate";
	public static $value = 260;
	public $mass = 1200;

	public $integrity = 350;
	public $ep = 90;
	public $ew = 525;
	public $negation = 9;

	function __construct($id, $parentId){
        parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->addSubSystem(new TriParticleInterdictor($this->getId(), $this->parentId, 270, 90), 120);
		$this->addSubSystem(new TriParticleInterdictor($this->getId(), $this->parentId, 0, 360), 120);
		$this->addSubSystem(new TriParticleInterdictor($this->getId(), $this->parentId, 0, 360), 240);
		$this->addSubSystem(new TriParticleInterdictor($this->getId(), $this->parentId, 0, 360), 240);
	}
}

?>