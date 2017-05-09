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
	}
}

class LinkedParticle extends Linked {
	public $type = "Particle";
	public $animation = "projectile";

	function __construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end){
		parent::__construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end);
	}
}

class LinkedParticleGun extends LinkedParticle {
	public $name = "LinkedParticleGun";
	public $display = "Linked Particle Gun";
	public $animColor = "blue";
	public $accDecay = 300;
	
	function __construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end){
		parent::__construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end);
	}
}

class LinkedNeutronRepeater extends LinkedParticle {
	public $name = "LinkedNeutronRepeater";
	public $display = "Linked Neutron Repeater";
	public $animColor = "green";
	public $accDecay = 240;
	
	function __construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end){
		parent::__construct($id, $fighterId, $parentId, $shots, $linked, $minDmg, $maxDmg, $start, $end);
	}
}

?>
