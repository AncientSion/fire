<?php

include_once 'global.php';

if (isset($_SESSION["userid"])){

	$dbManager = DBManager::app();
	$manager = new Manager($_SESSION["userid"]);
	$playerName = $manager->getUsername();
	$_SESSION["username"] = $playerName;

	//function __construct($id, $userid, $classname, $x, $y, $facing){
	//$ship = new Omega(1, 1, 5, 5, 100);
	//echo "<script> var omega = ".json_encode($ship, JSON_NUMERIC_CHECK).";</script>";

//	json_encode($ship, JSON_NUMERIC_CHECK);
	
	$ongoingGames = $manager->getOngoingGames();
	for ($i = 0; $i < sizeof($ongoingGames); $i++){
		if ($manager->canAdvanceFromLobby($ongoingGames[$i]["id"])){
			$manager->doAdvanceFromLobby($ongoingGames[$i]["id"]);
		}
	}

	$openGames = $manager->getOpenGames();
	
	
	if ($playerName){
		$welcome = "<font color='red'>Welcome, ".$playerName.", your player ID: ".$_SESSION['userid']."</font>";
	}
	
	$ongoingGamesElement = "<table style='border: 1px solid white; margin: auto; border-radius: 5px'>";
	if ($ongoingGames) {	
		$ongoingGamesElement .= "<tr>";
		$ongoingGamesElement .= "<th colSpan = 4>My Ongoing Games</th>";
		$ongoingGamesElement .= "</tr>";

		$ongoingGamesElement .= "<tr>";
		$ongoingGamesElement .= "<th style='width: 50%'>Game Name</th>";
		$ongoingGamesElement .= "<th style='width: 10%'>Turn</th>";
		$ongoingGamesElement .= "<th style='width: 20%'>Phase</th>";
		$ongoingGamesElement .= "<th style='width: 15%'>Status</th>";
		$ongoingGamesElement .= "</tr>";
		
		foreach ($ongoingGames as $game){
			$phase = "";

			switch ($game["phase"]){
				case -1:
					$phase = "Deployment / Initial";
					break;
				case 0:
					$phase = "Capital Movement";
					break;
				case 1:
					$phase = "Flight Movement";
					break;
				case 2:
					$phase = "Firing";
					break;
				case 3:
					$phase = "Damage Control";
					break;
				default:
					break;
			}

			$gameStatus = $manager->getGameStatus($game["id"], $game["turn"]);
			
			$ongoingGamesElement .= "<tr>";
			$ongoingGamesElement .= "<td>";
			$ongoingGamesElement .= "<a href=game.php?gameid=".$game['id'].">";
			$ongoingGamesElement .= "<font color='darkcyan'>".$game["name"]."</font>";
			$ongoingGamesElement .= "</a>";
			$ongoingGamesElement .= "</td>";
			
			$ongoingGamesElement .= "<td>".$game["turn"]."</td>";
			$ongoingGamesElement .= "<td>".$phase."</td>";

			$status = $gameStatus["status"];
			$td;
			if ($status == "waiting"){
				$td = "<td style='color: white; background-color: red'>".$status."</td>";
			}
			else {
				$td = "<td style='color: white; background-color: green'>".$status."</td>";
			}
			$ongoingGamesElement .= $td;
			$ongoingGamesElement .= "</tr>";
		}
		
		$ongoingGamesElement .= "</table>";
	}
	else {
		$ongoingGamesElement .= "<tr><td>no Active Games found</tr></td></table>";
	}

	$openGamesElement = "<table style='border: 1px solid white; margin: auto; border-radius: 5px'>";
	if ($openGames) {
		$openGamesElement .= "<tr>";
		$openGamesElement .= "<th colSpan = 2>Open Games</th>";
		$openGamesElement .= "</tr>";

		
		foreach ($openGames as $game){
		$players = 0;
		$players = $dbManager->getAmountOfPlayersInGame($game["id"]);

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
