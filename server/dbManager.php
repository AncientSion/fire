<?php

class DBManager {

	private $connection = null;
	static protected $instance = null;

	function __construct(){

		if ($this->connection === null){
			$this->connection = new PDO("mysql:host=localhost;dbname=spacecombat",
							"aatu",
							"Kiiski",
						//	"root",
						//	"147147",
							array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
		}
	//	if ($this->connection != null){
	//		Debug::log("Connection established");
	//	}
	//	else {
	//		Debug::log("Failure connecting");
	//	}
	}
	
	static public function app(){
		echo "dbmanager::app";
        if(self::$instance === null OR !is_a(self::$instance, "DBManager")) {
			echo "return tb";
            self::$instance = new DBManager();
        } else echo "no db";
        return self::$instance;
	}

	public function reset(){
		$sql = array();

		$turn = 2;
		$phase = 2;

		$sql[] = "UPDATE playerstatus SET turn = ".$turn.", phase = ".$phase.", status = 'ready'";
		$sql[] = "UPDATE fireorders SET resolved = 0, req = 0 WHERE turn = ".$turn;
		$sql[] = "UPDATE games SET turn = ".$turn.", phase = ".$phase;
		$sql[] = "DELETE from damages WHERE turn = ".$turn;
		$sql[] = "DELETE from systemcrits WHERE turn = ".$turn;
		foreach ($sql as $query){
			if($this->update($query)){
				continue;
			}
			else return false;
		}

		Debug::log("-----Reset Success-----");

		return true;
	}
	

	public function test($sql){
		Debug::log($sql);
	}

	public function getLastInsertId(){
		return $this->connection->lastInsertId();
	}

	public function query($sql){
		$stmt = $this->connection->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	public function delete($sql){
		
		$stmt = $this->connection->prepare($sql);
		$stmt->execute();
		if ($stmt->errorCode() == 0){
			return true;
		}
	}

	public function update($sql){
		
		//debug::log("upd");
		$stmt = $this->connection->prepare($sql);
		
		if ($stmt->execute()){
			//debug::log("true");
			return true;
		}
		else {
			//debug::log("false");
			return false;
		}
	}

	public function registerAccount($name, $pass){
		
		$sql = "SELECT * FROM users";
		$result = $this->query($sql);
		
		$valid = true;
		
		if ($result){
			foreach ($result as $entry){
				if ($entry["username"] == $name){
					$valid = false;
					break;
				}
			}
		}
		
		if ($valid){
			$stmt = $this->connection->prepare("
				INSERT INTO users
					(username, password, access)
				VALUES
					(:username, :password, :access)
			");

			$access = 0;
			
			$stmt->bindParam(":username", $name);
			$stmt->bindParam(":password", $pass);
			$stmt->bindParam(":access", $access);
			
			$stmt->execute();
			if ($stmt->errorCode() == 0){
				echo "<script>alert('Account created, please login');</script>";
			}
		}
		else { 
			echo "Account already exists !";
		}
	}
	
	public function validateLogin($name, $pass){
		
		$stmt = $this->connection->prepare("
			SELECT id, access FROM users
			WHERE username = :username
			AND	password = :password
		");
		
		$stmt->bindParam(":username", $name);
		$stmt->bindParam(":password", $pass);
		$stmt->execute();
				
		$result = $stmt->fetch(PDO::FETCH_ASSOC);
		
		if ($result){
			return $result;
		}
		else {
			return false;
		}	
	}

	public function createNewGameAndJoin($userid, $name, $pv){
		if ($this->createNewGame($name, $pv)){
			$gameid = $this->getLastInsertId();
			if ($this->createPlayerStatus($userid, $gameid, 0, -1, "joined")){
				return true;
			}
		}
	}

	public function createPlayerStatus($userid, $gameid, $turn, $phase, $status){
		//debug::log("createPlayerStatus");

		$stmt = $this->connection->prepare("
			INSERT INTO playerstatus
				(userid, gameid, turn, phase, status)
			VALUES
				(:userid, :gameid, :turn, :phase, :status)
		");

		$stmt->bindParam(":userid", $userid);
		$stmt->bindParam(":gameid", $gameid);
		$stmt->bindParam(":turn", $turn);
		$stmt->bindParam(":phase", $phase);
		$stmt->bindParam(":status", $status);

		$stmt->execute();

		if ($stmt->errorCode() == 0){
			debug::log("entry CREATE for player ".$userid." in game ".$gameid." phase: ".$phase." and status ".$status);
			return true;
		} else return false;
	}

	public function createReinforceEntry($userid, $gameid, $points, $faction){
		//debug::log("createReinforceEntry for ".$points);

		$stmt = $this->connection->prepare("
			INSERT INTO reinforce
				(gameid, userid, points, faction)
			VALUES
				(:gameid, :userid, :points, :faction)
		");

		$stmt->bindParam(":gameid", $gameid);
		$stmt->bindParam(":userid", $userid);
		$stmt->bindParam(":points", $points);
		$stmt->bindParam(":faction", $faction);

		$stmt->execute();

		if ($stmt->errorCode() == 0){
			return true;
		} else return false;
	}

	public function getReinforceStatus($gameid, $userid){
		$stmt = $this->connection->prepare("
			SELECT * FROM reinforce 
			WHERE gameid = :gameid
			AND userid = :userid
		");

		$stmt->bindParam(":gameid", $gameid);
		$stmt->bindParam(":userid", $userid);

		$stmt->execute();

		$result = $stmt->fetch(PDO::FETCH_ASSOC);

		if ($result){
			return $result;
		} else return false;
	}

	public function getAvailableReinforcements($gameid, $userid){
		$stmt = $this->connection->prepare("
			SELECT * FROM reinforcements 
			WHERE gameid = :gameid
			AND userid = :userid
		");

		$stmt->bindParam(":gameid", $gameid);
		$stmt->bindParam(":userid", $userid);

		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

		if ($result){
			return $result;
		} else return null;
	}

	public function insertReinforcements($gameid, $userid, $turn, $ships){
			//debug::log("insertReinforcements");
		$stmt = $this->connection->prepare("
			INSERT INTO reinforcements
				(gameid, userid, classname, turn, arrival, cost)
			VALUES
				(:gameid, :userid, :classname, :turn, :arrival, :cost)
		");

		for ($i = 0; $i < sizeof($ships); $i++){
			$stmt->bindParam(":gameid", $gameid);
			$stmt->bindParam(":userid", $userid);
			$stmt->bindParam(":classname", $ships[$i]["classname"]);
			$stmt->bindParam(":turn", $turn);
			$stmt->bindParam(":arrival", $ships[$i]["arrival"]);
			$stmt->bindParam(":cost", $ships[$i]["value"]);
			$stmt->execute();
			
			if ($stmt->errorCode() == 0){
				continue;
			}
			else {
				return $stmt->errorCode();
			}
		}

		return true;
	}
	
	public function createNewGame($name, $pv){
		$stmt = $this->connection->prepare("
			INSERT INTO games
				(name, status, turn, phase, pv, reinforce)
			VALUES
				(:name, :status, :turn, :phase, :pv, :reinforce)
		");
		
		$status = "open";
		$reinforce = floor($pv / 10);
		$turn = -1;
		$phase = -1;
		
		$stmt->bindParam(":name", $name);
		$stmt->bindParam(":status", $status);
		$stmt->bindParam(":turn", $turn);
		$stmt->bindParam(":phase", $phase);
		$stmt->bindParam(":pv", $pv);
		$stmt->bindParam(":pv", $pv);
		$stmt->bindParam(":reinforce", $reinforce);
		
		$stmt->execute();
		
		if ($stmt->errorCode() == 0){
			return true;
		}
		else {
			echo "<script>alert('ERROR);</script>";
		}
	}
	
	public function leaveGame($userid, $gameid){

		$stmt = $this->connection->prepare("
			DELETE FROM playerstatus
			WHERE gameid = :gameid
			AND userid = :userid
		");		
		
		$stmt->bindParam(":gameid", $gameid);
		$stmt->bindParam(":userid", $userid);
		$stmt->execute();
		
		if ($stmt->errorCode() == 0){
			return true;
		}
		else {
			return $stmt->errorCode();
		}
	}

	public function requestReinforcements($userid, $gameid, $ships){
		$cost = 0;
		for ($i = 0; $i < sizeof($ships); $i++){
			$cost = $cost - $ships[$i]["cost"];
			$sql = "DELETE FROM reinforcements WHERE id = ".$ships[$i]["id"];
			$this->delete($sql);
		}

		$this->DBalterReinforcementPoints($userid, $gameid, $cost);
		$this->insertUnits($userid, $gameid, $ships);
		return true;
	}

	public function processInitialBuy($userid, $gameid, $units){
		$units = $this->insertUnits($userid, $gameid, $units);
		if ($this->insertLoads($userid, $gameid, $units)){
			return true;
		}
	}

	public function insertUnits($userid, $gameid, $units){
		//debug::log("DB insertUnits S: ".sizeof($units));

		$stmt = $this->connection->prepare("
			INSERT INTO units 
				(gameid, userid, ship, ball, classname, status, available, destroyed)
			VALUES
				(:gameid, :userid, :ship, :ball, :classname, :status, :available, :destroyed)
		");

		$ship; $ball = 0; $status = "bought"; $destroyed = 0;

		for ($i = 0; $i < sizeof($units); $i++){

			if ($units[$i]["classname"] == "Flight"){
				$ship = 0;
			}
			else {
				$ship = 1;
			}

			$stmt->bindParam(":gameid", $gameid);
			$stmt->bindParam(":userid", $userid);
			$stmt->bindParam(":ship", $ship);
			$stmt->bindParam(":ball", $ball);
			$stmt->bindParam(":classname", $units[$i]["classname"]);
			$stmt->bindParam(":status", $status);
			$stmt->bindValue(":available", (floor($units[$i]["turn"]) + floor($units[$i]["arrival"])));
			$stmt->bindParam(":destroyed", $destroyed);
			$stmt->execute();
			
			if ($stmt->errorCode() == 0){
				$units[$i]["id"] = $this->getLastInsertId();
				//echo json_encode($units[$i]["id"]);
				continue;
			}
			else {
				Debug::log($stmt->errorCode());
				return false;
			}
		}

		return $units;
	}

	public function insertLoads($userid, $gameid, $units){
		$stmt = $this->connection->prepare("
			INSERT INTO loads 
				(shipid, systemid, classname, amount)
			VALUES
				(:shipid, :systemid, :classname, :amount)
		");

		for ($i = 0; $i < sizeof($units); $i++){
			if (isset($units[$i]["upgrades"])){
				for ($j = 0; $j < sizeof($units[$i]["upgrades"]); $j++){
					for ($k = 0; $k < sizeof($units[$i]["upgrades"][$j]["loads"]); $k++){
						$stmt->bindParam(":shipid", $units[$i]["id"]);
						$stmt->bindParam(":systemid", $units[$i]["upgrades"][$j]["systemid"]);
						$stmt->bindParam(":classname", $units[$i]["upgrades"][$j]["loads"][$k]["classname"]);
						$stmt->bindParam(":amount", $units[$i]["upgrades"][$j]["loads"][$k]["amount"]);

						$stmt->execute();
						if ($stmt->errorCode() == 0){
							continue;
						}
						else {
							return false;
						}
					}
				}
			}
		}

		return true;
	}

	public function insertBallistics($gameid, $balls){
		//debug::log("DB insertBallistics");

		$stmt = $this->connection->prepare("
			INSERT INTO units 
				(gameid, userid, ship, ball, classname, status, available, destroyed)
			VALUES
				(:gameid, :userid, :ship, :ball, :classname, :status, :available, :destroyed)
		");

		$ball = 1;
		$status = "launched";
		$destroyed = 0;

		for ($i = 0; $i < sizeof($balls); $i++){
			$stmt->bindParam(":gameid", $gameid);
			$stmt->bindParam(":userid", $balls[$i]->userid);
			$stmt->bindParam(":ship", $balls[$i]->targetid);
			$stmt->bindParam(":ball", $ball);
			$stmt->bindParam(":classname", $balls[$i]->classname);
			$stmt->bindParam(":status", $status);
			$stmt->bindParam(":available", $balls[$i]->amount);
			$stmt->bindParam(":destroyed", $destroyed);
			$stmt->execute();
			
			if ($stmt->errorCode() == 0){
				$balls[$i]->id = $this->getLastInsertId();
				continue;
			}
			else {
				return false;
			}
		}

		$this->insertBallisticActions($balls);
		return true;
	}

	public function insertBallisticActions($balls){
		//Debug::log("DB insertBallisticActions");
		$stmt = $this->connection->prepare("
			INSERT INTO actions 
				(shipid, turn, type, dist, x, y, a, cost, delay, costmod, resolved)
			VALUES
				(:shipid, :turn, :type, :dist, :x, :y, :a, :cost, :delay, :costmod, :resolved)
		");
		$resolved = 1;
		$dist = 0;

		for ($i = 0; $i < sizeof($balls); $i++){
			for ($j = 0; $j < sizeof($balls[$i]->actions); $j++){
				if ($balls[$i]->actions[$j]->resolved == 0){
					$stmt->bindParam(":shipid", $balls[$i]->id);
					$stmt->bindParam(":turn", $balls[$i]->actions[$j]->turn);
					$stmt->bindParam(":type", $balls[$i]->actions[$j]->type);
					$stmt->bindParam(":dist", $dist);
					$stmt->bindParam(":x", $balls[$i]->actions[$j]->x);
					$stmt->bindParam(":y", $balls[$i]->actions[$j]->y);
					$stmt->bindParam(":a", $dist);
					$stmt->bindParam(":cost", $dist);
					$stmt->bindParam(":delay", $dist);
					$stmt->bindParam(":costmod", $dist);
					$stmt->bindParam(":resolved", $resolved);
					$stmt->execute();			
					if ($stmt->errorCode() == 0){
						continue;
					}
					else {
						return false;
					}
				}
			}
		}
		return true;
	}


	public function getActiveBallistics($gameid, $turn){
		//Debug::log("DB getBallistics");	
		$stmt = $this->connection->prepare("
			SELECT * from units
			WHERE gameid = :gameid
			AND ball = 1
			AND status != 'disabled'
		");

		$stmt->bindParam(":gameid", $gameid);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public function gameIsReady($gameid){
		$stmt = $this->connection->prepare("
			SELECT playerstatus.status from playerstatus
			JOIN games
			ON games.id = :gameid
			AND playerstatus.gameid = :gameid
		");
		
		$stmt->bindParam(":gameid", $gameid);
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

		if (sizeof($result) > 1){
			$ready = true;

			foreach ($result as $player){
				if ($player["status"] != "ready"){
					$ready = false;
					break;
				}
			}

			if ($ready){
				return true;
			}
		}
		else {
			return false;
		}
	}

	public function startGame($gameid){
		$players = $this->getPlayersInGame($gameid);
		for ($i = 0; $i < sizeof($players); $i++){
			$this->setPlayerstatus($players[$i]["userid"], $gameid, 1, -1, "waiting");
		}

		$stmt = $this->connection->prepare("
			UPDATE games 
			SET 
				status = :status,
				turn = :turn
			WHERE
				id = :id				
		");

		$status = "active";
		$turn = 1;

		$stmt->bindParam(":status", $status);
		$stmt->bindParam(":turn", $turn);
		$stmt->bindParam(":id", $gameid);

		$stmt->execute();

		if ($stmt->errorCode() == 0){
			return true;
		}
		else return false;
	}

	public function deployShipsDB($gameid, $ships){
		for ($i = 0; $i < sizeof($ships); $i++){
			if ($this->setUnitStatus($ships[$i]["id"], "deployed")){
				if ($this->insertActionsForShip($ships[$i]["id"], $ships[$i]["actions"])){
					continue;
				}
				else return false;
			}
			else return false;
		}
		return true;
	}

	public function deployFlightsDB($userid, $gameid, $flights){
		//Debug::log("deployFlights");
		if (sizeof($flights)){
			$flights = $this->insertUnits($userid, $gameid, $flights);
			for ($i = 0; $i < sizeof($flights); $i++){
				$this->insertFlightElements($flights[$i]);
				$this->updateSystemLoad($flights[$i]["launchdata"]);
				$this->insertActionsForShip($flights[$i]["id"], $flights[$i]["actions"]);
			}
		}
		return true;
	}

	public function insertFlightElements($flight){
		//Debug::log("insertFlightElements");
		$stmt = $this->connection->prepare("
			INSERT INTO fighters 
				(unitid, amount, classname)
			VALUES
				(:unitid, :amount, :classname)
		");

		for ($i = 0; $i < sizeof($flight["launchdata"]["loads"]); $i++){
			$stmt->bindParam(":unitid", $flight["id"]);
			if ($flight["launchdata"]["loads"][$i]["launch"] >= 1){
				$stmt->bindValue(":amount", $flight["launchdata"]["loads"][$i]["launch"]);
				$stmt->bindValue(":classname", $flight["launchdata"]["loads"][$i]["classname"]);
				$stmt->execute();
				if ($stmt->errorCode() != 0){
					return false;
				}
			}
		}
		return true;
	}	

	public function updateSystemLoad($data){
		//Debug::log("updateSystemLoad");
		$stmt = $this->connection->prepare("
			UPDATE loads
			SET amount = amount - :amount
			WHERE shipid = :shipid
			AND systemid = :systemid
			AND classname = :classname
		");

		for ($i = 0; $i < sizeof($data["loads"]); $i++){
			$stmt->bindParam(":shipid", $data["shipid"]);
			$stmt->bindParam(":systemid", $data["systemid"]);
			if ($data["loads"][$i]["launch"] >= 1){
				$stmt->bindValue(":classname", $data["loads"][$i]["classname"]);
				$stmt->bindValue(":amount", $data["loads"][$i]["launch"]);
				$stmt->execute();
				if ($stmt->errorCode() == 0){
					continue;
				} else return false;
			}
		}
		return true;
	}


	public function setUnitStatus($unitid, $status, $destroyed = 0){
		//Debug::log("id: ".$unitid.", status: ".$status.", des ".$destroyed);
		$stmt = $this->connection->prepare("
			UPDATE units 
			SET 
				status = :status,
				destroyed = :destroyed
			WHERE
				id = :id				
		");
		
		$stmt->bindParam(":status", $status);
		$stmt->bindParam(":destroyed", $destroyed);
		$stmt->bindParam(":id", $unitid);
		$stmt->execute();

		if ($stmt->errorCode() == 0){
			return true;
		}
		else {
			return false;
		}
	}

	public function DBdisableBallistics($balls){
		$stmt = $this->connection->prepare("
			UPDATE units 
			SET 
				status = :status
			WHERE
				id = :id				
		");

		$status = "disabled";
		
		for ($i = 0; $i < sizeof($balls); $i++){
			$stmt->bindParam(":id", $balls[$i]);
			$stmt->bindParam(":status", $status);
			$stmt->execute();

			if ($stmt->errorCode() == 0){
				continue;
			}
			else {
				return false;
			}
		}
		return;
	}

	public function insertDogfights($gameid, $turn, $dogfights){
		Debug::log("insertDogfights");
		$stmt = $this->connection->prepare("
			INSERT INTO dogfights 
				(gameid, turn, a, b)
			VALUES
				(:gameid, :turn, :a, :b)
		");

		for ($i = 0; $i < sizeof($dogfights); $i++){
			$stmt->bindParam(":gameid", $gameid);
			$stmt->bindParam(":turn", $turn);
			$stmt->bindParam(":a", $dogfights[$i][0]);
			$stmt->bindParam(":b", $dogfights[$i][1]);
			$stmt->execute();

			if ($stmt->errorCode() == 0){
				continue;
			}
		}
		return true;
	}

	public function getDogfights($units){
		$stmt = $this->connection->prepare("
			SELECT * FROM dogfights
			WHERE a = :shipid
			OR b = :shipid
		");

		for ($i = 0; $i < sizeof($units); $i++){
			if ($units[$i]->flight){
				$stmt->bindParam(":shipid", $units[$i]->id);
				$stmt->execute();
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
				if ($result){
					for ($j = 0; $j < sizeof($result); $j++){
						if ($result[$j]["a"] == $units[$i]->id){
							$units[$i]->dogfights[] = $result[$j]["b"];
						}
						else {
							$units[$i]->dogfights[] = $result[$j]["a"];
						}
					}
				}
			}
		}
		return true;
	}


	public function issueMovement($gameid, $ships){
		for ($i = 0; $i < sizeof($ships); $i++){
			if  ($this->insertActionsForShip($ships[$i]["id"], $ships[$i]["actions"])){
				continue;
			}
			else return false;

		}
		return true;
	}

	public function insertActionsForShip($shipid, $actions){
		Debug::log("insertActionsForShip");
		$stmt = $this->connection->prepare("
			INSERT INTO actions 
				(shipid, turn, type, dist, x, y, a, cost, delay, costmod, resolved)
			VALUES
				(:shipid, :turn, :type, :dist, :x, :y, :a, :cost, :delay, :costmod, :resolved)
		");

		$resolved = 0;

		for ($i = 0; $i < sizeof($actions); $i++){
			$stmt->bindParam(":shipid", $shipid);
			$stmt->bindParam(":turn", $actions[$i]["turn"]);
			$stmt->bindParam(":type", $actions[$i]["type"]);
			$stmt->bindParam(":dist", $actions[$i]["dist"]);
			$stmt->bindParam(":x", $actions[$i]["x"]);
			$stmt->bindParam(":y", $actions[$i]["y"]);
			$stmt->bindParam(":a", $actions[$i]["a"]);
			$stmt->bindParam(":cost", $actions[$i]["cost"]);
			$stmt->bindParam(":delay", $actions[$i]["delay"]);
			$stmt->bindParam(":costmod", $actions[$i]["costmod"]);
			$stmt->bindParam(":resolved", $resolved);
			$stmt->execute();

			if ($stmt->errorCode() == 0){
				continue;
			} 
			else {
				return false;
			}
		}
		return true;
	}

	public function insertPowers($gameid, $turn, $powers){
		$stmt = $this->connection->prepare("
			INSERT INTO powers 
				( unitid, systemid, turn, type, cost )
			VALUES
				( :unitid, :systemid, :turn, :type, :cost )
		");

		for ($i = 0; $i < sizeof($powers); $i++){
			$stmt->bindParam(":unitid", $powers[$i]["unitid"]);
			$stmt->bindParam(":systemid", $powers[$i]["systemid"]);
			$stmt->bindParam(":turn", $powers[$i]["turn"]);
			$stmt->bindParam(":type", $powers[$i]["type"]);
			$stmt->bindParam(":cost", $powers[$i]["cost"]);

			$stmt->execute();

			if ($stmt->errorCode() == 0){
				continue;
			}
			else return false;
		}
		return true;
	}

	public function insertFireOrders($gameid, $turn, $fires){

		$stmt = $this->connection->prepare("
			INSERT INTO fireorders 
				( gameid, turn, shooterid, targetid, weaponid, shots, resolved )
			VALUES
				( :gameid, :turn, :shooterid, :targetid, :weaponid, :shots, :resolved )
		");

		$resolved = 0;

		for ($i = 0; $i < sizeof($fires); $i++){
			$stmt->bindParam(":gameid", $gameid);
			$stmt->bindParam(":turn", $turn);
			$stmt->bindParam(":shooterid", $fires[$i]["shooterid"]);
			$stmt->bindParam(":targetid", $fires[$i]["targetid"]);
			$stmt->bindParam(":weaponid", $fires[$i]["weaponid"]);
			$stmt->bindParam(":shots", $fires[$i]["shots"]);
			$stmt->bindParam(":resolved", $resolved);

			$stmt->execute();

			if ($stmt->errorCode() == 0){
				continue;
			}
			else return false;
		}
		return true;
	}	

	public function deleteUnresolvedFireOrders($fires){
		debug::log("DB deleteUnresolvedFireOrders: ".sizeof($fires));
		$stmt = $this->connection->prepare("
			DELETE from fireorders WHERE id = :id
		");

		for ($i = sizeof($fires)-1; $i >= 0; $i--){
			if ($fires[$i]->resolved == 0){
				$stmt->bindParam(":id", $fires[$i]->id);
				$stmt->execute();				

				if ($stmt->errorCode() == 0){
					array_splice($fires, $i, 1);
					continue;
				}
			}
		}

		debug::log("DB deleteUnresolvedFireOrders DONE: ".sizeof($fires));
		return true;
	}

	public function updateFireOrders($fires){
		debug::log("DB updateFireOrders: ".sizeof($fires));
		$stmt = $this->connection->prepare("
			UPDATE fireorders
			SET
				req = :req,
				notes = :notes,
				hits = :hits,
				resolved = :resolved
			WHERE
				id = :id
		");

		for ($i = 0; $i < sizeof($fires); $i++){
			//ebug::log("fire id: ".$fires[$i]->id);
			$stmt->bindParam(":req", $fires[$i]->req);
			$stmt->bindParam(":notes", $fires[$i]->notes);
			$stmt->bindParam(":hits", $fires[$i]->hits);
			$stmt->bindParam(":resolved",$fires[$i]->resolved);
			$stmt->bindParam(":id", $fires[$i]->id);
			$stmt->execute();

			if ($stmt->errorCode() == 0){
				continue;
			}
			else return false;
		}

		return true;
	}

	public function dropNegativeFireOrders($fires){
		
	}

	public function updateBallisticFireOrder($fires){
		debug::log("DB updateBallisticFireOrder");
		$stmt = $this->connection->prepare("
			UPDATE fireorders
			SET
				resolved = :resolved
			WHERE
				id = :id
		");

		$resolved = 1;

		for ($i = 0; $i < sizeof($fires); $i++){
			$stmt->bindParam(":id", $fires[$i]->id);
			$stmt->bindParam(":resolved", $resolved);
			$stmt->execute();

			if ($stmt->errorCode() == 0){
				continue;
			}
			else return false;
		}

		return true;
	}

	public function getDamages($units){
		$stmt = $this->connection->prepare("
			SELECT * FROM damages
			WHERE shipid = :shipid
		");

		for ($i = 0; $i < sizeof($units); $i++){
			$stmt->bindParam(":shipid", $units[$i]->id);
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if ($result){
				for ($j = 0; $j < (sizeof($result)); $j++){
					$dmg = new Damage(
						$result[$j]["id"],
						$result[$j]["fireid"],
						$result[$j]["gameid"],
						$result[$j]["shipid"],
						$result[$j]["structureid"],
						$result[$j]["systemid"],
						$result[$j]["turn"],
						$result[$j]["roll"],
						$result[$j]["type"],
						$result[$j]["totalDmg"],
						$result[$j]["shieldDmg"],
						$result[$j]["structDmg"],
						$result[$j]["armourDmg"],
						$result[$j]["mitigation"],
						$result[$j]["negation"],
						$result[$j]["destroyed"],
						$result[$j]["notes"],
						$result[$j]["new"]
					);

					$result[$j] = $dmg;
				}
				$units[$i]->addDamageDB($result);
			}
		}
		return true;
	}

	public function getPowers($units){
		$stmt = $this->connection->prepare("
			SELECT * FROM powers
			WHERE unitid = :unitid
		");

		for ($i = 0; $i < sizeof($units); $i++){
			$stmt->bindParam(":unitid", $units[$i]->id);
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if ($result){
				for ($j = 0; $j < (sizeof($result)); $j++){
					$power = new Power(
						$result[$j]["id"],
						$result[$j]["unitid"],
						$result[$j]["systemid"],
						$result[$j]["turn"],
						$result[$j]["type"],
						$result[$j]["cost"]
					);

					$result[$j] = $power;
				}
				$units[$i]->addPowerDB($result);
			}
		}
		return true;
	}	

	public function getCrits($units){
		$stmt = $this->connection->prepare("
			SELECT * FROM systemcrits
			WHERE shipid = :shipid
		");

		for ($i = 0; $i < sizeof($units); $i++){
			$stmt->bindParam(":shipid", $units[$i]->id);
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if ($result){
			for ($j = 0; $j < (sizeof($result)); $j++){
					$crit = new Crit(
						$result[$j]["id"],
						$result[$j]["shipid"],
						$result[$j]["systemid"],
						$result[$j]["turn"],
						$result[$j]["type"],
						$result[$j]["duration"],
						0
					);

					$result[$j] = $crit;
				}
				$units[$i]->addCritDB($result);
			}
		}
		return true;
	}	

	public function getActions($units){
		$stmt = $this->connection->prepare("
			SELECT * FROM actions
			WHERE shipid = :shipid
		");

		for ($i = 0; $i < sizeof($units); $i++){
			$stmt->bindParam(":shipid", $units[$i]->id);
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

			if ($result){
				for ($j = 0; $j < sizeof($result); $j++){
					$units[$i]->actions[] = new Action(
						$result[$j]["turn"],
						$result[$j]["type"],
						$result[$j]["dist"],
						$result[$j]["x"],
						$result[$j]["y"],
						$result[$j]["a"],
						$result[$j]["cost"],
						$result[$j]["delay"],
						$result[$j]["costmod"],
						$result[$j]["resolved"]
					);

					$units[$i]->facing += $result[$j]["a"];
				}
				//Debug::log($units[$i]->classname." facing: ".$units[$i]->facing);
			}
		}
		return true;
	}

	public function insertDamageEntries($damages){
		debug::log(" => DB insertDamageEntries: ".sizeof($damages));

		$stmt = $this->connection->prepare("
			INSERT INTO damages 
				( fireid, shipid, gameid, structureid, systemid, turn, roll, type, totalDmg, shieldDmg, structDmg, armourDmg, mitigation, negation, destroyed, notes, new)
			VALUES
				( :fireid, :shipid, :gameid, :structureid, :systemid, :turn, :roll, :type, :totalDmg, :shieldDmg, :structDmg, :armourDmg, :mitigation, :negation, :destroyed, :notes, :new)
		");

		$new = 0;

		//echo json_encode($damages[0]);
		for ($i = 0; $i < sizeof($damages); $i++){
			$stmt->bindParam(":fireid", $damages[$i]->fireid);
			$stmt->bindParam(":shipid", $damages[$i]->shipid);
			$stmt->bindParam(":gameid", $damages[$i]->gameid);
			$stmt->bindParam(":structureid", $damages[$i]->structureid);
			$stmt->bindParam(":systemid", $damages[$i]->systemid);
			$stmt->bindParam(":turn", $damages[$i]->turn);
			$stmt->bindParam(":roll", $damages[$i]->roll);
			$stmt->bindParam(":type", $damages[$i]->type);
			$stmt->bindParam(":totalDmg", $damages[$i]->totalDmg);
			$stmt->bindParam(":shieldDmg", $damages[$i]->shieldDmg);
			$stmt->bindParam(":structDmg", $damages[$i]->structDmg);
			$stmt->bindParam(":armourDmg", $damages[$i]->armourDmg);
			$stmt->bindParam(":mitigation", $damages[$i]->mitigation);
			$stmt->bindParam(":negation", $damages[$i]->negation);
			$stmt->bindParam(":destroyed", $damages[$i]->destroyed);
			$stmt->bindParam(":notes", $damages[$i]->notes);
			$stmt->bindParam(":new", $new);

			$stmt->execute();

			if ($stmt->errorCode() == 0){
				continue;
			}
			else return false;
		}

		return true;
	}



	public function insertCritEntries($crits, $gameid){
		debug::log(" => DB insertCritEntries: ".sizeof($crits));
		
		$stmt = $this->connection->prepare("
			INSERT INTO systemcrits 
				( shipid, systemid, turn, type, duration)
			VALUES
				( :shipid, :systemid, :turn, :type, :duration)
		");

		for ($i = 0; $i < sizeof($crits); $i++){
			if ($crits[$i]->new == 1){
				$stmt->bindParam(":shipid", $crits[$i]->shipid);
				$stmt->bindParam(":systemid", $crits[$i]->systemid);
				$stmt->bindParam(":turn", $crits[$i]->turn);
				$stmt->bindParam(":type", $crits[$i]->type);
				$stmt->bindParam(":duration", $crits[$i]->duration);
				$stmt->execute();

				if ($stmt->errorCode() == 0){
					continue;
				}
				else return false;
			}
		}

		return true;
	}

	public function getPlayerStatus($gameid){
		$stmt = $this->connection->prepare("
			SELECT * FROM playerstatus
			WHERE
				gameid = :gameid
		");

		$stmt->bindParam(":gameid", $gameid);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

		if ($result){
			return $result;
		}
		else return false;
	}

	public function getReinforcePoints($gameid, $userid = 0){
		//debug::log("getReinforcePoints");
		if (! $userid){
			return false;
		}

		$stmt = $this->connection->prepare("
			SELECT * FROM reinforce
			WHERE gameid = :gameid
			AND userid = :userid
		");

		$stmt->bindParam(":gameid", $gameid);
		$stmt->bindParam(":userid", $userid);

		$stmt->execute();

		$result = $stmt->fetch(PDO::FETCH_ASSOC);

		if ($result){
			return $result;
		}
		else return false;
	}

	public function DBalterReinforcementPoints($userid, $gameid, $points){
		$stmt = $this->connection->prepare("
			UPDATE reinforce 
			SET 
				points = points + :points
			WHERE
				gameid = :gameid
			AND
				userid = :userid
		");

		$stmt->bindParam(":userid", $userid);
		$stmt->bindParam(":gameid", $gameid);
		$stmt->bindParam(":points", $points);

		$stmt->execute();

		if ($stmt->errorCode() == 0){
			return true;
		}
		else return false;
	}

	public function setPlayerstatus($userid, $gameid, $turn, $phase, $status){
		//debug::log("setPlayerstatus for player ".$userid. " adjusted to turn/phase: ".$turn."/".$phase);

		$stmt = $this->connection->prepare("
			UPDATE playerstatus 
			SET 
				turn = :turn,
				phase = :phase,
				status = :status
			WHERE
				gameid = :gameid
			AND
				userid = :userid
		");

		$stmt->bindParam(":userid", $userid);
		$stmt->bindParam(":gameid", $gameid);
		$stmt->bindParam(":turn", $turn);
		$stmt->bindParam(":phase", $phase);
		$stmt->bindParam(":status", $status);

		$stmt->execute();

		if ($stmt->errorCode() == 0){
			//debug::log("game ".$gameid.",user ".$userid." adjusting to turn/phase/status ".$turn." ".$phase." ".$status);
			return true;
		} else return false;
	}

	public function getAmountOfPlayersInGame($gameid){
		$stmt = $this->connection->prepare("
			SELECT COUNT(*) FROM users
			JOIN playerstatus 
			ON playerstatus.gameid = :gameid
			AND users.id = playerstatus.userid
			");


		$stmt->bindParam(":gameid", $gameid);

		$stmt->execute();

		if ($stmt->errorCode() == 0){
			return $stmt->fetch();

		}
		else 
			return $stmt->errorCode();
	}

	public function getShipsForPlayer($userid, $gameid){

		$stmt = $this->connection->prepare("
			SELECT
				classname 
			FROM 
				units
			WHERE
				userid = :userid
			AND
				gameid = :gameid
			AND ship = 1
			");

		$stmt->bindParam(":userid", $userid);
		$stmt->bindParam(":gameid", $gameid);
		$stmt->execute();
				
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		
		if ($result){
			return $result;
		}
		else {
			return false;
		}	
	}

	
	public function getUsername($id){	
		$sql = "(SELECT username FROM users WHERE ID = ".$id.")";
		$result = $this->query($sql);		
		return $result[0]["username"];
	}
	

	public function getCurrentTurn($gameid){

		$sql = "(SELECT turn FROM games WHERE id = ".$gameid.")";
		$result = $this->query($sql);
		return $result[0]["turn"];
	}
	
	public function getGameStatus($gameid, $userid, $turn){
	
		$stmt = $this->connection->prepare("
			SELECT status FROM playerstatus
			WHERE gameid = :gameid
			AND userid = :userid
			AND turn = :turn
		");
		
		$stmt->bindParam(":gameid", $gameid);
		$stmt->bindParam(":userid", $userid);
		$stmt->bindParam(":turn", $turn);
		$stmt->execute();
				
		$result = $stmt->fetch(PDO::FETCH_ASSOC);
		
		if ($result){
			return $result;
		}
		else {
			return false;
		}
	}

	public function getGameDetails($gameid){

		$stmt = $this->connection->prepare("
			SELECT * FROM games WHERE id = :id
		");

		$stmt->bindParam(":id", $gameid);
		$stmt->execute();				
		$result = $stmt->fetch(PDO::FETCH_ASSOC);
		return $result;
	}

	public function getIncomingShips($gameid, $turn){
		$stmt = $this->connection->prepare("
			SELECT * FROM units
			WHERE gameid = :gameid
			AND available > :turn
			AND destroyed = 0
			AND status = 'bought'
			ORDER BY userid ASC
		");
		
		$stmt->bindParam(":gameid", $gameid);
		$stmt->bindParam(":turn", $turn);
		$stmt->execute();
				
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		
		if ($result){
			return $result;
		}
		else {
			return false;
		}

	}

	public function getActiveUnits($gameid, $turn){
		$stmt = $this->connection->prepare("
			SELECT * FROM units
			WHERE gameid = :gameid
			AND ball = 0
			AND destroyed = 0
			AND available <= :turn
			ORDER BY userid ASC
		");
		
		$stmt->bindParam(":gameid", $gameid);
		$stmt->bindParam(":turn", $turn);
		$stmt->execute();
				
		$units = $stmt->fetchAll(PDO::FETCH_ASSOC);
		
		if ($units){
			for ($i = 0; $i < sizeof($units); $i++){
				$stmt = $this->connection->prepare("
					SELECT * FROM fighters
					WHERE fighters.unitid = :id
				");
				
				$stmt->bindParam(":id", $units[$i]["id"]);
				$stmt->execute();
						
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

				if ($result){
					$units[$i]["fighters"] = array();
					for ($j = 0; $j < sizeof($result); $j++){
						$units[$i]["fighters"][] = $result[$j];
					}
				}
			}
		}

		return $units;
	}

	public function getShipLoad($ships){
		$stmt = $this->connection->prepare("
			SELECT systemid, classname, amount 
			FROM loads 
			WHERE shipid = :shipid
		");

		for ($i = 0; $i < sizeof($ships); $i++){
			$stmt->bindParam(":shipid", $ships[$i]->id);
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

			if ($result){
				$ships[$i]->addLoadout($result);
			}
		}
		return true;
	}

	public function deleteEmptyLoads(){
		$stmt = $this->connection->prepare("
			DELETE FROM loads
			WHERE amount = 0;
		");

		$stmt->execute();
		if ($stmt->errorCode() == 0){
			return true;
		}
	}

	public function getAllFireOrders($gameid){
		//debug::log("getAllFireOrders for game: ".$gameid);
		$stmt = $this->connection->prepare("
			SELECT * FROM fireorders
			WHERE gameid = :gameid
		");

		$stmt->bindParam(":gameid", $gameid);
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

		//Debug::log("all FO size: ".sizeof($result));

		if ($result){
			for ($i = 0; $i < (sizeof($result)); $i++){
				//echo json_encode($result[$i]);
				$fire = new FireOrder(
					$result[$i]["id"],
					$result[$i]["gameid"],
					$result[$i]["turn"],
					$result[$i]["shooterid"],
					$result[$i]["targetid"],
					$result[$i]["weaponid"],
					$result[$i]["shots"],
					$result[$i]["req"],
					$result[$i]["notes"],
					$result[$i]["hits"],
					$result[$i]["resolved"]
				);

				$result[$i] = $fire;
			}
			return $result;
		} else return $result;
	}

	public function getOpenBallisticFireOrders($gameid, $turn){
		$stmt = $this->connection->prepare("
			SELECT * FROM fireorders
			WHERE gameid = :gameid
			AND resolved = :resolved
		");
		$resolved = 0;
		$stmt->bindParam(":gameid", $gameid);
		$stmt->bindParam(":resolved", $resolved);
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		if ($result){
			for ($i = 0; $i < (sizeof($result)); $i++){
				$fire = new FireOrder(
					$result[$i]["id"],
					$result[$i]["gameid"],
					$result[$i]["turn"],
					$result[$i]["shooterid"],
					$result[$i]["targetid"],
					$result[$i]["weaponid"],
					$result[$i]["shots"],
					$result[$i]["req"],
					$result[$i]["notes"],
					$result[$i]["hits"],
					$result[$i]["resolved"]
				);

				$result[$i] = $fire;
			}
			return $result;
		} else return $result;
	}

	public function resolveDeployActions($gameid, $turn){
		Debug::log("resolveDeployActions");
		$ships = $this->getActiveUnits($gameid, $turn);
		$stmt = $this->connection->prepare("
			UPDATE actions
			SET resolved = 1
			WHERE 
				shipid = :shipid
			AND 
				type = :type
			AND 
				turn = :turn
		");

		$type = "deploy";

		for ($i = 0; $i < sizeof($ships); $i++){
			$stmt->bindParam(":shipid", $ships[$i]["id"]);
			$stmt->bindParam(":type", $type);
			$stmt->bindParam(":turn", $turn);
			$stmt->execute();
			if ($stmt->errorCode() == 0){
				continue;
			}
		}

		return true;
	}

	public function resolveUnitMovementDB($ships){
		Debug::log("resolveUnitMovementDB");

		$stmt = $this->connection->prepare("
			UPDATE actions
			SET resolved = 1
			WHERE 
				shipid = :shipid
			AND
				resolved = 0
		");

		for ($i = 0; $i < sizeof($ships); $i++){
			$stmt->bindParam(":shipid", $ships[$i]->id);
			$stmt->execute();

			if ($stmt->errorCode() == 0){
				continue;
			}
			else return false;
		}

		return true;
	}
		
	public function getPlayersInGame($gameid){
		$stmt = $this->connection->prepare("
			SELECT * FROM users
			JOIN playerstatus 
			ON playerstatus.gameid = :gameid
			AND users.id = playerstatus.userid
		");

		$stmt->bindParam(":gameid", $gameid);
		$stmt->execute();				
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}


	public function getOngoingGames($id){
		$stmt = $this->connection->prepare("
			SELECT * FROM games
			WHERE status = :status
		");
		
		$ongoing = "active";
		$stmt->bindParam(":status", $ongoing);
		$stmt->execute();
		
		$result = $stmt->fetchAll();
		
		if (sizeof($result) >= 1){
		//	debug::log("Games found: ".sizeof($result));
			return $result;
		}
		else {
		//	debug::log("no gams found");
			return false;
		}
	}


	public function getOpenGames($id){
	
		$null = 0;
		
		$stmt = $this->connection->prepare("
			SELECT * FROM games
			WHERE games.status = :status
		");
		
		$open = "open";
		$stmt->bindParam (":status", $open);
		$stmt->execute();
		
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);		


		if ($result){
			return $result;
		}
		else {
			return false;
		}
	}


	public function getWaitingForOpponentGames($id){
	
		$null = 0;
		
		$stmt = $this->connection->prepare("
			SELECT id, name
			FROM games
			WHERE playerA = :value1
			AND playerB = 0
			OR playerB = :value1
			AND playerA = 0
		");
		
		$stmt->bindParam(":value1", $id);
		$stmt->execute();
		
		$result = $stmt->fetchAll();
		
		if (sizeof($result) >= 1){
		//	debug::log("Games found: ".sizeof($result));
			return $result;
		}
		else {
		//	debug::log("no gams found");
			return false;
		}
	}



	public function getAllUnfinishedGames(){

		$stmt = $this->connection->prepare("
			SELECT * FROM games
			WHERE status <> (:finished)
		");
		$finished = "finished";
		$stmt->bindParam(":finished", $finished);

		$stmt->execute();

		$result = $stmt->FetchAll(PDO::FETCH_ASSOC);
		$playerInfo = array();

		for ($i = 0; $i < sizeof($result); $i++){
			
			$result[$i]["playerdata"] = array();

			$stmt = $this->connection->prepare("
				SELECT playerstatus.playerid, playerstatus.status, player.username FROM usersstatus
				INNER JOIN player
					ON playerstatus.playerid = player.id
				WHERE playerstatus.gameid = :gameid
			");

			$stmt->bindParam(":gameid", $result[$i]["id"]);

			$stmt->execute();

			$playerdata = $stmt->FetchAll(PDO::FETCH_ASSOC);

			if ($playerdata){
				$result[$i]["playerdata"] = $playerdata;
			}

		}
		
		if ($result){
			return $result;
		}
		else {
			return false;
		}
	}

	public function updateAllPlayerStatusForGame($gameid, $turn, $status){
		debug::log("updateAllPlayerStatusForGame");

		$stmt = $this->connection->prepare("
			UPDATE playerstatus
			SET 
				turn = :turn,
				status = :status
			WHERE gameid = :gameid
		");

		$newTurn = $turn +1;

		$stmt->bindParam(":turn", $newTurn);
		$stmt->bindParam(":status", $status);
		$stmt->bindParam(":gameid", $gameid);

		$stmt->execute();

		if ($stmt->errorCode() == 0){
		//	debug::log("done");
			return true;
		}
		else return false;
	}


	public function setGameTurn($turn){

		$stmt = $this->connection->prepare("
			UPDATE games
			SET	turn = :turn
			WHERE gameid = :gameid
		");

		$stmt->bindParam(":turn", $turn);

		$stmt->execute();

		if ($stmt->errorCode() == 0){
			return true;
		}
		else return false;
	}

	public function setGameTurnPhase($gameid, $turn, $phase){
		//debug::log("setGameTurnPhase: ".$turn."/".$phase);
		$stmt = $this->connection->prepare("
			UPDATE games
			SET
				phase = :phase,
				turn = :turn
			WHERE id = :id
		");

		$stmt->bindParam(":turn", $turn);
		$stmt->bindParam(":phase", $phase);
		$stmt->bindParam(":id", $gameid);

		$stmt->execute();

		if ($stmt->errorCode() == 0){
			return true;
		}
		else return false;
	}
}		

?>