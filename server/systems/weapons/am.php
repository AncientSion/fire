<?php

class AntimatterConverter extends Particle {
	public $name = "AntimatterConverter";
	public $display = "Antimatter-Converter";
	public $fireMode = "Flash";
	public static $prio = 0;
	public $minDmg = 80;
	public $maxDmg = 80;
	public $accDecay = 140;
	public $shots = 1;
	public $animColor = "#cc33ff";
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

class AntimatterBlaster extends Particle {
	public $name = "AntimatterBlaster";
	public $display = "Antimatter Blaster";
	public static $prio = 0;
	public $minDmg = 26;
	public $maxDmg = 33;
	public $accDecay = 100;
	public $shots = 1;
	public $reload = 1;
	public $integrity = 32;
	public $powerReq = 4;
	public $tracking = 3;
	public $animColor = "#cc33ff";
	public $projSize = 4;
	public $projSpeed = 6;
	public $projDelay = 4;

	public $optRange = 350;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
		parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->setAntimatterData();
	}
}

class HeavyAntimatterCannon extends AntimatterBlaster {
	public $name = "HeavyAntimatterCannon";
	public $display = "Heavy Anti-Matter Cannon";
	public static $prio = 0;
	public $minDmg = 42;
	public $maxDmg = 56;
	public $accDecay = 100;
	public $shots = 2;
	public $reload = 3;
	public $integrity = 48;
	public $powerReq = 6;
	public $tracking = 5;
	public $projSize = 4;
	public $projSpeed = 6;
	public $projDelay = 4;

	public $optRange = 700;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
		parent::__construct($id, $parentId, $start, $end, $output, $width);

		$this->effiency = ceil($this->powerReq/1.5);
		$this->maxBoost = 1;
		$this->boostEffect[] = new Effect("Damage", 40);
		$this->boostEffect[] = new Effect("Top Range", -60);
	}
}

?>