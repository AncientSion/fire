<?php

class Particle extends Weapon {
	public $type = "Particle";
	public $particle = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class AsteroidRam extends Particle {
	public $name = "AsteroidRam";
	public $display = "Asteroid Collision";
	public $animation = "contact";
	public static $prio = 0;
	public $tracking = 0;
	public $critEffects = array();

	function __construct($id, $parentId, $minDmg, $maxDmg, $shots){
        parent::__construct($id, $parentId, 0, 0, 0, 0);
        $this->shots = $shots; // vs Medium / 4
        $this->minDmg = $minDmg;
        $this->maxDmg = $maxDmg;
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
	public $tracking = 0;

	public $animColor = "orange";
	public $projSize = 2;
	public $projSpeed = 9;
	
	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class TriParticleInterdictor extends Particle {
	public $name = "TriParticleInterdictor";
	public $display = " Tri Particle Interdictor";
	public static $prio = 0;
	public $minDmg = 13;
	public $maxDmg = 17;
	public $accDecay = 180;
	public $shots = 3;
	public $animColor = "orange";
	public $projSize = 1;
	public $projSpeed = 8;
	public $reload = 2;
	public $integrity = 28;
	public $powerReq = 3;
	public $tracking = 1;
	//public $linked = 3;
	
	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
       // $this->boostEffect[] = new Effect("Reload", -1);
	}
}


class LightParticle extends Particle {
	public $name = "LightParticle";
	public $display = "Light Particle Bolter Array";
	public static $prio = 0;
	public $minDmg = 11;
	public $maxDmg = 15;
	public $accDecay = 180;
	public $shots = 4;	
	public $reload = 2;
	public $integrity = 28;
	public $powerReq = 3;
	public $tracking = 1;
	public $effiency = 3;
	public $maxBoost = 1;

	public $animColor = "orange";
	public $projSize = 1;
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
	public $powerReq = 4;
	public $tracking = 3;
	public $effiency = 3;

	public $animColor = "orange";
	public $projSize = 3;
	public $projSpeed = 7;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
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
	public $tracking = 5;
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
	public $tracking = 5;
	public $effiency = 4;

	public $animColor = "orange";
	public $projSize = 4;
	public $projSpeed = 6;

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
	public $tracking = 3;
	public $effiency = 3;

	public $animColor = "orange";
	public $projSize = 3;
	public $projSpeed = 7;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
		$this->notes = array("Area of Effect");
        $this->setShockData();
	}

	public function getMultiShotHits($fire, $hit, $element){
		//Debug::log("getMultiShotHits versus ".$element->name.", system ? :".$element->system);
		if ($element->system){return $this->dmgs[2];}
		return $this->dmgs[$fire->target->traverse];
	}
}
class FusionCannonA extends Particle {
	public $name = "FusionCannonA";
	public $display = "FusionCannonA";
	public static $prio = 0;
	public $minDmg = 34;
	public $maxDmg = 43;
	public $accDecay = 120;
	public $shots = 1;
	public $reload = 2;
	public $powerReq = 3;
	public $tracking = 3;

	public $animColor = "green";
	public $projSize = 3;
	public $projSpeed = 7;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class FusionCannonB extends FusionCannonA {
	public $name = "FusionCannonB";
	public $display = "FusionCannonB";
	public static $prio = 0;
	public $minDmg = 15;
	public $maxDmg = 19;
	public $shots = 2;	
	public $tracking = 1;
	public $projSize = 2;
	public $projSpeed = 9;
}


class FusionCannon extends Particle {
	public $name = "FusionCannon";
	public $display = "Medium Fusion Cannon";
	public static $prio = 0;
	public $minDmg = 134;
	public $maxDmg = 143;
	public $accDecay = 120;
	public $shots = 1;
	public $reload = 2;
	public $integrity = 40;
	public $powerReq = 3;
	public $tracking = 3;

	public $animColor = "green";
	public $projSize = 3;
	public $projSpeed = 7;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class HeavyFusionCannon extends FusionCannon {
	public $name = "HeavyFusionCannon";
	public $display = "Heavy Fusion Cannon";
	public static $prio = 0;
	public $minDmg = 44;
	public $maxDmg = 56;
	public $integrity = 46;
	public $powerReq = 4;
	public $tracking = 4;

	public $projSize = 4;
	public $projSpeed = 7;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class EM extends Particle {
	public $animation = "em";
	public $animColor = "lightBlue";
	public $projSize = 2;
	public $projSpeed = 10;
	public $em = 1;
	public $dmgType = "EM";

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->setEMData();
		$this->boostEffect[] = new Effect("Damage Loss", -50);
	}
}

class TwinEMProjector extends EM {
	public $name = "TwinEMProjector";
	public $display = "Twin EM Projector";
	public static $prio = 0;
	public $minDmg = 11;
	public $maxDmg = 14;
	public $accDecay = 180;
	public $shots = 1;
	public $linked = 2;
	public $reload = 2;
	public $integrity = 24;
	public $powerReq = 3;
	public $tracking = 0;
	public $dmgLoss = 20;
	public $effiency = 3;
	public $maxBoost = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
		parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class EMSubjugator extends EM {
	public $name = "EMSubjugator";
	public $display = "EM Subjugator";
	public static $prio = 0;
	public $minDmg = 22;
	public $maxDmg = 28;
	public $accDecay = 120;
	public $shots = 3;
	public $reload = 3;
	public $integrity = 24;
	public $powerReq = 5;
	public $tracking = 3;
	public $dmgLoss = 20;
	public $effiency = 3;
	public $maxBoost = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
		parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

?>