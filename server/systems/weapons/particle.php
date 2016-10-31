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
	public $minDmg = 5;
	public $maxDmg = 6;
	public $accDecay = 150;
	public $shots = 3;
	public $animColor = "black";
	public $projSize = 2;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}
class FusionCannon extends Particle {
	public $name = "FusionCannon";
	public $display = "Fusion Cannon";
	public $minDmg = 6;
	public $maxDmg = 8;
	public $accDecay = 130;
	public $shots = 2;
	public $animColor = "blue";
	public $projSize = 2;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

?>