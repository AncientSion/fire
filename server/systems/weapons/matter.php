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
		$notes = "";

		if ($totalDmg <= array_sum($negation)){ 
			$notes = "b;";
			$armourDmg = round($totalDmg/2);
		}
		else {
			$notes = "p;";
			$shieldDmg = round(min($totalDmg, $negation["bonus"]/2));
			$armourDmg = round(min($totalDmg-$shieldDmg, $negation["stock"]/2));
			$structDmg = round($totalDmg - $shieldDmg - $armourDmg);
		}
		
		return new Divider($shieldDmg * $this->linked, $armourDmg * $this->linked, $structDmg * $this->linked, $notes);
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
	public $mass = 20;
	public $powerReq = 3;
	public $traverse = -1;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class HeavyRailGun extends Matter {
	public $name = "HeavyRailGun";
	public $display = "203mm Rail Gun";
	public $minDmg = 65;
	public $maxDmg = 65;
	public $accDecay = 80;
	public $shots = 2;
	public $animColor = "grey";
	public $projSize = 4;
	public $projSpeed = 10;
	public $reload = 4;
	public $mass = 28;
	public $powerReq = 6;
	public $traverse = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class Test extends MediumRailGun {
	public $name = "Test";
	public $display = "Test";
	public $minDmg = 1;
	public $maxDmg = 1;
	public $shots = 100;
	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
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