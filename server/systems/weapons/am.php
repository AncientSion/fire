<?php

class LightAntiProtonPulsar extends Pulse {
	public $name = "LightAntiProtonPulsar";
	public $display = "Light Anti-Proton Pulsar";
	public static $prio = 0;
	public $minDmg = 11;
	public $maxDmg = 15;
	public $accDecay = 180;
	public $shots = 1;
	public $animColor = "blue";
	public $projSize = 1;
	public $projSpeed = 8;
	public $reload = 2;
	public $integrity = 28;
	public $powerReq = 2;
	public $tracking = 0;
	public $basePulses = 2;
	public $extraPulses = 2;
	public $grouping = 15;
	public $linked = 2;

	public $optRange = 150;
	
	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->setAntimatterData();
	}
}

class MediumAntiProtonPulsar extends LightAntiProtonPulsar {
	public $name = "MediumAntiProtonPulsar";
	public $display = "Anti-Proton Pulsar";
	public static $prio = 0;
	public $minDmg = 19;
	public $maxDmg = 25;
	public $accDecay = 120;
	public $shots = 1;
	public $animColor = "blue";
	public $projSize = 1;
	public $projSpeed = 8;
	public $reload = 2;
	public $integrity = 38;
	public $powerReq = 2;
	public $tracking = 3;

	public $optRange = 300;
	
	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class AntimatterConverter extends Particle {
	public $name = "AntimatterConverter";
	public $display = "Antimatter-Converter";
	public $fireMode = "Flash";
	public static $prio = 0;
	public $minDmg = 80;
	public $maxDmg = 80;
	public $accDecay = 140;
	public $shots = 1;
	public $animColor = "#a1ff00";
	public $projSize = 3.5;
	public $projSpeed = 6;
	public $reload = 3;
	public $integrity = 45;
	public $powerReq = 4;
	public $tracking = 4;
	public $optRange = 400;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
		parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->setAntimatterData();
        $this->setFlashData();
	}

	public function getBaseDamage($fire, $system){
		if ($fire->target->squad){return $this->dmgs[1];}
		return mt_rand($this->getMinDamage(), $this->getMaxDamage());
	}
}

class HeavyAntimatterConverter extends AntimatterConverter {
	public $name = "HeavyAntimatterConverter";
	public $display = "Heavy Antimatter-Converter";
	public static $prio = 0;
	public $minDmg = 125;
	public $maxDmg = 125;
	public $projSize = 5;
	public $projSpeed = 6;
	public $reload = 3;
	public $integrity = 60;
	public $powerReq = 7;
	public $tracking = 5;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
		parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class AntimatterCannon extends Particle {
	public $name = "AntimatterCannon";
	public $display = "Anti-Matter Cannon";
	public static $prio = 0;
	public $minDmg = 34;
	public $maxDmg = 46;
	public $accDecay = 90;
	public $shots = 2;
	public $reload = 3;
	public $integrity = 48;
	public $powerReq = 6;
	public $tracking = 4;
	public $animColor = "blue";
	public $projSize = 4;
	public $projSpeed = 6;

	public $optRange = 600;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
		parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->setAntimatterData();
	}
}

?>