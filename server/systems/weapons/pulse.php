<?php

class Pulse extends Weapon {
	public $type = "Pulse";
	public $animation = "projectile";
	public $priority = 8;
	public $basePulses = 3;
	public $extraPulses = 2;
	public $grouping = 30;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
	
	public function doDamage($fire, $roll, $system){		
		$destroyed = 0;
		$totalDmg = $this->getTotalDamage($fire);
		$remInt = $system->getRemainingIntegrity();
		$overkill = 0;
		$okSystem = 0;

		$negation = $fire->target->getArmour($fire, $system);
		$dmg = $this->determineDamage($totalDmg, $negation);

		$total = 0;
		$shield = 0;
		$struct = 0;
		$armour = 0;

		$hits = $this->basePulses + min($this->extraPulses, floor(($fire->req - $fire->rolls[sizeof($fire->rolls)-1]) / $this->grouping));

		Debug::log("fireid: ".$fire->id.", doDamage, weapon: ".get_class($this)." #".$this->id.", target: ".$fire->target->id.", doing: ".$totalDmg." * ".$hits." hits, remaining: ".$remInt.", armour: ".$negation["stock"]."+".$negation["bonus"]);

		for ($i = 0; $i < $hits; $i++){
			Debug::log("adding hit ".$i);

			if ($destroyed){
				$total += $totalDmg;
				$overkill += $dmg->structDmg;
				$armour += $dmg->armourDmg;
					Debug::log(" => hit ".($i+1).", adding ".$dmg->structDmg." to overkill which is now: ".$overkill." pts");
			}
			else {
				$total += $totalDmg;
				$struct += $dmg->structDmg;
				$armour += $dmg->armourDmg;
			}

			if ($struct >= $remInt){
				$destroyed = 1;
				$name = get_class($system);
				$okSystem = $fire->target->getOverKillSystem($fire);

				if ($okSystem){
					$overkill = abs($remInt - $dmg->structDmg);
					Debug::log(" => hit ".($i+1)." OVERKILL ship target system ".$name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->structDmg.", OK for: ".$overkill." dmg");
					$struct += $remInt;
				}
				else {
					Debug::log(" => DESTROYING non-ship target system");
					break;
				}
			}
		}

		$entry = new Damage(
			-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $roll, $fire->weapon->type,
			$total, $shield, $struct, $armour, $overkill, $negation["stock"], $destroyed, $dmg->notes, 1
		);
		$fire->damages[] = $entry;
		$fire->target->applyDamage($entry);
	}
}

class LightPulse extends Pulse {
	public $name = "LightPulse";
	public $display = "35mm Pulse Cannon";
	public $minDmg = 15;
	public $maxDmg = 19;
	public $accDecay = 180;
	public $shots = 1;
	public $animColor = "brown";
	public $projSize = 2;
	public $projSpeed = 10;
	public $reload = 2;
	public $mass = 12;
	public $powerReq = 2;
	public $traverse = -4;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class MediumPulse extends Pulse {
	public $name = "MediumPulse";
	public $display = "60mm Pulse Cannon";
	public $minDmg = 25;
	public $maxDmg = 32;
	public $accDecay = 120;
	public $shots = 1;
	public $animColor = "brown";
	public $projSize = 3;
	public $projSpeed = 9;
	public $reload = 3;
	public $mass = 21;
	public $powerReq = 4;
	public $traverse = -1;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class HeavyPulse extends Pulse {
	public $name = "HeavyPulse";
	public $display = "102mm Pulse Cannon";
	public $minDmg = 38;
	public $maxDmg = 55;
	public $accDecay = 90;
	public $shots = 1;
	public $animColor = "brown";
	public $projSize = 4;
	public $projSpeed = 8;
	public $reload = 4;
	public $mass = 32;
	public $powerReq = 5;
	public $traverse = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}


class FusionPulsar extends Pulse {
	public $name = "FusionPulsar";
	public $display = "Fusion Pulsar";
	public $minDmg = 25;
	public $maxDmg = 35;
	public $accDecay = 160;
	public $animColor = "lightGreen";
	public $projSize = 2;
	public $projSpeed = 10;
	public $mass = 18;
	public $powerReq = 4;
	public $traverse = -3;
	public $basePulses = 2;
	public $extraPulses = 3;
	public $grouping = 15;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}


?>