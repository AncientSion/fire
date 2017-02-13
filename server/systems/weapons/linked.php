<?php

class Linked extends Weapon {
	public $exploSize = 3;
	public $projSpeed = 7;
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
	public $accDecay = 300;
	public $shots = 1;
	public $animColor = "blue";
	public $projSize = 2;

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
	public $accDecay = 240;
	public $shots = 1;
	public $animColor = "green";
	public $projSize = 2;

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
