<?php

class Laser extends Weapon {
	public $type = "Laser";
	public $shots = 1;

	function __construct($structure, $armour, $power){
        parent::__construct($structure, $armour, $power);
	}
	
	public function getDmgLoss($dist){
		if ($dist < $this->optRange){
			$dist = $this->optRange - $dist;
		}
		else $dist = $dist - $this->optRange;

		return ceil($this->dmgDecay * $dist / 100);
	}

}

class HeavyLaser extends Laser {
	public $name = "Heavy Laser";
	public $damage = 100;
	public $optRange = 800;
	public $dmgDecay = 5;
	public $accDecay = 50;
	public $shots = 1;
	public $reload = 2;

	function __construct($structure, $armour, $power){
        parent::__construct($structure, $armour, $power);
	}
}

class MediumLaser extends Laser {
	public $name = "Medium Laser";
	public $damage = 100;
	public $optRange = 450;
	public $dmgDecay = 10;
	public $accDecay = 70;
	public $shots = 1;
	public $reload = 2;

	function __construct($structure, $armour, $power){
        parent::__construct($structure, $armour, $power);
	}
}

class NeutronLaser extends Laser {
	public $name = "Neutron Laser";
	public $damage = 100;
	public $optRange = 1000;
	public $dmgDecay = 8;
	public $accDecay = 60;
	public $shots = 1;
	public $reload = 2;

	function __construct($structure, $armour, $power){
        parent::__construct($structure, $armour, $power);
	}
}

?>
