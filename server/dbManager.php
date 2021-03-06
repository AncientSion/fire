<?php

	class DBManager {

		private $connection = null;
		static protected $instance = null;

		function __construct(){
			if ($this->connection === null){
				$access = Debug::access();
				$this->connection = new PDO("mysql:host=localhost;dbname=spacecombat", $access[0],$access[1]);
				$this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				$this->connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
			}
		}
		
		static public function app(){
	        if(self::$instance === null OR !is_a(self::$instance, "DBManager")) {
	            self::$instance = new DBManager();
	        }
	        return self::$instance;
		}

	    public function dump(){
	    	Debug::log("dumping DB");
	    	$os = PHP_OS;
			$access = Debug::access();

			if ($os != "WINNT"){
				exec('mysqldump -u '.$access[0].' -p'.$access[1].' spacecombat > '.$_SERVER["DOCUMENT_ROOT"].'/fire/dump.sql');
			}
			else {
				exec('C:/xampp/mysql/bin/mysqldump -u '.$access[0].' -p'.$access[1].' spacecombat > '.$_SERVER["DOCUMENT_ROOT"].'/fire/dump.sql');
			}
	    }

	    public function anew(){
	    	$os = PHP_OS;
			$access = Debug::access();
			
			$dump = file("dump.sql");

			if (!$dump){return;}

			$sql = "";	
			$tables = array();

			foreach ($this->query("show tables") as $result){
				$tables[] = $result["Tables_in_spacecombat"];
			}

			for ($i = 0; $i < sizeof($tables); $i++){
				$sql = "drop table ".$tables[$i];

				$stmt = $this->connection->prepare($sql);
				$stmt->execute();
				if ($stmt->errorCode() == 0){
					$sql = "";
					//echo "<div>dropping: ".$tables[$i]."</div>";
				} else continue;
			}


			if ($os != "WINNT"){
				exec('mysql -u '.$access[0].' -p'.$access[1].' spacecombat < '.$_SERVER["DOCUMENT_ROOT"].'/fire/dump.sql');
			}
			else {
				exec('C:/xampp/mysql/bin/mysql -u '.$access[0].' -p'.$access[1].' spacecombat < '.$_SERVER["DOCUMENT_ROOT"].'/fire/dump.sql');
			}
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
			$stmt = $this->connection->prepare($sql);
			$stmt->execute();

			return $stmt->rowCount();
		}

		public function insertChatMsg($post){
			//$time = time();
			$msg = str_replace("'", " ", $post["msg"]);

			$sql = "INSERT INTO chat VALUES (0, '".$post["username"]."', ".$post["userid"].", '".$msg."', ".$post["time"].")"; 

			$this->connection->query($sql);
		}

		public function purgeChat(){
			$time = time();
			$trigger = $time - (24 * 60 * 60);

			$stmt = $this->connection->prepare("
				DELETE FROM chat WHERE time < :tresh"
			);

			$stmt->bindParam(":tresh", $trigger);
			$stmt->execute();
		}

		public function getFullChat(){
			$time = time();

			$stmt = $this->connection->prepare("
				SELECT * FROM chat
			");

			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

			return $result;
		}

		public function getNewChat($time){
			$stmt = $this->connection->prepare("
				SELECT * FROM chat WHERE time > :time
			");

			$stmt->bindParam(":time", $time);
			$stmt->execute();

			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			return $result;
		}

		public function delete($sql){
			
			$stmt = $this->connection->prepare($sql);
			$stmt->execute();
			if ($stmt->errorCode() == 0){
				return true;
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
			//Debug::log("validating login");
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

		public function handleConcession($user, $gameid, $turn, $phase){
			Debug::log("handleConcession");
			$stmt = $this->connection->prepare("
				UPDATE games set status = :status WHERE id = :id
			");

			$status = "closed";
			$stmt->bindParam(":status", $status);
			$stmt->bindParam(":id", $gameid);
			$stmt->execute();

			if ($stmt->errorCode() == 0){
				Debug::log("sucess");
				$stmt = $this->connection->prepare("
					UPDATE playerstatus set status = :status WHERE gameid = :gameid
				");

				$stmt->bindParam(":status", $status);
				$stmt->bindParam(":gameid", $gameid);
				$stmt->execute();
			}
		}

		public function getDamageStatistics($gameid, $user){
			//Debug::log("getDamageStatistics, game: ".$gameid.", user: ".$user);
			$stmt = $this->connection->prepare("
				SELECT
					units.name, units.callsign, units.id, units.userid, units.destroyed, units.moraleCost,
					COALESCE(SUM(damages.armourDmg), 0) as armourDmg,
					COALESCE(SUM(damages.systemDmg), 0) as systemDmg,
					COALESCE(SUM(damages.hullDmg), 0) as hullDmg
				FROM units
				LEFT JOIN fireorders ON
					fireorders.shooterid = units.id
				LEFT JOIN damages ON
					damages.fireid = fireorders.id
				WHERE units.gameid = :gameid
				GROUP BY units.id
			");

			$stmt->bindParam(":gameid", $gameid);
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);


			$stmt = $this->connection->prepare("
				SELECT subunits.name, subunits.amount
				FROM subunits
				WHERE subunits.unitid = :id
			");

			for ($i = 0; $i < sizeof($result); $i++){
				$result[$i]["subunits"] = array();
				if ($result[$i]["name"] == "Squadron" || $result[$i]["name"] == "Flight"){
					$stmt->bindParam(":id", $result[$i]["id"]);
					$stmt->execute();
					$subunits = $stmt->fetchAll(PDO::FETCH_ASSOC);
					$result[$i]["subunits"] = $subunits;
				}
			}


			if ($stmt->errorCode() == 0){
				//return "ding";
				return $result;
			} else return "ERROR";

			/*foreach ($rows as $row){
				var_export($row);
				echo "</br></br>";
			}*/
		}

		public function createNewGameAndJoin($userid, $post){
			$gameid = $this->createNewGame($post);
			$this->createPlayerStatus($userid, $gameid);
			if ($gameid){return $gameid;}
			return 0;
		}

		public function createPlayerStatus($userid, $gameid){
			//Debug::log("createPlayerStatus");

			$stmt = $this->connection->prepare("
				INSERT INTO playerstatus
					(userid, gameid, turn, phase, faction, morale, value, status)
				VALUES
					(:userid, :gameid, 0, 3, '', 0, (SELECT pv FROM games WHERE id = $gameid), 'joined')
			");

			$stmt->bindParam(":userid", $userid);
			$stmt->bindParam(":gameid", $gameid);

			$stmt->execute();

			if ($stmt->errorCode() == 0){
				//Debug::log("entry CREATE for player ".$userid." in game ".$gameid." phase: ".$phase." and status ".$status);
				return true;
			} else return false;
		}

		public function getPossiblyReinforces($gameid, $userid){
			//Debug::log("getPossiblyReinforces");
			$stmt = $this->connection->prepare("
				SELECT * FROM units 
				WHERE gameid = :gameid
				AND status = :status
			");

			$status = "reinforce";
			$stmt->bindParam(":gameid", $gameid);
			$stmt->bindParam(":status", $status);

			$stmt->execute();

			$units = $stmt->fetchAll(PDO::FETCH_ASSOC);

			if ($units){
				for ($i = 0; $i < sizeof($units); $i++){
					if ($units[$i]["type"] && $units[$i]["type"] < 4){
						$units[$i]["subunits"] = $this->getSubUnits($units[$i]);
					}
				}
			}
			//Debug::log("getting: ".sizeof($units)." units");
			return $units;
		}
		
		public function createNewGame($post){
			$stmt = $this->connection->prepare("
				INSERT INTO games
					(name, status, turn, phase, pv, reinforce, reinforceTurn, reinforceETA, reinforceAmount, focusMod, obstaclesAmount, nebulaAmount, obstaclesSizeMin, obstaclesSizeMax)
				VALUES
					(:name, 'open', 0, 3, :pv, :reinforce, :reinforceTurn, :reinforceETA, :reinforceAmount, 10, :obstaclesAmount, :nebulaAmount, :obstaclesSizeMin, :obstaclesSizeMax)
			");
			
			$stmt->bindParam(":name", $post["gameName"]);
			$stmt->bindParam(":pv", $post["pointValue"]);
			$stmt->bindParam(":reinforce", $post["reinforceValue"]);
			$stmt->bindParam(":reinforceTurn", $post["reinforceTurn"]);
			$stmt->bindParam(":reinforceETA", $post["reinforceETA"]);
			$stmt->bindParam(":reinforceAmount", $post["reinforceAmount"]);
			$stmt->bindParam(":nebulaAmount", $post["nebulaAmount"]);
			$stmt->bindParam(":obstaclesAmount", $post["obstaclesAmount"]);
			$stmt->bindParam(":obstaclesSizeMin", $post["obstaclesSizeMin"]);
			$stmt->bindParam(":obstaclesSizeMax", $post["obstaclesSizeMax"]);
			
			$stmt->execute();
			if ($stmt->errorCode() == 0){
				return $this->getLastInsertId();
			}
			else {
				return false;
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
				$sql = "(SELECT * FROM playerstatus where gameid = ".$gameid.")";
				$result = $this->query($sql);
				//Debug::log(sizeof($result));
				if (!sizeof($result)){
					//Debug::log("deleting game");
					$sql = "DELETE FROM games WHERE id = ".$gameid;
					//Debug::log($sql);
					$this->query($sql);
				}
				return true;
			}
			else {
				return $stmt->errorCode();
			}
		}

		public function processInitialBuy($userid, $gameid, $units, $faction){
			Debug::log("processInitialBuy");
			$this->insertUnits($userid, $gameid, $units);
			//Debug::log("A");
			$this->insertLoads($userid, $gameid, $units);
			//Debug::log("B");
			$this->setInitialFleetData($userid, $gameid, $units, $faction);
			//Debug::log("C");
			$this->setInitialMorale($userid, $gameid, $faction);
			//Debug::log("D");
			$this->setInitialCommandUnit($userid, $gameid, $units);
			//Debug::log("E");
			$this->setPlayerStatus($userid, $gameid, 0, 3, "ready");
			Debug::log("processInitialBuy done");
			return true;
		}


		public function setInitialMorale($userid, $gameid, $faction){
			Debug::log("setInitialMorale");
			$playerstatusid = $this->query("SELECT id FROM playerstatus WHERE gameid = $gameid AND userid = $userid");
			$morale = 100 + (($faction == "Narn Regime") *15);


			$playerstatus = array("globals" => array());

			$playerstatus["globals"][] = array(
											"playerstatusid" => $playerstatusid[0]["id"],
											"unitid" => 0, 
											"turn" => 0, 
											"type" => "Morale", 
											"scope" => 0, 
											"value" => $morale,
											"notes" => "", 
											"text" => ""
										);

			if ($this->insertNewGlobalEntries(array($playerstatus))){
				return true;
			} else return false;
		}


		public function setInitialCommandUnit($userid, $gameid, $units){
			Debug::log("setInitialCommandUnit s:".sizeof($units));	
			$unit;
			$id;

			for ($i = 0; $i < sizeof($units); $i++){
				if ($units[$i]["command"]){
					//Debug::log("ding: ".$units[$i]["name"]);
					$id = $units[$i]["id"];
					$unit = new $units[$i]["name"]();
					//Debug::log("created!");
					break;
				}
			}

			$sql = "UPDATE units SET command = 1 WHERE id = ".$id;
			$rows = $this->update($sql);
		}

		public function updateCommandUnit($data){
			Debug::log("updateCommandUni:".$data["commandChange"]["new"].", ".$data["turn"]);
			//$_POST["userid"], $_POST["gameid"], $_POST["commandChange"]["old"], $_POST["commandChange"]["new"

			$stmt = $this->connection->prepare("
				UPDATE units 
				SET 
					command = :turn
				WHERE
					id = :id
			");

			$stmt->bindValue(":id", $data["commandChange"]["new"]);
			$stmt->bindValue(":turn", ($data["turn"]+1));
			$stmt->execute();
		}

		public function updateFocusValues($data){
			Debug::log("updateFocusValues s: ".sizeof($data));
			Debug::log("curFocus: ".$data[0]["curFocus"]);
			Debug::log("gainFocus: ".$data[0]["gainFocus"]);
			Debug::log("maxFocus: ".$data[0]["maxFocus"]);
			Debug::log("id: ".$data[0]["id"]);
			//var_export($data);

			$stmt = $this->connection->prepare("
				UPDATE playerstatus 
				SET 
					curFocus = :curFocus,
					gainFocus = :gainFocus,
					maxFocus = :maxFocus
				WHERE
					id = :id
			");

			for ($i = 0; $i < sizeof($data); $i++){
				$stmt->bindParam(":curFocus", $data[$i]["curFocus"]);
				$stmt->bindParam(":gainFocus", $data[$i]["gainFocus"]);
				$stmt->bindParam(":maxFocus", $data[$i]["maxFocus"]);
				$stmt->bindParam(":id", $data[$i]["id"]);

				$stmt->execute();
				//Debug::log("executing");

				if ($stmt->errorCode() == 0){
					continue;
				}// else Debug::log("error");
			}
			return true;
		}

		public function insertUnits($userid, $gameid, &$units){
			Debug::log("DB insertUnits: ".sizeof($units));

			$stmt = $this->connection->prepare("
				INSERT INTO units 
					(gameid, userid, type, name, callsign, totalCost, moraleCost, status, available)
				VALUES
					(:gameid, :userid, :type, :name, :callsign, :totalCost, :moraleCost, :status, :available)
			");

			$missions = array();

			for ($i = 0; $i < sizeof($units); $i++){
				//Debug::log("type ".$units[$i]["type"]);
				$type = 0;
				$status = "deployed";

				if ($units[$i]["type"] == "Salvo"){
					$type = 1;
				}
				else if ($units[$i]["type"] == "Flight"){
					$type = 2;
				}
				else if ($units[$i]["type"] == "Squadron"){
					$type = 3;
					$status = "bought";
				}
				else if ($units[$i]["type"] == "Ship"){
					$type = 4;
					$status = "bought";
				}
				else $type = 0;
				
				if (isset($units[$i]["userid"])){
					$userid = $units[$i]["userid"];
				}

				$stmt->bindParam(":gameid", $gameid);
				$stmt->bindParam(":userid", $userid);
				$stmt->bindParam(":type", $type);
				$stmt->bindParam(":name", $units[$i]["name"]);
				$stmt->bindParam(":callsign", $units[$i]["callsign"]);
				$stmt->bindParam(":totalCost", $units[$i]["totalCost"]);
				$stmt->bindParam(":moraleCost", $units[$i]["moraleCost"]);
				$stmt->bindParam(":status", $status);
				$stmt->bindValue(":available", (floor($units[$i]["turn"]) + floor($units[$i]["eta"])));
				$stmt->execute();
				
				if ($stmt->errorCode() == 0){
					$id = $this->getLastInsertId();
					$units[$i]["id"] = $id;
					//Debug::log("i: ".$i.", id: ".$id);

					if ($type && $type < 3){
						$units[$i]["mission"]["unitid"] = $id;

						if ($type == 2){ // new salvo or flight, negative id on client yet
							for ($j = 0; $j < sizeof($units); $j++){
								if (isset($units[$j]["mission"]) && $units[$j]["mission"]["targetid"] == $units[$i]["clientId"]){
									$units[$j]["mission"]["targetid"] = $id;
									break;
								}
							}
						}
						$missions[] = $units[$i]["mission"];
					}
					continue;
				}
				else {
					return false;
				}
			}

			$this->insertSubUnits($units);
			$this->insertMissions($missions);
			$this->insertClientActions($units);
		}

		public function insertMissions($missions){
			//Debug::log("insertMissions s: ".sizeof($missions));
			$stmt = $this->connection->prepare("
				INSERT INTO missions 
					(unitid, type, turn, phase, targetid, x, y, arrived)
				VALUES
					(:unitid, :type, :turn, :phase, :targetid, :x, :y, :arrived)
			");

			for ($i = 0; $i < sizeof($missions); $i++){
				if ($missions[$i]["new"] == 0){continue;}

				$stmt->bindParam(":unitid", $missions[$i]["unitid"]);
				$stmt->bindParam(":type", $missions[$i]["type"]);
				$stmt->bindParam(":turn", $missions[$i]["turn"]);
				$stmt->bindParam(":phase", $missions[$i]["phase"]);
				$stmt->bindParam(":targetid", $missions[$i]["targetid"]);
				$stmt->bindParam(":x", $missions[$i]["x"]);
				$stmt->bindParam(":y", $missions[$i]["y"]);
				$stmt->bindParam(":arrived", $missions[$i]["arrived"]);
				$stmt->execute();
				
				if ($stmt->errorCode() == 0){
					//Debug::log("success insertMissions");
				}// else Debug::log("error insertMissions");
			}
			return true;
		}

		public function updateSystemLoad($data){
			//Debug::log("updateSystemLoad: ".sizeof($data));
			$stmt = $this->connection->prepare("
				UPDATE loads
				SET amount = amount - :amount
				WHERE unitid = :unitid
				AND systemid = :systemid
				AND name = :name
			");

			for ($i = 0; $i < sizeof($data); $i++){

				$stmt->bindParam(":unitid", $data[$i]["loadAdjust"]["unitid"]);
				$stmt->bindParam(":systemid", $data[$i]["loadAdjust"]["systemid"]);

				for ($j = 0; $j < sizeof($data[$i]["loadAdjust"]["loads"]); $j++){
					$stmt->bindValue(":name", $data[$i]["loadAdjust"]["loads"][$j]["name"]);
					$stmt->bindValue(":amount", $data[$i]["loadAdjust"]["loads"][$j]["amount"]);
					$stmt->execute();

					if ($stmt->errorCode() != 0){
						Debug::log("error updateSystemLoad");
					}
				}
			}
			return true;
		}

		public function insertLoads($userid, $gameid, &$units){
			Debug::log("insertLoads: ".sizeof($units));
			$stmt = $this->connection->prepare("
				INSERT INTO loads 
					(unitid, systemid, name, amount)
				VALUES
					(:unitid, :systemid, :name, :amount)
			");

			for ($i = 0; $i < sizeof($units); $i++){
				//Debug::log("units #".$i);
				if (!isset($units[$i]["upgrades"]) || !(sizeof($units[$i]["upgrades"])) ){continue;}

				for ($j = 0; $j < sizeof($units[$i]["upgrades"]); $j++){
					//Debug::log("upgrades #".$j);
					
					for ($k = 0; $k < sizeof($units[$i]["upgrades"][$j]["loads"]); $k++){
						//Debug::log("loads #".$k.": ".$units[$i]["upgrades"][$j]["loads"][$k]["amount"]."x ".$units[$i]["upgrades"][$j]["loads"][$k]["name"]);
						$stmt->bindParam(":unitid", $units[$i]["id"]);
						$stmt->bindParam(":systemid", $units[$i]["upgrades"][$j]["systemid"]);
						$stmt->bindParam(":name", $units[$i]["upgrades"][$j]["loads"][$k]["name"]);
						$stmt->bindParam(":amount", $units[$i]["upgrades"][$j]["loads"][$k]["amount"]);

						$stmt->execute();
						if ($stmt->errorCode() == 0){
							//Debug::log("success!");
							continue;
						}
						else {
							//Debug::log("breaking!");
							return false;
						}
					}
				}
			}

			return true;
		}	

		public function insertReinforcements($gameid, $turn, $data){
			//Debug::log("insertReinforcements: ".sizeof($data));
			$stmt = $this->connection->prepare("
				INSERT INTO units 
					(gameid, userid, type, name, callsign, totalCost, moraleCost, status, available, destroyed, turn, phase, notes)
				VALUES
					(:gameid, :userid, :type, :name, :callsign, :totalCost, :moraleCost, :status, :available, :destroyed, :turn, :phase, :notes)
			");

			$type = 0;
			$status = "reinforce";
			$destroyed = 0;
			$phase = -2;
			$callsign = "";

			for ($i = 0; $i < sizeof($data); $i++){
				if ($data[$i]["name"] == "Squadron"){
					$type = 3;
				} else $type = 4;

				$stmt->bindParam(":gameid", $gameid);
				$stmt->bindParam(":userid", $data[$i]["userid"]);
				$stmt->bindParam(":type", $type);
				$stmt->bindParam(":name", $data[$i]["name"]);
				$stmt->bindParam(":callsign", $callsign);
				$stmt->bindParam(":totalCost", $data[$i]["totalCost"]);
				$stmt->bindParam(":moraleCost", $data[$i]["moraleCost"]);
				$stmt->bindParam(":status", $status);
				$stmt->bindValue(":available", $data[$i]["eta"]);
				$stmt->bindParam(":destroyed", $destroyed);
				$stmt->bindParam(":turn", $turn);
				$stmt->bindParam(":phase", $phase);
				$stmt->bindParam(":notes", $data[$i]["notes"]);
				$stmt->execute();

				if ($stmt->errorCode() == 0){
					$data[$i]["id"] = $this->getLastInsertId();
					continue;
				} else Debug::log("insertReinforcements ERROR");
			}

			$this->insertSubUnits($data);
			$this->insertServerLoads($data);
			return true;
		}

		public function insertSubUnits($units){
			//Debug::log("insertSubUnits");
			$stmt = $this->connection->prepare("
				INSERT INTO subunits 
					(unitid, amount, name)
				VALUES
					(:unitid, :amount, :name)
			");

			for ($i = 0; $i < sizeof($units); $i++){
				for ($j = 0; $j < sizeof($units[$i]["upgrades"]); $j++){
					if (isset($units[$i]["upgrades"][$j]["active"]) && !$units[$i]["upgrades"][$j]["active"]){continue;}
					if (!sizeof($units[$i]["upgrades"])){continue;}

					$stmt->bindParam(":unitid", $units[$i]["id"]);
					
					for ($k = 0; $k < sizeof($units[$i]["upgrades"][$j]["units"]); $k++){
						$stmt->bindValue(":amount", $units[$i]["upgrades"][$j]["units"][$k]["amount"]);
						$stmt->bindValue(":name", $units[$i]["upgrades"][$j]["units"][$k]["name"]);
						$stmt->execute();

						if ($stmt->errorCode() == 0){continue;}
						else Debug::log("error insertSubUnits");
					}
				}
			}
			return true;
		}

		public function insertServerLoads($units){
			//Debug::log("insertLoads: ".sizeof($units));
			$stmt = $this->connection->prepare("
				INSERT INTO loads 
					(unitid, systemid, name, amount)
				VALUES
					(:unitid, :systemid, :name, :amount)
			");

			for ($i = 0; $i < sizeof($units); $i++){
				for ($j = 0; $j < sizeof($units[$i]["upgrades"]); $j++){
					if (isset($units[$i]["upgrades"][$j]["active"]) && !$units[$i]["upgrades"][$j]["active"]){continue;}
					if (!sizeof($units[$i]["upgrades"])){continue;}

					$stmt->bindParam(":unitid", $units[$i]["id"]);

					for ($k = 0; $k < sizeof($units[$i]["upgrades"][$j]["loads"]); $k++){

						$stmt->bindParam(":systemid", $units[$i]["upgrades"][$j]["loads"][$k]["systemid"]);
						$stmt->bindParam(":name", $units[$i]["upgrades"][$j]["loads"][$k]["name"]);
						$stmt->bindParam(":amount", $units[$i]["upgrades"][$j]["loads"][$k]["amount"]);
						$stmt->execute();

						if ($stmt->errorCode() == 0){continue;}
						else Debug::log("error insertServerLoads");
					}
				}
			}

			return true;
		}

		public function insertServerActions($data){
			Debug::log("DB insertServerActions s: ".sizeof($data));
			$stmt = $this->connection->prepare("
				INSERT INTO actions 
					(unitid, turn, type, forced, dist, x, y, h, f, cost, delay, costmod, resolved)
				VALUES
					(:unitid, :turn, :type, :forced, :dist, :x, :y, :h, :f, :cost, :delay, :costmod, :resolved)
			");

			for ($j = 0; $j < sizeof($data); $j++){
				if (!$data[$j]->new){continue;}

				$stmt->bindParam(":unitid", $data[$j]->unitid);
				$stmt->bindParam(":turn", $data[$j]->turn);
				$stmt->bindParam(":type", $data[$j]->type);
				$stmt->bindParam(":forced", $data[$j]->forced);
				$stmt->bindParam(":dist", $data[$j]->dist);
				$stmt->bindParam(":x", $data[$j]->x);
				$stmt->bindParam(":y", $data[$j]->y);
				$stmt->bindParam(":h", $data[$j]->h);
				$stmt->bindParam(":f", $data[$j]->f);
				$stmt->bindParam(":cost", $data[$j]->cost);
				$stmt->bindParam(":delay", $data[$j]->delay);
				$stmt->bindParam(":costmod", $data[$j]->costmod);
				$stmt->bindParam(":resolved", $data[$j]->resolved);
				$stmt->execute();		
				if ($stmt->errorCode() == 0){continue;}
				else {return false;}
			}
			return true;
		}

		public function gameIsReady($gameid){
			$stmt = $this->connection->prepare("
				SELECT * FROM playerstatus WHERE gameid = :gameid
			");
			
			$stmt->bindParam(":gameid", $gameid);
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

			if (sizeof($result) > 1){
				//var_export($result);
				$ready = true;

				foreach ($result as $player){
					if ($player["status"] != "ready"){
						//Debug::log("Game #".$gameid." is not ready !");
						return false;
					}
				}
				//Debug::log("Game #".$gameid." is ready !");
				return true;
			}
			//Debug::log("Game #".$gameid." is not ready !");
			return false;
		}

		public function createStaticObstacles($gameid, $data){

			$time = -microtime(true);

			$obstacles = array();
			$obstacles = array_merge($obstacles, $this->getNewNebulas($data));
			$obstacles = array_merge($obstacles, $this->getNewAsteroidFields($obstacles, $data));

			$this->insertObstacles($gameid, $obstacles);

			$time += microtime(true); 
			Debug::log("TIME: ".round($time, 3)." seconds.");
		}

		public function getNewNebulas($data){
			Debug::log("getNewNebula");

			$amount = $data["nebulaAmount"];
			$min = $data["obstaclesSizeMin"];
			$max = $data["obstaclesSizeMax"];
			$nebulas = array();
			if (!$amount){return $nebulas;}
						
			for ($i = 1; $i <= ($amount); $i++){
				$attempts = 10;

				$x; $y; $size;

				$imageId = mt_rand(0, 6);

				while ($attempts){
					$redo = 0;
					$dist;
					$attempts--;
					
					$x = mt_rand(-500, 500);
					$y = mt_rand(-500, 500);
					$size = mt_rand($min, $max);
					$r = mt_rand(0, 360);

					for ($j = 0; $j < sizeof($nebulas); $j++){
						$dist = Math::getDist4($nebulas[$j][1], $nebulas[$j][2], $x, $y);

						if ($dist - 75 - $size/2 - $nebulas[$j][3]/2 <= 0){
							$redo = 1;
							break;
						}
					}

					if (!$redo){
						break;
					}// else Debug::log("redoing dist is $dist, attempts left: ".$attempts);
				}

				if (!$attempts){continue;}

				$density = mt_rand(17, 25);

				$nebulas[] = array("NebulaCloud", $x, $y, $size, ($density.";".$r.";".$imageId));
			}
			return $nebulas;
		}

		public function testFieldVsAllFields($points, $center, $length, $fields){
			//Debug::log("TESTING FIELD with length ".$length);

			for ($i = 0; $i < sizeof($fields); $i++){
				//$dist = Math::getDist($center, $fields[$i][6]);
				//if ($dist > $length * 2){continue;}
				//if ($dist <= $length){return false;}
				//Debug::log("versus existing field ".$i." with dist ".$dist);

				for ($j = 0; $j < sizeof($points)-1; $j++){
					for ($k = 0; $k < sizeof($fields[$i][5])-1; $k++){
						$distEndToEnd = Math::getDist($points[$j], $fields[$i][5][$k]);
						//Debug::log("dist from points $j to otherPoint $k: ".$distEndToEnd);
						if ($distEndToEnd < $length){return false;}
						if (Math::lineLineIntersect(
							$points[$j], $points[$j+1],
							$fields[$i][5][$k], $fields[$i][5][$k+1]
						))						
						{return false;}
					}
				}
			}
			return true;
		}

		public function testFieldVsAllNebulas($points, $center, $length, $nebulas){
			//Debug::log("testFieldVsAllNebulas, this is FIELD ".$x."/".$y);

	        for ($i = 0; $i < sizeof($nebulas); $i++){

	        	$pos = new Point($nebulas[$i][1], $nebulas[$i][2]);
				$dist = Math::getDist($center, $pos);

				if ($dist < $length/2 + $nebulas[$i][3]/2){return false;}

	        	for ($j = 0; $j < sizeof($points)-1; $j++){
	        		if (sizeof(Math::lineCircleInterSect($points[$j], $points[$j+1], $pos, $nebulas[$i][3]/2))){return false;}
	        	}
        		if (sizeof(Math::lineCircleInterSect($points[3], $points[0], $pos, $nebulas[$i][3]/2))){return false;}
	        }
	        return true;
		}

		public function getRectPoints($x, $y, $w, $h, $r){
			$points = array();

	        $b = Math::getPointInDirection($h, $r, $x, $y);
	        $c = Math::getPointInDirection($w, $r-90, $b->x, $b->y);
	        $d = Math::getPointInDirection($h, $r+180, $c->x, $c->y);

			$points[] = new Point($x, $y);
	        $points[] = $b;
	        $points[] = $c;
	        $points[] = $d;

	        return $points;
		}

		public function getNewAsteroidFields($nebulas, $data){
			Debug::log("getNewAsteroidFields");

			$amount = $data["obstaclesAmount"];
			$min = $data["obstaclesSizeMin"];
			$max = $data["obstaclesSizeMax"];
			$fields = array();

			if (!$amount){return $fields;}

			$densities = array(16, 25, 34);

			for ($i = 1; $i <= $amount; $i++){
				$attempts = 25;

				$x; $y; $rockSize;

				while ($attempts){
					$attempts--;

					$x = mt_rand(-650, 650);
					$y = mt_rand(-500, 500);
					$w = mt_rand(40, 70);
					$h = $w * mt_rand(3, 5);
					$r = mt_rand(0, 360);
					$rockSize = mt_rand(1, 3);

					$selfPoints = $this->getRectPoints($x, $y, $w, $h, $r);
					$selfCenter = new Point(($selfPoints[0]->x + $selfPoints[2]->x) / 2, ($selfPoints[0]->y + $selfPoints[2]->y) / 2);

					if (!$this->testFieldVsAllNebulas($selfPoints, $selfCenter, $h, $nebulas) || !$this->testFieldVsAllFields($selfPoints, $selfCenter, $h, $fields)){
						continue;
					} else break;
				}

				if (!$attempts){continue;}

				$density = $densities[mt_rand(0, sizeof($densities)-1)];
				$minDmg = round(26, 34);

				$fields[] = array("AsteroidField", $x, $y, 0, ($density.";".$r.";".$w.";".$h.";".$rockSize.";".$minDmg), $selfPoints, $selfCenter);
			}
			return $fields;
		}

		public function insertObstacles($gameid, $obstacles){

			Debug::log("insertObstacles ".sizeof($obstacles));
			$stmt = $this->connection->prepare("
				INSERT INTO units
				(gameid, name, status, x, y, turn, phase, notes)
				VALUES
				(:gameid, :name, 'deployed', :x, :y, 1, -1, :notes)
			");

			for ($i = 0; $i < sizeof($obstacles); $i++){

				$notes = $obstacles[$i][3].";".$obstacles[$i][4];
				$stmt->bindParam(":gameid", $gameid);
				$stmt->bindParam(":name", $obstacles[$i][0]);
				$stmt->bindParam(":x", $obstacles[$i][1]);
				$stmt->bindParam(":y", $obstacles[$i][2]);
				$stmt->bindParam(":notes", $notes);

				$stmt->execute();

				if ($stmt->errorCode() == 0){
					continue;
				} else return false;
			}

			return true;

		}

		public function startGame($gameid){
			Debug::log("startGame #".$gameid);

			$data = $this->query("SELECT * FROM games where id = ".$gameid);
			//if (sizeof($data)){$this->createMovingObstacles($gameid, $data[0]);}
			if ($data[0]["status"] == "active"){return;}
			if (sizeof($data)){$this->createStaticObstacles($gameid, $data[0]);}

			$stmt = $this->connection->prepare("
				UPDATE games 
				SET 
					status = 'active'
				WHERE
					id = :gameid				
			");

			$stmt->bindParam(":gameid", $gameid);

			$stmt->execute();

			if ($stmt->errorCode() == 0){
				$this->startGamePlayerStatus($gameid);
				return true;
			}
		}

		public function startGamePlayerStatus($gameid){
			Debug::log("startGamePlayerStatus ".$gameid);

			//$reinforce = $this->query("SELECT value from GAMES where gameid = ".$gameid);
			//Debug::log("reinforce: ".$reinforce);

			$stmt = $this->connection->prepare("
				UPDATE playerstatus 
				SET 
					status = 'ready',
					value = value + (SELECT reinforce FROM games WHERE id = :gameid1)
				WHERE
					gameid = :gameid2
			");

			$stmt->bindParam(":gameid1", $gameid);
			$stmt->bindParam(":gameid2", $gameid);

			$stmt->execute();

			if ($stmt->errorCode() == 0){
				Debug::log("success!");
				return true;
			} else {
				Debug::log("fai!");
				return false;
			}
		}

		public function insertDeployArea($data){
			$stmt = $this->connection->prepare("
				INSERT INTO deploys
				(gameid, userid, turn, phase, x, y, s)
				VALUES
				(:gameid, :userid, :turn, :phase, :x, :y, :s)	
			");

			for ($i = 0; $i < sizeof($data); $i++){
				$stmt->bindParam(":gameid", $data[$i]["gameid"]);
				$stmt->bindParam(":userid", $data[$i]["userid"]);
				$stmt->bindParam(":turn", $data[$i]["turn"]);
				$stmt->bindParam(":phase", $data[$i]["phase"]);
				$stmt->bindParam(":x", $data[$i]["x"]);
				$stmt->bindParam(":y", $data[$i]["y"]);
				$stmt->bindParam(":s", $data[$i]["s"]);

				$stmt->execute();

				if ($stmt->errorCode() == 0){
					//Debug::log("ding");
					continue;
				}
			}
		}

		public function getDeployArea($gameid, $turn){
			//Debug::log("getDeploy: ".$gameid."/".$turn);
			$stmt = $this->connection->prepare("
				SELECT * FROM deploys
				WHERE gameid = :gameid
				AND turn = :turn"
			);

			$stmt->bindParam(":gameid", $gameid);
			$stmt->bindParam(":turn", $turn);

			$stmt->execute();
			return $stmt->fetchAll(PDO::FETCH_ASSOC);
		}

		public function requestShipsDB($userid, $gameid, $turn, $picks){
			//Debug::log("requestShipsDB, s: ".sizeof($picks).", turn: ".$turn);

			$cost = 0;

			$stmt = $this->connection->prepare("
				UPDATE units
				SET status = 'bought',
					available = available + :eta,
					heading = 0,
					facing = 0,
					turn = :turn,
					phase = -1,
					delay = 0,
					notes = ''
				WHERE id = :id
			");

			$notes = "";
			for ($i = 0; $i < sizeof($picks); $i++){
				$cost += $picks[$i]["cost"];
				$stmt->bindParam(":eta", $turn);
				$stmt->bindParam(":turn", $turn);
			//	$stmt->bindParam(":notes", $notes);
				$stmt->bindParam(":id", $picks[$i]["id"]);

				$stmt->execute();
				if ($stmt->errorCode == 0){
					continue;
				}
				else Debug::log("ERROR requestShipsDB");

			}

			$this->addReinforceValue($userid, $gameid, -$cost);
			$this->insertClientActions($picks);
		}


		public function deleteAllReinforcements($gameid){
			Debug::log("DB deleteAllReinforcements");

			$sql = "SELECT id FROM units WHERE gameid = ".$gameid." AND status = 'reinforce'";
			$stmt = $this->connection->prepare($sql);
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

			if (!sizeof($result)){Debug::log("no results!"); return;}

			$stmt = $this->connection->prepare("
				delete units, subunits, loads from units left join subunits on units.id = subunits.unitid left join loads on units.id = loads.unitid where units.id = :id
			");
			for ($i = 0; $i < sizeof($result); $i++){
				$stmt->bindParam(":id", $result[$i]["id"]);
				$stmt->execute();
			}
		}

		public function deployShipsDB($gameid, $ships){
			$this->insertClientActions($ships);
		}

		public function deployFlightsDB($userid, $gameid, &$data){
			Debug::log("deployFlights ".sizeof($data));

			if (sizeof($data)){
				$this->updateSystemLoad($data);
				$this->insertUnits($userid, $gameid, $data);
			}
			return true;
		}

		public function setNewMissions($data){
			Debug::log("setNewMission s: ".sizeof($data));
			$stmt = $this->connection->prepare("
				UPDATE missions
				SET type = :type,
					turn = :turn,
					targetid = :targetid,
					x = :x,
					y = :y,
					arrived = :arrived
				WHERE unitid = :unitid
			");

			for ($i = 0; $i < sizeof($data); $i++){
				$stmt->bindParam(":type", $data[$i]["type"]);
				$stmt->bindParam(":turn", $data[$i]["turn"]);
				$stmt->bindParam(":targetid", $data[$i]["targetid"]);
				$stmt->bindParam(":x", $data[$i]["x"]);
				$stmt->bindParam(":y", $data[$i]["y"]);
				$stmt->bindParam(":arrived", $data[$i]["arrived"]);
				$stmt->bindParam(":unitid", $data[$i]["unitid"]);

				$stmt->execute();
				if ($stmt->errorCode() == 0){
					continue;
				} else Debug::log("ERROR"); return false;
			}
		}

		public function updateMissionState($data){
			Debug::log("updateMissionState: ".sizeof($data));
			$stmt = $this->connection->prepare("
				UPDATE missions
				SET type = :type,
					turn = :turn,
					targetid = :targetid,
					x = :x,
					y = :y,
					arrived = :arrived
				WHERE id = :id
			");

			for ($i = 0; $i < sizeof($data); $i++){
				//Debug::log("mission #".$data[$i]->id.", targetid ".$data[$i]->targetid);
				$stmt->bindParam(":type", $data[$i]->type);
				$stmt->bindParam(":turn", $data[$i]->turn);
				$stmt->bindParam(":targetid", $data[$i]->targetid);
				$stmt->bindParam(":x", $data[$i]->x);
				$stmt->bindParam(":y", $data[$i]->y);
				$stmt->bindParam(":arrived", $data[$i]->arrived);
				$stmt->bindParam(":id", $data[$i]->id);

				$stmt->execute();
				if ($stmt->errorCode() == 0){continue;}
			}
		}

		public function updateUnitState($states, $turn, $phase){
			Debug::log("updateUnitState s:".sizeof($states)." ".$turn."/".$phase);
			$stmt = $this->connection->prepare("
				UPDATE units
				SET destroyed = :destroyed,
					withdraw = :withdraw,
					manual = :manual,
					x = :x,
					y = :y,
					heading = :heading,
					facing = :facing,
					delay = :delay,
					thrust = :thrust,
					rolling = :rolling,
					rolled = :rolled,
					flipped = :flipped,
					turn = :turn,
					phase = :phase,
					status = :status,
					notes = :notes
				WHERE id = :id
			");

			for ($i = 0; $i < sizeof($states); $i++){
				//if ($states[$i]["id"] == 46){foreach ($states[$i] as $key => $value){Debug::log($key." / ".$value);}}

				$stmt->bindParam(":destroyed", $states[$i]["destroyed"]);
				$stmt->bindParam(":withdraw", $states[$i]["withdraw"]);
				$stmt->bindParam(":manual", $states[$i]["manual"]);
				$stmt->bindParam(":x", $states[$i]["x"]);
				$stmt->bindParam(":y", $states[$i]["y"]);
				$stmt->bindParam(":heading", $states[$i]["heading"]);
				$stmt->bindParam(":facing", $states[$i]["facing"]);
				$stmt->bindParam(":delay", $states[$i]["delay"]);
				$stmt->bindParam(":thrust", $states[$i]["thrust"]);
				$stmt->bindParam(":rolling", $states[$i]["rolling"]);
				$stmt->bindParam(":rolled", $states[$i]["rolled"]);
				$stmt->bindParam(":flipped", $states[$i]["flipped"]);
				$stmt->bindParam(":turn", $turn);
				$stmt->bindParam(":phase", $phase);
				$stmt->bindParam(":status", $states[$i]["status"]);
				$stmt->bindParam(":notes", $states[$i]["notes"]);
				$stmt->bindParam(":id",  $states[$i]["id"]);
				$stmt->execute();

				if ($stmt->errorCode() == 0){continue;}
			}	
			return true;
		}

		public function resetFocuState($units){
			Debug::log("resetFocuState s: ".sizeof($units));
			$stmt = $this->connection->prepare("
				UPDATE units
				SET
					focus = :focus
				WHERE id = :id
			");


			$focus = 0;

			for ($i = 0; $i < sizeof($units); $i++){
				//foreach ($states[$i] as $key => $value){Debug::log($key." / ".$value);}

				$stmt->bindParam(":id",  $units[$i]->id);
				$stmt->bindParam(":focus",  $focus);
				$stmt->execute();

				if ($stmt->errorCode() == 0){continue;}
			}
			return true;
		}


		public function updateDestroyedState($units){
			Debug::log("updateDestroyedState");
			$stmt = $this->connection->prepare("
				UPDATE units 
				SET 
					destroyed = 1
				WHERE
					id = :id
			");
			
			for ($i = 0; $i < sizeof($units); $i++){
				if (!$units[$i]->destroyed){continue;}
				$stmt->bindParam(":id", $units[$i]->id);
				$stmt->execute();

				if ($stmt->errorCode() == 0){continue;}
			}

			return;
		}

		public function updateUnitStatusNotes($data){
			Debug::log(" => DB updateUnitStatusNotes s: ".sizeof($data));
			
			$stmt = $this->connection->prepare("
				UPDATE units 
				SET 
					withdraw = :withdraw,
					notes = :notes
				WHERE
					id = :id
			");
			
			for ($i = 0; $i < sizeof($data); $i++){
				$stmt->bindParam(":id", $data[$i]["id"]);
				$stmt->bindParam(":withdraw", $data[$i]["withdraw"]);
				$stmt->bindParam(":notes", $data[$i]["notes"]);
				$stmt->execute();

				if ($stmt->errorCode() == 0){continue;}
			}
			return true;
		}

		public function insertNewGlobalEntries($playerstatus){
			Debug::log(" => DB insertNewGlobalEntries");

			$need = 0;
			for ($i = 0; $i < sizeof($playerstatus); $i++){
				for ($j = 0; $j < sizeof($playerstatus[$i]["globals"]); $j++){
					if ($playerstatus[$i]["globals"][$j]["id"]){continue;}
					$need = 1;
				}
			}

			if (!$need){return;}

			
			$stmt = $this->connection->prepare("
				 INSERT into globals 
				 VALUES (0, :playerstatusid, :unitid, :turn, :type, :scope, :value, :notes, :text)
			");
			
			for ($i = 0; $i < sizeof($playerstatus); $i++){
				for ($j = 0; $j < sizeof($playerstatus[$i]["globals"]); $j++){
					if ($playerstatus[$i]["globals"][$j]["id"]){continue;}

					$stmt->bindParam(":playerstatusid", $playerstatus[$i]["globals"][$j]["playerstatusid"]);
					$stmt->bindParam(":unitid", $playerstatus[$i]["globals"][$j]["unitid"]);
					$stmt->bindParam(":turn", $playerstatus[$i]["globals"][$j]["turn"]);
					$stmt->bindParam(":type", $playerstatus[$i]["globals"][$j]["type"]);
					$stmt->bindParam(":scope", $playerstatus[$i]["globals"][$j]["scope"]);
					$stmt->bindParam(":value", $playerstatus[$i]["globals"][$j]["value"]);
					$stmt->bindParam(":notes", $playerstatus[$i]["globals"][$j]["notes"]);
					$stmt->bindParam(":text", $playerstatus[$i]["globals"][$j]["text"]);
					//Debug::log("writing new entry");
					$stmt->execute();

					if ($stmt->errorCode() == 0){continue;}
				}
			}
		}

		public function updateFocusState($data){
			//Debug::log("updateFocusState s: ".sizeof($data));
			$stmt = $this->connection->prepare("
				UPDATE units 
				SET 
					focus = 1
				WHERE
					id = :id
			");
			
			for ($i = 0; $i < sizeof($data); $i++){
				$stmt->bindParam(":id", $data[$i]);
				$stmt->execute();

				if ($stmt->errorCode() == 0){continue;}
			}
		}

		public function deletePlannedMoves($units, $turn){
			$stmt = $this->connection->prepare("
				DELETE from actions
				WHERE unitid = :unitid
				AND turn = :turn
				AND resolved = 0
			");

			for ($i = 0; $i < sizeof($units); $i++){
				//Debug::log("deleting: ".$units[$i]["id"]);
				$stmt->bindParam(":unitid", $units[$i]["id"]);
				$stmt->bindParam(":turn", $turn);

				$stmt->execute();
				if ($stmt->errorCode() == 0){continue;}
			}
		}

		public function insertClientActions($units){
			Debug::log("insertClientActions s: ".sizeof($units));
			$stmt = $this->connection->prepare("
				INSERT INTO actions 
					(unitid, turn, type, dist, x, y, h, f, cost, delay, costmod, resolved)
				VALUES
					(:unitid, :turn, :type, :dist, :x, :y, :h, :f, :cost, :delay, :costmod, 0)
			");

			for ($i = 0; $i < sizeof($units); $i++){
				$stmt->bindParam(":unitid", $units[$i]["id"]);

				for ($j = 0; $j < sizeof($units[$i]["actions"]); $j++){
					if ($units[$i]["actions"][$j]["resolved"]){continue;}

					//foreach ($units[$i]["actions"][$j] as $key => $value){Debug::log($key.".".$value;}
					$stmt->bindParam(":turn", $units[$i]["actions"][$j]["turn"]);
					$stmt->bindParam(":type", $units[$i]["actions"][$j]["type"]);
					$stmt->bindParam(":dist", $units[$i]["actions"][$j]["dist"]);
					$stmt->bindParam(":x", $units[$i]["actions"][$j]["x"]);
					$stmt->bindParam(":y", $units[$i]["actions"][$j]["y"]);
					$stmt->bindParam(":h", $units[$i]["actions"][$j]["h"]);
					$stmt->bindParam(":f", $units[$i]["actions"][$j]["f"]);
					$stmt->bindParam(":cost", $units[$i]["actions"][$j]["cost"]);
					$stmt->bindParam(":delay", $units[$i]["actions"][$j]["delay"]);
					$stmt->bindParam(":costmod", $units[$i]["actions"][$j]["costmod"]);
					$stmt->execute();

					if ($stmt->errorCode() == 0){
						continue;
					} 
					else {
						return false;
					}
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

		public function handleClientFires($gameid, $turn, $data){
			//Debug::log("handleClientFires: ".sizeof($data));	var_export($data); return;

			$fires = array();

			for ($i = 0; $i < sizeof($data); $i++){
				$fires[] = Manager::convertToFireOrder($data[$i]);
			}

			if ($this->insertFireOrders($fires)){return true;}
			return false;
		}

		public function insertFireOrders($fires){
			Debug::log("insertFireOrders: ".sizeof($fires));
			$stmt = $this->connection->prepare("
				INSERT INTO fireorders 
					(gameid, turn, shooterid, targetid, x, y, weaponid)
				VALUES
					(:gameid, :turn, :shooterid, :targetid, :x, :y, :weaponid)
			");

			for ($i = 0; $i < sizeof($fires); $i++){
				$stmt->bindParam(":gameid", $fires[$i]->gameid);
				$stmt->bindParam(":turn", $fires[$i]->turn);
				$stmt->bindParam(":shooterid", $fires[$i]->shooterid);
				$stmt->bindParam(":targetid", $fires[$i]->targetid);
				$stmt->bindParam(":x", $fires[$i]->x);
				$stmt->bindParam(":y", $fires[$i]->y);
				$stmt->bindParam(":weaponid",$fires[$i]->weaponid);

				$stmt->execute();

				if ($stmt->errorCode() == 0){
					$fires[$i]->id = $this->getLastInsertId();
					continue;
				} else return false;
			}
			return true;
		}

		public function insertEW($data){
			//Debug::log("insertSensorSettings".sizeof($data));
			$stmt = $this->connection->prepare("
				INSERT INTO sensors 
					(unitid, systemid, turn, angle, dist, type)
				VALUES
					(:unitid, :systemid, :turn, :angle, :dist, :type)
			");

			for ($i = 0; $i < sizeof($data); $i++){
				//Debug::log("loop".$i);
				$stmt->bindParam(":unitid", $data[$i]["unitid"]);
				$stmt->bindParam(":systemid", $data[$i]["systemid"]);
				$stmt->bindParam(":turn", $data[$i]["turn"]);
				$stmt->bindParam(":angle", $data[$i]["angle"]);
				$stmt->bindParam(":dist", $data[$i]["dist"]);
				$stmt->bindParam(":type", $data[$i]["type"]);
				if  (!$stmt->execute()){
					echo ($stmt->errorInfo());
				} else continue;
			}
			return true;
		}

		public function updateFireOrders($fires){
			Debug::log("DB updateFireOrders: ".sizeof($fires));
			if (!sizeof($fires)){return;}
			$stmt = $this->connection->prepare("
				UPDATE fireorders
				SET
					shots = :shots,
					req = :req,
					notes = :notes,
					hits = :hits,
					resolved = :resolved
				WHERE
					id = :id
			");

			for ($i = 0; $i < sizeof($fires); $i++){
				//Debug::log("fire id: ".$fires[$i]->id.", notes: ".$fires[$i]->notes);
				$stmt->bindParam(":shots", $fires[$i]->shots);
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

		public function updateBallisticFireOrder($fires){
			Debug::log("DB updateBallisticFireOrder, s: ".sizeof($fires));
			$stmt = $this->connection->prepare("
				UPDATE fireorders
				SET
					shots = :shots,
					resolved = :resolved
				WHERE
					id = :id
			");

			for ($i = 0; $i < sizeof($fires); $i++){
				$stmt->bindParam(":id", $fires[$i]->id);
				$stmt->bindParam(":shots", $fires[$i]->shots);
				$stmt->bindParam(":resolved", $fires[$i]->resolved);
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
				WHERE unitid = :unitid
			");

			for ($i = 0; $i < sizeof($units); $i++){
				$stmt->bindParam(":unitid", $units[$i]->id);
				$stmt->execute();
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
				if ($result){
					for ($j = 0; $j < (sizeof($result)); $j++){
						$dmg = new Damage(
							$result[$j]["id"],
							$result[$j]["fireid"],
							$result[$j]["gameid"],
							$result[$j]["unitid"],
							$result[$j]["structureid"],
							$result[$j]["systemid"],
							$result[$j]["turn"],
							$result[$j]["type"],
							$result[$j]["totalDmg"],
							$result[$j]["shieldDmg"],
							$result[$j]["armourDmg"],
							$result[$j]["systemDmg"],
							$result[$j]["hullDmg"],
							$result[$j]["emDmg"],
							$result[$j]["negation"],
							$result[$j]["destroyed"],
							$result[$j]["notes"],
							$result[$j]["new"]
						);

						$result[$j] = $dmg;
					}
					$units[$i]->addDamagesFromDB($result);
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
				WHERE unitid = :unitid
			");

			for ($i = 0; $i < sizeof($units); $i++){
				$stmt->bindParam(":unitid", $units[$i]->id);
				$stmt->execute();
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
				if ($result){
					for ($j = 0; $j < (sizeof($result)); $j++){
						//var_export($result[$j]);
						$crit = new Crit(
							$result[$j]["id"],
							$result[$j]["unitid"],
							$result[$j]["systemid"],
							$result[$j]["turn"],
							$result[$j]["type"],
							$result[$j]["duration"],
							$result[$j]["value"],
							0
						);

						$result[$j] = $crit;
					}
					$units[$i]->addCritDB($result);
				}
			}
			return true;
		}	

		public function getFires($units){
			$stmt = $this->connection->prepare("
				SELECT * FROM fireorders
				WHERE shooterid = :shooterid
			");

			for ($i = 0; $i < sizeof($units); $i++){
				$stmt->bindParam(":shooterid", $units[$i]->id);
				$stmt->execute();
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
				if ($result){
					for ($j = 0; $j < (sizeof($result)); $j++){
						$crit = new FireOrder(
							$result[$j]["id"],
							$result[$j]["gameid"],
							$result[$j]["turn"],
							$result[$j]["shooterid"],
							$result[$j]["targetid"],
							$result[$j]["x"],
							$result[$j]["y"],
							$result[$j]["weaponid"],
							$result[$j]["shots"],
							$result[$j]["req"],
							$result[$j]["notes"],
							$result[$j]["hits"],
							$result[$j]["resolved"]
						);

						$result[$j] = $crit;
					}
					$units[$i]->addFireDB($result);
				}
			}
			return true;
		}	

		public function getActions($units, $turn){
			//Debug::log("getActions for turn ".$turn);
			$stmt = $this->connection->prepare("
				SELECT * FROM actions
				WHERE unitid = :unitid
				AND turn >= :turn
			");

			for ($i = 0; $i < sizeof($units); $i++){

				$stmt->bindParam(":unitid", $units[$i]->id);
				$stmt->bindParam(":turn", $turn);
				$stmt->execute();
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

				if ($result){
					//Debug::log("fetching actions for #".$units[$i]->id);
					for ($j = 0; $j < sizeof($result); $j++){
						//Debug::log("result #".$j);
						$units[$i]->actions[] = new Move(
							$result[$j]["id"],
							$result[$j]["unitid"],
							$result[$j]["turn"],
							$result[$j]["type"],
							$result[$j]["forced"],
							$result[$j]["dist"],
							$result[$j]["x"],
							$result[$j]["y"],
							$result[$j]["h"],
							$result[$j]["f"],
							$result[$j]["cost"],
							$result[$j]["delay"],
							$result[$j]["costmod"],
							$result[$j]["resolved"],
							0
						);
					}
				}
			}
			return true;
		}

		public function getEW($units, $turn){
			$stmt = $this->connection->prepare("
				SELECT * FROM sensors
				WHERE unitid = :unitid
				AND turn = :turn
			");

			for ($i = 0; $i < sizeof($units); $i++){
				if (!$units[$i]->ship && !$units[$i]->squad){continue;}
				$stmt->bindParam(":unitid", $units[$i]->id);
				$stmt->bindParam(":turn", $turn);
				$stmt->execute();
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

				if ($result){
					for ($j = 0; $j < sizeof($result); $j++){
						//Debug::log("adding");
						$units[$i]->getSystem($result[$j]["systemid"])->ew[] = new EW(
							$result[$j]["id"],
							$result[$j]["unitid"],
							$result[$j]["systemid"],
							$result[$j]["turn"],
							$result[$j]["angle"],
							$result[$j]["dist"],
							$result[$j]["type"]
						);
					}
					//Debug::log($units[$i]->classname." heading: ".$units[$i]->heading);
				}
			}
			return true;
		}

		public function insertDamageEntries($damages){
			Debug::log(" => DB insertDamageEntries: ".sizeof($damages));

			$stmt = $this->connection->prepare("
				INSERT INTO damages 
					( fireid, unitid, gameid, structureid, systemid, turn, roll, type, totalDmg, shieldDmg, armourDmg, systemDmg, hullDmg, emDmg, negation, destroyed, notes, new)
				VALUES
					( :fireid, :unitid, :gameid, :structureid, :systemid, :turn, :roll, :type, :totalDmg, :shieldDmg, :armourDmg, :systemDmg, :hullDmg, :emDmg, :negation, :destroyed, :notes, :new)
			");

			$new = 0;

			//echo json_encode($damages[0]);
			for ($i = 0; $i < sizeof($damages); $i++){
				$stmt->bindParam(":fireid", $damages[$i]->fireid);
				$stmt->bindParam(":unitid", $damages[$i]->unitid);
				$stmt->bindParam(":gameid", $damages[$i]->gameid);
				$stmt->bindParam(":structureid", $damages[$i]->structureid);
				$stmt->bindParam(":systemid", $damages[$i]->systemid);
				$stmt->bindParam(":turn", $damages[$i]->turn);
				$stmt->bindParam(":roll", $damages[$i]->roll);
				$stmt->bindParam(":type", $damages[$i]->type);
				$stmt->bindParam(":totalDmg", $damages[$i]->totalDmg);
				$stmt->bindParam(":shieldDmg", $damages[$i]->shieldDmg);
				$stmt->bindParam(":armourDmg", $damages[$i]->armourDmg);
				$stmt->bindParam(":systemDmg", $damages[$i]->systemDmg);
				$stmt->bindParam(":hullDmg", $damages[$i]->hullDmg);
				$stmt->bindParam(":emDmg", $damages[$i]->emDmg);
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

		public function insertCritEntries($crits){
			Debug::log(" => DB insertCritEntries: ".sizeof($crits));
			
			$stmt = $this->connection->prepare("
				INSERT INTO systemcrits 
					( unitid, systemid, turn, type, duration, value)
				VALUES
					( :unitid, :systemid, :turn, :type, :duration, :value)
			");

			for ($i = 0; $i < sizeof($crits); $i++){
				if ($crits[$i]->new){
					//var_export($crits[$i]);
					$stmt->bindParam(":unitid", $crits[$i]->unitid);
					$stmt->bindParam(":systemid", $crits[$i]->systemid);
					$stmt->bindParam(":turn", $crits[$i]->turn);
					$stmt->bindParam(":type", $crits[$i]->type);
					$stmt->bindParam(":duration", $crits[$i]->duration);
					$stmt->bindParam(":value", $crits[$i]->value);
					$stmt->execute();

					if ($stmt->errorCode() == 0){
						continue;
					}
					else return false;
				}
			}

			return true;
		}

		public function getDBPlayerStatus($gameid){
			$stmt = $this->connection->prepare("
				SELECT users.username, playerstatus.id, playerstatus.userid, playerstatus.gameid, playerstatus.turn, playerstatus.phase, playerstatus.faction, playerstatus.morale, playerstatus.value, playerstatus.maxFocus, playerstatus.gainFocus, playerstatus.curFocus, playerstatus.status FROM playerstatus
				LEFT JOIN users 
				ON playerstatus.userid = users.id
				WHERE
					gameid = :gameid
			");

			$stmt->bindParam(":gameid", $gameid);
			$stmt->execute();

			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

			if ($result){
				for ($i = 0; $i < sizeof($result); $i++){
					$stmt = $this->connection->prepare("
						SELECT * from globals WHERE playerstatusid = :playerstatusid
					");

					$stmt->bindParam(":playerstatusid", $result[$i]["id"]);
					$stmt->execute();
					$subResult = $stmt->fetchAll(PDO::FETCH_ASSOC);
					//if ($subResult){
						$result[$i]["globals"] = $subResult;
					//}
				}
				return $result;
			}
			else return false;
		}

		public function setInitialFleetData($userid, $gameid, $units, $faction){
			$value = Manager::getPostBuyPV($units);
			$morale = Manager::getMoraleValue($units);

			Debug::log("setInitialFleetData $value / $morale / $faction");
			$stmt = $this->connection->prepare("
				UPDATE playerstatus 
				SET
				value = value - :value,
				morale = :morale,
				faction = :faction
				WHERE
					gameid = :gameid
				AND
					userid = :userid
			");

			$stmt->bindParam(":value", $value);
			$stmt->bindParam(":morale", $morale);
			$stmt->bindParam(":faction", $faction);
			$stmt->bindParam(":gameid", $gameid);
			$stmt->bindParam(":userid", $userid);

			$stmt->execute();

			if ($stmt->errorCode() == 0){
				return true;
			} else return false;
		}

		public function setPlayerStatus($userid, $gameid, $turn, $phase, $status){
			//Debug::log("setPlayerStatus for player ".$userid. " adjusted to turn/phase: ".$turn."/".$phase);

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

			$stmt->bindParam(":turn", $turn);
			$stmt->bindParam(":phase", $phase);
			$stmt->bindParam(":status", $status);
			$stmt->bindParam(":gameid", $gameid);
			$stmt->bindParam(":userid", $userid);

			$stmt->execute();

			if ($stmt->errorCode() == 0){
				//Debug::log("game ".$gameid.", user ".$userid." --- adjusting to turn/phase/status ".$turn."/".$phase."/".$status);
				return true;
			} else return false;
		}

		public function checkPhaseSkip($userid, $gameid, $turn, $phase){
			Debug::log("checkPhaseSkip game ".$gameid.", user confirming: ".$userid);

			$sql = ("SELECT * FROM playerstatus where gameid = ".$gameid." AND userid <> ".$userid);

			//Debug::log($sql);

			$otherPlayers = $this->query($sql);
			//var_export($result);

			$stmt = $this->connection->prepare(
				"SELECT * FROM units WHERE userid = :userid AND gameid = :gameid AND destroyed = 0 AND (focus = 1 OR type = 2)"
			);

			$phaseSkip = 1;

			for ($i = 0; $i < sizeof($otherPlayers); $i++){
				//Debug::log("checking userid ".$otherPlayers[$i]["userid"]);
				$stmt->bindParam(":userid", $otherPlayers[$i]["userid"]);
				$stmt->bindParam(":gameid", $otherPlayers[$i]["gameid"]);
				$stmt->execute();

				if ($stmt->errorCode() == 0){
					$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
					if (!$result || !(sizeof($result))){
						Debug::log("no focus units for user ".$otherPlayers[$i]["userid"]." found!");
					}
					else {
						$phaseSkip = 0;
						Debug::log("focus unit found :(");
					}
				} else Debug::log("error selecting!");
			}


			if ($phaseSkip){
				$stmt = $this->connection->prepare(
					"UPDATE playerstatus SET status = 'ready' where userid <> :userid"
				);

				$stmt->bindParam(":userid", $userid);
				$stmt->execute();
				if ($stmt->errorCode() == 0){
					Debug::log("updated other players to ready!");
				} else Debug::log("error updating!");
			} else Debug::log("cant forward!");

			return;
		}

		public function addReinforceValue($userid, $gameid, $add){
			Debug::log("addReinforceValue for user: ".$userid.": ".$add);
			$stmt = $this->connection->prepare("
				UPDATE playerstatus 
				SET	value = value + :add
				WHERE
					gameid = :gameid
				AND
					userid = :userid
			");

			$stmt->bindParam(":add", $add);
			$stmt->bindParam(":gameid", $gameid);
			$stmt->bindParam(":userid", $userid);

			$stmt->execute();

			if ($stmt->errorCode() == 0){
				return true;
			} else return false;
		}

		public function getAmountOfPlayersInGame($gameid){
			//	SELECT COUNT(*) FROM users
			$stmt = $this->connection->prepare("
				SELECT * FROM users
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
		
		public function getUsername($id){	
			$sql = "(SELECT username FROM users WHERE ID = ".$id.")";
			$result = $this->query($sql);
			if (!$result){return "";}
			return $result[0]["username"];
		}

		public function getCurrentTurn($gameid){

			$sql = "(SELECT turn FROM games WHERE id = ".$gameid.")";
			$result = $this->query($sql);
			return $result[0]["turn"];
		}
		
		public function getMyStatusForGame($gameid, $userid, $turn){
		
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
			//Debug::log("getgamedetails:".$gameid);
			try {
				$stmt = $this->connection->prepare("
					SELECT * FROM games WHERE id = :id
				");

				$stmt->bindParam(":id", $gameid);
				$stmt->execute();				
				$result = $stmt->fetch(PDO::FETCH_ASSOC);
				return $result;
			}
			catch (mysqli_sql_exception $e){ 
				throw $e; 
			} 
		}

		public function getActiveUnits($gameid, $turn){
			$stmt = $this->connection->prepare("
				SELECT * FROM units
				WHERE gameid = :gameid
				AND destroyed = 0
				AND available <= :turn
				AND phase > -2
				ORDER BY userid ASC
			");

			$turn = 30;
			
			$stmt->bindParam(":gameid", $gameid);
			$stmt->bindParam(":turn", $turn);
			$stmt->execute();
					
			$units = $stmt->fetchAll(PDO::FETCH_ASSOC);
			
			if (!$units){return false;}

			
			for ($i = 0; $i < sizeof($units); $i++){
				if ($units[$i]["type"] == 0 || $units[$i]["type"] == 4){continue;}	
				$units[$i]["subunits"] = $this->getSubUnits($units[$i]);
				if ($units[$i]["type"] == 3 ){continue;}
				$units[$i]["mission"] = $this->getMission($units[$i]);
			}
			return $units;
		}

		public function getSubUnits($unit){
			$stmt = $this->connection->prepare("
				SELECT * FROM subunits
				WHERE subunits.unitid = :id
			");
			
			$stmt->bindParam(":id", $unit["id"]);
			$stmt->execute();
					
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

			return $result;
		}

		public function getMission($unit){
			$stmt = $this->connection->prepare("
				SELECT * FROM missions
				WHERE missions.unitid = :id
				ORDER BY TURN ASC
			");
			
			$stmt->bindParam(":id", $unit["id"]);
			$stmt->execute();
					
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			return $result;
		}

		public function getShipLoad($ships){
			$stmt = $this->connection->prepare("
				SELECT *
				FROM loads 
				WHERE unitid = :unitid
			");

			for ($i = 0; $i < sizeof($ships); $i++){
				$stmt->bindParam(":unitid", $ships[$i]->id);
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
			//Debug::log("getAllFireOrders for game: ".$gameid);
			$stmt = $this->connection->prepare("
				SELECT * FROM fireorders
				WHERE gameid = :gameid
			");

			$stmt->bindParam(":gameid", $gameid);
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

			if ($result){
				for ($i = 0; $i < (sizeof($result)); $i++){
					$result[$i] = Manager::convertToFireOrder($result[$i]);
				}
			}
			return $result;
		}

		public function getUnresolvedFireOrders($gameid, $turn){
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
					$result[$i] = Manager::convertToFireOrder($result[$i]);
				}
			}
			return $result;
		}

		public function resolveDeployActions($units){
			Debug::log("resolveDeployActions s: ".sizeof($units));

			$stmt = $this->connection->prepare("
				UPDATE actions
				SET resolved = :resolved
				WHERE unitid = :unitid
			");

			$resolved = 1;

			for ($i = 0; $i < sizeof($units); $i++){
				$stmt->bindParam(":unitid", $units[$i]);
				$stmt->bindParam(":resolved", $resolved);
				$stmt->execute();
			//	Debug::log("aaa");

				if ($stmt->errorCode() == 0){
					continue;
				}
			}
		}

		public function resolveMovementDB($ships){
			Debug::log("resolveMovementDB");

			$stmt = $this->connection->prepare("
				UPDATE actions
				SET resolved = 1
				WHERE 
					unitid = :unitid
				AND
					resolved = 0
			");

			for ($i = 0; $i < sizeof($ships); $i++){
				if (!$ships[$i]->moveSet){continue;}
				//Debug::log("resolving: ".$ships[$i]->id);
				$stmt->bindParam(":unitid", $ships[$i]->id);
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

		public function getGames($userid){
		/*	$stmt = $this->connection->prepare("
				SELECT * FROM games
				JOIN playerstatus 
					ON playerstatus.userid = :id
				AND games.id = playerstatus.userid
			");
		*/

			$stmt = $this->connection->prepare("
				SELECT playerstatus.status as playerstatus, games.id, games.name, games.turn, games.phase, games.status FROM playerstatus
				RIGHT JOIN games
					ON playerstatus.gameid = games.id
				WHERE playerstatus.userid = :userid
			");
			//$status = "active";
			//$stmt->bindParam(":status", $status);
			$stmt->bindParam(":userid", $userid);
			$stmt->execute();
			
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			return $result;
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
			//	Debug::log("Games found: ".sizeof($result));
				return $result;
			}
			else {
			//	Debug::log("no gams found");
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
			Debug::log("updateAllPlayerStatusForGame");

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
			//	Debug::log("done");
				return true;
			}
			else return false;
		}

		public function setGameTurnPhase($gameid, $turn, $phase){
			//Debug::log("setGameTurnPhase: ".$turn."/".$phase);
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
