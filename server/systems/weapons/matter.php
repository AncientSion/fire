<?php

class Matter extends Weapon {
	public $type = "Particle";
	public $animation = "projectile";
	public $priority = 4;

	public $notes = array("Ignores 50% of target armour");

	public $fireMode = "Standard";
	public $dmgType = "Matter";

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class MediumRailGun extends Matter {
	public $name = "MediumRailGun";
	public $display = "127mm Rail Gun";
	public $minDmg = 36;
	public $maxDmg = 36;
	public $accDecay = 100;
	public $shots = 2;
	public $animColor = "grey";
	public $projSize = 3;
	public $projSpeed = 13;
	public $reload = 3;
	public $integrity = 40;
	public $powerReq = 3;
	public $traverse = -1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class HeavyRailGun extends Matter {
	public $name = "HeavyRailGun";
	public $display = "203mm Rail Gun";
	public $minDmg = 64;
	public $maxDmg = 64;
	public $accDecay = 80;
	public $shots = 2;
	public $animColor = "grey";
	public $projSize = 4;
	public $projSpeed = 10;
	public $reload = 4;
	public $integrity = 56;
	public $powerReq = 6;
	public $traverse = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class Test extends MediumRailGun {
	public $name = "Test";
	public $display = "Test";
	public $minDmg = 1;
	public $maxDmg = 1;
	public $shots = 100;
	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}	

	public function determineDamage($totalDmg, $negation){
		$shieldDmg = 0;
		$armourDmg = 0;
		$structDmg = 0;

		$armourDmg = 0;
		$structDmg = $totalDmg - $armourDmg;
		
		return new Divider($shieldDmg * $this->linked, $armourDmg * $this->linked, $structDmg * $this->linked);
	}
}





?>