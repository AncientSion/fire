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

		public $ships = array();
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
			"fleetMoraleEffects" => array(
				array("Morale", 30, 0, -5.00),
				array("Morale", 60, 0, -15.00),
				array("Morale", 100, 0, -25.00),
				array("Rout", 150, 0, 0.00)
			),
			"collision" => array(
				"hitMod" => 0.22
			)
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
		//$this->setupShips(); return;
		//$this->testUnitMorale(); return;
		//$this->setPostFireFocusValues(); return;
		//$this->testFleetMorale();
		//if ($this->hasNewGlobalEntries()){DBManager::app()->insertNewGlobalEntries($this->playerstatus);}

		//foreach ($this->ships as $ship){
		//	if (isset($ship->mission)){var_export($ship->mission);}
		//}

		if (!$this->settings || !$this->settings->turn){return false;}
		
		$data = array(
			"id" => $this->gameid,
			"turn" => $this->turn,
			"phase" => $this->phase,
			"ships" => $this->getUnitDataForClient(),
			"reinforcements" => $this->reinforcements,
			"incoming" => $this->getIncomingData(),
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


			if ($this->phase == 3){$this->ships[$i]->focus = 0;}

			if ($this->ships[$i]->available == $this->turn && $this->phase == -1){
				if ($this->ships[$i]->flight){
					array_splice($this->ships, $i, 1);
				}
				else if ($this->turn > 1){
					if ($this->ships[$i]->userid != $this->userid){
						//Debug::log("a!");
						$this->incoming[] = $this->ships[$i];
						array_splice($this->ships, $i, 1);
					}
					else {
						//Debug::log("b!");
						$this->incoming[] = $this->ships[$i];
					}
				}
			}
			else if ($this->ships[$i]->available > $this->turn){
				$this->incoming[] = $this->ships[$i];
				//Debug::log("c!");
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
					$this->ships[$i]->hideSpecials($this->turn);
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
					if ($this->ships[$i]->flight){ // flights pick firemode in firing phase
						$this->ships[$i]->hideAllPowers($this->turn);
					}
				} break;
			case 3:
				for ($i = 0; $i < sizeof($this->ships); $i++){
					if ($this->ships[$i]->command > $this->turn){$this->ships[$i]->command = 0;}
					//$this->ships[$i]->hideWithdrawal($this->phase);
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
					"callsign" => $possible[$i]["callsign"],
					"totalCost" => $possible[$i]["totalCost"],
					"moraleCost" => $possible[$i]["moraleCost"],
					"status" => $possible[$i]["status"],
					"command" => $possible[$i]["command"],
					"available" => $this->turn + $possible[$i]["available"],
					"withdraw" => $possible[$i]["withdraw"],
					"manual" => $possible[$i]["manual"],
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

		$this->userid = 0;
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

		if ($this->phase == -2){
			$this->startNewTurn();
			$this->startDeployPhase();
		}
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
			if ($this->ships[$i]->focus || $this->ships[$i]->flight){return true;}
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
		//Debug::log("pickReinforcements");
		$picks = array();
		$eta = $this->settings->reinforceETA;

		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			$data = array();
			$entries = $this->getReinforcements($this->playerstatus[$i]["faction"]);
			$entries[] = "Squadron";
			$value = $this->playerstatus[$i]["value"];
			$total = 0;

			//Debug::log("player: ".$this->playerstatus[$i]["userid"]." has ".$value." available");

			foreach ($entries as $entry){$total += $entry::$odds;}

			//Debug::log("totalOdds: ".$total);
			$add = $this->settings->reinforceAmount;
			$add = 5;
			while ($add){
				$current = 0;
				$roll = mt_rand(0, $total);
				//Debug::log("roll: ".$roll);

				foreach ($entries as $entry){
					//Debug::log("current at ".$current.", adding ".$entry::$odds." for ".$entry);
					$current += $entry::$odds;
					if ($roll > $current){Debug::log("rolled higher"); continue;}
					//Debug::log("picking!");
					$data = $entry::getKit($this->playerstatus[$i]["faction"]);
					$data["name"] = $entry;
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
									$data["moraleCost"] += floor($entry["name"]::$value * $entry["amount"]);
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

					//Debug::log("adding pick: ".$data["name"]);
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

		$this->handleInitialFireOrders();
		$this->handleDeployActions();
		$this->handleJumpIn();
		$this->destroyJumpedUnits();
		$this->assembleDeployStates();
		$this->deleteAllReinforcements();

		if ($this->turn == 1){
			$this->setPostFireFocusValues();
		}

		DBManager::app()->deleteEmptyLoads($this->gameid);
	}

	public function handleJumpOutAction(){
		Debug::log("handleJumpOutAction");

		for ($i = 0; $i < sizeof($this->ships); $i++){
			$l = sizeof($this->ships[$i]->actions)-1;
			if ($l < 0){continue;}
			if ($this->ships[$i]->actions[$l]->type == "jumpOut" && !$this->ships[$i]->actions[$j]->forced){
				$this->ships[$i]->withdraw = $this->turn +2;
				$this->ships[$i]->manual = 1;
			}
		}
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

	public function destroyJumpedUnits(){
		Debug::log("destroyJumpedUnits");

		$needCheck = false;

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->withdraw == $this->turn){
				$this->ships[$i]->status = "jumpOut";
				$this->ships[$i]->destroyed = true;
				$needCheck = true;
			}
		}

		if ($needCheck){
			$this->freeFlights();
			$this->doFullDestroyedCheck();
		}
	}

	public function handleMoraleReinforcing(){
		Debug::log("handleMoraleReinforcing");

		$needCheck = false;

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->isReinforcing($this->turn, $this->phase)){
				$needCheck = true;
			}
		}

		if ($needCheck){
			Debug::log("need");
			return true;
		} return false;
	}

	public function handleJumpIn(){
		Debug::log("handleJumpIn");
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

		if ($this->turn > 1){
			$this->adjustFleetMorale();
			DBManager::app()->insertNewGlobalEntries($this->playerstatus);
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
				$this->fires[$i]->resolved = 2;
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
				$this->fires[$i]->setWeaponShots();
				$this->fires[$i]->resolved = 2;
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
			//$devi = Math::getPointInDirection($this->fires[$i]->shooter->size/3, $a, $sPos->x + mt_rand(-10, 10), $sPos->y + mt_rand(-10, 10));
			$mission = array("type" => 2, "turn" => $this->turn, "targetid" => $this->fires[$i]->targetid, "x" => $tPos->x, "y" => $tPos->y, "arrived" => 0, "new" => 1);
			$move = array("turn" => $this->turn, "type" => "deploy", "dist" => 0, "x" => $sPos->x, "y" => $sPos->y, "a" => $a, "cost" => 0, "delay" => 0, "costmod" => 0, "resolved" => 0);
			$upgrades = array(array("active" => 1, "shipid" => $this->fires[$i]->shooter->id, "systemid" => $this->fires[$i]->weapon->id, "units" => array(0 => array("amount" => $this->fires[$i]->shots, "name" => $name))));

			$units[] = array("gameid" => $this->gameid, "userid" => $this->fires[$i]->shooter->userid, "type" => "Salvo", "name" => "Salvo", "callsign" => "", "totalCost" => 0, "moraleCost" => 0, "turn" => $this->turn, "eta" => 0, "mission" => $mission, "actions" => array($move), "upgrades" => $upgrades);


		}

		if (sizeof($units)){
			DBManager::app()->updateSystemLoad($adjust);
			DBManager::app()->insertUnits($this->userid, $this->gameid, $units);
			for ($i = 0; $i < sizeof($units); $i++){
				//$this->ships[] = new Salvo($units[$i]["id"], $units[$i]["userid"], $this->turn, "", "deployed", 0, 0, 0, 0, 0, 0, 0, 0, "");
				$this->ships[] = new Salvo(
					array(
						"id" => $units[$i]["id"], "userid" => $units[$i]["userid"], "command" => 0, "available" => $this->turn, "withdraw" => 0, "manual" => 0, "callsign" => "",
						"totalCost" => 0, "moraleCost" => 0, "status" => "deployed", "destroyed" => 0, "x" => 0, "y" => 0, "facing" => 270, "delay" => 0, "thrust" => 0, 
						"rolling" => 0, "rolled" => 0, "flipped" => 0, "focus" => 0, "notes" => ""
					)
				);

			//	$this->ships[sizeof($this->ships)-1]->setUnitState($this->turn, $this->phase);

				$this->ships[sizeof($this->ships)-1]->actions[] = new Action(-1, $this->ships[$i]->id, $this->turn, "deploy", 0, 0, $units[$i]["actions"][0]["x"], $units[$i]["actions"][0]["y"], $a, 0, 0, 0, 1, 1);
			}
		}
	}

	public function startMovementPhase(){
		//Debug::log("startShipMovementPhase");
		$this->phase = 0;

		if (DBManager::app()->setGameTurnPhase($this->gameid, $this->turn, $this->phase)){
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

	public function handleServerNewActions(){
		$newMoves = array();

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->ship || $this->ships[$i]->squad){continue;}
			if (!$this->ships[$i]->hasMoved()){continue;}		
			if (!$this->ships[$i]->actions[sizeof($this->ships[$i]->actions)-1]->new){continue;}
			$newMoves[] = $this->ships[$i]->actions[sizeof($this->ships[$i]->actions)-1];
		}

		if (sizeof($newMoves)){
			DBManager::app()->insertServerActions($newMoves);
		}
	}

	public function updateMissions(){
		$data = array();

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->mission){
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
		$this->handleServerNewActions();

		$this->handleCollisions();

		$this->setupShips();

		$this->setFireOrderDetails();
		$this->handlePostMoveAreaFires();
		$this->resolveShipFireOrders();

		$newDmgs = $this->getAllNewDamages();
		$newForcedMoves = $this->getAllNewForcedMoves();
		DBManager::app()->updateFireOrders($this->fires);
		if (sizeof($newDmgs)){DBManager::app()->insertDamageEntries($newDmgs);}
		if (sizeof($newForcedMoves)){DBManager::app()->insertServerActions($newForcedMoves);}

		$this->updateMissions();
	}

	public function handlePostMoveAreaFires(){
		Debug::log("handlePostMoveAreaFires: ".sizeof($this->fires));

		$newFires = array();

		for ($i = 0; $i < sizeof($this->fires); $i++){
			if ($this->fires[$i]->resolved){continue;}
			if ($this->fires[$i]->targetid){continue;}
			$subFires = DmgCalc::createAreaFireOrders($this, $this->fires[$i]);
			//Debug::log("got ".sizeof($subFires)." new fires");
			$newFires = array_merge($newFires, $subFires);

			$this->fires[$i]->resolved = 1;
		}

		if (sizeof($newFires)){
			//Debug::log("merging to this->fires");
			//Debug::log("putting into DB and merging to this->fires");
			DBManager::app()->insertFireOrders($newFires);
			$this->fires = array_merge($this->fires, $newFires);
		}	
	}

	public function handleShipMovement(){
		Debug::log("handleShipMovement");
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->flight || $this->ships[$i]->salvo || $this->ships[$i]->obstacle){continue;}
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
		$patrols = array();

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (!$this->ships[$i]->flight){continue;}
			if ($this->ships[$i]->mission->type == 1){$patrols[] = $this->ships[$i]; continue;}
			$this->ships[$i]->mission->target = $this->getUnit($this->ships[$i]->mission->targetid);
			$flights[] = $this->ships[$i];
		}

		usort($flights, function($a, $b){
			if ($a->mission->target->flight != $b->mission->target->flight){
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

		for ($i = 0; $i < sizeof($patrols); $i++){
			$patrols[$i]->setMove($this);
		}

		for ($i = 0; $i < sizeof($flights); $i++){
			$flights[$i]->setMove($this);
		}

		return;
	}

	public function handleSalvoMovement(){
		Debug::log("handleSalvoMovement");

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (!$this->ships[$i]->salvo){continue;}

			$this->ships[$i]->mission->target = $this->getUnit($this->ships[$i]->mission->targetid);
			$this->ships[$i]->setMove($this);
		}
	}

	public function handleObstacleMovement(){
		Debug::log("handleObstacleMovement");

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (!$this->ships[$i]->obstacle){continue;}
			$this->ships[$i]->setMove($this);
		}
	}

	public function handleCollisions(){
		Debug::log("handleCollisions");

		for ($i = 0; $i < sizeof($this->ships); $i++){
			$this->setCollisionForSingleUnit($this->ships[$i]);
		}

		$newFires = array();

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (!$this->ships[$i]->obstacle){continue;}
			//Debug::log("unit #".$this->ships[$i]->id);
			$newFires = array_merge($newFires, $this->ships[$i]->collisions);
			//for ($j = 0; $j < sizeof($this->ships[$i]->collisions); $j++){
				//Debug::log("collides with #".$this->ships[$i]->collisions[$j]->targetid);
			//}
		}

		if (sizeof($newFires)){
			DBManager::app()->insertFireOrders($newFires);
		}	$this->fires = array_merge($this->fires, $newFires);
	}

	public function setCollisionForSingleUnit($unit){
		if ($unit->obstacle){return;}
		//if ($unit->flight || $unit->salvo){return;}
		Debug::log("setCollisionForSingleUnit for unit #".$unit->id);
		$unit->collides = array();
		$unitPos = $unit->getTurnStartPosition();
		$unitSpeed = $unit->getCurSpeed();

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (!$this->ships[$i]->obstacle){continue;}

			$obstacle = $this->ships[$i];
			$tPos = $obstacle->getCurPos();
			$totalDist = 0;
			$distBetween = Math::getDist2($unitPos, $tPos) - $obstacle->size/2 - $unitSpeed;

			if ($distBetween > 200){continue;}


			Debug::log("obstacle ".$obstacle->id.", pos: ".$tPos->x."/".$tPos->y.", dist between ".$distBetween);

			for ($j = 0; $j < sizeof($unit->actions); $j++){
				$action = $unit->actions[$j];
				if ($action->type != "move"){continue;}
				$oPos = $j == 0 ? $unitPos : $unit->actions[$j-1];

				$result = Math::isInPath($oPos, $action, $tPos, $obstacle->size/2);
				if (!$result){continue;}

				$enter = false;
				$leave = false;
				$distInside = 0;

				if ($result["points"][0][1]){
					//Debug::log("enter!");
					$enter = true;
				}
				if ($result["points"][1][1]){
					//Debug::log("leave!");
					$leave = true;
				}

				if ($enter && $leave){
					//Debug::log("1!");
					$distInside = Math::getDist2($result["points"][0][0], $result["points"][1][0]);
				}
				else if ($enter){
					//Debug::log("2!");
					$distInside = Math::getDist2($result["points"][0][0], $action);
				}
				else if ($leave){
					//Debug::log("3!");
					$distInside = Math::getDist2($oPos, $result["points"][1][0]);
				}
				else {
					//Debug::log("4!");
					$start = Math::getDist2($oPos, $tPos);
					$end = Math::getDist2($action, $tPos);
					if ($start < $obstacle->size/2 && $end < $obstacle->size/2){
					//Debug::log("5!");
						$distInside += $action->dist;
					}
				}

				$totalDist += $distInside;
				//Debug::log("totalDist ".$totalDist);
			}
	


			if (!$totalDist){continue;}

		/*	$weaponid = 2;
			$req = $this->ships[$i]->collision / 100 * $totalDist;
			$string = (round($totalDist).";".$this->ships[$i]->collision.";".round($req).";");
			$shots = round($this->ships[$i]->getSystem(2)->getShots($this->turn) * (1 + (0.3 * ($unit->traverse-4))));
		*/	
			$weaponid = 2;
			$req = $this->ships[$i]->collision * (1 + ($this->const["collision"]["hitMod"] * ($unit->traverse-4)));
			$string = (round($totalDist).";".$this->ships[$i]->collision.";".round($req).";");
			$shots = ceil($this->ships[$i]->getSystem(2)->getShots($this->turn) / 100 * $totalDist);

			Debug::log($req."/".$string."/".$shots);

			$fire = new FireOrder(
				//$id, $gameid, $turn, $shooter, $target, $x, $y, $weapon, $shots, $req, $notes, $hits, $res
				0, $this->gameid, $this->turn, $this->ships[$i]->id, $unit->id, 0, 0, 2, $shots, $req, $string, 0, 0
			);
			$this->ships[$i]->collisions[] = $fire;
		}
	}

	public function assembleDeployStates(){
		Debug::log("assembleDeployStates");
		$states = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->available != $this->turn && !$this->ships[$i]->obstacle){continue;}// jumpin or field move
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
		$this->sortFiringPhaseFires();
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
		$this->handleJumpOutAction();
		$this->handleJumpImminentUnits();
		return true;
	}

	public function handleJumpImminentUnits(){
		Debug::log("handleJumpImminentUnits");

		$needCheck = false;

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->withdraw == $this->turn+1){
				$this->ships[$i]->status = "jumpOut";
				$needCheck = true;
			}
		}

		if ($needCheck){
			$this->adjustFleetMorale();
			DBManager::app()->insertNewGlobalEntries($this->playerstatus);
		}
	}

	public function endTurn(){
		Debug::log("endTurn");
		$this->setUnitRollState();
		$this->doFullDestroyedCheck();
		$this->assembleEndStates();
		return true;
	}
	
	public function freeFlights(){
		Debug::log("freeFlights");
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
		$this->handleObstacleMovement();
		$this->handleServerNewActions();

		return true;
	}

	public function startDeployPhase(){
		$this->updatePlayerStatus("waiting");
	}

	public function setupShips(){
		$data = array();

		Debug::log("setupShips");
		for ($i = 0; $i < sizeof($this->ships); $i++){
			$this->ships[$i]->setFacing();
			$this->ships[$i]->setPosition();
			//$this->ships[$i]->setCurSpeed($this->turn, $this->phase);
			$this->ships[$i]->setImpulseProfileMod();
			$this->ships[$i]->setBonusNegation($this->turn);
			$this->ships[$i]->setJamming($this->turn);
		}

		for ($i = 0; $i < sizeof($this->ships); $i++){
			$oPos = $this->ships[$i]->getCurPos();
			//Debug::log("COMPARING ".$this->ships[$i]->id." / " .$this->ships[$i]->display);
			//Debug::log("position #".$this->ships[$i]->id.": ".$oPos->x."/".$oPos->y);
			for ($j = $i+1; $j < sizeof($this->ships); $j++){
				if ($this->ships[$i]->userid == $this->ships[$j]->userid){continue;}
				$tPos = $this->ships[$j]->getCurPos();
				$dist = Math::getDist2($oPos, $tPos);
				
				$this->ships[$i]->distances[] = array($this->ships[$j]->id, $dist);
				$this->ships[$j]->distances[] = array($this->ships[$i]->id, $dist);

				$this->ships[$i]->angles[] = array($this->ships[$j]->id, round(Math::getAngle2($oPos, $tPos)));
				$this->ships[$j]->angles[] = array($this->ships[$i]->id, round(Math::getAngle2($tPos, $oPos)));

				$obstacles = array();

				if ($this->ships[$i]->obstacle || $this->ships[$j]->obstacle){continue;}
				if ($this->phase != 2){continue;}
				if ($oPos->x == $tPos->x && $oPos->y == $tPos->y){Debug::log("same position, continue"); continue;}
				//Debug::log("TO ".$this->ships[$j]->id." / " .$this->ships[$j]->display);
				//Debug::log("position #".$this->ships[$j]->id.": ".$tPos->x."/".$tPos->y);

				for ($k = 0; $k < sizeof($this->ships); $k++){
					if (!$this->ships[$k]->obstacle){continue;}

					$blockPos = $this->ships[$k]->getCurPos();
					//Debug::log("checking if ".$this->ships[$k]->display." / " .$this->ships[$k]->id." is in path");
					//Debug::log("position #".$this->ships[$j]->id.": ".$blockPos->x."/".$blockPos->y);


					$result = Math::isInPath($oPos, $tPos, $blockPos, $this->ships[$k]->size/2);

					//$data[] = $result;
					//continue;

									
					if ($result){ //return array($dt, $in, $out);
						$pierceIn = 0;
						$pierceOut = 0;
						$realDist = 0;

						if ($result["points"][0][1] == 1){
							//Debug::log("pierceIn onLine");
							$pierceIn = Math::getDist2($tPos, $result["points"][0][0]);
						}

						if ($result["points"][1][1] == 1){
							//Debug::log("pierceOut onLine");
							$pierceOut = Math::getDist2($tPos, $result["points"][1][0]);
						}

						if ($pierceIn){
							$realDist = abs($pierceOut - $pierceIn);
						}
						else if( $pierceOut){
							$realDist = Math::getDist2($oPos, $result["points"][1][0]);
						}
						else if (!$pierceIn && !$pierceOut){

						}
						else $realDist = $result[0];

						//Debug::log("pierceIn ".$pierceIn); Debug::log("pierceOut ".$pierceOut);	Debug::log("real ".$realDist);



						if (!$realDist){continue;}

						$effInterference = round($this->ships[$k]->interference / 100 * $realDist);
						//$effectiveBlock = 100;
						//Debug::log("effInterference ".$effInterference);
						$this->ships[$i]->blocks[] = array($this->ships[$j]->id, $effInterference);
						$this->ships[$j]->blocks[] = array($this->ships[$i]->id, $effInterference);

						/*$data = array(
							"id" => $this->ships[$k]->id, 
							"dist" => $result[1]*2,
							"size" => $this->ships[$k]->size,
							"exposure" => round((1-($result[1] / ($this->ships[$k]->size/2)))*100),
							"effInterference" => round($this->ships[$k]->interference / 100 * $result[1]*2),
							"interference" => $this->ships[$k]->interference
						);*/
						
					}
				}
			}
		}

		//return $data;


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

	public function setLocks($origin){
		if ($origin->salvo || $origin->obstacle){}
		else if ($origin->flight && $origin->mission->arrived){
			//Debug::log("setLocks for FLIGHT #".$origin->id);
			for ($i = 0; $i < sizeof($this->ships); $i++){
				if ($this->ships[$i]->id == $origin->id || $origin->userid == $this->ships[$i]->userid){continue;}
				for ($j = 0; $j < sizeof($origin->cc); $j++){
					if ($origin->cc[$j] == $this->ships[$i]->id){
						if ($this->ships[$i]->ship || $this->ships[$i]->squad){
							if ($origin->mission->targetid == $this->ships[$i]->id){ // strike fighter evades shots from its target (ship)
								$origin->masks[] = array($this->ships[$i]->id, $origin->getLockEffect($this->ships[$i]));
								//Debug::log("setting flight mask vs ship target");
							}
						}
						else if ($this->ships[$i]->flight){
							if ($origin->mission->targetid == $this->ships[$i]->id || $origin->mission->type == 1){ // mission direct target lock OR patrol 
								$origin->locks[] = array($this->ships[$i]->id, $origin->getLockEffect($this->ships[$i]));
							}
							else if ($origin->mission->targetid == $this->ships[$i]->mission->targetid && $origin->userid == $this->getUnit($origin->mission->targetid)->userid){ //escorting flight
								$origin->locks[] = array($this->ships[$i]->id, $origin->getLockEffect($this->ships[$i]));
							}
							else if ($this->ships[$i]->mission->type == 1 && $this->ships[$i]->mission->arrived){
								$origin->locks[] = array($this->ships[$i]->id, $origin->getLockEffect($this->ships[$i]));
							}
						}
						else if ($this->ships[$i]->salvo){ // if flight in patrol vs salvo || flight in escort duty vs salvo
							if ($origin->mission->type == 1 || $this->ships[$i]->mission->targetid != $origin->id){
								$origin->locks[] = array($this->ships[$i]->id, $origin->getLockEffect($this->ships[$i]));
							}
						}
					}
				}
			}
		}
		else if ($origin->ship || $origin->squad){
			//Debug::log("____________________EW for ".$origin->display." #".$origin->id);
			$oPos = $origin->getCurPos();
			$sensor =  $origin->getSystemByName("Sensor");
			$ew = $sensor->getEW($this->turn);
			if ($sensor->destroyed || $sensor->disabled  || !$ew){
				return;
			}
			else if ($ew->type == 2 || $ew->type == 3){
				for ($i = 0; $i < sizeof($this->ships); $i++){
					if ($this->ships[$i]->id == $origin->id || $origin->userid == $this->ships[$i]->userid){continue;}
					switch ($ew->type){
						case 2: $origin->locks[] = array($this->ships[$i]->id, $this->const["ew"]["effect"][$ew->type]); break;
					}
				}
			}
			else {
				$start = 0;
				$end = 360;
				$w;

				if ($ew->angle == -1){
					$w = 180;
					//Debug::log("specific EW for ship #".$origin->id.", 360 arc");
				}
				else {
					$str = $sensor->getOutput($this->turn);
					$w = min(180, $this->const["ew"]["len"] * pow($str/$ew->dist, $this->const["ew"]["p"]));
					$start = Math::addAngle(0 + $w-$origin->getFacing(), $ew->angle);
					$end = Math::addAngle(360 - $w-$origin->getFacing(), $ew->angle);
					//Debug::log("specific EW for ship #".$origin->id.", str: ".$str.", facing: ".$origin->getFacing().", w: ".$w.", EW @ ".$ew->angle." -> from ".$start." to ".$end.", dist: ".$ew->dist);
				}

				for ($i = 0; $i < sizeof($this->ships); $i++){
					$skip = 0;
					if ($this->ships[$i]->id == $origin->id || $origin->userid == $this->ships[$i]->userid){continue;}
					if ($this->ships[$i]->obstacle){continue;}

					if (sizeof($origin->cc)){
						if ($ew->type == 0){ // specific OW versus close combat
							for ($j = 0; $j < sizeof($origin->cc); $j++){
								if ($origin->cc[$j] == $this->ships[$i]->id){
									if ($this->ships[$i]->flight){ // flight
										$multi = $origin->getLockEffect($this->ships[$i]) / 180 * $w;
										//Debug::log("adding CC lock from ship #".$origin->id." vs flight# #".$this->ships[$i]->id." for value: ".$multi);

										$origin->locks[] = array($this->ships[$i]->id, $multi);
										$skip = 1; break;
									}
									else if ($this->ships[$i]->salvo){ // salvo, in trajectory ?
										$angle = Math::getAngle2($origin, $this->ships[$i]->getTurnStartPosition());
										if (Math::isInArc($angle, $start, $end)){
											//Debug::log("adding CC lock from ship vs salvo");
											$origin->locks[] = array($this->ships[$i]->id, $origin->getLockEffect($this->ships[$i]));
											$skip = 1; break;
										}
									}
								}
							}
						}
						else if ($ew->type == 1){ // ship MASK in cc, only working against salvo ATM
							if ($this->ships[$i]->salvo){ // salvo, in trajectory ?
								$angle = Math::getAngle2($origin, $this->ships[$i]->getTurnStartPosition());
								Debug::log("emitter: ".$origin->id." vs salvo: ".$this->ships[$i]->id.", angle: ".$angle);
								if (Math::isInArc($angle, $start, $end)){
									//Debug::log("adding CC mask from ship vs salvo");
									$origin->masks[] = array($this->ships[$i]->id, $origin->getMaskEffect($this->ships[$i]));
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
								$origin->locks[] = array($this->ships[$i]->id, $origin->getLockEffect($this->ships[$i]));
								//Debug::log("locking on #".$this->ships[$i]->id." for value: ".$origin->locks[sizeof($origin->locks)-1][1]);
							}
							else if ($ew->type == 1){ // MASK
								if ($this->ships[$i]->ship || $this->ships[$i]->squad){
									$origin->masks[] = array($this->ships[$i]->id, $origin->getMaskEffect($this->ships[$i]));
									//Debug::log("masking from #".$this->ships[$i]->id." for value: ".$origin->masks[sizeof($origin->masks)-1][1]);
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
			if ($this->phase == 2 && !$this->fires[$i]->targetid){$this->fires[$i]->resolved = 1; continue;} // eMine FO
			//Debug::log("setFireOrderDetails fire #".$this->fires[$i]->id);
			//Debug::log("fire: ".$this->fires[$i]->id);
			//var_export($this->fires[$i]); echo "</br></br>";
			$this->fires[$i]->shooter = $this->getUnit($this->fires[$i]->shooterid);
			//echo $this->fires[$i]->id; echo "</br>";
			$this->fires[$i]->weapon = $this->fires[$i]->shooter->getSystem($this->fires[$i]->weaponid);
			//var_export($this->fires[$i]->id);
			//Debug::log("weapon: ".get_class($this->fires[$i]->weapon));
			$this->fires[$i]->setWeaponShots();
			//Debug::log("shots: ".$this->fires[$i]->shots);
			$this->fires[$i]->target = $this->getUnit($this->fires[$i]->targetid);
			//var_export($this->fires[$i]->weapon); echo "</br></br>";
			//var_export($this->fires[$i]->weapon->getBoostLevel($this->turn)); echo "</br></br>";
		}
	}

	public function sortFiringPhaseFires(){
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
			Debug::log("resolving fire #".$this->fires[$i]->id.", weapon : ".$this->fires[$i]->weapon->display);
			$this->fires[$i]->target->resolveFireOrder($this->fires[$i]);
		}
	}

	public function resolveFighterFireOrders(){
		// splice and delete fireorders from destroyed fighters

		for ($i = sizeof($this->fires)-1; $i >= 0; $i--){
			if ($this->fires[$i]->resolved){continue;}
			if (!$this->fires[$i]->shooter->flight){continue;}
			if ($this->fires[$i]->shooter->getStruct($this->fires[$i]->weapon->fighterId)->destroyed){
				//Debug::log("SKIPPING firorder, SINGLE (shooter) is destroyed");
				$this->fires[$i]->resolved = 2;
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
					//Debug::log("SKIPPING firorder, SINGLE (shooter) is destroyed");
					$this->fires[$i]->resolved = 2;
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
				if (!$this->ships[$i]->mission->arrived){continue;}

				//Debug::log("salvo #".$this->ships[$i]->id." arrived!");
				$target = $this->getUnit($this->ships[$i]->mission->targetid);
				$fire = new FireOrder(0, $this->gameid, $this->turn, $this->ships[$i]->id, $target->id, 0, 0, 2, 0, 0, "", 0, 0);
				$fire->shooter = $this->ships[$i];
				$fire->weapon = $this->ships[$i]->structures[0]->systems[0];
				$fire->target = $target;
				$fire->shots = $fire->shooter->getShots($this->turn);

				$fires[] = $fire;
			}
		}

		if (sizeof($fires)){
			DBManager::app()->insertFireOrders($fires);

			for ($i = 0; $i < sizeof($fires); $i++){
				//Debug::log("ball fireorder ".$i);
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
			if ($this->ships[$i]->destroyed || $this->ships[$i]->available > $this->turn || $this->ships[$i]->withdraw){continue;}
			$this->ships[$i]->setMorale($this->turn, $this->phase);
			$this->ships[$i]->doTestMorale($this->turn);
		}
	}

	public function adjustFleetMorale(){
		Debug::log("-----------------adjustFleetMorale----------- turn $this->turn/$this->phase");

		$turn = $this->phase == 3 ? $this->turn +1 : $this->turn;

		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			$full = $this->playerstatus[$i]["morale"];
			Debug::log("max Morale: ".$full);

			for ($j = 0; $j < sizeof($this->ships); $j++){
				if ($this->ships[$j]->flight || $this->ships[$j]->salvo){continue;}
				if ($this->ships[$j]->userid != $this->playerstatus[$i]["userid"]){continue;}
				if (!$this->ships[$j]->triggersMoraleChange($this->turn, $this->phase)){continue;}

				Debug::log("triggerin!");

				$type = $this->ships[$j]->getUnitMoraleChangeType($this->turn, $this->phase);
				$value = ceil($this->ships[$j]->getMoraleChangeValue($this->turn, $this->phase) / $full * 100);
				$scope = ($type == "withdrawn" ? 3 : 1); // log entry, 1 unit trigger, 2 fleet morale effect, 3 non trigger withdrawal

				Debug::log("unit #".$this->ships[$j]->id.", moraleCost: ".$this->ships[$j]->moraleCost.", value: ".$value);

				$this->playerstatus[$i]["globals"][] = array(
					"id" => 0,
					"playerstatusid" => $this->playerstatus[$i]["id"],
					"unitid" => $this->ships[$j]->id,
					"turn" => $turn,
					"type" => "Morale",
					"scope" => $scope,
					"value" => $value,
					"notes" => $this->ships[$j]->notes,
					"text" => $this->ships[$j]->name." #".$this->ships[$j]->id." ".$type
				);

				//$this->ships[$j]->notes = "";

			}
		}
	}

	public function testFleetMorale(){
		//this->turn = 1;

		$do = 1;

		//$this->getUnit(5)->destroyed = 1;
		//$this->playerstatus[1]["globals"][] = array("scope" => 1, "value" => -22);


		while ($do){
			Debug::log("-----------------testFleetMorale  $this->turn/$this->phase");
			$do--;
			for ($i = 0; $i < sizeof($this->playerstatus); $i++){
				//Debug::log("userid ".$this->playerstatus[$i]["userid"]);
				$totalMoraleWorth = 0;
				$moraleLost = 0;

				for ($j = 0; $j < sizeof($this->ships); $j++){
					if ($this->ships[$j]->flight || $this->ships[$j]->salvo){continue;}
					if ($this->ships[$j]->userid != $this->playerstatus[$i]["userid"]){continue;}
					$totalMoraleWorth += $this->ships[$j]->moraleCost;

					if (!$this->ships[$j]->triggersFleetMoraleTest($this->turn, $this->phase)){continue;}
					$moraleLost += $this->ships[$j]->moraleCost;
				}

				Debug::log("totalMoraleWorth ".$totalMoraleWorth.", moraleLost ".$moraleLost);
				$rel = round($moraleLost / $totalMoraleWorth, 2);

				if (!$moraleLost){
					Debug::log("no loss, continue"); continue;
				} 
				else if (!$rel){
					Debug::log("no rel, continue"); continue;
				} else Debug::log("loss!");


				Debug::log("userid ".$this->playerstatus[$i]["userid"].", totalMoraleWorth ".$totalMoraleWorth.", moraleLost ".$moraleLost.", rel: ".$rel);

				//$lastTurnValue = $this->playerstatus[$i]["globals"][0]["value"]);
				$lastTurnValue = 100;
				$newLoss = 0;
				$newGain = 0;
				$totalLoss = 0;
				$totalGain = $this->playerstatus[$i]["globals"][0]["value"];

				for ($j = 1; $j < sizeof($this->playerstatus[$i]["globals"]); $j++){
					if ($this->playerstatus[$i]["globals"][$j]["scope"] == 3){
						if ($this->playerstatus[$i]["globals"][$j]["turn"] == $this->turn){continue;} // manually routed units dont alter mag on jump turn
					}

					$entry = $this->playerstatus[$i]["globals"][$j];

					if ($entry["value"] < 0){
						$totalLoss += abs($entry["value"]);
					}
					else {
						$totalGain += abs($entry["value"]);
					}
				}

				//$magMod = $totalGain - 100 + $totalLoss;
				$magMod = 100 - $totalGain + $totalLoss; // (totalLoss was ABSs above)

				Debug::log("userid ".$this->playerstatus[$i]["userid"].", totalLoss ".$totalLoss.", totalGain ".$totalGain.", magMod: ".$magMod);

				//continue;

				$crit = DmgCalc::moraleCritProcedure(0, 0, $this->turn, $rel, $this->const["fleetMoraleEffects"], $magMod);
				//return;

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
				if (!$this->ships[$j]->focus){continue;}

				$this->playerstatus[$i]["curFocus"] -= ceil($this->ships[$j]->getFocusCost());
			}
		}
	}

	public function handleFocusGain(){
		Debug::log("handleFocusGain");
		$data = array();

		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			$curFocus = $this->playerstatus[$i]["curFocus"];
			$gainFocus = $this->userChangedCommandThisTurn($i) ? 0 : $this->playerstatus[$i]["gainFocus"];

			$data[] = array(
				"id" => $this->playerstatus[$i]["id"],
				"curFocus" => min($this->playerstatus[$i]["maxFocus"], $curFocus + $gainFocus),
				"gainFocus" => $this->playerstatus[$i]["gainFocus"], 
				"maxFocus" => $this->playerstatus[$i]["maxFocus"]
			);
		}

		if (sizeof($data)){DBManager::app()->updateFocusValues($data);}
	}		

	public function userChangedCommandThisTurn($index){
		//Debug::log("userChangedCommandThisTurn");
		if ($this->playerstatus[$index]["transfered"]){
			//Debug::log("yay");
			return true;
		}
		//Debug::log("nay");
		return false;
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

			if (!sizeof($units)){
				$data[] = 
						array(
							"id" => $this->playerstatus[$i]["id"],
							"curFocus" => 0,
							"gainFocus" => 0, 
							"maxFocus" => 0 * 4
						);
				continue;
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
				$this->playerstatus[$i]["transfered"] = false;
			for ($j = 0; $j < sizeof($this->ships); $j++){
				if ($this->playerstatus[$i]["userid"] != $this->ships[$j]->userid){continue;}
				if ($this->ships[$j]->command != $this->turn){continue;}

				$data[] = $this->getNewFocusValue($this->playerstatus[$i], $this->ships[$j]);

				$this->playerstatus[$i]["transfered"] = true;
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
				//$playerstatus["curFocus"] = 0;
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
		$newForcedMoves = $this->getAllNewForcedMoves();
		$unitMorales = $this->getNewUnitMoraleCrits();

		DBManager::app()->updateFireOrders($this->fires);
		if (sizeof($newDmgs)){DBManager::app()->insertDamageEntries($newDmgs);}
		if (sizeof($newCrits)){DBManager::app()->insertCritEntries($newCrits);}
		if (sizeof($newForcedMoves)){DBManager::app()->insertServerActions($newForcedMoves);}
		if (sizeof($unitMorales)){DBManager::app()->updateUnitStatusNotes($unitMorales);}
		if ($this->hasNewGlobalEntries()){DBManager::app()->insertNewGlobalEntries($this->playerstatus);}
	}

	public function hasNewGlobalEntries(){
		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			for ($j = 0; $j < sizeof($this->playerstatus[$i]["globals"]); $j++){
				if ($this->playerstatus[$i]["globals"][$j]["id"]){continue;}
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
			if ($this->ships[$i]->destroyed || $this->ships[$i]->flight || $this->ships[$i]->salvo || $this->ships[$i]->obstacle){continue;}
			if (!strlen($this->ships[$i]->notes)){continue;}
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
		return array("Earth Alliance", "Centauri Republic", "Minbari Federation", "Narn Regime", "Vree Conglomerate");
	}

	public function getUnitsForFaction($faction){
		$units;

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
						"Esharan",
						"Rolentha",
					),
					array(
						"WhiteStar",
						"Torotha",
						"Shaveen",
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
						"Varnic",
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
			case "Vree Conglomerate";
				$units = array(
					array(
						"Xill",
					),
					array(
						"Xvell",
					),
					array(
					),
					array(
					),
				);
				break;
			default:
				$units = array(array(), array(), array(), array()); 
				break;
		}

		return $units;
	}

	public function getFactionData($faction){
		//Debug::log("getFactionData");

		$notes = array();
		$units = $this->getUnitsForFaction($faction);
		$return = array(array(), array(), array(), array(), array());
		$specials = array();

		switch ($faction){ // specials
			case "Earth Alliance": 
				$notes = array(
					array("Inpenetrable", "By trading energy, units can temporary empower their armour, making them far more resistent to damage."),
					array("Team Effort", "Humans excel when working as a group with a shared goal. Squadrons have 12 slot points.</br>Squadrons receive +5 starting morale for every containing unit after the second."),
					//array("Insurmountable", "An array of networked turrets will provide dedicated point defense to every unit."),
				);
			break;
			case "Centauri Republic"; 
				$notes = array(
					array("Wolfpack", "Excelling at wolfpack tactics results in each Squadrons with at least 3 units being 15 % less expensive."),
					array("Hit and Run", "Specialized battle doctrine and starship design yield a 20 % cost reduction for every non-turning move action.")
				);
			break;
			case "Minbari Federation";
				$notes = array(
					array("Advanced Tech", "Highly advanced tech results in any EW being considered to be originating from a unit 3 levels larger."),
					array("Enlightened", "Hundreds of years of preparation for the old enemy make Minbari commanders especially potent at making decisions regardless of circumstances. Focus gain is increased by 30 %."),
					array("Dedicated", "Minbari are born to a caste and dedicate themselves to their particular role within society. As such every Minbari is a specalist by nature. Officer training is 30 % less costly.")
				);
			break;
			case "Narn Regime";
				$notes = array(
					array("Iron Will", "Narn will almost never flee from a battle, regardless of odds or enemy. Initital morale for units 125, for fleet 115."),
					array("Tenacity", "Narn pilots are known for their reckless determination. Strikecraft are far less susceptible to dropping out (120 -> 160).")
				);
			break;
			case "Vree Conglomerate";
				$notes = array(
					array("Anti-Gravity Mastery", "Vree mastered anti-gravity and, amongst othes, utilize it as a basic means of movement. Instead of 30 degree each, starships can slip up to 60 degree, squadrons up to 90 degree."),
					array("Perpetual Motion", "Vree units are in constant motion, even when not moving per se. At end of turn, each vree' unit facing is adjusted by 120 degree without altering unit heading."),
				);
			break;
		}

		$return[0] = $notes; // notes

		for ($i = 0; $i < sizeof($units[0]); $i++){ //ships
			$name = $units[0][$i];
			$unit = new $name(1, 0, 0, 0, "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, "");
			$data = array(
				"name" => $unit->name,
				"display" => $unit->display,
				"value" => $unit::$value,
				"ep" => $unit->ep,
				"ew" => $unit->ew,
				"eta" => 0
			);
			//return $unit;
			$return[1][] = $data;
		}

		for ($j = 0; $j < sizeof($units[1]); $j++){ // squadies
			$unit = new $units[1][$j](1, 1);
			$data = array(
				"name" => $unit->name,
				"display" => $unit->display,
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
		$units = $this->getUnitsForFaction($faction);
		return $units[0];
	}
	
	public function getPreviewData($get){
		//Debug::log("asking for preview of: ".$get["name"].", index: ".$get["index"]);
		$unit;
		if ($get["unit"] == "ship"){
			$unit = new $get["name"](
				array(
					"id" => $get["purchases"], "userid" => 1, "command" => 0, "available" => 0, "withdraw" => 0, "manual" => 0, "callsign" => "", "status" => "", "totalCost" => 0,"moraleCost" => 0,
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
