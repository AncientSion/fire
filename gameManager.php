<?php

error_reporting(E_ALL); ini_set('display_errors', '1');
require_once("server\baseship.php");
require_once("server\math.php");
require_once("server\classes.php");



class Manager {
	public $userid;
	
	function __construct($userid, $gameid = false){
		$before = round(microtime(true)*1000);
		$this->userid = $userid;
		$this->gameid = $gameid;

		$this->index = 0;

		$this->gd = array();


		$this->ships = array();
		$this->gd = array();
		$this->fires = array();

		if ($this->gameid){
			$this->getGameAndPlayerStatus();

			if ($this->gd["game"]["turn"] == -1){
				return;
			}
			else {
				$this->getGameData();

				if ($this->canAdvanceGameState()){
					$this->doAdvanceGameState();
				}
			}
		}
		$after = round(microtime(true)*1000);
		debug::log("time: ".($after-$before)." millisec/serialize\n");
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
		$this->gd["game"] = DBManager::app()->getGameDetails($this->gameid);
		$this->gd["playerstatus"] = DBManager::app()->getPlayerStatus($this->gameid);
	}

	public function getGameData(){
		Debug::log("getGameData");
		$db = DBManager::app();

		$ships;

		$this->game = $db->getGameDetails($this->gameid);
		$this->playerstatus = $db->getPlayerStatus($this->gameid);

		$ships = $db->getAllShipsForGame($this->gameid);
		$ships = $db->getActionsForShips($ships, $this->userid);

		$this->fires = $db->getAllFireOrders($this->gameid, $this->game["turn"]);

		$this->ships = $this->createShips($ships);
	}

	public function createShips($ships){
		Debug::log("createShips");
		$ship;

		for ($i = 0; $i < sizeof($ships); $i++){

			$x;
			$y;

			if (sizeof($ships[$i]["actions"])) {
				$x = $ships[$i]["actions"][sizeof($ships[$i]["actions"])-1]["x"];
				$y = $ships[$i]["actions"][sizeof($ships[$i]["actions"])-1]["y"];
			}
			else {
				$x = false;
				$y = false;
			}

			$ship = new $ships[$i]["shipclass"](
				$ships[$i]["id"],
				$ships[$i]["userid"],
				$x, 
				$y,
				0
			);

			$ship->actions = $ships[$i]["actions"];


			for ($j = 0; ($j < sizeof($ship->actions)); $j++){
				$ship->facing = $ship->facing + $ship->actions[$j]["a"];
			}

			$ships[$i] = $ship;
		}

		
		if ($this->fires){
			for ($i = 0; $i < sizeof($this->fires); $i++){
				for ($j = 0; $j < sizeof($ships); $j++){
					if ($this->fires[$i]->shooterid == $ships[$j]->id){
						for ($k = 0; $k < sizeof($ships[$j]->structures); $k++){
							for ($l = 0; $l < sizeof($ships[$j]->structures[$k]->systems); $l++){
								if ($this->fires[$i]->weaponid == $ships[$j]->structures[$k]->systems[$l]->id){
									//debug::log("found!");
									$ships[$j]->structures[$k]->systems[$l]->fireOrders[] = $this->fires[$i];
								}
							}
						}
					}
				}
			}
		}
		
		return $ships;
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
		Debug::log("canAdvanceGameState");
		if ($this->gd["game"]["status"] == "open"){
			return false;
		}
		else if (sizeof($this->gd["playerstatus"] > 1)){
			for ($i = 0; $i < sizeof($this->gd["playerstatus"]); $i++){
				if ($this->gd["playerstatus"][$i]["status"] == "waiting"){
					return false;
				}
			}
		}

		return true;
	}

	public function doAdvanceGameState(){
		Debug::log("doAdvanceGameState for game".$this->gameid);
	//	debug::log("turn: ".$this->gd["game"]["turn"]);
	//	debug::log("phase: ".$this->gd["game"]["phase"]);
	//	Debug::log("NEW PHASE");

		switch ($this->gd["game"]["phase"]){
			case -1; // from deploy to move
				$this->handleDeploymentPhase();
				$this->startMovementPhase();
				break;
			case 1; // from move to fire
				$this->handleMovementPhase();
				$this->startFiringPhase();
				break;
			case 2; // from fire to resolve fire
				$this->handleFiringPhase();
				return;
				$this->startDamageControlPhase();
				break;
			default:
				break;
		}

		return true;
	}

	public function startDeploymentPhase(){
		Debug::log("startDeploymentPhase");
		$dbManager = DBManager::app();
		$phase = -1;

		if ($dbManager->setGamePhase($this->gameid, $phase)){
			debug::log("setGamePhase ".$phase." success");
			$players = $dbManager->getPlayerStatus($this->gameid);

			for ($i = 0; $i < sizeof($players); $i++){
				if ($dbManager->setPlayerstatus($players[$i]["userid"], $this->gameid, $this->gd["game"]["turn"], $phase, "waiting")){
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

	public function handleDeploymentPhase(){
		Debug::log("handleDeploymentPhase");
		if (DBManager::app()->resolveDeployment($this->gameid)){
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
				if ($dbManager->setPlayerstatus($players[$i]["userid"], $this->gameid, $this->gd["game"]["turn"], $phase, "waiting")){
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

	public function handleMovementPhase(){
		Debug::log("handleMovementPhase");
		if (DBManager::app()->resolveMovement($this->gameid)){
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
				if ($dbManager->setPlayerstatus($players[$i]["userid"], $this->gameid, $this->gd["game"]["turn"], $phase, "waiting")){
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
		//$this->updateFireOrders();
	}

	public function handleFireOrders(){
		echo sizeof($this->fires); echo "</br></br>";
		for ($i = 0; $i < sizeof($this->fires); $i++){
			$this->fires[$i]->shooter = $this->getShipById($this->fires[$i]->shooterid);
			$this->fires[$i]->weapon = $this->fires[$i]->shooter->getWeaponById($this->fires[$i]->weaponid);
			$this->fires[$i]->target = $this->getShipById($this->fires[$i]->targetid);
			$this->fires[$i] = $this->calculateHitChance($this->fires[$i]);
			$this->fires[$i] = $this->rollForHit($this->fires[$i]);
			$this->fires[$i] = $this->rollForDamage($this->fires[$i]);

			$this->fires[$i]->shooter = false;
			$this->fires[$i]->weapon = false;
			$this->fires[$i]->target = false;

			//echo $this->fires[$i]->dmgRoll." - ".$this->fires[$i]->loss."%";
			//echo "</br></br>";
		}

		return true;
	}

	public function calculateHitChance($fire){
		//echo json_encode($fire); echo "</br></br>";
		Debug::log("calculateHitChance for fire ID ".$fire->id);	

		$hitAngle = Math::getAngle($fire->target->x, $fire->target->y, $fire->shooter->x, $fire->shooter->y);
		$angle = round(Math::addAngle($fire->target->facing, $hitAngle));			
		$profile = $fire->target->getHitChanceFromAngle($angle);

		$fire->dist = Math::getDist($fire->shooter->x, $fire->shooter->y, $fire->target->x, $fire->target->y);
		$fire->angleIn = $angle;

		$rangeLoss = $fire->weapon->getAccLoss($fire->dist);

		$fire->req = $profile - $rangeLoss;

		return $fire;
	}

	public function rollForHit($fire){
		Debug::log("rollForHit for fire ID ".$fire->id);

		$hits = 0;
		$notes = "";

		$fire = $fire->weapon->rollForHit($fire);
		return $fire;
	}

	public function rollForDamage($fire){
		Debug::log("rollForDamage for fire ID ".$fire->id);	

		$fire = $fire->weapon->getDamage($fire);
		return $fire;
	}

	public function updateFireOrders(){
		debug::log("updateFireOrders");

		DBManager::app()->updateFireOrders($this->fires);
	}

	public function startDamageControlPhase(){
		Debug::log("startDamageControlPhase");

		$dbManager = DBManager::app();
		$phase = 3;

		if ($dbManager->setGamePhase($this->gameid, $phase)){
			debug::log("setGamePhase ".$phase." success");
			$players = $dbManager->getPlayerStatus($this->gameid);

			for ($i = 0; $i < sizeof($players); $i++){
				if ($dbManager->setPlayerstatus($players[$i]["userid"], $this->gameid, $this->gd["game"]["turn"], $phase, "waiting")){
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

	public function getShipById($shipid){
		debug::log("looking for ship :".$shipid);
		for ($i = 0; $i < sizeof($this->ships); $i++){
			//echo json_encode($this->gd["ships"][$i]);
			//debug::log("class: ".get_class($this->gd["ships"][$i]));
			//debug::log("now : ".$this->ships[$i]->id);
			if ($this->ships[$i]->id == $shipid){
				debug::log("found!");
				return $this->ships[$i];
			}
		}
	}

	public function getFactions(){
		return ["Earth Alliance", "Centauri Republic", "Minbari Federation"];
	}

	public function getShipsForFaction($faction){
		$ships = [];
		$pv = [];

		switch ($faction){
			case "Earth Alliance";
				$ships = ["Omega", "Hyperion"];
				$pv = [1200, 850];
				break;
			case "Centauri Republic";
				break;
			case "Minbari Federation";
				$ships = ["Sharlin"];
				$pv = [2000];
				break;
			default:
				break;
		}

		return array($ships, $pv);
	}

	public function getShipClass($name){
		debug::log("asking for preview of: ".$name);
		$ship = new $name(1, 1, 0, 0, 0);
		return $ship;

	}

}
?>
