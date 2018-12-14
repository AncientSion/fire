<?php

class Mixed extends Ship {
	public $ship = false;
	public $primary = false;
	public static $value = 0;
	public $mass = 0;
	public $profile = 0;
	public $mission = array();
	public $turnAngle = 0;
	public $slipAngle = 0;
	public $turnStep = 0;

	function __construct($data = false){
        parent::__construct($data);
	}
	
	public function addAllSystems(){
		return;
	}

	public function setUnitState($turn, $phase){
		//Debug::log("setUnitState #".$this->id." ".get_class($this));
		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->setSubunitState($turn, $phase);
		}
		$this->setBaseStats($phase, $turn);
		$this->setMorale($turn, $phase);
		$this->isDestroyed();
		$this->setProps($turn, $phase);
	}

	public function setSize(){
		$this->size = 50 + sizeof($this->structures)*8;
	}

	public function setMorale($turn, $phase){
		return;
	}

	public function isRolling(){
		return 0;
	}

	public function isRolled(){
		return 0;
	}

	public function doTestCrits($turn){
		//Debug::log("= doTestCrits for ".$this->name.", #".$this->id.", turn: ".$turn);
		if ($this->salvo && $this->mission->arrived){return;}
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->destroyed){continue;}
			$dmg = $this->structures[$i]->getRelDmg($turn);
			if (!$dmg->new){continue;}
			$this->structures[$i]->determineCrit($dmg, $turn, 0);
		}
		$this->isDestroyed();
	}

	public function getNewDamages($turn){
		$dmgs = array();

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->damages); $j++){
				if ($this->structures[$i]->damages[$j]->new){
					$dmgs[] = $this->structures[$i]->damages[$j];
				}
			}
		}
		return $dmgs;
	}

	public function getNewCrits($turn){
		$crits = array();

		if ($this->squad){
			for ($k = 0; $k < sizeof($this->primary->systems); $k++){
				for ($l = 0; $l < sizeof($this->primary->systems[$k]->crits); $l++){
					if ($this->primary->systems[$k]->crits[$l]->new){
						$crits[] = $this->primary->systems[$k]->crits[$l];
					}// else break;
				}
			}
		}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			$crits = array_merge($crits, $this->structures[$i]->getNewCrits($turn));
		}
		return $crits;
	}

	public function addCritDB($crits){
		for ($i = 0; $i < sizeof($crits); $i++){
			for ($j = 0; $j < sizeof($this->structures); $j++){
				if ($this->structures[$j]->id == $crits[$i]->systemid){
					$this->structures[$j]->crits[] = $crits[$i];
					break;
				}
			}
		}
		return true;
	}

	public function hideAllPowers($turn){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				$this->structures[$i]->systems[$j]->doHidePowerOrders($turn);
			}
		}
	}

	public function getIncomingFireAngle($fire){
		if ($fire->cc && $this->flight){
			return 0;
		}
		
		for ($i = 0; $i < sizeof($this->angles); $i++){
			if ($this->angles[$i][0] == $fire->shooter->id){
				return $this->angles[$i][1];
			}
		}

		Debug::log("got no ANGLE set on ".$this->id." targeted by #".$fire->shooter->id);
	}
	
	public function getRemIntegrity($fire){
		return $this->getStruct($fire->hitSystem->id)->getRemIntegrity();
	}

	public function getArmour($fire, $system){
		return array("stock" => $system->negation, "bonus" => 0);
	}

	public function getHitSection($fire){
		return 0;
	}

	public function getFlashTargets($fire){
		$valid = array();

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->destroyed){continue;}
			$valid[] = $this->structures[$i];
		}
		return $valid;

		if (!sizeof($valid)){return $this->primary;}
		return $valid[mt_rand(0, sizeof($valid)-1)];
	}

	public function getFlashOverkillSystem($fire){
		return false;
	}
	
	public function getHitSystem($fire){
		$elements = array();
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->destroyed){continue;}
			$elements[] = $this->structures[$i];
		}
		return $elements[mt_rand(0, sizeof($elements)-1)];
	}

	public function isDestroyed(){
		//Debug::log("isDestroyed()".get_class($this));
		if ($this->destroyed){return true;}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->isDestroyed()){
				//Debug::log("nope, unit ".$i." / ".$this->structures[$i]->name." still alive");
				return false;
			}
		}
		//Debug::log("setting squadron to destroyed");
		$this->destroyed = 1;
		return true;
	}

	public function addSubUnits($elements){
		//Debug::log("add subs to #".$this->id.", element len ".sizeof($elements));
		for ($i = 0; $i < sizeof($elements); $i++){
			for ($j = 1; $j <= $elements[$i]["amount"]; $j++){
				$this->structures[] = new $elements[$i]["name"]($this->getId(), $this->id);
				$this->structures[sizeof($this->structures)-1]->traverse = $this->traverse;
				$this->index = $this->structures[sizeof($this->structures)-1]->index;
			}
		}
		return true;
	}

	public function getSystem($id){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->id == $id){
				return $this->structures[$i];
			}
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				if ($this->structures[$i]->systems[$j]->id == $id){
					return $this->structures[$i]->systems[$j]->getActiveSystem();
				}
			}
		}
	}

	public function determineObstacleHits($fire){
		//Debug::log("determineObstacleHits ".get_class($this).", shots ".$fire->shots.", req ".$fire->req);

		$fire->section = 0;
		$shots = 0;

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->destroyed){
				Debug::log("skip id ".$this->structures[$i]->id);
				continue;
			}

			$fire->rolls = [];
			$this->doRollShots($fire);
			$shots += sizeof($fire->rolls);
			//Debug::log($shots);

			for ($j = 0; $j < sizeof($fire->rolls); $j++){
				if ($this->structures[$i]->destroyed){break;} // no cancel, rolls are emptied anyway
				else if ($fire->rolls[$j] <= $fire->req){
					$fire->hits++;
					DmgCalc::doDmg($fire, $i, $this->structures[$i]);
				}
			}
		}

		$fire->rolls = [];
		$fire->notes .= $fire->shots.";";
		$fire->shots = $shots;
		//Debug::log(" = ".$fire->shots);
	}


	public function determineHits($fire){
		//Debug::log("determineHits ".get_class($this));
		for ($i = 0; $i < sizeof($fire->rolls); $i++){
			if ($this->destroyed){$fire->cancelShotResolution($i); return;}
			else {
				$target = $this->getHitSystem($fire);
				$fire->subtargetid = $target->id;
				$fire->req = $fire->shooter->calculateToHit($fire);
				if ($fire->rolls[$i] <= $fire->req){
					if ($this->didPassDefenses($fire, $i, $target)){
						$fire->hits++;
						DmgCalc::doDmg($fire, $i, $target);
					}
				}
			}
		}
	}


	public function getHitChance($fire){
		return $this->getStruct($fire->subtargetid)->getSubHitChance($fire);
	}

	public function setImpulseProfileMod(){
		if (!$this->squad){return;}
		parent::setImpulseProfileMod();
	}

	public function setJamming($turn){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->setSingleJamming($turn);
		}
	}
}

class Minor extends Mixed {
	function __construct($data = false){
        parent::__construct($data);
	}
	
	public $critEffects =  array();

	public function addMission($data, $userid, $turn, $phase){
		if ($this->salvo){$this->mission = new Mission($data[sizeof($data)-1]); return;}
		
		//Debug::log("addMission to #".$this->id.", turn: ".$turn.", phase: ".$phase.", userid: ".$userid);
		if (!$userid || $this->userid == $userid || sizeof($data) == 1){
			//Debug::log("no user or friendly user or size 1");
			$this->mission = new Mission($data[sizeof($data)-1]);
		}
		else if ($phase == -1 || $phase == 1){
			$possible = array();

			for ($i = sizeof($data)-1; $i >= 0; $i--){
				if ($data[$i]["turn"] < $turn){
					$this->mission = new Mission($data[$i]);
					return;
				}
				else if ($data[$i]["phase"] < $phase){
					$this->mission = new Mission($data[$i]);
					return;
				}
			}
		}
		else $this->mission = new Mission($data[sizeof($data)-1]);
	}

	public function doTestMorale($turn){
		return false;
	}

	public function getEndState($turn){
		//Debug::log("getEndState for ".$this->id);
		$heading = $this->actions[sizeof($this->actions)-1]->h;
		$facing = $this->actions[sizeof($this->actions)-1]->f;

		if ($heading > 360){
			$heading -= 360;
		}
		else if ($heading < 0){
			$heading += 360;
		}

		//Debug::log("getEndState for ".get_class($this)." #".$this->id." current heading ".$this->heading.", now: ".$heading.", rolling: ".$this->rolling.", rolled: ".$this->rolled);
	
		return array(
			"id" => $this->id,
			"destroyed" => $this->destroyed,
			"withdraw" => $this->withdraw,
			"manual" => $this->manual,
			"x" => $this->actions[sizeof($this->actions)-1]->x,
			"y" => $this->actions[sizeof($this->actions)-1]->y,
			"delay" => 0,
			"heading" => $this->heading,
			"facing" => $this->facing,
			"thrust" => $this->getCurSpeed(),
			"rolling" => $this->isRolling(),
			"rolled" => $this->isRolled(),
			"flipped" => $this->flipped,
			"status" => $this->status,
			"notes" => "",
		);
	}
}
?>