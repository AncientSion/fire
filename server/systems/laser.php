<?php

class Laser extends Weapon {
	public $type = "Laser";
	public $shots = 1;

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
