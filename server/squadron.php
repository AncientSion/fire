<?php

class Squadron extends Mixed {
	public $ship = false;
	public $squad = true;
	public $mission = false;
	public $name = "Squadron";
	public $display = "Squadron";
	public static $value = 0;
	public $baseImpulse = 185;
	public $turnAngle = 45;
	public $turnStep = 1;
	public $slipAngle = 15;
	public $traverse = 3;
	public static $space;
	public $slots = 10;
	static $odds = 11;
	public $baseFocusRate = 8;

	function __construct($data = false){
        parent::__construct($data);
	}
	
	public function addAllSystems(){
		$this->addPrimary();
	}	

	public function doTestCrits($turn){
		//Debug::log("__doTestCrits for ".$this->name.", #".$this->id.", turn: ".$turn);

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->destroyed){continue;}
			$dmg = $this->structures[$i]->getRelDmg($turn);
			if (!$dmg->new){continue;}
			$this->structures[$i]->determineCrit($dmg, $turn, 0);
			if ($this->structures[$i]->destroyed){continue;}

			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				$this->structures[$i]->systems[$j]->critEffects[] = array("Destroyed", 180, 0, 1);
				$this->structures[$i]->systems[$j]->determineCrit($dmg, $turn, 1);
			}
		}
		$this->isDestroyed();
	}

	static function getKit($faction){
		return array(
			"id" => 0,
			"name" => "",
			"cost" => static::$value,
			"totalCost" => 0,
			"moraleCost" => 0,
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

	public function setMorale($turn, $phase){
		//Debug::log("setMorale ".$this->id.", turn: ".$turn);
		if ($turn){
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
		} else $dmg = 0;

		$command = $this->getSystemByName("Command");
		
		$this->morale = new Morale(
			$this->getBaseMorale(),
			$dmg,
			$this->command,
			$command->getCrewLevel() * $command->getCrewEffect(),
			$command->getCritMod("Morale", $turn)
		);
	 }


	public function getRelDmg($turn){
		//Debug::log("getRelDmg on SQUAD #".$this->id."/".get_class($this));
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
		$this->primary = new Shared($this->getId());
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

		$this->getSystemByName("Engine")->setPowerReq($this->traverse);
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
		//Debug::log("setBaseStats #".$this->id.", current ep ".$this->primary->systems[2]->output);

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (($this->structures[$i]->destroyed && !$this->structures[$i]->isDestroyedThisTurn($turn)) || $this->structures[$i]->disabled){continue;}

			$this->baseTurnDelay = max($this->baseTurnDelay, $this->structures[$i]->baseTurnDelay);

			$this->primary->systems[1]->output = max($this->primary->systems[1]->output, $this->structures[$i]->ew);
			//Debug::log("current ep ".$this->primary->systems[2]->output."/".$this->structures[$i]->ep);

			$this->primary->systems[2]->output = min($this->primary->systems[2]->output, $this->structures[$i]->ep);
		}
	}	

	public function hideFireOrders($turn, $phase){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				for ($k = sizeof($this->structures[$i]->systems[$j]->fireOrders)-1; $k >= 0; $k--){
					if ($this->structures[$i]->systems[$j]->fireOrders[$k]->turn == $turn && $this->structures[$i]->systems[$j]->usage == $phase){
						array_splice($this->structures[$i]->systems[$j]->fireOrders, $k, 1);
					} else break;
				}
			}
		}
	}

	public function hideAllPowers($turn){
		//Debug::log("d");

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				$this->structures[$i]->systems[$j]->doHidePowerOrders($turn);
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
			//Debug::log($this->primary->systems[$i]->id." / ".$this->primary->systems[$i]->name);
			if ($this->primary->systems[$i]->id != $id){continue;}
			return $this->primary->systems[$i];
		}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			//Debug::log($this->structures[$i]->id." / ".$this->structures[$i]->name);
			if ($this->structures[$i]->id == $id){
				return $this->structures[$i];
			}

			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				//Debug::log($this->structures[$i]->systems[$j]->id." / ".$this->structures[$i]->systems[$j]->name);
				if ($this->structures[$i]->systems[$j]->id != $id){continue;}
				return $this->structures[$i]->systems[$j]->getActiveSystem();
			}
		}
		Debug::log("ERROR squadron getSystem: ".$id);
	}

	public function getHitChance($fire){
		return $fire->section->getSubHitChance();
	}

	public function addCritDB($crits){
		for ($i = 0; $i < sizeof($crits); $i++){
			$found = 0;

			for ($j = 0; $j < sizeof($this->primary->systems); $j++){
				if ($this->primary->systems[$j]->id == $crits[$i]->systemid){
					//Debug::log("add");
					$this->primary->systems[$j]->crits[] = $crits[$i];
					$found = 1;
					break;
				}
			}

			if ($found){continue;}

			for ($j = 0; $j < sizeof($this->structures); $j++){
				
				if ($crits[$i]->systemid == $this->structures[$j]->id){
					$this->structures[$j]->crits[] = $crits[$i];
					if ($crits[$i]->type == "Disabled" && $crits[$i]->duration == 0){
						$this->structures[$j]->destroyed = 1;
						for ($k = 0; $k < sizeof($this->structures[$j]->systems); $k++){
							$this->structures[$j]->systems[$k]->destroyed = 1;
						}
					}
					$found = 1;
					break;
				}
				
				for ($k = 0; $k < sizeof($this->structures[$j]->systems); $k++){
					//Debug::log("system id: ".$this->structures[$j]->structures[$k]->systems[$l]->id);
					if ($this->structures[$j]->systems[$k]->id == $crits[$i]->systemid){
						$this->structures[$j]->systems[$k]->crits[] = $crits[$i];
						$found = 1;
						break;
					}
				}

				if ($found){break;}
			}

			if (!$found){Debug::log("ERROR unable to apply sqwuad crit id: ".$crits[$i]->id);}
		}
		return true;
	}
	
	public function getFocusCost(){
		$cost = 0;
		$recalculate = 0;
		$centauri = 0;
		$alive = 0;

		for ($i = 0; $i < sizeof($this->structures); $i++){
			$cost += $this->structures[$i]->cost;

			if ($this->structures[$i]->destroyed){
				$cost -= $this->structures[$i]->cost;
				$recalculate = 1;
			}
			else $alive++;

			if ($this->structures[$i]->faction != "Centauri Republic"){
				$centauri = 0;
			}
		}

		if ($recalculate){
			return round($cost / 100 * (($centauri && $alive > 2) ? 85 : 100));
		}
		return $this->moraleCost;
	}
}


?>