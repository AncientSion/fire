<?php

class EM extends Weapon {
	public $type = "EM";
	public $animation = "beam";
	public $beamWidth;
	public $priority = 10;
	public $rakes;

	function __construct($id, $parentId, $start, $end, $output = 0, $effiency, $destroyed = 0){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}

	public function doDamage($fire){
		Debug::log("doDamage - EM, weapon: ".get_class($this).", target: ".$fire->target->id);

		$negation; $armourDmg; $structDmg; $totalDmg; $hitSystem; $remInt; $destroyed;
		
		for ($i = 0; $i < $fire->shots; $i++){
			$totalDmg = floor($this->getBaseDamage($fire) * (1+$this->getBoostLevel($fire->turn)*0.2) * $this->getDamageMod($fire));
			$hitSystem = $fire->target->getHitSystem($fire); Debug::log("EM hitting: ".$hitSystem->id);
			if ($hitSystem->destroyed){Debug::log("SYSTEM already destroyed, RETURN"); return;}
			$negation = $fire->target->getStructureById($fire->hitSection)->getRemainingNegation($fire) * $hitSystem->getArmourMod();
			//Debug::log("angle: ".$fire->angleIn);

			if (($totalDmg > $negation && mt_rand(0, 1)) || ($totalDmg > $negation/2 && mt_rand(0, 3) == 3)){
				//Debug::log("doing: ".$totalDmg." vs negation: ".$negation." - full penetration + lucky");
				if ($fire->target->flight){
					$hitSystem->crits[] = new Crit(sizeof($hitSystem->crits)+1, $hitSystem->parentId, $hitSystem->id, $fire->turn, "disengaged", -1, 1);
					$hitSystem->destroyed = true;
				}
				else if ($hitSystem->weapon && !$hitSystem->isDisabled()){
					$hitSystem->crits[] = new Crit(sizeof($hitSystem->crits)+1, $hitSystem->parentId, $hitSystem->id, $fire->turn, "disabled", 1, 1);
				}
				else {
					$fire->getSystemByName("Reactor")->crits[] = new Crit(sizeof($hitSystem->crits)+1, $hitSystem->parentId, $hitSystem->id, $fire->turn, "drain1", 1, 1);
				}
			}
			else { // no pen, no effect
				Debug::log("doing: ".$totalDmg." vs negation: ".$negation." - no pen, no effect");
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
	public $maxDmg = 9;
	public $accDecay = 170;
	public $shots = 3;
	public $animColor = "lightBlue";
	public $projSize = 2;
	public $projSpeed = 8;
	public $exploSize = 7;
	public $reload = 1;
	public $fc = array(0 => 85, 1 => 220);
	public $mass = 14;
	public $effiency = 2;
	public $maxBoost = 3;
	public $powerReq = 4;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
		$this->boostEffect = new Effect("Damage", 20);
	}
}

?>
