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
		$destroyed = false;
		$total = 0;
		$shield = 0;
		$struct = 0;
		$armour = 0;
		$overkill = 0;
		$remInt = $system->getRemainingIntegrity();
		$negation = $fire->target->getArmourValue($fire, $system);

		$hits = $this->basePulses + min($this->extraPulses, floor(($fire->req - $fire->rolls[sizeof($fire->rolls)-1]) / $this->grouping));

		$fire->hits++;

		Debug::log("fireid: ".$fire->id.", doDamage, weapon: ".get_class($this)." #".$this->id.", hits: ".$hits.", target: ".$fire->target->id.", armour: ".$negation.", health: ".$remInt);

		for ($i = 0; $i < $hits; $i++){
			$totalDmg = $this->getTotalDamage($fire);
			//Debug::log("hit: ".($i+1).", doing dmg for: ".$totalDmg);
			$dmg = $this->determineDamage($totalDmg, $negation);

			if (!$destroyed){
				$total += $totalDmg;
				$struct += $dmg->structDmg;
				$armour += $dmg->armourDmg;
			}
			else {
				$overkill += $dmg->structDmg;
				Debug::log("hit ".($i+1).", adding damage to overkill which is at: ".$overkill." pts");
			}		

			if (!$destroyed && $remInt - $struct < 1){
				$destroyed = 1;
				$overkill = (abs($remInt - $dmg->structDmg));
				Debug::log(" => hit:".($i+1).", system was destroyed, HP: ".$remInt.", doing: ".$struct.", OK for: ".$overkill." dmg");
				// overkill takes target system armour, should take overkill-target (main struct) negation ?
				$dmg->structDmg = $remInt;
			}
		}

		$entry = new Damage(
			-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $roll, $fire->weapon->type,
			$total, $shield, $struct, $armour, $overkill, $negation, $destroyed, $dmg->notes, 1
		);
		$fire->damages[] = $entry;
		$fire->target->applyDamage($entry);
	}
}

class LightPulse extends Pulse {
	public $name = "LightPulse";
	public $display = "35mm Pulse Cannon";
	public $minDmg = 16;
	public $maxDmg = 20;
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
	public $powerReq = 3;
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