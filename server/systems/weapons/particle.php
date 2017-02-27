<?php

class Particle extends Weapon {
	public $type = "Particle";
	public $animation = "projectile";
	public $priority = 6;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class LightAssaultArray extends Particle {
	public $name = "LightAssaultArray";
	public $display = "Lgt Assault Array";
	public $minDmg = 20;
	public $maxDmg = 27;
	public $accDecay = 200;
	public $shots = 2;
	public $animColor = "brown";
	public $projSize = 2;
	public $projSpeed = 5;
	public $exploSize = 4;
	public $reload = 1;
	public $integrity = 20;
	public $fc = array(0 => 80, 1 => 155);

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class MediumAssaultArray extends LightAssaultArray {
	public $name = "MediumAssaultArray";
	public $display = "Mdm Assault Array";
	public $minDmg = 35;
	public $maxDmg = 49;
	public $accDecay = 90;
	public $projSize = 3;
	public $projSpeed = 5;
	public $exploSize = 5;
	public $integrity = 35;
	public $fc = array(0 => 110, 1 => 100);

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class HeavyAssaultArray extends LightAssaultArray {
	public $name = "HeavyAssaultArray";
	public $display = "Hvy Aassault Array";
	public $minDmg = 66;
	public $maxDmg = 94;
	public $accDecay = 60;
	public $reload = 2;
	public $projSize = 3;
	public $projSpeed = 4;
	public $exploSize = 6;
	public $integrity = 50;
	public $fc = array(0 => 130, 1 => 65);

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class ParticleBeam extends Particle {
	public $name = "ParticleBeam";
	public $display = "Particle Beam";
	public $minDmg = 25;
	public $maxDmg = 34;
	public $accDecay = 150;
	public $shots = 3;
	public $animColor = "blue";
	public $projSize = 3;
	public $projSpeed = 6;
	public $exploSize = 6;
	public $integrity = 28;
	public $fc = array(0 => 80, 1 => 170);

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class HeavyParticleBeam extends ParticleBeam {
	public $name = "HeavyParticleBeam";
	public $display = "Hvy Particle Beam";
	public $minDmg = 35;
	public $maxDmg = 50;
	public $accDecay = 110;
	public $shots = 2;
	public $projSize = 5;
	public $projSpeed = 4;
	public $exploSize = 7;
	public $fc = array(0 => 120, 1 => 120);

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class FusionCannon extends Particle {
	public $name = "FusionCannon";
	public $display = "Fusion Cannon";
	public $minDmg = 31;
	public $maxDmg = 40;
	public $accDecay = 130;
	public $shots = 2;
	public $animColor = "green";
	public $projSize = 3;
	public $projSpeed = 5;
	public $exploSize = 7;
	public $integrity = 42;
	public $fc = array(0 => 100, 1 => 145);

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class FusionPulsar extends Particle {
	public $name = "FusionPulsar";
	public $display = "Fusion Pulsar";
	public $minDmg = 45;
	public $maxDmg = 55;
	public $accDecay = 180;
	public $shots = 4;
	public $animColor = "lightGreen";
	public $projSize = 3;
	public $projSpeed = 5;
	public $exploSize = 4;
	public $integrity = 24;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}

	public function rollForHit($fire){
		$roll = mt_rand(1, 100);
		if ($roll <= $fire->req){
			$fire->hits = $this->shots;

			for ($i = 0; $i < $hits; $i++){
				$fire->rolls[] = $roll;
				$fire->notes = $fire->notes." ".$roll;
			}
		}
		return true;
	}
}

class ParticlePulsar extends Particle {
	public $name = "ParticlePulsar";
	public $display = "Particle Pulsar";
	public $minDmg;
	public $maxDmg;
	public $accDecay = 270;
	public $shots = 3;
	public $animColor = "yellow";
	public $projSize = 1;
	public $projSpeed = 5;
	public $exploSize = 2;
	public $reload = 1;
	public $fc = array(0 => 100, 1 => 200);

	function __construct($id, $fighterId, $parentId, $minDmg, $maxDmg, $start, $end){
		$this->id = $id;
		$this->fighterId = $fighterId;
		$this->parentId = $parentId;
		$this->minDmg = $minDmg;
		$this->maxDmg = $maxDmg;
		$this->start = $start;
		$this->end = $end;
	}
}

?>