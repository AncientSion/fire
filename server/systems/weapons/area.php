<?php

class Area extends Weapon {
	public $type = "Area";
	public $animation = "area";
	public $deviate = 0;
	public $priority = 12;
	public $usage = -1;
	public $freeAim = 1;
	public $shots = 1;
	public $maxShots = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class EnergyMine extends Area {
	public $name = "EnergyMine";
	public $display = "Energy Mine";
	public $fireMode = "Flash";
	public $minDmg = 10;
	public $accDecay = 0;
	public $deviate = 0;
	public $shots = 1;
	public $animColor = "blue";
	public $projSize = 3;
	public $projSpeed = 5;
	public $reload = 5;
	public $maxBoost = 1;
	public $effiency = 4;
	public $integrity = 56;
	public $powerReq = 10;
	public $traverse = -3;
	public $aoe = 65;
	public $dmgs = array(1, 2, 6, 3);

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->boostEffect[] = new Effect("Reload", -1);
		$this->notes = array("Area of Effect","Point of impact deviates by distance");
        $this->setFlashData();
	}

	public function setArmourData($rem){
		$this->mount = "Catapult";
		$this->armourMod = 0.2;
		$this->armour = floor($rem * $this->armourMod);
	}

	public function getBaseDamage($fire){
		return $this->getFlashBaseDamage($fire);
	}
}

?>
