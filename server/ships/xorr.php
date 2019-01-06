<?php

class Xorr extends Light {
	public $name = "Xorr";
	public $display = "Xorr";
	public $role = "Attack Frigate";
	public $faction = "Vree Conglomerate";
	public static $value = 270;
	public $mass = 1200;

	public $integrity = 350;
	public $ep = 90;
	public $ew = 525;
	public $negation = 9;

	function __construct($id, $parentId){
        parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->addSubSystem(new AntiMatterCannon($this->getId(), $this->parentId, 270, 90), 0);
		$this->addSubSystem(new AntiMatterCannon($this->getId(), $this->parentId, 270, 90), 0);
	}
}
?>