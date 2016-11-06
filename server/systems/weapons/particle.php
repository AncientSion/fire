<?php

class Particle extends Weapon {
	public $type = "Particle";
	public $animation = "projectile";

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class StandardParticleBeam extends Particle {
	public $name = "ParticleBeam";
	public $display = "Particle Beam";
	public $minDmg = 60;
	public $maxDmg = 80;
	public $accDecay = 150;
	public $shots = 3;
	public $animColor = "blue";
	public $projSize = 4;
	public $projSpeed = 4;
	public $exploSize = 6;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}
class FusionCannon extends Particle {
	public $name = "FusionCannon";
	public $display = "Fusion Cannon";
	public $minDmg = 90;
	public $maxDmg = 120;
	public $accDecay = 130;
	public $shots = 2;
	public $animColor = "green";
	public $projSize = 5;
	public $projSpeed = 3;
	public $exploSize = 7;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class FusionPulsar extends Particle {
	public $name = "FusionPulsar";
	public $display = "Fusion Pulsar";
	public $minDmg = 50;
	public $maxDmg = 60;
	public $accDecay = 200;
	public $shots = 6;
	public $animColor = "lightGreen";
	public $projSize = 4;
	public $projSpeed = 5;
	public $exploSize = 4;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}

	public function rollForHit($fire){
		$hits = 0;
		$notes = "";

			$roll = mt_rand(1, 100);

			if ($roll <= $fire->req){
				$notes = "salvo hit";
				$hits = $this->shots;
			}
			else {				
				$notes = "salvo miss";
			}

		$fire->hits = $hits;
		$fire->notes = $notes;

		return $fire;
	}

}

?>