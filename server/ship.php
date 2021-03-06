<?php

class Ship {
	public $id;
	public $parentId = 0;
	public $userid;
	public $available;
	public $withdraw;
	public $manual;
	public $status;
	public $destroyed;
	public $x;
	public $y;
	public $heading;
	public $facing;
	public $delay;
	public $thrust;
	public $rolling;
	public $rolled;
	public $flipping = 0;
	public $flipped;
	public $baseFocusRate = 0;
	public $carrier = 0;

	public $disabled = false;

	public $baseHitChance = 0;
	public $remDelay = 0;
	public $curImp = 0;
	public $remImp = 0;
	public $baseImpulse = 0;

	public $impulseHitMod = 0;
	public $jamming = 0;

	public $baseMorale = 100;

	public $name = "";
	public $display = "";
	public $callsign = "";
	public $faction = "";
	public $notes = "";
	public $size;
	public static $value;
	public $cost = 0;

	public $ship = true;
	public $flight = false;
	public $salvo = false;
	public $squad = false;
	public $system = false;
	public $mission = false;
	public $traverse = 0;
	public $mass = 0;
	public $profile = array();
	public $index = 0; 
	public $actions = array();
	public $structures = array();

	public $locks = array();
	public $masks = array();
	public $distances = array();
	public $angles = array();
	public $blocks = array();
	public $collisions = array();

	public $turnAngle = 30;
	public $slipAngle = 15;
	public $baseImpulseCost = 30;
	public $turnStep = 1;
	public $baseTurnDelay;
	public $hitTable;
	public $cc = array();
	public $damaged = 0;
	public $moveSet = 0;
	public $move = 0;
	public $obstacle = 0;

	public $ep = 0;
	public $ew = 0;
	public $power = 0;
	public $modFocusRate = 0;

	public $critEffects = array( // type, min%, dura, effect
	//	array("Rout", 10, -2, 0.00),
		array("Morale", 30, -2, -5.00),
		array("Morale", 60, -2, -15.00),
		array("Morale", 100, -2, -25.00),
		array("Rout", 150, -2, 0.00),
	);

	function __construct($data){
		if (!$data){return;}
		$this->id = $data["id"];
		$this->userid = $data["userid"];
		$this->callsign = $data["callsign"];
		$this->cost = static::$value;
		$this->totalCost = $data["totalCost"];
		$this->moraleCost = $data["moraleCost"];
		$this->status = $data["status"];
		$this->command = $data["command"];
		$this->available = $data["available"];
		$this->withdraw = $data["withdraw"];
		$this->manual = $data["manual"];
		$this->destroyed = $data["destroyed"];
		$this->x = $data["x"];
		$this->y = $data["y"];
		$this->heading = $data["heading"];
		$this->facing = $data["facing"];
		$this->remDelay = $data["delay"];
		$this->curImp = $data["thrust"];
		$this->rolling = $data["rolling"];
		$this->rolled = $data["rolled"];
		$this->flipped = $data["flipped"];
		$this->focus = $data["focus"];
		$this->notes = $data["notes"];
	}

	public function addAllSystems(){
		$this->addPrimary();
		$this->addSpecials();
		$this->addStructures();
		$this->addTurrets();
		$this->handleTurrets();
	}

	public function addTurrets(){
		return;
	}

	public function handleTurrets(){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->turret){continue;}
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				$this->structures[$i]->systems[$j]->turret = $this->structures[$i]->id;
				//$this->structures[$i]->powerReq += $this->structures[$i]->systems[$j]->powerReq;
			}
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, $this->traverse, $this->integrity);
		$this->primary->systems[] = new Command($this->getId(), $this->id, $this->vitalHP, static::$value, $this->ship);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, $this->vitalHP, $this->ep);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, $this->vitalHP, $this->ew);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, $this->vitalHP);
	}

	public function addSpecials(){
		return;
	}

	public function getServerActions(){
		$actions = array();
		if (!$this->hasMoved()){return $actions;}
		for ($i = 0; $i < sizeof($this->actions); $i++){
			if ($this->actions[$i]->new){
				$actions[] = $this->actions[$i];
			}
		}
		return $actions;
	}

	public function setMove(){
		if ($this->moveSet){return;}
		Debug::log("**** setMove ".get_class($this)." #".$this->id);

		$origin = $this->getCurPos();
		$move = new Move(-1, $this->id, Manager::$turn, "rotate", 0, 0, $origin->x, $origin->y, 0, 120, 0, 0, 0, 1, 1);
		$this->actions[] = $move;
		$this->moveSet = 1;
	}

	public function getId(){
		$this->index++;
		return $this->index;
	}

	public function hasMoved(){
		return sizeof($this->actions);
	}

	public function setInternalHitChance(){
		$main = $this->primary->getTotalHitChance();
		$all = $main;

		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			$this->primary->systems[$i]->setHitChanceValue();
			$all += $this->primary->systems[$i]->getHitChance();
		}

		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			$this->primary->systems[$i]->hitPct = round($this->primary->systems[$i]->getHitChance() / $all * 100, 2);
		}
	}

	public function setSpecialAbilities(){
		//Debug::log("setSpecialAbilities #".$this->id.", now: ".$this->baseImpulseCost);
		if ($this->faction == "Centauri Republic"){
			//Debug::log("add");
			$this->baseImpulseCost = ceil($this->baseImpulseCost * 0.8);
		}
		else if ($this->faction == "Narn Regime"){
			$this->baseMorale = 125;
		}
		else if ($this->faction == "Earth Alliance"){
			if ($this->squad){
				$this->slots = 12;
				$this->baseMorale = 100 + max(0, 5*(sizeof($this->structures)-2));
			}

		}
		else if ($this->faction == "Minbari Federation"){
			$this->baseMorale = 105;
			$command = $this->getSystemByName("Command");
			for ($i = 0; $i < sizeof($command->loads); $i++){
				$command->loads[$i]["baseCost"] = ceil($command->loads[$i]["baseCost"] * 0.7);
			}
		}
		else if ($this->faction == "Vree Conglomerate"){
			//if ($this->ship){
			//	$this->slipAngle = 20;
			//}
			if ($this->squad){
				$this->slipAngle = 30;
			}
		}
		//Debug::log("setSpecialAbilities #".$this->id.", now: ".$this->baseMorale);
	}
	
	public function setUnitState($turn, $phase){
		//Debug::log("ship setUnitState #".$this->id."/".$this->display);
		//if ($this->id == 6){Debug::log("d: ".$this->getSystemByName("Sensor")->damages[0]->destroyed);}

		$this->setBaseStats($turn, $phase);
		$this->setStructureState($turn, $phase);
		$this->setInternalHitChance();
		$this->setProps($turn, $phase);

		for ($i = 0; $i < sizeof($this->primary->systems); $i++){ // check primary criticals
			$this->primary->systems[$i]->setState($turn, $phase);
			switch ($this->primary->systems[$i]->name){
				case "Command":
					if ($this->primary->systems[$i]->destroyed || $this->primary->systems[$i]->disabled){
						$this->doUncommandShip($turn);
					}
					break;
				case "Reactor":
					if ($this->primary->systems[$i]->destroyed){
						$this->destroyed = 1;
					}
					else if ($this->primary->systems[$i]->disabled){
						$this->doUnpowerAllSystems($turn);
					}
					break;
			}
		}

		$this->getSystemByName("Engine")->setPowerReq($this->traverse, $this->mass);
		$this->getSystemByName("Sensor")->setPowerReq($this->traverse, $this->mass);
		$this->getSystemByName("Reactor")->setOutput($this->getPowerReq(), $this->power);

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				$rem = $this->structures[$i]->getRemNegation();
				$this->structures[$i]->systems[$j]->setState($turn, $phase);
				$this->structures[$i]->systems[$j]->setArmourData($rem);
			}
		}

		$this->setSpecialAbilities();
		$this->setCrewUpgrades($turn);
		$this->setMorale($turn, $phase);
		$this->isDestroyed();
		return true;
	}

	public function setCrewUpgrades($turn){
		$command = $this->getSystemByName("Command");
		
		for ($i = 0; $i < sizeof($command->loads); $i++){
			if (!$command->loads[$i]["amount"]){continue;}
			$target = $this->getSystemByName($command->loads[$i]["name"]);

			for ($j = 0; $j < $command->loads[$i]["amount"]; $j++){
				$target->powers[] = new Power(0, $this->id, 0, $turn, 2, 0);
			}
		}
	}

	public function getIntactElements(){
		$alive = 0;
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed){
				$alive++;
			}
		}
		return $alive;
	}

	public function getBaseMorale(){
		return $this->baseMorale;
	}

	public function setMorale($turn, $phasr){
		//Debug::log("setMorale #".$this->id);
		$command = $this->getSystemByName("Command");
		$this->morale = new Morale(
			$this->getBaseMorale(),
			($this->primary->integrity - $this->primary->remaining) / $this->primary->integrity * -100,
			$this->command,
			$command->getCrewLevel() * $command->getCrewEffect(),
			$command->getCritMod("Morale", $turn)
		);
		//Debug::log("Morale #".$this->id.": ".$this->morale->damage."/".$this->morale->cmd."/".$this->morale->crew."/".$this->morale->crit.", rem: ".$this->morale->rem.", effChance: ".$this->morale->effChance);
	}

	public function setStructureState($turn, $phase){
		$sections = 0;
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->turret){continue;}
			$sections++;
		}
		$total = $this->primary->integrity * 4 / $sections;

		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->setNegation($total, 0);
		}
	}

	public function getArmourMultiplier(){
		return pow(1.1, $this->traverse+3);
	}

	public function setProps($turn, $phase){
		//Debug::log("setProps ".get_class($this)." #".$this->id);
		$this->setUnitCost();
		$this->setSize();
		$this->setCurSpeed($turn, $phase);
		$this->setRemImpulse($turn);
		$this->setSpecialActionState($turn, $phase);
	}

	public function setSize(){
		return;
	}

	public function setUnitCost(){
		if ($this->cost){return;}
		if ($this->ship || !sizeof($this->structures)){$this->cost = static::$value; return;}

		$cost = 0;
		for ($i = 0; $i < sizeof($this->structures); $i++){
			$cost += $this->structures[$i]->getValue();
		}
		$this->cost = $cost;
	}

	public function setPosition(){
		for ($i = sizeof($this->actions)-1; $i >= 0; $i--){
			if ($this->actions[$i]->resolved){
				$this->x = $this->actions[$i]->x;
				$this->y = $this->actions[$i]->y;
				return;
			}
		}
	}

	public function setBaseStats($phase, $turn){
		$this->baseHitChance = Math::getBaseHitChance($this->mass);
		$this->baseTurnDelay = Math::getBaseTurnDelay($this->mass);
	}

	public function getImpulseStep(){
			return floor($this->getBaseImpulse() / 8);
	}

	public function setDEW(){
		$sensor = $this->getSystemByName("Sensor");
		//$sensor->locked = 1;
		$sensor->states = array(0, 1);
	}

	public function hideAllPowers($turn){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = sizeof($this->structures[$i]->powers)-1; $j >= 0; $j--){
				if ($this->structures[$i]->powers[$j]->turn == $turn){
					array_splice($this->structures[$i]->powers, $j, 1);
				} else break;
			}
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				$this->structures[$i]->systems[$j]->doHidePowerOrders($turn);
			}
		}
	}

	public function hideSpecials($turn){
		if (!$this->ship && !$this->squad){return;}

		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
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

	public function hideFireOrders($turn, $phase){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($k = 0; $k < sizeof($this->structures[$i]->systems); $k++){
				for ($l = sizeof($this->structures[$i]->systems[$k]->fireOrders)-1; $l >= 0; $l--){
					if ($this->structures[$i]->systems[$k]->fireOrders[$l]->turn == $turn && $this->structures[$i]->systems[$k]->usage == $phase){
						array_splice($this->structures[$i]->systems[$k]->fireOrders, $l, 1);
					} else break;
				}
			}
		}
	}
	
	public function hideActions($phase){
		if ($this->flight || $this->salvo){return;}
		if ($this->focus && $phase == 2){return;}
		if (!$this->focus && $phase == 1){return;}

		for ($i = sizeof($this->actions)-1; $i >= 0; $i--){
			if ($this->actions[$i]->resolved){continue;}

			if ($this->actions[$i]->type == "roll"){$this->rolling = !$this->rolling;}
			if ($this->actions[$i]->type == "flip"){$this->flipping = !$this->flipping;}
			array_splice($this->actions, $i, 1);
		}
	}

	public function getBaseImpulse(){
		return $this->baseImpulse;
	}

	public function setCurSpeed($turn, $phase){
		//Debug::log("setCurSpeed #".$this->id);
		$impulse = $this->curImp;
		if ($turn == $this->available){
			$impulse = $this->getBaseImpulse();
		}

		//Debug::log($this->curImp);
		$step = $this->getImpulseStep();

		for ($i = 0; $i < sizeof($this->actions); $i++){
		//Debug::log($this->curImp);
			if (!$this->actions[$i]->resolved){continue;}
			if ($this->actions[$i]->type == "speed"){
				$impulse += $step*$this->actions[$i]->dist;
			}
		}
		$this->curImp = $impulse;
		//Debug::log($this->curImp);
	}

	public function getCurSpeed(){
		//Debug::log("getCurSpeed #".$this->id);
		return $this->curImp;
	}

	public function setRemImpulse($turn){
		if (sizeof($this->actions) && $this->actions[sizeof($this->actions)-1]->turn == $turn){
			$this->remImp = 0;
		}
		else $this->remImp = $this->getCurSpeed();
	}

	public function getDeployState($turn){
		Debug::log("getDeployState for ".get_class($this)." #".$this->id.", destroyed: ".$this->destroyed);
		return array(
			"id" => $this->id,
			"withdraw" => $this->withdraw,
			"manual" => $this->manual,
			"destroyed" => $this->destroyed,
			"x" => $this->actions[sizeof($this->actions)-1]->x,
			"y" => $this->actions[sizeof($this->actions)-1]->y,
			"delay" => 0,
			"heading" => $this->actions[sizeof($this->actions)-1]->h,
			"facing" => $this->actions[sizeof($this->actions)-1]->f,
			"thrust" => $this->getCurSpeed(),
			"rolling" => $this->isRolling(),
			"rolled" => $this->isRolled(),
			"flipped" => $this->flipped,
			"status" => $this->status,
			"notes" => "",
			);
	}

	public function getEndState($turn){
		//Debug::log("getEndState for ".$this->id);
		$delay = $this->remDelay;
		$heading = $this->heading;
		$facing = $this->facing;

		for ($i = 0; $i < sizeof($this->actions); $i++){
			if ($this->actions[$i]->turn < $turn){continue;}
				$heading += $this->actions[$i]->h;
				$facing += $this->actions[$i]->f;
				$delay += $this->actions[$i]->delay;

			if ($delay && $this->actions[$i]->type == "move"){
				$delay = max(0, $delay - $this->actions[$i]->dist);
			}
			else if ($this->actions[$i]->type == "flip"){
				$this->flipped = $turn;
				$heading += 180;
			}
		}

		$heading = Math::adjustAngle($heading);
		$facing = Math::adjustAngle($facing);

		//Debug::log("getEndState for ".get_class($this)." #".$this->id." heading ".$heading.", facing: ".$facing.", rolling: ".$this->rolling.", rolled: ".$this->rolled);

		return array(
			"id" => $this->id,
			"withdraw" => $this->withdraw,
			"manual" => $this->manual,
			"destroyed" => $this->destroyed,
			"x" => $this->actions[sizeof($this->actions)-1]->x,
			"y" => $this->actions[sizeof($this->actions)-1]->y,
			"delay" => $delay,
			"heading" => $heading,
			"facing" => $facing,
			"thrust" => $this->getCurSpeed(),
			"rolling" => $this->isRolling(),
			"rolled" => $this->isRolled(),
			"flipped" => $this->flipped,
			"status" => $this->status,
			"notes" => "",
		);
	}

	public function isRolling(){
		return $this->rolling;
	}

	public function isRolled(){
		return $this->rolled;
	}

	public function setSpecialActionState($turn, $phase){
		//Debug::log("setSpecialActionState #".$this->id);
		for ($i = 0; $i < sizeof($this->actions); $i++){
			if ($this->actions[$i]->type == "flip"){
				//Debug::log("flipping! ".$this->flipping);
				$this->flipping = $this->flipping ? 0 : 1;
				//Debug::log("flipping! ".$this->flipping);
			}
			else if ($this->actions[$i]->type == "roll"){
				//Debug::log("rolling! ".$this->rolling);
				$this->rolling = $this->rolling ? 0 : 1;
				//Debug::log("rolling! ".$this->rolling);
			}
		}
	}

	public function addLoadout($dbLoad){
		//Debug::log("addLoadout to #".$this->id);
		$chunk = array();
		$chunk[] = $dbLoad[0];

		for ($i = 1; $i < sizeof($dbLoad); $i++){
			//Debug::log($i.": ".$dbLoad[$i]["systemid"]);
			if ($dbLoad[$i]["systemid"] != $chunk[sizeof($chunk)-1]["systemid"]){
				$this->getSystem($chunk[sizeof($chunk)-1]["systemid"])->adjustLoad($chunk);
				$chunk = array();
				$chunk[] = $dbLoad[$i];
			}
			else {
				$chunk[] = $dbLoad[$i];
			}
		}
		//var_export($this->name); echo "</br>"; var_export($chunk); echo "</br></br>";
		$this->getSystem($chunk[sizeof($chunk)-1]["systemid"])->adjustLoad($chunk);

		return true;
	}

	public function addFireDB($fires){
		for ($i = 0; $i < sizeof($fires); $i++){
			//Debug::log("FIRE trying to add fire to unit #".$this->id.", system ".$fires[$i]->weaponid);
			$this->getSystem($fires[$i]->weaponid)->fireOrders[] = $fires[$i];
			//Debug::log("added");
			continue;
		}
	}

	public function addPowerDB($powers){
		for ($i = 0; $i < sizeof($powers); $i++){
			//if ($this->id == 15 && $powers[$i]->systemid == 14){Debug::log("adding");}
			//echo ($this->id.", ".get_class($this).", ".$powers[$i]->unitid."/".$powers[$i]->systemid);
			//echo ($powers[$i]->id);
			$this->getSystem($powers[$i]->systemid)->addPowerEntry($powers[$i]);
		}
	}

	public function addCritDB($crits){
		for ($i = 0; $i < sizeof($crits); $i++){
			$found = 0;

			for ($j = 0; $j < sizeof($this->primary->systems); $j++){
				if ($this->primary->systems[$j]->id == $crits[$i]->systemid){
					$this->primary->systems[$j]->crits[] = $crits[$i];
					$found = 1;
					break;
				}
			}

			if ($found){continue;}

			for ($j = 0; $j < sizeof($this->structures); $j++){
				for ($k = 0; $k < sizeof($this->structures[$j]->systems); $k++){
					if ($this->structures[$j]->systems[$k]->id == $crits[$i]->systemid){
						$this->structures[$j]->systems[$k]->crits[] = $crits[$i];
						$found = 1;
						break 2;
					}
				}
			}

			if (!$found){
				Debug::log("ERROR unable to apply ship crit id: ".$crits[$i]->id);
			}
		}

		//return true;
		$bridge = $this->getSystemByName("Command");
		for ($i = 0; $i < sizeof($bridge->crits); $i++){
			if ($bridge->crits[$i]->duration == 0){
				$bridge->crits[$i]->display = "Officer KIA";
			} else $bridge->crits[$i]->display = "Morale Check";
			$bridge->crits[$i]->display .= ": <span class='yellow'>".$bridge->crits[$i]->type." ".$bridge->crits[$i]->value."%</span> effect.";

			if ($bridge->crits[$i]->type == "Focus" || $bridge->crits[$i]->type == "Morale"){continue;}

			for ($j = 0; $j < sizeof($this->primary->systems); $j++){
				if ($this->primary->systems[$j]->name == $bridge->crits[$i]->type){
					$copy = clone $bridge->crits[$i];
					$copy->type = "Output";
					$copy->duration = -1;
					$this->primary->systems[$j]->crits[] = $copy;
					break;
				}
			}
		}

		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			for ($j = 0; $j < sizeof($this->primary->systems[$i]->crits); $j++){
				if ($this->primary->systems[$i]->crits[$j]->display != ""){continue;}
				$this->primary->systems[$i]->crits[$j]->display = "<span class='yellow'>".$this->primary->systems[$i]->display." ".$this->primary->systems[$i]->crits[$j]->value."%</span> effect."; 
			}
		}

		return true;
	}

	public function doDestroy(){
		//Debug::log("doDestroy!");
		$this->destroyed = 1;
	}

	public function addDamagesFromDB($dmgs){
		for ($i = 0; $i < sizeof($dmgs); $i++){
			$this->addTopDamages($dmgs[$i]);
		}
	}

	public function addTopDamages($dmg){
		//Debug::log("addTopDamages ".get_class($this).", id #".$dmg->id);

		if ($dmg->new){
			$dmg->hullDmg += $dmg->systemDmg;
			$dmg->systemDmg = 0;
		}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($dmg->systemid == $this->structures[$i]->id){
				//Debug::log("adding damage to id ".$this->structures[$i]->id);

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
	}

	public function doUnpowerAllSystems($turn){
		debug::log("doUnpowerAllSystems");
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				$this->structures[$i]->systems[$j]->doUnpower($turn);
			}
		}
	}

	public function doUncommandShip(){
		$this->disabled = 1;
		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			$this->primary->systems[$i]->locked = 1;
		}
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				$this->structures[$i]->systems[$j]->locked = 1;
			}
		}
	}

	public function getPowerReq(){
		$need = 0;
		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			$need += $this->primary->systems[$i]->powerReq;
		}
		for ($i = 0; $i < sizeof($this->structures); $i++){
			$need += $this->structures[$i]->powerReq;
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				$need += $this->structures[$i]->systems[$j]->powerReq;
			}
		}
		return $need;
	}

	public function getRemIntegrity($fire){
		//Debug::log("ship getRemIntegrity, rem: ".$this->primary->remaining);
		$total = $this->primary->integrity;
		for ($i = 0; $i < sizeof($this->primary->damages); $i++){
			$total = $total - $this->primary->damages[$i]->systemDmg;
		}
		//Debug::log("total: ".$total);
		return $total;
	}

	public function isDestroyed(){
		//Debug::log("isDestroyed() ".get_class($this));
		//Debug::trace();
		$kill = 0;
		if ($this->destroyed){return true;}
		if ($this->primary->isDestroyed()){
			$kill = 1;
		}
		else if ($this->getSystemByName("Reactor")->destroyed){
			$kill = 1;
		}
		else if ($this->getSystemByName("Command")->destroyed){
			$kill = 1;
		}

		if ($kill){
			//Debug::log("destroying");
			$this->destroyed = 1;
			$this->status = "destroyed";
			return true;
		}

		return false;
	}

	public function triggersMoraleChange($turn, $phase){
		Debug::log("triggersMoraleChange #".$this->id.", $turn/$phase, withdraw: ".$this->withdraw);
		if ($phase == 2){
			if ($this->destroyed){
				return true;
			}
			else if ($this->withdraw == $turn + GD::$jumpTimer){
				return true;
			}
		}
		else if ($phase == -1){
			if ($this->isReinforcing($turn, $phase)){
				return true;
			}
		}
		return false;
	}

	public function triggersFleetMoraleTest($turn, $phase){
		Debug::log("triggersFleetMoraleTest #".$this->id.", $turn/$phase, withdraw: ".$this->withdraw.", manual: ".$this->manual);
		
		if ($this->destroyed){
			return true;
		}
		else if ($this->withdraw == $turn + GD::$jumpTimer && !$this->manual){
			return true;
		}
		return false;
	}

	public function getUnitMoraleChangeType($turn, $phase){
		if ($this->destroyed){
			return "destroyed";
		}
		else if ($this->isReinforcing($turn, $phase)){
			return "reinforcing";
		}
		else if ($this->manual){
			return "withdrawn";
		}
		else return "routed";
	}

	public function getMoraleChangeValue($turn, $phase){
		$multi = 0;

		if ($this->destroyed){
			$multi = -100;
		}
		else if ($this->isReinforcing($turn, $phase)){
			$multi = 50;
		}
		else if ($this->manual){
			$multi = -50;
		}
		else $multi = -75;
		
		//Debug::log("getMoraleChangeValue ".$this->id.", multi ".$multi);
		return $this->moraleCost / 100  * $multi;
	}

	public function isReinforcing($turn, $phase){
		//Debug::log("isReinforcing! turn: ".$turn);
		if ($phase == -1 && $this->available > 1 && $this->available == $turn){
			//Debug::log($this->id.": yes!");
			return true;
		} return false;
	}

	public function isCloseCombat($id){
		for ($i = 0; $i < sizeof($this->cc); $i++){
			if ($this->cc[$i] == $id){
				//Debug::log("close combat! ".$this->id."/".$fire->shooterid);
				return true;
			}
		}
		return false;
	}

	public function resolveFireOrder($fire){ // target
		if ($this->destroyed){
			//Debug::log("STOP - resolveFireOrder #".$fire->id.", TARGET: ".get_class($this)." destroyed");
			for ($i = 0; $i < $fire->shots; $i++){
				$fire->rolls[] = 999;
			}
		}
		else if ($fire->weapon->aoe){
			Debug::log("resolveFireOrder AREA - #".$fire->id.", TARGET ".get_class($this)." #".$fire->targetid.", w: ".get_class($fire->weapon)." #".$fire->weaponid);

			$fire->section = $this->getFacingSection($fire);
			DmgCalc::doDmg($fire, 0, $this->getHitSystem($fire));

		}
		else {
			$this->doRollShots($fire);

			if ($fire->shooter->obstacle){
				Debug::log("resolveFireOrder OBSTACLE - #".$fire->id.", shooter: ".get_class($fire->shooter)." #".$fire->shooterid." vs ".get_class($this)." #".$fire->targetid.", w: ".get_class($fire->weapon)." #".$fire->weaponid.", shots: ".$fire->shots.", type: ".$fire->weapon->dmgType);

				$this->determineObstacleHits($fire);
			}
			else {
				Debug::log("resolveFireOrder STOCK - #".$fire->id.", shooter: ".get_class($fire->shooter)." #".$fire->shooterid." vs ".get_class($this)." #".$fire->targetid.", w: ".get_class($fire->weapon)." #".$fire->weaponid.", shots: ".$fire->shots.", type: ".$fire->weapon->dmgType);

				$fire->cc = $this->isCloseCombat($fire->shooter->id);
				$fire->dist = $this->getHitDist($fire);
				$fire->angle = $this->getIncomingFireAngle($fire);

				$this->determineHits($fire);
			}
		}

		if (sizeof($fire->rolls)){
			$fire->notes .= implode(";", $fire->rolls).";";
		}
		$fire->resolved = 1;
	}

	public function getTurretHitChances(){
		$total = 0;

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->turret || $this->structures[$i]->destroyed){continue;}
			$total += $this->structures[$i]->getSubHitChance();
		}
		return $total;
	}

	public function getTurretHitSystem($fire, $total){
		//Debug::log("getTurretHitSystem, total ".$total);
		$current = 0;
		$roll = mt_rand(0, $total);

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->turret || $this->structures[$i]->destroyed){continue;}
			$current += $this->structures[$i]->getSubHitChance();

			if ($roll <= $current){
				return $this->structures[$i];
			}
		}
		Debug::log("ERROR getTurretHitSystem()");
	}

	public function doRollShots($fire){
		//Debug::log("doRollShots ".$fire->shots);
		for ($i = 0; $i < $fire->shots; $i++){
			$roll = mt_rand(1, 100);
			$fire->rolls[] = $roll;
		}
	}

	public function determineObstacleHits($fire){
		//Debug::log("determineObstacleHits ".get_class($this).", req: ".$fire->req);

		for ($i = 0; $i < sizeof($fire->rolls); $i++){
			//Debug::log("roll ".$fire->rolls[$i]);
			if ($this->destroyed){$fire->cancelShotResolution($i); return;}
			else if ($fire->rolls[$i] <= $fire->req){
				$fire->section = $this->getFacingSection($fire);
				$fire->hits++;
				DmgCalc::doDmg($fire, $i, $this->getHitSystem($fire));
			}
		}
	}

	public function determineHits($fire){
		//Debug::log("determineHits ".get_class($this));
		$fire->req = $fire->shooter->calculateToHit($fire);

		for ($i = 0; $i < sizeof($fire->rolls); $i++){
			if ($this->destroyed){$fire->cancelShotResolution($i); return;}

			if ($fire->rolls[$i] <= $fire->req){
				if ($this->didPassDefenses($fire, $i, $this)){
					$fire->section = $this->getFacingSection($fire);
					$fire->hits++;
					DmgCalc::doDmg($fire, $i, $this->getHitSystem($fire));
				}
			}
		}
	}

	public function didPassDefenses($fire, $shot, &$target){
		//return true;
		if ($fire->shooter->obstacle){return true;}
		if ($fire->shooter->flight){return true;}

		for ($i = 0; $i < sizeof($this->blocks); $i++){
			if ($this->blocks[$i][0] == $fire->shooterid){
				Debug::log("active obstacle found: ".$this->blocks[$i][0].", worth ".$this->blocks[$i][1]);
				$roll = mt_rand(1, 100);
				if ($roll <= $this->blocks[$i][1]){
					Debug::log("failed obstacle roll ".$roll);
					$fire->rolls[$shot] -= 100;
					return false;
				}
			}
		}

		if ($target->jamming){
			Debug::log("active jam ".$target->jamming);
			$roll = mt_rand(1, 100);
			if ($roll <= $target->jamming){
				Debug::log("failed jamming roll ".$roll);
				$fire->rolls[$shot] -= 200;
				return false;
			}
		}

		return true;
	}

	public function calculateToHit($fire){ // shooter
		//Debug::log("calculateToHit");
		$multi = 1;
		$req = 0;
		
		$base = $fire->target->getHitChance($fire);
		$tracking = 1-($fire->weapon->getTrackingMod($fire) * 0.2);
		$range = $fire->cc ? 0 : $fire->weapon->getAccuracyLoss($fire);

		$multi += $this->getOffensiveBonus($fire->target->id); //Debug::log($multi);
		$multi -= $this->flight ? 0: $fire->target->getDefensiveBonus($this->id); //Debug::log($multi);
		$multi += $this->flight ? 0 : $fire->target->getImpulseProfileMod($fire); //Debug::log($multi);

		$req = $base * $multi * $tracking - $range;
		//Debug::log("CALCULATE TO HIT - angle: ".$fire->angle.", base: ".$base.", trav: ".$tracking.", total multi: ".$multi.", dist/range: ".$fire->dist."/".$range.", req: ".$req);

		return round($req);
	}

	public function getOverkillSystem($fire){
		if (!$this->ship || $fire->weapon->fireMode == "Shockwave"){return false;}
		return true;
	}

	public function getFlashTargets($fire){
		$valid = array();
		for ($i = 0; $i < sizeof($fire->section->systems); $i++){
			if ($fire->section->systems[$i]->destroyed){continue;}
			$valid[] = $fire->section->systems[$i];
		}
		return $valid;
	}

	public function getFlashOverkillSystem($fire){
		$valid = array();
		for ($i = 0; $i < sizeof($fire->section->systems); $i++){
			if ($fire->section->systems[$i]->destroyed){continue;}
			$valid[] = $fire->section->systems[$i];
		}

		if (!sizeof($valid)){return $this->primary;}
		return $valid[mt_rand(0, sizeof($valid)-1)];
	}

	public function getHitSystem($fire){
		//return $this->getSystemByName("Command");
		//return $this->getPrimaryHitSystem();

		//Debug::log("getHitSystem on ".get_class($this).", section: ".$fire->section->id);

		$roll;
		$current = 0;
		$primary = $this->primary->getTotalHitChance();
		$section = $fire->section->getTotalHitChance();
		$turrets = $this->getTurretHitChances();

		$total = $primary;
		//Debug::log("added primary ".$total);
		$total += $section;
		//Debug::log("added section ".$total);
		$total += $turrets;
		//Debug::log("added all turrets ".$total);

		$roll = mt_rand(0, $total);
		//Debug::log("roll: ".$roll);
		$current += $primary;
		if ($roll <= $current){
			//Debug::log($roll.", get primary system");
			return $this->primary->getSubHitSystem();
		}
		$current += $turrets;
		if ($turrets && $roll <= $current){
			return $this->getTurretHitSystem($fire, $turrets);
		}

		return $fire->section->getSubHitSystem($roll, $current);
		Debug::log("ERROR getHitSystem()");
	}

	public function getHitChance($fire){
		$angle = $fire->angle;

		while ($angle > 90){
			$angle -= 180;
		}
		if ($angle < 0){
			$angle *= -1;
		}
	
		$base = $this->getBaseHitChance();
		$a = $base * $this->profile[0];
		$b = $base * $this->profile[1];
		$sub = ((90 - $angle) * $a) + (($angle - 0) * $b);
		$sub /= (90 - 0);

		return $sub;
	}

	public function getBaseHitChance(){
		return $this->baseHitChance;
	}

	public function getSensorSizeRating(){
		return ($this->traverse-4);
		return ($this->faction == "Minbari Federation" ? $this->traverse-1 : $this->traverse-4);
	}

	public function getLockEffect($target){
		if ($target->ship || $target->squad){
			return 0.5 + (0.06 * ($this->getSensorSizeRating()));
		}
		else if ($target->flight){
			return 1;
		}
		else if ($target->salvo){
			return 3;
		}
	}

	public function getMaskEffect($target){
		if ($target->ship || $target->squad){
			return 0.5 + (0.06 * ($this->getSensorSizeRating()));
		}
		else if ($target->flight){
			return 0;
		}
		else if ($target->salvo){
			return 0;
			return 0.5;
		}
	}
	public function setImpulseProfileMod(){
		//Debug::log("setImpulseProfileMod #".$this->id);
		$now = $this->getCurSpeed();
		$base = $this->getBaseImpulse();
 		//	Debug::log($now); Debug::log($base);
		$ratio = $now/$base;
		if ($ratio != 1){
			$this->impulseHitMod =  (1-$ratio)/2;
		}

		//Debug::log("impuleMod ".$this->impulseHitMod);
		return;

		//return 1+((($this->getBaseImpulse() / $this->getCurSpeed())-1)/2);
	}

	public function getImpulseProfileMod(){
		return $this->impulseHitMod;
	}

	public function setJamming($turn){
		$jammer = $this->getSystemByName("Jammer");

		if (!$jammer || $jammer->destroyed || $jammer->disabled){
			$this->jamming = 0;
		} else $this->jamming = $jammer->getOutput($turn);// Debug::log("jamming ".$this->jamming);
	}

	public function getOffensiveBonus($id){
		for ($i = 0; $i < sizeof($this->locks); $i++){
			if ($this->locks[$i][0] == $id){
				return $this->locks[$i][1];
			}
		} return 0;
	}	

	public function getDefensiveBonus($id){
		for ($i = 0; $i < sizeof($this->masks); $i++){
			if ($this->masks[$i][0] == $id){
				return $this->masks[$i][1];
			}
		} return 0;
	}

	public function getTurnStartPosition(){
		if ($this->available == Manager::$turn){

		}
		return new Point($this->x, $this->y);
	}

	public function getCurPos(){
		for ($i = sizeof($this->actions)-1; $i >= 0; $i--){
			if ($this->actions[$i]->resolved == 1){
				return new Point($this->actions[$i]->x, $this->actions[$i]->y);
			}
		}
		return new Point($this->x, $this->y);
	}
	
	public function getHeading(){
		return $this->heading;
	}

	public function setHeadingAndFacing(){
		for ($i = 0; $i < sizeof($this->actions); $i++){
			$this->heading += $this->actions[$i]->h;
			$this->facing += $this->actions[$i]->f;
		}

		if ($this->heading > 360){
			$this->heading -= 360;
		} else if ($this->heading < 0){
			$this->heading += 360;
		}

		if ($this->facing > 360){
			$this->facing -= 360;
		} else if ($this->facing < 0){
			$this->facing += 360;
		}
		
		//Debug::log("setting setHeadingAndFacing for: #".$this->id.": ".$this->heading.", facing: ".$this->facing);
	}

	public function getHitDist($fire){
		if ($fire->cc){
			return 0;
		}
		
		for ($i = 0; $i < sizeof($this->distances); $i++){
			if ($this->distances[$i][0] == $fire->shooter->id){
				return $this->distances[$i][1];
			}
		}

		Debug::log("ERROR got no DIST set on ".$this->id." targeted by #".$fire->shooter->id);
		
		$tPos = $this->getCurPos();
		$sPos = $fire->shooter->getCurPos();
		return Math::getDist($tPos, $sPos);
	}

	public function getIncomingFireAngle($fire){
		if ($fire->cc){return $fire->shooter->getFireAngle($fire);}
		
		for ($i = 0; $i < sizeof($this->angles); $i++){
			if ($this->angles[$i][0] == $fire->shooter->id){
				//Debug::log("shooter ".$fire->shooter->id." vs ".$fire->target->id.", angle: ".$this->angles[$i][1]);
				return $this->angles[$i][1];
			}
		}

		Debug::log("got no ANGLE set on ".$this->id." targeted by #".$fire->shooter->id);
	}

	public function getFacingSection($fire){
		$angle = Math::addAngle($this->facing, $this->getIncomingFireAngle($fire));
		if ($this->rolled){$fire->angle = Math::getMirrorAngle($fire->angle);}

		$locs = array();
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->turret || $this->structures[$i]->destroyed){continue;}
			if (Math::isInArc($angle, $this->structures[$i]->start, $this->structures[$i]->end)){
				$locs[] = $this->structures[$i];
			}
		}

		//Debug::log("fire #".$fire->id.", possible: ".sizeof($locs));
		return $locs[mt_rand(0, sizeof($locs)-1)];
	}

	public function getActualHeading(){
		$facing = $this->heading;
		for ($i = 0; $i < sizeof($this->actions); $i++){
			$facing += $this->actions[$i]->h;
		}
		return $facing;
	}

	public function getActualFacing(){
		$angle = $this->heading;
		for ($i = 0; $i < sizeof($this->actions); $i++){
			$facing += $this->actions[$i]->h;
			$facing += $this->actions[$i]->f;
		}
		return $facing;
	}

	public function getRelDmg($turn){
		//Debug::log("getRelDmg on SHIP #".$this->id."/".get_class($this));
		return new RelDmg($this->primary->newDmg, $this->primary->integrity-$this->primary->remaining-$this->primary->newDmg, $this->primary->integrity, 0);
	}

	public function doTestMorale($turn){
		$dmg = $this->getRelDmg($turn);
		//Debug::log("doTestMorale ".get_class($this)."# ".$this->id." remMorale: ".$this->morale->rem." #".$this->id.", newRel: ".$dmg->rel);

		if (!$dmg->rel){return;}
		$crit = DmgCalc::moraleCritProcedure($this->id, 2, $turn, $dmg->rel, $this->critEffects, 100 - $this->morale->rem);
		if (!$crit){return;}

		$this->notes = $crit->notes;
		if ($crit->type == "Rout"){
			$this->actions[] = new Move(-1, $this->id, $turn, "jumpOut", 1, 0, $this->x, $this->y, 0, 0, 0, 0, 1, 1, 1);
			$this->withdraw = $turn + GD::$jumpTimer;
		}
		else $this->getSystemByName("Command")->crits[] = $crit;
	}

	public function addSystem($obj){
		$obj->id = sizeof($this->systems)+1;
		$obj->parentid = $this->id;

		$this->systems[] = $obj;
	}

	public function getStruct($id){
		//Debug::log("getStruct looking for: ".$id);
		for ($i = 0; $i < sizeof($this->structures); $i++){;
			if ($this->structures[$i]->id == $id){
				return $this->structures[$i];
			}
		}
	}

	public function getSystem($id){
		//if ($id == 14){Debug::log("ship getSystem looking for: ".$id);}
		if ($id == 1){return $this->primary;}
		else {
			for ($i = 0; $i < sizeof($this->primary->systems); $i++){
				if ($this->primary->systems[$i]->id == $id){
					return $this->primary->systems[$i];
				}
			}
			for ($i = 0; $i < sizeof($this->structures); $i++){
				if ($this->structures[$i]->id == $id){
					return $this->structures[$i];
				}
				for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
					if ($this->structures[$i]->systems[$j]->id == $id){
						//if ($id == 14){Debug::log("ding");}
						return $this->structures[$i]->systems[$j]->getActiveSystem();
					}
				}
			}
		}
		Debug::log("ERROR ship getSystem: ".$id." on unit #".$this->id."/".$this->display);
	}

	public function getSystemByName($name){

		if (!$this->primary->systems[0]){
			Debug::log($this->name."/".$name);
		}
		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			if ($this->primary->systems[$i]->name == $name){
				return $this->primary->systems[$i];
			}
		}

		if (!$this->ship){return false;}
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				if ($this->structures[$i]->systems[$j]->name == $name){
					return $this->structures[$i]->systems[$j];
				}
			}
		}
	}

	public function getInternals(){
		$sum = 0;
		foreach ($this->primary->systems as $system){
			$sum += $system->integrity;
		}
		return $sum;
	}

	public function getWeapons(){
		$mass = 0;

		for ($j = 0; $j < sizeof($this->structures); $j++){
			for ($k = 0; $k < sizeof($this->structures[$j]->systems); $k++){
				if (is_a($this->structures[$j]->systems[$k], "Hangar")){
					continue;
				}
				$mass += $this->structures[$j]->systems[$k]->mass;
			}
		}
		return $mass;
	}

	public function getArmourLog(){
		$data = array(
			"integrity" => 0,
			"negation" => array()
		);

		$total = 0;

		foreach ($this->structures as $struct){
			$data["integrity"] += $struct->integrity;
			$data["negation"][] = $struct->negation;
		}
		return $data;
	}

	public function getStructure(){
		return $this->primary->integrity;
	}

	public function getEffEP(){
		for ($j = 0; $j < sizeof($this->primary->systems); $j++){
			if ($this->primary->systems[$j]->name == "Engine"){
				return $this->primary->systems[$j]->output;
			}
		}
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

		for ($j = 0; $j < sizeof($this->structures); $j++){
			for ($k = 0; $k < sizeof($this->structures[$j]->systems); $k++){
				for ($l = 0; $l < sizeof($this->structures[$j]->systems[$k]->crits); $l++){
					if ($this->structures[$j]->systems[$k]->crits[$l]->new){
						$crits[] = $this->structures[$j]->systems[$k]->crits[$l];
					}// else break;
				}
			}
		}
		return $crits;
	}

	public function getNewForcedMoves($turn){
		$moves = array();
		for ($i = 0; $i < sizeof($this->actions); $i++){
			if ($this->actions[$i]->new && $this->actions[$i]->forced){$moves[] = $this->actions[$i];}
		}
		return $moves;
	}

	public function getNewDamages($turn){
		$dmgs = array();

		if ($this->primary->damages){
			for ($i = 0; $i < sizeof($this->primary->damages); $i++){
				if ($this->primary->damages[$i]->new){
					$dmgs[] = $this->primary->damages[$i];
				}
			}
		}
		
		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			for ($j = 0; $j < sizeof($this->primary->systems[$i]->damages); $j++){
				if ($this->primary->systems[$i]->damages[$j]->new){
					$dmgs[] = $this->primary->systems[$i]->damages[$j];
				}
			}
		}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->damages); $j++){
				if ($this->structures[$i]->damages[$j]->new){
					$dmgs[] = $this->structures[$i]->damages[$j];
				}
			}
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				for ($k = 0; $k < sizeof($this->structures[$i]->systems[$j]->damages); $k++){
					if ($this->structures[$i]->systems[$j]->damages[$k]->new){
						$dmgs[] = $this->structures[$i]->systems[$j]->damages[$k];
					}
				}
			}
		}
		return $dmgs;
	}

	public function getLockMultiplier(){
		return 0.5;
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
			"upgrades" => array()
		);
	}

	public function setBonusNegation($turn){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->setBonusNegation($turn);
		}
	}

	public function addSubUnits($elements){
		return;
	}

	public function addMission($data, $userid, $turn, $phase){
		return;
	}
	
	public function getFocusCost(){
		return $this->moraleCost;
	}

	public function doTestCrits($turn){
		//Debug::log("__doTestCrits for ".$this->name.", #".$this->id.", turn: ".$turn);

		if (1){

			if ($this->primary->emDmg){
				Debug::log("primary EM dmg ".$this->primary->emDmg);
			}

			for ($i = 0; $i < sizeof($this->primary->systems); $i++){
				if ($this->primary->systems[$i]->destroyed){continue;}
				$dmg = $this->primary->systems[$i]->getRelDmg($turn);
				if ($dmg->new){$this->primary->systems[$i]->determineCrit($dmg, $turn, 0);}
			}

			$potential = array();
			for ($i = 0; $i < sizeof($this->structures); $i++){
				$this->structures[$i]->handleStructCrits($turn);
				$potential = array_merge($potential, $this->structures[$i]->overloads);
			}

			if (sizeof($potential) || array_sum($potential) || $this->primary->emDmg){
				for ($j = 0; $j < sizeof($this->primary->systems); $j++){
					if ($this->primary->systems[$j]->name == "Reactor"){
						$this->primary->systems[$j]->applyPowerSpike($turn, $potential, $this->primary->emDmg);
						return;
					}
				}
			}
		}
	}
}

class Medium extends Ship {
	public $baseImpulse = 165;
	public $traverse = 4;
	public $baseFocusRate = 10;
	static $odds = 10;

	function __construct($data){
		parent::__construct($data);
	}

	public function addTopDamages($dmg){
		//Debug::log("addDamage ".get_class($this).", id ".$dmg->id.", target ".$dmg->systemid);

		$this->primary->addDamage($dmg);

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($dmg->structureid == $this->structures[$i]->id){
				$this->structures[$i]->armourDmg += $dmg->armourDmg;

				if ($dmg->systemid == 1){break;}

				if ($this->structures[$i]->id == $dmg->structureid){
					if ($this->structures[$i]->turret){
						$this->structures[$i]->addDamage($dmg);	break; 
					}

					for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
						if ($this->structures[$i]->systems[$j]->id == $dmg->systemid){
							$this->structures[$i]->systems[$j]->addDamage($dmg); break 2;
						}
					}
				}

				for ($j = 0; $j < sizeof($this->primary->systems); $j++){
					if ($this->primary->systems[$j]->id == $dmg->systemid){
						$this->primary->systems[$j]->addDamage($dmg); break 2;
					}
				}
			}
		}

		if ($this->primary->isDestroyed()){
			//Debug::log("isDestroyed()!");
			$this->destroyed = 1;
		}
	}
}

class Heavy extends Medium {
	public $baseImpulse = 155;
	public $traverse = 5;
	public $baseFocusRate = 11;
	static $odds = 7;
	
	function __construct($data = false){
        parent::__construct($data);
	}
}

class SuperHeavy extends Heavy {
	public $baseImpulse = 140;
	public $traverse = 6;
	public $baseFocusRate = 12;
	static $odds = 4;
	
	function __construct($data = false){
        parent::__construct($data);
	}
}

class UltraHeavy extends SuperHeavy {
	public $baseImpulse = 130;
	public $traverse = 7;
	public $baseFocusRate = 13;
	static $odds = 2;
	
	function __construct($data = false){
        parent::__construct($data);
	}
}

?>
