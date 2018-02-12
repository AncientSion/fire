<?php

class Particle extends Weapon {
	public $type = "Particle";
	public $animation = "projectile";
	public $priority = 10;
	public $particle = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class LightIon extends Particle {
	public $name = "LightIon";
	public $display = "32mm Ion Bolter Array";
	public $minDmg = 12;
	public $maxDmg = 16;
	public $accDecay = 180;
	public $shots = 4;	
	public $reload = 2;
	public $integrity = 28;
	public $powerReq = 2;
	public $traverse = -4;
	public $effiency = 3;
	public $maxBoost = 1;

	public $animColor = "orange";
	public $projSize = 2;
	public $projSpeed = 8;
	
	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->boostEffect[] = new Effect("Reload", -1);
	}
}

class MediumIon extends LightIon {
	public $name = "MediumIon";
	public $display = "68mm Ion Emitter";
	public $minDmg = 30;
	public $maxDmg = 38;
	public $accDecay = 120;
	public $shots = 2;
	public $reload = 3;
	public $integrity = 36;
	public $powerReq = 3;
	public $traverse = -1;
	public $effiency = 3;

	public $animColor = "orange";
	public $projSize = 3;
	public $projSpeed = 7;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class HeavyIon extends MediumIon {
	public $name = "HeavyIon";
	public $display = "122mm Ion Cannon";
	public $minDmg = 50;
	public $maxDmg = 64;
	public $accDecay = 90;
	public $shots = 2;
	public $reload = 4;
	public $integrity = 64;
	public $powerReq = 6;
	public $traverse = 1;
	public $effiency = 4;

	public $animColor = "orange";
	public $projSize = 4;
	public $projSpeed = 6;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class SuperHeavyIon extends HeavyIon {
	public $name = "SuperHeavyIon";
	public $display = "138mm Ion Cannon";
	public $minDmg = 56;
	public $maxDmg = 70;
	public $accDecay = 90;
	public $shots = 3;
	public $reload = 6;
	public $integrity = 84;
	public $powerReq = 8;
	public $traverse = 1;
	public $effiency = 4;

	public $animColor = "orange";
	public $projSize = 4;
	public $projSpeed = 6;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class FusionCannon extends Particle {
	public $name = "FusionCannon";
	public $display = "42mm Fusion Cannon";
	public $minDmg = 34;
	public $maxDmg = 42;
	public $accDecay = 120;
	public $shots = 1;
	public $reload = 2;
	public $integrity = 34;
	public $powerReq = 2;
	public $traverse = -1;

	public $animColor = "green";
	public $projSize = 3;
	public $projSpeed = 7;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class ShockCannon extends Particle {
	public $name = "ShockCannon";
	public $display = "42mm Shock Cannon";
	public $minDmg = 8;
	public $maxDmg = 12;
	public $accDecay = 120;
	public $shots = 1;
	public $reload = 2;
	public $integrity = 34;
	public $powerReq = 2;
	public $traverse = -1;

	public $animation = "em";
	public $animColor = "lightBlue";
	public $projSize = 3;
	public $projSpeed = 7;

	public $em = 1;
	public $dmgType = "EM";

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
		$this->notes = array("Does no structural damage", "Damage can cause critical effects");
	}
}

?>