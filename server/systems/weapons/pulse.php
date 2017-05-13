<?php

class Pulse extends Weapon {
	public $type = "Pulse";
	public $animation = "projectile";
	public $priority = 8;
	public $volley;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}

	public function getShots($turn){
		return $this->shots;
	}

	public function rollToHit($fire){
		for ($i = 0; $i < $this->shots; $i++){
			$roll = mt_rand(1, 100);
			$fire->rolls[] = $roll;
			$fire->notes .= $roll." ";
			if ($roll <= $fire->req){
				$fire->hits += $this->volley;
			}
		}
		return true;
	}

	public function doDamage($fire, $roll, $system){
		Debug::log("doDamage, weapon: ".get_class($this).", target: ".$fire->target->id);

		$mod = $this->getDamageMod($fire);

		for ($i = 0; $i < $this->volley; $i++){
			$destroyed = false;
			$totalDmg = floor($this->getBaseDamage($fire) * $mod);
			$remInt = $system->getCurrentIntegrity();
			$negation = $fire->target->getArmourValue($fire, $system);
			$dmg = $this->determineDamage($totalDmg, $negation);

			if ($remInt - $dmg->structDmg < 1){
				$destroyed = true;
				if (!(is_a($fire->target, "Mini"))){
					Debug::log(" => target system ".$system->name." #".$system->id." destroyed. rem: ".$remInt.", doing: ".$dmg->structDmg.", OK for: ".(abs($remInt - $dmg->structDmg)." dmg"));
				} else Debug::log("Overkill on Salvo or Fighter");
			}

			$dmg = new Damage(
				-1,
				$fire->id,
				$fire->gameid,
				$fire->targetid,
				$fire->section,
				$system->id,
				$fire->turn,
			$roll,
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

class LightPulse extends Pulse {
	public $name = "LightPulse";
	public $display = "38mm Pulse Cannon";
	public $minDmg = 20;
	public $maxDmg = 26;
	public $accDecay = 150;
	public $shots = 1;
	public $volley = 3;
	public $animColor = "brown";
	public $projSize = 2;
	public $projSpeed = 8;
	public $reload = 1;
	public $mass = 12;
	public $powerReq = 2;
	public $traverse = -3;

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
	public $shots = 1;
	public $volley = 3;
	public $animColor = "brown";
	public $projSize = 3;
	public $projSpeed = 6;
	public $reload = 1;
	public $mass = 20;
	public $powerReq = 4;
	public $traverse = -1;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}