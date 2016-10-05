<?php


class Manager {
	public $userid;
	
	function __construct($userid, $gameid = false){
		$this->userid = $userid;
		$this->gameid = $gameid;
		$this->gamedata = false;

		if ($this->gameid){
			$this->gamedata = $this->getGameData();

			if ($this->canAdvanceGameState()){
				if ($this->doAdvanceGameState()){
					$this->gamedata = $this->getGameData();
				}
			}
			else {
				debug::log("not all rdy yet");
			}
		}
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

	public function getGameData(){
		$db = DBManager::app();

		$game = $db->getGameDetails($this->gameid);
		$playerstatus = $db->getPlayerStatus($this->gameid);
		$ships = $db->getAllShipsForGame($this->gameid);
		$ships = $db->getActionsForShips($ships, $this->userid);

		$gamedata = array(
							"game" => $game,
							"playerstatus" => $playerstatus,
							"ships" => $ships
						);

		return $gamedata;
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

	public function canAdvanceGameState(){
		if ($this->gamedata["game"]["status"] == "open"){
			return false;
		}
		else if (sizeof($this->gamedata["playerstatus"] > 1)){
			for ($i = 0; $i < sizeof($this->gamedata["playerstatus"]); $i++){
				if ($this->gamedata["playerstatus"][$i]["status"] == "waiting"){
					return false;
				}
			}
		}

		return true;
	}

	public function doAdvanceGameState(){
		Debug::log("doAdvanceGameState for game".$this->gameid);
	//	debug::log("turn: ".$this->gamedata["game"]["turn"]);
	//	debug::log("phase: ".$this->gamedata["game"]["phase"]);
	//	Debug::log("NEW PHASE");

		switch ($this->gamedata["game"]["phase"]){
			case -1; // from deploy to move
				$this->handleDeploymentPhase();
				$this->startMovementPhase();
				break;
			case 1; // from move to fire
				$this->handleMovementPhase();
				$this->startFiringPhase();
				break;
			default:
				break;
		}

		return true;
	}
	//public function setPlayerstatus($userid, $gameid, $turn, $phase, $status){

	public function handleDeploymentPhase(){
		if (DBManager::app()->resolveDeployment($this->gameid)){
			return true;
		}
	}

	public function handleMovementPhase(){
		if (DBManager::app()->resolveMoveActions($this->gameid)){
			return true;
		}
	}

	public function startDeploymentPhase(){
		Debug::log("startDeploymentPhase");
		$dbManager = DBManager::app();
		$phase = -1;

		if ($dbManager->setGamePhase($this->gameid, $phase)){
			debug::log("setGamePhase ".$phase." success");
			$players = $dbManager->getPlayerStatus($this->gameid);

			for ($i = 0; $i < sizeof($players); $i++){
				if ($dbManager->setPlayerstatus($players[$i]["userid"], $this->gameid, $this->gamedata["game"]["turn"], $phase, "waiting")){
					debug::log("phase for player ".$i. " adjusted to phase: ".$phase);
					continue;
				}
				else {
					return false;
				}
			}

			return true;
		}
	}

	public function startMovementPhase(){
		Debug::log("startMovementPhase");
		$dbManager = DBManager::app();
		$phase = 1;

		if ($dbManager->setGamePhase($this->gameid, $phase)){
			debug::log("setGamePhase ".$phase." success");
			$players = $dbManager->getPlayerStatus($this->gameid);

			for ($i = 0; $i < sizeof($players); $i++){
				if ($dbManager->setPlayerstatus($players[$i]["userid"], $this->gameid, $this->gamedata["game"]["turn"], $phase, "waiting")){
					debug::log("phase for player ".$i. " adjusted to phase: ".$phase);
					continue;
				}
				else {
					return false;
				}
			}

			return true;
		}
	}

	public function startFiringPhase(){
		Debug::log("startFiringPhase");
		$dbManager = DBManager::app();
		$phase = 2;

		if ($dbManager->setGamePhase($this->gameid, $phase)){
			debug::log("setGamePhase ".$phase." success");
			$players = $dbManager->getPlayerStatus($this->gameid);

			for ($i = 0; $i < sizeof($players); $i++){
				if ($dbManager->setPlayerstatus($players[$i]["userid"], $this->gameid, $this->gamedata["game"]["turn"], $phase, "waiting")){
					continue;
				}
				else {
					return false;
				}
			}

			return true;
		}
	}

	public function startDamageControlPhase(){
		Debug::log("startDamageControlPhase");

	}

	public function finishTurn(){
		Debug::log("finishTurn");

	}


}
?>
