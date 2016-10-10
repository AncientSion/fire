<?php


class Particle extends Weapon {
	public $type = "Particle";

	function __construct($id, $parentid, $structure, $armour, $power){
        parent::__construct($id, $parentid, $structure, $armour, $power);
	}
}



class FusionCannon extends Particle {
	public $shots = 2;

	function __construct($id, $parentid, $structure, $armour, $power){
        parent::__construct($id, $parentid, $structure, $armour, $power);
	}
}

?>