<?php

class System {
	public $id;
	public $parentId;
	public $weapon = false;
	public $destroyed = false;
	public $powerReq = 1;
	public $output;
	public $name;
	public $display;
	public $chance = 3;
	public $crits = array();
	public $damages = array();
	public $integrity = 0;
	public $linked = 1;

	function __construct($id, $parentId, $output = 0, $destroyed = false){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->output = $output;
		$this->destroyed = $destroyed;
	}

	public function getArmourMod(){
		return 1;
	}

	function getRemainingIntegrity(){
		$rem = $this->integrity;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			$rem -= $this->damages[$i]->structDmg;
		}
		return $rem;
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
		return ["control1", "control2", "control3", "control4", "control5", "control6"];
	}

	public function getCritTreshs(){
		return [20, 30, 50, 65, 80, 90];
	}

	public function determineCrititcal($dmg, $turn){
		$crits = $this->getCritEffects();
		$tresh = $this->getCritTreshs();

		for ($i = sizeof($tresh)-1; $i >= 0; $i--){
			if ($dmg >= $tresh[$i]){	
				$this->crits[] = new Crit(
					sizeof($this->crits)+1,
					-1,
					$this->parentId,
					$this->id,
					$turn,
					$crits[$i],
					15,
					1
				);
				return;
			}
		}
		return;
	}

	public function applyDamage($dmg){
		$this->damages[] = $dmg;
	}
}

class Bridge extends System {
	public $name = "Bridge";
	public $display = "Bridge";

	function __construct($id, $parentId, $integrity, $output = 0, $destroyed = false){
		$this->integrity = $integrity;
        parent::__construct($id, $parentId, $output, $destroyed);
	}
}

class Engine extends System {
	public $name = "Engine";
	public $display = "Engine";

	function __construct($id, $parentId, $integrity, $output = 0, $destroyed = false){
		$this->integrity = $integrity;
        parent::__construct($id, $parentId, $output, $destroyed);
    }
}

class Reactor extends System {
	public $name = "Reactor";
	public $display = "Reactor";

	function __construct($id, $parentId, $integrity, $output = 0, $destroyed = false){
		$this->integrity = $integrity;
        parent::__construct($id, $parentId, $output, $destroyed);
    }
}

class LifeSupport extends System {
	public $name = "LifeSupport";
	public $display = "Life Support";

	function __construct($id, $parentId, $integrity, $output = 0, $destroyed = false){
		$this->integrity = $integrity;
        parent::__construct($id, $parentId, $output, $destroyed);
    }
}

class Sensor extends System {
	public $name = "Sensor";
	public $display = "Sensor";

	function __construct($id, $parentId, $integrity, $output = 0, $destroyed = false){
		$this->integrity = $integrity;
        parent::__construct($id, $parentId, $output, $destroyed);
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
	public $fireOrders = [];
	public $priority;
	public $chance = 10;
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
		return ["range1", "damage1", "range2", "damage2", "disabled1", "destroyed"];
	}

	public function getCritTreshs(){
		return [20, 30, 50, 65, 80, 90];
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
				$totalDmg = $this->getDamage($fire) * $this->getDamageMod();
				$hitSystem = $fire->target->getHitSystem($fire);
				$remInt = $hitSystem->getRemainingIntegrity();
				$negation = $fire->target->getStructureById($fire->hitSection)->getRemainingNegation($fire) * $hitSystem->getArmourMod();
				$dmg = $this->determineDamage($totalDmg, $negation);

				if ($remInt - $dmg->structDmg < 1){
					$destroyed = true;
					$hitSystem->destroyed = true;
					//Debug::log("target system #".$hitSystem->id." destroyed: rem: ".$remInt.", doing: ".$structDmg);
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

	public function getDmgLoss($fire){
		return 0;
	}

	public function getDamage($fire){
		return floor(mt_rand($this->getMinDamage(), $this->getMaxDamage()) / 100 * (100-$this->getDmgLoss($fire)));
	}

	public function getDamageMod(){
		$mod = 1;
		for ($i = 0; $i < sizeof($this->crits); $i++){
			switch ($this->crits[$i]->type){
				case "damage1": 
					$mod = $mod - 0.1;
					break;
				case "damage2":
					$mod = $mod - 0.2;
					break;
			}
		}
		//if ($mod != 1){Debug::log("weapon id: ".$this->id.", DAMAGE mod: ".$mod);}
		return $mod;
	}

	public function getMinDamage(){
		return floor($this->minDmg);
	}

	public function getMaxDamage(){
		return floor($this->maxDmg);
	}
}

class Hangar extends Weapon {
	public $name = "Hangar";
	public $display = "Hangar";	
	public $launchRate;
	public $loads = [];	

	function __construct($id, $parentId, $start, $end, $output = 0, $launchRate, $loads, $destroyed = false){
		$this->launchRate = $launchRate;
		$this->integrity = floor($output/3);

		for ($i = 0; $i < sizeof($loads); $i++){
			$this->loads[] = array(
				"classname" => $loads[$i],
				"amount" => 0,
				"cost" => $loads[$i]::$value,
				"mass" => $loads[$i]::$mass,
				"launch" => 0
			);
		}

		//$this->load = $load;
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}

	public function getArmourMod(){
		return 0.5;
	}

	public function getCritEffects(){
		return ["launch1", "launch2", "launch3"];
	}

	public function getCritTreshs(){
		return  [10, 20, 30];
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