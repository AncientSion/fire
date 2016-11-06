<?php

class Laser extends Weapon {
	public $type = "Laser";
	public $animation = "beam";
	public $beamWidth;

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

class LightLaser extends Laser {
	public $name = "LightLaser";
	public $display = "Light Laser";
	public $animColor = "red";
	public $rakeTime = 40;
	public $beamWidth = 2;
	public $exploSize = 4;
	public $minDmg = 200;
	public $maxDmg = 200;
	public $optRange = 300;
	public $dmgDecay = 20;
	public $accDecay = 150;
	public $shots = 1;
	public $reload = 2;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class HeavyLaser extends Laser {
	public $name = "HeavyLaser";
	public $display = "Heavy Laser";
	public $animColor = "red";
	public $rakeTime = 90;
	public $beamWidth = 4;
	public $exploSize = 6;
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
	public $rakeTime = 60;
	public $animColor = "#99ff33";
	public $beamWidth = 3;
	public $exploSize = 5;
	public $minDmg = 400;
	public $maxDmg = 500;
	public $optRange = 1000;
	public $dmgDecay = 8;
	public $accDecay = 40;
	public $shots = 1;
	public $reload = 2;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}


?>
