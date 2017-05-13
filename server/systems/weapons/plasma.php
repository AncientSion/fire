<?php

class Plasma extends Weapon {
	public $type = "Plasma";
	public $priority = 6;

	function __construct($id, $parentId, $start, $end, $output = 0, $effiency, $destroyed = 0){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
		//$this->boostEffect = new Effect("Damage", 25);
	}
	
	public function getDmgPenaltyRange($fire){
		return $fire->dist * $this->dmgDecay / -10000;
	}

	public function determineDamage($totalDmg, $negation){ // 20, 35
		$shieldDmg = 0;
		$armourDmg = 0;
		$structDmg = 0;

		$armourDmg = min($totalDmg, $negation)*1.5;
		$structDmg = min(max(0, $totalDmg - $negation), $totalDmg);
		
		return new Divider($shieldDmg * $this->linked, $armourDmg * $this->linked, $structDmg * $this->linked);
	}
}


class MediumPlasma extends Plasma {
	public $name = "MediumPlasma";
	public $display = "78mm Plasma Accelerator";
	public $minDmg = 48;
	public $maxDmg = 62;
	public $accDecay = 100;
	public $dmgDecay = 12;
	public $shots = 1;
	public $animColor = "darkGreen";
	public $projSize = 3;
	public $projSpeed = 6;
	public $reload = 1;
	public $mass = 22;
	public $traverse = 0;
	public $powerReq = 6;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class HeavyPlasma extends Plasma {
	public $name = "HeavyPlasma";
	public $display = "148mm Plasma Cannon";
	public $minDmg = 61;
	public $maxDmg = 76;
	public $accDecay = 85;
	public $dmgDecay = 9;
	public $shots = 1;
	public $animColor = "darkGreen";
	public $projSize = 4;
	public $projSpeed = 6;
	public $reload = 1;
	public $mass = 36;
	public $traverse = 1;
	public $powerReq = 8;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

?>