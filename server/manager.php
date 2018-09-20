<?php

	class Manager {
		public $userid;
		public $gameid;

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
		public $fires = array();
		public $playerstatus = array();
		public $reinforcements = array();
		public $deploys = array();
		public $incoming = array();
		public $userindex = 0;

		public $settings = array();

		public $weapons = array();

		public $const = array(
			"ew" => array(
				"p" => 1.5,
				"len" => 10,
				"effect" => array(0 => 0.5, 1 => 0.5, 2 => 0.25),
			),
			"morale" => array(
				array("Morale", 30, 0, -5.00),
				array("Morale", 60, 0, -15.00),
				array("Morale", 100, 0, -25.00),
				array("Rout", 150, 0, 0.00)
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
		return;
	}

	static function alterShipFiles(){

		$files = array_slice(scandir("server/ships"), 2);

		foreach ($files as $file){
			$content = file("server/ships/".$file);
			$new = array();

			foreach ($content as $line){
				$entry = substr(trim($line), 8, 3);
				if ($entry != "pro"){
					$new[] = $line;
				}
				else {
					$replace = true;
					$new[] = "\t".'public $profile = array(0.9, 1.1);'."\n";
				}
			}

			if ($replace){
				$dest = fopen("server/ships/".$file, "w");
				fwrite($dest, implode($new));
				fclose($dest);
			}
		}
	}

	public function getClientData(){
		//Debug::log("getClientData");
		//$this->testUnitMorale(); return;
		//$this->setPostFireFocusValues(); return;
		//$this->testFleetMorale();

		if (!$this->settings || !$this->settings->turn){return false;}
		
		$data = array(
			"id" => $this->gameid,
			"turn" => $this->turn,
			"phase" => $this->phase,
			"ships" => $this->getUnitDataForClient(),
			"reinforcements" => $this->reinforcements,
			"incoming" =>$this->getIncomingData(),
			"const" => $this->const,
			"userid" => $this->userid,
			"playerstatus" => $this->getPlayerStatus(),
			"settings" => $this->settings
		);

		Debug::close();
		return $data;

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
		if (!$gd){return;}

		$this->settings = new GD($gd);
		//var_export($this->settings);
		$this->turn = $gd["turn"];
		$this->phase = $gd["phase"];

		$this->playerstatus = DBManager::app()->getDBPlayerStatus($this->gameid);

		$this->weapons = DmgCalc::setWeaponPriority();
	}

	public function getGameData(){
		//Debug::log("getGameData for: ".$this->gameid.", for user: ".$this->userid);
		if (!$this->settings){return false;}
		$db = DBManager::app();

		$this->setReinforceStatus();
		$this->fires = $db->getUnresolvedFireOrders($this->gameid, $this->turn);
		$this->ships = $this->assembleUnits();
		$this->setCC();
		$this->reinforcements = $this->readyReinforcements();
		//$this->incoming = $db->getIncomingShips($this->gameid, $this->turn);
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

	public function getUnitDataForClient(){
		//Debug::log("getUnitDataForClient");
		//Debug::log("user: ".$this->userid.", turn: ".$this->turn.", phase: ".$this->phase);
		for ($i = sizeof($this->ships)-1; $i >= 0; $i--){
		if ($this->turn == 1 && $this->phase == -1){return $this->ships;}

			//if ($this->ships[$i]->userid == $this->userid){continue;}

			if ($this->phase == 3){$this->ships[$i]->focus = 0;}

			if ($this->ships[$i]->available == $this->turn && $this->phase == -1){
				if ($this->ships[$i]->flight){
					array_splice($this->ships, $i, 1);
				}
				else if ($this->turn > 1){
					if ($this->ships[$i]->userid != $this->userid){
						$this->incoming[] = $this->ships[$i];
						array_splice($this->ships, $i, 1);
					}
					else $this->incoming[] = $this->ships[$i];
				}
			}
			else if ($this->ships[$i]->available > $this->turn){
				$this->incoming[] = $this->ships[$i];
				array_splice($this->ships, $i, 1);
			}
		}

		switch ($this->phase){
			case -1: 
				for ($i = 0; $i < sizeof($this->ships); $i++){
					if ($this->ships[$i]->userid == $this->userid){continue;}
					$this->ships[$i]->hideAllPowers($this->turn);
					$this->ships[$i]->hideFireOrders($this->turn, $this->phase);
					$this->ships[$i]->hideActions($this->phase);
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
					if ($this->ships[$i]->flight){ // flights pick dualmode in firing phase
						$this->ships[$i]->hideAllPowers($this->turn);
					}
				} break;
			case 3:
				for ($i = 0; $i < sizeof($this->ships); $i++){
					if ($this->ships[$i]->command > $this->turn){$this->ships[$i]->command = 0;}
				} break;
			default: break;
		}

		return $this->ships;
	}

	public function getIncomingData(){
		//Debug::log("getIncomingData ".sizeof($this->incoming));

		for ($i = sizeof($this->incoming)-1; $i >= 0; $i--){
			//var_export($this->incoming[$i]);
			if ($this->incoming[$i]->userid != $this->userid && $this->incoming[$i]->available > $this->turn+1){
				array_splice($this->incoming, $i, 1);
			}
		}
		//Debug::log("return incoming: ".sizeof($this->incoming));
		return $this->incoming;
	}

	public function createGame($name){
		if (DBManager::app()->createGame($this->userid, $name)){
			return true;
		}
	}

	public function readyReinforcements(){
		//Debug::log("readyReinforcements s".sizeof($this->reinforcements));

		$possible = DBManager::app()->getPossiblyReinforces($this->gameid, $this->userid);
		$data = array();

		for ($i = 0; $i < sizeof($possible); $i++){
			if ($possible[$i]["userid"] == $this->userid){
				$unit = new $possible[$i]["name"](
					array(
					"id" => -$possible[$i]["id"],
					"userid" => $possible[$i]["userid"],
					"display" => $possible[$i]["display"],
					"totalCost" => $possible[$i]["totalCost"],
					"moraleCost" => $possible[$i]["moraleCost"],
					"status" => $possible[$i]["status"],
					"command" => $possible[$i]["command"],
					"available" => $this->turn + $possible[$i]["available"],
					"destroyed" => $possible[$i]["destroyed"],
					"x" => $possible[$i]["x"],
					"y" => $possible[$i]["y"],
					"facing" => $possible[$i]["facing"],
					"delay" =>  $possible[$i]["delay"],
					"thrust" => $possible[$i]["thrust"],
					"rolling" => $possible[$i]["rolling"],
					"rolled" => $possible[$i]["rolled"],
					"flipped" => $possible[$i]["flipped"],
					"focus" => $possible[$i]["focus"],
					"notes" => $possible[$i]["notes"]
					)
				);
				$unit->curImp = $unit->baseImpulse;

				$unit->addAllSystems();
				if (!$unit->ship){$unit->addSubUnits($possible[$i]["subunits"]);}
				$unit->setUnitState($this->turn, $this->phase);


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
			//Debug::log($db[$i]["name"]);
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

		$this->playerstatus = DBManager::app()->getDBPlayerStatus($gamedata["id"]);

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
			$this->handleBaseMovePhase();
			if ($this->hasFocusUnits()){
				$this->startFocusMovePhase();
			}
			else {
				$this->handleFocusMovePhase();
				$this->startFiringPhase();
			}
		}
		else if ($this->phase == 1){
			$this->handleFocusMovePhase();
			$this->startFiringPhase();
		}
		else if ($this->phase == 2){
			$this->handleFiringPhase();
			$this->startDamageControlPhase();
		}
		else if ($this->phase == 3){
			if ($this->handleDamageControlPhase()){
				if ($this->endTurn()){
					if ($this->startNewTurn()){
						$this->startDeployPhase();
					}	
				}
			}
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
		//if ($this->turn != $this->settings->reinforceTurn){return;}
		Debug::log("deleteAllReinforcements");
		DBManager::app()->deleteAllReinforcements($this->gameid); return;
	}
	
	public function pickReinforcements(){
		if ($this->turn != $this->settings->reinforceTurn){return;}
		Debug::log("pickReinforcements");
		$picks = array();
		$eta = $this->settings->reinforceETA;

		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			$data = array();
			$faction = $this->playerstatus[$i]["faction"];
			$entries = $this->getReinforcements($faction);
			$value = $this->playerstatus[$i]["value"];
			$total = 0;

			Debug::log("player: ".$this->playerstatus[$i]["userid"]." has ".$value." available");

			foreach ($entries as $entry){$total += $entry[1];}

			//Debug::log("total: ".$total);
			$add = $this->settings->reinforceAmount;

			while ($add){
				$current = 0;
				$roll = mt_rand(0, $total);
				//Debug::log("roll: ".$roll);

				foreach ($entries as $entry){
					$current += $entry[1];
					if ($roll > $current){continue;}
					$data = $entry[0]::getKit($faction);
					$data["name"] = $entry[0];
					$data["totalCost"] = $data["cost"];
					$data["moraleCost"] = $data["cost"];
					$data["notes"] = "";
					$data["userid"] = $this->playerstatus[$i]["userid"];
					$data["eta"] = $eta;

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
									//echo "name: ".$entry["name"].", value : ".$entry["name"]::$value.", amount: ".$entry["amount"]."</br>";
									$data["totalCost"] += floor($entry["name"]::$value * $entry["amount"]);
								}
							} else $data["upgrades"][$j]["units"] = array();
							
							foreach ($data["upgrades"][$j]["loads"] as $entry){
								//echo "name: ".$entry["name"].", value : ".$entry["name"]::$value.", amount: ".$entry["amount"]."</br>";
								$data["totalCost"] += floor($entry["name"]::$value * $entry["amount"]);
							}

							break;
						}
					}

					if (floor($data["totalCost"]) > floor($this->playerstatus[$i]["value"])){$add--; continue;}


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
		$this->resolveJumpOutActions();
		$this->handleInitialFireOrders();
		$this->handleDeployActions();
		$this->handleJumpInActions();
		$this->assembleDeployStates();
		$this->deleteAllReinforcements();
		DBManager::app()->deleteEmptyLoads($this->gameid);
	}

	public function handleDeployActions(){
		$data = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->available == $this->turn){
				if (sizeof($this->ships[$i]->actions) == 1 && $this->ships[$i]->actions[0]->type == "deploy"){
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

		if ($needCheck){
			$this->freeFlights();
			$this->adjustFleetMorale();	
			DBManager::app()->insertNewGlobalEntries($this->playerstatus);
		}
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
				$this->ships[$i]->actions[] = new Action(-1, $this->ships[$i]->id, $this->turn, "jumpIn", 0, $dist, $order->x + $xShift, $order->y + $yShift, $aShift, 0, 0, 0, 1, 1);
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

			$this->handleUnusedFires();
			$this->handleSalvoCreation();
			DBManager::app()->updateBallisticFireOrder($this->fires);
		}
	}

	public function handleUnusedFires(){
		Debug::log("handleUnusedFires");
		for ($i = 0; $i < sizeof($this->fires); $i++){
			if ($this->fires[$i]->weapon instanceof Hangar){
				$this->fires[$i]->resolved = 1;
			}
		}
	}

	public function handleSalvoCreation(){
		Debug::log("handleSalvoCreation");

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

			$units[] = array("gameid" => $this->gameid, "userid" => $this->fires[$i]->shooter->userid, "type" => "Salvo", "name" => "Salvo", "display" => "", "totalCost" => 0, "moraleCost" => 0, "turn" => $this->turn, "eta" => 0,
				"mission" => $mission, "actions" => array($move), "upgrades" => $upgrades);


		}

		if (sizeof($units)){
			DBManager::app()->updateSystemLoad($adjust);
			DBManager::app()->insertUnits($this->userid, $this->gameid, $units);
			for ($i = 0; $i < sizeof($units); $i++){
				//$this->ships[] = new Salvo($units[$i]["id"], $units[$i]["userid"], $this->turn, "", "deployed", 0, 0, 0, 0, 0, 0, 0, 0, "");
				$this->ships[] = new Salvo(
					array(
						"id" => $units[$i]["id"], "userid" => $units[$i]["userid"], "command" => 0, "available" => $this->turn, "display" => "", "totalCost" => 0, "moraleCost" => 0, "status" => "deployed",
						"destroyed" => 0, "x" => 0, "y" => 0, "facing" => 270, "delay" => 0, "thrust" => 0, 
						"rolling" => 0, "rolled" => 0, "flipped" => 0, "focus" => 0, "notes" => ""
					)
				);

				$this->ships[sizeof($this->ships)-1]->setUnitState($this->turn, $this->phase);
				$this->ships[sizeof($this->ships)-1]->actions[] = new Action(-1, $this->ships[$i]->id, $this->turn, "deploy", 0, 0, $units[$i]["actions"][0]["x"], $units[$i]["actions"][0]["y"], $a, 0, 0, 0, 1, 1);
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

	public function startFocusMovePhase(){
		//Debug::log("startFocusMovePhase");
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

	public function handleBaseMovePhase(){
		Debug::log("handleBaseMovePhase");
		$this->handleShipMovement();
		$this->freeFlights();
	}

	public function handleFocusMovePhase(){
		Debug::log("handleFocusMovePhase");
		$this->handleShipMovement();
		$this->handleFlightMovement();
		$this->handleSalvoMovement();
		$this->handleNewActions();

		$this->handlePostMoveFires();
		$this->updateMissions();
	}

	public function handlePostMoveFires(){
		Debug::log("handlePostMoveFires: ".sizeof($this->fires));


		for ($i = 0; $i < sizeof($this->ships); $i++){
			$this->ships[$i]->setFacing();
			$this->ships[$i]->setPosition();
			$this->ships[$i]->setImpulseProfileMod();
			$this->ships[$i]->setBonusNegation($this->turn);
		}

		
		$this->setFireOrderDetails();

		for ($i = 0; $i < sizeof($this->fires); $i++){
			Debug::log("handling fire: ".$this->fires[$i]->id.", weapon: ".$this->fires[$i]->weapon->display);
			if ($this->fires[$i]->resolved){continue;}

			if ($this->fires[$i]->weapon->aoe){
				$subFires = DmgCalc::createAreaFireOrders($this, $this->fires[$i]);

				for ($j = 0; $j < sizeof($subFires); $j++){
					//$subFires[$j]->target->resolveAreaFireOrder($subFires[$j]);
					$subFires[$j]->target->resolveFireOrder($subFires[$j]);
					$this->fires[$i]->hits++;
				}
				$this->fires[$i]->resolved = 1;
			}
			else {
				$this->fires[$i]->target->resolveFireOrder($this->fires[$i]);
			}
		}
		$this->handleResolvedFireData();
	}

	public function handleShipMovement(){
		Debug::log("handleShipMovement");
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->flight || $this->ships[$i]->salvo){continue;}
			if (!$this->ships[$i]->focus && $this->phase != 0){continue;}
			if ($this->ships[$i]->focus && $this->phase != 1){continue;}
			
			$this->ships[$i]->moveSet = 1;
			
			for ($j = sizeof($this->ships[$i]->actions)-1; $j >= 0; $j--){
				if ($this->ships[$i]->actions[$j]->resolved == 0){
					$this->ships[$i]->actions[$j]->resolved = 1;
				} else break 1;
			}
		}
		DBManager::app()->resolveMovementDB($this->ships);
	}

	public function handleFlightMovement(){
		Debug::log("handleFlightMovement");

		$flights = array();

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (!$this->ships[$i]->flight){continue;}
			$this->ships[$i]->mission->target = $this->getUnit($this->ships[$i]->mission->targetid);
			$flights[] = $this->ships[$i];
		}

		usort($flights, function($a, $b){
			if ($a->mission->type == 1){
				return -1;
			}
			else if ($a->mission->target->flight != $b->mission->target->flight){
				return $a->mission->target->flight - $b->mission->target->flight;
			}
			else if ($a->mission->target->flight && $b->mission->target->flight){
				return $a->mission->target->mission->target->flight - $b->mission->target->mission->target->flight;
			}
			else if ($a->mission->target->squad != $b->mission->target->squad){
				return $a->mission->target->squad - $b->mission->target->squad;
			}
			else if ($a->mission->target->ship != $b->mission->target->ship){
				return $a->mission->target->ship - $b->mission->target->ship;
			}
		});

		for ($i = 0; $i < sizeof($flights); $i++){
			$flights[$i]->setMove($this);
		}

		return;

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (!$this->ships[$i]->flight){continue;}
			$this->ships[$i]->setMove($this);
		}


		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (!$this->ships[$i]->flight){continue;}

			$this->mission->target = &$this->getUnit($this->mission->targetid);

			if ($this->mission->target->ship || $this->mission->target->squad){
				$this->ships[$i]->setMove($this);
			}
		}

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (!$this->ships[$i]->flight){continue;}
			$this->ships[$i]->setMove($this);
		}
	}

	public function handleSalvoMovement(){
		Debug::log("handleSalvoMovement");

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (!$this->ships[$i]->salvo){continue;}

			$this->ships[$i]->mission->target = $this->getUnit($this->ships[$i]->mission->targetid);
			$this->ships[$i]->setMove($this);
		}
	}

	public function assembleDeployStates(){
		Debug::log("assembleDeployStates");
		$states = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->available != $this->turn){continue;}
			$states[] = $this->ships[$i]->getDeployState($this->turn);
		}

		if (sizeof($states)){DBManager::app()->updateUnitState($states, $this->turn, $this->phase);}	
	}

	public function assembleEndStates(){
		//Debug::log("assembleEndStates");
		$states = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->available > $this->turn){continue;}
			$states[] = $this->ships[$i]->getEndState($this->turn);
		}

		if (sizeof($states)){DBManager::app()->updateUnitState($states, $this->turn, $this->phase);}
	}

	public function startFiringPhase(){
	//	Debug::log("startFiringPhase");
		$dbManager = DBManager::app();
		$this->phase = 2;

		if ($dbManager->setGameTurnPhase($this->gameid, $this->turn, $this->phase)){
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
		$this->testUnitCriticals();
		$this->testUnitMorale();
		$this->adjustFleetMorale();
		$this->testFleetMorale();
		$this->setPostFireFocusValues();

		$this->handleResolvedFireData();

		$time += microtime(true); 
		Debug::log("handleFiringPhase DONE time: ".round($time, 3)." seconds.");
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
		return true;
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
				$pos = $this->ships[$i]->getCurPos();
				$this->ships[$i]->mission->type = 1;
				$this->ships[$i]->mission->turn = $this->turn;
				$this->ships[$i]->mission->arrived = $this->turn;
				$this->ships[$i]->mission->targetid = 0;
				$this->ships[$i]->mission->x = $pos->x;
				$this->ships[$i]->mission->y = $pos->y;
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

			if ($this->ships[$i]->rolling){$this->ships[$i]->rolled = $this->ships[$i]->rolled ? 0 : 1;}
		}
	}

	public function doFullDestroyedCheck(){
		$this->doFirstDestroyedCheck(); // direct unit destruction
		$this->doSecondDestroyedCheck(); // indirect -> salvos without target
		$this->writeDestroyedStatus();
		$this->freeFlights();
	}

	public function doFirstDestroyedCheck(){
		//Debug::log("doFirstDestroyedCheck");
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->salvo && sizeof($this->ships[$i]->structures[0]->systems[0]->fireOrders)){ // impact salvo
				$this->ships[$i]->destroyed = true;
			}
			else if ($this->phase == 3 && $this->ships[$i]->salvo && $this->ships[$i]->structures[0]->torpedo){ // torps out of range
				Debug::log("Torpedo out of range!");
				$this->ships[$i]->destroyed = true;
			}
			else if (($this->ships[$i]->flight || $this->ships[$i]->salvo) && $this->ships[$i]->isDestroyed()){
				$this->ships[$i]->destroyed = true;
			}
		}
	}

	public function doSecondDestroyedCheck(){
		//Debug::log("doSecondDestroyedCheck");
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
		$this->handleFocusCost();
		$this->handleCommandTransfer();
		$this->handleFocusGain();
		$this->pickReinforcements();
		return true;
	}

	public function startDeployPhase(){
		$this->updatePlayerStatus("waiting");
	}

	public function setupShips(){
		Debug::log("setupShips");
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
								Debug::log("emitter: ".$emitter->id." vs salvo: ".$this->ships[$i]->id.", angle: ".$angle);
								if (Math::isInArc($angle, $start, $end)){
									//Debug::log("adding CC mask from ship vs salvo");
									$emitter->masks[] = array($this->ships[$i]->id, $emitter->getMaskEffect($this->ships[$i]));
									$skip = 1;
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
			//echo $this->fires[$i]->id; echo "</br>";
			$this->fires[$i]->weapon = $this->fires[$i]->shooter->getSystem($this->fires[$i]->weaponid);
			//var_export($this->fires[$i]->id);
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
				Debug::log("SKIPPING firorder, SINGLE (shooter) is destroyed");
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
					Debug::log("SKIPPING firorder, SINGLE (shooter) is destroyed");
					$this->fires[$i]->resolved = 1;
					continue;
				}
				$this->fires[$i]->target->resolveFireOrder($this->fires[$i]);
			}
		}

		return;
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
			DBManager::app()->insertFireOrders($fires);

			for ($i = 0; $i < sizeof($fires); $i++){
				Debug::log("ball fireorder ".$i);
				$fires[$i]->target->resolveFireOrder($fires[$i]);
			}
			$this->fires = array_merge($this->fires, $fires);
		}
	}

	public function testUnitCriticals(){
		Debug::log("----------------testUnitCriticals---------------");
		for ($i = 0; $i < sizeof($this->ships); $i++){
			//Debug::log($this->ships[$i]->name.", destroyed: ".$this->ships[$i]->destroyed);
			if ($this->ships[$i]->destroyed || $this->ships[$i]->available > $this->turn){continue;}
			$this->ships[$i]->doTestCrits($this->turn);
		}
	}

	public function testUnitMorale(){
		Debug::log("----------------testUnitMorale-------------------");
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->destroyed || $this->ships[$i]->available > $this->turn){continue;}
			$this->ships[$i]->setMorale($this->turn, $this->phase);
			$this->ships[$i]->doTestMorale($this->turn);
		}
	}

	public function adjustFleetMorale(){
		Debug::log("-----------------adjustFleetMorale--------------");
		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			$full = $this->playerstatus[$i]["morale"];
			Debug::log("max Morale: ".$full);

			for ($j = 0; $j < sizeof($this->ships); $j++){
				if ($this->ships[$j]->flight || $this->ships[$j]->salvo || $this->ships[$j]->available > $this->turn){continue;}
				if ($this->ships[$j]->userid != $this->playerstatus[$i]["userid"]){continue;}
				if (!$this->ships[$j]->triggersMoraleLoss()){continue;}

				$value = ceil($this->ships[$j]->getMoraleLossValue($this->phase) / $full * 100);

				Debug::log("unit #".$this->ships[$j]->id.", moraleCost: ".$this->ships[$j]->moraleCost.", value: ".$value);

				$this->playerstatus[$i]["globals"][] = array(
					"id" => 0,
					"playerstatusid" => $this->playerstatus[$i]["id"],
					"unitid" => $this->ships[$j]->id,
					"turn" => $this->turn,
					"type" => "Morale",
					"scope" => 1,
					"value" => -$value,
					"notes" => $this->ships[$j]->notes,
					"text" => $this->ships[$j]->getRoutString($this->phase)
				);

				$this->ships[$j]->notes = "";

			}
		}
	}

	public function testFleetMorale(){
		//this->turn = 1;

		$do = 1;

		while ($do){
			Debug::log("-----------------testFleetMorale--------------");
			$do--;
			for ($i = 0; $i < sizeof($this->playerstatus); $i++){
				$max = $this->playerstatus[$i]["globals"][0]["value"];
				$old = 0;
				$new = 0;
				//echo ($this->playerstatus[$i]["globals"]."\n");
				for ($j = 1; $j < sizeof($this->playerstatus[$i]["globals"]); $j++){
					if ($this->playerstatus[$i]["globals"][$j]["turn"] < $this->turn){
						$old -= $this->playerstatus[$i]["globals"][$j]["value"];
					}
					else {
						//$old += $this->playerstatus[$i]["globals"][$j]["value"];
						$new -= $this->playerstatus[$i]["globals"][$j]["value"];
					}
				}

				Debug::log("max: ".$max);
				Debug::log("new: ".$new);
				Debug::log("old: ".$old);
				$rel = round($new / ($max-$old), 2);
				Debug::log("player ".$i.", old: ".$old.", new: ".$new.", rel: ".$rel);
				if (!$rel){continue;}

				$crit = DmgCalc::moraleCritProcedure(0, 0, $this->turn, $rel, $this->const["morale"], $old+$new);

				$this->playerstatus[$i]["globals"][] = array(
					"id" => 0,
					"playerstatusid" => $this->playerstatus[$i]["id"],
					"unitid" => 0,
					"turn" => $crit->turn,
					"type" => $crit->type,
					"scope" => 2,
					"value" => $crit->value,
					"notes" => $crit->notes,
					"text" => ""
				);
			}
		}
	}

	public function handleFocusCost(){
		Debug::log("handleFocusCost");
		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			for ($j = 0; $j < sizeof($this->ships); $j++){
				if ($this->playerstatus[$i]["userid"] != $this->ships[$j]->userid){continue;}
				if ($this->ships[$j]->focus){
					$this->playerstatus[$i]["curFocus"] -= ceil($this->ships[$j]->moraleCost);
				}
			}
		}
	}

	public function handleFocusGain(){
		Debug::log("handleFocusGain");
		$data = array();

		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			$curFocus = $this->playerstatus[$i]["curFocus"];
			$gainFocus = $this->playerstatus[$i]["gainFocus"];

			$data[] = array(
				"id" => $this->playerstatus[$i]["id"],
				"curFocus" => min($this->playerstatus[$i]["maxFocus"], $curFocus + $gainFocus),
				"gainFocus" => $this->playerstatus[$i]["gainFocus"], 
				"maxFocus" => $this->playerstatus[$i]["maxFocus"]
			);
		}

		if (sizeof($data)){DBManager::app()->updateFocusValues($data);}
	}		

	public function setPostFireFocusValues(){
		//Debug::log("setPostFireFocusValues");
		$data = array();

		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			$units = array();
			for ($j = 0; $j < sizeof($this->ships); $j++){
				if ($this->playerstatus[$i]["userid"] != $this->ships[$j]->userid){continue;}
				if (!$this->ships[$j]->command){continue;}
				$units[] = $this->ships[$j];
			}
			
			usort($units, function($a, $b){
				return $b->command - $a->command;
			});

			$data[] = $this->getNewFocusValue($this->playerstatus[$i], $units[0]);
		}

		if (sizeof($data)){DBManager::app()->updateFocusValues($data);}
	}

	public function handleCommandTransfer(){
		//Debug::log("handleCommandTransfer");	
		$data = array();

		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			for ($j = 0; $j < sizeof($this->ships); $j++){
				if ($this->playerstatus[$i]["userid"] != $this->ships[$j]->userid){continue;}
				if ($this->ships[$j]->command != $this->turn){continue;}

				$data[] = $this->getNewFocusValue($this->playerstatus[$i], $this->ships[$j]);

				$this->playerstatus[$i]["curFocus"] = $data[sizeof($data)-1]["curFocus"];
				$this->playerstatus[$i]["gainFocus"] = $data[sizeof($data)-1]["gainFocus"];
				$this->playerstatus[$i]["maxFocus"] = $data[sizeof($data)-1]["maxFocus"];
			}
		}
	}

	public function getNewFocusValue($playerstatus, $unit){
		Debug::log("getNewFocusValue turn:".$this->turn.", phase: ".$this->phase.", cmd: ".$unit->name." #".$unit->id);

		$curFocus; $gainFocus;

		if ($unit->destroyed || $unit->status == "jumpOut"){
			Debug::log("CMD kill/flee!");
			$curFocus = 0; $gainFocus = 0;
		}
		else {
			if ($this->phase == -1 && $this->turn > 1 && $unit->command == $this->turn){
				Debug::log("Command has been transfered!");
				$playerstatus["curFocus"] = 0;
			}

			$output = 100;

			$command = $unit->getSystemByName("Command");
			$output += $command->getCrewEffect() * $command->getCrewLevel();
			$output += $command->getCritMod("Focus", $this->turn);

			$baseGain = floor($this->settings->pv / 100 * $this->settings->focusMod);
			$commandRating = ($unit->baseFocusRate + $unit->modFocusRate);

			$curFocus = $playerstatus["curFocus"];
			$gainFocus = floor($baseGain / 10 * $commandRating / 100 * $output * ($unit->faction == "Minbari Federation" ? 1.3 : 1));

			Debug::log("basegain: ".$baseGain.", commandRating: ".$commandRating.", command: ".$unit->name.", output: ".$output.", gain: ".$gainFocus);
		}

		return 
			array(
				"id" => $playerstatus["id"],
				"curFocus" => $curFocus,
				"gainFocus" => $gainFocus, 
				"maxFocus" => $gainFocus * 4
			);
	}

	public function handleResolvedFireData(){
		Debug::log("handleResolvedFireData");
		$newDmgs = $this->getAllNewDamages();
		$newCrits = $this->getAllNewCrits();
		$newMoves = $this->getAllNewForcedMoves();
		$unitMorales = $this->getNewUnitMoraleCrits();

		DBManager::app()->updateFireOrders($this->fires);
		if (sizeof($newDmgs)){DBManager::app()->insertDamageEntries($newDmgs);}
		if (sizeof($newCrits)){DBManager::app()->insertCritEntries($newCrits);}
		if (sizeof($newMoves)){DBManager::app()->insertServerActions($newMoves);}
		if (sizeof($unitMorales)){DBManager::app()->updateUnitStatusNotes($unitMorales);}
		if ($this->hasNewGlobalEntries()){DBManager::app()->insertNewGlobalEntries($this->playerstatus);}
	}

	public function hasNewGlobalEntries(){
		for ($i = 0; $i < sizeof($playerstatus); $i++){
			for ($j = 0; $j < sizeof($playerstatus[$i]["globals"]); $j++){
				if ($playerstatus[$i]["globals"][$j]["id"]){continue;}
				return true;
			}
		}
		return false;
	}

	public function getAllNewForcedMoves(){
		$data = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			$data = array_merge($data, $this->ships[$i]->getNewForcedMoves($this->turn));
		}
		return $data;
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
	
	public function getNewUnitMoraleCrits(){
		//Debug::log("getNewUnitMoraleCrits");
		$data = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->destroyed || $this->ships[$i]->flight || $this->ships[$i]->salvo){continue;}
			if (!strlen($this->ships[$i]->notes)){continue;}
			//if ($this->ships[$i]->status != "jumpOut"){continue;}
			$data[] = array("id" => $this->ships[$i]->id, "status" => $this->ships[$i]->status, "notes" => $this->ships[$i]->notes);
		}
		return $data;
	}

	public function startDamageControlPhase(){
		//Debug::log("startDamageControlPhase");

		$this->phase = 3;

		DBManager::app()->resetFocuState($this->ships);
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
		return array("Earth Alliance", "Centauri Republic", "Minbari Federation", "Narn Regime");
	}

	public function getFactionData($faction){
		//Debug::log("getFactionData");

		$notes = array();
		$units = array(array(), array(), array(), array());
		$return = array(array(), array(), array(), array(), array());
		$specials = array();

		switch ($faction){ // units and suqadies
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
						"Kutai",
					),
					array(
						"Mograth",
						"Darkner",
						"Vorchan",
						"Vorchora",
						"Haven",
					),
					array(
						"Sentri",
						"Sitara",
					),
					array(
						"Hasta",
						"Javelin",
						"Triarii",
						"Myrmidon",
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

		switch ($faction){ // specials
			case "Earth Alliance": 
				$notes = array(
					array("Inpenetrable", "By trading energy, units can temporary empower their armour, making them far more resistent to damage."),
					array("Coordination", "Rapid response times within the existing chain of command grants increased flexibility for formation tactics.</br> Squadrons have a total of 12 slot points."),
					//array("Insurmountable", "An array of networked turrets will provide dedicated point defense to every unit."),
				);
			break;
			case "Centauri Republic"; 
				$notes = array(
					array("Wolfpack", "Excelling at wolfpack tactics results in each Squadrons with at least 3 units being 15 % less expensive."),
					array("Hit and Run", "Specialized battle doctrine and starship design yield a 20 % cost reduction for every non-turning move action")
				);
			break;
			case "Minbari Federation";
				$notes = array(
					array("Advanced", "Highly advanced tech allow easy overpowering of hostile sensors. EW is considered to be originating from a unit 2 levels larger."),
					array("Enlightened", "Superior tactical capabilities and officer training result in 30 % increased Focus gain. Unit starting morale increased to 115.")
				);
			break;
			case "Narn Regime";
				$notes = array(
					array("Iron Will", "Narn by nature will hardly ever flee from a battle until the very last moment. Initital morale for units 125, for fleet 115."),
					array("Tenacity", "Narn pilots are known for their reckless determination. Strikecraft are far less susceptible to dropping out (120 -> 160).")
				);
			break;
		}

		switch ($faction){
			case "Earth Alliance";
				$specials = array("squadronSlots" => 12);
				break;
			case "Centauri Republic";
				$specials = array("squadronSlots" => 10);
				break;
			case "Minbari Federation";
				$specials = array("squadronSlots" => 10);
				break;
			case "Narn Regime";
				$specials = array("squadronSlots" => 10);
				break;
			default:
				break;
		}

		$return[0] = $notes; // notes

		for ($i = 0; $i < sizeof($units[0]); $i++){ //ships
			$name = $units[0][$i];
			$unit = new $name(1, 0, 0, 0, "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, "");
			$data = array(
				"name" => $unit->name,
				"value" => $unit::$value,
				"ep" => $unit->ep,
				"ew" => $unit->ew,
				"eta" => 0
			);
			$return[1][] = $data;
		}

		for ($j = 0; $j < sizeof($units[1]); $j++){ // squadies
			$unit = new $units[1][$j](1, 1);
			$data = array(
				"name" => $unit->name,
				"value" => $unit::$value,
				"ep" => $unit->ep,
				"ew" => $unit->ew,
				"space" => $unit->space,
				"eta" => 0
			);
			$return[2][] = $data;
		}

		for ($i = 0; $i < sizeof($units[2]); $i++){ // fightes
			$fighter = new $units[2][$i](0, 0);
			$return[3][] = $fighter;
		}
		for ($i = 0; $i < sizeof($units[3]); $i++){ // missiles
			$ballistic = new $units[3][$i](0, 0);
			$return[4][] = $ballistic;
		}

		$return[5] = $specials;


		return $return;
	}

	public function getReinforcements($faction){
		//Debug::log("getUnitsForFaction");
		$units = array();

		switch ($faction){
			case "Earth Alliance";
				$units = array(
					array("Omega", 3, 6),
					array("Hyperion", 7, 5),
					array("Avenger", 3, 6),
					array("Artemis", 10, 3),
					array("Olympus", 10, 3),
					array("Squadron", 15, 2),
				);
				break;
			case "Centauri Republic";
				$units = array(
					array("Primus", 3, 6),
					array("Centurion", 7, 6),
					array("Kutai", 10, 3),
					array("Altarian", 10, 3),
					array("Demos", 10, 3),
					array("Squadron", 15, 2),
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
					array("GQuan", 3, 2),
					array("GSten", 6, 3),
					array("KaToc", 8, 3),
					array("Rongoth", 8, 3),
					array("DagKar", 4, 3),
					array("Squadron", 15, 2),
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
					"id" => $get["purchases"], "userid" => 1, "command" => 0, "available" => 0, "display" => "", "status" => "", "totalCost" => 0,"moraleCost" => 0,
					"destroyed" => 0, "x" => 0, "y" => 0, "facing" => 270, "delay" => 0, "thrust" => 0, 
					"rolling" => 0, "rolled" => 0, "flipped" => 0, "focus" => 0, "notes" => ""
				)
			);
			$unit->addAllSystems();
			$unit->setUnitState(0, 0);
		}
		elseif ($get["unit"] == "squaddie"){
			$unit = new $get["name"]($get["index"]+1, $get["purchases"]);
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

	static function getPostBuyPV($units){
		$totalCost = 0;
		for ($i = 0; $i < sizeof($units); $i++){
			$totalCost += $units[$i]["totalCost"];
		}
		//Debug::log("totalCost: ".$totalCost);
		return $totalCost;
	}

	static function getMoraleValue($units){
		$moraleCost = 0;
		for ($i = 0; $i < sizeof($units); $i++){
			$moraleCost += $units[$i]["moraleCost"];
		}
		//Debug::log("totalCost: ".$totalCost);
		return $moraleCost;
	}
}
?>
