<?php

class Particle extends Weapon {
	public $type = "Particle";
	public $priority = 10;
	public $particle = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class LightParticle extends Particle {
	public $name = "LightParticle";
	public $display = "32mm Particle Bolter Array";
	public $minDmg = 12;
	public $maxDmg = 16;
	public $accDecay = 180;
	public $shots = 4;	
	public $reload = 2;
	public $integrity = 28;
	public $powerReq = 2;
	public $traverse = -4;
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
	public $display = "68mm Particle Emitter";
	public $minDmg = 30;
	public $maxDmg = 38;
	public $accDecay = 120;
	public $shots = 2;
	public $reload = 3;
	public $integrity = 36;
	public $powerReq = 3;
	public $traverse = -1;
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
	public $display = "122mm Particle Cannon";
	public $minDmg = 59;
	public $maxDmg = 74;
	public $accDecay = 80;
	public $shots = 2;
	public $reload = 4;
	public $integrity = 64;
	public $powerReq = 6;
	public $traverse = 1;
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
	public $display = "138mm Particle Accelerator";
	public $minDmg = 64;
	public $maxDmg = 82;
	public $accDecay = 60;
	public $shots = 3;
	public $reload = 6;
	public $integrity = 84;
	public $powerReq = 8;
	public $traverse = 1;
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
	public $display = "42mm Fusion Cannon";
	public $minDmg = 34;
	public $maxDmg = 42;
	public $accDecay = 120;
	public $shots = 1;
	public $reload = 2;
	public $integrity = 34;
	public $powerReq = 2;
	public $traverse = -1;

	public $animColor = "green";
	public $projSize = 3;
	public $projSpeed = 7;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class HeavyFusionCannon extends Particle {
	public $name = "HeavyFusionCannon";
	public $display = "56mm Fusion Cannon";
	public $minDmg = 40;
	public $maxDmg = 52;
	public $accDecay = 100;
	public $shots = 1;
	public $reload = 2;
	public $integrity = 44;
	public $powerReq = 3;
	public $traverse = 0;

	public $animColor = "green";
	public $projSize = 4;
	public $projSpeed = 7;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class AntimatterConverter extends Particle {
	public $name = "AntimatterConverter";
	public $display = "Antimatter-Converterr";
	public $fireMode = "Flash";
	public $minDmg = 16;
	public $accDecay = 80;
	public $shots = 1;
	public $animColor = "green";
	public $projSize = 5;
	public $projSpeed = 8;
	public $reload = 1;
	public $integrity = 50;
	public $powerReq = 5;
	public $traverse = 0;
	public $dmgs = array(1, 2, 6, 3);

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
		parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->setFlashData();
	}

	public function getBaseDamage($fire){
		return $this->getFlashDamage($fire);
	}
}

class EMNeedler extends Particle {
	public $name = "EMNeedler";
	public $display = "18mm EM-Needler";
	public $minDmg = 19;
	public $maxDmg = 112;
	public $accDecay = 240;
	public $shots = 3;
	public $reload = 2;
	public $integrity = 24;
	public $powerReq = 3;
	public $traverse = -4;

	public $animation = "em";
	public $animColor = "lightBlue";
	public $projSize = 2;
	public $projSpeed = 10;

	public $em = 1;
	public $dmgType = "EM";

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->notes = array("Does no HP damage, but EM damage.", "EM damage dissipates at end of turn.", "EM Damage that penetrates armour is 2x as effective when testing criticals.", "Fighters and Ballistic are disabled immediatly if they receive more EM-damage than their maximum health");
	
	}
}

class ShockCannon extends Particle {
	public $name = "ShockCannon";
	public $display = "42mm Shock Cannon";
	public $minDmg = 6;
	public $maxDmg = 8;
	public $accDecay = 120;
	public $shots = 1;
	public $reload = 2;
	public $integrity = 34;
	public $powerReq = 2;
	public $traverse = -1;

	public $animation = "em";
	public $animColor = "lightBlue";
	public $projSize = 3;
	public $projSpeed = 7;

	public $em = 1;
	public $dmgType = "EM";

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
		$this->notes = array("Does no structural damage", "Damage can cause critical effects");
	}
}

?>