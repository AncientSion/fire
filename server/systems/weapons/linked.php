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

	public function rollToHit($fire){
		echo "w: ".get_class($this).", s: ".$this->shots.", l: ".$this->linked."</br></br>";
		for ($i = 0; $i < $this->shots; $i++){
			echo "shot: ".($i+1)."</br></br>";
			$roll = mt_rand(1, 100);
			$fire->rolls[] = $roll;
			$fire->notes .= $roll." ";
			if ($roll <= $fire->req){
				$fire->hits += $this->volley;
			}
		}
		return true;
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

?>
