<?php

class Plasma extends Weapon {
	public $type = "Plasma";
	public $priority = 6;
	public $melt = 50;

	function __construct($id, $parentId, $start, $end, $output = 0, $effiency, $destroyed = 0){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
		$this->boostEffect[] = new Effect("Damage loss", -0.2);
		$this->boostEffect[] = new Effect("Damage", 0.1);
	}
	
	public function getDmgRangeMod($fire){
		$mod = $this->getBoostEffect("Damage loss") * $this->getBoostLevel($fire->turn);
		if ($mod){
			$mod = 1-($fire->dist * $this->dmgLoss / 10000)*(1+$mod);
			Debug::log(get_class($this).", weapon id: ".$this->id.", RANGE DMG mod: ".$mod);
			return $mod;
		} else return 1;
	}

	public function determineDamage($totalDmg, $negation){ // 20, 35
		$shieldDmg = 0;
		$armourDmg = 0;
		$structDmg = 0;

		$armourDmg = round(min($totalDmg, $negation));
		$structDmg = round($totalDmg - $armourDmg);
		$armourDmg += floor($totalDmg / 100 * $this->melt);

		//$armourDmg = ceil(min($totalDmg, $negation)*1.5);
		//$structDmg = min(max(0, $totalDmg - $negation), $totalDmg);
		Debug::log("Plasma DMG: ".$totalDmg.": negation: ".$negation." - DOING ".$armourDmg."/".$structDmg);
		
		return new Divider($shieldDmg * $this->linked, $armourDmg * $this->linked, $structDmg * $this->linked);
	}
}

class LightPlasma extends Plasma {
	public $name = "LightPlasma";
	public $display = "46mm Plasma Gun";
	public $minDmg = 34;
	public $maxDmg = 47;
	public $accDecay = 120;
	public $dmgLoss = 14;
	public $shots = 1;
	public $animColor = "darkGreen";
	public $projSize = 2.5;
	public $projSpeed = 8;
	public $reload = 2;
	public $mass = 18;
	public $traverse = -2;
	public $powerReq = 3;
	public $maxBoost = 1;
	public $effiency = 2;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class MediumPlasma extends Plasma {
	public $name = "MediumPlasma";
	public $display = "78mm Plasma Accelerator";
	public $minDmg = 51;
	public $maxDmg = 69;
	public $accDecay = 120;
	public $dmgLoss = 10;
	public $shots = 1;
	public $animColor = "darkGreen";
	public $projSize = 3;
	public $projSpeed = 6;
	public $reload = 2;
	public $mass = 24;
	public $traverse = -1;
	public $powerReq = 4;
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
	public $powerReq = 6;
	public $maxBoost = 3;
	public $effiency = 4;

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