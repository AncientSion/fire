<?php

class Laser extends Weapon {
	public $type = "Laser";
	public $animation = "beam";
	public $beamWidth;
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

class bLaser extends Laser {
	public $name = "bLaser";
	public $rakeTime = 60;
	public $beamWidth = 3;
	public static $prio = 0;
	public $minDmg = 80;
	public $maxDmg = 110;
	public $optRange = 400;
	public $dmgLoss = 6;
	public $accDecay = 60;
	public $shots = 1;
	public $reload = 3;
	public $maxBoost = 1;
	public $powerReq = 5;
	public $integrity = 50;
	public $traverse = -1;
	public $rakes = 3;

	function __construct($id, $parentId, $start, $end, $output = 5, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->display = "Laser - Scale " . $output;
		$this->beamWidth = $this->beamWidth / 5 * $output;
		//$this->minDmg = ($this->minDmg / 5) * (5 + ((($output / 5) - 1)*1.5));
		//$this->maxDmg = ($this->maxDmg / 5) * (5 + ((($output / 5) - 1)*1.5));
		//$this->minDmg = $this->minDmg / 5 * 5 + (($output - 5)*10);
		//$this->maxDmg = $this->maxDmg / 5 * 5 + (($output - 5)*10);
		$this->minDmg = $this->minDmg / 5 * 5 + (($output - 5)*10);
		$this->maxDmg = $this->maxDmg / 5 * 5 + (($output - 5)*10);
		$this->optRange = $this->optRange / 5 * $output;
		$this->dmgLoss = $this->dmgLoss * 5 / $output;
		//$this->accDecay = $this->accDecay * 5 / $output;
		$this->powerReq = $this->powerReq - 5 + $output;
		$this->effiency = ceil($this->powerReq/2);
		$this->integrity = $this->integrity / 5 * $output;
		$this->traverse = $this->traverse - 5 + $output;
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
	public $animColor = "blue";
	public $rakeTime = 25;
	public $beamWidth = 1;
	public static $prio = 0;
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

class HeavyPlasmaMaser extends Laser {
	public $name = "HeavyPlasmaMaser";
	public $display = "Heavy Plasma Maser";
	public $rakeTime = 60;
	public $beamWidth = 4;
	public static $prio = 0;
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

class LightLaser extends Laser {
	public $name = "LightLaser";
	public $display = "Light Laser";
	public $animColor = "red";
	public $rakeTime = 40;
	public $beamWidth = 2;
	public static $prio = 0;
	public $minDmg = 50;
	public $maxDmg = 70;
	public $optRange = 250;
	public $dmgLoss = 12;
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
	public $rakeTime = 50;
	public $beamWidth = 3;
	public static $prio = 0;
	public $minDmg = 80;
	public $maxDmg = 110;
	public $optRange = 400;
	public $dmgLoss = 9;
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
	public $rakeTime = 60;
	public $beamWidth = 4;
	public static $prio = 0;
	public $minDmg = 160;
	public $maxDmg = 200;
	public $reload = 4;
	public $optRange = 650;
	public $dmgLoss = 6;
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
	public $rakeTime = 70;
	public $beamWidth = 5;
	public static $prio = 0;
	public $minDmg = 190;
	public $maxDmg = 230;
	public $optRange = 850;
	public $dmgLoss = 4;
	public $powerReq = 8;
	public $effiency = 5;
	public $rakes = 3;
	public $integrity = 70;
	public $traverse = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class NeutronLaser extends Laser {
	public $name = "NeutronLaser";
	public $display = "Neutron Laser";
	public $animColor = "#ffeb3e";
	public static $prio = 0;
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

class HeavyAntimatterBeamProjector extends Laser {
	public $name = "HeavyAntimatterBeamProjector";
	public $display = "Heavy Antimatter Beam Projector";
	public $animColor = "#ffeb3e";
	public static $prio = 0;
	public $beamWidth = 4;
	public $minDmg = 265;
	public $maxDmg = 335;
	public $optRange = 1000;
	public $dmgLoss = 2;
	public $accDecay = 50;
	public $shots = 1;
	public $reload = 4;
	public $powerReq = 12;
	public $rakes = 4;
	public $integrity = 62;
	public $traverse = 1;
	public $effiency = 0;
	public $maxBoost = 0;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
		$this->boostEffect = array();
	}
}

class MolecularSlicer extends Laser {
	public $name = "MolecularSlicer";
	public $display = "Molecular Slicer";
	public $dmgType = "Molecular";
	public $rakeTime = 80;
	public $animColor = "purple";
	public $beamWidth = 4;
	public static $prio = 0;
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
	public $animColor = "#ffeb3e";
	public $beamWidth = 2;
	public static $prio = 0;
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
