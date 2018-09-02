<?php

class FighterWeapon extends Particle {
	public $projSpeed = 7;
	public $projSize = 1.5;
	public $reload = 1;
	public $traverse = 0;
	public $accDecay = 0;
	public $tiny = 1;
	public $fighterId = 0;

	function __construct($id, $parentId, $fighterId, $linked, $shots, $minDmg, $maxDmg){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->fighterId = $fighterId;
		$this->shots = $shots;
		$this->linked = $linked;
		$this->minDmg = $minDmg;
		$this->maxDmg = $maxDmg;
	}
}

class ParticleGun extends FighterWeapon {
	public $name = "ParticleGun";
	public $display = "Particle Gun";
	public $animColor = "blue";
	
	function __construct($id, $parentId, $fighterId, $linked, $shots, $minDmg, $maxDmg){
		parent::__construct($id, $parentId, $fighterId, $linked, $shots, $minDmg, $maxDmg);
	}
}


class FighterStandard extends FighterWeapon {
	public $name = "FighterStandard";
	public $display = "Particle Gun / Hit & Run";
	public $animColor = "blue";
	
	function __construct($id, $parentId, $fighterId, $linked, $shots, $minDmg, $maxDmg){
		parent::__construct($id, $parentId, $fighterId, $linked, $shots, $minDmg, $maxDmg);
	}
}

class FighterStrafe extends FighterWeapon {
	public $type = "Pulse";
	public $fireMode = "Pulse";
	public $name = "FighterStrafe";
	public $display = "Particle Gun / Strafing Attack";
	public $animColor = "blue";
	public $traverse = 4;
	public $basePulses = 1;
	public $extraPulses = 2;
	public $grouping = 30;
	public $shots = 1;
	
	function __construct($id, $parentId, $fighterId, $linked, $shots, $minDmg, $maxDmg){
		parent::__construct($id, $parentId, $fighterId, $linked, $shots, $minDmg, $maxDmg);
	}

	public function getMultiShotHits($fire, $element){
		return $this->basePulses + min($this->extraPulses, floor(($fire->req - $fire->rolls[sizeof($fire->rolls)-1]) / $this->grouping));
	}
}


class NeutronRepeater extends FighterWeapon {
	public $name = "NeutronRepeater";
	public $display = "Neutron Repeater";
	public $animColor = "green";
	
	function __construct($id, $parentId, $fighterId, $linked, $shots, $minDmg, $maxDmg){
		parent::__construct($id, $parentId, $fighterId, $linked, $shots, $minDmg, $maxDmg);
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
	public $traverse = 3;
	
	function __construct($id, $parentId, $fighterId, $linked, $shots, $minDmg, $maxDmg){
		parent::__construct($id, $parentId, $fighterId, $linked, $shots, $minDmg, $maxDmg);
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
	public $traverse = 0;
	
	function __construct($id, $parentId, $fighterId, $linked, $shots, $minDmg, $maxDmg){
		parent::__construct($id, $parentId, $fighterId, $linked, $shots, $minDmg, $maxDmg);
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
	public $traverse = 1;
	
	function __construct($id, $parentId, $fighterId, $linked, $shots, $minDmg, $maxDmg){
		parent::__construct($id, $parentId, $fighterId, $linked, $shots, $minDmg, $maxDmg);
	}
}
?>
