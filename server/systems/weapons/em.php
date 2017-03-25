<?php

class EM extends Weapon {
	public $type = "EM";
	public $animation = "beam";
	public $beamWidth;
	public $priority = 5;
	public $rakes;

	function __construct($id, $parentId, $start, $end, $output = 0, $effiency, $destroyed = 0){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}

	public function doDamage($fire){
		Debug::log("doDamage - EM, weapon: ".get_class($this).", target: ".$fire->target->id);

		$negation; $armourDmg; $structDmg; $totalDmg; $hitSystem; $remInt; $destroyed;
		
		for ($i = 0; $i < $fire->shots; $i++){
			$totalDmg = floor(($this->getBaseDamage($fire) + $this->getBoostLevel()*2) * $this->getDamageMod($fire));
			$hitSystem = $fire->target->getHitSystem($fire);
			if ($hitSystem->destroyed){Debug::log("unit already destroyed"); return;}
			$negation = $fire->target->getStructureById($fire->hitSection)->getRemainingNegation($fire) * $hitSystem->getArmourMod();

			if ($totalDmg > $negation){
				Debug::log("totalDmg > negation");
			}
			else if ($totalDmg > $negation/2 && mt_rand(0, 1) == 1){
				Debug::log("totalDmg > negation/2 and mt_rand()");
			}
			else {
				Debug::log("cant penetrate");
			}
		}
		return;
	}

	public function getDamageMod($fire){
		$mod = 1;

		$crit = $this->getCritPenalty($fire->turn);
		$range = $this->getDmgPenaltyRange($fire);

		return $mod + $crit + $range;
	}
}	

class EMPulseCannon extends EM {
	public $name = "EMPulseCannon";
	public $display = "EM Pulse Cannon";
	public $minDmg = 6;
	public $maxDmg = 10;
	public $accDecay = 170;
	public $shots = 1;
	public $animColor = "lightBlue";
	public $projSize = 2;
	public $projSpeed = 6;
	public $exploSize = 4;
	public $reload = 1;
	public $fc = array(0 => 85, 1 => 220);
	public $mass = 14;
	public $effiency = 1;
	public $maxBoost = 10;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

?>
