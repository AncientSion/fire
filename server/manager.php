<?php

class Manager {
	public $userid;
	public $gameid;
	public $game;
	public $turn;
	public $phase;
	public $index = 0;

	public $ships = array();
	public $gd = array();
	public $fires = array();
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
			if (DBManager::app()->createReinforceEntry($this->userid, $this->gameid, ($avail - $used), $ships[0]["faction"])){
				return true;
			}
		}
		return false;
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
		$this->reinforce = $db->getReinforcePoints($this->gameid, $this->userid);

		$this->fires = $db->getAllFireOrders($this->gameid);

		$this->ballistics = $this->assembleBallistics();
		$this->ships = $this->assembleUnits();
		$this->deleteResolvedFireOrders();

		$this->reinforcements = $db->getAvailableReinforcements($this->gameid, $this->userid);
		$this->incoming = $db->getIncomingShips($this->gameid, $this->turn);

		$this->damages = array();
		$this->crits = array();
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
		Debug::log("doAdvanceGameState for game".$this->gameid." FROM PHASE: ".$this->phase." to phase".($this->phase+1));

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

	public function pickReinforcements($userid){
		Debug::log("pickReinforcements");
		//return;
		$status = DBManager::app()->getReinforceStatus($this->gameid, $userid);
		$available = DBManager::app()->getAvailableReinforcements($this->gameid, $userid);
		$validShips = $this->getShipsForFaction($status["faction"]);
		$req = 10;
		$picks = array();

		if (mt_rand(1, 10) < $req - sizeof($available)){
			$subPick = mt_rand(0, sizeof($validShips)-1);
			$arrival  = mt_rand(2, 4);
			$picks[] = $validShips[$subPick];
			$picks[sizeof($picks)-1]["arrival"] = mt_rand(2, 4);
			Debug::log("picking: ".$subPick["classname"]." with arrival ".$arrival);
		}

		DBManager::app()->insertReinforcements($this->gameid, $userid, $this->turn, $picks);
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

							//t($id, $userid, $fireid, $classname, $status, $amount, $destroyed){
								$ball = new Salvo(
									0,
									$this->ships[$j]->userid,
									$fires[$i]->targetid,
									$this->ships[$j]->structures[$k]->systems[$l]->getAmmo(),
									"launched",
									$fires[$i]->shots,
									0
								);

								$sPos = $this->ships[$j]->getCurrentPosition();
								$tPos = $this->getUnitById($this->fires[$i]->targetid)->getCurrentPosition();
								$a = Math::getAngle($sPos->x, $sPos->y, $tPos->x, $tPos->y);
								
								$launchPoint = Math::getPointInDirection(
									mt_rand(10, 20),
									$a,
									$sPos->x + mt_rand(10, 20),
									$sPos->y + mt_rand(10, 20)
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
						$dist = Math::getDist2($this->ships[$i]->getCurrentPosition(), $this->ships[$j]->getCurrentPosition());
						if ($dist <= $this->ships[$i]->size / 2 + $this->ships[$j]->size / 2){
							$new = true;
							for ($k = 0; $k < sizeof($this->ships[$i]->dogfights); $k++){
								if ($this->ships[$i]->dogfights[$k] == $this->ships[$j]->id){
									$new = false;
								}
							}
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
		if (sizeof($dogfights)){
			DBManager::app()->insertDogfights($this->gameid, $this->turn, $dogfights);
		}
	}

/*
				$valid = array();
				for ($j = 0; $j < sizeof($this->ships[$i]->dogfights); $j++){
					$flight = $this->getUnitById($this->ships[$i]->dogfights[$j]);
					for ($k = 0; $k < sizeof($flight->structures); $k++){
						if (! $flight->structures[$k]->destroyed){
							$valid[] = $flight->structures[$k];
						}

						*/

	public function createDogfightFires(){
		Debug::log("createDogfightFires");
		$fires = array();
		for ($i = 0; $i < sizeof($this->ships); $i++){
			$flights = array();
			$counts = array(0);
			if ($this->ships[$i]->flight && sizeof($this->ships[$i]->dogfights)){
				for ($j = 0; $j < sizeof($this->ships[$i]->dogfights); $j++){
					$count = $counts[sizeof($counts)-1];
					$flights[] = $this->getUnitById($this->ships[$i]->dogfights[$j]);
					for ($k = 0; $k < sizeof($flights[sizeof($flights)-1]->structures); $k++){
						if (! $flights[sizeof($flights)-1]->structures[$k]->destroyed){
							$count++;
						}
					}
					$counts[] = $count;
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
		$this->resolveBallisticImpacts();
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
		$players = DBManager::app()->getPlayerStatus($this->gameid);
		for ($i = 0; $i < sizeof($players); $i++){
			DBManager::app()->DBalterReinforcementPoints(
				$players[$i]["userid"],
				$this->gameid,
				$this->game["reinforce"]
			);
		}
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
		$dbManager = DBManager::app();
		$players = $dbManager->getPlayerStatus($this->gameid);

		for ($i = 0; $i < sizeof($players); $i++){
			$dbManager->setPlayerstatus($players[$i]["userid"], $this->gameid, $this->turn, $this->phase, "waiting");
			if ($this->turn > 1){
				$this->pickReinforcements($players[$i]["userid"]);
			}
		}

		return true;
	}

	public function handleFireOrders(){
		$fires = array();

		// get relevant FOr
		if ($this->fires){
			for ($i = 0; $i < sizeof($this->fires); $i++){
				if (! $this->fires[$i]->resolved){
					$fires[] = $this->fires[$i];
				}
			}
		}
		// get relevent FO details
		for ($i = 0; $i < sizeof($fires); $i++){
			$fires[$i]->shooter = $this->getUnitById($fires[$i]->shooterid);
			$fires[$i]->weapon = $fires[$i]->shooter->getSystemById($fires[$i]->weaponid);
			$fires[$i]->target = $this->getUnitById($fires[$i]->targetid);
		}

		//sort by target, priority, shooter
		usort($fires, function($a, $b){
			if ($a->targetid != $b->targetid){
				return $a->targetid - $b->targetid;
			}
			else if ($a->weapon->priority != $b->weapon->priority){
				return $a->weapon->priority - $b->weapon->priority;
			}
			else return $a->shooterid - $b->shooterid;
		});

		// resolve ship vs all
		for ($i = 0; $i < sizeof($fires); $i++){
			if ($fires[$i]->shooter->flight == false){
				$fires[$i]->target->resolveFireOrder($fires[$i]);
				//Debug::log("resolving fire id: ".$fires[$i]->id);
				if (sizeof($fires[$i]->damages)){
					$this->damages = array_merge($this->damages, $fires[$i]->damages);
				}
			}
		}

		// fighter vs fighter
		for ($i = 0; $i < sizeof($fires); $i++){
			if ($fires[$i]->shooter->flight == true && $fires[$i]->target->flight == true){
				$fires[$i]->target->resolveFireOrder($fires[$i]);
				//Debug::log("resolving fire id: ".$fires[$i]->id);
				if (sizeof($fires[$i]->damages)){
					$this->damages = array_merge($this->damages, $fires[$i]->damages);
				}
			}
		}

		// fighter vs non fighter (ball, ship);
		for ($i = 0; $i < sizeof($fires); $i++){
			if ($fires[$i]->shooter->flight == true && $fires[$i]->target->flight == false){
				if ($fires[$i]->shooter->getStructureById($fires[$i]->weapon->fighterId)->destroyed){
					continue;
				}
				$fires[$i]->target->resolveFireOrder($fires[$i]);
				//Debug::log("resolving fire id: ".$fires[$i]->id);
				if (sizeof($fires[$i]->damages)){
					$this->damages = array_merge($this->damages, $fires[$i]->damages);
				}
			}
		}

		return true;
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
			$tPos = $this->getUnitById($this->ballistics[$i]->targetid)->getCurrentPosition();
			if (! $this->ballistics[$i]->destroyed){
				$dist = Math::getDist($sPos->x, $sPos->y, $tPos->x, $tPos->y);

				// MOVE $turn, $type, $dist, $a, $x, $y, $resolved){
				if ($this->ballistics[$i]->structures[0]->impulse >= $dist){ // IMPACT VECTOR
					$this->ballistics[$i]->actions[] = new Action(
						$this->turn,
						"impact",
						$dist,
						$tPos->x + mt_rand(-7, 7),
						$tPos->y + mt_rand(-7, 7),
						0, 0, 0, 0, 0
					);
				} 
				else { // home in target vector
					$a = Math::getAngle($sPos->x, $sPos->y, $tPos->x, $tPos->y);
					$tPos = Math::getPointInDirection($this->ballistics[$i]->structures[0]->impulse, $a, $sPos->x, $sPos->y);
					$this->ballistics[$i]->actions[] = new Action(
						$this->turn,
						"move",
						$this->ballistics[$i]->structures[0]->impulse,
						$tPos->x + mt_rand(-7, 7),
						$tPos->y + mt_rand(-7, 7),
						0, 0, 0, 0, 0
					);
				}
			}
			else { // MOVE VECTOR to animate fire on destroyed salvo
				$this->ballistics[$i]->actions[] = new Action(
					$this->turn,
					"move",
					$this->ballistics[$i]->structures[0]->impulse,
					$tPos->x + mt_rand(-7, 7),
					$tPos->y + mt_rand(-7, 7),
					0, 0, 0, 0, 0
				);
			}
		}
		DBManager::app()->insertBallisticActions($this->ballistics);
	}

	public function resolveBallisticImpacts(){
		Debug::log("resolveBallisticImpacts :".sizeof($this->ballistics));
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
				$fires[$i]->resolved = 1;
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
		if ($this->fires){
			DBManager::app()->deleteUnresolvedFireOrders($fires);
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
		return ["Earth Alliance", "Centauri Republic", "Minbari Federation"];
	}

	public function getFightersForFaction($faction){
		Debug::log("getFightersForFaction");
	}

	public function getShipsForFaction($faction){
		Debug::log("getShipsForFaction");
		$ships = array();
		$data = array();

		switch ($faction){
			case "Earth Alliance";
				$ships = array(
					"Omega",
					"Hyperion",
					"Saggitarius",
					"Artemis",
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

	public function getShipData($name){
		debug::log("asking for preview of: ".$name);
		$ship = new $name(1, 1, 0);
		return $ship;

	}

	public function logShips(){
		debug::log("logShips");
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
