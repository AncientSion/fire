<?php

class Squadron extends Ship {
	public $ship = false;
	public $squad = true;
	public $name = "Squadron";
	public $display = "Squadron";
	public static $value = 0;
	public $baseTurnCost = 0;
	public $baseTurnDelay = 0;
	public $baseImpulseCost = 0;
	public $baseImpulse = 1000;
	public $slipAngle = 1000;
	public $turnangle = 40;
	public $traverse = -1;
	public static $space;
	public $slots = array(0, 14);

	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
		parent::__construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addPrimary(){
		$this->primary = new Shared();
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, array(0, 0), 0, 0);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, array(0, 0), 1000, 0);
	}
	
	public function addStructures(){
		return;
	}
	
	public function addSubUnits($elements){
		//Debug::log("SQUADRON addSubUnits ".sizeof($elements));

		for ($i = 0; $i < sizeof($elements); $i++){
			for ($j = 1; $j <= $elements[$i]["amount"]; $j++){
				$this->structures[] = new $elements[$i]["name"]($this->getId(), $this->id);
				$this->index = $this->structures[sizeof($this->structures)-1]->index;
				$this->slots[0] += $this->structures[sizeof($this->structures)-1]->space;
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

		$this->getSystemByName("Engine")->setPowerReq(0);
		$this->setBaseStats($turn, $phase);
		$this->setProps($turn, $phase);

		return true;
	}

	public function setBaseStats($turn, $phase){
		//Debug::log("setBaseStats #".$this->id);

		$this->size = 40 + sizeof($this->structures)*20;

		$alive = 0;

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (($this->structures[$i]->destroyed && !$this->structures[$i]->isDestroyedThisTurn($turn)) || $this->structures[$i]->disabled){continue;}

			$alive = 1;
			//$this->baseTurnCost = max($this->baseTurnCost, $this->structures[$i]->baseTurnCost);
			$this->baseTurnDelay = max($this->baseTurnDelay, $this->structures[$i]->baseTurnDelay);
			$this->baseImpulseCost = max($this->baseImpulseCost, $this->structures[$i]->baseImpulseCost);
			$this->baseImpulse = min($this->baseImpulse, $this->structures[$i]->baseImpulse);
			$this->slipAngle = min($this->slipAngle, $this->structures[$i]->slipAngle);
			//$this->turnAngle = min($this->turnAngle, $this->structures[$i]->turnAngle);


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
					for ($l = sizeof($this->structures[$i]->structures[$j]->systems[$k]->fireOrders)-1; $l >= 0; $l--){
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

		for ($j = 0; $j < sizeof($this->primary->systems); $j++){
			if ($this->primary->systems[$j]->name == "Sensor"){
				$this->primary->systems[$j]->hideEW($turn);
			}
			for ($k = sizeof($this->primary->systems[$j]->powers)-1; $k >= 0; $k--){
				if ($this->primary->systems[$j]->powers[$k]->turn == $turn){
					array_splice($this->primary->systems[$j]->powers, $k, 1);
				} else break;
			}
		}
	}

	public function getSystem($id){
		//Debug::log("Squadron getSystem #".$id);
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
		//Debug::log("ERROR squadron getSystem: ".$id);
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
				if ($fire->rolls[$i] <= $fire->req){
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
	//	if ($fire->weapon->laser && 


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
			else if (!$this->structures[$i]->damaged){/*Debug::log("subunit ".$i." not damaged!");*/ continue;}

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

	public $slots = 0;
	
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
		$this->baseHitChance = Math::getBaseHitChance($this->mass);
		$this->baseTurnDelay = Math::getBaseTurnDelay($this->mass);
		//$this->baseImpulseCost = Math::getBaseImpulseCost($this->mass);
	}

	public function setUnitState($turn, $phase){
		if ($this->isDestroyed()){
			$this->destroyed = 1;
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
		$p = 1.25;

		$this->parentIntegrity = round($main*1.5);

		$this->parentPow = round(pow($this->parentIntegrity, $p));
		$this->armourDmg += $armourDmg;
		$this->remainingNegation = round((pow($this->parentIntegrity - $this->armourDmg, $p) / $this->parentPow) * $this->negation);
	}

	public function getCurrentNegation(){
		$p = 1.25;
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
			array("Damage", 20, 0, 25),
			array("Disabled", 70, 1, 0.00),
			array("Destroyed", 80, 0, 0.00),
		);
	}	

	public function getCritModMax($dmg){
		return min(20, (round($dmg/20)*10));
	}

	public function determineCrit($old, $new, $turn){
		$dmg =  round(($new + $old/2) / $this->integrity * 100);
		$effects = $this->getValidEffects();

		//Debug::log(" => SQUAD determineCrit #".$this->parentId."/".$this->id." for ".$this->name.", Dmg: ".$dmg." %");

		$effects = $this->getValidEffects();

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				if ($this->structures[$i]->systems[$j]->destroyed){continue;}

				$roll = mt_rand(0, 90);

				if ($roll > $dmg){/*Debug::log("rolled above damage on 0-90"); */continue;}

				$roll = mt_rand(0, 40) + $dmg;
				//Debug::log("in crit, determine effect roll: ".$roll);

				for ($k = sizeof($effects)-1; $k >= 0; $k--){
					if ($roll >= $effects[$k][1]){
						//Debug::log("crit");
						$this->structures[$i]->systems[$j]->crits[] = new Crit(
							0, $this->parentId, $this->structures[$i]->systems[$j]->id, $turn,
							 $effects[$k][0],  $effects[$k][2],  $effects[$k][3], 1
						);
						break 2;
					}
				}
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
	public $baseImpulseCost = 35;
	public $space = 4;
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class SuperLight extends Light {
	public $baseImpulse = 200;
	public $size = 50;
	public $baseImpulseCost = 40;
	public $space = 3;
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}


?>