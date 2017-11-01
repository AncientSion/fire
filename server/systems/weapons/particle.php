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
	public $minDmg = 14;
	public $maxDmg = 18;
	public $accDecay = 200;
	public $shots = 4;
	public $animColor = "orange";
	public $projSize = 2;
	public $projSpeed = 8;
	public $reload = 2;
	public $mass = 13;
	public $powerReq = 2;
	public $traverse = -4;
	public $effiency = 2;
	public $maxBoost = 1;
	
	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
        $this->boostEffect[] = new Effect("Reload", -1);
	}
}

class MediumIon extends LightIon {
	public $name = "MediumIon";
	public $display = "68mm Ion Emitter";
	public $minDmg = 33;
	public $maxDmg = 47;
	public $accDecay = 140;
	public $shots = 2;
	public $animColor = "orange";
	public $reload = 3;
	public $projSize = 3;
	public $projSpeed = 6;
	public $mass = 16;
	public $powerReq = 3;
	public $traverse = -1;
	public $effiency = 3;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class MediumTwinIon extends MediumIon {
	//public $name = "MediumTwinIon";
	public $display = "68mm Dual Ion Cannon";
	public $shots = 2;
	public $mass = 21;
	public $powerReq = 4;
	public $effiency = 4;
	public $maxBoost = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class HeavyIon extends MediumIon {
	public $name = "HeavyIon";
	public $display = "122mm Ion Burst Cannon";
	public $minDmg = 49;
	public $maxDmg = 65;
	public $accDecay = 80;
	public $shots = 2;
	public $animColor = "orange";
	public $reload = 4;
	public $projSize = 4;
	public $projSpeed = 5;
	public $mass = 32;
	public $powerReq = 6;
	public $traverse = 1;
	public $effiency = 4;

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