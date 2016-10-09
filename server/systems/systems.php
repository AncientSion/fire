<?php

class System {
	public $id;
	public $parentid;
	public $weapon = false;
	public $structure;
	public $armour;
	public $power;
	public $output;

	function __construct($id, $parentid, $structure, $armour, $power, $output){
		$this->id = $id;
		$this->parentid = $parentid;
		$this->structure = $structure;
		$this->armour = $armour;
		$this->power = $power;
		$this->output = $output;
	}
}

class Weapon extends System {
	public $id;
	public $parentid;
	public $weapon = true;

	public $structure;
	public $armour;

	public $damage;
	public $accDecay;
	public $shots;
	public $guns;
	public $reload;

	function __construct($id, $parentid, $structure, $armour, $power, $output = 0){
        parent::__construct($id, $parentid, $structure, $armour, $power, $output);
	}
}

class Particle extends Weapon {
	public $type = "Particle";

	function __construct($id, $parentid, $structure, $armour, $power){
        parent::__construct($id, $parentid, $structure, $armour, $power);
	}
}

class StandardParticleBeam extends Particle {

	function __construct($id, $parentid, $structure, $armour, $power){
        parent::__construct($id, $parentid, $structure, $armour, $power);
	}
}


class FusionCannon extends Particle {

	function __construct($id, $parentid, $structure, $armour, $power){
        parent::__construct($id, $parentid, $structure, $armour, $power);
	}
}


class Laser extends Weapon {
	public $type = "Laser";

	function __construct($id, $parentid, $structure, $armour, $power){
        parent::__construct($id, $parentid, $structure, $armour, $power);
	}
}

class HeavyLaser extends Laser {

	function __construct($id, $parentid, $structure, $armour, $power){
        parent::__construct($id, $parentid, $structure, $armour, $power);
	}
}

class MediumLaser extends Laser {

	function __construct($id, $parentid, $structure, $armour, $power){
        parent::__construct($id, $parentid, $structure, $armour, $power);
	}
}

class NeutronLaser extends Laser {

	function __construct($id, $parentid, $structure, $armour, $power){
        parent::__construct($id, $parentid, $structure, $armour, $power);
	}
}


?>