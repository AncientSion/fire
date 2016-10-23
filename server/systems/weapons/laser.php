<?php

class Laser extends Weapon {
	public $type = "Laser";

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
	
	public function getDmgLoss($fire){

		$ret = $fire["dist"];

		if ($ret < $this->optRange){
			$ret = $this->optRange - $ret;
		}
		else $ret = $ret - $this->optRange;

		return ceil($this->dmgDecay * $ret / 100);
	}

	public function getDamage($fire){
		return floor(mt_rand($this->minDmg, $this->maxDmg) / 100 * (100 - $this->getDmgLoss($fire)));
	}

}

class HeavyLaser extends Laser {
	public $name = "HeavyLaser";
	public $display = "Heavy Laser";
	public $minDmg = 30;
	public $maxDmg = 40;
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
	public $minDmg = 25;
	public $maxDmg = 35;
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
