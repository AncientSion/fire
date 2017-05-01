<?php

class Plasma extends Weapon {
	public $type = "Plasma";
	public $priority = 6;
	public $dmgDecay = 6;

	function __construct($id, $parentId, $start, $end, $output = 0, $effiency, $destroyed = 0){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
		//$this->boostEffect = new Effect("Damage", 25);
	}
	
	public function getDmgPenaltyRange($fire){
		return $fire->dist * $this->dmgDecay / -10000;
	}

	public function determineDamage($totalDmg, $negation){ // 20, 35
		$shieldDmg = 0;
		$armourDmg = 0;
		$structDmg = 0;

		$armourDmg = min($totalDmg, $negation)*1.5;
		$structDmg = min(max(0, $totalDmg - $negation), $totalDmg);
		
		return new Divider($shieldDmg * $this->linked, $armourDmg * $this->linked, $structDmg * $this->linked);
	}

	public function doDamage($fire){
		Debug::log("doDamage, weapon: ".get_class($this).", target: ".$fire->target->id);

		$negation; $armourDmg; $structDmg; $totalDmg; $hitSystem; $remInt; $destroyed;
		
		for ($i = 0; $i < $fire->shots; $i++){
			$destroyed = false;
			//Debug::log("shot: ".$i);
			if ($fire->rolls[$i] <= $fire->req){
				$totalDmg = floor($this->getBaseDamage($fire) * $this->getDamageMod($fire));
				$hitSystem = $fire->target->getHitSystem($fire);
				if ($hitSystem->destroyed){Debug::log("SYSTEM already destroyed, RETURN"); return;}
				$remInt = $hitSystem->getCurrentIntegrity();
				$negation = $fire->target->getStructureById($fire->hitSection)->getRemainingNegation($fire) * $hitSystem->getArmourMod();
				$dmg = $this->determineDamage($totalDmg, $negation);

				if ($remInt - $dmg->structDmg < 1){
					$destroyed = true;
					Debug::log(" => target system ".$hitSystem->name." #".$hitSystem->id." DESTROYED ----  rem: ".$remInt.", doing: ".$dmg->structDmg.", OK for: ".(abs($remInt - $dmg->structDmg)." dmg"));
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
			}
		}
		return;
	}
}


class MediumPlasma extends Plasma {
	public $name = "MediumPlasma";
	public $display = "78mm Plasma Accelerator";
	public $minDmg = 43;
	public $maxDmg = 57;
	public $accDecay = 100;
	public $shots = 1;
	public $animColor = "darkGreen";
	public $projSize = 3;
	public $projSpeed = 7;
	public $exploSize = 4;
	public $reload = 1;
	public $fc = array(0 => 130, 1 => 80);
	public $mass = 22;
	public $traverse = 0;
	public $powerReq = 6;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class HeavyPlasma extends Plasma {
	public $name = "HeavyPlasma";
	public $display = "148mm Plasma Cannon";
	public $minDmg = 58;
	public $maxDmg = 75;
	public $accDecay = 100;
	public $shots = 1;
	public $animColor = "darkGreen";
	public $projSize = 4;
	public $projSpeed = 6;
	public $exploSize = 6;
	public $reload = 1;
	public $fc = array(0 => 130, 1 => 80);
	public $mass = 36;
	public $traverse = 1;
	public $powerReq = 8;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

?>