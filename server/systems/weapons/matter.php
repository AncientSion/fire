<?php

class Matter extends Weapon {
	public $type = "Matter";
	public $animation = "projectile";
	public $priority = 4;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}	

	public function determineDamage($totalDmg, $negation){
		$shieldDmg = 0;
		$armourDmg = 0;
		$structDmg = 0;

		$armourDmg = $negation / 2;
		$structDmg = $totalDmg - $armourDmg;
		
		return new Divider($shieldDmg * $this->linked, $armourDmg * $this->linked, $structDmg * $this->linked);
	}
}

class MediumRailGun extends Matter {
	public $name = "MediumRailGun";
	public $display = "127mm Rail Gun";
	public $minDmg = 34;
	public $maxDmg = 46;
	public $accDecay = 90;
	public $shots = 2;
	public $animColor = "grey";
	public $projSize = 3;
	public $projSpeed = 13;
	public $exploSize = 5;
	public $reload = 2;
	public $fc = array(0 => 100, 1 => 80);
	public $mass = 20;
	public $powerReq = 4;
	public $traverse = 0;


	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class HeavyRailGun extends Matter {
	public $name = "HeavyRailGun";
	public $display = "203mm Rail Gun";
	public $minDmg = 60;
	public $maxDmg = 78;
	public $accDecay = 65;
	public $shots = 2;
	public $animColor = "grey";
	public $projSize = 4;
	public $projSpeed = 10;
	public $exploSize = 6.5;
	public $reload = 3;
	public $fc = array(0 => 130, 1 => 85);
	public $mass = 26;
	public $powerReq = 6;
	public $traverse = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}




?>