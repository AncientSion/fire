<?php

class System {
	public $id;
	public $parentId;
	public $weapon = 0;
	public $destroyed = 0;
	public $disabled = 0;
	public $powerReq = 1;
	public $output;
	public $name;
	public $display;
	public $damages = array();
	public $powers = array();
	public $crits = array();
	public $integrity = 0;
	public $linked = 1;
	public $effiency = 0;
	public $mass;

	function __construct($id, $parentId, $output = 0, $destroyed = 0){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->output = $output;
		$this->destroyed = $destroyed;
	}

	public function getArmourMod(){
		return 1;
	}

	public function isPowered($turn){
		for ($i = sizeof($this->powers)-1; $i >= 0; $i--){
			if ($this->powers[$i]->turn == $turn){
				if ($this->powers[$i]->type == 0){
					return false;
				}
			} return true;
		}
	}

	function getRemainingIntegrity(){
		$rem = $this->integrity;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			$rem -= $this->damages[$i]->structDmg;
		}
		return $rem;
	}

	public function getHitChance(){
		return $this->mass*10;
	}

	public function testCriticalSystemLevel($turn){
		if ($this->destroyed){
			return;
		}
		else if (empty($this->damages)){
			return;
		}
		else {
			$old = 0;
			$new = 0;
			for ($i = 0; $i < sizeof($this->damages); $i++){
				if ($this->damages[$i]->turn == $turn){
					$new += $this->damages[$i]->structDmg;
				}
				else {
					$old += $this->damages[$i]->structDmg;
				}
			}

			if ($new){
				$dmg = ceil(($new + ($old/2)) / $this->integrity * 100);
				$this->determineCrititcal($dmg, $turn);
			}
		}
		return;
	}

	public function getCritEffects(){
		return array("control1", "control2", "control3", "control4", "control5", "control6");
	}

	public function getCritTreshs(){
		return array(20, 30, 50, 65, 80, 90);
	}

	public function getCritDuration(){
		return array(2, 2, 2, 2, 2, 2);
	}

	public function determineCrititcal($dmg, $turn){
		//Debug::log("Crit test for: #".$this->id." - ".get_class($this).", dmg: ".$dmg."%");
		$crits = $this->getCritEffects();
		$tresh = $this->getCritTreshs();
		$duration = $this->getCritDuration();
		$mod = mt_rand(0, 10);

		for ($i = sizeof($tresh)-1; $i >= 0; $i--){
			if ($dmg + $mod > $tresh[$i]){
				if (mt_rand(1, 10) > 3){
					//$id, $shipid, $systemid, $turn, $type, $duration, $new){
					$this->crits[] = new Crit(
						sizeof($this->crits)+1,
						$this->parentId,
						$this->id,
						$turn,
						$crits[$i],
						$duration[$i],
						1
					);
					return;
				}
			}
		}
	}

	public function applyDamage($dmg){
		$this->damages[] = $dmg;
	}
}

class PrimarySystem extends System {
	function __construct($id, $parentId, $output = 0, $destroyed = 0){
		parent::__construct($id, $parentId, $output, $destroyed);
	}

	public function getHitChance(){
		return $this->integrity*2;
	}
}

class Bridge extends PrimarySystem {
	public $name = "Bridge";
	public $display = "Bridge";

	function __construct($id, $parentId, $integrity, $output = 0, $effiency = 0, $destroyed = 0){
		$this->integrity = $integrity;
		$this->effiency = $effiency;
        parent::__construct($id, $parentId, $output, $destroyed);
	}

	public function getCritEffects(){
		return array("bridge_accu-10", "bridge_nomove", "bridge_disabled");
	}

	public function getCritTreshs(){
		return array(10, 20, 35);
	}

	public function getCritDuration(){
		return array(2, 1, 1);
	}
}

class Engine extends PrimarySystem {
	public $name = "Engine";
	public $display = "Engine";

	function __construct($id, $parentId, $integrity, $output = 0, $effiency = 0, $destroyed = 0){
		$this->integrity = $integrity;
		$this->effiency = $effiency;
		$this->powerReq = ceil($output / 5);
        parent::__construct($id, $parentId, $output, $destroyed);
    }

	public function getCritEffects(){
		return array("output_0.9", "output_0.5", "output_0.85", "output_0");
	}

	public function getCritTreshs(){
		return array(10, 25, 40, 55);
	}

	public function getCritDuration(){
		return array(0, 1, 0, 1);
	}
}

class Reactor extends PrimarySystem {
	public $name = "Reactor";
	public $display = "Reactor";
	public $powerReq = 0;

	function __construct($id, $parentId, $integrity, $output = 0, $effiency = 0, $destroyed = 0){
		$this->integrity = $integrity;
		$this->effiency = $effiency;
        parent::__construct($id, $parentId, $output, $destroyed);
    }

	public function getCritEffects(){
		return array("output_0.9", "output_0.7", "output_0.5", "meltdown");
	}

	public function getCritTreshs(){
		return array(15, 40, 55, 80);
	}

	public function getCritDuration(){
		return array(0, 1, 1, 0);
	}
}

class LifeSupport extends PrimarySystem {
	public $name = "LifeSupport";
	public $display = "Life Support";

	function __construct($id, $parentId, $integrity, $output = 0, $effiency = 0, $destroyed = 0){
		$this->integrity = $integrity;
		$this->effiency = $effiency;
        parent::__construct($id, $parentId, $output, $destroyed);
    }

	public function getCritEffects(){
		return array("dmg05", "dmg15", "dmg25", "dmg35");
	}

	public function getCritTreshs(){
		return array(5, 15, 25, 35);
	}
	public function getCritDuration(){
		return array(1, 1, 1, 1);
	}
}

class Sensor extends PrimarySystem {
	public $name = "Sensor";
	public $display = "Sensor";

	function __construct($id, $parentId, $integrity, $output = 0, $effiency = 0, $destroyed = 0){
		$this->integrity = $integrity;
		$this->effiency = $effiency;
		$this->powerReq = $output*2;
        parent::__construct($id, $parentId, $output, $destroyed);
    }
	public function getCritEffects(){
		return array("output_0.85", "output_0.7", "sensor_0");
	}

	public function getCritTreshs(){
		return array(10, 25, 40);
	}
	public function getCritDuration(){
		return array(0, 0, 1);
	}
}

class Weapon extends System {
	public $weapon = true;
	public $decayVar = 1000;
	public $minDmg;
	public $maxDmg;
	public $accDecay;
	public $exploSize;
	public $shots = 1;
	public $guns = 1;
	public $reload = 1;
	public $powerReq = 2;
	public $fireOrders = array();
	public $priority;
	public $fc = array(0 => 100, 1 => 100);

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
		$this->start = $start;
		$this->end = $end;
        parent::__construct($id, $parentId, $output, $destroyed);
	}

	public function getArcWidth(){
		$w = 0;
		if ($this->start < $this->end){ $w = $this->end - $this->start;}
		else if ($this->start > $this->end){ $w += 360 - $this->start; $w += $this->end;}		
		return $w;
	}

	public function getArmourMod(){
		$w = $this->getArcWidth();

		if ($w <= 60){return 0.9;}
		else if ($w <= 120){return 0.7;}
		else if ($w <= 360){return 0.5;}
	}

	public function getFireControlMod($fire){
		if ($fire->target->flight || $fire->target->salvo){
			return $this->fc[1];
		}
		else return $this->fc[0];
	}

	public function getCritEffects(){
		return array("range1", "damage1", "range2", "damage2", "disabled");
	}

	public function getCritTreshs(){
		return array(20, 30, 45, 55, 80);
	}

	public function getCritDuration(){
		return array(0, 0, 0, 0, 1);
	}

	public function rollForHit($fire){
		for ($i = 0; $i < $this->shots; $i++){
			$roll = mt_rand(1, 100);
			$fire->rolls[] = $roll;
			$fire->notes = $fire->notes." ".$roll;
			if ($roll <= $fire->req){
				$fire->hits++;
			}
		}
		return true;
	}

	public function determineDamage($totalDmg, $negation){
		$shieldDmg = 0;
		$armourDmg = 0;
		$structDmg = 0;

		if ($totalDmg <= $negation/2){
			$armourDmg = ceil($totalDmg/2);
		}
		else {
			$armourDmg = ceil(min($totalDmg, $negation));
			$structDmg = ceil($totalDmg - $armourDmg);
		}

		return new Divider($shieldDmg * $this->linked, $armourDmg * $this->linked, $structDmg * $this->linked);
	}

	public function doDamage($fire){
		Debug::log("doDamage - NORMAL, weapon: ".get_class($this).", target: ".$fire->target->id);

		$negation; $armourDmg; $structDmg; $totalDmg; $hitSystem; $remInt; $destroyed;
		
		for ($i = 0; $i < $fire->shots; $i++){
			if ($fire->rolls[$i] <= $fire->req){
				$destroyed = false;
				$totalDmg = floor($this->getBaseDamage($fire) * $this->getDamageMod($fire));
				$hitSystem = $fire->target->getHitSystem($fire);
				$remInt = $hitSystem->getRemainingIntegrity();
				$negation = $fire->target->getStructureById($fire->hitSection)->getRemainingNegation($fire) * $hitSystem->getArmourMod();
				$dmg = $this->determineDamage($totalDmg, $negation);

				if ($remInt - $dmg->structDmg < 1){
					$destroyed = true;
					$hitSystem->destroyed = true;
					Debug::log(" => target system #".$hitSystem->id." destroyed. rem: ".$remInt.", doing: ".$dmg->structDmg.", OK for: ".(abs($remInt - $dmg->structDmg)." dmg"));
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
				//Debug::log("armour rem: ".$armour->getRemainingIntegrity()." / ".$armour->integrity.", now adding: ".$armourDmg);
			}
		}
		return;
	}

	public function getAccLoss($dist){
		$mod = 1;
		for ($i = 0; $i < sizeof($this->crits); $i++){
			switch ($this->crits[$i]->type){
				case "range1": 
					$mod = $mod + 0.1;
					break;
				case "range2":
					$mod = $mod + 0.2;
					break;
			}
		}
		//if ($mod != 1){Debug::log("weapon id: ".$this->id.", ACCURAVY mod: ".$mod);}
		return ceil(($this->accDecay * $mod) * $dist / $this->decayVar);
	}

	public function getDmgPenaltyRange($fire){
		return 0;
	}

	public function getBaseDamage($fire){
		return mt_rand($this->getMinDamage(), $this->getMaxDamage());
	}

	public function getDamageMod($fire){
		$mod = 1;

		$crit = $this->getCritPenalty($fire->turn);
		$boost = $this->getBoostLevel($fire->turn) * 0.25;
		$range = $this->getDmgPenaltyRange($fire);

		if ($crit || $boost || $range){
			Debug::log("crits: ".$crit.", boost: ".$boost.". range: ".$range);
		}
		return $mod + $crit + $boost + $range;
	}

	public function getCritPenalty($turn){
		$mod = 0;
		for ($i = 0; $i < sizeof($this->crits); $i++){
			switch ($this->crits[$i]->type){
				case "damage1": 
					$mod -= 0.1;
					break;
				case "damage2":
					$mod -= 0.2;
					break;
			}
		}
		//if ($mod){Debug::log("crit mod level: ".$mod);}
		return $mod;
	}

	public function getBoostLevel($turn){
		$boost = 0;
		for ($i = sizeof($this->powers)-1; $i >= 0; $i--){
			if ($this->powers[$i]->turn == $turn){
				switch ($this->powers[$i]->type){
					case 1: 
					$boost++;
					break;
				}
			}
			else break;
		}
		//if ($boost){Debug::log("boost level: ".$boost);}
		return $boost;
	}

	public function getMinDamage(){
		return $this->minDmg;
	}

	public function getMaxDamage(){
		return $this->maxDmg;
	}
}


class Hangar extends Weapon {
	public $name = "Hangar";
	public $display = "Hangar";
	public $loads = array();

	function __construct($id, $parentId, $start, $end, $output, $effiency, $loads, $destroyed = false){
		$this->powerReq = $effiency;
		$this->effiency = $effiency;
		$this->integrity = floor($output/3);

		for ($i = 0; $i < sizeof($loads); $i++){
			$fighter = new $loads[$i](0,0);
			$this->loads[] = array(
				"classname" => $loads[$i],
				"amount" => 0,
				"cost" => $fighter->value,
				"mass" => $fighter->mass,
				"launch" => 0
			);
		}

		//$this->load = $load;
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}

	public function getArmourMod(){
		return 0.5;
	}

	public function getHitChance(){
		return $this->output * 2;
	}

	public function getCritEffects(){
		return array("launch1", "launch2", "launch3");
	}

	public function getCritTreshs(){
		return array(15, 25, 35);
	}

	public function adjustLoad($dbLoad){
		for ($i = 0; $i < sizeof($dbLoad); $i++){
			for ($j = 0; $j < sizeof($this->loads); $j++){
				if ($dbLoad[$i]["classname"] == $this->loads[$j]["classname"]){
					$this->loads[$j]["amount"] = $dbLoad[$i]["amount"];
					break; 
				}
			}
		}
	}
}
?>