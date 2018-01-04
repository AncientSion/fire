<?php

class Squadron extends Ship {
	public $ship = false;
	public $squad = true;
	public $name = "Squadron";
	public $display = "Squadron";
	public $baseTurnCost = 0;
	public $baseTurnDelay = 0;
	public $baseImpulseCost = 0;
	public $baseImpulse = 1000;
	public $slipAngle = 1000;
	public $turnAngle = 1000;
	public $traverse = -1;

	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes){
		$this->id = $id;
		$this->userid = $userid;
		$this->available = $available;
		$this->status = $status;
		$this->destroyed = $destroyed;
		$this->x = $x;
		$this->y = $y;
		$this->facing = $facing;
		$this->remainingDelay = $delay;
		$this->currentImpulse = $thrust;
		$this->notes = $notes;

		$this->primary = new Shared();
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, array(0, 0), 0, 0);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, array(0, 0), 1000, 0);
	}
	
	public function addSubUnits($elements){
		//Debug::log("SQUADRON addSubUnits ".sizeof($elements));

		for ($i = 0; $i < sizeof($elements); $i++){
			for ($j = 1; $j <= $elements[$i]["amount"]; $j++){
				$this->structures[] = new $elements[$i]["name"]($this->getId(), $this->id);
				$this->index = $this->structures[sizeof($this->structures)-1]->index;
			}
		}
		return true;
	}

	public function setUnitState($turn, $phase){
		//Debug::log("SQUADRON setUnitState ".$this->display." #".$this->id);

		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->setUnitState($turn, $phase);
		}

		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			$this->primary->systems[$i]->setState($turn, $phase);
		}

		$this->setProps($turn, $phase);

		return true;
	}

	public function setBaseStats($phase, $turn){
		//Debug::log("setBaseStats #".$this->id);

		$this->size = 40 + sizeof($this->structures)*20;

		$alive = 0;

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (($this->structures[$i]->destroyed && !$this->structures[$i]->isDestroyedThisTurn($turn)) || $this->structures[$i]->disabled){continue;}

			$alive = 1;
			$this->baseTurnCost = max($this->baseTurnCost, $this->structures[$i]->baseTurnCost);
			$this->baseTurnDelay = max($this->baseTurnDelay, $this->structures[$i]->baseTurnDelay);
			$this->baseImpulseCost = max($this->baseImpulseCost, $this->structures[$i]->baseImpulseCost);
			$this->baseImpulse = min($this->baseImpulse, $this->structures[$i]->baseImpulse);
			$this->slipAngle = min($this->slipAngle, $this->structures[$i]->slipAngle);
			$this->turnAngle = min($this->turnAngle, $this->structures[$i]->turnAngle);

			$this->primary->systems[0]->output = max($this->primary->systems[0]->output, $this->structures[$i]->ew);
			$this->primary->systems[1]->output = min($this->primary->systems[1]->output, $this->structures[$i]->ep);
		}

		if (!$alive){
			$this->primary->systems[1]->output = 0;
			$this->baseImpulseCost = 0;
			$this->slipAngle = 0;
			$this->turnAngle = 0;
		}
	}	

	public function hideFireOrders($turn){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->structures); $j++){
				for ($k = 0; $k < sizeof($this->structures[$i]->structures[$j]->systems); $k++){
					for ($l = 0; $l < sizeof($this->structures[$i]->structures[$j]->systems[$k]->fireOrders); $l++){
						if ($this->structures[$i]->structures[$j]->systems[$k]->fireOrders[$l]->turn == $turn){
							array_splice($this->structures[$i]->structures[$j]->systems[$k]->fireOrders, $l, 1);
						} else break;
					}
				}
			}
		}
	}

	public function hidePowers($turn){
		for ($j = 0; $j < sizeof($this->structures); $j++){
			for ($k = 0; $k < sizeof($this->structures[$j]->systems); $k++){
				for ($l = sizeof($this->structures[$j]->systems[$j]->powers)-1; $l >= 0; $l--){
					if ($this->structures[$j]->systems[$j]->powers[$l]->turn == $turn){
						if ($this->structures[$j]->systems[$j]->powers[$l]->type == 0){
							$this->structures[$j]->systems[$j]->disabled = 0;
						}
						array_splice($this->structures[$j]->systems[$j]->powers, $l, 1);
					} else break;
				}
			}
		}
	}

	public function getSystemById($id){
		//Debug::log("Squadron getSystemById #".$id);
		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			if ($this->primary->systems[$i]->id == $id){
				return $this->primary->systems[$i];
			}
		}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->id == $id){return $this->structures[$i];}

			for ($j = 0; $j < sizeof($this->structures[$i]->structures); $j++){
				for ($k = 0; $k < sizeof($this->structures[$i]->structures[$j]->systems); $k++){
					if ($this->structures[$i]->structures[$j]->systems[$k]->id == $id){
						return $this->structures[$i]->structures[$j]->systems[$k];
					}
				}
			}
		}
		//Debug::log("ERROR squadron getSystemById: ".$id);
	}

	public function determineHits($fire){
		for ($i = 0; $i < sizeof($fire->rolls); $i++){
			if ($this->destroyed){
				Debug::log("aborting shot resolution vs dead target #".$this->id);
			}
			else {
				$target = $this->getHitSystem($fire);
				$fire->singleid = $target->id;
				$fire->req = $fire->shooter->calculateToHit($fire);
				if ($fire->rolls[$i] < $fire->req){
					$fire->hits++;
					$fire->weapon->doDamage($fire, $fire->rolls[$i], $target);
				}
			}
		}
	}

	public function getHitChance($fire){
		return $this->getStruct($fire->singleid)->getSubHitChance($fire);
	}
	
	public function getHitSystem($fire){
		$elements = array();
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed){
				$elements[] = $this->structures[$i];
			}
		}
		return $elements[mt_rand(0, sizeof($elements)-1)];
	}

	public function isDestroyed(){
		if ($this->destroyed){return true;}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->isDestroyed()){
				//Debug::log("nope, unit ".$i." / ".$this->structures[$i]->name." still alive");
				return false;
			}
		}
		Debug::log("setting squadron to destroyed");
		$this->destroyed = 1;
		return true;
	}

	public function getArmour($fire, $system){
		return $system->getArmourValue($system);
	}

	public function testForCrits($turn){

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->destroyed){continue;}
			else if (!$this->structures[$i]->damaged){Debug::log("subunit ".$i." not damaged!"); continue;}

			$this->structures[$i]->testCrit($turn, 0);
		}
	}	

	public function addCritDB($crits){
		for ($i = 0; $i < sizeof($crits); $i++){
			$found = 0;

			for ($j = 0; $j < sizeof($this->structures); $j++){
				if ($crits[$i]->systemid == $this->structures[$j]->id){
					$this->structures[$j]->crits[] = $crits[$i];
					$found = 1;
					break;
				}

				for ($k = 0; $k < sizeof($this->structures[$j]->structures); $k++){
					for ($l = 0; $l < sizeof($this->structures[$j]->structures[$k]->systems); $l++){
						//Debug::log("system id: ".$this->structures[$j]->structures[$k]->systems[$l]->id);
						if ($this->structures[$j]->structures[$k]->systems[$l]->id == $crits[$i]->systemid){
							$this->structures[$j]->structures[$k]->systems[$l]->crits[] = $crits[$i];
							$found = 1;
							break 3;
						}
					}
				}
				if ($found){continue;}
			}

			if (!$found){Debug::log("ERROR unable to apply sqwuad crit id: ".$crits[$i]->id);}
		}
		return true;
	}

	public function getNewCrits($turn){
		$crits = array();
		if (!$this->damaged){return $crits;}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->damaged){continue;}
			$crits = array_merge($crits, $this->structures[$i]->getNewCrits($turn));
		}
		return $crits;
	}

	public function getNewDamages($turn){
		$dmgs = array();
		if (!$this->damaged){return $dmgs;}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->damages); $j++){
				if ($this->structures[$i]->damages[$j]->new){
					$dmgs[] = $this->structures[$i]->damages[$j];
				}
			}
		}
		return $dmgs;
	}

	public function applyDamage($dmg){
		if ($dmg->new){
			$dmg->overkill += $dmg->structDmg;
			$dmg->structDmg = 0;
		}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($dmg->systemid == $this->structures[$i]->id){
				if ($dmg->new){
					$this->damaged = 1;
					$this->structures[$i]->damaged = 1;
				}

				$this->structures[$i]->addDamage($dmg);

				if ($dmg->destroyed){
					for ($j = 0; $j < sizeof($this->structures); $j++){
						if (!$this->structures[$j]->destroyed){
							return;
						}
					}
					$this->destroyed = 1;
				}
				return;
			}
		}

		Debug::log("WARNING couldnt apply damage #".$dmg->id.", looking for unit #".$dmg->shipid."/".$dmg->systemid);
	}

	public function getSystemByName($name){
		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			if ($this->primary->systems[$i]->name == $name){
				return $this->primary->systems[$i];
			}
		}
	}
}



class Squaddie extends Single {

	public $baseHitChance;
	public $baseTurnCost;
	public $baseTurnDelay;
	public $baseImpulseCost;

	public $faction = "";
	public $size = 0;
	public $damaged = 0;

	public $start = 0;
	public $end = 360;
	public $ep = 0;
	public $ew = 0;
	public $power = 0;

	public $powers = array();
	public $boostEffect = array();
	public $effiency = 0;

	public $bonusNegation = 0;
	public $remainingNegation = 0;
	public $parentIntegrity = 0;
	public $parentPow;
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function setPowerOutput(){
		$need = 0;
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				$need += $this->structures[$i]->systems[$j]->powerReq;
			}
		}
		$this->power += $need;
	}

	public function setBaseStats($phase, $turn){
		$this->baseHitChance = ceil(pow($this->mass, 0.4)*1.5)+30;
		$this->baseTurnCost = round(pow($this->mass, 1.25)/25000, 2);
		$this->baseTurnDelay = round(pow($this->mass, 0.45)/18, 2);
		$this->baseImpulseCost = round(pow($this->mass, 1.25)/700, 2);
	}

	public function setUnitState($turn, $phase){
		if ($this->isDestroyed()){
			$this->destroyed = 1;
		}

		for ($i = 0; $i < sizeof($this->systems); $i++){ // check primary criticals
			$this->systems[$i]->setState($turn, $phase);
		}

		$this->setNegation($this->integrity, 0);
		return true;
	}

	public function getBaseImpulse(){
		return $this->baseImpulse;
	}

	public function getSubHitChance($fire){
		return $this->baseHitChance;
	}

	public function getOverKillSystem($fire){
		return false;
	}

	public function setNegation($main, $armourDmg){
		$p = 1.5;

		$this->parentIntegrity = round($main*1.5);

		$this->parentPow = round(pow($this->parentIntegrity, $p));
		$this->armourDmg += $armourDmg;
		$this->remainingNegation = round((pow($this->parentIntegrity - $this->armourDmg, $p) / $this->parentPow) * $this->negation);
	}

	public function getCurrentNegation(){
		$p = 1.5;
		return round(pow($this->parentIntegrity - $this->armourDmg, $p) / $this->parentPow * $this->negation);
	}
	
	public function getArmourValue($system){
		return array(
			"stock" => round($this->getCurrentNegation() * $system->getArmourMod()),
			"bonus" => round($this->getBonusNegation() * $system->getArmourMod())
		);
	}

	public function getArmourMod(){
		return 1;
	}

	public function getNewCrits($turn){
		$crits = array();

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				for ($k = 0; $k < sizeof($this->structures[$i]->systems[$j]->crits); $k++){
					if ($this->structures[$i]->systems[$j]->crits[$k]->new){
						$crits[] = $this->structures[$i]->systems[$j]->crits[$k];
					}
				}
			}
		}
		return $crits;
	}
	public function getValidEffects(){
		return array( // type, min, max, dura
			array("Damage", 20, 0, 0.00),
			array("Accuracy", 20, 0, 0.00),
			array("Disabled", 0, 1, 0.00),
			array("Destroyed", 0, 0, 0.00),
		);
	}	

	public function getCritModMax($dmg){
		return min(20, (round($dmg/20)*10));// - (mt_rand(0, 1) * 10); // round to 0.x, half % mod, 0.1 variance
	}

	public function determineCrit($old, $new, $turn){
		$dmg = round(($old + $new) / $this->integrity * 100);
		$tresh = round(($old/2 + $new) / $this->integrity * 100);
		$effect;

		Debug::log(" => SQUAD determineCrit for ".$this->name.", Dmg: ".$new."/".$old.", dmg%: ".$dmg." %, trigger: ".$tresh." %");

		$effects = $this->getValidEffects();

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				if ($this->structures[$i]->systems[$j]->destroyed || mt_rand(0, 100) > $tresh){continue;}

				$pick = min(sizeof($effects), mt_rand(0, 1 + sizeof($this->structures[$i]->systems[$j]->crits)));

				$effect = $effects[$pick];
				if ($pick < 2){$effect[4] = $this->getCritModMax($new + $old) * (1 + ($pick * 0.5));}
				if (!$effect[$4]){continue;}

				$this->structures[$i]->systems[$j]->crits[] = new Crit(
					0, $this->parentId, $this->structures[$i]->systems[$j]->id, $turn,
					$effect[0], $effect[2], $effect[3], 1
				);
			}
		}
	}

	public function getName(){
		return "Main";
	}

	public function addPowerEntry($power){
		$this->powers[] = $power;
	}	

	public function getBoostEffect($type){
		for ($i = 0; $i < sizeof($this->boostEffect); $i++){
			if ($this->boostEffect[$i]->type == $type){
				return $this->boostEffect[$i]->value;
			}
		}
		return 0;
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
		return $boost;
	}

}

class Light extends Squaddie {
	public $baseImpulse = 190;
	public $size = 60;
	public $slipAngle = 25;
	public $turnAngle = 40;
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class SuperLight extends Light {
	public $baseImpulse = 200;
	public $size = 50;
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}


?>