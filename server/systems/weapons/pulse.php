<?php

class Pulse extends Weapon {
	public $type = "Pulse";
	public $animation = "projectile";
	public $basePulses = 2;
	public $extraPulses = 3;
	public $grouping = 20;
	public $pulse = 1;

	public $notes = array("Hits allocate versus same unit / system", "More hits if to-hit-roll is undercut");

	public $fireMode = "Pulse";

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}

	public function getMultiShotHits($fire, $hit, $element){
		//Debug::log("getMultiShotHits");
		//Debug::log("req: ".$fire->req." last roll: ".$fire->rolls[$hit]);
		return $this->basePulses + min($this->extraPulses, floor(($fire->req - $fire->rolls[$hit]) / $this->grouping));
	}
}

class LightPulseCannon extends Pulse {
	public $name = "LightPulseCannon";
	public $display = "Light Pulse Cannon";
	public static $prio = 0;
	public $minDmg = 13;
	public $maxDmg = 17;
	public $accDecay = 180;
	public $shots = 1;
	public $animColor = "brown";
	public $projSize = 2;
	public $projSpeed = 10;
	public $reload = 2;
	public $integrity = 24;
	public $powerReq = 2;
	public $tracking = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class MediumPulseCannon extends Pulse {
	public $name = "MediumPulseCannon";
	public $display = "Medium Pulse Cannon";
	public static $prio = 0;
	public $minDmg = 23;
	public $maxDmg = 30;
	public $accDecay = 120;
	public $shots = 1;
	public $animColor = "brown";
	public $projSize = 3;
	public $projSpeed = 9;
	public $reload = 3;
	public $integrity = 40;
	public $powerReq = 4;
	public $tracking = 3;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class HeavyPulseCannon extends Pulse {
	public $name = "HeavyPulseCannon";
	public $display = "Heavy Pulse Cannon";
	public static $prio = 0;
	public $minDmg = 39;
	public $maxDmg = 54;
	public $accDecay = 80;
	public $shots = 1;
	public $animColor = "brown";
	public $projSize = 4;
	public $projSpeed = 9;
	public $reload = 4;
	public $integrity = 64;
	public $powerReq = 6;
	public $tracking = 5;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class MediumAntiProtonPulsar extends Pulse {
	public $name = "MediumAntiProtonPulsar";
	public $display = "Medium Photon Pulsar";
	public static $prio = 0;
	public $minDmg = 17;
	public $maxDmg = 22;
	public $accDecay = 80;
	public $shots = 1;
	public $animColor = "#a1ff00";
	public $projSize = 2;
	public $projSpeed = 8;
	public $reload = 3;
	public $integrity = 38;
	public $powerReq = 4;
	public $tracking = 3;
//	public $basePulses = 3;
//	public $extraPulses = 2;

	//public $optRange = 200;
	//public $maxBoost = 1;
	//public $effiency = 0;
	
	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
       // $this->setAntimatterData();
       // $this->boostEffect[] = new Effect("Reload", -1);
       // $this->boostEffect[] = new Effect("Top Range", -30);
	}
}

class HeavyAntiProtonPulsar extends MediumAntiProtonPulsar {
	public $name = "HeavyAntiProtonPulsar";
	public $display = "Heavy Photon Pulsar";
	public static $prio = 0;
	public $minDmg = 30;
	public $maxDmg = 41;
	public $integrity = 48;
	public $powerReq = 6;
	public $tracking = 4;

//	public $optRange = 350;
	
	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
        //$this->setAntimatterData();
	}
}

class NeutronPulsar extends Pulse {
	public $name = "NeutronPulsar";
	public $display = "Neutron Pulsar";
	public static $prio = 0;
	public $minDmg = 17;
	public $maxDmg = 25;
	public $accDecay = 120;
	public $animColor = "green";
	public $projSize = 2;
	public $projSpeed = 9;
	public $reload = 3;
	public $integrity = 36;
	public $powerReq = 4;
	public $tracking = 1;
	public $linked = 2;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class FusionPulseCannonAS extends Pulse {
	public $name = "FusionPulseCannonAS";
	public $display = "Neutron Pulsar (Pulse)";
	public static $prio = 0;
	public $minDmg = 17;
	public $maxDmg = 25;
	public $accDecay = 120;
	public $animColor = "green";
	public $projSize = 2;
	public $projSpeed = 9;
	public $reload = 3;
	public $integrity = 36;
	public $powerReq = 4;
	public $tracking = 3;
	public $linked = 2;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class FusionPulseCannonAF extends Particle {
	public $name = "FusionPulseCannonAF";
	public $display = "Neutron Pulsar (Scatter)";
	public static $prio = 0;
	public $minDmg = 17;
	public $maxDmg = 25;
	public $accDecay = 180;
	public $animColor = "green";
	public $projSize = 2;
	public $projSpeed = 9;
	public $reload = 3;
	public $integrity = 36;
	public $powerReq = 4;
	public $linked = 2;

	public $shots = 2;
	public $tracking = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class LightPlasmaPulse extends LightPulseCannon {
	public $name = "LightPlasmaPulse";
	public $display = "Light Plasma Pulse Cannon";
	public static $prio = 0;
	public $minDmg = 13;
	public $maxDmg = 17;
	public $animColor = "darkGreen";
	public $dmgType = "Plasma";
	public $melt = 50;
	public $dmgLoss = 15;

	public $maxBoost = 1;
	public $effiency = 2;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
		$this->boostEffect[] = new Effect("Damage Loss", -50);
		//$this->boostEffect[] = new Effect("Damage", 10);
		$this->notes[] = ($this->melt."% of total damage is added as extra damage to armour");
	}
}

class MediumPlasmaPulse extends LightPlasmaPulse {
	public $name = "MediumPlasmaPulse";
	public $display = "Medium Plasma Pulse Cannon";
	public static $prio = 0;
	public $minDmg = 23;
	public $maxDmg = 30;
	public $accDecay = 120;
	
	public $projSize = 3;
	public $projSpeed = 9;
	public $reload = 3;
	public $integrity = 40;
	public $powerReq = 4;
	public $tracking = 3;

	public $effiency = 3;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
   }
}

class HeavyPlasmaPulse extends MediumPlasmaPulse {
	public $name = "HeavyPlasmaPulse";
	public $display = "Heavy Plasma Pulse Cannon";
	public static $prio = 0;
	public $minDmg = 39;
	public $maxDmg = 54;
	public $accDecay = 80;
	
	public $projSize = 4;
	public $projSpeed = 9;
	public $reload = 4;
	public $integrity = 64;
	public $powerReq = 6;
	public $tracking = 5;

	public $effiency = 4;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
   }
}

class LightEMPulse extends LightPulseCannon {
	public $name = "LightEMPulse";
	public $display = "Light EM Pulse Cannon";
	public static $prio = 0;
	public $minDmg = 3;
	public $maxDmg = 3;
	public $accDecay = 180;
	public $animation = "em";
	public $animColor = "lightBlue";
	public $projSize = 2;
	public $projSpeed = 8;
	public $reload = 1;
	public $integrity = 24;
	public $powerReq = 3;
	public $tracking = 1;

	public $em = 1;
	public $dmgType = "EM";

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
		$this->notes = array("Does no structural damage", "Damage that exceeds target' armour is 2x as effective when causing criticals");
	}
}

?>