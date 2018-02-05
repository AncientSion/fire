<?php

class Laser extends Weapon {
	public $type = "Laser";
	public $animation = "beam";
	public $beamWidth;
	public $priority = 2;
	public $rakes;
	public $laser = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
		$this->boostEffect[] = new Effect("Damage", 20);
	}
	
	public function getDmgRangeMod($fire){
		$dist = $fire->dist;
		if ($dist < $this->optRange){
			$dist = $this->optRange - $dist;
		}
		else $dist = $dist - $this->optRange;

		$mod = 1-($dist * $this->dmgLoss / 10000);
		Debug::log(get_class($this).", weapon id: ".$this->id.", RANGE DMG mod: ".$mod);
		return $mod;
	}

	public function doDamage($fire, $roll, $system){
		$totalDmg = $this->getTotalDamage($fire);
		$okSystem = 0;
		$rakes = $this->rakes;
		$counter = 1 + (($rakes -1) * $fire->target instanceof Mixed);
		$systems = array();
		$entry;

		$print = "hitting --- ";
		if ($totalDmg <= 0){return;}
			
		$rake = floor($totalDmg / $this->rakes);
		Debug::log("fire #".$fire->id.", doDamage, weapon: ".get_class($this).", target: ".$fire->target->id." for ".$totalDmg." dmg");

		while ($rakes){
			if ($fire->target->ship){
				if ($rakes < $this->rakes){$system = $fire->target->getHitSystem($fire);}

				for ($i = 0; $i < sizeof($systems); $i++){
					if ($systems[$i] == $system->id){Debug::log("Laser DOUBLE HIT, switching to PRIMARY");$system = $fire->target->primary;}
				}
				if ($system->id > 1){$systems[] = $system->id;}
			}

			$print .= " ".get_class($system)."/".$system->id.": ".$rake." dmg, ";
			$destroyed = 0;
			$remInt = $system->getRemainingIntegrity();
			$negation = $fire->target->getArmour($fire, $system);

			$dmg = $this->determineDamage($rake, $negation);
			$dmg = $system->setMaxDmg($fire, $dmg);
			
			$rakes -= $counter;

			if ($remInt - $dmg->structDmg < 1){
				$destroyed = 1;
				$name = get_class($system);
				$okSystem = $fire->target->getOverKillSystem($fire);

				if ($okSystem){
					$dmg->overkill += abs($remInt - $dmg->structDmg);
					$dmg->structDmg = $remInt;
					Debug::log(" => OVERKILL ship target system ".$name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->structDmg.", OK for: ".$dmg->overkill." dmg");
				}
				else {
					Debug::log(" => destroying non-ship target system ".$name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->structDmg);
					$rakes = 0;
				}
			}

			if (!$fire->target->squad || $rakes == $this->rakes-1){
				$entry = new Damage(
					-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $roll, $fire->weapon->type,
					$totalDmg, $dmg->shieldDmg, $dmg->structDmg, $dmg->armourDmg, $dmg->overkill, array_sum($negation), $destroyed, $dmg->notes, 1
				);
			}

			if (!$fire->target->squad || !$rakes){
				$fire->target->applyDamage($entry);
			}
			else if ($rakes){
				$entry->shieldDmg += $dmg->shieldDmg; $entry->structDmg += $dmg->structDmg; $entry->armourDmg += $dmg->armourDmg; $entry->destroyed = $destroyed;
			}

			/*
			if (!$fire->target->squad ){
				if ($rakes == $this->rakes-1){		
					$entry = new Damage(
						-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $roll, $fire->weapon->type,
						$totalDmg, $dmg->shieldDmg, $dmg->structDmg, $dmg->armourDmg, $dmg->overkill, array_sum($negation), $destroyed, $dmg->notes, 1
					);
				}
				else $entry->shieldDmg += $dmg->shieldDmg; $entry->structDmg += $dmg->structDmg; $entry->armourDmg += $dmg->armourDmg; $entry->destroyed = $dmg->destroyed;
			} 
			else {				
				$entry = new Damage(
					-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $roll, $fire->weapon->type,
					$totalDmg, $dmg->shieldDmg, $dmg->structDmg, $dmg->armourDmg, $dmg->overkill, array_sum($negation), $destroyed, $dmg->notes, 1
				);
				$fire->target->applyDamage($entry);
			}*/

		}
		//Debug::log($print);
	}

}

class LightParticleBeam extends Laser {
	public $name = "LightParticleBeam";
	public $display = "35mm Particle Beam";
	public $animColor = "blue";
	public $rakeTime = 25;
	public $beamWidth = 1;
	public $minDmg = 23;
	public $maxDmg = 28;
	public $optRange = 450;
	public $dmgLoss = 4;
	public $accDecay = 120;
	public $shots = 1;
	public $reload = 2;
	public $powerReq = 2;
	public $effiency = 2;
	public $maxBoost = 1;
	public $rakes = 1;
	public $mass = 20;
	public $traverse = -1;
	public $priority = 2.5;
	
	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class LightLaser extends Laser {
	public $name = "LightLaser";
	public $display = "88mm 'Light' Laser";
	public $animColor = "red";
	public $rakeTime = 40;
	public $beamWidth = 2;
	public $minDmg = 70;
	public $maxDmg = 95;
	public $optRange = 300;
	public $dmgLoss = 4;
	public $accDecay = 120;
	public $shots = 1;
	public $reload = 2;
	public $powerReq = 3;
	public $effiency = 2;
	public $maxBoost = 1;
	public $rakes = 3;
	public $mass = 22;
	public $traverse = -2;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class MediumLaser extends Laser {
	public $name = "MediumLaser";
	public $display = "152mm 'Medium' Laser";
	public $animColor = "red";
	public $rakeTime = 60;
	public $beamWidth = 3;
	public $minDmg = 95;
	public $maxDmg = 130;
	public $optRange = 450;
	public $dmgLoss = 4;
	public $accDecay = 90;
	public $reload = 3;
	public $powerReq = 5;
	public $effiency = 3;
	public $maxBoost = 1;
	public $rakes = 3;
	public $mass = 26;
	public $traverse = -1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class HeavyLaser extends Laser {
	public $name = "HeavyLaser";
	public $display = "234mm 'Heavy' Laser";
	public $animColor = "red";
	public $rakeTime = 70;
	public $beamWidth = 4;
	public $minDmg = 130;
	public $maxDmg = 165;
	public $optRange = 600;
	public $dmgLoss = 3;
	public $accDecay = 60;
	public $reload = 4;
	public $powerReq = 6;
	public $rakes = 3;
	public $effiency = 4;
	public $maxBoost = 2;
	public $mass = 28;
	public $traverse = 0;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class SuperHeavyLaser extends Laser {
	public $name = "SuperHeavyLaser";
	public $display = "340mm 'Super-Heavy' Laser";
	public $animColor = "red";
	public $rakeTime = 120;
	public $beamWidth = 5;
	public $minDmg = 205;
	public $maxDmg = 250;
	public $optRange = 600;
	public $dmgLoss = 3;
	public $accDecay = 40;
	public $reload = 5;
	public $powerReq = 10;
	public $rakes = 4;
	public $effiency = 6;
	public $maxBoost = 1;
	public $mass = 44;
	public $traverse = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
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
	public $optRange = 800;
	public $dmgLoss = 2;
	public $accDecay = 60;
	public $shots = 1;
	public $reload = 2;
	public $powerReq = 4;
	public $rakes = 2;
	public $effiency = 3;
	public $maxBoost = 1;
	public $mass = 26;
	public $traverse = -1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class NeutronAccelerator extends Laser {
	public $name = "NeutronAccelerator";
	public $display = "Neutron Accelerator";
	public $rakeTime = 50;
	public $animColor = "yellow";
	public $beamWidth = 2;
	public $minDmg = 45;
	public $maxDmg = 60;
	public $optRange = 400;
	public $dmgLoss = 3;
	public $accDecay = 100;
	public $shots = 1;
	public $reload = 2;
	public $powerReq = 5;
	public $rakes = 1;
	public $effiency = 3;
	public $maxBoost = 2;
	public $mass = 23;
	public $traverse = 0;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

?>
