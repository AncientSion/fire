<?php

class Particle extends Weapon {
	public $type = "Particle";
	public $animation = "projectile";
	public $priority = 10;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class LightIon extends Particle {
	public $name = "LightIon";
	public $display = "32mm Ion Bolter Array";
	public $minDmg = 16;
	public $maxDmg = 22;
	public $accDecay = 220;
	public $shots = 4;
	public $animColor = "orange";
	public $projSize = 2;
	public $projSpeed = 9;
	public $reload = 1;
	public $mass = 13;
	public $powerReq = 2;
	public $traverse = -4;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class MediumSingleIon extends LightIon {
	public $name = "MediumSingleIon";
	public $display = "62mm Ion Cannon";
	public $minDmg = 33;
	public $maxDmg = 47;
	public $accDecay = 120;
	public $shots = 1;
	public $animColor = "orange";
	public $reload = 2;
	public $projSize = 3;
	public $projSpeed = 6;
	public $mass = 16;
	public $powerReq = 3;
	public $traverse = -1;
	public $effiency = 3;
	public $maxBoost = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
        $this->boostEffect[] = new Effect("Reload", -1);
		//$this->boostEffect[] = new Effect("Damage", 0.15);
	}
}

class MediumTwinIon extends MediumSingleIon {
	public $name = "MediumTwinIon";
	public $display = "62mm Dual Ion Cannon";
	public $shots = 2;
	public $mass = 21;
	public $powerReq = 4;
	public $effiency = 3;
	public $maxBoost = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class HeavyIon extends MediumSingleIon {
	public $name = "HeavyIon";
	public $display = "133mm Ion Cannon";
	public $minDmg = 58;
	public $maxDmg = 79;
	public $accDecay = 80;
	public $shots = 1;
	public $animColor = "orange";
	public $reload = 2;
	public $projSize = 4;
	public $projSpeed = 5;
	public $mass = 32;
	public $powerReq = 6;
	public $traverse = 1;
	public $effiency = 4;
	public $maxBoost = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}


class FusionCannon extends Particle {
	public $name = "FusionCannon";
	public $display = "42mm Fusion Cannon";
	public $minDmg = 30;
	public $maxDmg = 41;
	public $accDecay = 110;
	public $shots = 1;
	public $animColor = "green";
	public $projSize = 3;
	public $projSpeed = 6;
	public $mass = 24;
	public $powerReq = 2;
	public $traverse = -1;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

?>