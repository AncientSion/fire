<?php

class FighterWeapon extends Particle {
	public $projSpeed = 7;
	public $projSize = 1.5;
	public $reload = 1;
	public static $prio =  10;
	public $traverse = -4;
	public $accDecay = 0;
	public $tiny = 1;

	function __construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end){
		$this->id = $id;
		$this->fighterId = $fighterId;
		$this->parentId = $parentId;
		$this->shots = $shots;
		$this->linked = $linked;
		$this->minDmg = $minDmg;
		$this->maxDmg = $maxDmg;
		$this->start = $start;
		$this->end = $end;
	}
}

class ParticleGun extends FighterWeapon {
	public $name = "ParticleGun";
	public $display = "Particle Gun";
	public $animColor = "blue";
	
	function __construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end){
		parent::__construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end);
	}
}

class NeutronRepeater extends FighterWeapon {
	public $name = "NeutronRepeater";
	public $display = "Neutron Repeater";
	public $animColor = "green";
	
	function __construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end){
		parent::__construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end);
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
	public $traverse = -1;
	
	function __construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end){
		parent::__construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end);
	}
}

class FighterPulse extends Pulse {
	public $tiny = 1;

	function __construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end){
		$this->id = $id;
		$this->fighterId = $fighterId;
		$this->parentId = $parentId;
		$this->shots = $shots;
		$this->linked = $linked;
		$this->minDmg = $minDmg;
		$this->maxDmg = $maxDmg;
		$this->start = $start;
		$this->end = $end;
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
	public $traverse = -4;
	
	function __construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end){
		parent::__construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end);
	}
}

class FighterPlasma extends Plasma {
	public $tiny = 1;
	
	function __construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end){
		$this->id = $id;
		$this->fighterId = $fighterId;
		$this->parentId = $parentId;
		$this->shots = $shots;
		$this->linked = $linked;
		$this->minDmg = $minDmg;
		$this->maxDmg = $maxDmg;
		$this->start = $start;
		$this->end = $end;
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
	
	function __construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end){
		parent::__construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end);
	}
}
?>
