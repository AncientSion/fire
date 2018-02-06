<?php

class Pulse extends Weapon {
	public $type = "Pulse";
	public $animation = "projectile";
	public $priority = 8;
	public $basePulses = 3;
	public $extraPulses = 2;
	public $grouping = 30;
	public $pulse = 1;

	public $fireMode = "Pulse";

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class LightPulse extends Pulse {
	public $name = "LightPulse";
	public $display = "35mm Pulse Cannon";
	public $minDmg = 13;
	public $maxDmg = 17;
	public $accDecay = 180;
	public $shots = 1;
	public $animColor = "brown";
	public $projSize = 2;
	public $projSpeed = 10;
	public $reload = 2;
	public $mass = 12;
	public $powerReq = 2;
	public $traverse = -3;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class LightPlasmaPulse extends LightPulse {
	public $name = "LightPulse";
	public $display = "35mm Pulse Cannon";
	public $minDmg = 13;
	public $maxDmg = 17;
	public $accDecay = 180;
	public $shots = 1;
	public $animColor = "brown";
	public $projSize = 2;
	public $projSpeed = 10;
	public $reload = 2;
	public $mass = 12;
	public $powerReq = 2;
	public $traverse = -3;

	public $dmgType = "Plasma";

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class MediumPulse extends Pulse {
	public $name = "MediumPulse";
	public $display = "60mm Pulse Cannon";
	public $minDmg = 23;
	public $maxDmg = 30;
	public $accDecay = 120;
	public $shots = 1;
	public $animColor = "brown";
	public $projSize = 3;
	public $projSpeed = 8;
	public $reload = 3;
	public $mass = 21;
	public $powerReq = 4;
	public $traverse = -1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class HeavyPulse extends Pulse {
	public $name = "HeavyPulse";
	public $display = "102mm Pulse Cannon";
	public $minDmg = 38;
	public $maxDmg = 55;
	public $accDecay = 90;
	public $shots = 1;
	public $animColor = "brown";
	public $projSize = 4;
	public $projSpeed = 7;
	public $reload = 4;
	public $mass = 32;
	public $powerReq = 5;
	public $traverse = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}


class FusionPulsar extends Pulse {
	public $name = "FusionPulsar";
	public $display = "Fusion Pulsar";
	public $minDmg = 25;
	public $maxDmg = 32;
	public $accDecay = 180;
	public $animColor = "lightGreen";
	public $projSize = 2;
	public $projSpeed = 12;
	public $reload = 3;
	public $mass = 18;
	public $powerReq = 3;
	public $traverse = -1;
	public $basePulses = 3;
	public $extraPulses = 4;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}


?>