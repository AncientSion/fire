<?php

class Pulse extends Weapon {
	public $type = "Pulse";
	public $animation = "projectile";
	public $priority = 5;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}

	public function rollForHit($fire){
		for ($i = 0; $i < $this->linked; $i++){
			$roll = mt_rand(1, 100);
			$fire->rolls[] = $roll;
			$fire->notes .= $roll." ";
			if ($roll <= $fire->req){
				$fire->hits += $this->shots;
			}
		}
		return true;
	}

	public function doDamage($fire){
		Debug::log("doDamage, weapon: ".get_class($this).", target: ".$fire->target->id);

		$negation; $armourDmg; $structDmg; $totalDmg; $hitSystem; $remInt; $destroyed;		

		if ($fire->rolls[0] <= $fire->req){
			$destroyed = false;
			$mod = $this->getDamageMod($fire);
			$hitSystem = $fire->target->getHitSystem($fire);
			$structure = $fire->target->getStructureById($fire->hitSection);
			$armourMod = $hitSystem->getArmourMod();

			if ($hitSystem->destroyed){Debug::log("unit already destroyed"); return;}

			for ($i = 0; $i < $this->shots; $i++){
				$totalDmg = floor($this->getBaseDamage($fire) * $mod);
				$remInt = $hitSystem->getCurrentIntegrity();
				$negation = $structure->getRemainingNegation($fire) * $armourMod;
				$dmg = $this->determineDamage($totalDmg, $negation);

				if ($remInt - $dmg->structDmg < 1){
					$destroyed = true;
					if (!(is_a($fire->target, "Mini"))){
						Debug::log(" => target system ".$hitSystem->name." #".$hitSystem->id." destroyed. rem: ".$remInt.", doing: ".$dmg->structDmg.", OK for: ".(abs($remInt - $dmg->structDmg)." dmg"));
					}
					else {
						Debug::log("Overkill on Salvo or Fighter");
					}
				}
				//$id, $fireid, $gameid, $shipid, $structureid, $systemid, $turn, $roll, $type, $totalDmg, $shieldDmg, $structDmg, $armourDmg, $mitigation, $negation, $destroyed, $notes, $new){
				$dmg = new Damage(
					-1,
					$fire->id,
					$fire->gameid,
					$fire->targetid,
					$fire->hitSection,
					$hitSystem->id,
					$fire->turn,
					$fire->rolls[0],
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
			}
		}
	}	
}

class LightPulse extends Pulse {
	public $name = "LightPulse";
	public $display = "38mm Pulse Cannon";
	public $minDmg = 20;
	public $maxDmg = 26;
	public $accDecay = 140;
	public $shots = 3;
	public $animColor = "brown";
	public $projSize = 2;
	public $projSpeed = 11;
	public $exploSize = 3;
	public $reload = 1;
	public $fc = array(0 => 100, 1 => 180);
	public $mass = 12;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class MediumPulse extends Pulse {
	public $name = "MediumPulse";
	public $display = "66mm Pulse Cannon";
	public $minDmg = 28;
	public $maxDmg = 35;
	public $accDecay = 110;
	public $shots = 3;
	public $animColor = "brown";
	public $projSize = 3;
	public $projSpeed = 8;
	public $exploSize = 4;
	public $reload = 2;
	public $fc = array(0 => 115, 1 => 135);
	public $mass = 20;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}