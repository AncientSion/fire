<?php

class Laser extends Weapon {
	public $type = "Beam";
	public $animation = "beam";
	public $rakeTime = 35;
	public $beamWidth;
	public $rakes;
	public $laser = 1;
	public $fireMode = "Beam";
	public $dmgType = "Standard";

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);

		$this->notes[] = ("Damage evenly spreads over ".$this->rakes." rakes.");
		$this->boostEffect[] = new Effect("Damage", 20);
	}
}

class LightParticleBeam extends Laser {
	public $name = "LightParticleBeam";
	public $display = "Light Particle Beam";
	public $animColor = "blue";
	public $rakeTime = 35;
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
	public $tracking = 3;
	
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
	public $tracking = 0;

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
	public $optRange = 350;
	public $dmgLoss = 12;
	public $accDecay = 60;
	public $shots = 1;
	public $reload = 3;
	public $powerReq = 3;
	public $effiency = 2;
	public $maxBoost = 1;
	public $rakes = 3;
	public $integrity = 40;
	public $tracking = 2;

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
	public $optRange = 500;
	public $dmgLoss = 9;
	public $powerReq = 4;
	public $effiency = 3;
	public $integrity = 50;
	public $tracking = 3;

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
	public $optRange = 800;
	public $dmgLoss = 6;
	public $powerReq = 6;
	public $effiency = 4;
	public $integrity = 60;
	public $tracking = 4;

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
	public $optRange = 950;
	public $dmgLoss = 4;
	public $powerReq = 8;
	public $effiency = 5;
	public $rakes = 3;
	public $integrity = 70;
	public $tracking = 5;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class NeutronLaser extends Laser {
	public $name = "NeutronLaser";
	public $display = "Neutron Laser";
	public $animColor = "#ffeb3e";
	public $rakeTime = 35;
	public static $prio = 0;
	public $beamWidth = 2;
	public $minDmg = 96;
	public $maxDmg = 131;
	public $optRange = 600;
	public $dmgLoss = 4;
	public $accDecay = 60;
	public $shots = 1;
	public $reload = 3;
	public $powerReq = 4;
	public $rakes = 2;
	public $effiency = 3;
	public $maxBoost = 1;
	public $integrity = 52;
	public $tracking = 4;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class ImprovedNeutronLaser extends NeutronLaser {
	public $name = "ImprovedNeutronLaser";
	public $display = "Imrproved Neutron Laser";
	//public $dmgType = "Phased";
	public $minDmg = 82;
	public $maxDmg = 108;
	public $reload = 2;
	public $optRange = 500;
	public $dmgLoss = 8;
	public $integrity = 46;
	//public $armourSkip = 75;

	public $powerReq = 6;
	public $effiency = 6;
	public $maxBoost = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
		$this->boostEffect[0] = new Effect("Damage", 60);
	}
}

class HeavyNeutronBeamProjector extends Laser {
	public $name = "HeavyNeutronBeamProjector";
	public $display = "Heavy Neutron Beam Projector";
	public $animColor = "#a1ff00";
	public static $prio = 0;
	public $beamWidth = 4;
	public $minDmg = 265;
	public $maxDmg = 335;
	public $optRange = 800;
	public $dmgLoss = 2;
	public $accDecay = 40;
	public $shots = 1;
	public $reload = 4;
	public $powerReq = 14;
	public $rakes = 4;
	public $integrity = 62;
	public $tracking = 5;
	//public $amBonus = 2;
	//public $amMax = 30;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
		$this->boostEffect = array();
        //$this->setAntimatterData();
	}

	public function getBonusDjamage($fire, $baseDmg, $hit){
		//Debug::log("hit #".$hit);
		//Debug::log("req: ".$fire->req);
		//Debug::log("roll: ".$fire->rolls[$hit]);
		$max = floor($baseDmg / 100 * $this->amMax);
		$actual = floor(($fire->req - $fire->rolls[$hit]) * $this->amBonus);
		//Debug::log("getBonusDamage____max ".$max.", actual ".$actual);
		return min($max, $actual);
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
	public $tracking = 3;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
		$this->notes[] = ("Ignores 75% of target armour");
	}
}

?>
