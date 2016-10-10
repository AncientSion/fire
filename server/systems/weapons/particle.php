<?php


class Particle extends Weapon {
	public $type = "Particle";

	function __construct($parentid, $structure, $armour, $power){
        parent::__construct($parentid, $structure, $armour, $power);
	}
}

class StandardParticleBeam extends Particle {
	public $shots = 3;

	function __construct($parentid, $structure, $armour, $power){
        parent::__construct($parentid, $structure, $armour, $power);
	}
}

class FusionCannon extends Particle {
	public $shots = 2;

	function __construct($parentid, $structure, $armour, $power){
        parent::__construct($parentid, $structure, $armour, $power);
	}
}

?>