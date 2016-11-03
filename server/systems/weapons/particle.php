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
	public $animColor = "black";
	public $projSize = 2;
	public $projSpeed = 5;
	public $exploSize = 3;

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
	public $animColor = "blue";
	public $projSize = 2;
	public $projSpeed = 4;
	public $exploSize = 5;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

?>