<?php

class Torotha extends SuperLight {
	public $name = "Torotha";
	public $display = "Torotha";
	public $role = "Assault Frigate";
	public $faction = "Minbari Federation";
	public static $value = 300;
	public $mass = 1600;

	public $integrity = 380;
	public $ep = 90;
	public $ew = 600;
	public $power = 0;
	public $negation = 13;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->addSubSystem(new FusionCannon($this->getId(), $this->parentId, 330, 30), 0);
		$this->addSubSystem(new AntimatterConverter($this->getId(), $this->parentId, 315, 15), 0);
		$this->addSubSystem(new FusionCannon($this->getId(), $this->parentId, 330, 30), 0);
		$this->addSubSystem(new Jammer($this->getId(), $this->parentId, 0), 210);
	}
}