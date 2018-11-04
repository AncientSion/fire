<?php

class Mograth extends Light {
	public $name = "Mograth";
	public $display = "Mograth";
	public $role = "Multi-purpose Frigate";
	public $faction = "Centauri Republic";
	public static $value = 340;
	public $mass = 1400;

	public $integrity = 370;
	public $ep = 100;
	public $ew = 525;
	public $negation = 12;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->addSubSystem(new MediumParticle($this->getId(), $this->parentId, 315, 45), 0);
		$this->addSubSystem(new MediumParticle($this->getId(), $this->parentId, 315, 45), 0);
		$this->addSubSystem(new LightParticle($this->getId(), $this->parentId, 270, 90), 120);
		$this->addSubSystem(new LightParticle($this->getId(), $this->parentId, 270, 90), 240);
	}
}

?>