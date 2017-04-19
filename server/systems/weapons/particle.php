<?php

class Particle extends Weapon {
	public $type = "Particle";
	public $animation = "projectile";
	public $priority = 5;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class LightIon extends Particle {
	public $name = "LightIon";
	public $display = "32mm Ion Bolter Array";
	public $minDmg = 16;
	public $maxDmg = 23;
	public $accDecay = 180;
	public $shots = 4;
	public $animColor = "orange";
	public $projSize = 2;
	public $projSpeed = 6;
	public $exploSize = 3;
	public $reload = 1;
	public $fc = array(0 => 85, 1 => 220);
	public $mass = 14;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class MediumIon extends LightIon {
	public $name = "MediumIon";
	public $display = "56mm Twin Ion Cannon";
	public $minDmg = 33;
	public $maxDmg = 47;
	public $accDecay = 100;
	public $shots = 2;
	public $animColor = "orange";
	public $reload = 2;
	public $projSize = 3;
	public $projSpeed = 5;
	public $exploSize = 4;
	public $fc = array(0 => 100, 1 => 120);
	public $mass = 19;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class HeavyIon extends LightIon {
	public $name = "HeavyIon";
	public $display = "133mm Ion Cannon";
	public $minDmg = 53;
	public $maxDmg = 79;
	public $accDecay = 70;
	public $shots = 1;
	public $animColor = "orange";
	public $reload = 1;
	public $projSize = 4;
	public $projSpeed = 5;
	public $exploSize = 5;
	public $fc = array(0 => 120, 1 => 45);
	public $mass = 28;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class FusionCannon extends Particle {
	public $name = "FusionCannon";
	public $display = "46mm Fusion Cannon";
	public $minDmg = 30;
	public $maxDmg = 38;
	public $accDecay = 110;
	public $shots = 2;
	public $animColor = "green";
	public $projSize = 3;
	public $projSpeed = 5;
	public $exploSize = 7;
	public $fc = array(0 => 100, 1 => 145);
	public $mass = 18;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class FusionPulsar extends Particle {
	public $name = "FusionPulsar";
	public $display = "Fusion Pulsar";
	public $minDmg = 25;
	public $maxDmg = 35;
	public $accDecay = 180;
	public $shots = 4;
	public $animColor = "lightGreen";
	public $projSize = 2;
	public $projSpeed = 6;
	public $exploSize = 4;
	public $fc = array(0 => 115, 1 => 90);
	public $mass = 16;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}

	public function xxxrollForHit($fire){
		$roll = mt_rand(1, 100);
		if ($roll <= $fire->req){
			$fire->hits = $this->shots;

			for ($i = 0; $i < $hits; $i++){
				$fire->rolls[] = $roll;
				$fire->notes = $fire->notes." ".$roll;
			}
		}
		return true;
	}
}

?>