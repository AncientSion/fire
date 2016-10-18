<?php

class Laser extends Weapon {
	public $type = "Laser";

	function __construct($id, $parentId, $start, $end, $output = 0){
        parent::__construct($id, $parentId, $start, $end, $output);
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
	public $name = "HeavyLaser";
	public $display = "Heavy Laser";
	public $damage = 100;
	public $optRange = 800;
	public $dmgDecay = 10;
	public $accDecay = 70;
	public $shots = 1;
	public $reload = 2;
	
	function __construct($id, $parentId, $start, $end, $output = 0){
        parent::__construct($id, $parentId, $start, $end, $output);
	}
}

class NeutronLaser extends Laser {
	public $name = "NeutronLaser";
	public $display = "Neutron Laser";
	public $damage = 100;
	public $optRange = 1000;
	public $dmgDecay = 8;
	public $accDecay = 60;
	public $shots = 1;
	public $reload = 2;
	
	function __construct($id, $parentId, $start, $end, $output = 0){
        parent::__construct($id, $parentId, $start, $end, $output);
	}
}


?>
