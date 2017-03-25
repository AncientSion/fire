<?php

class Manager {
	public $userid;
	public $gameid;
	public $game;
	public $turn;
	public $phase;
	public $index = 0;
	public $faction = "";
	public $value = 0;

	public $ships = array();
	public $gd = array();
	public $fires = array();
	public $intercepts = array();
	public $damages = array();
	public $crits = array();
	public $playerstatus = array();
	public $reinforcements = array();
	public $reinforce = array();
	public $incoming = array();

	public $flights = array();

	function __construct($userid = 0, $gameid = 0){
		//$this->getMemory();
		$this->userid = $userid;
		$this->gameid = $gameid;

		if ($this->gameid & !$this->userid){
			$this->getGameAndPlayerStatus();
			$this->getGameData();
		}
		else if ($this->gameid){
			$this->getGameAndPlayerStatus();

			if ($this->game["status"] == "open"){
				//Debug::log("open");
				return;
			}
			else {
				$this->getGameData();
			}
		}
		//$this->getMemory();
	}

	public function getMemory(){
		$size = memory_get_usage(true);
	    $unit=array('b','kb','mb','gb','tb','pb');
	    debug::log(@round($size/pow(1024,($i=floor(log($size,1024)))),2).' '.$unit[$i]);
	}
	
	public function getUsername(){
		$name = DBManager::app()->getUsername($this->userid);
		
		if ($name){
			return $name;
		}
	}
	
	public function getOngoingGames(){
		$list = DBManager::app()->getOngoingGames($this->userid);
		if ($list){
			return $list;
		}
		else {
			return null;
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

	public function getGameAndPlayerStatus(){
		//Debug::log("getGameAndPlayerStatus");
		$this->game = DBManager::app()->getGameDetails($this->gameid);
		$this->playerstatus = DBManager::app()->getPlayerStatus($this->gameid);
	}

	public function validateFleetCost($ships){
		$used = 0;

		for ($i = 0; $i < sizeof($ships); $i++){
			$used = $used + $ships[$i]["value"];
		}

		$avail = $this->game["pv"];

		if ($used <= $avail){
			return $avail - $used;
		}
		return 0;
	}

	public function getGameData(){
		$db = DBManager::app();

		$this->game = $db->getGameDetails($this->gameid);
		$this->turn = $this->game["turn"];
		define("turn", $this->game["turn"]);
		$this->phase = $this->game["phase"];
		define("phase", $this->game["phase"]);

		//Debug::log("getGameData for gameid: ".$this->gameid.", turn: ".$this->turn);

		$this->playerstatus = $db->getPlayerStatus($this->gameid);
		$this->setReinforceStatus();

		$this->fires = $db->getAllFireOrders($this->gameid);

		$this->ballistics = $this->assembleBallistics();
		$this->ships = $this->assembleUnits();
		//$this->deleteResolvedFireOrders();

		$this->reinforcements = $db->getAvailableReinforcements($this->gameid, $this->userid);
		$this->incoming = $db->getIncomingShips($this->gameid, $this->turn);

		$this->damages = array();
		$this->crits = array();
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

	public function getShipData($userid){
		if ($this->phase == -1){
			for ($i = 0; $i < sizeof($this->ships); $i++){
				if ($this->ships[$i]->userid != $userid){
					for ($j = 0; $j < sizeof($this->ships[$i]->structures); $j++){
						for ($k = 0; $k < sizeof($this->ships[$i]->structures[$j]->systems); $k++){
							for ($l = sizeof($this->ships[$i]->structures[$j]->systems[$k]->powers)-1; $l >= 0; $l--){
								if ($this->ships[$i]->structures[$j]->systems[$k]->powers[$l]->turn == $this->turn){
									array_splice($this->ships[$i]->structures[$j]->systems[$k]->powers, $l, 1);
								}
								else {
									break;
								}
							}
						}
					}
				}
			}
		}
		/*
		else if ($this->phase == 0 || $this->phase == 1){
			for ($i = 0; $i < sizeof($this->ships); $i++){
				if ($this->ships[$i]->userid != $userid){
					for ($j = sizeof($this->ships[$i]->actions)-1; $j >= 0; $j--){
						if (!$this->ships[$i]->actions[$j]->resolved){
							array_splice($this->ships[$i]->actions, $j, 1);
						}
					}
				}
			}
		}
		*/
		return $this->ships;
	}

	public function deleteResolvedFireOrders(){
		for ($i = sizeof($this->fires)-1; $i >= 0; $i--){
			if ($this->fires[$i]->resolved){
				array_splice($this->fires, $i, 1);
			}
		}
	}

	public function createGame($name){
		if (DBManager::app()->createGame($this->userid, $name)){
			return true;
		}
	}	

	public function getGameStatus($gameid, $turn){
		$status = DBManager::app()->getGameStatus($gameid, $this->userid, $turn);
		
		if ($status){
			return $status;
		}
	}

	public function canAdvanceFromLobby($gameid){
		$this->purge();
		$status = DBManager::app()->getPlayerStatus($gameid);

		for ($i = 0; $i < sizeof($status); $i++){
			if ($status[$i]["status"] == "waiting"){
				return false;
			}
		}

		return true;
	}

	public function purge(){
		$this->userid;
		$this->gameid;
		$this->game;
		$this->turn;
		$this->userid;
		$this->phase;
		$this->index;

		$this->ships = array();
		$this->gd = array();
		$this->fires = array();
		$this->damages = array();
		$this->playerstatus = array();
		return true;
	}

	public function doAdvanceFromLobby($gameid){
		$this->gameid = $gameid;
		$this->getGameData();
		$this->doAdvanceGameState();
	}

	public function canAdvanceGameState(){
		Debug::log("canAdvanceGameState ?");

		if ($this->game["status"] == "open"){
			return false;
		}
		else if (sizeof($this->playerstatus) >= 2){
			for ($i = 0; $i < sizeof($this->playerstatus); $i++){
				//echo json_encode($this->playerstatus[$i]);
				if ($this->playerstatus[$i]["status"] == "waiting"){
					return false;
				}
			}
		}
		return true;
	}

	public function doAdvanceGameState(){
		Debug::log("doAdvanceGameState for game".$this->gameid." from phase ".$this->phase." to phase ".($this->phase+1));

		$time = -microtime(true);

		switch ($this->phase){
			case -1; // from deploy to move
				$this->handleDeploymentPhase();
				$this->startShipMovementPhase();
				break;
			case 0; // ship moves
				$this->handleShipMovementPhase();
				$this->startFighterMovementPhase();
				break;
			case 1; // fighters moves
				$this->handleFighterMovementPhase();
				$this->startFiringPhase();
				break;
			case 2; // from fire to resolve fire
				$this->handleFiringPhase();
				$this->startDamageControlPhase();
				break;
			case 3; // from damage control to NEW TURN - deploymnt
				if ($this->handleDamageControlPhase()){
					$this->endTurn();
					$this->startNewTurn();
					$this->startDeploymentPhase();
				}
				break;
			default:
				break;
		}
		$time += microtime(true); 
		Debug::log("time: ".round($time, 3)." seconds.");
		return true;
	}
	
	public function assembleUnits(){
		$db =  DBManager::app()->getActiveUnits($this->gameid, $this->turn); 
		$units = array();

		for ($i = 0; $i < sizeof($db); $i++){
			$unit = new $db[$i]["classname"](
				$db[$i]["id"],
				$db[$i]["userid"],
				$db[$i]["available"]
			);

			if (get_class($unit) == "Flight"){
				$unit->addFighters($db[$i]["fighters"]);
			}
			$units[] = $unit;
		}

		DBManager::app()->getDamages($units);
		DBManager::app()->getPowers($units);
		DBManager::app()->getCrits($units);
		DBManager::app()->getActions($units);
		DBManager::app()->getShipLoad($units);
		DBManager::app()->getDogfights($units);

		for ($i = 0; $i < sizeof($units); $i++){
			$units[$i]->addFireDB($this->fires);
			$units[$i]->setState(); //check damage state after dmg is applied
		}

		return $units;
	}

	public function assembleBallistics(){
		//Debug::log("assembleBallistics");
		$ballistics = DBManager::app()->getActiveBallistics($this->gameid, $this->turn);

		for ($i = 0; $i < sizeof($ballistics); $i++){
			$ballistics[$i] = new Salvo(
				$ballistics[$i]["id"],
				$ballistics[$i]["userid"],
				$ballistics[$i]["ship"],
				$ballistics[$i]["classname"],
				$ballistics[$i]["status"],
				$ballistics[$i]["available"],
				$ballistics[$i]["destroyed"]
			);
		}
		DBManager::app()->getDamages($ballistics);
		DBManager::app()->getCrits($ballistics);
		DBManager::app()->getActions($ballistics);

		for ($i = 0; $i < sizeof($ballistics); $i++){ //check damage state after dmg is applied
			$ballistics[$i]->addFireDB($this->fires);
			$ballistics[$i]->setState();
		}

		return $ballistics;
	}

	public function pickReinforcements(){
		Debug::log("pickReinforcements");
		if ($this->turn > 1){
			for ($i = 0; $i < sizeof($this->playerstatus); $i++){
				$picks = array();
				$validShips = $this->getShipsForFaction($this->playerstatus[$i]["faction"]);
				for ($j = 0; $j < 2; $j++){
					if (mt_rand(0, 1) == 1){
						$picks[] = $validShips[mt_rand(0, sizeof($validShips)-1)];
						$picks[sizeof($picks)-1]["arrival"] = mt_rand(2, 4);
					}
				}
				if (sizeof($picks)){
					DBManager::app()->insertReinforcements($this->gameid, $this->playerstatus[$i]["userid"], $picks);
				}
			
				DBManager::app()->setPlayerstatus($this->playerstatus[$i]["userid"], $this->gameid, $this->turn, $this->phase, "waiting");
			}
		}
		return;
	}

	public function handleDeploymentPhase(){
		Debug::log("handleDeploymentPhase");
		$this->initBallistics();
		DBManager::app()->deleteEmptyLoads($this->gameid);
		DBManager::app()->resolveDeployActions($this->gameid, $this->turn);
	}

	public function initBallistics(){
		Debug::log("initBallistics");
		$fires = DBManager::app()->getOpenBallisticFireOrders($this->gameid, $this->turn);
		$balls = array();

		for ($i = 0; $i < sizeof($fires); $i++){
			for ($j = 0; $j < sizeof($this->ships); $j++){
				if ($fires[$i]->shooterid == $this->ships[$j]->id){
					for ($k = 0; $k < sizeof($this->ships[$j]->structures); $k++){
						for ($l = 0; $l < sizeof($this->ships[$j]->structures[$k]->systems); $l++){
							if ($fires[$i]->weaponid == $this->ships[$j]->structures[$k]->systems[$l]->id){

								for ($m = 0; $m < sizeof($balls); $m++){
									if ($balls[$m]->destroyed == $this->ships[$j]->id){
										if ($this->ships[$j]->structures[$k]->systems[$l]->getAmmo() == $balls[$m]->classname){
											$balls[$m]->amount += $this->fires[$i]->shots;
											break 4;
										}
									}
								}

								//($id, $userid, $fireid, $classname, $status, $amount, $destroyed){
								$ball = new Salvo(
									0,
									$this->ships[$j]->userid,
									$fires[$i]->targetid,
									$this->ships[$j]->structures[$k]->systems[$l]->getAmmo(),
									"launched",
									$fires[$i]->shots,
									$this->ships[$j]->id // shooter id
								);

								$sPos = $this->ships[$j]->getCurrentPosition();
								$tPos = $this->getUnitById($this->fires[$i]->targetid)->getCurrentPosition();
								$a = Math::getAngle($sPos->x, $sPos->y, $tPos->x, $tPos->y);
								
								$launchPoint = Math::getPointInDirection(
									$this->ships[$j]->size/3 + mt_rand($this->ships[$j]->size/5, $this->ships[$j]->size/2.5),
									$a,
									$sPos->x + mt_rand(-6, 6),
									$sPos->y + mt_rand(-6, 6)
								);

								$ball->actions[] = new Action(
									$this->turn,
									"launch",
									0,
									$launchPoint->x,
									$launchPoint->y,
									0, 0, 0, 0, 0
								);
								$balls[] = $ball;
								break 3;
							}
						}
					}
				}
			}
		}
		if (sizeof($balls)){
			DBManager::app()->insertBallistics($this->gameid, $balls);
			DBManager::app()->updateBallisticFireOrder($fires);
		}
	}

	public function startShipMovementPhase(){
		Debug::log("startShipMovementPhase");
		$dbManager = DBManager::app();
		$this->phase = 0;

		if ($dbManager->setGameTurnPhase($this->gameid, $this->turn, $this->phase)){
			$players = $dbManager->getPlayerStatus($this->gameid);

			for ($i = 0; $i < sizeof($players); $i++){
				if ($dbManager->setPlayerstatus($players[$i]["userid"], $this->gameid, $this->turn, $this->phase, "waiting")){
					continue;
				}
				else {
					return false;
				}
			}

			return true;
		}
	}

	public function startFighterMovementPhase(){
		Debug::log("startFighterMovementPhase");
		$dbManager = DBManager::app();
		$this->phase = 1;
		$players;

		if ($dbManager->setGameTurnPhase($this->gameid, $this->turn, $this->phase)){
			$players = $dbManager->getPlayerStatus($this->gameid);

			for ($i = 0; $i < sizeof($players); $i++){
				if ($dbManager->setPlayerstatus($players[$i]["userid"], $this->gameid, $this->turn, $this->phase, "waiting")){
					continue;
				}
			}
		}

		$flight = false;
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->flight){
				$flight = true;
				break;
			}
		}

		if (!$flight){
			for ($i = 0; $i < sizeof($players); $i++){
				if ($dbManager->setPlayerstatus($players[$i]["userid"], $this->gameid, $this->turn, $this->phase, "ready")){
					continue;
				}
			}
			$this->playerstatus = DBManager::app()->getPlayerStatus($this->gameid);
			$this->doAdvanceGameState();
		}

		return true;
	}

	public function handleShipMovementPhase(){
		Debug::log("handleShipMovementPhase");
		$this->resolveUnitMovement();
	}

	public function handleFighterMovementPhase(){
		Debug::log("handleFighterMovementPhase");
		$this->resolveUnitMovement();
		$this->initiateDogfights();
		$this->createDogfightFires();
	}
	
	public function resolveUnitMovement(){
		Debug::log("resolveUnitMovement");
		for ($i = 0; $i < sizeof($this->ships); $i++){
			for ($j = sizeof($this->ships[$i]->actions)-1; $j >= 0; $j--){
				if ($this->ships[$i]->actions[$j]->resolved == 0){
					$this->ships[$i]->actions[$j]->resolved = 1;
				}
				else {
					break 1;
				}
			}
		}
		DBManager::app()->resolveUnitMovementDB($this->ships);
	}

	public function initiateDogfights(){
		Debug::log("initiateDogfights");
		$dogfights = array();

		for ($i = 0; $i < sizeof($this->ships)-1; $i++){
			if ($this->ships[$i]->flight){
				for ($j = $i+1; $j < sizeof($this->ships); $j++){
					if ($this->ships[$j]->flight){
						if ($this->ships[$i]->userid != $this->ships[$j]->userid){
							for ($k = 0; $k < sizeof($this->ships[$i]->dogfights); $k++){
								if ($this->ships[$i]->dogfights[$k] == $this->ships[$j]->id){
									break 2;
								}
							}
							
							$dist = Math::getDist2($this->ships[$i]->getCurrentPosition(), $this->ships[$j]->getCurrentPosition());
							if ($dist <= $this->ships[$i]->size / 2 + $this->ships[$j]->size / 2){
								$new = true;
								if ($new){
									$this->ships[$i]->dogfights[] = $this->ships[$j]->id;
									$this->ships[$j]->dogfights[] = $this->ships[$i]->id;
									$dogfights[] = array(0 => $this->ships[$i]->id, 1 => $this->ships[$j]->id);
								}
							}
						}
					}
				}
			}
		}
		if (sizeof($dogfights)){
			DBManager::app()->insertDogfights($this->gameid, $this->turn, $dogfights);
		}
	}	

	public function createDogfightFires(){
		Debug::log("createDogfightFires");
		$fires = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->flight && sizeof($this->ships[$i]->dogfights)){
				$flights = array();
				$counts = array(1);
				for ($j = 0; $j < sizeof($this->ships[$i]->dogfights); $j++){
					$count = $counts[sizeof($counts)-1];
					$flights[] = $this->getUnitById($this->ships[$i]->dogfights[$j]);
					for ($k = 0; $k < sizeof($flights[sizeof($flights)-1]->structures); $k++){
						if (!$flights[sizeof($flights)-1]->structures[$k]->destroyed){
							$count++;
						}
					}
					$counts[] = $count;
					$counts[sizeof($counts)-1]--;
				}
				$fires = array_merge($fires, $this->ships[$i]->createFireOrders($this->gameid, $this->turn, $flights, $counts));
			}
		}
		if (sizeof($fires)){
			DBManager::app()->insertFireOrders($this->gameid, $this->turn, $fires);
		}
		return true;
	}



	public function startFiringPhase(){
		Debug::log("startFiringPhase");
		$dbManager = DBManager::app();
		$this->phase = 2;

		if ($dbManager->setGameTurnPhase($this->gameid, $this->turn, $this->phase)){
			$players = $dbManager->getPlayerStatus($this->gameid);

			for ($i = 0; $i < sizeof($players); $i++){
				if ($dbManager->setPlayerstatus($players[$i]["userid"], $this->gameid, $this->turn, $this->phase, "waiting")){
					continue;
				}
				else {
					return false;
				}
			}

			return true;
		}
	}

	public function handleFiringPhase(){
		debug::log("handleFiringPhase");
		$this->handleFireOrders();
		$this->updateFireOrders($this->fires);
		$this->setBallisticStates();
		$this->createAndResolveBallisticMoves();
		$this->handleAntiBallistics();
		$this->resolveBallisticActions();
		$this->testCriticals();
		$this->writeDamageEntries();
		$this->writeCritEntries();
		return true;
	}

	public function handleDamageControlPhase(){
		Debug::log("handleDamageControlPhase");
		//$this->testPrimaryCriticals();
		//$this->writePrimaryCriticals();
		$this->adjustUnitStates();
		$this->adjustBallisticStates();
		return true;
	}

	public function adjustUnitStates(){
		return;
	}

	public function adjustBallisticStates(){
		for ($i = 0; $i < sizeof($this->ballistics); $i++){
			if ($this->ballistics[$i]->actions[sizeof($this->ballistics[$i]->actions)-1]->type == "impact"){
				if ($this->ballistics[$i]->actions[sizeof($this->ballistics[$i]->actions)-1]->turn == $this->turn){
					DBManager::app()->setUnitStatus($this->ballistics[$i]->id, "impact", 1);
				}
			}
			else if ($this->ballistics[$i]->destroyed){
				DBManager::app()->setUnitStatus($this->ballistics[$i]->id, "launched", 1);
			}
		}
		return;
	}

	public function testPrimaryCriticals(){
		Debug::log("testPrimaryCriticals");
		return false;
		for ($i = 0; $i < sizeof($this->ships); $i++){
			for ($j = 0; $j < sizeof($this->ships[$i]->primary->systems); $j++){
				$this->ships[$i]->primary->systems[$j]->testDamageEffect($this->turn);
			}
		}
	}

	public function writePrimaryCriticals(){
		Debug::log("writePrimaryCriticals");
		$crits = array();

		for ($i = 0; $i < sizeof($this->ships); $i++){
			for ($j = 0; $j < sizeof($this->ships[$i]->primary->systems); $j++){
				for ($k = 0; $k < sizeof($this->ships[$i]->primary->systems[$j]->crits); $k++){
					if ($this->ships[$i]->primary->systems[$j]->crits[$k]->turn == $this->turn){
						$crits[] = $this->ships[$i]->primary->systems[$j]->crits[$k];
					}
				}
			}
		}

		if (DBManager::app()->insertCritEntries($crits, $this->gameid)){
			return true;
		}
	}

	public function endTurn(){
		Debug::log("endTurn");
		$this->alterReinforcementPoints();
		$this->disableBallistics();
	}

	public function alterReinforcementPoints(){
		for ($i = 0; $i < sizeof($this->playerstatus); $i++){
			DBManager::app()->addReinforceValue($this->playerstatus[$i]["userid"], $this->gameid, $this->game["reinforce"]);
		};
	}

	public function disableBallistics(){
		$balls = array();
		for ($i = 0; $i < sizeof($this->ballistics); $i++){
			if ($this->ballistics[$i]->actions[sizeof($this->ballistics[$i]->actions)-1]->turn == $this->turn){
				if ($this->ballistics[$i]->actions[sizeof($this->ballistics[$i]->actions)-1]->type == "impact"){
					$balls[] = $this->ballistics[$i]->id;
					continue;
				}
			}
		}
		if (sizeof($balls)){
			DBManager::app()->DBdisableBallistics($balls);
		}	
	}

	public function startNewTurn(){
		Debug::log("startNewTurn");
		$this->turn = $this->turn+1;
		$this->phase = -1;
		DBManager::app()->setGameTurnPhase($this->gameid, $this->turn, $this->phase);
	}

	public function startDeploymentPhase(){
		Debug::log("startDeploymentPhase");
		$this->pickReinforcements();
	}

	public function handleFireOrders(){
		$this->setFireOrderDetails();
		$this->sortFireOrders();
		$this->setupShipsForDamage();
		$this->resolveShipFireOrders();
		$this->resolveFighterFireOrders();
	}


	public function setFireOrderDetails(){
		for ($i = sizeof($this->fires)-1; $i >= 0; $i--){
			$this->fires[$i]->shooter = $this->getUnitById($this->fires[$i]->shooterid);
			$this->fires[$i]->weapon = $this->fires[$i]->shooter->getSystemById($this->fires[$i]->weaponid);
			$this->fires[$i]->target = $this->getUnitById($this->fires[$i]->targetid);
			if (is_a($this->fires[$i]->target, "Salvo")){
				$this->intercepts[] = $this->fires[$i];
				array_splice($this->fires, $i, 1);
			}
		}

		for ($i = 0; $i < sizeof($this->fires); $i++){
			$this->fires[$i]->shooter = $this->getUnitById($this->fires[$i]->shooterid);
			$this->fires[$i]->weapon = $this->fires[$i]->shooter->getSystemById($this->fires[$i]->weaponid);
			$this->fires[$i]->target = $this->getUnitById($this->fires[$i]->targetid);
		}
	}

	public function sortFireOrders(){
		usort($this->fires, function($a, $b){
			if ($a->targetid != $b->targetid){
				return $a->targetid - $b->targetid;
			}
			else if ($a->weapon->priority != $b->weapon->priority){
				return $a->weapon->priority - $b->weapon->priority;
			}
			else return $a->shooterid - $b->shooterid;
		});
	}

	public function setupShipsForDamage(){
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if (!(is_a($this->ships[$i], "Mini"))){
				$this->ships[$i]->setupForDamage();
			}
		}
	}

	public function resolveShipFireOrders(){
		// resolve ship vs ship / fighter
		for ($i = 0; $i < sizeof($this->fires); $i++){
			if (!$this->fires[$i]->resolved){
				if ($this->fires[$i]->shooter->flight == false){
					$this->fires[$i]->target->resolveFireOrder($this->fires[$i]);
					if (sizeof($this->fires[$i]->damages)){
						$this->damages = array_merge($this->damages, $this->fires[$i]->damages);
					}
				}
			}
		}
	}

	public function resolveFighterFireOrders(){
		// splice and delete fireorders from destroyed fighters
		$toDelete = array();

		for ($i = sizeof($this->fires)-1; $i >= 0; $i--){
			if (!$this->fires[$i]->resolved){
				if ($this->fires[$i]->shooter->flight == true){
					if ($this->fires[$i]->shooter->getStructureById($this->fires[$i]->weapon->fighterId)->destroyed){
						$toDelete[] = $this->fires[$i];
						array_splice($this->fires, $i, 1);
					}
				}
			}
		}

		DBmanager::app()->deleteInvalidFireOrders($toDelete);

		// fighter vs fighter
		for ($i = 0; $i < sizeof($this->fires); $i++){
			if (!$this->fires[$i]->resolved){
				if ($this->fires[$i]->shooter->flight == true && $this->fires[$i]->target->flight == true){
					$this->fires[$i]->target->resolveFireOrder($this->fires[$i]);
					//Debug::log("resolving fire id: ".$this->fires[$i]->id);
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
	}

	public function setBallisticStates(){
		for ($i = 0; $i < sizeof($this->ballistics); $i++){
			if ($this->ballistics[$i]->isDestroyed()){
				$this->ballistics[$i]->destroyed = true;
			}
		}
	}

	public function createAndResolveBallisticMoves(){
		Debug::log("createAndResolveBallisticMoves, size: ".sizeof($this->ballistics));
		for ($i = 0; $i < sizeof($this->ballistics); $i++){
			$sPos = $this->ballistics[$i]->getCurrentPosition();
			$target = $this->getUnitById($this->ballistics[$i]->targetid);
			$tPos = $target->getCurrentPosition();

			if (! $this->ballistics[$i]->destroyed){
				$dist = Math::getDist($sPos->x, $sPos->y, $tPos->x, $tPos->y);

	  			// MOVE ($turn, $type, $dist, $x, $y, $a, $cost, $delay, $costmod, $resolved){
				
				if ($this->ballistics[$i]->structures[0]->impulse >= $dist){ // IMPACT VECTOR
					$ox = mt_rand(-$target->size/10, $target->size/10);
					$oy = mt_rand(-$target->size/10, $target->size/10);
					$this->ballistics[$i]->actions[] = new Action(
						$this->turn,
						"impact",
						$dist,
						$tPos->x + $ox,
						$tPos->y + $oy,
						0, 0, 0, 0, 0
					);
				} 
				else { // home in target vector
					$a = Math::getAngle($sPos->x, $sPos->y, $tPos->x, $tPos->y);
					$iPos = Math::getPointInDirection($this->ballistics[$i]->structures[0]->impulse, $a, $sPos->x, $sPos->y);
					$this->ballistics[$i]->actions[] = new Action(
						$this->turn,
						"move",
						$this->ballistics[$i]->structures[0]->impulse,
						$iPos->x,
						$iPos->y,
						0, 0, 0, 0, 0
					);
				}
			}
			else { // MOVE VECTOR to animate fire on destroyed salvo
				$this->ballistics[$i]->actions[] = new Action(
					$this->turn,
					"move",
					$this->ballistics[$i]->structures[0]->impulse,
					$tPos->x,	
					$tPos->y,
					0, 0, 0, 0, 0
				);
			}
		}
		DBManager::app()->insertBallisticActions($this->ballistics);
	}

	public function handleAntiBallistics(){
		Debug::log("handleAntiBallistics balls:".sizeof($this->ballistics).", intercepts: ".sizeof($this->intercepts));

		usort($this->intercepts, function($a, $b){
			if ($a->targetid != $b->targetid){
				return $a->targetid - $b->targetid;
			}
		});

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

			//echo "</br>";var_dump($ints);echo "</br>";
			
			for ($j = 0; $j < sizeof($ints); $j++){
				$ints[$j]->shooter = $this->getUnitById($ints[$j]->shooterid);
				$ints[$j]->weapon = $ints[$j]->shooter->getSystemById($ints[$j]->weaponid);
				$ints[$j]->target = $this->ballistics[$i];
				$ints[$j]->target->resolveFireOrder($ints[$j]);
				if (sizeof($ints[$j]->damages)){
					$this->damages = array_merge($this->damages, $ints[$j]->damages);
				}
			}
		}

		$this->updateFireOrders($this->intercepts);

	}

	public function resolveBallisticActions(){
		Debug::log("resolveBallisticActions :".sizeof($this->ballistics));
		$fires = array();

		for ($i = 0; $i < sizeof($this->ballistics); $i++){
			if (! $this->ballistics[$i]->destroyed){
				if ($this->ballistics[$i]->actions[sizeof($this->ballistics[$i]->actions)-1]->type == "impact"){
					for ($j = 0; $j < sizeof($this->ballistics[$i]->structures); $j++){
						if (!$this->ballistics[$i]->structures[$j]->destroyed){
							$fires[] = array(
								"id" => -1,
								"gameid" => $this->gameid,
								"shooterid" => $this->ballistics[$i]->id,
								"targetid" => $this->ballistics[$i]->targetid,
								"weaponid" => $this->ballistics[$i]->structures[$j]->id,
								"shots" => 1
							);
						}
					}
				}
			}
			else { // destroyed
				DBManager::app()->setUnitStatus($this->ballistics[$i]->id, "launched", 1);
			}
		}

		if (sizeof($fires)){
			DBManager::app()->insertFireOrders($this->gameid, $this->turn, $fires, true);
			unset($fires);

			$fires = DBManager::app()->getOpenBallisticFireOrders($this->gameid, $this->turn);
			for ($i = 0; $i < sizeof($fires); $i++){
				$fires[$i]->shooter = $this->getUnitById($fires[$i]->shooterid);
				$fires[$i]->weapon = $fires[$i]->shooter->getSystemById($fires[$i]->weaponid);
				$fires[$i]->target = $this->getUnitById($fires[$i]->targetid);
				$fires[$i]->target->resolveBallisticFireOrder($fires[$i]);
				if (sizeof($fires[$i]->damages)){
					$this->damages = array_merge($this->damages, $fires[$i]->damages);
				}
			}
			$this->updateFireOrders($fires);

		}
	}

	public function testCriticals(){
		for ($i = 0; $i < sizeof($this->ships); $i++){
			$this->ships[$i]->testCriticalsShipLevel($this->turn, $this->phase);
		}
	}

	public function updateFireOrders($fires){
		//debug::log("updateFireOrders");
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
		//debug::log("writeCritEntries");
		$all = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			$all = array_merge($all, $this->ships[$i]->getNewCrits($this->turn));
		}
		DBManager::app()->insertCritEntries($all, $this->gameid);
	}

	public function startDamageControlPhase(){
		Debug::log("startDamageControlPhase");

		$dbManager = DBManager::app();
		$this->phase = 3;

		if ($dbManager->setGameTurnPhase($this->gameid, $this->turn, $this->phase)){
			$players = $dbManager->getPlayerStatus($this->gameid);

			for ($i = 0; $i < sizeof($players); $i++){
				if ($dbManager->setPlayerstatus($players[$i]["userid"], $this->gameid, $this->turn, $this->phase, "waiting")){
					continue;
				}
				else {
					return false;
				}
			}

			return true;
		}
	}

	public function finishTurn(){
		Debug::log("finishTurn");
	}

	public function getId(){
		return 1 + sizeof($this->ships) + sizeof($this->ballistics);
	}

	public function getUnitById($id){
		//debug::log("looking for unit :".$unitid);
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
		return array("Earth Alliance", "Centauri Republic", "Minbari Federation");
	}

	public function getFightersForFaction($faction){
		Debug::log("getFightersForFaction");
	}

	public function getShipsForFaction($faction){
		//Debug::log("getShipsForFaction");
		$ships = array();
		$data = array();

		switch ($faction){
			case "Earth Alliance";
				$ships = array(
					"Omega",
					"Hyperion",
					"Saggitarius",
					"Artemis",
					"Olympus",
					"Tethys"
				);
				break;
			case "Centauri Republic";
				$ships = array(
					"Primus",
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
			default:
				break;
		}

		$ship;

		for ($i = 0; $i < sizeof($ships); $i++){
			$name = $ships[$i];
			$ship = array(
				"classname" => $ships[$i],
				"value" => $name::$value,
				"arrival" => 0
			);
			$data[] = $ship;
		}

		return $data;
	}

	public function getPreviewData($name){
		//debug::log("asking for preview of: ".$name);
		$ship = new $name(1, 1, 0);
		return $ship;

	}

	public function logShips($elements){
		$data = func_get_args();
		if ($data[0] == "All"){
			return $this->logAllShips();
		}
		else {
			$ships = array();
			for ($i = 0; $i < sizeof($data); $i++){
				$ships[] = new $data[$i](0,0,0,0,0,0);
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
			$name = $allShips[$i]["classname"];
			$ship = new $name(0, 0, 0, 0, 0, 0);
			$allShips[$i] = $ship;
			continue;
		}

	return $allShips;
	}

	public function reset(){
		if (DBManager::app()->reset()){return true;}
	}

}
?>
