<?php

include_once 'global.php';

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
	public $wave = 11;

	public $ships = array();
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

	public $flight = 0;
	public $salvo = 0;

	public $const = array(
		"ew" => array(
			"p" => 1.5,
			"len" => 10, 
			"effect" => array(0 => 0.5, 1 => 0.5, 2 => 0.25)
		),
	);

	function __construct($userid = 0, $gameid = 0){
		//Debug::log("constructing manager ".$userid."/".$gameid);
		//$this->getMemory();
		$this->userid = $userid;
		$this->gameid = $gameid;

		if ($this->gameid){
			$this->getGeneralData();
			$this->setUserIndex();
		}
	}


	public function eval(){
		$this->getUnit(1)->damaged = true;
		$this->getUnit(1)->structures[0]->damaged = true;
		$this->getUnit(1)->structures[1]->damaged = true;
		$this->testCriticals();

		return;
		$this->freeFlights();
		$this->deleteAllReinforcements();
		$this->handlePostMoveFires();
	}

	public function crits(){
		$crits = $this->getUnit(8)->getNewCrits($this->turn);
		Debug::log("size ".sizeof($crits));
	}

	public function getClientData(){
		//$this->deleteReinforcements();
		//return;
		//$this->crits();

		return array(
			"id" => $this->gameid,
			"name" => $this->name,
			"status" => $this->status,
			"turn" => $this->turn,
			"phase" => $this->phase,
			"ships" => $this->getShipData(),
			"reinforcements" => $this->rdyReinforcements,
			"deploys" => $this->deploys,
			"incoming" =>$this->getIncomingData(),
			"const" => $this->const,
			"username" => $this->getUsername()
		);

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
		$this->phase = $gd["phase"];
		$this->playerstatus = DBManager::app()->getPlayerStatus($this->gameid);
	}

	public function validateFleetCost($ships){
		$used = 0;

		for ($i = 0; $i < sizeof($ships); $i++){
			$used = $used + $ships[$i]["value"];
		}

		$avail = $this->pv;

		if ($used <= $avail){
			return $avail - $used;
		}
		return 0;
	}

	public function getGameData(){
		//Debug::log("getGameData");
		$db = DBManager::app();

		$this->setReinforceStatus();
		$this->fires = $db->getUnresolvedFireOrders($this->gameid, $this->turn);

		//Debug::log(sizeof($this->fires)." unresolved fires");

		$this->ships = $this->assembleUnits();
		$this->setCC();

		$this->reinforcements = $db->getAllReinforcements($this->gameid, $this->userid);
		$this->rdyReinforcements = $this->readyReinforcements();
		$this->deploys = $db->getDeployArea($this->gameid, $this->turn);
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
					if ($this->ships[$i]->userid != $this->userid){
						$this->ships[$i]->hidePowers($this->turn);
						$this->ships[$i]->hideFireOrders($this->turn, $this->phase);
					}
				} break;
			case 0: 
				for ($i = 0; $i < sizeof($this->ships); $i++){
					if ($this->ships[$i]->userid != $this->userid){
						$this->ships[$i]->hideActions();
					}
				} break;
			case 2:
				for ($i = 0; $i < sizeof($this->ships); $i++){
					if ($this->ships[$i]->userid != $this->userid){
						$this->ships[$i]->hideFireOrders($this->turn, $this->phase);
					}
				} break;
			default: break;
		}

		//Debug::log(sizeof($this->ships));

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
					-$this->reinforcements[$i]["id"],
					$this->reinforcements[$i]["userid"],
					$this->turn + $this->reinforcements[$i]["available"],
					$this->reinforcements[$i]["status"],
					$this->reinforcements[$i]["destroyed"],
					$this->reinforcements[$i]["x"],
					$this->reinforcements[$i]["y"],
					0,
					$this->reinforcements[$i]["delay"],
					$this->reinforcements[$i]["thrust"],
					$this->reinforcements[$i]["rolling"],
					$this->reinforcements[$i]["rolled"],
					$this->reinforcements[$i]["display"]
				);

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
			$unit = new $db[$i]["name"](
				$db[$i]["id"],
				$db[$i]["userid"],
				$db[$i]["available"],
				$db[$i]["status"],
				$db[$i]["destroyed"],
				$db[$i]["x"],
				$db[$i]["y"],
				$db[$i]["facing"],
				$db[$i]["delay"],
				$db[$i]["thrust"],
				$db[$i]["rolling"],
				$db[$i]["rolled"],
				$db[$i]["display"]
			);

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
			//Debug::log("manager setUnitState #".$units[$i]->id);
			$units[$i]->setUnitState($this->turn, $this->phase);
		}

		return $units;
	}

	public function setCC(){
		if ($this->turn == 1){return;}

		for ($i = 0; $i < sizeof($this->ships); $i++){
			$a = $this->ships[$i]->getCurrentPosition();
			for ($j = $i+1; $j < sizeof($this->ships); $j++){
				if ($this->ships[$i]->id != $this->ships[$j]->id){
					$b = $this->ships[$j]->getCurrentPosition();
					if ($a->x == $b->x && $a->y == $b->y){
						$this->ships[$i]->cc[] = $this->ships[$j]->id;
						$this->ships[$j]->cc[] = $this->ships[$i]->id;
					}
				}
			}
		}
	}

	public function canAdvance($gameid){
		//Debug::log("canAdvance?");
		if ($this->status == "open"){
			return false;
		}
		else {
			$this->playerstatus = DBManager::app()->getPlayerStatus($gameid);
			if (sizeof($this->playerstatus) >= 2){
				for ($i = 0; $i < sizeof($this->playerstatus); $i++){
					if ($this->playerstatus[$i]["status"] == "waiting"){
						return false;
					}
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

		switch ($this->phase){
			case -1; // from deploy to move
				$this->handleDeploymentPhase();
				$this->startMovementPhase();
				break;
			case 0; // ship moves
				$this->handleMovementPhase();
				$this->startFiringPhase();
			//	$this->startFighterMovementPhase();startFiringPhase
				break;
			case 2; // from fire to resolve fire
				$this->handleFiringPhase();
				$this->startDamageControlPhase();
				break;
			case 3; // from damage control to NEW TURN - deploymnt
				$this->handleDamageControlPhase();
				$this->endTurn();
				$this->startNewTurn();
				$this->startDeploymentPhase();
				//$this->turn++;
				//$this->phase = 2;
				//DBManager::app()->setGameTurnPhase($this->gameid, $this->turn, $this->phase);
				//$this->updatePlayerStatus("waiting");
				break;
			default:
				break;
		}

		$time += microtime(true); 
		Debug::log("TIME: ".round($time, 3)." seconds.");
		$this->getMemory();
		return true;
	}

	public function updatePlayerStatus($status){
		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			DBManager::app()->setPlayerstatus($this->playerstatus[$i]["userid"], $this->gameid, $this->turn, $this->phase, $status);
		}
	}

	public function deleteAllReinforcements(){
		$data = array();

		for ($i = 0; $i < sizeof($this->reinforcements); $i++){
			$data[] = $this->reinforcements[$i]["id"];
		}

		if (sizeof($data)){
			DBManager::app()->deleteReinforcements($data);
		}
	}

	public function deleteReinforcements(){
		$data = array();

		for ($i = 0; $i < sizeof($this->reinforcements); $i++){
			$passed = $this->turn - $this->reinforcements[$i]["turn"]; // 1
			if ($passed < 2){continue;}
			$odds = 20;
			$roll = mt_rand(0, 100);
			if ($roll <= $passed * $odds){
				Debug::log("roll: ".$roll.", odds: ".$passed * $odds.", DELETING");
				$data[] = $this->reinforcements[$i]["id"];
			}
		}

		if (sizeof($data)){
			DBManager::app()->deleteReinforcements($data);
		}
	}
	
	public function pickReinforcements(){
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
			$add = 12;

			while ($add){
				$current = 0;
				$roll = mt_rand(0, $total);
				//Debug::log("roll: ".$roll);

				foreach ($entries as $entry){
					$current += $entry[1];
					//Debug::log("current: ".$current);
					if ($roll > $current){continue;}
					//Debug::log("total: ".$total.", roll: ".$roll.", picking: ".$entry[0]);
					//echo "</br>picking: ".$entry[0]."</br>";
					$data = $entry[0]::getKit($faction);
					$data["name"] = $entry[0];
					$data["display"] = "";
					$data["turn"] = $this->turn;
					$data["userid"] = $this->playerstatus[$i]["userid"];
					$data["eta"] = $entry[2];

					if (sizeof($data["upgrades"])){
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

							if (isset($data["launchData"])){ // convert squadron data
								$data["launchData"] = $data["upgrades"][$j]["launchData"];
								unset($data["upgrades"][$j]["launchData"]);
							}
							//echo "roll: ".$subRoll.", subTotal: ".$subTotal.", current: ".$subCurrent.", picking upgrade: ".$j."</br>";

							$data["cost"] += $data["upgrades"][$j]["cost"];
							$data["display"] = $data["upgrades"][$j]["name"];
							break;
						}

						for ($j = sizeof($data["upgrades"])-1; $j >= 0; $j--){
							if ($data["upgrades"][$j]["active"] == 0){
								array_splice($data["upgrades"], $j, 1);
							}
						}
					}
					$picks[] = $data;
					$add--;
					//Debug::log("picking");
					break;
				}
			}
		}

		for ($i = 0; $i < sizeof($picks); $i++){
			if ($picks[$i]["eta"] > 3){
				$picks[$i]["cost"] *= 1 - ($picks[$i]["eta"] - 3)/20;
			}
		}

		if (sizeof($picks)){
			DBManager::app()->insertReinforcements($this->gameid, $picks);
		}
	}
	
	public function handleDeploymentPhase(){
		Debug::log("handleDeploymentPhase");
		$this->handleDeploymentActions();
		$this->handleJumpInActions();
		$this->resolveJumpOutActions();
		$this->handleInitialFireOrders();
		$this->assemblDeployStates();
		if ($this->turn == $this->wave){$this->deleteAllReinforcements();}
		DBManager::app()->deleteEmptyLoads($this->gameid);
	}

	public function handleDeploymentActions(){
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
				$needCheck = true;
			}
		}

		if ($needCheck){
			$this->freeFlights();
		}
	}

	public function resolveJumpOutActions(){
		Debug::log("resolveJumpOutActions");

		$needCheck = false;

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->status == "jumpOut"){
				$needCheck = true;
				$this->ships[$i]->destroyed = true;
			}
		}

		if ($needCheck){
			$this->setUnitStatus();
		}
	}
	public function handleJumpInActions(){
		Debug::log("handleJumpInActions");
		$new = array();

		$mod = 1;
		if ($this->turn == 1){
			$mod = 0.33;
		}

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (($this->ships[$i]->ship || $this->ships[$i]->squad) && $this->ships[$i]->available == $this->turn){
				$order = $this->ships[$i]->actions[0];
				$output = $this->ships[$i]->getSystemByName("Sensor")->output;
				$shift = round($this->ships[$i]->size / $output*500*$mod, 2);
				$aShift = ceil($shift);
				$pShift = ceil($shift*2);
				Debug::log("jumpin: #".$this->ships[$i]->id.", class: ".$this->ships[$i]->name.", size: ".$this->ships[$i]->size.", sensor: ".$output.", ordered to: ".$order->x."/".$order->y.", shiftPotential: ".$shift."%");
				Debug::log($this->ships[$i]->name.", aShift: ".$aShift."°, pShift: ".$pShift."px");

				$aShift = mt_rand(-$aShift, $aShift);
				$xShift = mt_rand(-$pShift, $pShift);
				$yShift = mt_rand(-$pShift, $pShift);
				$dist = Math::getDist($order->x, $order->y, $order->x + $xShift, $order->y + $yShift);

				Debug::log("--> aShift: ".$aShift."°, psShift: ".$xShift."/".$yShift." (".$dist."px)");

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
				"launchData" => array("shipid" => $this->fires[$i]->shooterid, "systemid" => $this->fires[$i]->weaponid, 
					"loads" => array(0 => array("name" => $name, "launch" => $this->fires[$i]->shots)
					)
				)
			);

			for ($j = 0; $j < sizeof($units); $j++){
				if ($units[$j]["launchData"]["shipid"] == $this->fires[$i]->shooterid && $units[$j]["launchData"]["loads"][0]["name"] == $name && $units[$j]["mission"]["targetid"] == $this->fires[$i]->targetid){
					//Debug::log("merging");
					$units[$j]["launchData"]["loads"][0]["launch"] += $this->fires[$i]->shots;
					$skip = 1;
					break;
				}
			}

			if ($skip){
				continue;
			}

			$sPos = $this->fires[$i]->shooter->getCurrentPosition();
			$tPos = $this->getUnit($this->fires[$i]->targetid)->getCurrentPosition();
			$a = Math::getAngle($sPos->x, $sPos->y, $tPos->x, $tPos->y);
			//Debug::log("i = ".$i.", shooterid: ".$shooter->id);
			$devi = Math::getPointInDirection($this->fires[$i]->shooter->size/3, $a, $sPos->x + mt_rand(-10, 10), $sPos->y + mt_rand(-10, 10));
			$mission = array("type" => 2, "turn" => $this->turn, "targetid" => $this->fires[$i]->targetid, "x" => $tPos->x, "y" => $tPos->y, "arrived" => 0, "new" => 1);
			$move = array("turn" => $this->turn, "type" => "deploy", "dist" => 0, "x" => $devi->x, "y" => $devi->y, "a" => $a, "cost" => 0, "delay" => 0, "costmod" => 0, "resolved" => 0);
			$launchData = array("shipid" => $this->fires[$i]->shooter->id, "systemid" => $this->fires[$i]->weapon->id, "loads" => array(0 => array("launch" => $this->fires[$i]->shots, "name" => $name)));

			$units[] = array("gameid" => $this->gameid, "userid" => $this->fires[$i]->shooter->userid, "type" => "Salvo", "name" => "Salvo", "turn" => $this->turn, "eta" => 0,
				"mission" => $mission, "actions" => array($move), "launchData" => $launchData);


		}

		if (sizeof($units)){
			DBManager::app()->insertUnits($this->userid, $this->gameid, $units);
			DBManager::app()->updateSystemLoad($adjust);
			for ($i = 0; $i < sizeof($units); $i++){
				$this->ships[] = new Salvo($units[$i]["id"], $units[$i]["userid"], $this->turn, "deployed", 0, 0, 0, 0, 0, 0, 0, 0, "");

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

	public function handleNewActions(){
		$new = array();

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (($this->ships[$i]->ship || $this->ships[$i]->squad)){continue;}			
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

	public function handleMovementPhase(){
		Debug::log("handleMovementPhase");
		$this->handleShipMovement();
		$this->flight = 1;
		$this->handleMixedMovement();
		$this->flight = 0;
		$this->salvo = 1;
		$this->handleMixedMovement();
		$this->salvo = 0;

		$this->handleNewActions();

		$this->handlePostMoveFires();
		$this->updateMissions();
	}

	public function handlePostMoveFires(){
		Debug::log("handlePostMoveFires: ".sizeof($this->fires));
		$this->setFireOrderDetails();

		for ($i = 0; $i < sizeof($this->fires); $i++){
			Debug::log("handling fire: ".$this->fires[$i]->id.", weapon: ".$this->fires[$i]->weapon->display);

			if ($this->fires[$i]->weapon instanceof Area){
				$subFires = $this->fires[$i]->weapon->createAreaFireOrders($this, $this->fires[$i]);

				for ($j = 0; $j < sizeof($subFires); $j++){
					$subFires[$j]->target->resolveAreaFireOrder($subFires[$j]);
					$this->fires[$i]->hits++;
				}
				$this->fires[$i]->resolved = 1;
			}
		}
		
		Debug::log("handling data");
		$this->handleResolvedFireData();
		return;
	}

	public function handleShipMovement(){
		Debug::log("handleShipMovement");
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->ship || $this->ships[$i]->squad){
				$this->ships[$i]->moveSet = 1;
				for ($j = sizeof($this->ships[$i]->actions)-1; $j >= 0; $j--){
					if ($this->ships[$i]->actions[$j]->resolved == 0){
						$this->ships[$i]->actions[$j]->resolved = 1;
					} else break 1;
				}
			}
		}
		DBManager::app()->resolveUnitMovementDB($this->ships);
	}

	public function handleMixedMovement(){
		Debug::log("handleMixedMovement");
	
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->moveSet){continue;}
			else if ($this->flight && !$this->ships[$i]->flight || $this->salvo && !$this->ships[$i]->salvo){continue;}

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
					"thrust" => $this->ships[$i]->getCurrentImpulse(),
					"rolling" => $this->ships[$i]->rolling,
					"rolled" => $this->ships[$i]->rolled
				);
			}
		}

		if (sizeof($states)){DBManager::app()->updateUnitState($states, $this->turn, $this->phase);}
		
	}

	public function assembleEndStates(){
		Debug::log("assembleEndStates");
		$states = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			$states[] = $this->ships[$i]->getEndState($this->turn);
		}

		if (sizeof($states)){DBManager::app()->updateUnitState($states, $this->turn, $this->phase);}
		
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
		$time = -microtime(true);

		$this->setupShips();
		//return false;

		$this->setFireOrderDetails();
		$this->sortFireOrders();
		$this->resolveShipFireOrders();
		$this->resolveFighterFireOrders();
		$this->resolveBallisticFireOrders();
		$this->testCriticals();

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
		$this->freeFlights();
		$this->setUnitRollState();
		$this->setUnitStatus();
		$this->assembleEndStates();
	}
	
	public function freeFlights(){
		//Debug::log("freeFlights");
		$data = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (!$this->ships[$i]->flight){continue;}
			if ($this->ships[$i]->mission->type != 2){continue;}

			$t = $this->getUnit($this->ships[$i]->mission->targetid);
			if ($t->destroyed || $t->status == "jumpOut"){
				//Debug::log("freeeing flight #".$this->ships[$i]->id." from mission");
				$this->ships[$i]->mission->type = 1;
				$this->ships[$i]->mission->turn = $this->turn - 2;
				$this->ships[$i]->mission->arrived = $this->turn - 1;
				$this->ships[$i]->mission->targetid = 0;
				$this->ships[$i]->setCurrentImpulse($this->turn, $this->phase);
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

	public function alterOneTimeReinforce(){
		if ($this->turn == $this->wave){
			for ($i = 0; $i < sizeof($this->playerstatus); $i++){
				DBManager::app()->addReinforceValue($this->playerstatus[$i]["userid"], $this->gameid, floor($this->reinforce));
			};
		}
	}

	public function alterReinforcementPoints(){
		if ($this->turn > 16){return;}
		$mod = 100;

		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			DBManager::app()->addReinforceValue($this->playerstatus[$i]["userid"], $this->gameid, floor($this->reinforce/100*$mod));
		};
	}

	public function setUnitStatus(){
		Debug::log("setUnitStatus");
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->salvo && $this->ships[$i]->mission->arrived){ // mark impacted salvo as destroyed
				$this->ships[$i]->destroyed = true;
			}
			else if ($this->ships[$i]->flight && $this->ships[$i]->isDestroyed()){
				$this->ships[$i]->destroyed = true;
			}
			
			if ($this->ships[$i]->destroyed){
				//Debug::log("destryoed");
				for ($j = 0; $j < sizeof($this->ships); $j++){
					if ($this->ships[$j]->salvo && $this->ships[$j]->mission->targetid == $this->ships[$i]->id){
						//Debug::log("ding");
						$this->ships[$j]->destroyed = true;
					}
				}
			}
		}

		DBManager::app()->destroyUnitsDB($this->ships);
	}

	public function startNewTurn(){
		//Debug::log("startNewTurn");
		$this->turn++;
		$this->phase = -1;
		DBManager::app()->setGameTurnPhase($this->gameid, $this->turn, $this->phase);
	}

	public function startDeploymentPhase(){
		$this->alterOneTimeReinforce();
		if ($this->turn == $this->wave){$this->pickReinforcements();}
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
			$aPos = $this->ships[$i]->getCurrentPosition();
			//Debug::log("POSITION #".$this->ships[$i]->id.": ".$aPos->x."/".$aPos->y);
			for ($j = $i+1; $j < sizeof($this->ships); $j++){
				if ($this->ships[$i]->userid == $this->ships[$j]->userid){continue;}
				$bPos = $this->ships[$j]->getCurrentPosition();
				$dist = Math::getDist2($aPos, $bPos);
				
				$this->ships[$i]->distances[] = array($this->ships[$j]->id, $dist);
				$this->ships[$j]->distances[] = array($this->ships[$i]->id, $dist);

				$this->ships[$i]->angles[] = array($this->ships[$j]->id, round(Math::getAngle2($aPos, $bPos)));
				$this->ships[$j]->angles[] = array($this->ships[$i]->id, round(Math::getAngle2($bPos, $aPos)));
			}
		}

		/*
		for ($i = 0; $i < sizeof($this->ships); $i++){
			$aPos = $this->ships[$i]->getCurrentPosition();
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

	public function setLocks($s){
		if ($s->salvo){
		}
		else if ($s->flight && $s->mission->arrived){
			//Debug::log("setLocks for FLIGHT #".$s->id);
			for ($i = 0; $i < sizeof($this->ships); $i++){
				if ($this->ships[$i]->id == $s->id || $s->userid == $this->ships[$i]->userid){continue;}
				for ($j = 0; $j < sizeof($s->cc); $j++){
					if ($s->cc[$j] == $this->ships[$i]->id){
						if ($this->ships[$i]->ship || $this->ships[$i]->squad){
							if ($s->mission->targetid == $this->ships[$i]->id){ // strike fighter evades shots from its target (ship)
								$s->masks[] = array($this->ships[$i]->id, $s->getMaskEffect($this->ships[$i]));
								//Debug::log("setting flight mask vs ship target");
							}
						}
						else if ($this->ships[$i]->flight){
							if ($s->mission->targetid == $this->ships[$i]->id){ // mission direct target lock
								$s->locks[] = array($this->ships[$i]->id, $s->getLockEffect($this->ships[$i]));
							}
							else if ($s->mission->targetid == $this->ships[$i]->mission->targetid && $s->userid == $this->getUnit($s->mission->targetid)->userid){ //escorting flight
								$s->locks[] = array($this->ships[$i]->id, $s->getLockEffect($this->ships[$i]));
							}
						}
						else if ($this->ships[$i]->salvo){ // if flight in patrol vs salvo || flight in escort duty vs salvo
							if ($s->mission->type == 1 || $this->ships[$i]->mission->targetid != $s->id){
								$s->locks[] = array($this->ships[$i]->id, $s->getLockEffect($this->ships[$i]));
							}
						}
					}
				}
			}
		}
		else if ($s->ship || $s->squad){
			//Debug::log("ew for #".$s->id);
			$origin = $s->getCurrentPosition();
			$sensor =  $s->getSystemByName("Sensor");
			$ew = $sensor->getEW($this->turn);
			if ($sensor->destroyed || $sensor->disabled  || !$ew){
				return;
			}
			else if ($ew->type == 2 || $ew->type == 3){
				for ($i = 0; $i < sizeof($this->ships); $i++){
					if ($this->ships[$i]->id == $s->id || $s->userid == $this->ships[$i]->userid){continue;}
					switch ($ew->type){
						case 2: $s->locks[] = array($this->ships[$i]->id, $this->const["ew"]["effect"][$ew->type]); break;
					}
				}
			}
			else {
				$start = 0;
				$end = 360;
				$w;

				if ($ew->angle == -1){
					$w = 180;
					//Debug::log("specific EW for ship #".$s->id.", 360 arc");
				}
				else {
					$str = $sensor->getOutput($this->turn);
					$w = min(180, $this->const["ew"]["len"] * pow($str/$ew->dist, $this->const["ew"]["p"]));
					$start = Math::addAngle(0 + $w-$s->getFacing(), $ew->angle);
					$end = Math::addAngle(360 - $w-$s->getFacing(), $ew->angle);
					//Debug::log("specific EW for ship #".$s->id.", str: ".$str.", facing: ".$s->getFacing().", w: ".$w.", EW from ".$start." to ".$end.", dist: ".$ew->dist);
				}

				for ($i = 0; $i < sizeof($this->ships); $i++){
					$skip = 0;
					if ($this->ships[$i]->id == $s->id || $s->userid == $this->ships[$i]->userid){continue;}

					if (sizeof($s->cc)){
						if ($ew->type == 0){ // specific OW versus close combat
							for ($j = 0; $j < sizeof($s->cc); $j++){
								if ($s->cc[$j] == $this->ships[$i]->id){
									if ($this->ships[$i]->flight){ // flight
										$multi = $s->getLockEffect($this->ships[$i]) / 180 * $w;
										//Debug::log("adding CC lock from ship #".$s->id." vs flight# #".$this->ships[$i]->id." for value: ".$multi);

										$s->locks[] = array($this->ships[$i]->id, $multi);
										$skip = 1; break;
									}
									else if ($this->ships[$i]->salvo){ // salvo, in trajectory ?
										$angle = Math::getAngle2($origin, $this->ships[$i]->getTrajectoryStart());
										if (Math::isInArc($angle, $start, $end)){
											//Debug::log("adding CC lock from ship vs salvo");
											$s->locks[] = array($this->ships[$i]->id, $s->getLockEffect($this->ships[$i]));
											$skip = 1; break;
										}
									}
								}
							}
						}
						else if ($ew->type == 1){ // ship MASK in cc, only working against salvo ATM
							if ($this->ships[$i]->salvo){ // salvo, in trajectory ?
								$angle = Math::getAngle2($origin, $this->ships[$i]->getTrajectoryStart());
								if (Math::isInArc($angle, $start, $end)){
									//Debug::log("adding CC mask from ship vs salvo");
									$s->masks[] = array($this->ships[$i]->id, $s->getMaskEffect($this->ships[$i]));
									$skip = 1; break;
								}
							}
						}
					}

					if ($skip){continue;}

					$dest = $this->ships[$i]->getCurrentPosition();
					if (Math::getDist2($origin, $dest) <= $ew->dist){
						$a = Math::getAngle2($origin, $dest);
						//Debug::log("versus #".$this->ships[$i]->id.", a: ".$a);
						if (Math::isInArc($a, $start, $end)){
							if ($ew->type == 0){ // LOCK
								$s->locks[] = array($this->ships[$i]->id, $s->getLockEffect($this->ships[$i]));
								//Debug::log("locking on #".$this->ships[$i]->id." for value: ".$s->locks[sizeof($s->locks)-1][1]);
							}
							else if ($ew->type == 1){ // MASK
								if ($this->ships[$i]->ship || $this->ships[$i]->squad){
									$s->masks[] = array($this->ships[$i]->id, $s->getMaskEffect($this->ships[$i]));
									//Debug::log("masking from #".$this->ships[$i]->id." for value: ".$s->masks[sizeof($s->masks)-1][1]);
								}
							}
						}// else Debug::log("out of arc");
					}// else ("out of dist: ".(Math::getDist2($origin, $dest))." EW: ".$ew->dist);
				}
			}

			//foreach ($s->locks as $entry){Debug::log("lock vs #".$entry[0]." with val: ".$entry[1]);}
		}
	}

	public function setFireOrderDetails(){
		for ($i = sizeof($this->fires)-1; $i >= 0; $i--){
			//Debug::log("setFireOrderDetails fire #".$this->fires[$i]->id);
			//echo "fire: ".$this->fires[$i]->id; echo "</br></br>";
			//var_export($this->fires[$i]); echo "</br></br>";
			$this->fires[$i]->shooter = $this->getUnit($this->fires[$i]->shooterid);
			$this->fires[$i]->weapon = $this->fires[$i]->shooter->getSystem($this->fires[$i]->weaponid);
			//echo get_class($this->fires[$i]->weapon); echo "</br></br>";
			$this->fires[$i]->shots = $this->fires[$i]->weapon->getShots($this->turn);
			$this->fires[$i]->target = $this->getUnit($this->fires[$i]->targetid);
			//var_export($this->fires[$i]->weapon); echo "</br></br>";
			//var_export($this->fires[$i]->weapon->getBoostLevel($this->turn)); echo "</br></br>";
		}
	}

	public function sortFireOrders(){
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
				Debug::log("AAA skipping fireorder due to destroyed single shooter");
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
					$target = $this->getUnit($this->ships[$i]->mission->targetid);
					$fire = $this->ships[$i]->getFireOrder($this->gameid, $this->turn, $target);
					$fires[] = $fire;
				}
			}
		}

		if (sizeof($fires)){
			DBManager::app()->insertServerFireOrder($fires);

			for ($i = 0; $i < sizeof($fires); $i++){
				$fires[$i]->target->resolveFireOrder($fires[$i]);
			}
			$this->fires = array_merge($this->fires, $fires);
		}
	}

	public function testCriticals(){
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->damaged){
				//Debug::log("testCriticals #".$this->ships[$i]->id);
				$this->ships[$i]->testForCrits($this->turn);
			} 
		}
	}

	public function handleResolvedFireData(){
		$newDmgs = $this->getAllNewDamages();
		$newCrits = $this->getAllNewCrits();

		DBManager::app()->updateFireOrders($this->fires);
		DBManager::app()->insertDamageEntries($newDmgs);
		DBManager::app()->insertCritEntries($newCrits);
	}

	public function getAllNewDamages(){
		//Debug::log("getAllNewDamages");
		$dmgs = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			$dmgs = array_merge($dmgs, $this->ships[$i]->getNewDamages($this->turn));
		}
		return $dmgs;
	}

	public function getAllNewCrits(){
		if ($this->phase == 0)
		Debug::log("getAllNewCrits");
		$crits = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->destroyed && ($this->ships[$i]->ship || $this->ships[$i]->squad)){continue;}
			$crits = array_merge($crits, $this->ships[$i]->getNewCrits($this->turn));
		}
		return $crits;
	}

	public function startDamageControlPhase(){
		//Debug::log("startDamageControlPhase");

		$dbManager = DBManager::app();
		$this->phase = 3;

		if ($dbManager->setGameTurnPhase($this->gameid, $this->turn, $this->phase)){
			$this->updatePlayerStatus("waiting");
			return true;
		}
	}

	public function finishTurn(){
		//Debug::log("finishTurn");
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

	public function getFightersForFaction($faction){
		//Debug::log("getFightersForFaction");
	}

	public function getFlights(){
		return array(array(
			"name" => "Flight",
			"value" => 500,
			"eta" => 2
		));
	}

	public function getShipsForFaction($faction){
		//Debug::log("getShipsForFaction");
		$ships = array(array(), array());
		$return = array(array(), array());

		switch ($faction){
			case "Earth Alliance";
				$ships = array(
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
						"Tethys",
					)
				);
				break;
			case "Centauri Republic";
				$ships = array(
					array(
						"Octurion",
						"Primus",
						//"Tech",
						"Altarian",
						"Demos",
					),
					array(
						"Vorchar",
						"Vorchan",
						"Darkner",
						"Haven",
					)
				);
				break;
			case "Minbari Federation";
				$ships = array(
					array(
					"Sharlin",
					"Tinashi",
					),
					array(
					"WhiteStar",
					)
				);
				break;
			case "Narn Regime";
				$ships = array(
					array(
					"GQuan"
					),
					array(
					)
				);
				break;
			default:
				break;
		}

		$ship;

		for ($i = 0; $i < sizeof($ships[0]); $i++){
			$name = $ships[0][$i];
			$ship = array(
				"name" => $ships[0][$i],
				"value" => $name::$value,
				"eta" => 0
			);
			$return[0][] = $ship;
		}

		for ($j = 0; $j < sizeof($ships[1]); $j++){
			$unit = new $ships[1][$j](1, 1);

			$ship = array(
				"name" => $unit->name,
				"value" => $unit->cost,
				"ep" => $unit->ep,
				"ew" => $unit->ew,
				"space" => $unit->space,
				"eta" => 0
			);
			$return[1][] = $ship;
		}

		return $return;
	}

	public function getReinforcements($faction){
		//Debug::log("getShipsForFaction");
		$ships = array();

		switch ($faction){
			case "Earth Alliance";
				$ships = array(
					array("Omega", 5, 6),
					array("Hyperion", 7, 5),
					array("Avenger", 3, 6),
					array("Artemis", 10, 3),
					array("Olympus", 10, 3),
					array("Squadron", 15, 2),
				);
				break;
			case "Centauri Republic";
				$ships = array(
					array("Primus", 5, 6),
					array("Altarian", 15, 3),
					array("Demos", 15, 3),
					array("Squadron", 25, 2),
				);
				break;
			case "Minbari Federation";
				$ships = array(
					array("Sharlin", 8, 4),
					array("Tinashi", 4, 3),
				);
				break;
			case "Narn Regime";
				$ships = array(
					array("GQuan", 6, 2)
				);

				break;
			default:
				break;
		}

		return $ships;

	}
	public function getPreviewData($get){
		//Debug::log("asking for preview of: ".$get["name"].", index: ".$get["index"]);
		$unit;
		if ($get["unit"] == "ship"){
			$unit = new $get["name"](1, 1, 0, "", 0, 0, 0, 270, 0, 0, 0, 0, "");
		}
		elseif ($get["unit"] == "squaddie"){
			$unit = new $get["name"]($get["index"]+1, 1);
		}

		
		$unit->setUnitState(0, 0);
		return $unit;
	}

	public function logSystemsByClass($array){
		$systems = array();

		for ($i = 0; $i < sizeof($array); $i++){
			switch ($array[$i]){
				case "Ion":
					$systems[] = array("LightIon", "MediumTwinIon", "HeavyIon"); break;
				case "Pulse":
					$systems[] = array("LightPulse", "MediumPulse"); break;
				case "Laser":
					$systems[] = array("LightLaser", "MediumLaser", "HeavyLaser"); break;
				case "Matter":
					$systems[] = array("MediumRailGun", "HeavyRailGun"); break;
				default: break;
			}
		}

		$return = array();

		for ($i = 0; $i < sizeof($systems); $i++){
			for ($j = 0; $j < sizeof($systems[$i]); $j++){
				$return[] = new $systems[$i][$j](0, 0, 0, 0);
			}
		}
		return $return;
	}

	public function compareSystems($array){
		$systems = array();

		for ($i = 0; $i < sizeof($array); $i++){
			$systems[$i] = new $array[$i](0, 0, 0, 0);
		}
		return $systems;
	}

	public function logShips($elements){
		$data = func_get_args();
		if ($data[0] == "all"){
			return $this->logAllShips();
		}
		else {
			$ships = array();
			for ($i = 0; $i < sizeof($data); $i++){
				$ships[] = new $data[$i](0,0,0,0,0,0);
				$ships[sizeof($ships)-1]->setProps(0, 0);
			}
			return $ships;
		}
	}

	public function logAllShips(){
		$allShips = array();

		$factions = $this->getFactions();
		foreach ($factions as $faction){
			$ships = $this->getShipsForFaction($faction);
			foreach ($ships as $ship){
				$allShips[] = $ship;
			}
		}

		for ($i = 0; $i < sizeof($allShips); $i++){
			$name = $allShips[$i]["name"];
			$ship = new $name(0, 0, 0, 0, 0, 0);
			$ship->setProps(1, 0);
			$allShips[$i] = $ship;
			continue;
		}

	return $allShips;
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
