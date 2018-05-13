<?php

	class Manager {
		public $userid;
		public $gameid;

		public $name;
		public $status;
		public $turn;
		public $phase;
		public $pv;
		public $reinforce;

		public $index = 0;
		public $faction = "";
		public $value = 0;
		public $wave = 0;

		public $units = array();
		public $ballistics = array();
		public $gd = array();
		public $fires = array();
		public $playerstatus = array();
		public $reinforcements = array();
		public $rdyReinforcements = array();
		public $deploys = array();
		public $incoming = array();
		public $userindex = 0;
		public $flights = array();

		public $weapons = array();

		public $const = array(
			"ew" => array(
				"p" => 1.5,
				"len" => 10,
				"effect" => array(0 => 0.5, 1 => 0.5, 2 => 0.25),
			),
		);

		function __construct($gameid = 0, $userid = 0){
			//Debug::log("__construct ".$gameid."/".$userid);
			//Debug::trace();
			//Debug::trace();
			//$this->getMemory();
			$this->userid = $userid;
			$this->gameid = $gameid;

			if ($this->gameid){
				$this->getGeneralData();
				$this->setUserIndex();
			}
		}


	public function doEval(){
		//$this->testMorale();
		//$this->handleResolvedFireData();
		return;
	}

	public function getClientData(){

		/*foreach ($this->playerstatus as $player){
			foreach ($player as $key => $value){
				Debug::log($key.": ".$value);
			}
		}*/
		Debug::close();

		//var_export($this->getUnit(2)->getEndState(1));
		//return;
		return array(
			"id" => $this->gameid,
			"name" => $this->name,
			"status" => $this->status,
			"turn" => $this->turn,
			"phase" => $this->phase,
			"ships" => $this->getShipData(),
			"reinforcements" => $this->rdyReinforcements,
			"incoming" =>$this->getIncomingData(),
			"const" => $this->const,
			"userid" => $this->userid,
			"username" => $this->getUsername(),
			"wave" => $this->wave,
			"playerstatus" => $this->getPlayerStatus()
		);

	}

	public function getPlayerStatus(){
		return $this->playerstatus;
	}

	public function getMemory(){
		$size = memory_get_usage(true);
	    $unit=array('b','kb','mb','gb','tb','pb');
	    Debug::log(@round($size/pow(1024,($i=floor(log($size,1024)))),2).' '.$unit[$i]);
	}
	
	public function getUsername(){
		$name = DBManager::app()->getUsername($this->userid);
		
		if ($name){
			return $name;
		}
	}
	
	public function getOpenGames(){
		$list = DBManager::app()->getOpenGames($this->userid);
		if ($list){
			return $list;
		}
		else {
			return null;
		}
	}

	public function getGeneralData(){
		//Debug::log("getGeneralData for game ".$this->gameid);
		$gd = DBManager::app()->getGameDetails($this->gameid);

		$this->name = $gd["name"];
		$this->pv = $gd["pv"];
		$this->reinforce = $gd["reinforce"];
		$this->status = $gd["status"];
		$this->turn = $gd["turn"];
		$GLOBALS["turn"] = $gd["turn"];
		$this->phase = $gd["phase"];
		$this->wave = $gd["reinforceTurn"];
		$this->playerstatus = DBManager::app()->getPlayerStatus($this->gameid);

		$this->weapons = DmgCalc::setWeaponPriority();
	}

	public function verifyFleetCost($units){
		$used = 0;

		for ($i = 0; $i < sizeof($units); $i++){
			$used = $used + $units[$i]["value"];
		}

		$avail = $this->pv;

		if ($used <= $avail){
			return $avail - $used;
		}
		return 0;
	}

	public function getGameData(){
		//Debug::log("getGameData for: ".$this->gameid.", for user: ".$this->userid);
		$db = DBManager::app();

		$this->setReinforceStatus();
		$this->fires = $db->getUnresolvedFireOrders($this->gameid, $this->turn);

		//Debug::log(sizeof($this->fires)." unresolved fires");

		$this->ships = $this->assembleUnits();
		$this->setCC();

		$this->reinforcements = $db->getAllReinforcements($this->gameid, $this->userid);
		$this->rdyReinforcements = $this->readyReinforcements();
		//$this->deploys = $db->getDeployArea($this->gameid, $this->turn);
		$this->incoming = $db->getIncomingShips($this->gameid, $this->turn);
	}

	public function setUserIndex(){
		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			if ($this->playerstatus[$i]["userid"] == $this->userid){
				$this->userindex = $i % 2;
			}
		}
	}

	public function getBaseFacing(){
		return 0 + (180 * ($this->userindex % 2));
	}

	public function setReinforceStatus(){
		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			if ($this->playerstatus[$i]["userid"] == $this->userid){
				$this->faction = $this->playerstatus[$i]["faction"];
				$this->value = $this->playerstatus[$i]["value"];
				break;
			}
		}
	}

	public function getShipData(){
		if ($this->turn == 1 && $this->phase == -1){return $this->ships;}

		for ($i = sizeof($this->ships)-1; $i >= 0; $i--){
			if ($this->ships[$i]->userid != $this->userid){
				if ($this->phase == 3){$this->ships[$i]->move = 0;}

				if ($this->ships[$i]->available == $this->turn && !$this->ships[$i]->actions[0]->resolved){
					if ($this->ships[$i]->flight){
						array_splice($this->ships, $i, 1);
					}
					else if ($this->turn > 1 && $this->phase == -1){
						$this->shiftToIncoming($this->ships[$i]);
						array_splice($this->ships, $i, 1);
					}
				}
			}
		}

		switch ($this->phase){
			case -1: 
				for ($i = 0; $i < sizeof($this->ships); $i++){
					if ($this->ships[$i]->userid == $this->userid){continue;}
					$this->ships[$i]->hidePowers($this->turn);
					$this->ships[$i]->hideFireOrders($this->turn, $this->phase);
				} break;
			case 0: 
				for ($i = 0; $i < sizeof($this->ships); $i++){
					if ($this->ships[$i]->userid == $this->userid){continue;}
					$this->ships[$i]->hideActions($this->phase);
				} break;
			case 1: 
				for ($i = 0; $i < sizeof($this->ships); $i++){
					if ($this->ships[$i]->userid == $this->userid){continue;}
					$this->ships[$i]->hideActions($this->phase);
				} break;
			case 2:
				for ($i = 0; $i < sizeof($this->ships); $i++){
					if ($this->ships[$i]->userid == $this->userid){continue;}
					$this->ships[$i]->hideFireOrders($this->turn, $this->phase);
				} break;
			default: break;
		}

		return $this->ships;
	}

	public function shiftToIncoming($unit){
		$this->incoming[] = array(
			"id" => $unit->id, "userid" => $unit->userid, "available" => $unit->available, "name" => $unit->name,
				"x" => $unit->actions[0]->x, "y" => $unit->actions[0]->y, "a" => $unit->actions[0]->a
		);
	}

	public function getIncomingData(){
		//Debug::log(sizeof($this->incoming));
		for ($i = sizeof($this->incoming)-1; $i >= 0; $i--){
			if ($this->incoming[$i]["userid"] != $this->userid){
				if ($this->incoming[$i]["available"] > $this->turn + 1){
					array_splice($this->incoming, $i, 1);
				}
			}
		}

		for ($i = sizeof($this->incoming)-1; $i >= 0; $i--){
			$this->incoming[$i]["actions"] = array(array("x" => $this->incoming[$i]["x"], "y" => $this->incoming[$i]["y"], "a" => $this->incoming[$i]["a"]));

		}	
		return $this->incoming;	
	}

	public function createGame($name){
		if (DBManager::app()->createGame($this->userid, $name)){
			return true;
		}
	}

	public function readyReinforcements(){
		//Debug::log("readyReinforcements s".sizeof($this->reinforcements));
		$data = array();

		for ($i = 0; $i < sizeof($this->reinforcements); $i++){
			if ($this->reinforcements[$i]["userid"] == $this->userid){
				$unit = new $this->reinforcements[$i]["name"](
					array(
					"id" => -$this->reinforcements[$i]["id"],
					"userid" => $this->reinforcements[$i]["userid"],
					"available" => $this->turn + $this->reinforcements[$i]["available"],
					"display" => $this->reinforcements[$i]["display"],
					"status" => $this->reinforcements[$i]["status"],
					"destroyed" => $this->reinforcements[$i]["destroyed"],
					"x" => $this->reinforcements[$i]["x"],
					"y" => $this->reinforcements[$i]["y"],
					"facing" => 0,
					"delay" => $this->reinforcements[$i]["delay"],
					"thrust" => $this->reinforcements[$i]["thrust"],
					"rolling" => $this->reinforcements[$i]["rolling"],
					"rolled" => $this->reinforcements[$i]["rolled"],
					"flipped" => $this->reinforcements[$i]["flipped"],
					"focus" => $this->reinforcements[$i]["focus"],
					"notes" => $this->reinforcements[$i]["notes"]
					)
				);

				$unit->addAllSystems();
				if (!$unit->ship){$unit->addSubUnits($this->reinforcements[$i]["subunits"]);}

				$unit->setPreviewState($this->turn, $this->phase);	
				$unit->cost = $this->reinforcements[$i]["facing"];
				$data[] = $unit;
			}
		}

		for ($i = 0; $i < sizeof($data); $i++){$data[$i]->id *= -1;}
		DBManager::app()->getShipLoad($data);
		for ($i = 0; $i < sizeof($data); $i++){$data[$i]->id *= -1;}

		return $data;
	}

	public function assembleUnits(){
		//Debug::log("assembleUnits");
		$db =  DBManager::app()->getActiveUnits($this->gameid, $this->turn); 
		$units = array();

		for ($i = 0; $i < sizeof($db); $i++){
			$unit = new $db[$i]["name"]($db[$i]);
			$unit->addAllSystems();

			if (isset($db[$i]["subunits"])){$unit->addSubUnits($db[$i]["subunits"]);}
			if (isset($db[$i]["mission"])){$unit->addMission($db[$i]["mission"], $this->userid, $this->turn, $this->phase);}

			$units[] = $unit;
		}

		DBManager::app()->getDamages($units);
		DBManager::app()->getPowers($units);
		DBManager::app()->getCrits($units);
		DBManager::app()->getFires($units);
		DBManager::app()->getActions($units, $this->turn);
		DBManager::app()->getEW($units, $this->turn);
		DBManager::app()->getShipLoad($units);

		for ($i = 0; $i < sizeof($units); $i++){
			$units[$i]->setUnitState($this->turn, $this->phase);
		}

		return $units;
	}

	public function setCC(){
		if ($this->turn == 1){return;}

		for ($i = 0; $i < sizeof($this->ships); $i++){
			$a = $this->ships[$i]->getCurPos();
			for ($j = $i+1; $j < sizeof($this->ships); $j++){
				if ($this->ships[$i]->id != $this->ships[$j]->id){
					$b = $this->ships[$j]->getCurPos();
					if ($a->x == $b->x && $a->y == $b->y){
						$this->ships[$i]->cc[] = $this->ships[$j]->id;
						$this->ships[$j]->cc[] = $this->ships[$i]->id;
					}
				}
			}
		}
	}

	public function canAdvance($gamedata){
		//return false;
		if ($gamedata["status"] == "closed" || $gamedata["status"] == "open"){return false;}

		$this->playerstatus = DBManager::app()->getPlayerStatus($gamedata["id"]);

		if (sizeof($this->playerstatus) >= 2){
			for ($i = 0; $i < sizeof($this->playerstatus); $i++){
				if ($this->playerstatus[$i]["status"] == "waiting"){
					return false;
				}
			}
		}

		return true;
	}

	public function prepareAdvance($gameid){
		Debug::log("prepareAdvance");
		$this->gameid = $gameid;
		$this->getGeneralData();
		$this->getGameData();
	}


	public function doAdvance(){
		Debug::log("********************* doAdvance for game".$this->gameid." from phase ".$this->phase." to phase ".($this->phase+1));
		//return;
		$time = -microtime(true);

		if ($this->phase == -1){
			$this->handleDeployPhase();
			$this->startMovementPhase();
		}
		else if ($this->phase == 0){
			$this->handleBaseMovementPhase();
			if ($this->hasFocusUnits()){
				$this->startCommandMovePhase();
			}
			else {
				$this->handleCommandMovementPhase();
				$this->startFiringPhase();
			}
		}
		else if ($this->phase == 1){
			$this->handleCommandMovementPhase();
			$this->startFiringPhase();
		}
		else if ($this->phase == 2){
			$this->handleFiringPhase();
			$this->startDamageControlPhase();
		}
		else if ($this->phase == 3){
			$this->handleDamageControlPhase();
			$this->endTurn();
			$this->startNewTurn();
			$this->startDeployPhase();
		}

		$time += microtime(true); 
		Debug::log("TIME: ".round($time, 3)." seconds.");
		$this->getMemory();
		//	Debug::close();
		return true;
	}

	public function hasFocusUnits(){
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->focus){return true;}
		}
		return false;
	}

	public function updatePlayerStatus($status){
		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			DBManager::app()->setPlayerstatus($this->playerstatus[$i]["userid"], $this->gameid, $this->turn, $this->phase, $status);
		}
	}

	public function deleteAllReinforcements(){
		if ($this->turn != $this->wave){return;}
		Debug::log("deleteAllReinforcements");
		$data = array();

		for ($i = 0; $i < sizeof($this->reinforcements); $i++){
			$data[] = $this->reinforcements[$i]["id"];
		}

		if (sizeof($data)){
			DBManager::app()->deleteReinforcements($data);
		}
	}
	
	public function pickReinforcements(){
		if ($this->turn != $this->wave-1){return;}
		Debug::log("pickReinforcements");
		$picks = array();

		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			//Debug::log("player: ".$this->playerstatus[$i]["userid"]." has ".$this->playerstatus[$i]["value"]." available");
			$data = array();
			$faction = $this->playerstatus[$i]["faction"];
			$entries = $this->getReinforcements($faction);
			$total = 0;
			foreach ($entries as $entry){$total += $entry[1];}

			//Debug::log("total: ".$total);
			$add = 10;

			while ($add){
				$current = 0;
				$roll = mt_rand(0, $total);
				//Debug::log("roll: ".$roll);

				foreach ($entries as $entry){
					$current += $entry[1];
					if ($roll > $current){continue;}
					$data = $entry[0]::getKit($faction);
					$data["name"] = $entry[0];
					$data["notes"] = "";
					$data["userid"] = $this->playerstatus[$i]["userid"];
					$data["eta"] = 3;

					if (sizeof($data["upgrades"])){ // pick on upgrades !
						//Debug::log("available kits for ".$data["name"].": ".sizeof($data["upgrades"]));
						$subTotal = 0;

						for ($j = 0; $j < sizeof($data["upgrades"]); $j++){
							$subTotal += $data["upgrades"][$j]["chance"];
						}
						$subRoll = mt_rand(0, $subTotal);
						$subCurrent = 0;

						for ($j = 0; $j < sizeof($data["upgrades"]); $j++){
							$subCurrent += $data["upgrades"][$j]["chance"];
							if ($subRoll > $subCurrent){continue;}

							$data["upgrades"][$j]["active"] = 1;
							$data["notes"] = $data["upgrades"][$j]["notes"];

							if (isset($data["upgrades"][$j]["units"])){
								foreach ($data["upgrades"][$j]["units"] as $entry){
									//echo "name: ".$entry["name"].", cost : ".$entry["name"]::$value.", amount: ".$entry["amount"]."</br>";
									$data["cost"] += floor($entry["name"]::$value * $entry["amount"]);
								}
							} else $data["upgrades"][$j]["units"] = array();
							
							foreach ($data["upgrades"][$j]["loads"] as $entry){
								//echo "name: ".$entry["name"].", cost : ".$entry["name"]::$value.", amount: ".$entry["amount"]."</br>";
								$data["cost"] += floor($entry["name"]::$value * $entry["amount"]);
							}

							break;
						}
					}

					if (floor($data["cost"]) > floor($this->playerstatus[$i]["value"])){$add--; continue;}


					$picks[] = $data;
					$add--;
					//Debug::log("picking");
					break;
				}
			}
		}



		//for ($i = 0; $i < sizeof($picks); $i++){
		//	if ($picks[$i]["eta"] > 3){
		//		$picks[$i]["cost"] *= 1 - ($picks[$i]["eta"] - 3)/20;
		//	}
		//}

		if (sizeof($picks)){
			DBManager::app()->insertReinforcements($this->gameid, $this->turn, $picks);
		}
	}
	
	public function handleDeployPhase(){
		Debug::log("handleDeployPhase");
		$this->handleDeployActions();
		$this->handleJumpInActions();
		$this->resolveJumpOutActions();
		$this->handleInitialFireOrders();
		$this->assemblDeployStates();
		$this->deleteAllReinforcements();
		DBManager::app()->deleteEmptyLoads($this->gameid);
	}

	public function handleDeployActions(){
		$data = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->available == $this->turn){
				if (sizeof($this->ships[$i]->actions) == 1){
					$data[] = $this->ships[$i]->id;
				}
			}
		}

		DBManager::app()->resolveDeployActions($data);
	}

	public function handleJumpOutActions(){
		Debug::log("handleJumpOutActions");

		$needCheck = false;

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->status == "jumpOut"){
				Debug::log("check");
				$needCheck = true;
			}
		}

		if ($needCheck){$this->freeFlights();}
	}

	public function resolveJumpOutActions(){
		Debug::log("resolveJumpOutActions");

		$needCheck = false;

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->status == "jumpOut"){
				$this->ships[$i]->destroyed = true;
				$needCheck = true;
			}
		}

		if ($needCheck){
			$this->doFullDestroyedCheck();
		}
	}
	public function handleJumpInActions(){
		Debug::log("handleJumpInActions");
		$new = array();

		$mod = 1;
		if ($this->turn == 1){
			$mod = 0;
		}

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (($this->ships[$i]->ship || $this->ships[$i]->squad) && $this->ships[$i]->available == $this->turn){
				$order = $this->ships[$i]->actions[0];
				$output = $this->ships[$i]->getSystemByName("Sensor")->getOutput($this->turn);
				$shift = round(($this->ships[$i]->size - $this->ships[$i]->squad*15) / $output*500*$mod, 2);
				$aShift = ceil($shift);
				$pShift = ceil($shift*2);
				//Debug::log("jumpin: #".$this->ships[$i]->id.", class: ".$this->ships[$i]->name.", size: ".$this->ships[$i]->size.", sensor: ".$output.", ordered to: ".$order->x."/".$order->y.", shiftPotential: ".$shift."%");
				//Debug::log($this->ships[$i]->name.", aShift: ".$aShift."°, pShift: ".$pShift."px");

				$aShift = mt_rand(-$aShift, $aShift);
				$xShift = mt_rand(-$pShift, $pShift);
				$yShift = mt_rand(-$pShift, $pShift);
				$dist = Math::getDist($order->x, $order->y, $order->x + $xShift, $order->y + $yShift);

				//Debug::log("--> aShift: ".$aShift."°, psShift: ".$xShift."/".$yShift." (".$dist."px)");

				$this->ships[$i]->actions[0]->resolved = 1;
				$this->ships[$i]->actions[] = new Action(-1, $this->ships[$i]->id, $this->turn, "jumpIn", $dist, $order->x + $xShift, $order->y + $yShift, $aShift, 0, 0, 0, 1, 1);
				$new[] = $this->ships[$i]->actions[sizeof($this->ships[$i]->actions)-1];
			}
		}

		if (sizeof($new)){
			DBManager::app()->insertServerActions($new);
		}
	}

	public function handleInitialFireOrders(){
		Debug::log("handleInitialFireOrders");

		usort($this->fires, function($a, $b){
			return $a->shooterid - $b->shooterid;
		});

		if (sizeof($this->fires)){
			for ($i = 0; $i < sizeof($this->fires); $i++){
				$this->fires[$i]->shooter = $this->getUnit($this->fires[$i]->shooterid);
				$this->fires[$i]->weapon = $this->fires[$i]->shooter->getSystem($this->fires[$i]->weaponid);
			}

			$this->handleDeployFireOrders();
			$this->handleBallisticFireOrders();
			DBManager::app()->updateBallisticFireOrder($this->fires);
		}
	}

	public function handleDeployFireOrders(){
		Debug::log("handleDeployFireOrders");
		for ($i = 0; $i < sizeof($this->fires); $i++){
			if ($this->fires[$i]->weapon instanceof Hangar){
				$this->fires[$i]->resolved = 1;
			}
		}
	}

	public function handleBallisticFireOrders(){
		Debug::log("handleBallisticFireOrders");

		$adjust = array();
		$units = array();
		for ($i = 0; $i < sizeof($this->fires); $i++){
			//Debug::log("handling fire #".$i);
			$skip = 0;

			if ($this->fires[$i]->resolved){continue;}
			else if ($this->fires[$i]->weapon instanceof Launcher){
				$this->fires[$i]->shots = $this->fires[$i]->weapon->getShots($this->turn);
				$this->fires[$i]->resolved = 1;
			} else continue;

			$name = $this->fires[$i]->weapon->getAmmo()->name;
			$adjust[] = array(
				"loadAdjust" => array(
					"shipid" => $this->fires[$i]->shooterid,
					"systemid" => $this->fires[$i]->weaponid, 
					"loads" => array(0 => array("name" => $name, "amount" => $this->fires[$i]->shots)
					)
				)
			);

			for ($j = 0; $j < sizeof($units); $j++){
				if ($units[$j]["upgrades"][0]["shipid"] == $this->fires[$i]->shooterid && $units[$j]["upgrades"][0]["units"][0]["name"] == $name && $units[$j]["mission"]["targetid"] == $this->fires[$i]->targetid){
					//Debug::log("merging");
					$units[$j]["upgrades"][0]["units"][0]["amount"] += $this->fires[$i]->shots;
					$skip = 1;
					break;
				}
			}

			if ($skip){
				continue;
			}

			$sPos = $this->fires[$i]->shooter->getCurPos();
			$tPos = $this->getUnit($this->fires[$i]->targetid)->getCurPos();
			$a = Math::getAngle($sPos->x, $sPos->y, $tPos->x, $tPos->y);
			//Debug::log("i = ".$i.", shooterid: ".$shooter->id);
			$devi = Math::getPointInDirection($this->fires[$i]->shooter->size/3, $a, $sPos->x + mt_rand(-10, 10), $sPos->y + mt_rand(-10, 10));
			$mission = array("type" => 2, "turn" => $this->turn, "targetid" => $this->fires[$i]->targetid, "x" => $tPos->x, "y" => $tPos->y, "arrived" => 0, "new" => 1);
			$move = array("turn" => $this->turn, "type" => "deploy", "dist" => 0, "x" => $devi->x, "y" => $devi->y, "a" => $a, "cost" => 0, "delay" => 0, "costmod" => 0, "resolved" => 0);
			$upgrades = array(array("active" => 1, "shipid" => $this->fires[$i]->shooter->id, "systemid" => $this->fires[$i]->weapon->id, "units" => array(0 => array("amount" => $this->fires[$i]->shots, "name" => $name))));

			$units[] = array("gameid" => $this->gameid, "userid" => $this->fires[$i]->shooter->userid, "type" => "Salvo", "name" => "Salvo", "turn" => $this->turn, "eta" => 0,
				"mission" => $mission, "actions" => array($move), "upgrades" => $upgrades);


		}

		if (sizeof($units)){
			DBManager::app()->updateSystemLoad($adjust);
			DBManager::app()->insertUnits($this->userid, $this->gameid, $units);
			for ($i = 0; $i < sizeof($units); $i++){
				//$this->ships[] = new Salvo($units[$i]["id"], $units[$i]["userid"], $this->turn, "", "deployed", 0, 0, 0, 0, 0, 0, 0, 0, "");
				$this->ships[] = new Salvo(
					array(
						"id" => $units[$i]["id"], "userid" => $units[$i]["userid"], "command" => 0, "available" => $this->turn, "display" => "", "status" => "deployed",
						"destroyed" => 0, "x" => 0, "y" => 0, "facing" => 270, "delay" => 0, "thrust" => 0, 
						"rolling" => 0, "rolled" => 0, "flipped" => 0, "focus" => 0, "notes" => ""
					)
				);

				$this->ships[sizeof($this->ships)-1]->setUnitState($this->turn, $this->phase);
				$this->ships[sizeof($this->ships)-1]->actions[] = new Action(-1, $this->ships[$i]->id, $this->turn, "deploy", 0, $units[$i]["actions"][0]["x"], $units[$i]["actions"][0]["y"], $a, 0, 0, 0, 1, 1);
			}
		}
	}

	public function startMovementPhase(){
		//Debug::log("startShipMovementPhase");
		$dbManager = DBManager::app();
		$this->phase = 0;

		if ($dbManager->setGameTurnPhase($this->gameid, $this->turn, $this->phase)){
			$this->updatePlayerStatus("waiting");
			return true;
		}
	}

	public function startCommandMovePhase(){
		//Debug::log("startCommandMovePhase");
		$dbManager = DBManager::app();
		$this->phase = 1;

		if ($dbManager->setGameTurnPhase($this->gameid, $this->turn, $this->phase)){
			$this->updatePlayerStatus("waiting");
			return true;
		}
	}

	public function handleNewActions(){
		$new = array();

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->ship || $this->ships[$i]->squad){continue;}
			if (!$this->ships[$i]->hasMoved()){continue;}		
			$new[] = $this->ships[$i]->actions[sizeof($this->ships[$i]->actions)-1];
		}

		if (sizeof($new)){
			DBManager::app()->insertServerActions($new);
		}
	}

	public function updateMissions(){
		$data = array();

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (isset($this->ships[$i]->mission)){
				$data[] = $this->ships[$i]->mission;
			}
		}

		DBManager::app()->updateMissionState($data);
	}

	public function handleBaseMovementPhase(){
		Debug::log("handleBaseMovementPhase");
		$this->handleShipMovement();
		$this->freeFlights();
	}

	public function handleCommandMovementPhase(){
		Debug::log("handleCommandMovementPhase");
		$this->handleShipMovement();
		$this->handleFlightMovement();
		$this->handleSalvoMovement();
		$this->handleNewActions();

		$this->handlePostMoveFires();
		$this->updateMissions();
	}

	public function handlePostMoveFires(){
		Debug::log("handlePostMoveFires: ".sizeof($this->fires));
		$this->setFireOrderDetails();

		for ($i = 0; $i < sizeof($this->fires); $i++){
			Debug::log("handling fire: ".$this->fires[$i]->id.", weapon: ".$this->fires[$i]->weapon->display);
			if ($this->fires[$i]->resolved){continue;}

			$subFires = DmgCalc::createAreaFireOrders($this, $this->fires[$i]);

			for ($j = 0; $j < sizeof($subFires); $j++){
				//$subFires[$j]->target->resolveAreaFireOrder($subFires[$j]);
				$subFires[$j]->target->resolveFireOrder($subFires[$j]);
				$this->fires[$i]->hits++;
			}
			$this->fires[$i]->resolved = 1;
		}
		
		Debug::log("handling data");
		$this->handleResolvedFireData();
		return;
	}

	public function handleShipMovement(){
		Debug::log("handleShipMovement");
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->flight || $this->ships[$i]->salvo){continue;}
			
			for ($j = sizeof($this->ships[$i]->actions)-1; $j >= 0; $j--){
				if ($this->ships[$i]->actions[$j]->resolved == 0){
					$this->ships[$i]->actions[$j]->resolved = 1;
					$this->ships[$i]->moveSet = 1;
				} else break 1;
			}
		}
		DBManager::app()->resolveMovementDB($this->ships);
	}

	public function handleFlightMovement(){
		Debug::log("handleFlightMovement");

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (!$this->ships[$i]->flight){continue;}
			$this->ships[$i]->setMove($this);
		}
	}

	public function handleSalvoMovement(){
		Debug::log("handleSalvoMovement");

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (!$this->ships[$i]->salvo){continue;}
			$this->ships[$i]->setMove($this);
		}
	}

	public function assemblDeployStates(){
		Debug::log("assemblDeployStates");
		$states = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->available == $this->turn){
				$states[] = array(
					"id" => $this->ships[$i]->id,
					"x" => $this->ships[$i]->actions[sizeof($this->ships[$i]->actions)-1]->x,
					"y" => $this->ships[$i]->actions[sizeof($this->ships[$i]->actions)-1]->y,
					"facing" => 0,
					"delay" => 0, 
					"thrust" => $this->ships[$i]->getCurSpeed(),
					"rolling" => $this->ships[$i]->isRolling(),
					"rolled" => $this->ships[$i]->isRolled(),
					"flipped" => $this->ships[$i]->flipped,
				);
			}
		}

		if (sizeof($states)){DBManager::app()->updateUnitStats($states, $this->turn, $this->phase);}
		
	}

	public function assembleEndStates(){
		Debug::log("assembleEndStates");
		$states = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			$states[] = $this->ships[$i]->getEndState($this->turn);
		}

		if (sizeof($states)){DBManager::app()->updateUnitStats($states, $this->turn, $this->phase);}
		
	}

	public function startFiringPhase(){
	//	Debug::log("startFiringPhase");
		$dbManager = DBManager::app();
		$this->phase = 2;

		if ($dbManager->setGameTurnPhase($this->gameid, $this->turn, $this->phase)){
			//$players = $dbManager->getPlayerStatus($this->gameid);
			$this->updatePlayerStatus("waiting");
			return true;
		}
	}

	public function handleFiringPhase(){
		Debug::log("handleFiringPhase");
		$time = -microtime(true);

		$this->doFullDestroyedCheck();
		$this->removeDestroyedUnits();

		$this->setupShips();

		$this->setFireOrderDetails();
		$this->sortFireOrders();
		$this->resolveShipFireOrders();
		$this->resolveFighterFireOrders();
		$this->resolveBallisticFireOrders();
		$this->testCriticals();
		$this->testMorale();

		$this->handleResolvedFireData();

		$time += microtime(true); 
		Debug::log("handleFiringPhase time: ".round($time, 3)." seconds.");
		return true;
	}
	
	public function handleDamageControlPhase(){
		$this->handleJumpOutActions();
		return true;
	}

	public function endTurn(){
		Debug::log("endTurn");
		$this->setUnitRollState();
		$this->doFullDestroyedCheck();
		$this->assembleEndStates();
		$this->adjustFocusPoints();
		$this->pickReinforcements();
	}

	public function adjustFocusPoints(){
		$data = array();

		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			$curFocus = $this->playerstatus[$i]["curFocus"];
			for ($j = 0; $j < sizeof($this->ships); $j++){
				if ($this->playerstatus[$i]["userid"] != $this->ships[$j]->userid){continue;}
				if ($this->ships[$j]->focus){$curFocus -= ceil($this->ships[$j]->cost);}
			}

			$gainFocus = $this->playerstatus[$i]["gainFocus"];

			$data[] = array(
				"id" => $this->playerstatus[$i]["id"],
				"curFocus" => min($this->playerstatus[$i]["maxFocus"], $curFocus + $gainFocus)
			);
		}

		DBManager::app()->updateFocusPoints($data);
	}
	
	public function freeFlights(){
		//Debug::log("freeFlights");
		$data = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (!$this->ships[$i]->flight){continue;}
			if ($this->ships[$i]->mission->type != 2){continue;}
			if ($this->ships[$i]->mission->type == 1 && !$this->mission->arrived){continue;} // player issue new patrol in same initial phase as flight target jumpsOut

			$t = $this->getUnit($this->ships[$i]->mission->targetid);
			if ($t->destroyed || $t->status == "jumpOut"){
				//Debug::log("freeeing flight #".$this->ships[$i]->id." from mission");
				$this->ships[$i]->mission->type = 1;
				$this->ships[$i]->mission->turn = $this->turn - 2;
				$this->ships[$i]->mission->arrived = $this->turn - 1;
				$this->ships[$i]->mission->targetid = 0;
				$this->ships[$i]->setCurSpeed($this->turn, $this->phase);
				$data[] = $this->ships[$i]->mission;
			}
			else if ($this->ships[$i]->mission->arrived && ($t->ship || $t->squad) && $t->hasMoved() && !$this->ships[$i]->hasMoved()){
				$this->ships[$i]->mission->arrived = 0;
				$data[] = $this->ships[$i]->mission;
			}
		}
		if (sizeof($data)){DBManager::app()->updateMissionState($data);}
	}

	public function setUnitRollState(){
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->flight || $this->ships[$i]->salvo){continue;}

			if ($this->ships[$i]->rolling){$this->ships[$i]->rolled = !$this->ships[$i]->rolled;}
		}
	}

	public function doFullDestroyedCheck(){
		$this->doFirstDestroyedCheck(); // direct unit destruction
		$this->doSecondDestroyedCheck(); // indirect -> salvos without target
		$this->writeDestroyedStatus();
		$this->freeFlights();
	}

	public function doFirstDestroyedCheck(){
		Debug::log("doFirstDestroyedCheck");
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->salvo && sizeof($this->ships[$i]->structures[0]->systems[0]->fireOrders)){ // impact salvo
				$this->ships[$i]->destroyed = true;
			}
			else if ($this->phase == 3 && $this->ships[$i]->salvo && $this->ships[$i]->structures[0]->torpedo){ // torps out of range
				$this->ships[$i]->destroyed = true;
			}
			else if (($this->ships[$i]->flight || $this->ships[$i]->salvo) && $this->ships[$i]->isDestroyed()){
				$this->ships[$i]->destroyed = true;
			}
		}
	}

	public function doSecondDestroyedCheck(){
		Debug::log("doSecondDestroyedCheck");
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->destroyed){
				for ($j = 0; $j < sizeof($this->ships); $j++){
					if ($this->ships[$j]->salvo && $this->ships[$j]->mission->targetid == $this->ships[$i]->id){
						$this->ships[$j]->destroyed = true;
					}
				}
			}
		}
	}

	public function removeDestroyedUnits(){
		for ($i = sizeof($this->ships)-1; $i >= 0; $i--){
			if ($this->ships[$i]->destroyed){
				Debug::log("splicing destroyed unit");
				array_splice($this->ships, $i, 1);
			}
		}
	}

	public function writeDestroyedStatus(){
		DBManager::app()->updateDestroyedState($this->ships);
	}

	public function startNewTurn(){
		//Debug::log("startNewTurn");
		$this->turn++;
		$this->phase = -1;
		DBManager::app()->setGameTurnPhase($this->gameid, $this->turn, $this->phase);
	}

	public function startDeployPhase(){
		$this->updatePlayerStatus("waiting");
	}

	public function setupShips(){
		for ($i = 0; $i < sizeof($this->ships); $i++){
			$this->ships[$i]->setFacing();
			$this->ships[$i]->setPosition();
			$this->ships[$i]->setImpulseProfileMod();
			$this->ships[$i]->setBonusNegation($this->turn);
		}

		//set dist and angle for each ship to speed up fire resolution
		for ($i = 0; $i < sizeof($this->ships); $i++){
			$aPos = $this->ships[$i]->getCurPos();
			//Debug::log("POSITION #".$this->ships[$i]->id.": ".$aPos->x."/".$aPos->y);
			for ($j = $i+1; $j < sizeof($this->ships); $j++){
				if ($this->ships[$i]->userid == $this->ships[$j]->userid){continue;}
				$bPos = $this->ships[$j]->getCurPos();
				$dist = Math::getDist2($aPos, $bPos);
				
				$this->ships[$i]->distances[] = array($this->ships[$j]->id, $dist);
				$this->ships[$j]->distances[] = array($this->ships[$i]->id, $dist);

				$this->ships[$i]->angles[] = array($this->ships[$j]->id, round(Math::getAngle2($aPos, $bPos)));
				$this->ships[$j]->angles[] = array($this->ships[$i]->id, round(Math::getAngle2($bPos, $aPos)));
			}
		}

		/*
		for ($i = 0; $i < sizeof($this->ships); $i++){
			$aPos = $this->ships[$i]->getCurPos();
			Debug::log("POSITION #".$this->ships[$i]->id.": ".$aPos->x."/".$aPos->y);
			foreach ($this->ships[$i]->angles as $val){Debug::log("--> ANGLE TO: #".$val[0].": ".$val[1]);}
			foreach ($this->ships[$i]->distances as $val){Debug::log("-->  DIST TO: #".$val[0].": ".$val[1]);}
		}
		*/

		for ($i = 0; $i < sizeof($this->ships); $i++){
			$this->setLocks($this->ships[$i]); 
		}
		//return;

	}

	public function setLocks($emitter){
		if ($emitter->salvo){}
		else if ($emitter->flight && $emitter->mission->arrived){
			//Debug::log("setLocks for FLIGHT #".$emitter->id);
			for ($i = 0; $i < sizeof($this->ships); $i++){
				if ($this->ships[$i]->id == $emitter->id || $emitter->userid == $this->ships[$i]->userid){continue;}
				for ($j = 0; $j < sizeof($emitter->cc); $j++){
					if ($emitter->cc[$j] == $this->ships[$i]->id){
						if ($this->ships[$i]->ship || $this->ships[$i]->squad){
							if ($emitter->mission->targetid == $this->ships[$i]->id){ // strike fighter evades shots from its target (ship)
								$emitter->masks[] = array($this->ships[$i]->id, $emitter->getMaskEffect($this->ships[$i]));
								//Debug::log("setting flight mask vs ship target");
							}
						}
						else if ($this->ships[$i]->flight){
							if ($emitter->mission->targetid == $this->ships[$i]->id || $emitter->mission->type == 1){ // mission direct target lock OR patrol 
								$emitter->locks[] = array($this->ships[$i]->id, $emitter->getLockEffect($this->ships[$i]));
							}
							else if ($emitter->mission->targetid == $this->ships[$i]->mission->targetid && $emitter->userid == $this->getUnit($emitter->mission->targetid)->userid){ //escorting flight
								$emitter->locks[] = array($this->ships[$i]->id, $emitter->getLockEffect($this->ships[$i]));
							}
							else if ($this->ships[$i]->mission->type == 1 && $this->ships[$i]->mission->arrived){
								$emitter->locks[] = array($this->ships[$i]->id, $emitter->getLockEffect($this->ships[$i]));
							}
						}
						else if ($this->ships[$i]->salvo){ // if flight in patrol vs salvo || flight in escort duty vs salvo
							if ($emitter->mission->type == 1 || $this->ships[$i]->mission->targetid != $emitter->id){
								$emitter->locks[] = array($this->ships[$i]->id, $emitter->getLockEffect($this->ships[$i]));
							}
						}
					}
				}
			}
		}
		else if ($emitter->ship || $emitter->squad){
			//Debug::log("____________________EW for ".$emitter->display." #".$emitter->id);
			$oPos = $emitter->getCurPos();
			$sensor =  $emitter->getSystemByName("Sensor");
			$ew = $sensor->getEW($this->turn);
			if ($sensor->destroyed || $sensor->disabled  || !$ew){
				return;
			}
			else if ($ew->type == 2 || $ew->type == 3){
				for ($i = 0; $i < sizeof($this->ships); $i++){
					if ($this->ships[$i]->id == $emitter->id || $emitter->userid == $this->ships[$i]->userid){continue;}
					switch ($ew->type){
						case 2: $emitter->locks[] = array($this->ships[$i]->id, $this->const["ew"]["effect"][$ew->type]); break;
					}
				}
			}
			else {
				$start = 0;
				$end = 360;
				$w;

				if ($ew->angle == -1){
					$w = 180;
					//Debug::log("specific EW for ship #".$emitter->id.", 360 arc");
				}
				else {
					$str = $sensor->getOutput($this->turn);
					$w = min(180, $this->const["ew"]["len"] * pow($str/$ew->dist, $this->const["ew"]["p"]));
					$start = Math::addAngle(0 + $w-$emitter->getFacing(), $ew->angle);
					$end = Math::addAngle(360 - $w-$emitter->getFacing(), $ew->angle);
					//Debug::log("specific EW for ship #".$emitter->id.", str: ".$str.", facing: ".$emitter->getFacing().", w: ".$w.", EW @ ".$ew->angle." -> from ".$start." to ".$end.", dist: ".$ew->dist);
				}

				for ($i = 0; $i < sizeof($this->ships); $i++){
					$skip = 0;
					if ($this->ships[$i]->id == $emitter->id || $emitter->userid == $this->ships[$i]->userid){continue;}

					if (sizeof($emitter->cc)){
						if ($ew->type == 0){ // specific OW versus close combat
							for ($j = 0; $j < sizeof($emitter->cc); $j++){
								if ($emitter->cc[$j] == $this->ships[$i]->id){
									if ($this->ships[$i]->flight){ // flight
										$multi = $emitter->getLockEffect($this->ships[$i]) / 180 * $w;
										//Debug::log("adding CC lock from ship #".$emitter->id." vs flight# #".$this->ships[$i]->id." for value: ".$multi);

										$emitter->locks[] = array($this->ships[$i]->id, $multi);
										$skip = 1; break;
									}
									else if ($this->ships[$i]->salvo){ // salvo, in trajectory ?
										$angle = Math::getAngle2($emitter, $this->ships[$i]->getTrajectoryStart());
										if (Math::isInArc($angle, $start, $end)){
											//Debug::log("adding CC lock from ship vs salvo");
											$emitter->locks[] = array($this->ships[$i]->id, $emitter->getLockEffect($this->ships[$i]));
											$skip = 1; break;
										}
									}
								}
							}
						}
						else if ($ew->type == 1){ // ship MASK in cc, only working against salvo ATM
							if ($this->ships[$i]->salvo){ // salvo, in trajectory ?
								$angle = Math::getAngle2($emitter, $this->ships[$i]->getTrajectoryStart());
								if (Math::isInArc($angle, $start, $end)){
									//Debug::log("adding CC mask from ship vs salvo");
									$emitter->masks[] = array($this->ships[$i]->id, $emitter->getMaskEffect($this->ships[$i]));
									$skip = 1; break;
								}
							}
						}
					}

					if ($skip){continue;}

					$tPos = $this->ships[$i]->getCurPos();
					$dist = Math::getDist2($oPos, $tPos);
					if ($dist <= $ew->dist){
						$a = Math::getAngle2($oPos, $tPos);
						//Debug::log("versus #".$this->ships[$i]->id.", angle: ".$a.", dist: ".$dist);
						if (Math::isInArc($a, $start, $end)){
							if ($ew->type == 0){ // LOCK
								$emitter->locks[] = array($this->ships[$i]->id, $emitter->getLockEffect($this->ships[$i]));
								//Debug::log("locking on #".$this->ships[$i]->id." for value: ".$emitter->locks[sizeof($emitter->locks)-1][1]);
							}
							else if ($ew->type == 1){ // MASK
								if ($this->ships[$i]->ship || $this->ships[$i]->squad){
									$emitter->masks[] = array($this->ships[$i]->id, $emitter->getMaskEffect($this->ships[$i]));
									//Debug::log("masking from #".$this->ships[$i]->id." for value: ".$emitter->masks[sizeof($emitter->masks)-1][1]);
								}
							}
						}// else Debug::log("out of arc");
					}// else ("out of dist: ".(Math::getDist2($origin, $tPos))." EW: ".$ew->dist);
				}
			}

			//foreach ($origin->masks as $entry){Debug::log("masks vs #".$entry[0]." with val: ".$entry[1]);}
		}
	}

	public function setFireOrderDetails(){
		//for ($i = 0; $i < sizeof($this->fires); $i++){var_export($this->fires[$i]); echo "</br></br>";}

		for ($i = sizeof($this->fires)-1; $i >= 0; $i--){
			if ($this->phase == 2 && !$this->fires[$i]->targetid){$this->fires[$i]->resolved = 1; continue;}
			//Debug::log("setFireOrderDetails fire #".$this->fires[$i]->id);
			//Debug::log("fire: ".$this->fires[$i]->id);
			//var_export($this->fires[$i]); echo "</br></br>";
			$this->fires[$i]->shooter = $this->getUnit($this->fires[$i]->shooterid);
			//var_export($this->fires[$i]->id);
			$this->fires[$i]->weapon = $this->fires[$i]->shooter->getSystem($this->fires[$i]->weaponid);
			//Debug::log("weapon: ".get_class($this->fires[$i]->weapon));
			$this->fires[$i]->shots = $this->fires[$i]->weapon->getShots($this->turn);
			$this->fires[$i]->target = $this->getUnit($this->fires[$i]->targetid);
			//var_export($this->fires[$i]->weapon); echo "</br></br>";
			//var_export($this->fires[$i]->weapon->getBoostLevel($this->turn)); echo "</br></br>";
		}
	}

	public function sortFireOrders(){
		//Debug::log("fires: ".sizeof($this->fires));
		//order target id ASC, weapon priority ASC, shooterider id ASC

		usort($this->fires, function($a, $b){
			if ($a->targetid != $b->targetid){
				return $a->targetid - $b->targetid;
			}
			else if ($a->weapon->priority != $b->weapon->priority){
				return $a->weapon->priority - $b->weapon->priority;
			}
			else if ($a->shooterid != $b->shooterid){
				return $a->shooterid - $b->shooterid;
			}
			else return $a->id - $b->id;
		});
	}

	public function resolveShipFireOrders(){
		// resolve ship vs ship / fighter
		for ($i = 0; $i < sizeof($this->fires); $i++){
			//Debug::log("resolving fire: ".$i.", prio: ".$this->fires[$i]->weapon::$prio);
			if ($this->fires[$i]->resolved){continue;}
			if ($this->fires[$i]->shooter->flight){continue;}
			$this->fires[$i]->target->resolveFireOrder($this->fires[$i]);
		}
	}

	public function resolveFighterFireOrders(){
		// splice and delete fireorders from destroyed fighters
		$toDelete = array();

		for ($i = sizeof($this->fires)-1; $i >= 0; $i--){
			if ($this->fires[$i]->resolved){continue;}
			if (!$this->fires[$i]->shooter->flight){continue;}
			if ($this->fires[$i]->shooter->getStruct($this->fires[$i]->weapon->fighterId)->destroyed){
				Debug::log("SKIPPING firorder, fighter (shooter) is destroyed");
				$this->fires[$i]->resolved = 1;
			}
		}

		/*
		for ($i = 0; $i < sizeof($this->fires); $i++){
			if ($this->fires[$i]->resolved || !$this->fires[$i]->shooter->flight){continue;}
			//Debug::log("comparing :".$this->fires[$i]->id);
			for ($j = $i+1; $j < sizeof($this->fires); $j++){
				if ($this->fires[$j]->resolved || !$this->fires[$j]->shooter->flight){continue;}
				//Debug::log("to :".$this->fires[$j]->id);
				if ($this->fires[$j]->shooterid == $this->fires[$i]->shooterid){
					if ($this->fires[$j]->targetid == $this->fires[$i]->targetid){
						if ($this->fires[$j]->weapon->name == $this->fires[$i]->weapon->name){
							//Debug::log("could add fire: ".$this->fires[$j]->id." to fire ".$this->fires[$i]->id);
							$this->fires[$i]->shots++;
							$this->fires[$j]->shots--;
							$this->fires[$j]->resolved = 1;
							//$this->fires[$j]->notes = "+";
						}
					}
				}
			}
		}
		*/


		// fighter vs fighter
		for ($i = 0; $i < sizeof($this->fires); $i++){ // non-dogfights
			if ($this->fires[$i]->resolved){continue;}

			if ($this->fires[$i]->shooter->flight && $this->fires[$i]->target->flight){
				$this->fires[$i]->target->resolveFireOrder($this->fires[$i]);
			}
		}

		// fighter vs non fighter (ball, ship);
		for ($i = 0; $i < sizeof($this->fires); $i++){
			if ($this->fires[$i]->resolved){continue;}

			if ($this->fires[$i]->shooter->flight == true && $this->fires[$i]->target->flight == false){
				if ($this->fires[$i]->shooter->getStruct($this->fires[$i]->weapon->fighterId)->destroyed){
					Debug::log("BBB skipping fireorder due to destroyed single shooter");
					$this->fires[$i]->resolved = 1;
					continue;
				}
				$this->fires[$i]->target->resolveFireOrder($this->fires[$i]);
			}
		}

		$index = 0;
		for ($i = $index; $i < sizeof($this->fires); $i++){
			if ($this->fires[$i]->shooter->flight){
				if ($this->fires[$i]->shots >= 2){
					for ($j = $i+1; $j < sizeof($this->fires); $j++){
						if ($this->fires[$i]->shooter->flight && $this->fires[$j]->shots == 0){
							if ($this->fires[$i]->targetid == $this->fires[$j]->targetid){
								$this->fires[$j]->req = $this->fires[$i]->req;
								/*	
									$this->fires[$i]->shots--;
									$this->fires[$j]->shots++;

									if ($this->fires[$i]->hits > 1){
										$this->fires[$i]->hits--;
										$this->fires[$j]->hits++;
									}
									if ($this->fires[$i]->shots == 1){
										$index = $j+1;
										break;
								}*/
							}
						}
					}
				}
			}
		}
	}

	public function resolveBallisticFireOrders(){
		Debug::log("resolveBallisticFireOrders");
		$fires = array();

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->salvo && !$this->ships[$i]->isDestroyed()){
				if ($this->ships[$i]->mission->arrived){
					Debug::log("arrived!");
					$target = $this->getUnit($this->ships[$i]->mission->targetid);
					$fire = $this->ships[$i]->getFireOrder($this->gameid, $this->turn, $target);
					$fires[] = $fire;
				}
			}
		}

		if (sizeof($fires)){
			DBManager::app()->insertServerFireOrder($fires);

			for ($i = 0; $i < sizeof($fires); $i++){
				Debug::log("ball fireorder ".$i);
				$fires[$i]->target->resolveFireOrder($fires[$i]);
			}
			$this->fires = array_merge($this->fires, $fires);
		}
	}

	public function testCriticals(){
		Debug::log("------------------------------- testCriticals");
		for ($i = 0; $i < sizeof($this->ships); $i++){
			//Debug::log(get_class($this->ships[$i])." #".$this->ships[$i]->id." testCriticals");
			$this->ships[$i]->handleCritTesting($this->turn);
		}
	}

	public function testMorale(){
		Debug::log("------------------------------- testMorale");
		for ($i = 0; $i < sizeof($this->ships); $i++){
			$this->ships[$i]->setMorale($this->turn, $this->phase);
			$this->ships[$i]->handleMoraleTesting($this->turn);
		}
	}

	public function handleResolvedFireData(){
		Debug::log("handleResolvedFireData");
		$newDmgs = $this->getAllNewDamages();
		$newCrits = $this->getAllNewCrits();
		$retreats = $this->getAllNewRetreats();

		DBManager::app()->updateFireOrders($this->fires);
		if (sizeof($newDmgs)){DBManager::app()->insertDamageEntries($newDmgs);}
		if (sizeof($newCrits)){DBManager::app()->insertCritEntries($newCrits);}
		if (sizeof($retreats)){DBManager::app()->jumpOutUnits($retreats);}
	}

	public function getAllNewDamages(){
		//Debug::log("getAllNewDamages");
		$data = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			$data = array_merge($data, $this->ships[$i]->getNewDamages($this->turn));
		}
		return $data;
	}

	public function getAllNewCrits(){
		//Debug::log("getAllNewCrits");
		$data = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->destroyed && $this->ships[$i]->ship){continue;}
			$data = array_merge($data, $this->ships[$i]->getNewCrits($this->turn));
		}
		return $data;
	}
	
	public function getAllNewRetreats(){
		//Debug::log("getAllNewRetreats");
		$data = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->destroyed || $this->ships[$i]->flight || $this->ships[$i]->salvo){continue;}
			if ($this->ships[$i]->status != "jumpOut"){continue;}
			$data[] = array("id" => $this->ships[$i]->id, "status" => $this->ships[$i]->status);
		}
		return $data;
	}

	public function startDamageControlPhase(){
		//Debug::log("startDamageControlPhase");

		$this->phase = 3;

		DBManager::app()->resetFocusState($this->ships);
		DBManager::app()->setGameTurnPhase($this->gameid, $this->turn, $this->phase);
		$this->updatePlayerStatus("waiting");
		return true;
	}

	public function getId(){
		return 1 + sizeof($this->ships);
	}

	public function getUnit($id){
		//Debug::log("looking for unit :".$unitid);
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->id == $id){
				return $this->ships[$i];
			}
		}
		return 0;
	}

	public function getFactions(){
		return array("Earth Alliance", "Centauri Republic", "Minbari Federation", "Narn Regime", "The Shadows");
	}

	public function getUnitsForFaction($faction){
		//Debug::log("getUnitsForFaction");
		$units = array(array(), array(), array(), array());
		$return = array(array(), array(), array(), array());

		switch ($faction){
			case "Earth Alliance";
				$units = array(
					array(
						"Omega",
						"Avenger",
						"Hyperion",
						"Saggitarius",
						"Artemis",
						"Olympus",
					),
					array(
						"Crius",
						"Hermes",
						"Tethys",
					),
					array(
						"Aurora",
						"Thunderbolt",
					),
					array(
						"Needle",
						"Naga",
						"Cyclops",
						"Titan",
					),
				);
				break;
			case "Centauri Republic";
				$units = array(
					array(
						"Octurion",
						"Primus",
						"Centurion",
						"Altarian",
						"Demos",
						//"Darkner",
					),
					array(
						//"Vorchar",
						"Mograth",
						"Darkner",
						"VorchanA",
						"VorchanB",
						"Haven",
					),
					array(
						"Sentri",
						"SitaraParticle",
					),
					array(
						"Hasta",
						"Javelin",
						"Triarii",
					),
				);
				break;
			case "Minbari Federation";
				$units = array(
					array(
						"Sharlin",
						"Tigara",
						"Tinashi",
						//"Rolentha",
					),
					array(
						"WhiteStar",
						"Torotha",
					),
					array(
						"Nial",
						"Tishat",
					),
					array()
				);
				break;
			case "Narn Regime";
				$units = array(
					array(
						"GQuan",
						"GSten",
						"KaToc",
						"Rongoth",
						"DagKar",
					),
					array(
						"Thentus",
						"Trakk",
						"Shokos",
						"Shokov",
					),
					array(
						"Frazi",
						"Gorith",
					),
					array(
						"Vran",
						"Vranoth",
						"VranothKa",
					),
				);
				break;
			case "The Shadows";
				$units = array(
					array(
						"Battlecrab",
					),
					array(
					),
					array(
					),
				);
				break;
			default:
				break;
		}

		$ship;

		for ($i = 0; $i < sizeof($units[0]); $i++){
			$name = $units[0][$i];
			$unit = new $name(1, 0, 0, 0, "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, "");
			$data = array(
				"name" => $unit->name,
				"value" => $unit::$value,
				"ep" => $unit->ep,
				"ew" => $unit->ew,
				"eta" => 0
			);
			$return[0][] = $data;
		}

		for ($j = 0; $j < sizeof($units[1]); $j++){
			$unit = new $units[1][$j](1, 1);
			$data = array(
				"name" => $unit->name,
				"value" => $unit::$value,
				"ep" => $unit->ep,
				"ew" => $unit->ew,
				"space" => $unit->space,
				"eta" => 0
			);
			$return[1][] = $data;
		}

		for ($i = 0; $i < sizeof($units[2]); $i++){
			$fighter = new $units[2][$i](0, 0);
			$return[2][] = $fighter;
		}
		for ($i = 0; $i < sizeof($units[3]); $i++){
			$ballistic = new $units[3][$i](0, 0);
			$return[3][] = $ballistic;
		}


		return $return;
	}

	public function getReinforcements($faction){
		//Debug::log("getUnitsForFaction");
		$units = array();

		switch ($faction){
			case "Earth Alliance";
				$units = array(
					array("Omega", 5, 6),
					array("Hyperion", 7, 5),
					array("Avenger", 3, 6),
					array("Artemis", 10, 3),
					array("Olympus", 10, 3),
					array("Squadron", 15, 2),
				);
				break;
			case "Centauri Republic";
				$units = array(
					array("Primus", 5, 6),
					array("Centurion", 7, 6),
					array("Altarian", 15, 3),
					array("Demos", 15, 3),
					array("Squadron", 20, 2),
				);
				break;
			case "Minbari Federation";
				$units = array(
					array("Sharlin", 2, 4),
					array("Tigara", 3, 4),
					array("Tinashi", 4, 3),
					array("Squadron", 10, 2),
				);
				break;
			case "Narn Regime";
				$units = array(
					array("GQuan", 6, 2),
					array("GSten", 6, 3),
					array("KaToc", 8, 3),
					array("Rongoth", 8, 3),
					array("DagKar", 4, 3),
					array("Squadron", 20, 2),
				);

				break;
			default:
				break;
		}

		return $units;

	}
	public function getPreviewData($get){
		//Debug::log("asking for preview of: ".$get["name"].", index: ".$get["index"]);
		$unit;
		if ($get["unit"] == "ship"){
			$unit = new $get["name"](
				array(
					"id" => 1, "userid" => 1, "command" => 0, "available" => 0, "display" => "", "status" => "",
					"destroyed" => 0, "x" => 0, "y" => 0, "facing" => 270, "delay" => 0, "thrust" => 0, 
					"rolling" => 0, "rolled" => 0, "flipped" => 0, "focus" => 0, "notes" => ""
				)
			);
			$unit->addAllSystems();
			$unit->setUnitState(0, 0);
		}
		elseif ($get["unit"] == "squaddie"){
			$unit = new $get["name"]($get["index"]+1, 1);
			$unit->setSubunitState(0, 0);
		}

		
		return $unit;
	}

	public function compareSystems($array){
		$systems = array();

		for ($i = 0; $i < sizeof($array); $i++){
			$systems[$i] = new $array[$i](0, 0, 0, 0);
		}
		return $systems;
	}

	public function reset(){
		if (DBManager::app()->reset()){return true;}
	}

	static function convertToFireOrder($data){
		return new FireOrder(
			$data["id"],
			$data["gameid"],
			$data["turn"],
			$data["shooterid"],
			$data["targetid"],
			$data["x"],
			$data["y"],
			$data["weaponid"],
			$data["shots"],
			$data["req"],
			$data["notes"],
			$data["hits"],
			$data["resolved"]
		);
	}
}
?>
