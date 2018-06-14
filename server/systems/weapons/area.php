<?php

class Area extends Weapon {
	public $type = "Area";
	public $animation = "area";
	public $accDecay = 0;
	public $deviate = 0;
	public $usage = -1;
	public $freeAim = 1;
	public $shots = 1;
	public $maxShots = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}

	public function setArmourData($rem){
		$this->mount = "Catapult";
		$this->armourMod = 0.2;
		$this->armour = floor($rem * $this->armourMod);
	}
}

class EnergyMine extends Area {
	public $name = "EnergyMine";
	public $display = "Energy Mine";
	public $fireMode = "Flash";
	public static $prio = 0;
	public $minDmg = 13;
	public $animColor = "blue";
	public $projSize = 3;
	public $projSpeed = 5;
	public $reload = 5;
	public $maxBoost = 1;
	public $maxRange = 1000;
	public $effiency = 4;
	public $integrity = 56;
	public $powerReq = 10;
	public $traverse = -3;
	public $aoe = 65;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->boostEffect[] = new Effect("Reload", -1);
		$this->notes = array("Area of Effect");
        $this->setFlashData();
	}

	public function getBaseDamage($fire){
		return $this->getFlashBaseDamage($fire);
	}
}

class GraviticMine extends Area {
	public $name = "GraviticMine";
	public $display = "Gravitic Mine";
	public static $prio = 0;
	public $minDmg = 30;
	public $maxDmg = 30;
	public $animColor = "blue";
	public $projSize = 3;
	public $projSpeed = 5;
	public $reload = 5;
	public $maxBoost = 1;
	public $maxRange = 1000;
	public $effiency = 4;
	public $integrity = 56;
	public $powerReq = 10;
	public $traverse = -3;
	public $aoe = 100;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->boostEffect[] = new Effect("Reload", -1);
		$this->notes = array("Area of Effect","Pulls units towards point of impact");
	}
}

?>
