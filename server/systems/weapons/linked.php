<?php

class Linked extends Weapon {
	public $exploSize = 4;
	public $projSpeed = 7;
	public $projSize = 3;
	public $reload = 1;
}

class LinkedParticle extends Linked {
	public $type = "Particle";
	public $animation = "projectile";
	public $priority = 6;
	public $fc = array(0 => 100, 1 => 200);
}

class LinkedParticleGun extends LinkedParticle {
	public $name = "LinkedParticleGun";
	public $display = "Linked Particle Gun";
	public $animColor = "blue";
	public $accDecay = 300;
	public $shots = 1;

	function __construct($id, $fighterId, $parentId, $linked, $minDmg, $maxDmg, $start, $end){
		$this->id = $id;
		$this->fighterId = $fighterId;
		$this->parentId = $parentId;
		$this->linked = $linked;
		$this->minDmg = $minDmg;
		$this->maxDmg = $maxDmg;
		$this->start = $start;
		$this->end = $end;
	}
}

class LinkedNeutronRepeater extends LinkedParticle {
	public $name = "LinkedNeutronRepeater";
	public $display = "Linked Neutron Repeater";
	public $animColor = "green";
	public $accDecay = 240;
	public $shots = 1;

	function __construct($id, $fighterId, $parentId, $linked, $minDmg, $maxDmg, $start, $end){
		$this->id = $id;
		$this->fighterId = $fighterId;
		$this->parentId = $parentId;
		$this->linked = $linked;
		$this->minDmg = $minDmg;
		$this->maxDmg = $maxDmg;
		$this->start = $start;
		$this->end = $end;
	}
}

?>
