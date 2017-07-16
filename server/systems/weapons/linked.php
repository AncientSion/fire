<?php

class Linked extends Weapon {
	public $projSpeed = 7;
	public $projSize = 2;
	public $reload = 1;
	public $priority = 10;
	public $traverse = -4;

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

		/*
		unset($this->boostEffect);
		unset($this->damages);
		unset($this->modes);
		unset($this->powers);

		unset($this->armourMod);
		unset($this->exploSize);
		unset($this->mass);
		unset($this->output);
		*/
	}
}

class LinkedParticle extends Linked {
	public $type = "Particle";
	public $animation = "projectile";

	function __construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end){
		parent::__construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end);
	}
}

class IonBolt extends LinkedParticle {
	public $name = "IonBolt";
	public $display = "Ion Accelerator";
	public $accDecay = 200;
	public $shots = 1;
	public $animColor = "orange";
	public $reload = 2;
	public $projSize = 3;
	public $projSpeed = 5;
	public $traverse = -2;
	
	function __construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end){
		parent::__construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end);
	}
}

class LinkedParticleGun extends LinkedParticle {
	public $name = "LinkedParticleGun";
	public $display = "Linked Particle Gun";
	public $animColor = "blue";
	public $accDecay = 220;
	
	function __construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end){
		parent::__construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end);
	}
}

class LinkedNeutronRepeater extends LinkedParticle {
	public $name = "LinkedNeutronRepeater";
	public $display = "Linked Neutron Repeater";
	public $animColor = "green";
	public $accDecay = 180;
	
	function __construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end){
		parent::__construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end);
	}
}


class FighterPulse extends Pulse {
	public $type = "Pulse";
	public $animation = "projectile";
	public $projSpeed = 7;
	public $projSize = 1.5;
	public $traverse = -4;

	function __construct($id, $fighterId, $parentId, $volley, $minDmg, $maxDmg, $start, $end){
		parent::__construct($id, $parentId, $start, $end, 0, 0);
		$this->fighterId = $fighterId;
		$this->volley = $volley;
		$this->minDmg = $minDmg;
		$this->maxDmg = $maxDmg;
	}
}

class ParticlePulsar extends FighterPulse {
	public $name = "ParticlePulsar";
	public $display = "Particle Pulsar";
	public $animColor = "blue";
	public $accDecay = 220;
	public $shots = 1;
	
	function __construct($id, $fighterId, $parentId, $volley, $minDmg, $maxDmg, $start, $end){
		parent::__construct($id, $fighterId, $parentId, $volley, $minDmg, $maxDmg, $start, $end);
	}
}
?>
