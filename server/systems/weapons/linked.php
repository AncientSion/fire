<?php

class FighterWeapon extends Particle {
	public $projSpeed = 7;
	public $projSize = 1.5;
	public $reload = 1;
	public $tracking = 0;
	public $tiny = 1;
	public $critEffects = array();

	function __construct($id, $parentId, $linked, $shots, $minDmg, $maxDmg){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->shots = $shots;
		$this->linked = $linked;
		$this->minDmg = $minDmg;
		$this->maxDmg = $maxDmg;
	}
}

class SuperLightAntimatterCannon extends Particle {
	public $name = "SuperLightAntimatterCannon";
	public $display = "Super Light Anti-Matter Cannon";
	public static $prio = 0;
	public $minDmg = 28;
	public $maxDmg = 36;
	public $accDecay = 300;
	public $shots = 1;
	public $reload = 3;
	public $tracking = 3;
	public $animColor = "pink";
	public $projSize = 4;
	public $projSpeed = 6;

	public $optRange = 300;
	public $tiny = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
		parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->setAntimatterData();
	}
}

class FighterStandard extends FighterWeapon {
	public $name = "FighterStandard";
	public $display = "Particle Gun - Burst Fire";
	public $animColor = "blue";
	public $accDecay = 600;
	
	function __construct($id, $parentId, $linked, $shots, $minDmg, $maxDmg){
		parent::__construct($id, $parentId, $linked, $shots, $minDmg, $maxDmg);
	}
}

class FighterStrafe extends FighterWeapon {
	public $name = "FighterStrafe";
	public $display = "Particle Gun - Strafing Run";
	public $animColor = "blue";
	public $tracking = 3;
	public $shots = 1;
	public $accDecay = 1200;
	
	function __construct($id, $parentId, $linked, $shots, $minDmg, $maxDmg){
		parent::__construct($id, $parentId, $linked, $shots, $minDmg, $maxDmg);

		$this->amBonus = 0.5;
		$this->amMax = 50;

		$this->notes[] = "<span class='yellow'>+".($this->amBonus*10)."%</span> extra damage caused per 10 points of passing the to-hit roll.";
		$this->notes[] = "Extra damage capped at <span class='yellow'>".$this->amMax."%</span> of base damage after all modifiers.";
	}
}

class NeutronRepeater extends FighterWeapon {
	public $name = "NeutronRepeater";
	public $display = "Neutron Repeater";
	public $animColor = "green";
	
	function __construct($id, $parentId, $linked, $shots, $minDmg, $maxDmg){
		parent::__construct($id, $parentId, $linked, $shots, $minDmg, $maxDmg);
	}
}

class ParticleBolt extends FighterWeapon {
	public $name = "ParticleBolt";
	public $display = "Particle Accelerator";
	public $animColor = "orange";
	public $projSize = 3;
	public $projSpeed = 5;
	public $shots = 1;
	public $reload = 2;
	public $tracking = 3;
	public $accDecay = 500;
	
	function __construct($id, $parentId, $linked, $shots, $minDmg, $maxDmg){
		parent::__construct($id, $parentId, $linked, $shots, $minDmg, $maxDmg);
	}
}

class FighterPulse extends Pulse {
	public $tiny = 1;

	function __construct($id, $parentId, $linked, $shots, $minDmg, $maxDmg){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->shots = $shots;
		$this->linked = $linked;
		$this->minDmg = $minDmg;
		$this->maxDmg = $maxDmg;
	}
}

class ParticlePulsar extends FighterPulse {
	public $name = "ParticlePulsar";
	public $display = "Particle Pulsar";
	public $animColor = "blue";
	public $projSpeed = 7;
	public $projSize = 1.5;
	public $basePulses = 2;
	public $extraPulses = 1;
	public $grouping = 20;
	public $tracking = 0;
	
	function __construct($id, $parentId, $linked, $shots, $minDmg, $maxDmg){
		parent::__construct($id, $parentId, $linked, $shots, $minDmg, $maxDmg);
	}
}

class FighterPlasma extends Plasma {
	public $tiny = 1;
	
	function __construct($id, $parentId, $linked, $shots, $minDmg, $maxDm){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->shots = $shots;
		$this->linked = $linked;
		$this->minDmg = $minDmg;
		$this->maxDmg = $maxDmg;
	}
}

class PlasmaBomb extends FighterPlasma {
	public $name = "PlasmaBomb";
	public $display = "Plasma Bomb";
	public $projSize = 3;
	public $projSpeed = 5;
	public $shots = 1;
	public $reload = 1;
	public $dmgLoss = 0;
	public $tracking = 1;
	
	function __construct($id, $parentId, $linked, $shots, $minDmg, $maxDmg){
		parent::__construct($id, $parentId, $linked, $shots, $minDmg, $maxDmg);
	}
}
?>
