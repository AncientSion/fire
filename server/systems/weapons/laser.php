<?php

class Laser extends Weapon {
	public $type = "Laser";
	public $animation = "beam";
	public $beamWidth;
	public $priority = 2;
	public $rakes;

	function __construct($id, $parentId, $start, $end, $output = 0, $effiency, $destroyed = 0){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
		$this->boostEffect = new Effect("Damage", 20);
	}
	
	public function getDmgPenaltyRange($fire){
		$dist = $fire->dist;
		if ($dist < $this->optRange){
			$dist = $this->optRange - $dist;
		}
		else $dist = $dist - $this->optRange;
		return $dist * $this->dmgDecay / 10000 * -1;
	}

	public function rollToHit($fire){
		for ($j = 0; $j < $this->shots; $j++){
			$roll = mt_rand(1, 100);
			$fire->rolls[] = $roll;
			$fire->notes .= $roll." ";
			if ($roll <= $fire->req){
				$fire->hits += $this->rakes;
			}
		}
		return true;
	}

	public function doDamage($fire, $roll, $system){
		Debug::log("doDamage, weapon: ".get_class($this).", target: ".$fire->target->id);
		
		$totalDmg = floor($this->getBaseDamage($fire) * $this->getDamageMod($fire));
		$rake = floor($totalDmg / $this->rakes);
		for ($j = 0; $j < $this->rakes; $j++){
			$system = $fire->target->getHitSystem($fire);
			$destroyed = false;
			$remInt = $system->getCurrentIntegrity();
			$negation = $fire->target->getArmourValue($fire, $system);
			$dmg = $this->determineDamage($rake, $negation);

			if ($remInt - $dmg->structDmg < 1){
				$destroyed = true;
			}

			$dmg = new Damage(
				-1,
				$fire->id,
				$fire->gameid,
				$fire->targetid,
				$fire->section,
				$system->id,
				$fire->turn,
				$roll,
				$fire->weapon->type,
				$totalDmg,
				$dmg->shieldDmg,
				$dmg->structDmg,
				$dmg->armourDmg,
				0,
				$negation,
				$destroyed,
				"",
				1
			);
			$fire->damages[] = $dmg;
			$fire->target->applyDamage($dmg);
			//Debug::log("armour rem: ".$armour->getRemainingIntegrity()." / ".$armour->integrity.", now adding: ".$armourDmg);
		}
	}
}

class LightParticleBeam extends Laser {
	public $name = "LightParticleBeam";
	public $display = "38mm Particle Beam";
	public $animColor = "blue";
	public $rakeTime = 22;
	public $beamWidth = 1;
	public $minDmg = 33;
	public $maxDmg = 46;
	public $optRange = 400;
	public $dmgDecay = 16;
	public $accDecay = 85;
	public $shots = 1;
	public $reload = 1;
	public $powerReq = 2;
	public $rakes = 1;
	public $mass = 20;
	public $traverse = -2;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class LightLaser extends Laser {
	public $name = "LightLaser";
	public $display = "88mm 'Light' Laser";
	public $animColor = "red";
	public $rakeTime = 40;
	public $beamWidth = 2;
	public $minDmg = 95;
	public $maxDmg = 130;
	public $optRange = 300;
	public $dmgDecay = 10;
	public $accDecay = 120;
	public $shots = 1;
	public $reload = 1;
	public $powerReq = 4;
	public $effiency = 3;
	public $maxBoost = 1;
	public $rakes = 3;
	public $mass = 20;
	public $traverse = -1;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class MediumLaser extends Laser {
	public $name = "MediumLaser";
	public $display = "216mm 'Medium' Laser";
	public $animColor = "red";
	public $rakeTime = 80;
	public $beamWidth = 3;
	public $minDmg = 140;
	public $maxDmg = 180;
	public $optRange = 550;
	public $dmgDecay = 8;
	public $accDecay = 85;
	public $reload = 2;
	public $powerReq = 6;
	public $effiency = 4;
	public $maxBoost = 1;
	public $rakes = 3;
	public $mass = 26;
	public $traverse = 0;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class HeavyLaser extends Laser {
	public $name = "HeavyLaser";
	public $display = "340mm 'Heavy' Laser";
	public $animColor = "red";
	public $rakeTime = 120;
	public $beamWidth = 4;
	public $minDmg = 185;
	public $maxDmg = 235;
	public $optRange = 800;
	public $dmgDecay = 6;
	public $accDecay = 50;
	public $reload = 3;
	public $powerReq = 10;
	public $rakes = 3;
	public $effiency = 6;
	public $maxBoost = 2;
	public $mass = 34;
	public $traverse = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class NeutronLaser extends Laser {
	public $name = "NeutronLaser";
	public $display = "216mm Neutron Laser";
	public $rakeTime = 40;
	public $animColor = "yellow";
	public $beamWidth = 3;
	public $minDmg = 105;
	public $maxDmg = 145;
	public $optRange = 1000;
	public $dmgDecay = 3;
	public $accDecay = 60;
	public $shots = 1;
	public $reload = 2;
	public $powerReq = 6;
	public $rakes = 2;
	public $effiency = 3;
	public $maxBoost = 1;
	public $mass = 26;
	public $traverse = -1;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
        $this->boostEffect->value = 20;
	}
}

class NeutronAccelerator extends Laser {
	public $name = "NeutronAccelerator";
	public $display = "Neutron Accelerator";
	public $rakeTime = 60;
	public $animColor = "yellow";
	public $beamWidth = 2;
	public $minDmg = 58;
	public $maxDmg = 72;
	public $optRange = 400;
	public $dmgDecay = 6;
	public $accDecay = 100;
	public $shots = 1;
	public $reload = 1;
	public $powerReq = 5;
	public $rakes = 1;
	public $effiency = 3;
	public $maxBoost = 2;
	public $mass = 23;
	public $traverse = 0;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
        $this->boostEffect->value = 35;
	}
}

?>
