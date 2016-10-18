<?php


class Particle extends Weapon {
	public $type = "Particle";

	function __construct($id, $parentId, $start, $end, $output = 0){
        parent::__construct($id, $parentId, $start, $end, $output);
	}
}

class StandardParticleBeam extends Particle {
	public $name = "ParticleBeam";
	public $display = "Particle Beam";
	public $damage = 3;
	public $accDecay = 80;
	public $shots = 3;

	function __construct($id, $parentId, $start, $end, $output = 0){
        parent::__construct($id, $parentId, $start, $end, $output);
	}
}
class FusionCannon extends Particle {
	public $name = "FusionCannon";
	public $display = "Fusion Cannon";
	public $damage = 4;
	public $accDecay = 65;
	public $shots = 2;

	function __construct($id, $parentId, $start, $end, $output = 0){
        parent::__construct($id, $parentId, $start, $end, $output);
	}
}

?>