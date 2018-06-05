<?php

class Pulse extends Weapon {
	public $type = "Pulse";
	public $animation = "projectile";
	public $basePulses = 1;
	public $extraPulses = 4;
	public $grouping = 15;
	public $pulse = 1;

	public $notes = array("Hits allocate versus same unit / system", "More hits if to-hit-roll is undercut");

	public $fireMode = "Pulse";

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class LightPulse extends Pulse {
	public $name = "LightPulse";
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
	public $traverse = -3;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class MediumPulse extends Pulse {
	public $name = "MediumPulse";
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
	public $traverse = -1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class HeavyPulse extends Pulse {
	public $name = "HeavyPulse";
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
	public $traverse = 0;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class FusionPulsar extends Pulse {
	public $name = "FusionPulsar";
	public $display = "Fusion Pulsar";
	public static $prio = 0;
	public $minDmg = 25;
	public $maxDmg = 32;
	public $accDecay = 180;
	public $animColor = "lightGreen";
	public $projSize = 2;
	public $projSpeed = 12;
	public $reload = 3;
	public $integrity = 36;
	public $powerReq = 3;
	public $traverse = -3;
	public $basePulses = 3;
	public $extraPulses = 3;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class LightPlasmaPulse extends LightPulse {
	public $name = "LightPlasmaPulse";
	public $display = "Light Plasma Pulse Cannon";
	public static $prio = 0;
	public $minDmg = 13;
	public $maxDmg = 17;
	public $animColor = "darkGreen";
	public $dmgType = "Plasma";
	public $melt = 50;
	public $dmgLoss = 18;

	public $maxBoost = 1;
	public $effiency = 2;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
		$this->boostEffect[] = new Effect("Damage loss", -25);
		$this->boostEffect[] = new Effect("Damage", 10);
		$this->notes[] = ($this->melt."% of total damage is added as extra damage to armour");
	}
	
	public function getDmgRangeMod($fire){
		$boost = (100 + ($this->getBoostEffect("Damage loss") * $this->getBoostLevel($fire->turn))) / 100;
		$loss = $fire->dist * ($this->dmgLoss * $boost) / 10000;

		Debug::log(get_class($this).", weapon id: ".$this->id.", boost: ".$boost.", final multi: ".(1-$loss)." @ dist: ".$fire->dist);
		return 1-$loss;
	}
}

class MediumPlasmaPulse extends LightPlasmaPulse {
	public $name = "MediumPlasmaPulse";
	public $display = "Medium Plasma Pulse Cannon";
	public static $prio = 0;
	public $minDmg = 23;
	public $maxDmg = 30;
	public $accDecay = 120;
	public $dmgLoss = 14;
	
	public $projSize = 3;
	public $projSpeed = 9;
	public $reload = 3;
	public $integrity = 40;
	public $powerReq = 4;
	public $traverse = -1;

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
	public $dmgLoss = 10;
	
	public $projSize = 4;
	public $projSpeed = 9;
	public $reload = 4;
	public $integrity = 64;
	public $powerReq = 6;
	public $traverse = 0;

	public $effiency = 4;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
   }
}

class LightEMPulse extends LightPulse {
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
	public $traverse = -3;

	public $em = 1;
	public $dmgType = "EM";

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
		$this->notes = array("Does no structural damage", "Damage that exceeds target' armour is 2x as effective when causing criticals");
	}
}

?>