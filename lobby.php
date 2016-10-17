<?php

error_reporting(E_ALL); ini_set('display_errors', '1');
require_once("dbManager.php");
require_once("gameManager.php");
require_once("debug.php");

session_start();


if (isset($_SESSION["userid"])){
	$dbManager = DBManager::app();
	$manager = new Manager($_SESSION["userid"]);
	$playerName = $manager->getUsername();
	$_SESSION["username"] = $playerName;
	
	$adminElement = false;

	//function __construct($id, $userid, $shipClass, $x, $y, $facing){
	//$ship = new Omega(1, 1, 5, 5, 100);
	//echo "<script> var omega = ".json_encode($ship, JSON_NUMERIC_CHECK).";</script>";

//	json_encode($ship, JSON_NUMERIC_CHECK);
	
	$ongoingGames = $manager->getOngoingGames();
	$openGames = $manager->getOpenGames();
	//	$waitingForOpponentGames = $manager->getWaitingForOpponentGames();
	
	
	if ($playerName){
		$welcome = "<font color='red'>Welcome, ".$playerName.", your player ID: ".$_SESSION['userid']."</font>";
	}
	
	$ongoingGamesElement = "<table style='border: 1px solid black; margin: auto; border-radius: 5px'>";
	if ($ongoingGames) {	
		$ongoingGamesElement .= "<tr>";
		$ongoingGamesElement .= "<th colSpan = 3>My Ongoing Games</th>";
		$ongoingGamesElement .= "</tr>";

		$ongoingGamesElement .= "<tr>";
		$ongoingGamesElement .= "<th style='width: 706'>Game Name</th>";
		$ongoingGamesElement .= "<th style='width: 10%'>Phase</th>";
		$ongoingGamesElement .= "<th style='width: 15%'>Status</th>";
		$ongoingGamesElement .= "</tr>";
		
		foreach ($ongoingGames as $game){

			$gameStatus = $manager->getGameStatus($game["id"], $game["turn"]);
			
			$ongoingGamesElement .= "<tr>";
			$ongoingGamesElement .= "<td>";
			$ongoingGamesElement .= "<a href=game.php?gameid=".$game['id'].">";
			$ongoingGamesElement .= "<font color='darkcyan'>".$game["name"]."</font>";
			$ongoingGamesElement .= "</a>";
			$ongoingGamesElement .= "</td>";
			
			$ongoingGamesElement .= "<td>".$game["phase"]."</td>";
			$ongoingGamesElement .= "<td>".$gameStatus["status"]."</td>";
			$ongoingGamesElement .= "</tr>";
		}
		
		$ongoingGamesElement .= "</table>";
	}
	else {
		$ongoingGamesElement .= "<tr><td>no Active Games found</tr></td></table>";
	}

	$openGamesElement = "<table style='border: 1px solid black; margin: auto; border-radius: 5px'>";
	if ($openGames) {
		$openGamesElement .= "<tr>";
		$openGamesElement .= "<th colSpan = 2>Open Games</th>";
		$openGamesElement .= "</tr>";

		
		foreach ($openGames as $game){
		$players = 0;
		$players = $dbManager->getAmountOfPlayersInGame($game["id"]);
	//	$players = "null";
	//	var_export($players);
	//	echo "</br>";

			$openGamesElement .= "<tr>";
			$openGamesElement .= "<td width='80%'>";
			$openGamesElement .= "<a href=gameSetup.php?gameid=".$game['id'].">";
			$openGamesElement .= "<font color='darkcyan'>".$game["name"]."</font>";
			$openGamesElement .= "</a>";
			$openGamesElement .= "</td>";
			$openGamesElement .= "<td>";
			$openGamesElement .= "Players in game: ".$players["COUNT(*)"];
			$openGamesElement .= "</td>";
		}
		
		$openGamesElement .= "</table>";
	}
	else {
		$openGamesElement .= "<tr><td>no Open Games found</tr></td></table>";
	}
	
	/*
	if ($waitingForOpponentGames) {
		$waitingGamesElement = "<table>";
		
		foreach ($waitingForOpponentGames as $game){		
			$waitingGamesElement .= "<tr style='text-align: center'>";
			$waitingGamesElement .= "<td>";
			$waitingGamesElement .= "<a href=game.php?gameid=".$game['id'].">";
			$waitingGamesElement .= $game["name"];
			$waitingGamesElement .= "</a>";
			$waitingGamesElement .= "</td>";
			$waitingGamesElement .= "</tr>";
		}
		
		$waitingGamesElement .= "</table>";
	}
	else {
		$waitingGamesElement = "<table>no games found</table>";
	}
	*/


	if (isset($_SESSION["access"]) && $_SESSION["access"] == 1){

		$gameData = $dbManager->getAllUnfinishedGames();

	//	var_export($gameData);

		if ($gameData){
			$adminElement = "<table style='border: none; margin: auto;'>";
			$adminElement .= "<tr style='background-color:red'><th colSpan='3'>Admin Access Granted";
			$adminElement .= "</th></tr>";
		}

		foreach ($gameData as $game){

			$canProcess = true;

			$adminElement .= "<tr>";
			$adminElement .= "<th width='50%'>".$game["name"]." @ Turn: ".$game["turn"]."</th>";
			$adminElement .= "<th>Playername</th>";
			$adminElement .= "<th>Status</th>";
			$adminElement .= "</tr>";
			

			foreach ($game["playerdata"] as $playerdata){

				if ($playerdata["status"] != "ready"){
					$canProcess = false;
				}

				$adminElement .= "<tr>";
				$adminElement .= "<td></td>";
				$adminElement .= "<td>".$playerdata["username"]."</td>";
				$adminElement .= "<td>".$playerdata["status"]."</td>";
				$adminElement .= "</tr>";
			}

			if ($canProcess){
				$adminElement .= "<tr><td style='border: 2px solid white' colSpan = 3>";
				$adminElement .= "<input type='button' id='".$game["id"].".".$game["turn"]."'value='PROCESS TURN' onclick='initTurnProcession(this.id)'></input>";
				$adminElement .= "</td></tr>";
			}
			else {
				$adminElement .= "<tr><td style='border: 2px solid white' colSpan = 3>UNABLE TO PROCESS YET</td></tr>";
			}
		}
		
		$adminElement .= "</table>";
	}
}
else {
		Debug::log("no user id");
}

?>

<!DOCTYPE html>
<html>
<head>
	<link rel='stylesheet' href='style.css'/>
	<script src="jquery-2.1.1.min.js"></script>
	<script src='ajax.js'></script>
</head>
	<body>
		<div style="margin: auto; width: 500px">
			<div class="lobbyDiv">
				<span>
					<?php echo $welcome; ?>
				</span>
			</div>
			<div class="lobbyDiv">
				<?php echo $ongoingGamesElement; ?>
			</div>
			<div class="lobbyDiv">
				<?php echo $openGamesElement; ?>
			</div>
			<div class="lobbyDiv">
				<a href="createGame.php">Create Game</a>
			</div>
			<div class="lobbyDiv">
				<?php
					if ($adminElement){
						echo $adminElement;
					}
				?>
			</div>
			<div class="lobbyDiv">
				<a href="logout.php">LOGOUT</a>
			</div>
		</div>
	</body>
</html>

<script>

	
function createGame(){
	var name = document.getElementById("gameName").value;
	if (name != "" && name != "undefined" && name != null){
		ajax.createGame(name, refresh);
	}
	else {
		alert("please enter a game name");
	}
}

function initTurnProcession(data){
	var data = data.split(".");
	console.log(data);
	location.href = "gameProcess.php?gameid=" + data[0] + "&turn=" + data[1];
}

</script>
