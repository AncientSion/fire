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
	public $aoe;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class EnergyMine extends Area {
	public $name = "EnergyMine";
	public $display = "Energy Mine";
	public $fireMode = "Ballistic";
	public $minDmg = 10;
	public $maxDmg = 50;
	public $accDecay = 45;
	public $deviate = 1;
	public $shots = 1;
	public $animColor = "blue";
	public $projSize = 3;
	public $projSpeed = 7;
	public $reload = 4;
	public $integrity = 56;
	public $powerReq = 10;
	public $traverse = -3;
	public $aoe = 65;
	public $dmgs = array(10, 25, 60, 30);

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
		$this->notes = array("Area of Effect","Point of impact deviates by distance","Fixed damage based on target", "Salvo: ".$this->dmgs[0]." dmg / unit", "Flight: ".$this->dmgs[1]." dmg / unit", "Squadron: ".$this->dmgs[2]." dmg / unit", "Ship: ".$this->dmgs[3]." dmg / system on facing side.");
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}	

	public function setArmourData($rem){
		$this->mount = "Catapult";
		$this->armourMod = 0.2;
		$this->armour = floor($rem * $this->armourMod);
	}

	public function singleCritTest($turn, $extra){
		return;
	}

	public function getBaseDamage($fire){
		if ($fire->target->ship){
			return $this->dmgs[3];
		} else if ($fire->target->squad){
			return $this->dmgs[2];
		} else if ($fire->target->flight){
			return $this->dmgs[1];
		} else if ($fire->target->salvo){
			return $this->dmgs[0];
		}

		Debug::log("eMine DMG error");
		return 1;
	}
}

class MagCompressor extends Particle {
	public $name = "MagCompressor";
	public $display = "Magnetic Compressor";
	public $fireMode = "Flash";
	public $usage = 2;
	public $freeAim = 0;
	public $minDmg = 114;
	public $maxDmg = 146;
	public $accDecay = 120;
	public $dmgLoss = 1;
	public $shots = 1;
	public $animColor = "blue";
	public $projSize = 4;
	public $projSpeed = 6;
	public $reload = 4;
	public $integrity = 54;
	public $powerReq = 8;
	public $traverse = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->boostEffect = array();
	}	
	public function singleCritTest($turn, $extra){
		return;
	}
}

?>
