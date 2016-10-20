<?php

error_reporting(E_ALL); ini_set('display_errors', '1');
require_once("server\baseship.php");
require_once("server\math.php");



class Manager {
	public $userid;
	
	function __construct($userid, $gameid = false){
		//debug::log($userid);
		//debug::log($gameid);
		$this->userid = $userid;
		$this->gameid = $gameid;
		$this->gamedata = false;
		$this->ships = array();
		$this->fireOrders = array();
		$this->index = 0;

		if ($this->gameid){
			$this->getGameAndPlayerStatus();

			//var_dump($this->gamedata);

			if ($this->gamedata["game"]["turn"] == -1){
				return;
			}
			else if ($this->canAdvanceGameState()){
				$this->doAdvanceGameState();
			}

			$this->gamedata = $this->getGameData();
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

	public function getGameAndPlayerStatus(){
		$this->gamedata["game"] = DBManager::app()->getGameDetails($this->gameid);
		$this->gamedata["playerstatus"] = DBManager::app()->getPlayerStatus($this->gameid);
	}

	public function getGameData(){
		Debug::log("getGameData");
		$db = DBManager::app();

		$game = $db->getGameDetails($this->gameid);
		$playerstatus = $db->getPlayerStatus($this->gameid);
		$ships = $db->getAllShipsForGame($this->gameid);
		$ships = $db->getActionsForShips($ships, $this->userid);
		$ships = $this->createShips($ships);
		$fireorders = $db->getAllFireOrders($this->gameid, $game["turn"]);

		$gamedata = array(
							"game" => $game,
							"playerstatus" => $playerstatus,
							"ships" => $ships,
							"fireorders" => $fireorders
						);

		return $gamedata;
	}

	public function createShips($ships){
		$ship;

		for ($i = 0; $i < sizeof($ships); $i++){
			$ship = new $ships[$i]["shipclass"](
												$ships[$i]["id"],
												$ships[$i]["userid"],
												0,
												0, 
												0
												);

			$ship->actions = $ships[$i]["actions"];

			$ships[$i] = $ship;
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

	public function handleFiringPhase(){
		debug::log("handleFiringPhase");
		$this->gamedata = $this->getGameData();
		//$this->getShips();
		//	debug::log("ships: ".sizeof($this->ships));
		$this->fireOrders = DBManager::app()->getOpenFireOrders($this->gameid, $this->gamedata["game"]["turn"]);
		//	debug::log("fireOrders: ".sizeof($this->fireOrders));
		$this->handleFireOrders();
		//$this->updateFireOrders();
	}

	public function getShips(){
		debug::log("getShips");
		$facing;
		$x;
		$y;

		for ($i = 0; $i < sizeof($this->gamedata["ships"]); $i++){
		//for ($i = 0; $i < 1; $i++){
			//debug::log("i: ".$i);
			$facing = 0;
			$x = 0;
			$y = 0;

			echo get_class($this->gamedata["ships"][$i]);
			echo "</br>";
			echo "</br>";
			echo json_encode($this->gamedata["ships"][$i]);
			echo "</br>";
			echo "</br>";
			echo "</br>";

			//echo "</br>";
			//echo json_encode($this->gamedata["ships"]);
			//$ship = new $this->gamedata["ships"][$i]["shipClass"]();
			//echo "</br>";

			continue;


		/*
			for ($j = 0; $j < sizeof($this->gamedata["ships"][$i]->actions); $j++){
				echo "</br>";
				echo json_encode($this->gamedata["ships"][$i]->actions[$j]);
				echo "</br>";
				echo "</br>";
			}
		*/	//echo json_encode(get_class($this->gamedata["ships"][$i]));

			/*for ($j = 0; $j < sizeof($this->gamedata["ships"][$i]["actions"]); $j++){
			debug::log("j: ".$j);

				if ($this->gamedata["ships"][$i]["actions"][$j]["resolved"]){
					$facing = $facing + $this->gamedata["ships"][$i]["actions"][$j]["a"];
				}

				if ($j == sizeof($this->gamedata["ships"][$i]["actions"]) -1){
					$x = $this->gamedata["ships"][$i]["actions"][$j]["x"];
					$y = $this->gamedata["ships"][$i]["actions"][$j]["y"];
				}
			}*/

			//$this->ships[] = $ship;
		}
		return false;

	}

	public function handleFireOrders(){
		Debug::log("handleFireOrders -> ".sizeof($this->fireOrders));		

		for ($i = 0; $i < sizeof($this->fireOrders); $i++){			
			//debug::log("______________");
			$hits = 0;
			$shots = 0;
			$notes = "";

			$fire = $this->fireOrders[$i];

			$shooter = $this->getShipById($fire["shooterid"]);
			//echo get_class($shooter);
			$target = $this->getShipById($fire["targetid"]);
			//echo get_class($target);
			$weapon = $shooter->getWeaponById($fire["weaponid"]);
			echo json_encode($fire);
			echo json_encode($weapon);
			echo "</br></br>";
			$shots = $weapon->shots;
			$dist = Math::getDist($shooter->x, $shooter->y, $target->x, $target->y);
			$targetFacing = $target->facing;
			$hitAngle = Math::getAngle($target->x, $target->y, $shooter->x, $shooter->y);
			$angle = Math::addAngle($targetFacing, $hitAngle);
			$profile = $target->getHitChanceFromAngle($angle);
			$rangeLoss = $weapon->getAccLoss($dist);
			$final = $profile - $rangeLoss;

			//	debug::log("shots: ".$shots);
			for ($j = 0; $j < $shots; $j++){
					$roll = mt_rand(1, 100);
					$notes = $notes.$roll.",";

				if ($roll <= $final){
					$hits++;
				}
			}

			echo $shooter->shipClass." vs ".$target->shipClass." firing: ".$weapon->name;
			echo "</br>";
			echo "dist: ".$dist.", incoming from: ".$angle." °";
			echo "</br></br>";;
			$this->fireOrders[$i]["req"] = $final;
			$this->fireOrders[$i]["notes"] = $notes;
			$this->fireOrders[$i]["hits"] = $hits;


			/*
				debug::log($shooter->id." to ".$target->id);
				debug::log("facing: ".$targetFacing);
				debug::log("hitAngle:".$hitAngle);
				debug::log("fire in from: ".$angle);
				debug::log("profile val: ".$profile);
				debug::log("range loss: ".$rangeLoss);
				debug::log("end %: ".$final);
			*/
		}
	}

	public function updateFireOrders(){
		debug::log("updateFireOrders");
		DBManager::app()->updateFireOrders($this->fireOrders);
	}

	public function startDamageControlPhase(){
		Debug::log("startDamageControlPhase");

		$dbManager = DBManager::app();
		$phase = 3;

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

	public function finishTurn(){
		Debug::log("finishTurn");

	}

	public function getShipById($shipid){
		//debug::log("looking for ship :".$shipid);
		for ($i = 0; $i < sizeof($this->gamedata["ships"]); $i++){
			//debug::log("now :".$this->gamedata["ships"][$i]->id);
			if ($this->gamedata["ships"][$i]->id == $shipid){
				return $this->gamedata["ships"][$i];
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
