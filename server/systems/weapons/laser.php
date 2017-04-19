<?php

class Laser extends Weapon {
	public $type = "Laser";
	public $animation = "beam";
	public $beamWidth;
	public $priority = 4;
	public $rakes;

	function __construct($id, $parentId, $start, $end, $output = 0, $effiency, $destroyed = 0){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
		$this->boostEffect = new Effect("Damage", 25);
	}
	
	public function getDmgPenaltyRange($fire){
		$dist = $fire->dist;
		if ($dist < $this->optRange){
			$dist = $this->optRange - $dist;
		}
		else $dist = $dist - $this->optRange;
		return $dist * $this->dmgDecay / 10000 * -1;
	}

	public function rollForHit($fire){
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

	public function doDamage($fire){
		Debug::log("doDamage, weapon: ".get_class($this).", target: ".$fire->target->id);

		$negation; $armourDmg; $structDmg; $totalDmg; $hitSystem; $remInt; $destroyed;
		
		for ($i = 0; $i < $fire->shots; $i++){
			if ($fire->rolls[$i] <= $fire->req){
				$totalDmg = floor($this->getBaseDamage($fire) * $this->getDamageMod($fire));
				//Debug::log(" => totalDmg: ".$totalDmg." over ".$this->rakes." rakes");
				$rake = floor($totalDmg / $this->rakes);
				for ($j = 0; $j < $this->rakes; $j++){
					$destroyed = false;
					$hitSystem = $fire->target->getHitSystem($fire);
					$remInt = $hitSystem->getCurrentIntegrity();
					$negation = $fire->target->getStructureById($fire->hitSection)->getRemainingNegation($fire) * $hitSystem->getArmourMod();
					$dmg = $this->determineDamage($rake, $negation);

					if ($remInt - $dmg->structDmg < 1){
						$destroyed = true;
						$hitSystem->destroyed = true;
						if (!(is_a($fire->target, "Mini"))){
							Debug::log(" => target system ".$hitSystem->name." #".$hitSystem->id." destroyed. rem: ".$remInt.", doing: ".$dmg->structDmg.", OK for: ".(abs($remInt - $dmg->structDmg)." dmg"));
						}
					}

					$dmg = new Damage(
						-1,
						$fire->id,
						$fire->gameid,
						$fire->targetid,
						$fire->hitSection,
						$hitSystem->id,
						$fire->turn,
						$fire->rolls[$i],
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
		return true;
	}
}

class LightParticleBeam extends Laser {
	public $name = "LightParticleBeam";
	public $display = "38mm Particle Beam";
	public $animColor = "blue";
	public $rakeTime = 30;
	public $beamWidth = 2;
	public $exploSize = 3;
	public $minDmg = 33;
	public $maxDmg = 46;
	public $optRange = 300;
	public $dmgDecay = 12;
	public $accDecay = 125;
	public $shots = 1;
	public $reload = 1;
	public $powerReq = 2;
	public $rakes = 1;
	public $fc = array(0 => 120, 1 => 120);
	public $mass = 20;

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
	public $exploSize = 3;
	public $minDmg = 95;
	public $maxDmg = 135;
	public $optRange = 325;
	public $dmgDecay = 10;
	public $accDecay = 110;
	public $shots = 1;
	public $reload = 1;
	public $powerReq = 3;
	public $effiency = 3;
	public $maxBoost = 1;
	public $rakes = 3;
	public $fc = array(0 => 100, 1 => 120);
	public $mass = 20;

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
	public $exploSize = 4;
	public $minDmg = 145;
	public $maxDmg = 185;
	public $optRange = 550;
	public $dmgDecay = 7;
	public $accDecay = 85;
	public $reload = 2;
	public $powerReq = 5;
	public $effiency = 5;
	public $maxBoost = 1;
	public $rakes = 3;
	public $mass = 26;

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
	public $exploSize = 5;
	public $minDmg = 195;
	public $maxDmg = 255;
	public $optRange = 800;
	public $dmgDecay = 5;
	public $accDecay = 50;
	public $reload = 3;
	public $powerReq = 8;
	public $effiency = 8;
	public $maxBoost = 1;
	public $fc = array(0 => 120, 1 => 40);
	public $mass = 34;

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
	public $exploSize = 5;
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
	public $fc = array(0 => 130, 1 => 65);
	public $mass = 26;

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
	public $exploSize = 5;
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
	public $fc = array(0 => 125, 1 => 80);
	public $mass = 23;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
        $this->boostEffect->value = 35;
	}
}

?>
