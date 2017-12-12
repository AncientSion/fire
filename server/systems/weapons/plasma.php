<?php

class Plasma extends Weapon {
	public $type = "Plasma";
	public $priority = 6;
	public $melt = 50;

	function __construct($id, $parentId, $start, $end, $output = 0, $effiency, $destroyed = 0){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
		$this->boostEffect[] = new Effect("Damage loss", -20);
		$this->boostEffect[] = new Effect("Damage", 10);
	}
	
	public function getDmgRangeMod($fire){
		$boost = $this->getBoostEffect("Damage loss") * $this->getBoostLevel($fire->turn);
		$mod = 1 - $boost;
		$mod *= $fire->dist * $this->dmgLoss / 10000;

		Debug::log(get_class($this).", weapon id: ".$this->id.", RANGE DMG MOD: ".$mod);
		return $mod;
	}

	public function determineDamage($totalDmg, $negation){
		$shieldDmg = 0;
		$armourDmg = 0;
		$structDmg = 0;
		$notes = "";

		if ($totalDmg <= array_sum($negation)){ 
			$notes = "block;";
			$armourDmg = round($totalDmg);
		}
		else {
			$notes = "pen;";
			$shieldDmg = round(min($totalDmg, $negation["bonus"]));
			$armourDmg = round(min($totalDmg-$shieldDmg, $negation["stock"]));
			$structDmg = round($totalDmg - $shieldDmg - $armourDmg);
			$armourDmg += floor($totalDmg / 100 * $this->melt);
		}

		return new Divider($shieldDmg * $this->linked, $armourDmg * $this->linked, $structDmg * $this->linked, $notes);
	}
}

class LightPlasma extends Plasma {
	public $name = "LightPlasma";
	public $display = "46mm Plasma Gun";
	public $minDmg = 33;
	public $maxDmg = 46;
	public $accDecay = 120;
	public $dmgLoss = 14;
	public $shots = 1;
	public $animColor = "darkGreen";
	public $projSize = 2.5;
	public $projSpeed = 8;
	public $reload = 2;
	public $mass = 18;
	public $traverse = -2;
	public $powerReq = 4;
	public $maxBoost = 1;
	public $effiency = 2;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class MediumPlasma extends Plasma {
	public $name = "MediumPlasma";
	public $display = "78mm Plasma Accelerator";
	public $minDmg = 48;
	public $maxDmg = 66;
	public $accDecay = 120;
	public $dmgLoss = 10;
	public $shots = 1;
	public $animColor = "darkGreen";
	public $projSize = 3;
	public $projSpeed = 6;
	public $reload = 2;
	public $mass = 24;
	public $traverse = -1;
	public $powerReq = 6;
	public $maxBoost = 2;
	public $effiency = 3;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class HeavyPlasma extends Plasma {
	public $name = "HeavyPlasma";
	public $display = "148mm Plasma Cannon";
	public $minDmg = 75;
	public $maxDmg = 98;
	public $accDecay = 120;
	public $dmgLoss = 6;
	public $shots = 1;
	public $animColor = "darkGreen";
	public $projSize = 4;
	public $projSpeed = 5;
	public $reload = 3;
	public $mass = 32;
	public $traverse = 1;
	public $powerReq = 9;
	public $maxBoost = 3;
	public $effiency = 3;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class PlasmaShotgun extends Plasma {
	public $name = "PlasmaShotgun";
	public $display = "6x36mm Plasma Shotgun";
	public $minDmg = 22;
	public $maxDmg = 28;
	public $accDecay = 120;
	public $dmgLoss = 16;
	public $shots = 1;
	public $animColor = "darkGreen";
	public $projSize = 3;
	public $projSpeed = 4;
	public $reload = 2;
	public $mass = 25;
	public $traverse = 0;
	public $powerReq = 6;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

?>