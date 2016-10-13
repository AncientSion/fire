<?php


class Particle extends Weapon {
	public $type = "Particle";

	function __construct($structure, $armour, $power){
        parent::__construct($structure, $armour, $power);
	}
}

class StandardParticleBeam extends Particle {
	public $name = "SPB";
	public $damage = 3;
	public $accDecay = 100;
	public $shots = 3;

	function __construct($structure, $armour, $power){
        parent::__construct($structure, $armour, $power);
	}
}

class FusionCannon extends Particle {
	public $name = "Fusion Cannon";
	public $damage = 3;
	public $accDecay = 70;
	public $shots = 2;

	function __construct($structure, $armour, $power){
        parent::__construct($structure, $armour, $power);
	}
}

?>