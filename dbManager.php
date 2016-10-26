<?php


require_once("server\classes.php");


class DBManager {

	private $connection = null;
	static protected $instance = null;

	function __construct(){

		if ($this->connection === null){
			$this->connection = new PDO("mysql:host=localhost;dbname=spacecombat",
						//	"aatu",
						//	"Kiiski",
							"root",
							"147147",
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
        if(self::$instance === null OR !is_a(self::$instance, 'DBManager')) { //With is_a we are making sure our self::$instance variable holds a class instance of DBManager
            self::$instance = new DBManager();
        }
        return self::$instance;
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

	public function update($sql){
		
		debug::log("upd");
		$stmt = $this->connection->prepare($sql);
		
		if ($stmt->execute()){
		debug::log("true");
			return true;
		}
		else {
		debug::log("false");
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
		debug::log("createPlayerStatus");

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
	
	public function createNewGame($name, $pv){
		$stmt = $this->connection->prepare("
			INSERT INTO games
				(name, status, turn, phase, pv)
			VALUES
				(:name, :status, :turn, :phase, :pv)
		");
		
		$status = "open";
		$turn = -1;
		$phase = -1;
		
		$stmt->bindParam(":name", $name);
		$stmt->bindParam(":status", $status);
		$stmt->bindParam(":turn", $turn);
		$stmt->bindParam(":phase", $phase);
		$stmt->bindParam(":pv", $pv);
		
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

	public function buyFleet($userid, $gameid, $ships){
		debug::log("buyFleet");
		debug::log($userid);
		debug::log($gameid);
		debug::log($ships);

		$stmt = $this->connection->prepare("
			INSERT INTO ships 
				(gameid, userid, shipclass, status, destroyed)
			VALUES
				(:gameid, :userid, :shipclass, :status, :destroyed)
		");


		$status = "bought";
		$destroyed = 0;

		for ($i = 0; $i < sizeof($ships); $i++){
		debug::log($ships[$i]["shipClass"]);
			$stmt->bindParam(":gameid", $gameid);
			$stmt->bindParam(":userid", $userid);
			$stmt->bindParam(":shipclass", $ships[$i]["shipClass"]);
			$stmt->bindParam(":status", $status);
			$stmt->bindParam(":destroyed", $destroyed);
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
			if ($this->setPlayerstatus($players[$i]["userid"], $gameid, 1, -1, "waiting")){
				continue;
			}
			else return false;
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

	public function deployShips($gameid, $ships){

		for ($i = 0; $i < sizeof($ships); $i++){
			if ($this->setShipStatus($ships[$i]["id"], "deployed")){
				if ($this->insertActionsForShip($ships[$i]["id"], $ships[$i]["actions"])){
					continue;
				}
				else return false;
			}
			else return false;
		}

		return true;
	}

	public function setShipStatus($shipid, $status){
		$stmt = $this->connection->prepare("
			UPDATE ships 
			SET 
				status = :status
			WHERE
				id = :id				
		");
		
		$stmt->bindParam(":status", $status);
		$stmt->bindParam(":id", $shipid);
		$stmt->execute();

		if ($stmt->errorCode() == 0){
			return true;
		} else return false;
	}

	public function insertActionsForShip($shipid, $actions){
		$stmt = $this->connection->prepare("
			INSERT INTO shipactions 
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

	public function issueMovement($gameid, $ships){
		for ($i = 0; $i < sizeof($ships); $i++){
			if  ($this->insertActionsForShip($ships[$i]["id"], $ships[$i]["actions"])){
				continue;
			}
			else return false;

		}
		return true;
	}

	public function issueFire($gameid, $turn, $fires){
		//debug::log("issueFire");

		$stmt = $this->connection->prepare("
			INSERT INTO fireorders 
				( gameid, turn, shooterid, targetid, weaponid, resolved )
			VALUES
				( :gameid, :turn, :shooterid, :targetid, :weaponid, :resolved )
		");

		$resolved = 0;

		for ($i = 0; $i < sizeof($fires); $i++){

		//	foreach ($fires[$i] as $key => $value){
		//		debug::log("key: ".$key." val: ".$value);
		//	}

			$stmt->bindParam(":gameid", $gameid);
			$stmt->bindParam(":turn", $turn);
			$stmt->bindParam(":shooterid", $fires[$i]["shooterId"]);
			$stmt->bindParam(":targetid", $fires[$i]["targetId"]);
			$stmt->bindParam(":weaponid", $fires[$i]["weaponId"]);
			$stmt->bindParam(":resolved", $resolved);

			$stmt->execute();

			if ($stmt->errorCode() == 0){
				continue;
			}
			else return false;
		}

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

		$resolved = 1;

		for ($i = 0; $i < sizeof($fires); $i++){
			//ebug::log("fire id: ".$fires[$i]->id);
			$stmt->bindParam(":req", $fires[$i]->req);
			$stmt->bindParam(":notes", $fires[$i]->notes);
			$stmt->bindParam(":hits", $fires[$i]->hits);
			$stmt->bindParam(":resolved", $resolved);
			$stmt->bindParam(":id", $fires[$i]->id);
			$stmt->execute();

			if ($stmt->errorCode() == 0){
				continue;
			}
			else return false;
		}

		return true;
	}

	public function insertDamageEntires($damages){
		debug::log("DB insertDamageEntires");

		$stmt = $this->connection->prepare("
			INSERT INTO damages 
				( shipid, gameid, structureid, turn, damage, armour)
			VALUES
				( :shipid, :gameid, :structureid, :turn, :damage, :armour)
		");

		$resolved = 1;

		for ($i = 0; $i < sizeof($damages); $i++){
			//echo json_encode($damages[$i]);
			$stmt->bindParam(":shipid", $damages[$i]->shipid);
			$stmt->bindParam(":gameid", $damages[$i]->gameid);
			$stmt->bindParam(":structureid", $damages[$i]->structureid);
			$stmt->bindParam(":turn", $damages[$i]->turn);
			$stmt->bindParam(":damage", $damages[$i]->damage);
			$stmt->bindParam(":armour", $damages[$i]->armour);

			$stmt->execute();

			if ($stmt->errorCode() == 0){
				continue;
			}
			else return false;
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

	public function setPlayerstatus($userid, $gameid, $turn, $phase, $status){
		debug::log("setPlayerstatus");

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
			debug::log("game ".$gameid.",user ".$userid." adjusting to turn/phase/status ".$turn." ".$phase." ".$status);
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
				shipclass 
			FROM 
				ships
			WHERE
				userid = :userid
			AND
				gameid = :gameid
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

	public function getAllShipsForGame($gameid){
		$stmt = $this->connection->prepare("
			SELECT * FROM ships
			WHERE gameid = :gameid
			ORDER BY userid ASC
		");
		
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

	public function getActionsForShips($ships){
		$stmt = $this->connection->prepare("
			SELECT * FROM shipactions
			WHERE shipid = :shipid
		");

		for ($i = 0; $i < sizeof($ships); $i++){
			$ships[$i]["actions"] = array();
			$stmt->bindParam(":shipid", $ships[$i]["id"]);
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

			if ($result){
				$ships[$i]["actions"] = $result;
			}
		}

		return $ships;
	}

	public function getAllFireOrders($gameid){
		debug::log("getAllFireOrders for turn");
		$stmt = $this->connection->prepare("
			SELECT * FROM fireorders
			WHERE gameid = :gameid
		");

		$stmt->bindParam(":gameid", $gameid);
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

		if ($result){
			for ($i = 0; $i < (sizeof($result)); $i++){
				//echo json_encode($fires[$i]);
				$fire = new FireOrder(
					$result[$i]["id"],
					$result[$i]["gameid"],
					$result[$i]["turn"],
					$result[$i]["shooterid"],
					$result[$i]["targetid"],
					$result[$i]["weaponid"],
					$result[$i]["req"],
					$result[$i]["notes"],
					$result[$i]["hits"],
					$result[$i]["resolved"]
				);

				$result[$i] = $fire;
			}

			return $result;
		}
		else return false;

	}

	public function getAllDamages($gameid){
		debug::log("getAllDamages");
		$stmt = $this->connection->prepare("
			SELECT * FROM damages
			INNER JOIN ships
				ON ships.gameid = :gameid
		");

		$stmt->bindParam(":gameid", $gameid);
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);


		if ($result){
			/*for ($i = 0; $i < (sizeof($result)); $i++){
				//echo json_encode($fires[$i]);
				$fire = new FireOrder(
					$result[$i]["id"],
					$result[$i]["gameid"],
					$result[$i]["turn"],
					$result[$i]["shooterid"],
					$result[$i]["targetid"],
					$result[$i]["weaponid"],
					$result[$i]["req"],
					$result[$i]["notes"],
					$result[$i]["hits"],
					$result[$i]["resolved"]
				);

				$result[$i] = $fire;

		
			}
			*/

			return $result;
		}
		else return false;

	}

	public function resolveDeployment($gameid){
		Debug::log("resolveDeployment");
		$ships = $this->getAllShipsForGame($gameid);
		$stmt = $this->connection->prepare("
			UPDATE shipactions
			SET resolved = 1
			WHERE 
				shipid = :shipid
			AND 
				type = :type
		");

		$type = "deploy";

		for ($i = 0; $i < sizeof($ships); $i++){
			$stmt->bindParam(":shipid", $ships[$i]["id"]);
			$stmt->bindParam(":type", $type);
			$stmt->execute();

			if ($stmt->errorCode() == 0){
				continue;
			}
			else return false;
		}

		return true;
	}

	public function resolveMovement($gameid){
		Debug::log("resolveMovement");
		$ships = $this->getAllShipsForGame($gameid);
		$stmt = $this->connection->prepare("
			UPDATE shipactions
			SET resolved = 1
			WHERE 
				shipid = :shipid
		");

		for ($i = 0; $i < sizeof($ships); $i++){
			$stmt->bindParam(":shipid", $ships[$i]["id"]);
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
			SELECT *
			FROM games
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
			return null;
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
			return null;
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
			return null;
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
			return null;
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

	public function setGamePhase($gameid, $phase){

		$stmt = $this->connection->prepare("
			UPDATE games
			SET	phase = :phase
			WHERE id = :id
		");

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
