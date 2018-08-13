<?php

class Plasma extends Weapon {
	public $type = "Particle";
	public $animColor = "darkGreen";
	public $melt = 50;
	public $plasma = 1;

	public $fireMode = "Standard";
	public $dmgType = "Plasma";

	function __construct($id, $parentId, $start, $end, $output = 0, $effiency, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
		$this->boostEffect[] = new Effect("Damage loss", -50);
		//$this->boostEffect[] = new Effect("Damage", 10);
		$this->notes = array($this->melt."% of total damage is added as extra damage to armour");
	}
	
	public function getDmgRangeMod($fire){
		$boost = (100 + ($this->getBoostEffect("Damage loss") * $this->getBoostLevel($fire->turn))) / 100;
		$loss = $fire->dist * ($this->dmgLoss * $boost) / 10000;

		//Debug::log(get_class($this).", weapon id: ".$this->id.", boostMod: ".$boost.", final multi: ".(1-$loss));
		return 1-$loss;
	}
}

class LightPlasmaShredder extends Plasma {
	public $name = "LightPlasmaShredder";
	public $display = "Light Plasma Shredder";
	public static $prio = 0;
	public $minDmg = 15;
	public $maxDmg = 20;
	public $accDecay = 120;
	public $dmgLoss = 14;
	public $shots = 1;
	public $projSize = 2.5;
	public $projSpeed = 8;
	public $reload = 2;
	public $integrity = 36;
	public $traverse = 3;
	public $powerReq = 3;
	public $maxBoost = 1;
	public $effiency = 3;
	public $linked = 2;
	public $melt = 250;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}

	public function getValidEffects(){
		return array( // type, mag, dura, effect
			array("Damage Loss", 80, 0, 0),
			array("Accuracy", 100, 0, 0),
			array("Destroyed", 180, 0, 1),
		);
	}
}

class LightPlasma extends Plasma {
	public $name = "LightPlasma";
	public $display = "Light Plasma Cannon";
	public static $prio = 0;
	public $minDmg = 56;
	public $maxDmg = 77;
	public $accDecay = 120;
	public $dmgLoss = 10;
	public $shots = 1;
	public $projSize = 2.5;
	public $projSpeed = 8;
	public $reload = 2;
	public $integrity = 36;
	public $traverse = 3;
	public $powerReq = 3;
	public $maxBoost = 1;
	public $effiency = 2;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class MediumPlasma extends LightPlasma {
	public $name = "MediumPlasma";
	public $display = "Medium Plasma Cannon";
	public static $prio = 0;
	public $minDmg = 54;
	public $maxDmg = 70;
	public $projSize = 3;
	public $reload = 2;
	public $integrity = 48;
	public $traverse = 4;
	public $powerReq = 5;
	public $effiency = 2;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class HeavyPlasma extends MediumPlasma {
	public $name = "HeavyPlasma";
	public $display = "Heavy Plasma Cannon";
	public static $prio = 0;
	public $minDmg = 75;
	public $maxDmg = 98;
	public $accDecay = 120;
	public $projSize = 4;
	public $integrity = 64;
	public $traverse = 5;
	public $powerReq = 8;
	public $effiency = 3;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class MagCompressor extends Plasma {
	public $name = "MagCompressor";
	public $display = "Mag-Plasma Compressor";
	public $fireMode = "Flash";
	public $usage = 2;
	public $freeAim = 0;
	public static $prio = 0;
	public $minDmg = 80;
	public $maxDmg = 80;
	public $accDecay = 120;
	public $dmgLoss = 8;
	public $shots = 1;
	public $animColor = "green";
	public $projSize = 4;
	public $projSpeed = 6;
	public $reload = 4;
	public $integrity = 54;
	public $powerReq = 6;
	public $effiency = 4;
	public $traverse = 4;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
		parent::__construct($id, $parentId, $start, $end, $output, $width);
		$this->setFlashData();
	}
}

?>