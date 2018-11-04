<?php

class Haven extends UltraLight {
	public $name = "Haven";
	public $display = "Haven";
	public $role = "Cutter";
	public $faction = "Centauri Republic";
	public static $value = 220;
	public $mass = 900;

	public $integrity = 310;
	public $ep = 135;
	public $ew = 450;
	public $power = 0;
	public $negation = 8;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->addSubSystem(new LightPlasma($this->getId(), $this->parentId, 315, 45), 0);
		$this->addSubSystem(new LightParticle($this->getId(), $this->parentId, 240, 120), 120);
		$this->addSubSystem(new LightParticle($this->getId(), $this->parentId, 240, 120), 240);
	}
}



?>