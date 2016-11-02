<?php

class Laser extends Weapon {
	public $type = "Laser";
	public $animation = "beam";

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
	
	public function getDmgLoss($fire){

		$dist = $fire->dist;

		if ($dist < $this->optRange){
			$dist = $this->optRange - $dist;
		}
		else $dist = $dist - $this->optRange;

		return ceil($this->dmgDecay * $dist / 100);
	}
}

class HeavyLaser extends Laser {
	public $name = "HeavyLaser";
	public $display = "Heavy Laser";
	public $animColor = "red";
	public $rakeTime = 70;
	public $width = 2;
	public $minDmg = 400;
	public $maxDmg = 400;
	public $optRange = 800;
	public $dmgDecay = 10;
	public $accDecay = 70;
	public $shots = 1;
	public $reload = 3;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class NeutronLaser extends Laser {
	public $name = "NeutronLaser";
	public $display = "Neutron Laser";
	public $rakeTime = 40;
	public $animColor = "blue";
	public $width = 1;
	public $minDmg = 350;
	public $maxDmg = 350;
	public $optRange = 1000;
	public $dmgDecay = 8;
	public $accDecay = 60;
	public $shots = 1;
	public $reload = 2;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}


?>
