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
	public $playerstatus = array();
	public $reinforcements = array();
	public $reinforce = array();
	public $incoming = array();

	function __construct($userid = 0, $gameid = 0){
		$this->userid = $userid;
		$this->gameid = $gameid;

		if ($this->gameid & !$this->userid){
			$this->getGameAndPlayerStatus();
			$this->getGameData();
		}
		else if ($this->gameid){
			$this->getGameAndPlayerStatus();

			if ($this->turn == -1){
				return;
			}
			else {
				$this->getGameData();
			}
		}
	}

	public function getMemory($size){
	    $unit=array('b','kb','mb','gb','tb','pb');
	    debug::log(@round($size/pow(1024,($i=floor(log($size,1024)))),2).' '.$unit[$i]);
	}

	public function log(){
		//echo "SHIPS_________"; echo "</br></br>";
		foreach ($this->ships as $ship){
			//echo "</br>";
			foreach ($ship->structures as $struct){
				for ($i = 0; $i < sizeof($struct->damages); $i++){
					//echo json_encode($struct->damages[$i]);
					//echo "</br>";
				}
			}	
		}
	}

	public function convert($size){
	    $unit = array('b','kb','mb','gb','tb','pb');
	    return @round($size/pow(1024,($i=floor(log($size,1024)))),2).' '.$unit[$i];
	}

	public function validateFleetCost($gameid, $ships){
		Debug::log("validateFleetCost");

		$max = DBManager::app()->getGameDetails($gameid)["pv"];
		$pv = 0;
		$remain = 0;

		foreach ($ships as $ship){
			$name = $ship["shipClass"];
			$value = "value";
			$pv += $name::$$value;
		}

		if ($pv <= $max){
			$remain = $max - $pv;

			if ($remain == 0){
				return 1;
			}
			else return $remain;
		}
		else {
			return false;
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
		Debug::log("getGameAndPlayerStatus");
		$this->game = DBManager::app()->getGameDetails($this->gameid);
		$this->playerstatus = DBManager::app()->getPlayerStatus($this->gameid);
	}

	public function getGameData(){
		Debug::log("getGameData");
		$db = DBManager::app();

		$ships;

		$this->game = $db->getGameDetails($this->gameid);
		//echo json_encode($this->game);
		$this->turn = $this->game["turn"];
		$this->phase = $this->game["phase"];

		$this->playerstatus = $db->getPlayerStatus($this->gameid);
		$this->reinforce = $db->getReinforcePoints($this->gameid, $this->userid);

		$ships = $db->getActiveShips($this->gameid, $this->turn);
		$ships = $db->getActionsForShips($ships);

		$this->fires = $db->getAllFireOrders($this->gameid);
		$this->damages = $db->getAllDamageEntries($this->gameid);
		$this->ships = $this->assembleShips($ships);

		$this->reinforcements = $db->getAvailableReinforcements($this->gameid, $this->userid);
		$this->incoming = $db->getIncomingShips($this->gameid, $this->turn);
	}

	public function assembleShips($ships){
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

			$ship = new $ships[$i]["shipClass"](
				$ships[$i]["id"],
				$ships[$i]["userid"],
				$x, 
				$y,
				0,
				$ships[$i]["available"]
			);

			$ship->actions = $ships[$i]["actions"];


			for ($j = 0; ($j < sizeof($ship->actions)); $j++){
				$ship->facing = $ship->facing + $ship->actions[$j]["a"];
			}

			$ship = $this->addFireOrders($ship);
			$ship = $this->addDamages($ship);
			$ships[$i] = $ship;
		}

		return $ships;
	}

	public function addFireOrders($ship){
		if ($this->fires){
			for ($i = 0; $i < sizeof($this->fires); $i++){
				if ($this->fires[$i]->shooterid == $ship->id){
					for ($k = 0; $k < sizeof($ship->structures); $k++){
						for ($l = 0; $l < sizeof($ship->structures[$k]->systems); $l++){
							if ($this->fires[$i]->weaponid == $ship->structures[$k]->systems[$l]->id){
								//debug::log("found!");
								$ship->structures[$k]->systems[$l]->fireOrders[] = $this->fires[$i];
							}
						}
					}
				}
			}
		}
		
		return $ship;
	}

	public function addDamages($ship){
		//echo "dmg size: ".sizeof($this->damages)."\n";
		//echo "ship size: ".sizeof($ships)."\n";
		for ($j = 0; $j < sizeof($this->damages); $j++){
			if ($ship->id == $this->damages[$j]->shipid){
				for ($k = 0; $k < sizeof($ship->structures); $k++){
					if ($ship->structures[$k]->id == $this->damages[$j]->structureid){
						$ship->structures[$k]->damages[] = $this->damages[$j];
					}
				}

			}
		}
		//echo json_encode($this->damages);
		return $ship;

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
		Debug::log("canAdvanceGameState?");

		if ($this->game["status"] == "open"){
			Debug::log("FALSE");
			return false;
		}
		else if (sizeof($this->playerstatus) >= 2){
			for ($i = 0; $i < sizeof($this->playerstatus); $i++){
				//echo json_encode($this->playerstatus[$i]);
				if ($this->playerstatus[$i]["status"] == "waiting"){
					Debug::log("FALSE");
					return false;
				}
			}
		}

		Debug::log("TRUE");
		return true;
	}

	public function doAdvanceGameState(){
		Debug::log("doAdvanceGameState for game".$this->gameid);

		switch ($this->phase){
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
				$this->startDamageControlPhase();
				break;
			case 3; // from damage control to NEW TURN - deploymnt
				$this->handleDamageControlPhase();
				$this->endTurn();
				$this->startNewTurn();
				$this->startDeploymentPhase();
				break;
			default:
				break;
		}

		return true;
	}


	public function pickReinforcements($userid){
		Debug::log("pickReinforcements");
		$status = DBManager::app()->getReinforceStatus($this->gameid, $userid);
		$available = DBManager::app()->getAvailableReinforcements($this->gameid, $userid);
		$validShips = $this->getShipsForFaction($status["faction"]);
		$req = 8;

		for ($i = sizeof($validShips)-1; $i >= 0; $i--){
			if (mt_rand(1, 10) > $req){
				array_splice($validShips, $i, 1);
			}
			else {
				$validShips[$i]["arrival"] = (mt_rand(2, 4));
			}
		}

		DBManager::app()->insertReinforcements($this->gameid, $userid, $this->turn, $validShips);
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

		if ($dbManager->setGameTurnPhase($this->gameid, $this->turn, $phase)){
			$players = $dbManager->getPlayerStatus($this->gameid);

			for ($i = 0; $i < sizeof($players); $i++){
				if ($dbManager->setPlayerstatus($players[$i]["userid"], $this->gameid, $this->turn, $phase, "waiting")){
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
		if (DBManager::app()->resolveMovement($this->ships)){
			return true;
		}
	}
	
	public function startFiringPhase(){
		Debug::log("startFiringPhase");
		$dbManager = DBManager::app();
		$phase = 2;

		if ($dbManager->setGameTurnPhase($this->gameid, $this->turn, $phase)){
			$players = $dbManager->getPlayerStatus($this->gameid);

			for ($i = 0; $i < sizeof($players); $i++){
				if ($dbManager->setPlayerstatus($players[$i]["userid"], $this->gameid, $this->turn, $phase, "waiting")){
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

		if ($this->handleFireOrders()){
			$this->updateFireOrders();
			$this->writeDamageEntries();
		}
		return true;
	}

	public function handleDamageControlPhase(){
		Debug::log("handleDamageControlPhase");
		return true;
	}

	public function endTurn(){
		Debug::log("endTurn");
		$players = DBManager::app()->getPlayerStatus($this->gameid);
		for ($i = 0; $i < sizeof($players); $i++){
			DBManager::app()->alterReinforcementPoints(
				$players[$i]["userid"],
				$this->gameid,
				$this->game["reinforce"]
			);
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
		//echo "\nHANDLING\n";
		if ($this->fires){
			for ($i = 0; $i < sizeof($this->fires); $i++){
				//echo json_encode($this->fires[$i]);
				if ($this->fires[$i]->resolved == 0){
					//debug::log("fire ".$this->fires[$i]->id);
					//debug::log("shooter: ".$this->fires[$i]->shooterid." vs target".$this->fires[$i]->targetid);
					$this->fires[$i]->shooter = $this->getShipById($this->fires[$i]->shooterid);
					$this->fires[$i]->weapon = $this->fires[$i]->shooter->getSystemById($this->fires[$i]->weaponid);
					$this->fires[$i]->target = $this->getShipById($this->fires[$i]->targetid);
					$this->fires[$i] = $this->calculateHitChance($this->fires[$i]);
					$this->fires[$i] = $this->rollForHit($this->fires[$i]);
					$this->fires[$i] = $this->rollForDamage($this->fires[$i]);
					$this->fires[$i] = $this->getHitSection($this->fires[$i]);
					$this->doDamage($this->fires[$i]);

					unset($this->fires[$i]->shooter);
					unset($this->fires[$i]->weapon);
					unset($this->fires[$i]->target);
				}

				//echo json_encode($this->fires[$i]); echo "</br></br>";
			}
		}

		return true;
	}

	public function calculateHitChance($fire){
		//Debug::log("calculateHitChance for fire ID ".$fire->id);	

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
		//Debug::log("rollForHit for fire ID ".$fire->id);

		$hits = 0;
		$notes = "";

		$fire = $fire->weapon->rollForHit($fire);
		return $fire;
	}

	public function rollForDamage($fire){
		//Debug::log("rollForDamage for fire ID ".$fire->id);	

		$fire = $fire->weapon->getDamage($fire);
		return $fire;
	}

	public function getHitSection($fire){
		//Debug::log("getHitSection for fire ID ".$fire->id);	

		$fire = $fire->target->getHitSection($fire);
		return $fire;
	}

	public function doDamage($fire){
		//Debug::log("doDamage");	
		for ($i = 0; $i < sizeof($this->ships); $i++){
			if ($this->ships[$i]->id == $fire->targetid){
				for ($j = 0; $j < $fire->hits; $j++){
					$dmg = $this->ships[$i]->createDamageObject($fire);
					$this->ships[$i]->applyDamage($fire->pick, $dmg);
					$this->damages[] = $dmg;
				}
				return $fire;
			}
		}
	}

	public function updateFireOrders(){
		debug::log("updateFireOrders");
		DBManager::app()->updateFireOrders($this->fires);
	}

	public function writeDamageEntries(){
		debug::log("writeDamageEntries");
		DBManager::app()->insertDamageEntires($this->damages);
	}


	public function startDamageControlPhase(){
		Debug::log("startDamageControlPhase");

		$dbManager = DBManager::app();
		$phase = 3;

		if ($dbManager->setGameTurnPhase($this->gameid, $this->turn, $phase)){
			$players = $dbManager->getPlayerStatus($this->gameid);

			for ($i = 0; $i < sizeof($players); $i++){
				if ($dbManager->setPlayerstatus($players[$i]["userid"], $this->gameid, $this->turn, $phase, "waiting")){
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
		for ($i = 0; $i < sizeof($this->ships); $i++){
			//echo json_encode($this->gd["ships"][$i]);
			//debug::log("class: ".get_class($this->gd["ships"][$i]));
			//debug::log("now : ".$this->ships[$i]->id);
			if ($this->ships[$i]->id == $shipid){
				//debug::log("found!");
				return $this->ships[$i];
			}
		}
	}

	public function getFactions(){
		return ["Earth Alliance", "Centauri Republic", "Minbari Federation"];
	}

	public function getShipsForFaction($faction){
		$ships = [];
		$data = [];

		switch ($faction){
			case "Earth Alliance";
				$ships = array(
					"Omega",
					"Hyperion",
					"Tethys"
				);
				break;
			case "Centauri Republic";
				$ships = array();
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

		$value = "value";
		$ship;

		for ($i = 0; $i < sizeof($ships); $i++){
			$name = $ships[$i];
			$ship = array(
				"shipClass" => $ships[$i],
				"cost" => $name::$$value,
				"arrival" => 0
			);

			$data[] = $ship;
		}

		return $data;

	}

	public function getShipClass($name){
		debug::log("asking for preview of: ".$name);
		$ship = new $name(1, 1, 0, 0, 0, 0);
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
			$name = $allShips[$i]["shipClass"];
			$ship = new $name(0, 0, 0, 0, 0, 0);
			$allShips[$i] = $ship;
			continue;
		}

	return $allShips;
	}

}
?>
