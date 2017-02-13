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
	public $display = "Mdm Rail Gun";
	public $minDmg = 46;
	public $maxDmg = 58;
	public $accDecay = 90;
	public $shots = 1;
	public $animColor = "grey";
	public $projSize = 3;
	public $projSpeed = 13;
	public $exploSize = 5;
	public $reload = 2;
	public $integrity = 45;
	public $fc = array(0 => 100, 1 => 80);


	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class HeavyRailGun extends Matter {
	public $name = "HeavyRailGun";
	public $display = "Hvy Rail Gun";
	public $minDmg = 82;
	public $maxDmg = 108;
	public $accDecay = 65;
	public $shots = 1;
	public $animColor = "grey";
	public $projSize = 4;
	public $projSpeed = 10;
	public $exploSize = 8;
	public $reload = 3;
	public $integrity = 75;
	public $fc = array(0 => 130, 1 => 85);

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}




?>