<?php

class Laser extends Weapon {
	public $type = "Laser";
	public $animation = "beam";
	public $beamWidth;
	public $priority = 2;
	public $rakes;

	function __construct($id, $parentId, $start, $end, $output = 0, $effiency, $destroyed = 0){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
		$this->boostEffect[] = new Effect("Damage", 0.20);
	}
	
	public function getDmgRangeMod($fire){
		$dist = $fire->dist;
		if ($dist < $this->optRange){
			$dist = $this->optRange - $dist;
		}
		else $dist = $dist - $this->optRange;
		return 1-($dist * $this->dmgLoss / 10000);
	}

	public function doDamage($fire, $roll, $system){
		$totalDmg = $this->getTotalDamage($fire);
		Debug::log("doDamage, weapon: ".get_class($this).", target: ".$fire->target->id." for ".$totalDmg." dmg");
		$print = "hitting: ";
		if ($totalDmg <= 0){
			return;
		}
		$rake = floor($totalDmg / $this->rakes);
		for ($j = 0; $j < $this->rakes; $j++){
			$system = $fire->target->getHitSystem($fire);
			$print .= " ".get_class($system)." ";
			$destroyed = false;
			$remInt = $system->getRemainingIntegrity();
			$negation = $fire->target->getArmourValue($fire, $system);
			$dmg = $this->determineDamage($rake, $negation);
			$overkill = 0;

			if ($remInt - $dmg->structDmg < 1){
				$destroyed = true;
				$name = get_class($system);
				$overkill = (abs($remInt - $dmg->structDmg));
				Debug::log(" => target system ".$name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->structDmg.", OK for: ".$overkill." dmg");
				$dmg->structDmg = $remInt;
			}

			$dmg = new Damage(
				-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $roll, $fire->weapon->type,
				$totalDmg, $dmg->shieldDmg, $dmg->structDmg, $dmg->armourDmg, $overkill, $negation, $destroyed, $dmg->notes, 1
			);
			$fire->hits++;
			$fire->damages[] = $dmg;
			$fire->target->applyDamage($dmg);

		}
		Debug::log($print);
	}
}

class LightParticleBeam extends Laser {
	public $name = "LightParticleBeam";
	public $display = "38mm Particle Beam";
	public $animColor = "blue";
	public $rakeTime = 22;
	public $beamWidth = 1;
	public $minDmg = 27;
	public $maxDmg = 34;
	public $optRange = 600;
	public $dmgLoss = 8;
	public $accDecay = 120;
	public $shots = 1;
	public $reload = 1;
	public $powerReq = 2;
	public $effiency = 2;
	public $maxBoost = 1;
	public $rakes = 1;
	public $mass = 20;
	public $traverse = -2;
	public $priority = 2.5;
	
	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
		$this->boostEffect[] = new Effect("Accuracy", 0.20);
	}
}

class LightLaser extends Laser {
	public $name = "LightLaser";
	public $display = "88mm 'Light' Laser";
	public $animColor = "red";
	public $rakeTime = 40;
	public $beamWidth = 2;
	public $minDmg = 65;
	public $maxDmg = 80;
	public $optRange = 350;
	public $dmgLoss = 12;
	public $accDecay = 120;
	public $shots = 1;
	public $reload = 2;
	public $powerReq = 3;
	public $effiency = 2;
	public $maxBoost = 1;
	public $rakes = 3;
	public $mass = 20;
	public $traverse = -2;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class MediumLaser extends Laser {
	public $name = "MediumLaser";
	public $display = "164mm 'Medium' Laser";
	public $animColor = "red";
	public $rakeTime = 55;
	public $beamWidth = 3;
	public $minDmg = 90;
	public $maxDmg = 125;
	public $optRange = 600;
	public $dmgLoss = 8;
	public $accDecay = 85;
	public $reload = 3;
	public $powerReq = 5;
	public $effiency = 3;
	public $maxBoost = 1;
	public $rakes = 3;
	public $mass = 26;
	public $traverse = -1;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class HeavyLaser extends Laser {
	public $name = "HeavyLaser";
	public $display = "215mm Pulse Laser";
	public $animColor = "red";
	public $rakeTime = 70;
	public $beamWidth = 4;
	public $minDmg = 145;
	public $maxDmg = 180;
	public $optRange = 800;
	public $dmgLoss = 6;
	public $accDecay = 60;
	public $reload = 4;
	public $powerReq = 6;
	public $rakes = 3;
	public $effiency = 4;
	public $maxBoost = 2;
	public $mass = 28;
	public $traverse = 0;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class SuperHeavyLaser extends Laser {
	public $name = "SuperHeavyLaser";
	public $display = "340mm 'Heavy' Laser";
	public $animColor = "red";
	public $rakeTime = 120;
	public $beamWidth = 5;
	public $minDmg = 210;
	public $maxDmg = 255;
	public $optRange = 800;
	public $dmgLoss = 4;
	public $accDecay = 40;
	public $reload = 5;
	public $powerReq = 10;
	public $rakes = 4;
	public $effiency = 6;
	public $maxBoost = 2;
	public $mass = 43;
	public $traverse = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
		$this->boostEffect[0]->value = 0.15;
	}
}

class NeutronLaser extends Laser {
	public $name = "NeutronLaser";
	public $display = "238mm Neutron Laser";
	public $rakeTime = 40;
	public $animColor = "yellow";
	public $beamWidth = 2;
	public $minDmg = 95;
	public $maxDmg = 130;
	public $optRange = 1000;
	public $dmgLoss = 3;
	public $accDecay = 50;
	public $shots = 1;
	public $reload = 2;
	public $powerReq = 4;
	public $rakes = 2;
	public $effiency = 3;
	public $maxBoost = 1;
	public $mass = 26;
	public $traverse = -1;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
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
	public $dmgLoss = 6;
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
		$this->boostEffect[0]->value = 0.35;
	}
}

?>
