<?php

class Squadron extends Ship {
	public $ship = false;
	public $squad = true;
	public $name = "Squadron";
	public $display = "Squadron";
	public static $value = 0;
	public $baseImpulse = 185;
	public $turnAngle = 45;
	public $traverse = 3;
	public static $space;
	public $slots = 10;
	public $baseFocusRate = 8;

	function __construct($data = false){
        parent::__construct($data);
	}
	
	public function addAllSystems(){
		$this->addPrimary();
	}	

	public function doTestCrits($turn){
		//Debug::log("= doTestCrits for ".$this->name.", #".$this->id.", turn: ".$turn);
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->destroyed){continue;}
			$dmg = $this->structures[$i]->getRelDmg($turn);
			if (!$dmg->new){continue;}
			$this->structures[$i]->determineCrit($dmg, $turn, 0);
			if ($this->structures[$i]->destroyed){continue;}

			for ($j = 0; $j < sizeof($this->structures[$i]->structures); $j++){
				for ($k = 0; $k < sizeof($this->structures[$i]->structures[$j]->systems); $k++){
					$this->structures[$i]->structures[$j]->systems[$k]->determineCrit($dmg, $turn, 1);
				}
			}
		}
	}

	static function getKit($faction){
		return array(
			"id" => 0,
			"name" => "",
			"cost" => static::$value,
			"gameid" => 0,
			"userid" => 0,
			"upgrades" => static::getSubUnits($faction),
			"launch" => array(),
		);
	}

	static function getSubUnits($faction){
		switch ($faction){
			case "Earth Alliance": return SquadBuilder::getEA();
			case "Centauri Republic": return SquadBuilder::getCR();
			case "Minbari Federation": return SquadBuilder::getMF();
			case "Narn Regime": return SquadBuilder::getNR();
			default: return array();
		}
	}

	public function setMorale($turn){
		//Debug::log("setMorale ".$this->id);
		$dmg = 100;
		if (sizeof($this->structures)){
			$integrity = 0;
			$remaining = 0;

			for ($i = 0; $i < sizeof($this->structures); $i++){
				$integrity += $this->structures[$i]->integrity;
				
				if ($this->structures[$i]->isDestroyed()){continue;}
				$remaining += max(0, $this->structures[$i]->remaining);
			}
			$dmg = ($integrity - $remaining) / $integrity * -100;
		}


		$training = $this->getSystemByName("Command")->getCrewLevel() * $this->getSystemByName("Command")->getCrewEffect();

		$this->morale = new Morale($this->getBaseMorale(), $dmg, $this->command, $training, 0);
		//var_export($this->morale);
	 }


	public function getRelDmg($turn){
		$max = 0;
		$new = 0;
		$rem = 0;

		if (sizeof($this->structures)){
			for ($i = 0; $i < sizeof($this->structures); $i++){
				$max += $this->structures[$i]->integrity;
				$rem += $this->structures[$i]->remaining;
				for ($j = 0; $j < sizeof($this->structures[$i]->damages); $j++){
					if ($this->structures[$i]->damages[$j]->turn == $turn){
						$new += $this->structures[$i]->damages[$j]->hullDmg;
					}
				}
			}
		}

		//Debug::log("Squadron getRelDmg $rem/$max new: $new");

		return new RelDmg($new, $max-$rem-$new, $max);
	}


	public function addPrimary(){
		//Debug::log("addPrimary #".$this->id.", index: ".$this->index);
		$this->primary = new Shared();
		$this->primary->systems[] = new Command($this->getId(), $this->id, 0, 0, $this->ship);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 0, 0, 0);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 0, 1000, 0);
	}
	
	public function addStructures(){
		return;
	}
	
	public function addSubUnits($elements){
		//Debug::log("addSubUnits #".$this->id.", index: ".$this->index);
		for ($i = 0; $i < sizeof($elements); $i++){
			for ($j = 1; $j <= $elements[$i]["amount"]; $j++){
				$this->structures[] = new $elements[$i]["name"]($this->getId(), $this->id);
				$this->index = $this->structures[sizeof($this->structures)-1]->index;
			}
		}
		return true;
	}
	
	public function setUnitState($turn, $phase){
		//Debug::log("setUnitState ".get_class($this));
		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->setSubunitState($turn, $phase);
		}

		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			$this->primary->systems[$i]->setState($turn, $phase);
		}

		$this->getSystemByName("Engine")->setPowerReq(0);
		$this->setBaseStats($turn, $phase);
		$this->setFaction();
		$this->setSpecialAbilities();
		$this->setProps($turn, $phase);
		$this->setCrewUpgrades($turn);
		$this->setMorale($turn, $phase);
		$this->isDestroyed();

		return true;
	}

	public function setFaction(){
		if (!sizeof($this->structures)){
			$this->faction = ""; return;
		}
		else $this->faction = $this->structures[0]->faction;

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->faction != $this->faction){
				$this->faction = ""; return;
			}
		}
	}

	public function setBaseStats($turn, $phase){
		//Debug::log("setBaseStats #".$this->id);

		$this->size = 50 + sizeof($this->structures)*10;

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (($this->structures[$i]->destroyed && !$this->structures[$i]->isDestroyedThisTurn($turn)) || $this->structures[$i]->disabled){continue;}

			$this->baseTurnDelay = max($this->baseTurnDelay, $this->structures[$i]->baseTurnDelay);
			//$this->baseImpulseCost = max($this->baseImpulseCost, $this->structures[$i]->baseImpulseCost);
			//$this->baseImpulse = min($this->baseImpulse, $this->structures[$i]->baseImpulse);
			//$this->slipAngle = min($this->slipAngle, $this->structures[$i]->slipAngle);

			$this->primary->systems[1]->output = max($this->primary->systems[1]->output, $this->structures[$i]->ew);
			$this->primary->systems[2]->output = min($this->primary->systems[2]->output, $this->structures[$i]->ep);
		}
	}	

	public function hideFireOrders($turn, $phase){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->structures); $j++){
				for ($k = 0; $k < sizeof($this->structures[$i]->structures[$j]->systems); $k++){
					for ($l = sizeof($this->structures[$i]->structures[$j]->systems[$k]->fireOrders)-1; $l >= 0; $l--){
						if ($this->structures[$i]->structures[$j]->systems[$k]->fireOrders[$l]->turn == $turn && $this->structures[$i]->structures[$j]->systems[$k]->usage == $phase){
							array_splice($this->structures[$i]->structures[$j]->systems[$k]->fireOrders, $l, 1);
						} else break;
					}
				}
			}
		}
	}

	public function hideAllPowers($turn){
		//Debug::log("d");

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->structures); $j++){
				for ($k = 0; $k < sizeof($this->structures[$i]->structures[$j]->systems); $k++){
					$this->structures[$i]->structures[$j]->systems[$k]->doHidePowerOrders($turn);
				}
			}
		}


		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			//Debug::log("s: ".sizeof($this->primary->systems));
			if ($this->primary->systems[$i]->name == "Sensor"){
				$this->primary->systems[$i]->hideEW($turn);
			}
			for ($j = sizeof($this->primary->systems[$i]->powers)-1; $j >= 0; $j--){
				if ($this->primary->systems[$i]->powers[$j]->turn == $turn && $this->primary->systems[$i]->powers[$j]->type != 2){
					array_splice($this->primary->systems[$i]->powers, $j, 1);
				} else break;
			}
		}
	}

	public function getSystem($id){
		//Debug::log("Squadron #".$this->id.", getSystem #".$id);
		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			//Debug::log($this->primary->systems[$i]->name." id: ".$this->primary->systems[$i]->id);
			if ($this->primary->systems[$i]->id == $id){
				return $this->primary->systems[$i];
			}
		}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->id == $id){
				//Debug::log("id: ".$this->structures[$i]->id);
				return $this->structures[$i];
			}

			for ($j = 0; $j < sizeof($this->structures[$i]->structures); $j++){
				for ($k = 0; $k < sizeof($this->structures[$i]->structures[$j]->systems); $k++){
					if ($this->structures[$i]->structures[$j]->systems[$k]->id == $id){
						return $this->structures[$i]->structures[$j]->systems[$k]->getActiveSystem();
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
					DmgCalc::doDmg($fire, $i, $target);
				}
			}
		}
	}

	public function getHitChance($fire){
		return $this->getStruct($fire->singleid)->getSubHitChance($fire);
	}

	public function getFacingElement($fire){
		return $this->getHitSystme();
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

	public function getArmour($fire, $system){
		return $system->getArmourValue($system);
	}

	public function addCritDB($crits){
		for ($i = 0; $i < sizeof($crits); $i++){
			$found = 0;

			//var_export($crits[$i]);

			for ($j = 0; $j < sizeof($this->primary->systems); $j++){
				if ($this->primary->systems[$j]->id == $crits[$i]->systemid){
					//Debug::log("add");
					$this->primary->systems[$j]->crits[] = $crits[$i];
					$found = 1;
					break;
				}
			}

			if ($found){
				//Debug::log("ding");
				continue;
			}

			for ($j = 0; $j < sizeof($this->structures); $j++){
				
				if ($crits[$i]->systemid == $this->structures[$j]->id){
					$this->structures[$j]->crits[] = $crits[$i];
					if ($crits[$i]->type == "Disabled" && $crits[$i]->duration == 0){
						$this->structures[$j]->destroyed = 1;
						for ($k = 0; $k < sizeof($this->structures[$j]->structures); $k++){
							for ($l = 0; $l < sizeof($this->structures[$j]->structures[$k]->systems); $l++){
								$this->structures[$j]->structures[$k]->systems[$l]->destroyed = 1;
							}
						}
					}
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

		for ($k = 0; $k < sizeof($this->primary->systems); $k++){
			for ($l = 0; $l < sizeof($this->primary->systems[$k]->crits); $l++){
				if ($this->primary->systems[$k]->crits[$l]->new){
					$crits[] = $this->primary->systems[$k]->crits[$l];
				}// else break;
			}
		}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			$crits = array_merge($crits, $this->structures[$i]->getNewCrits($turn));
		}
		return $crits;
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

	public function getSystemByName($name){
		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			if ($this->primary->systems[$i]->name == $name){
				return $this->primary->systems[$i];
			}
		}
	}
}


?>