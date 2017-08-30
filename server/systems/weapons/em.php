<?php

class EM extends Weapon {
	public $type = "EM";
	public $animation = "beam";
	public $beamWidth;
	public $priority = 12;
	public $rakes;

	function __construct($id, $parentId, $start, $end, $output = 0, $effiency, $destroyed = 0){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
		$this->boostEffect[] = new Effect("Damage", 0.20);
	}

	public function doDamage($fire, $roll, $system){
		Debug::log("doDamage, weapon: ".get_class($this).", target: ".$fire->target->id."/".$system->id);

		if ($system->destroyed){
			Debug::log("multi disable, return");
			return;
		}
		$totalDmg = $this->getTotalDamage($fire);
		$negation = $fire->target->getArmourValue($fire, $system);

		$effect = false;

		$print = ("doing: ".$totalDmg." vs negation: ".$negation. " - ");
		if ($totalDmg > $negation *2){
			$effect = true;
			$print .= ("dmg > neg*2");
		}
		else if ($totalDmg > $negation && !mt_rand(0, 1)){
			$effect = true;
			$print .= ("dmg > neg and 50 %");
		}
		else if ($totalDmg > $negation/2 && !mt_rand(0, 4)){
			$effect = true;
			$print .= ("dmg > neg/2 and 33%");
		}
		else {
			//$print .= ("dmg < neg/2 - deflected");
		}

		Debug::log($print);

		if ($effect){
			if ($fire->target->flight || $fire->target->salvo){
				$system->crits[] = new Crit(sizeof($system->crits)+1, $system->parentId, $system->id, $fire->turn, "Disabled", 0, 0, 1);
				$system->destroyed = true;
			}
			else if (is_a($system, "Primary")){
				$reactor = $fire->target->getSystemByName("Reactor");
				$reactor->crits[] = new Crit(sizeof($reactor->crits)+1, $reactor->parentId, $reactor->id, $fire->turn, "Output", 1, 0.1, 1);
			}
			else if ($system->weapon && !$system->isDisabled($fire->turn)){
				$system->crits[] = new Crit(sizeof($system->crits)+1, $system->parentId, $system->id, $fire->turn, "Disabled", 1, 0, 1);
				$system->disabled = true;
			}
		}
	}
}	

class EMPulseCannon extends EM {
	public $name = "EMPulseCannon";
	public $display = "EM Pulse Cannon";
	public $minDmg = 6;
	public $maxDmg = 9;
	public $accDecay = 200;
	public $shots = 5;
	public $animColor = "lightBlue";
	public $projSize = 2;
	public $projSpeed = 8;
	public $reload = 1;
	public $mass = 14;
	public $effiency = 2;
	public $maxBoost = 3;
	public $powerReq = 4;
	public $traverse = -4;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

?>
