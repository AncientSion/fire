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


	public function test(){
		return;
		foreach ($this->ships as $ship){
			Debug::log($ship->id);
		}
		Debug::log("====");
		foreach ($this->incoming as $incoming){
			Debug::log($incoming["id"]);
		}
		///return;
		$ship = $this->getUnit(20);
		$add = 200;
		$struct = 1;
		$ship->primary->remaining += $add;
		$ship->structures[$struct]->armourDmg = 0;
		$ship->structures[$struct]->setNegation($ship->primary->integrity, 0);

		$weapon = new MediumIon(0,0,0,0,0,0,0);
		$fire = new FireOrder(0,0,0,0,0,0,0,0,0,0,0,0);
		$fire->section = $ship->structures[$struct]->id;
		$fire->weapon = $weapon;
		$fire->target = $ship;
		$shots = 0;

		for ($i = 0; $i < sizeof($ship->structures[$struct]->systems); $i++){
			$ship->structures[$struct]->systems[$i]->destroyed = 0;
		}

		while ($shots){
			$sys = $fire->target->getHitSystem($fire);
			Debug::log(get_class($sys).", armourmod: ".$sys->getArmourMod()." => ".$ship->getArmourValue($fire, $sys));
			$shots--;
		}

		//$ship->primary->remaining -= $add;

		Debug::log("determing to hit for ".get_class($ship)." #".$ship->id);

		$total = $ship->primary->getHitChance();
		$avail = $total;

		for ($i = 0; $i < sizeof($ship->structures[$struct]->systems); $i++){
			if ($ship->structures[$struct]->systems[$i]->isDestroyed()){continue;}
			$avail += $ship->structures[$struct]->systems[$i]->getHitChance();
			Debug::log("adding ".get_class($ship->structures[$struct]->systems[$i]).", chance: ".$ship->structures[$struct]->systems[$i]->getHitChance());
		}

		Debug::log("-> primary to struct: ".$total." / ".$avail." => ".(round($total/$avail, 2)*100)."%");

		$avail = $total;

		$fraction = round($ship->primary->remaining / $ship->primary->integrity, 3);
		Debug::log("main structure at ".$fraction."%");
		for ($i = 0; $i < sizeof($ship->primary->systems); $i++){
			if (!$ship->isExposed($fraction, $ship->primary->systems[$i])){continue;}
			$odd = $ship->primary->systems[$i]->getHitChance();
			$avail += $odd;
			Debug::log("adding ".get_class($ship->primary->systems[$i]).", chance: ".$ship->primary->systems[$i]->getHitChance());
		}


		Debug::log("-> main to internal: ".$total." / ".$avail." => ".(round($total/$avail, 2)*100)."%");
		Debug::log("-> chance to divert to single internal on main hit: ".$ship->primary->systems[$i-1]->getHitChance()." / ".$avail." => ".(round($ship->primary->systems[$i-1]->getHitChance()/$avail, 2)*100)."%");
		
		return;
	}

	public function getClientData(){
		//$this->pickReinforcements();
		//$this->deleteReinforcements();
		//return;

		return array(
			"id" => $this->gameid,
			"name" => $this->name,
			"status" => $this->status,
			"turn" => $this->turn,
			"phase" => $this->phase,
			"ships" => $this->getShipData(),
			"reinforcements" => $this->rdyReinforcements,
			"deploys" => $this->deploys,
			"incoming" =>$this->incoming,
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
		$this->fires = $db->getAllFireOrders($this->gameid);

		$this->ships = $this->assembleUnits();
		$this->setCC();
		//Debug::log("ships: ".sizeof($this->ships));
		//$this->ballistics = $this->assembleBallistics();

		$this->reinforcements = $db->getAllReinforcements($this->gameid, $this->userid);
		$this->rdyReinforcements = $this->readyReinforcements();
		$this->deploys = $db->getDeployArea($this->gameid, $this->turn);
		$this->incoming = $db->getIncomingShips($this->gameid, $this->turn);
		
		$this->deleteResolvedFireOrders();
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
		for ($i = sizeof($this->ships)-1; $i >= 0; $i--){
			if ($this->ships[$i]->userid != $this->userid){
				if ($this->ships[$i]->flight && $this->ships[$i]->available == $this->turn && !$this->ships[$i]->actions[0]->resolved){
					array_splice($this->ships, $i, 1);
				}
				else if ($this->ships[$i]->ship && $this->phase == 0 || $this->ships[$i]->flight && $this->phase == 1){
					$this->ships[$i]->hideActions();
				}
			}
		}

		switch ($this->phase){
			case -1: 
				for ($i = 0; $i < sizeof($this->ships); $i++){
					if ($this->ships[$i]->userid != $this->userid){
						$this->ships[$i]->hidePowers($this->turn);
						$this->ships[$i]->hideFireOrders($this->turn);
					}
				} break;
			case 2:
				for ($i = 0; $i < sizeof($this->ships); $i++){
					if ($this->ships[$i]->userid != $this->userid){
						$this->ships[$i]->hideFireOrders($this->turn);
					}
				} break;
			default: break;
		}

		return $this->ships;
	}

	public function deleteResolvedFireOrders(){
		for ($i = sizeof($this->fires)-1; $i >= 0; $i--){
			if ($this->fires[$i]->resolved == 1){
				array_splice($this->fires, $i, 1);
			}
		}
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
				$s = new $this->reinforcements[$i]["name"](
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
					$this->reinforcements[$i]["display"]
				);

				$s->cost = $this->reinforcements[$i]["facing"];
				$s->currentImpulse = $s->baseImpulse;

				for ($j = 0; $j < sizeof($s->structures); $j++){
					$s->structures[$j]->remainingNegation = $s->structures[$j]->negation;
				}
				$data[] = $s;
			}
		}

		for ($i = 0; $i < sizeof($data); $i++){
			$data[$i]->id *= -1;
		}
		DBManager::app()->getShipLoad($data);
		for ($i = 0; $i < sizeof($data); $i++){
			$data[$i]->id *= -1;
		}
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
				$db[$i]["display"]
			);

			if (!$unit->ship){
				$unit->addSubUnits($db[$i]["subunits"]);
				//var_export($db[$i]["mission"]);
				$unit->addMissionDB($db[$i]["mission"], $this->userid, $this->turn, $this->phase);
			}
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
			//$units[$i]->addFireDB($this->fires);
			$units[$i]->setState($this->turn, $this->phase); //check damage state after dmg is applied
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
		$this->playerstatus = DBManager::app()->getPlayerStatus($gameid);
		if ($this->status == "open"){
			return false;
		}
		else if (sizeof($this->playerstatus) >= 2){
			for ($i = 0; $i < sizeof($this->playerstatus); $i++){
				if ($this->playerstatus[$i]["status"] == "waiting"){
					return false;
				}
			}
		}
		return true;
	}

	public function prepareAdvance($gameid){
		//Debug::log("prepareAdvance + get data");
		$this->gameid = $gameid;
		$this->getGeneralData();
		$this->getGameData();
	}

	public function doAdvancea(){
		Debug::log("doAdvance for game".$this->gameid." from phase ".$this->phase." to phase ".($this->phase+1));

		if ($this->phase == -1){
			$this->handleDeploymentPhase();
			$this->startMovementPhase();
			$this->handleMovementPhase();
			$this->startDamageControlPhase();
			$this->handleDamageControlPhase();
			$this->endTurn();
			$this->startNewTurn();
			$this->startDeploymentPhase();
		}

		return true;
	}

	public function doAdvance(){
		Debug::log("doAdvance for game".$this->gameid." from phase ".$this->phase." to phase ".($this->phase+1));
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
		Debug::log("advancing game state time: ".round($time, 3)." seconds.");
		$this->getMemory();
		return true;
	}

	public function updatePlayerStatus($status){
		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			DBManager::app()->setPlayerstatus($this->playerstatus[$i]["userid"], $this->gameid, $this->turn, $this->phase, $status);
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
		if ($this->turn < 5){return;}

		Debug::log("pickReinforcements");
		$picks = array();

		for ($k = 0; $k < sizeof($this->playerstatus); $k++){

			$avail = 0;
			for ($i = 0; $i < sizeof($this->reinforcements); $i++){
				if ($this->reinforcements[$i]["userid"] == $this->playerstatus[$k]["userid"]){
					$avail++;
				}
			}
			if ($avail > 3){if (mt_rand(0, 1)){continue;}}
			else if ($this->turn > 13){if (mt_rand(0, $this->turn -12)){continue;}}

			$ships = $this->getReinforcementShips($this->playerstatus[$k]["faction"]);
			$total = 0;
			$current = 0;
			foreach ($ships as $ship){$total += $ship[1];}

			$roll = mt_rand(0, $total);

			for ($i = 0; $i  < sizeof($ships); $i++){
				$current += $ships[$i][1];

				if ($roll > $current){continue;}

				Debug::log("total: ".$total.", roll: ".$roll.", picking: ".$ships[$i][0]);

				$data = $ships[$i][0]::getKit();
				$data["name"] = $ships[$i][0];
				$data["display"] = "";
				$data["turn"] = $this->turn;
				$data["userid"] = $this->playerstatus[$k]["userid"];
				$data["eta"] = 1; //$ships[$i][2];
				//echo "available kits for ".$data[$i]["name"].": ".sizeof($data["upgrades"])."</br></br>";

				//$totalOdds = 0;

				//for ($j = 0; $j < sizeof($data["upgrades"]); $j++){
				//	$totalOdds += $data["upgrades"][$j]["chance"];
				//}

				for ($j = 0; $j < sizeof($data["upgrades"]); $j++){
					//echo "--OPTION #".$j."-- cost ".$data["upgrades"][$j]["cost"]."-- chance ".$data["upgrades"][$j]["chance"]."</br>";

					if (mt_rand(0, 100) < $data["upgrades"][$j]["chance"]){
						//echo "picking kit: #".$j."</br>";
						//var_export($data["upgrades"][$j]);
						//echo "</br>";
						//echo "Total Cost: ".$data["cost"];

						$data["upgrades"][$j]["active"] = 1;
						$data["cost"] += $data["upgrades"][$j]["cost"];
						$data["display"] = $data["upgrades"][$j]["name"];
						Debug::log("adding outfit: ".$data["upgrades"][$j]["name"]);
						break;


					}
					//for ($k = 0; $k < sizeof($data["upgrades"][$j]["kit"]); $k++){
						//var_export($data["upgrades"][$j]["kit"][$k]); echo "</br>";
					//}
				}
				//echo "</br></br>";
				$picks[] = $data;
				break;
			}


			//foreach ($picks as $ship){
			//	var_export($ship);
			//	echo "</br></br>";
			//}

			//return;
		}

		if (sizeof($picks)){
			DBManager::app()->insertReinforcements($this->gameid, $picks);
		}
	}

	public function pickReinforcementas(){
		if ($this->turn < 2){return;}

		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			$avail = 0;
			for ($j = 0; $j < sizeof($this->reinforcements); $j++){
				if ($this->reinforcements[$j]["userid"] == $this->playerstatus[$i]["userid"]){
					$avail++;
				}
			}

			if ($avail >= 4){
				continue;
			}


			$picks = array();
			$now = 0;
			$max = 1;
			if (!$max){continue;}
			$validShips = $this->getReinforcementShips($this->playerstatus[$i]["faction"]);
			//$validShips = array_merge($validShips, $this->getFlights());
			//$validShips = $this->getFlights();

			for ($j = 0; $j < $max; $j++){
				$pick = $validShips[mt_rand(0, sizeof($validShips)-1)];
				$roll = mt_rand(1, 10);

				if ($roll >= $pick["weight"]){
					$now++;
					$pick["eta"] += mt_rand(3, 4);
					$pick["eta"] = max(2, $pick["eta"]);
					$pick["value"] = ceil($pick["value"] * (mt_rand(8, 12))/10);
					$picks[] = $pick;

					if ($now == $max){
						break;
					}
				}
			}
			if (sizeof($picks)){
				DBManager::app()->insertReinforcements($this->gameid, $this->playerstatus[$i]["userid"], $picks);
			}
		}
	}
	
	public function handleDeploymentPhase(){
		//Debug::log("handleDeploymentPhase");
		$this->initBallistics();
		$this->handleDeploymentActions();
		$this->handleJumpActions();
		$this->assemblDeployStates();
		DBManager::app()->deleteEmptyLoads($this->gameid);
	}

	public function initBallistics(){
		Debug::log("initBallistics");
		$fires = DBManager::app()->getUnresolvedFireOrders($this->gameid, $this->turn); // fireorders from deploy -> hangar, launcher
		usort($fires, function($a, $b){
			return $a->shooterid - $b->shooterid;
		});

		$adjust = array();
		$units = array();
		for ($i = 0; $i < sizeof($fires); $i++){
			//Debug::log("handling fire #".$i);
			$skip = 0;
			$shooter = $this->getUnit($fires[$i]->shooterid);
			$launcher = $shooter->getSystemById($fires[$i]->weaponid);
			$fires[$i]->shots = $launcher->getShots($this->turn);
			if (!($launcher instanceof Launcher)){
				//Debug::log("Hangar fireorder, resolving: ".$fires[$i]->id);
				if ($launcher instanceof Hangar){
					$fires[$i]->resolved = 1;
					continue;
				}
				Debug::log("FATAL ERROR, unresolved non-launcher/hangar  fireorder: ".$fires[$i]->id);
				continue;
			}
			$name = $launcher->getAmmo()->name;
			$adjust[] = array(
				"launchData" => array("shipid" => $shooter->id, "systemid" => $launcher->id, 
					"loads" => array(0 => array("name" => $name, "launch" => $fires[$i]->shots)
					)
				)
			);

			for ($j = 0; $j < sizeof($units); $j++){
				if ($units[$j]["launchData"]["shipid"] == $shooter->id && $units[$j]["launchData"]["loads"][0]["name"] == $name && $units[$j]["mission"]["targetid"] == $fires[$i]->targetid){
					//Debug::log("merging");
					$units[$j]["launchData"]["loads"][0]["launch"] += $fires[$i]->shots;
					$skip = 1;
					break;
				}
			}

			if ($skip){
				Debug::log("skipping");
				continue;
			}

			$sPos = $shooter->getCurrentPosition();
			$tPos = $this->getUnit($fires[$i]->targetid)->getCurrentPosition();
			$a = Math::getAngle($sPos->x, $sPos->y, $tPos->x, $tPos->y);
			//Debug::log("i = ".$i.", shooterid: ".$shooter->id);
			$devi = Math::getPointInDirection($shooter->size/3, $a, $sPos->x + mt_rand(-10, 10), $sPos->y + mt_rand(-10, 10));
			$mission = array("type" => 2, "turn" => $this->turn, "targetid" => $fires[$i]->targetid, "x" => $tPos->x, "y" => $tPos->y, "arrived" => 0, "new" => 1);
			$move = array("turn" => $this->turn, "type" => "deploy", "dist" => 0, "x" => $devi->x, "y" => $devi->y, "a" => $a, "cost" => 0, "delay" => 0, "costmod" => 0, "resolved" => 0);
			$launchData = array("shipid" => $shooter->id, "systemid" => $launcher->id, "loads" => array(0 => array("launch" => $fires[$i]->shots, "name" => $name)));

			$units[] = array("gameid" => $this->gameid, "userid" => $shooter->userid, "type" => "Salvo", "name" => "Salvo", "turn" => $this->turn, "eta" => 0,
				"mission" => $mission, "actions" => array($move), "launchData" => $launchData);


		}

		if (sizeof($fires)){
			DBManager::app()->updateBallisticFireOrder($fires);
		}

		if (sizeof($units)){
			DBManager::app()->insertUnits($this->userid, $this->gameid, $units);
			DBManager::app()->updateSystemLoad($adjust);
			for ($i = 0; $i < sizeof($units); $i++){
				$this->ships[] = new Salvo($units[$i]["id"], $units[$i]["userid"], $this->turn, "deployed", 0, 0, 0, 0, 0, 0, "");

				$this->ships[sizeof($this->ships)-1]->setState($this->turn, $this->phase);
				$this->ships[sizeof($this->ships)-1]->actions[] = new Action(-1, $this->ships[$i]->id, $this->turn, "deploy", 0, $units[$i]["actions"][0]["x"], $units[$i]["actions"][0]["y"], $a, 0, 0, 0, 1, 1);
			}
		}
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

	public function handleJumpActions(){
		Debug::log("handleJumpActions");
		$new = array();

		$mod = 1;
		if ($this->turn == 1){
			$mod = 0.33;
		}

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->ship && $this->ships[$i]->available == $this->turn){
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
				$this->ships[$i]->actions[] = new Action(-1, $this->ships[$i]->id, $this->turn, "jump", $dist, $order->x + $xShift, $order->y + $yShift, $aShift, 0, 0, 0, 1, 1);
				$new[] = $this->ships[$i]->actions[sizeof($this->ships[$i]->actions)-1];
			}
		}

		if (sizeof($new)){
			DBManager::app()->insertServerActions($new);
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

	public function updateMissions(){
		$data = array();

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (!$this->ships[$i]->ship){
				$data[] = $this->ships[$i]->mission;
			}
		}

		DBManager::app()->updateMissionState($data);
	}

	public function handleNewActions(){
		$new = array();

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (!$this->ships[$i]->ship){
				$new[] = $this->ships[$i]->actions[sizeof($this->ships[$i]->actions)-1];
			}
		}

		if (sizeof($new)){
			DBManager::app()->insertServerActions($new);
		}
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
		$this->updateMissions();
	}

	public function handleShipMovement(){
		Debug::log("handleShipMovement");
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->ship){
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
					"thrust" => $this->ships[$i]->getCurrentImpulse()
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
		$this->cleanFireOrders();
		$this->testUnitCrits();
		$this->writeDamageEntries();
		$this->writeCritEntries();
		$time += microtime(true); 
		Debug::log("handleFiringPhase time: ".round($time, 3)." seconds.");
		return true;
	}
	
	public function handleDamageControlPhase(){
		return true;
	}

	public function endTurn(){
		Debug::log("endTurn");
		$this->freeFlights();
		$this->setUnitStatus();
		$this->assembleEndStates();
		$this->alterReinforcementPoints();
	}
	
	public function freeFlights(){
		$data = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->flight && $this->ships[$i]->mission->arrived && $this->ships[$i]->mission->type == 2){
				if ($this->getUnit($this->ships[$i]->mission->targetid)->destroyed){
					Debug::log("freeeing flight #".$this->ships[$i]->id." from mission");
					$this->ships[$i]->mission->type = 1;
					$this->ships[$i]->mission->turn = $this->turn - 2;
					$this->ships[$i]->mission->targetid = 0;
					$this->ships[$i]->setCurrentImpulse($this->turn, $this->phase);
					$data[] = $this->ships[$i]->mission;
				}
			}
		}
		if (sizeof($data)){DBManager::app()->updateMissionState($data);}
	}

	public function alterReinforcementPoints(){
		$mod = 100;

		if ($this->turn > 15){return;}
		else if ($this->turn > 10){
			$mod -= ($this->turn - 10) * 20;
		}

		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			DBManager::app()->addReinforceValue($this->playerstatus[$i]["userid"], $this->gameid, floor($this->reinforce/100*$mod));
		};
	}

	public function setUnitStatus(){
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->salvo && $this->ships[$i]->mission->arrived){ // mark impacted salvo as destroyed
				$this->ships[$i]->destroyed = 1;
			}
			else if ($this->ships[$i]->flight && $this->ships[$i]->isDestroyed()){
				$this->ships[$i]->destroyed = 1;
			}
			
			if ($this->ships[$i]->destroyed){
				for ($j = 0; $j < sizeof($this->ships); $j++){
					if ($this->ships[$j]->salvo && $this->ships[$j]->mission->targetid == $this->ships[$i]->id){
						$this->ships[$j]->destroyed = 1;
					}
				}
			}
		}

		DBManager::app()->destroyUnitsDB($this->ships);
	}

	public function startNewTurn(){
		//Debug::log("startNewTurn");
		$this->turn = $this->turn+1;
		$this->phase = -1;
		DBManager::app()->setGameTurnPhase($this->gameid, $this->turn, $this->phase);
	}

	public function startDeploymentPhase(){
		//Debug::log("startDeploymentPhase");
		$this->deleteReinforcements();
		$this->pickReinforcements();
		$this->updatePlayerStatus("waiting");
	}

	public function setupShips(){
		for ($i = 0; $i < sizeof($this->ships); $i++){
			//Debug::log("setupship #".$this->ships[$i]->id);
			$this->ships[$i]->setFacing();
			$this->ships[$i]->setPosition();
			$this->ships[$i]->setupForDamage($this->turn);
		}

		//set dist and angle for each ship to speed up fire resolution
		for ($i = 0; $i < sizeof($this->ships); $i++){
			$aPos = $this->ships[$i]->getCurrentPosition();
			for ($j = $i+1; $j < sizeof($this->ships); $j++){
				if ($this->ships[$i]->userid == $this->ships[$j]->userid){continue;}
				$bPos = $this->ships[$j]->getCurrentPosition();
				$dist = Math::getDist2($aPos, $bPos);
				
				$this->ships[$i]->distances[] = array($this->ships[$j]->id, $dist);
				$this->ships[$j]->distances[] = array($this->ships[$i]->id, $dist);

				$this->ships[$i]->angles[] = array($this->ships[$j]->id, round(Math::getAngle2($aPos, $bPos)));
				$this->ships[$j]->angles[] = array($this->ships[$i]->id, round(Math::getAngle2($bPos, $aPos)));

				//$this->ships[$i]->angles[] = array($this->ships[$j]->id, round(Math::addAngle($this->ships[$i]->getFacing(), Math::getAngle2($aPos, $bPos))));
				//$this->ships[$j]->angles[] = array($this->ships[$i]->id, round(Math::addAngle($this->ships[$j]->getFacing(), Math::getAngle2($bPos, $aPos))));
			}
		}

		for ($i = 0; $i < sizeof($this->ships); $i++){
			$this->setLocks($this->ships[$i]);
		}
		return;

		for ($i = 0; $i < sizeof($this->ships); $i++){
			Debug::log("FROM: #".$this->ships[$i]->id);
			foreach ($this->ships[$i]->angles as $val){
				Debug::log("--> ANGLE TO: #".$val[0].": ".$val[1]);
			}
			foreach ($this->ships[$i]->distances as $val){
				Debug::log("-->  DIST TO: #".$val[0].": ".$val[1]);
			}
		}
	}

	public function setLocks($s){
		if ($s->salvo){
			return;
		}
		else if ($s->flight && $s->mission->arrived){
			//Debug::log("setLocks Flight #".$shi->id);
			for ($i = 0; $i < sizeof($this->ships); $i++){
				if ($this->ships[$i]->id == $s->id || $s->userid == $this->ships[$i]->userid){continue;}
				for ($j = 0; $j < sizeof($s->cc); $j++){
					if ($s->cc[$j] == $this->ships[$i]->id){
						if ($this->ships[$i]->flight){
							if ($s->mission->targetid == $this->ships[$i]->id){ // mission direct target lock
								$s->locks[] = array($this->ships[$i]->id, $this->ships[$i]->getLockMultiplier());
							}
							else if ($s->mission->targetid == $this->ships[$i]->mission->targetid && $s->userid == $this->getUnit($s->mission->targetid)->userid){ //escorting flight
								$s->locks[] = array($this->ships[$i]->id, $this->ships[$i]->getLockMultiplier());
							}
						}
						else if ($this->ships[$i]->salvo){ // if flight in patrol vs salvo || flight in escort duty vs salvo
							if ($s->mission->type == 1 || $this->ships[$i]->mission->targetid != $s->id){
								$s->locks[] = array($this->ships[$i]->id, $this->ships[$i]->getLockMultiplier());
							}
						}
					}
				}
			}
		}
		else if ($s->ship){
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
					Debug::log("specific EW for ship #".$s->id.", 360 arc");
				}
				else {
					$str = $sensor->getOutput($this->turn);
					$w = min(180, $this->const["ew"]["len"] * pow($str/$ew->dist, $this->const["ew"]["p"]));
					$start = Math::addAngle(0 + $w-$s->getFacing(), $ew->angle);
					$end = Math::addAngle(360 - $w-$s->getFacing(), $ew->angle);
					Debug::log("specific EW for ship #".$s->id.", str: ".$str.", facing: ".$s->getFacing().", w: ".$w.", EW from ".$start." to ".$end.", dist: ".$ew->dist);

				}

				for ($i = 0; $i < sizeof($this->ships); $i++){
					$multi = $this->ships[$i]->getLockMultiplier();
					$skip = 0;
					if ($this->ships[$i]->id == $s->id || $s->userid == $this->ships[$i]->userid){continue;}

					if ($ew->type == 0 && sizeof($s->cc)){ // specific OW versus close combat
						for ($j = 0; $j < sizeof($s->cc); $j++){
							if ($s->cc[$j] == $this->ships[$i]->id){
								if ($this->ships[$i]->flight){ // flight
									$multi = $multi / 180 * $w;
									//Debug::log("adding CC lock from ship #".$s->id." vs flight# #".$this->ships[$i]->id." for value: ".$multi);

									$s->locks[] = array($this->ships[$i]->id, $multi);
									$skip = 1; break;
								}
								else if ($this->ships[$i]->salvo){ // salvo, in trajectory ?
									$angle = Math::getAngle2($origin, $this->ships[$i]->getTrajectoryStart());
									if (Math::isInArc($angle, $start, $end)){
										//Debug::log("adding CC lock from ship vs salvo");
										$s->locks[] = array($this->ships[$i]->id, $multi);
										$skip = 1; break;
									}
								}
							}
						}
					}

					if ($skip){
						continue;
					}

					$dest = $this->ships[$i]->getCurrentPosition();
					if (Math::getDist2($origin, $dest) <= $ew->dist){
						$a = Math::getAngle2($origin, $dest);
						Debug::log("versus #".$this->ships[$i]->id.", a: ".$a);
						if (Math::isInArc($a, $start, $end)){
							if ($ew->type == 0){ // LOCK
								Debug::log("locking onto: #".$this->ships[$i]->id);
								$s->locks[] = array($this->ships[$i]->id, $multi);
							}
							else if ($ew->type == 1){ // MASK
								if (!$this->ships[$i]->flight){
									Debug::log("masking from #".$this->ships[$i]->id);
									$s->masks[] = array($this->ships[$i]->id, $multi);
								}
							}
						} else Debug::log("out of arc");
					} else ("out of dist: ".(Math::getDist2($origin, $dest))." EW: ".$ew->dist);
				}
			}

			//foreach ($s->locks as $entry){
			//	Debug::log("lock vs #".$entry[0]." with val: ".$entry[1]);
			//}
		}
	}

	public function setFireOrderDetails(){
		for ($i = sizeof($this->fires)-1; $i >= 0; $i--){
			//echo "fire: ".$this->fires[$i]->id; echo "</br></br>";
			//var_export($this->fires[$i]); echo "</br></br>";
			$this->fires[$i]->shooter = $this->getUnit($this->fires[$i]->shooterid);
			$this->fires[$i]->weapon = $this->fires[$i]->shooter->getSystemById($this->fires[$i]->weaponid);
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
			//Debug::log("fire [".$i."]");
			if (!$this->fires[$i]->resolved){
				//Debug::log("HANDLING");
				if ($this->fires[$i]->shooter->flight == false){
					//var_export($this->fires[$i]->id);
					$this->fires[$i]->target->resolveFireOrder($this->fires[$i]);
				}
			}
		}
		//var_export($this->damages);
	}

	public function resolveFighterFireOrders(){
		// splice and delete fireorders from destroyed fighters
		$toDelete = array();

		for ($i = sizeof($this->fires)-1; $i >= 0; $i--){
			if (!$this->fires[$i]->resolved){
				if ($this->fires[$i]->shooter->flight){
					if ($this->fires[$i]->shooter->getStruct($this->fires[$i]->weapon->fighterId)->destroyed){
						Debug::log("AAA skipping fireorder due to destroyed single shooter");
						$this->fires[$i]->resolved = -1;
					}
				}
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
			if (!$this->fires[$i]->resolved){
				if ($this->fires[$i]->shooter->flight && $this->fires[$i]->target->flight){
					$this->fires[$i]->target->resolveFireOrder($this->fires[$i]);
				}
			}
		}

		// fighter vs non fighter (ball, ship);
		for ($i = 0; $i < sizeof($this->fires); $i++){
			if (!$this->fires[$i]->resolved){
				if ($this->fires[$i]->shooter->flight == true && $this->fires[$i]->target->flight == false){
					if ($this->fires[$i]->shooter->getStruct($this->fires[$i]->weapon->fighterId)->destroyed){
						Debug::log("BBB skipping fireorder due to destroyed single shooter");
						$this->fires[$i]->resolved = -1;
						continue;
					}
					$this->fires[$i]->target->resolveFireOrder($this->fires[$i]);
				}
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
							/*	$this->fires[$i]->shots--;
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

	public function cleanFireOrders(){
		Debug::log("cleanFireOrders, fires: ".sizeof($this->fires));
		DBManager::app()->updateFireOrders($this->fires);
		DBManager::app()->deleteUnresolvedFireOrders($this->gameid);
	}

	public function testUnitCrits(){
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->damaged){
				$this->ships[$i]->testForCrits($this->turn);
			} 
			//else Debug::log("skipping undamaged unit #".$this->ships[$i]->id." for crit testing!");
		}
	}

	public function writeDamageEntries(){
		$data = array();


		for ($i = 0; $i < sizeof($this->ships); $i++){
			$data = array_merge($data, $this->ships[$i]->getNewDamages($this->turn));
		}

		if (sizeof($data)){
			DBManager::app()->insertDamageEntries($data);
		}
	}

	public function writeCritEntries(){
		//Debug::log("writeCritEntries");
		$all = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->destroyed && $this->ships[$i]->ship){continue;}
			$all = array_merge($all, $this->ships[$i]->getNewCrits($this->turn));
		}
		DBManager::app()->insertCritEntries($all, $this->gameid);
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

	public function getReinforcementShips($faction){
		//Debug::log("getShipsForFaction");
		$ships = array();

		switch ($faction){
			case "Earth Alliance";
				$ships = array(
					array("Omega", 4, 3),
					array("Hyperion", 8, 3),
					array("Avenger", 3, 3),
					array("Artemis", 10, 2),
					array("Olympus", 10, 2),
					array("Tethys", 6, 2)
				);
				break;
			case "Centauri Republic";
				$ships = array(
					array("Primus", 8, 3),
					array("Altarian", 10, 3),
					array("Darkner", 10, 2),
					array("Demos", 10, 2),
					array("Vorchan", 8, 2),
					array("Haven", 8, 2),
					);
				break;
			case "Minbari Federation";
				$ships = array(
					array("Sharlin", 8, 3),
					array("Tinashi", 4, 2),
					array("WhiteStar", 5, 2),
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

	public function getShipsForFaction($faction){
		//Debug::log("getShipsForFaction");
		$ships = array();
		$data = array();

		switch ($faction){
			case "Earth Alliance";
				$ships = array(
					"Omega",
					"Avenger",
					"Hyperion",
					"Saggitarius",
					"Artemis",
					"Olympus",
					"Tethys"
				);
				break;
			case "Centauri Republic";
				$ships = array(
					"Octurion",
					"Primus",
					"Altarian",
					"Demos",
					"Darkner",
					"Vorchan",
					"Haven"
					);
				break;
			case "Minbari Federation";
				$ships = array(
					"Sharlin",
					"Tinashi",
					"WhiteStar",
				);
				break;
			case "Narn Regime";
				$ships = array(
					"GQuan"
				);
				break;
			default:
				break;
		}

		$ship;

		for ($i = 0; $i < sizeof($ships); $i++){
			$name = $ships[$i];
			$ship = array(
				"name" => $ships[$i],
				"value" => $name::$value,
				"eta" => 0
			);
			$data[] = $ship;
		}

		return $data;
	}

	public function getPreviewData($name){
		//Debug::log("asking for preview of: ".$name);
		$ship = new $name(1, 1, 0, "", 0, 0, 0, 270, 0, 0, "");
		$ship->setState(0, 0);
		return $ship;
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
