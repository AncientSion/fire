<?php

class Matter extends Weapon {
	public $type = "Particle";
	public $animation = "projectile";

	public $fireMode = "Standard";
	public $dmgType = "Matter";
	public $armourSkip = 0;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class MediumRailGun extends Matter {
	public $name = "MediumRailGun";
	public $display = "Medium Railgun";
	public static $prio = 0;
	public $minDmg = 32;
	public $maxDmg = 38;
	public $accDecay = 100;
	public $shots = 2;
	public $animColor = "grey";
	public $projSize = 3;
	public $projSpeed = 11;
	public $reload = 3;
	public $integrity = 44;
	public $powerReq = 3;
	public $tracking = 3;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class HeavyRailGun extends Matter {
	public $name = "HeavyRailGun";
	public $display = "Heavy Railgun";
	public static $prio = 0;
	public $minDmg = 55;
	public $maxDmg = 68;
	public $accDecay = 80;
	public $shots = 2;
	public $animColor = "grey";
	public $projSize = 4;
	public $projSpeed = 9;
	public $reload = 4;
	public $integrity = 56;
	public $powerReq = 6;
	public $tracking = 5;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class Test extends MediumRailGun {
	public $name = "Test";
	public $display = "Test";
	public static $prio = 0;
	public $minDmg = 1;
	public $maxDmg = 1;
	public $shots = 100;
	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}	

	public function determineDamage($totalDmg, $negation){
		$shieldDmg = 0;
		$armourDmg = 0;
		$systemDmg = 0;

		$armourDmg = 0;
		$systemDmg = $totalDmg - $armourDmg;
		
		return new Divider($shieldDmg * $this->linked, $armourDmg * $this->linked, $systemDmg * $this->linked);
	}
}





?>