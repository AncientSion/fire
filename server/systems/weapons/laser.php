<?php

class Laser extends Weapon {
	public $type = "Laser";
	public $animation = "beam";
	public $beamWidth;
	public $priority = 5;
	public $rakes;

	function __construct($id, $parentId, $start, $end, $output = 0, $effiency, $destroyed = 0){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
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
		Debug::log("doDamage - NORMAL, weapon: ".get_class($this).", target: ".$fire->target->id);

		$negation; $armourDmg; $structDmg; $totalDmg; $hitSystem; $remInt; $destroyed;
		
		for ($i = 0; $i < $fire->shots; $i++){
			if ($fire->rolls[$i] <= $fire->req){
				$totalDmg = floor($this->getBaseDamage($fire) * $this->getDamageMod($fire));
				Debug::log(" => totalDmg: ".$totalDmg." over ".$this->rakes." rakes");
				$rake = floor($totalDmg / $this->rakes);
				for ($j = 0; $j < $this->rakes; $j++){
					$destroyed = false;
					$hitSystem = $fire->target->getHitSystem($fire);
					$remInt = $hitSystem->getRemainingIntegrity();
					$negation = $fire->target->getStructureById($fire->hitSection)->getRemainingNegation($fire) * $hitSystem->getArmourMod();
					$dmg = $this->determineDamage($rake, $negation);

					if ($remInt - $dmg->structDmg < 1){
						$destroyed = true;
						$hitSystem->destroyed = true;
						Debug::log(" => target system #".$hitSystem->id." destroyed. rem: ".$remInt.", doing: ".$dmg->structDmg.", OK for: ".(abs($remInt - $dmg->structDmg)." dmg"));

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

class LightLaser extends Laser {
	public $name = "LightLaser";
	public $display = "Light Laser";
	public $animColor = "red";
	public $rakeTime = 80;
	public $beamWidth = 2;
	public $exploSize = 3;
	public $minDmg = 110;
	public $maxDmg = 150;
	public $optRange = 225;
	public $dmgDecay = 12;
	public $accDecay = 150;
	public $shots = 1;
	public $reload = 1;
	public $powerReq = 3;
	public $integrity = 25;
	public $rakes = 3;
	public $fc = array(0 => 100, 1 => 120);

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class MediumLaser extends Laser {
	public $name = "MediumLaser";
	public $display = "Medium Laser";
	public $animColor = "red";
	public $rakeTime = 120;
	public $beamWidth = 3;
	public $exploSize = 4;
	public $minDmg = 145;
	public $maxDmg = 200;
	public $optRange = 500;
	public $dmgDecay = 8;
	public $accDecay = 100;
	public $shots = 1;
	public $reload = 2;
	public $powerReq = 5;
	public $integrity = 45;
	public $rakes = 3;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class HeavyLaser extends Laser {
	public $name = "HeavyLaser";
	public $display = "Heavy Laser";
	public $animColor = "#ff3c00";
	public $rakeTime = 150;
	public $beamWidth = 4;
	public $exploSize = 5;
	public $minDmg = 195;
	public $maxDmg = 270;
	public $optRange = 800;
	public $dmgDecay = 5;
	public $accDecay = 50;
	public $shots = 1;
	public $reload = 3;
	public $powerReq = 8;
	public $integrity = 70;
	public $rakes = 3;
	public $effiency = 4;
	public $fc = array(0 => 120, 1 => 40);

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class NeutronLaser extends Laser {
	public $name = "NeutronLaser";
	public $display = "Neutron Laser";
	public $rakeTime = 80;
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
	public $integrity = 60;
	public $rakes = 2;
	public $effiency = 3;
	public $fc = array(0 => 130, 1 => 65);

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

?>
