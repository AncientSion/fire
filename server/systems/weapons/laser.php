<?php

class Laser extends Weapon {
	public $type = "Laser";
	public $animation = "beam";
	public $beamWidth;
	public $priority = 500;
	public $rakes;
	public $laser = 1;
	public $fireMode = "Laser";
	public $dmgType = "Standard";

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);

		$this->notes = array("Damage evenly spreads over ".$this->rakes." rakes.");
		$this->boostEffect[] = new Effect("Damage", 20);
	}
	
	public function getDmgRangeMod($fire){
		if ($fire->dist <= $this->optRange){
			return 1;
		}

		$mod = 1-(($fire->dist - $this->optRange) * $this->dmgLoss / 10000);
		//Debug::log(get_class($this).", weapon id: ".$this->id.", RANGE DMG mod: ".$mod);
		return $mod;
	}
}

class LightParticleBeam extends Laser {
	public $name = "LightParticleBeam";
	public $display = "Light Particle Beam";
	public $priority = 550;
	public $animColor = "blue";
	public $rakeTime = 25;
	public $beamWidth = 1;
	public $minDmg = 25;
	public $maxDmg = 32;
	public $optRange = 450;
	public $dmgLoss = 4;
	public $accDecay = 120;
	public $shots = 1;
	public $reload = 2;
	public $powerReq = 2;
	public $rakes = 1;
	public $integrity = 40;
	public $traverse = -1;
	
	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->boostEffect = array();

	}
}

class LightLaser extends Laser {
	public $name = "LightLaser";
	public $display = "Light Laser";
	public $priority = 540;
	public $animColor = "red";
	public $rakeTime = 60;
	public $beamWidth = 2;
	public $minDmg = 60;
	public $maxDmg = 80;
	public $optRange = 250;
	public $dmgLoss = 8;
	public $accDecay = 60;
	public $shots = 1;
	public $reload = 3;
	public $powerReq = 3;
	public $effiency = 2;
	public $maxBoost = 1;
	public $rakes = 3;
	public $integrity = 40;
	public $traverse = -2;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class MediumLaser extends LightLaser {
	public $name = "MediumLaser";
	public $display = "Medium Laser";
	public $priority = 530;
	public $rakeTime = 60;
	public $beamWidth = 3;
	public $minDmg = 80;
	public $maxDmg = 110;
	public $optRange = 400;
	public $dmgLoss = 6;
	public $powerReq = 4;
	public $effiency = 3;
	public $integrity = 50;
	public $traverse = -1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class HeavyLaser extends LightLaser {
	public $name = "HeavyLaser";
	public $display = "Heavy Laser";
	public $priority = 520;
	public $rakeTime = 60;
	public $beamWidth = 4;
	public $minDmg = 160;
	public $maxDmg = 200;
	public $reload = 4;
	public $optRange = 650;
	public $dmgLoss = 4;
	public $powerReq = 6;
	public $effiency = 4;
	public $integrity = 60;
	public $traverse = 0;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class SuperHeavyLaser extends HeavyLaser {
	public $name = "SuperHeavyLaser";
	public $display = "Super-Heavy Laser";
	public $priority = 510;
	public $rakeTime = 100;
	public $beamWidth = 5;
	public $minDmg = 190;
	public $maxDmg = 230;
	public $optRange = 850;
	public $dmgLoss = 2;
	public $powerReq = 8;
	public $rakes = 3;
	public $integrity = 70;
	public $traverse = 1;
	public $effiency = 5;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class NeutronLaser extends Laser {
	public $priority = 503;
	public $name = "NeutronLaser";
	public $display = "Neutron Laser";
	public $rakeTime = 40;
	public $animColor = "yellow";
	public $beamWidth = 2;
	public $minDmg = 95;
	public $maxDmg = 130;
	public $optRange = 600;
	public $dmgLoss = 2;
	public $accDecay = 60;
	public $shots = 1;
	public $reload = 3;
	public $powerReq = 4;
	public $rakes = 2;
	public $effiency = 3;
	public $maxBoost = 1;
	public $integrity = 52;
	public $traverse = -1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class MolecularSlicer extends Laser {
	public $name = "MolecularSlicer";
	public $display = "Molecular Slicer";
	public $dmgType = "Molecular";
	public $rakeTime = 80;
	public $animColor = "purple";
	public $beamWidth = 4;
	public $minDmg = 270;
	public $maxDmg = 340;
	public $optRange = 0;
	public $dmgLoss = 0;
	public $accDecay = 4;
	public $shots = 1;
	public $reload = 3;
	public $powerReq = 4;
	public $rakes = 3;
	public $integrity = 52;
	public $traverse = -1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
		$this->notes[] = ("Ignores 75% of target armour");
	}
}

class NeutronAccelerator extends Laser {
	public $name = "NeutronAccelerator";
	public $display = "Neutron Accelerator";
	public $rakeTime = 50;
	public $animColor = "yellow";
	public $beamWidth = 2;
	public $minDmg = 45;
	public $maxDmg = 60;
	public $optRange = 400;
	public $dmgLoss = 3;
	public $accDecay = 100;
	public $shots = 1;
	public $reload = 2;
	public $powerReq = 5;
	public $rakes = 1;
	public $effiency = 3;
	public $maxBoost = 2;
	public $integrity = 46;
	public $traverse = 0;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

?>
