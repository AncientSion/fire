<?php

class MediumAntiProtonPulsar extends Pulse {
	public $name = "MediumAntiProtonPulsar";
	public $display = "Medium Anti-Matter Pulsar";
	public static $prio = 0;
	public $minDmg = 25;
	public $maxDmg = 33;
	public $accDecay = 120;
	public $shots = 1;
	public $animColor = "#a1ff00";
	public $projSize = 1.5;
	public $projSpeed = 8;
	public $reload = 3;
	public $integrity = 38;
	public $powerReq = 4;
	public $tracking = 3;
	public $basePulses = 2;
	public $extraPulses = 2;

	public $optRange = 300;
	public $maxBoost = 1;
	public $effiency = 0;
	
	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->setAntimatterData();
        $this->boostEffect[] = new Effect("Reload", -1);
        $this->boostEffect[] = new Effect("Top Range", -30);
	}
}

class HeavyAntiProtonPulsar extends MediumAntiProtonPulsar {
	public $name = "HeavyAntiProtonPulsar";
	public $display = "Heavy Anti-Matter Pulsar";
	public static $prio = 0;
	public $minDmg = 30;
	public $maxDmg = 38;
	public $accDecay = 100;
	public $reload = 2;
	public $integrity = 44;
	public $powerReq = 5;
	public $tracking = 4;

	public $optRange = 450;
	
	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
        //$this->setAntimatterData();
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
	public $animColor = "pink";
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
	public $animColor = "pink";
	public $projSize = 4;
	public $projSpeed = 6;

	public $optRange = 700;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
		parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->setAntimatterData();

		$this->effiency = ceil($this->powerReq/1.5);
		$this->maxBoost = 1;
		$this->boostEffect[] = new Effect("Damage", 40);
		$this->boostEffect[] = new Effect("Top Range", -40);
	}
}

?>