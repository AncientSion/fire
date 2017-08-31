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
	public $intercepts = array();
	public $damages = array();
	public $crits = array();
	public $playerstatus = array();
	public $reinforcements = array();
	public $rdyReinforcements = array();
	public $deploys = array();
	public $incoming = array();
	public $userindex = 0;
	public $flights = array();

	public $flight = 0;
	public $salvo = 0;

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
		$db = DBManager::app();

		$query = array();
		$id = 3;
		$turn = 3;

		$query[] = "update playerstatus set phase = 2, status = 'ready' where gameid = ".$id;
			$query[] = "update games set phase = 2 where id = ".$id;
			$query[] = "update fireorders set resolved = 0, hits = 0 where gameid = ".$id;
			$query[] = "delete from damages where turn = ".$turn;
			$query[] = "delete from systemcrits where turn = ".$turn;

		/*	

		$query[] = "update playerstatus set phase = 2, status = 'ready' where gameid = ".$id;
			$query[] = "update games set phase = 2 where id = ".$id;
			$query[] = "update fireorders set resolved = 0, hits = 0 where gameid = ".$id;
			$query[] = "delete from damages where turn = ".$turn;
			$query[] = "delete from systemcrits where turn = ".$turn;
		*/
		foreach ($query as $sql){
			$db->query($sql);
		}
	}

	public function getClientData(){

		//$this->handleFighterMovementPhaseNew(); return;
		//$this->test(); return;
		//$this->initiateDogfights();
		//$this->createDogfightFires();

	 	//var_dump($this->getUnitById(12)->getEndState(1));

		//$this->setShipLocks($this->getUnitById(2)); return;

		//$this->deploy();();

		return array(
			"id" => $this->gameid,
			"name" => $this->name,
			"status" => $this->status,
			"turn" => $this->turn,
			"phase" => $this->phase,
			"ships" => $this->getShipData(),
			"reinforcements" => $this->rdyReinforcements,
			"deploys" => $this->deploys,
			"incoming" =>$this->incoming
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
		//Debug::log("ships: ".sizeof($this->ships));
		//$this->ballistics = $this->assembleBallistics();

		$this->reinforcements = $db->getAllReinforcements($this->gameid, $this->userid);
		$this->rdyReinforcements = $this->readyReinforcements();
		$this->deploys = $db->getDeployArea($this->gameid, $this->turn);
		$this->incoming = $db->getIncomingShips($this->gameid, $this->turn);
		
		$this->deleteResolvedFireOrders();

		$this->damages = array();
		$this->crits = array();
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
				$s = new $this->reinforcements[$i]["name"](-$this->reinforcements[$i]["id"], $this->userid, $this->turn + $this->reinforcements[$i]["eta"], "available", 0);
				$s->cost = $this->reinforcements[$i]["cost"];
				$s->currentImpulse = $s->baseImpulse;

				for ($j = 0; $j < sizeof($s->structures); $j++){
					$s->structures[$j]->remainingNegation = $s->structures[$j]->negation;
				}
				$data[] = $s;
			}
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
				$db[$i]["destroyed"]
			);

			$unit->facing = $db[$i]["angle"];
			$unit->remainingDelay = $db[$i]["delay"];
			$unit->currentImpulse = $db[$i]["thrust"];
			$unit->x = $db[$i]["x"];
			$unit->y = $db[$i]["y"];

			if (!$unit->ship){
				$unit->addSubUnit($db[$i]["subunits"]);
				$unit->addMissionDB($db[$i]["mission"]);
			}
			$units[] = $unit;
		}

		DBManager::app()->getDamages($units);
		DBManager::app()->getPowers($units);
		DBManager::app()->getCrits($units);
		DBManager::app()->getActions($units, $this->turn);
		DBManager::app()->getEW($units, $this->turn);
		DBManager::app()->getShipLoad($units);
		DBManager::app()->getDogfights($units);


		if ($this->turn > 1){
			for ($i = 0; $i < sizeof($units); $i++){
				$a = $units[$i]->getCurrentPosition();
				for ($j = $i+1; $j < sizeof($units); $j++){
					if ($units[$i]->id != $units[$j]->id){
						$b = $units[$j]->getCurrentPosition();
						if ($a->x == $b->x && $a->y == $b->y){
							//Debug::log("valid: ".$units[$i]->id."/".$units[$j]->id);
							$units[$i]->cc[] = $units[$j]->id;
							$units[$j]->cc[] = $units[$i]->id;
						}
					}
				}
			}
		}

		for ($i = 0; $i < sizeof($units); $i++){
			$units[$i]->addFireDB($this->fires);
			$units[$i]->setState($this->turn); //check damage state after dmg is applied
		}

		return $units;
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
			case 1; // fighters moves
				//$this->handleFighterMovementPhase();
				$this->startFiringPhase();
				break;
			case 2; // from fire to resolve fire
				if ($this->handleFiringPhase()){
					$this->startDamageControlPhase();
				}
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
		return true;
	}

	public function updatePlayerStatus($status){
		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			DBManager::app()->setPlayerstatus($this->playerstatus[$i]["userid"], $this->gameid, $this->turn, $this->phase, $status);
		}
	}

	public function pickReinforcements(){
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
		$this->assembleEndStates();
		DBManager::app()->deleteEmptyLoads($this->gameid);
	}

	public function initBallistics(){
		Debug::log("initBallistics");
		$fires = DBManager::app()->getUnresolvedFireOrders($this->gameid, $this->turn);
		usort($fires, function($a, $b){
			return $a->shooterid - $b->shooterid;
		});

		$adjust = array();
		$units = array();
		for ($i = 0; $i < sizeof($fires); $i++){
			$skip = 0;
			$shooter = $this->getUnitById($fires[$i]->shooterid);
			$launcher = $shooter->getSystemById($fires[$i]->weaponid);
			$fires[$i]->shots = $launcher->getShots($this->turn);
			if (!($launcher instanceof Launcher)){
				Debug::log("FATAL ERROR, no launcher, fire: ".$fires[$i]->id);
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
				if ($units[$j]["userid"] == $shooter->userid && $units[$j]["mission"]["targetid"] == $fires[$i]->targetid && $units[$j]["launchData"]["loads"][0]["name"] == $name){
					$units[$j]["launchData"]["loads"][0]["launch"] += $fires[$i]->shots;
					$skip = 1;
					Debug::log("merging");
					break;
				}
			}

			if ($skip){continue;}

			$sPos = $shooter->getCurrentPosition();
			$tPos = $this->getUnitById($fires[$i]->targetid)->getCurrentPosition();
			$a = Math::getAngle($sPos->x, $sPos->y, $tPos->x, $tPos->y);
			$devi = Math::getPointInDirection($shooter->size/3, $a, $sPos->x + mt_rand(-10, 10), $sPos->y + mt_rand(-10, 10));
			$mission = array("type" => 2, "turn" => $this->turn, "targetid" => $fires[$i]->targetid, "x" => $tPos->x, "y" => $tPos->y, "arrived" => 0);
			$move = array("turn" => $this->turn, "type" => "deploy", "dist" => 0, "x" => $devi->x, "y" => $devi->y, "a" => $a, "cost" => 0, "delay" => 0, "costmod" => 0, "resolved" => 0);
			$launchData = array("shipid" => $shooter->id, "systemid" => $launcher->id, "loads" => array(0 => array("launch" => $fires[$i]->shots, "name" => $name)));

			$units[] = array("gameid" => $this->gameid, "userid" => $shooter->userid, "type" => "Salvo", "name" => "Salvo", "turn" => $this->turn, "eta" => 0,
				"mission" => $mission, "actions" => array($move), "launchData" => $launchData);


		}

		if (sizeof($units)){
			DBManager::app()->insertUnits($this->userid, $this->gameid, $units);
			DBManager::app()->updateBallisticFireOrder($fires);
			DBManager::app()->updateSystemLoad($adjust);
			for ($i = 0; $i < sizeof($units); $i++){
				$this->ships[] = new Salvo($units[$i]["id"], $units[$i]["userid"], $this->turn, "deployed", 0);
				$this->ships[sizeof($this->ships)-1]->actions[] = new Action(-1, $this->turn, "deploy", 0, $devi->x, $devi->y, $a, 0, 0, 0, 0);

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
		$updated = array();

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
				$this->ships[$i]->actions[] = new Action(-1, $this->turn, "jump", $dist, $order->x + $xShift, $order->y + $yShift, $aShift, 0, 0, 0, 0);
				$updated[] = $this->ships[$i];
			}
		}

		if (sizeof($updated)){
			Debug::log("action size: ".sizeof($updated[0]->actions));
			DBManager::app()->insertServerActions($updated);
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

	public function startFighterMovementPhase(){
		//Debug::log("startFighterMovementPhase");
		$dbManager = DBManager::app();
		$this->phase = 1;

		if ($dbManager->setGameTurnPhase($this->gameid, $this->turn, $this->phase)){
			for ($i = 0; $i < sizeof($this->playerstatus); $i++){
				$hasFlight = false;
				for ($j = 0; $j < sizeof($this->ships); $j++){
					if ($this->ships[$j]->userid == $this->playerstatus[$i]["userid"] && $this->ships[$j]->flight){
						$hasFlight = true;
						break;
					}
				}

				if ($hasFlight){
					$dbManager->setPlayerstatus($this->playerstatus[$i]["userid"], $this->gameid, $this->turn, $this->phase, "waiting");
				}
				else $dbManager->setPlayerstatus($this->playerstatus[$i]["userid"], $this->gameid, $this->turn, $this->phase, "ready");
			}
		}

		if ($this->canAdvance($this->gameid)){
			$this->doAdvance();
		}
	}

	public function handleMovementPhase(){
		Debug::log("handleShipMovementPhase");
		$this->handleShipMovement();
		$this->flight = 1;
		$this->handleMixedMovement();
		$this->flight = 0;
		$this->salvo = 1;
		$this->handleMixedMovement();
		$this->salvo = 0;
	}


	public function handleShipMovement(){
		Debug::log("handleShipMovement");
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->ship){
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
		$missions = array();
		$stack = array(array(), array(), array());
		$units = array();

		//resolve order
		//1. patrol
		//2. strike on ship

	
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->flight && !$this->ships[$i]->flight || $this->salvo && !$this->ships[$i]->salvo){
				continue;
			}

			if ($this->ships[$i]->mission->arrived){ // already at target location
				if ($this->ships[$i]->mission->type == 2){ // strike
					$t = $this->getUnitById($this->ships[$i]->mission->targetid);
					$tPos = $t->getCurrentPosition();
					$dist = Math::getDist2($this->ships[$i]->getCurrentPosition(), $tPos);
					$angle = Math::getAngle2($this->ships[$i]->getCurrentPosition(), $tPos);
					$move = new Action(-1, $this->turn,	"move",	$dist, $tPos->x, $tPos->y, $angle, 0, 0, 0, 0);
					$this->ships[$i]->actions[] = $move;
					Debug::log("STATIC STRIKE #".$this->ships[$i]->id.", adding move to: ".$move->x."/".$move->y);
					$units[] = $this->ships[$i];
				} 
				else {
					$tPos = $this->ships[$i]->getCurrentPosition(); // Patrol
					$move = new Action(-1, $this->turn,	"move",	0, $tPos->x, $tPos->y, 0, 0, 0, 0, 0);
					$this->ships[$i]->actions[] = $move;
					Debug::log("STATIC PATROL #".$this->ships[$i]->id.", adding move to: ".$move->x."/".$move->y);
					$units[] = $this->ships[$i];
				}

				$this->ships[$i]->mission->x = $tPos->x;
				$this->ships[$i]->mission->y = $tPos->y;
				$missions[] = $this->ships[$i]->mission;
			}
			else { // on way
				if ($this->ships[$i]->mission->type == 2){ // strike
					$target = $this->getUnitById($this->ships[$i]->mission->targetid);
					if ($target->ship){
						$stack[1][] = $this->ships[$i];
					}
				}
				else { // patrol
					$stack[0][] = $this->ships[$i];
					continue;
				}
			}
		}

		if (sizeof($units)){
			DBManager::app()->insertServerActions($units);
			$units = array();
		}

		Debug::log("layer 0 -> patrol target, layer 1 => strike");
		for ($i = 0; $i < sizeof($stack); $i++){
			Debug::log("resolving layer #".$i);
			for ($j = 0; $j < sizeof($stack[$i]); $j++){
				Debug::log("resolving mixed #".$stack[$i][$j]->id);
				Debug::log("_____________________");
				$origin = $stack[$i][$j]->getCurrentPosition();
				$impulse = $stack[$i][$j]->getCurrentImpulse();
				$tPos;
				$dist;
				$angle;
				if ($stack[$i][$j]->mission->type == 1){
					$tPos = new Point($stack[$i][$j]->mission->x, $stack[$i][$j]->mission->y); // patrol
				}
				else $tPos = $this->getUnitById($stack[$i][$j]->mission->targetid)->getCurrentPosition(); // strike / int

				$stack[$i][$j]->mission->x = $tPos->x;
				$stack[$i][$j]->mission->y = $tPos->y;
				$dist = Math::getDist2($origin, $tPos);
				$angle = Math::getAngle2($origin, $tPos);

				Debug::log("Flight #".$stack[$i][$j]->id.", impulse: ".$impulse);
				Debug::log("From ".$origin->x."/".$origin->y." to ".$tPos->x."/".$tPos->y);
				Debug::log("Dist ".$dist.", angle: ".$angle);

				if ($impulse <= $dist){
					Debug::log("close in");
					$tPos = Math::getPointInDirection($impulse, $angle, $origin->x, $origin->y);
				}
				else {
					Debug::log("arrival");
					$stack[$i][$j]->mission->arrived = $this->turn;
				}
				
				$missions[] = $stack[$i][$j]->mission;
				$stack[$i][$j]->facing = $angle;
				$move = new Action(-1, $this->turn,	"move",	$dist, $tPos->x, $tPos->y,
				$angle, 0, 0, 0, 0);
				$stack[$i][$j]->actions[] = $move;

				Debug::log("adding move to: ".$move->x."/".$move->y);

				$units[] = $stack[$i][$j];
			}
			if (sizeof($units)){
				DBManager::app()->insertServerActions($units);
				$units = array();
			}
		}
		
		if (sizeof($missions)){
			DBManager::app()->updateMissionState($missions);
		}
	}

	public function assembleEndStates(){
		Debug::log("assembleEndStates");
		$states = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			$states[] = $this->ships[$i]->getEndState($this->turn, $this->phase);
		}

		if ($this->phase == 3){
			for ($i = 0; $i < sizeof($this->incoming); $i++){
				if ($this->incoming[$i]["available"] == $this->turn+1){
					$states[] = array(
						"id" => $this->incoming[$i]["id"], 
						"x" => $this->incoming[$i]["x"], 
						"y" => $this->incoming[$i]["y"], 
						"delay" => 0, 
						"angle" => $this->incoming[$i]["a"], 
						"thrust" => 0
					);
				}
			}
		}
		if (sizeof($states)){DBManager::app()->updateUnitEndState($states, $this->turn, $this->phase);}
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
		$this->updateFireOrders($this->fires);
		$this->resolveBallistics();

	//$this->handleBallisticInterception();

		$this->deleteFireOrders();
		$this->testCrits();
		$this->writeDamageEntries();
		$this->writeCritEntries();
		$this->setUnitStatus();
		$time += microtime(true); 
		Debug::log("handleFiringPhase time: ".round($time, 3)." seconds.");
		return true;
	}
	
	public function handleDamageControlPhase(){
		$this->assembleEndStates();
		return true;
	}


	public function endTurn(){
		Debug::log("endTurn");
		$this->alterReinforcementPoints();

		$data = array();
		for ($i = 0; $i < sizeof($this->incoming); $i++){
			if ($this->incoming[$i]["available"] == $this->turn+1){
				$data[] = $this->incoming[$i]["id"];
			}
		}
		DBManager::app()->resolveDeployActions($data);
		DBManager::app()->destroyUnitsDB(array($this->ships, $this->ballistics));
	}

	public function alterReinforcementPoints(){
		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			DBManager::app()->addReinforceValue($this->playerstatus[$i]["userid"], $this->gameid, $this->reinforce);
		};
	}

	public function startNewTurn(){
		//Debug::log("startNewTurn");
		$this->turn = $this->turn+1;
		$this->phase = -1;
		DBManager::app()->setGameTurnPhase($this->gameid, $this->turn, $this->phase);
	}

	public function startDeploymentPhase(){
		//Debug::log("startDeploymentPhase");
		$this->pickReinforcements();
		$this->updatePlayerStatus("waiting");
		return;
	}

	public function setupShips(){
		for ($i = 0; $i < sizeof($this->ships); $i++){
			$this->ships[$i]->setFacing();
			$this->ships[$i]->setPosition();
			if ($this->ships[$i]->ship){
				$this->ships[$i]->setupForDamage();
				$this->setShipLocks($this->ships[$i]);
			}
		}

		for ($i = 0; $i < sizeof($this->ships); $i++){
			$aPos = $this->ships[$i]->getCurrentPosition();
			for ($j = $i+1; $j < sizeof($this->ships); $j++){
				if ($this->ships[$i]->userid == $this->ships[$j]->userid){continue;}
				$bPos = $this->ships[$j]->getCurrentPosition();
				$dist = Math::getDist2($aPos, $bPos);
				$this->ships[$i]->distances[] = array($this->ships[$j]->id, $dist);
				$this->ships[$j]->distances[] = array($this->ships[$i]->id, $dist);

				//$this->ships[$i]->angles[] = array($this->ships[$j]->id, round(Math::addAngle($this->ships[$i]->getFacing(), Math::getAngle2($aPos, $bPos))));
				//$this->ships[$j]->angles[] = array($this->ships[$i]->id, round(Math::addAngle($this->ships[$j]->getFacing(), Math::getAngle2($bPos, $aPos))));

				$this->ships[$i]->angles[] = array($this->ships[$j]->id, round(Math::getAngle2($aPos, $bPos)));
				$this->ships[$j]->angles[] = array($this->ships[$i]->id, round(Math::getAngle2($bPos, $aPos)));
			}
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

	public function setShipLocks($ship){
		$origin = $ship->getCurrentPosition();
		$sensor =  $ship->getSystemByName("Sensor");
		$ew = $sensor->getEW($this->turn);
		if ($sensor->destroyed || $sensor->disabled  || !$ew){
			return;
		}
		else if ($ew->type == 2 || $ew->type == 3){
			for ($i = 0; $i < sizeof($this->ships); $i++){
				if ($this->ships[$i]->id == $ship->id || $ship->userid == $this->ships[$i]->userid){continue;}
				switch ($ew->type){
					case 2: $ship->locks[] = array($this->ships[$i]->id, 0.2); break;
					case 3: $ship->masks[] = array($this->ships[$i]->id, 0.2); break;
				}
			}	

			for ($i = 0; $i < sizeof($this->ballistics); $i++){
				if ($this->ballistics[$i]->id == $ship->id || $ship->userid == $this->ballistics[$i]->userid){continue;}
				switch ($ew->type){
					case 2: $ship->locks[] = array($this->ballistics[$i]->id, 0.2); break;
					case 3: $ship->masks[] = array($this->ballistics[$i]->id, 0.2); break;
				}
			}
		}
		else {
			$str = $sensor->getOutput($this->turn);
			$len = 20;
			$p = 1.5;
			$w = min(180, $len * pow($str/$ew->dist, $p));
			$start = Math::addAngle(0 + $w-$ship->getFacing(), $ew->angle);
			$end = Math::addAngle(360 - $w-$ship->getFacing(), $ew->angle);

			Debug::log("specific EW for ship #".$ship->id.", EW from ".$start." to ".$end.", dist: ".$ew->dist);
			for ($i = 0; $i < sizeof($this->ships); $i++){
				$skip = 0;
				if ($this->ships[$i]->id == $ship->id || $ship->userid == $this->ships[$i]->userid){continue;}

				if ($this->ships[$i]->flight && $ew->type == 0){
					for ($j = 0; $j < sizeof($ship->cc); $j++){
						if ($ship->cc[$j] == $this->ships[$i]->id){
							$ship->locks[] = array($this->ships[$i]->id, 0.5);
							$skip = 1;
							break;
						}
					}
				}

				if ($skip){
					continue;
				}

				$dest = $this->ships[$i]->getCurrentPosition();
				if (Math::getDist2($origin, $dest) <= $ew->dist){
					$a = Math::getAngle2($origin, $dest);
					//Debug::log("versus #".$this->ships[$i]->id.", a: ".$a);
					if (Math::isInArc($a, $start, $end)){
						if ($ew->type == 0){ // LOCK
							//Debug::log("locking onto: #".$this->ships[$i]->id);
							$ship->locks[] = array($this->ships[$i]->id, 0.5);
						}
						else if ($ew->type == 1){ // MASK
							if (!$this->ships[$i]->flight){
								//Debug::log("masking from #".$this->ships[$i]->id);
								$ship->masks[] = array($this->ships[$i]->id, 0.5);
							}
						}
					}// else Debug::log("out of arc");
				}
			}
		}
	}

	public function setFireOrderDetails(){
		for ($i = sizeof($this->fires)-1; $i >= 0; $i--){
			//echo "fire: ".$this->fires[$i]->id; echo "</br></br>";
			//var_export($this->fires[$i]); echo "</br></br>";
			$this->fires[$i]->shooter = $this->getUnitById($this->fires[$i]->shooterid);
			$this->fires[$i]->weapon = $this->fires[$i]->shooter->getSystemById($this->fires[$i]->weaponid);
			//$this->fires[$i]->shots = $this->fires[$i]->weapon->getShots($this->turn);
			$this->fires[$i]->shots = 1;
			$this->fires[$i]->target = $this->getUnitById($this->fires[$i]->targetid);
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
			if (!$this->fires[$i]->resolved){
				if ($this->fires[$i]->shooter->flight == false){
					//var_export($this->fires[$i]->id);
					$this->fires[$i]->target->resolveFireOrder($this->fires[$i]);
					if (sizeof($this->fires[$i]->damages)){
						$this->damages = array_merge($this->damages, $this->fires[$i]->damages);
					}
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
					if ($this->fires[$i]->shooter->getStructureById($this->fires[$i]->weapon->fighterId)->destroyed){
						$this->fires[$i]->resolved = -1;
					}
				}
			}
		}

	/*	for ($i = 0; $i < sizeof($this->fires); $i++){
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
					if (sizeof($this->fires[$i]->damages)){
						$this->damages = array_merge($this->damages, $this->fires[$i]->damages);
					}
				}
			}
		}

		// fighter vs non fighter (ball, ship);
		for ($i = 0; $i < sizeof($this->fires); $i++){
			if (!$this->fires[$i]->resolved){
				if ($this->fires[$i]->shooter->flight == true && $this->fires[$i]->target->flight == false){
					if ($this->fires[$i]->shooter->getStructureById($this->fires[$i]->weapon->fighterId)->destroyed){
						continue;
					}
					$this->fires[$i]->target->resolveFireOrder($this->fires[$i]);
					//Debug::log("resolving fire id: ".$this->fires[$i]->id);
					if (sizeof($this->fires[$i]->damages)){
						$this->damages = array_merge($this->damages, $this->fires[$i]->damages);
					}
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

	public function resolveBallistics(){
		Debug::log("resolveBallistics");
		$fires = array();

		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->salvo && !$this->ships[$i]->isDestroyed()){
				if ($this->ships[$i]->mission->arrived){
					$target = $this->getUnitById($this->ships[$i]->mission->targetid);
					$fire = $this->ships[$i]->getFireOrder($this->gameid, $this->turn, $target);
					//Debug::log("Salvo #".$this->ships[$i]->id." attacking: ".$fire->target->name." #".$fire->target->id." with ".$fire->shooter->getShots($this->turn)."x ".$fire->weapon->name);
					$fires[] = $fire;
				}
			}
		}

		if (sizeof($fires)){
			DBManager::app()->insertServerFireOrder($fires);

			for ($i = 0; $i < sizeof($fires); $i++){
				$fires[$i]->shots = $fires[$i]->shooter->getShots($this->turn);
				$fires[$i]->target->resolveFireOrder($fires[$i]);
				if (sizeof($fires[$i]->damages)){
					$this->damages = array_merge($this->damages, $fires[$i]->damages);
				}
			}
			$this->updateFireOrders($this->intercepts);
		}
	}


	public function createInterceptionBallisticAction($ballistic){
		Debug::log("createInterceptionBallisticAction, size: ".sizeof($ballistic));

		if (!$ballistic->isDestroyed()){
			$interceptStartPos = $ballistic->getCurrentPosition();
			$interceptRange = $ballistic->getCurrentImpulse();
			$speedMod = $interceptRange / $ballistic->target->getCurrentImpulse();
			//Debug::log("own i: ".$interceptRange.", t: ".$ballistic->target->getCurrentImplse();.", r: ".$speedMod);
			//var_export($ballistic->target->actions);
			$targetPos = $ballistic->target->getCurrentPosition();
			$targetMoveVector = new Vector($targetPos, $ballistic->target->actions[sizeof($ballistic->target->actions)-1]);
			//this.finalStep = getIntercept(this.getPlannedPosition(), target, vector, speedMod);
			$interceptEndPos = Math::canIntercept($interceptStartPos, $targetPos, $targetMoveVector, $speedMod);
			if ($interceptEndPos){
				$interceptDist = Math::getDist2($interceptStartPos, $interceptEndPos);
				//Debug::log("intercept possible, dist: ".$interceptDist.", my impulse/range: ".$interceptRange.", sMod:".$speedMod);
				//if ($interceptDist > $interceptRange || $interceptDist / $speedMod > $targetMoveVector->m){
				if ($interceptDist > $interceptRange){
					//Debug::log("intercept home in");
					$a = Math::getAngle($interceptStartPos->x, $interceptStartPos->y, $interceptEndPos->x, $interceptEndPos->y);
					$iPos = Math::getPointInDirection($interceptRange, $a, $interceptStartPos->x, $interceptStartPos->y);
					$ballistic->actions[] = new Action(-1, 
						$this->turn,
						"move",
						$interceptRange,
						$iPos->x,
						$iPos->y,
						0, 0, 0, 0, 0
					);
				}
				else if ($interceptDist <= $interceptRange){ // IMPACT VECTOR
					//Debug::log("intercept impact");
					$ox = mt_rand(-$ballistic->target->size/7, $ballistic->target->size/7);
					$oy = mt_rand(-$ballistic->target->size/7, $ballistic->target->size/7);
					$ballistic->actions[] = new Action(-1, 
						$this->turn,
						"impact",
						$interceptDist,
						$interceptEndPos->x + $ox,
						$interceptEndPos->y + $oy,
						0, 0, 0, 0, 0
					);
				}
				else {
					Debug::log("somethin went wrong");
				}
			}
			else {
				Debug::log("intercept impossible yet");
				$tPos = $ballistic->target->actions[sizeof($ballistic->target->actions)-1];
				$a = Math::getAngle($interceptStartPos->x, $interceptStartPos->y, $tPos->x, $tPos->y);
				$iPos = Math::getPointInDirection($interceptRange, $a, $interceptStartPos->x, $interceptStartPos->y);
				$ballistic->actions[] = new Action(-1, 
					$this->turn,
					"move",
					$interceptRange,
					$iPos->x,
					$iPos->y,
					0, 0, 0, 0, 0
				);
			}
		}
	}

	public function handleBallisticInterception(){ // all non-salvo versus alvo
		Debug::log("handleBallisticInterception | balls:".sizeof($this->ballistics).", intercepts: ".sizeof($this->intercepts));

		//sort to shooter, target, id
		usort($this->intercepts, function($a, $b){
			if ($a->targetid != $b->targetid){
				return $a->targetid - $b->targetid;
			}
			else return $a->shooterid - $b->shooterid;
		});

		//foreach ($this->intercepts as $int){Debug::log("int id: ".$int->id.", shooter #".$int->shooterid." versus targetid #".$int->targetid);}

		DBManager::app()->insertServerActions($this->ballistics);
		
		for ($i = 0; $i < sizeof($this->ballistics); $i++){
			$ints = array();
			$index = 0;
			for ($j = $index; $j < sizeof($this->intercepts); $j++){
				if ($this->ballistics[$i]->id == $this->intercepts[$j]->targetid){
					$ints[] = $this->intercepts[$j];
				}
				else if (sizeof($ints)){
					$index = $j;
					break;
				}
			}

			for ($j = 0; $j < sizeof($ints); $j++){
				$ints[$j]->shooter = $this->getUnitById($ints[$j]->shooterid);
				$ints[$j]->weapon = $ints[$j]->shooter->getSystemById($ints[$j]->weaponid);
				$ints[$j]->target = $this->ballistics[$i];
				Debug::log("HANDLE INTERCEPT #".$j+1);
				$ints[$j]->target->resolveFireOrder($ints[$j]);
				if (sizeof($ints[$j]->damages)){
					$this->damages = array_merge($this->damages, $ints[$j]->damages);
				}
			}
		}
		$this->updateFireOrders($this->intercepts);
	}

	public function deleteFireOrders(){
		dbManager::app()->deleteUnresolvedFireOrders($this->gameid);
	}

	public function testCrits(){
		for ($i = 0; $i < sizeof($this->ships); $i++){
			$this->ships[$i]->testCriticals($this->turn);
		}
		for ($i = 0; $i < sizeof($this->ballistics); $i++){
			$this->ballistics[$i]->testCriticals($this->turn);
		}
	}

	public function updateFireOrders($fires){
		if ($fires){
			DBManager::app()->updateFireOrders($fires);
		}
	}

	public function writeDamageEntries(){
		if (sizeof($this->damages)){
			DBManager::app()->insertDamageEntries($this->damages);
		}
	}

	public function writeCritEntries(){
		//Debug::log("writeCritEntries");
		$all = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			$all = array_merge($all, $this->ships[$i]->getNewCrits($this->turn));
		}
		for ($i = 0; $i < sizeof($this->ballistics); $i++){
			$all = array_merge($all, $this->ballistics[$i]->getNewCrits($this->turn));
		}
		DBManager::app()->insertCritEntries($all, $this->gameid);
	}

	public function setUnitStatus(){
		DBManager::app()->setUnitStatusDB($this->ships);
		DBManager::app()->setUnitStatusDB($this->ballistics);
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
		return 1 + sizeof($this->ships) + sizeof($this->ballistics);
	}

	public function getUnitById($id){
		//Debug::log("looking for unit :".$unitid);
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->id == $id){
				return $this->ships[$i];
			}
		}
		for ($i = 0; $i < sizeof($this->ballistics); $i++){
			if ($this->ballistics[$i]->id == $id){
				return $this->ballistics[$i];
			}
		}
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
		$data = array();

		switch ($faction){
			case "Earth Alliance";
				$ships = array(
					array("Omega", 8, 2),
					array("Hyperion", 6, 1),
					array("Artemis", 5, 0),
					array("Tethys", 4, -1)
				);
				break;
			case "Centauri Republic";
				$ships = array(
					array("Primus", 8, 2),
					array("Altarian", 5, 0),
					array("Darkner", 4, 0),
					array("Demos", 5, 0),
					array("Vorchan", 3, -1),
					array("Haven", 3, -1),
					);
				break;
			case "Minbari Federation";
				$ships = array(
					array("Sharlin", 8, 1),
					array("Tinashi", 4, 0),
					array("WhiteStar", 5, -2),
				);
				break;
			case "Narn Regime";
				$ships = array(
					array("GQuan", 6, 0)
				);
				break;
			default:
				break;
		}

		$ship;

		for ($i = 0; $i < sizeof($ships); $i++){
			$name = $ships[$i][0];
			$ship = array(
				"name" => $ships[$i][0],
				"value" => $name::$value,
				"weight" => $ships[$i][1],
				"eta" => $ships[$i][2]
			);
			$data[] = $ship;
		}

		return $data;

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
					"Tethys"
				);
				break;
			case "Centauri Republic";
				$ships = array(
					"Primus",
					"Altarian",
					"Darkner",
					"Demos",
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
		$ship = new $name(1, 1, 0, "", 0);
		$ship->setState(0);
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
				$ships[sizeof($ships)-1]->setProps(0);
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
			$ship->setProps(1);
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
