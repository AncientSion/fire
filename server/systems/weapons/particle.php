<?php

class Particle extends Weapon {
	public $type = "Particle";
	public $particle = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class TwinParticleBolter extends Particle {
	public $name = "TwinParticleBolter";
	public $display = "Twin Particle Bolter";
	public static $prio = 0;
	public $minDmg = 9;
	public $maxDmg = 13;
	public $accDecay = 180;
	public $shots = 2;
	public $linked = 2;
	public $reload = 2;
	public $integrity = 24;
	public $powerReq = 2;
	public $traverse = 0;

	public $animColor = "orange";
	public $projSize = 2;
	public $projSpeed = 9;
	
	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class LightParticle extends Particle {
	public $name = "LightParticle";
	public $display = "Light Particle Bolter Array";
	public static $prio = 0;
	public $minDmg = 220;
	public $maxDmg = 260;
	public $accDecay = 180;
	public $shots = 4;	
	public $reload = 2;
	public $integrity = 28;
	public $powerReq = 2;
	public $traverse = 0;
	public $effiency = 3;
	public $maxBoost = 1;

	public $animColor = "orange";
	public $projSize = 2;
	public $projSpeed = 8;
	
	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->boostEffect[] = new Effect("Reload", -1);
	}
}

class MediumParticle extends LightParticle {
	public $name = "MediumParticle";
	public $display = "Medium Particle Cannon";
	public static $prio = 0;
	public $minDmg = 28;
	public $maxDmg = 36;
	public $accDecay = 120;
	public $shots = 2;
	public $reload = 3;
	public $integrity = 36;
	public $powerReq = 3;
	public $traverse = 3;
	public $effiency = 3;

	public $animColor = "orange";
	public $projSize = 3;
	public $projSpeed = 7;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class MediumShock extends Particle {
	public $name = "MediumShock";
	public $display = "MediumShock";
	public $fireMode = "Shockwave";
	public static $prio = 0;
	public $minDmg = 16;
	public $maxDmg = 18;
	public $accDecay = 120;
	public $shots = 1;
	public $reload = 3;
	public $integrity = 36;
	public $powerReq = 3;
	public $traverse = 3;
	public $effiency = 3;

	public $animColor = "orange";
	public $projSize = 3;
	public $projSpeed = 7;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
		$this->notes = array("Area of Effect");
        $this->setShockData();
	}

	public function getMultiShotHits($fire, $element){
		//Debug::log("getMultiShotHits versus ".$element->name.", system ? :".$element->system);
		if ($element->system){return $this->dmgs[2];}
		return $this->dmgs[$fire->target->traverse];
	}
}

class HeavyParticle extends MediumParticle {
	public $name = "HeavyParticle";
	public $display = "Heavy Particle Cannon";
	public static $prio = 0;
	public $minDmg = 54;
	public $maxDmg = 69;
	public $accDecay = 80;
	public $shots = 2;
	public $reload = 4;
	public $integrity = 64;
	public $powerReq = 6;
	public $traverse = 5;
	public $effiency = 4;

	public $animColor = "orange";
	public $projSize = 4;
	public $projSpeed = 6;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class SuperHeavyParticle extends HeavyParticle {
	public $name = "SuperHeavyParticle";
	public $display = "Super-Heavy Particle Cannon";
	public static $prio = 0;
	public $minDmg = 64;
	public $maxDmg = 82;
	public $accDecay = 60;
	public $shots = 3;
	public $reload = 6;
	public $integrity = 74;
	public $powerReq = 10;
	public $traverse = 5;
	public $effiency = 4;

	public $animColor = "orange";
	public $projSize = 4;
	public $projSpeed = 6;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class FusionCannon extends Particle {
	public $name = "FusionCannon";
	public $display = "Medium Fusion Cannon";
	public static $prio = 0;
	public $minDmg = 34;
	public $maxDmg = 45;
	public $accDecay = 100;
	public $shots = 1;
	public $reload = 2;
	public $integrity = 40;
	public $powerReq = 2;
	public $traverse = 3;

	public $animColor = "green";
	public $projSize = 3;
	public $projSpeed = 7;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class HeavyFusionCannon extends Particle {
	public $name = "HeavyFusionCannon";
	public $display = "Heavy Fusion Cannon";
	public static $prio = 0;
	public $minDmg = 42;
	public $maxDmg = 56;
	public $accDecay = 100;
	public $shots = 1;
	public $reload = 2;
	public $integrity = 46;
	public $powerReq = 3;
	public $traverse = 3;

	public $animColor = "green";
	public $projSize = 4;
	public $projSpeed = 7;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class AntimatterConverter extends Particle {
	public $name = "AntimatterConverter";
	public $display = "Antimatter-Converter";
	public $fireMode = "Flash";
	//public $dmgType = "Antimatter";
	public static $prio = 0;
	public $minDmg = 12;
	public $accDecay = -120;
	public $shots = 1;
	public $animColor = "#a1ff00";
	public $projSize = 5;
	public $projSpeed = 6;
	public $reload = 3;
	public $integrity = 60;
	public $powerReq = 7;
	public $traverse = 5;
	public $amBonus = 2;
	public $amMax = 80;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
		parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->setFlashData();
        $this->setAntimatterData();
	}

	public function getBonusDamage($fire, $baseDmg, $hit){
		//Debug::log("hit #".$hit);
		//Debug::log("req: ".$fire->req);p
		//Debug::log("roll: ".$fire->rolls[$hit]);
		return min($baseDmg / 100 * $this->amMax, ($fire->req - $fire->rolls[$hit]) * $this->amBonus);
	}
}

class TwinEMProjector extends Particle {
	public $name = "TwinEMProjector";
	public $display = "Twin EM Projector";
	public static $prio = 0;
	public $minDmg = 11;
	public $maxDmg = 14;
	public $accDecay = 240;
	public $shots = 1;
	public $linked = 2;
	public $reload = 2;
	public $integrity = 24;
	public $powerReq = 3;
	public $traverse = 0;
	public $effiency = 3;
	public $maxBoost = 1;

	public $animation = "em";
	public $animColor = "lightBlue";
	public $projSize = 2;
	public $projSpeed = 10;

	public $em = 1;
	public $dmgType = "EM";

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->setEMData();
		$this->boostEffect[] = new Effect("Reload", -1);
	}
}

class MediumEMDissipator extends Particle {
	public $name = "MediumEMDissipator";
	public $display = "Medium EM Dissipator";
	public static $prio = 0;
	public $minDmg = 20;
	public $maxDmg = 24;
	public $accDecay = 120;
	public $shots = 1;
	public $reload = 2;
	public $integrity = 34;
	public $powerReq = 3;
	public $traverse = 0;

	public $animation = "em";
	public $animColor = "lightBlue";
	public $projSize = 3;
	public $projSpeed = 7;

	public $em = 1;
	public $dmgType = "EM";

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->setEMData();
	}
}

?>