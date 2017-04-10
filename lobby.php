<?php

include_once 'global.php';

if (isset($_SESSION["userid"])){

	$manager = new Manager($_SESSION["userid"]);
	$dbManager = DBManager::app();
	$playerName = $manager->getUsername();
	$_SESSION["username"] = $playerName;

	if (isset($_POST["gameName"]) && isset($_POST["pointValue"])){
		if ( $_POST["gameName"] != "" && $_POST["pointValue"] != ""){
			if (ctype_digit($_POST["pointValue"])){
				$id = $dbManager->createNewGameAndJoin($_SESSION["userid"], $_POST["gameName"], $_POST["pointValue"]);
				if ($id){
					header("Location: gameSetup.php?gameid=".$id);
				}
			}
			else {
				echo "<span class='hinter'>Invalid point value entered</span>";
			}
		}
		else {
			echo "<span class='hinter'>Please enter valid game data</span>";
		}
	}

	//function __construct($id, $userid, $classname, $x, $y, $facing){
	//$ship = new Omega(1, 1, 5, 5, 100);
	//echo "<script> var omega = ".json_encode($ship, JSON_NUMERIC_CHECK).";</script>";
	//son_encode($ship, JSON_NUMERIC_CHECK);
	
	$ongoingGames = $manager->getOngoingGames();
	for ($i = 0; $i < sizeof($ongoingGames); $i++){
		if ($manager->canAdvance($ongoingGames[$i]["id"])){
			$manager->prepareAdvance($ongoingGames[$i]["id"]);
			$manager->doAdvance();
		}
	}

	$openGames = $manager->getOpenGames();
		
	if ($playerName){
		$welcome = "<font color='red'>Welcome, ".$playerName.", your player ID: ".$_SESSION['userid']."</font>";
	} 
	else {
		$welcome = "<font color='red'> No Playername for your ID: ".$_SESSION['userid']."found !</font>";
	}
	
	$ongoingGamesElement = "<table>";
	if ($ongoingGames) {	
		$ongoingGamesElement .= "<tr>";
		$ongoingGamesElement .= "<th colSpan = 4>My Ongoing Games</th>";
		$ongoingGamesElement .= "</tr>";

		$ongoingGamesElement .= "<tr>";
		$ongoingGamesElement .= "<th style='width: 40%'>Game Name</th>";
		$ongoingGamesElement .= "<th style='width: 10%'>Turn</th>";
		$ongoingGamesElement .= "<th style='width: 30%'>Phase</th>";
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
		$ongoingGamesElement .= "<tr><th>no Active Games found</tr></th></table>";
	}

	$openGamesElement = "<table>";
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
   header("Location: index.php");
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
		<div style>
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
			<div class="link">
				Create a new Game
			</div>
			<div id="createGame" class="disabled">
				<form method="post">
					<table style="width: 100%; margin: auto" >
						<tr>
							<td>
								<input type="form" style="text-align: center" value='myGame' placeholder="Game Name" name="gameName"></input>		
							</td>
						</tr>
						<tr>
							<td>
								<input type="form" style="text-align: center" placeholder="Point Value" name="pointValue"></input>		
							</td>
						</tr>
						<tr>
							<td>
								<input type="submit" style="width: 100%" value="Confirm and Forward"></input>	
							</td>
						</tr>
					</table>
			</div>
			<div class="link">
				Logout
			</div>
		</div>
	</body>
</html>


<script>
	$(document).ready(function(){
		var buttons = $(".link");
		//console.log(buttons);
		$(buttons[0]).click(function(){
			$("#createGame").toggleClass("disabled");
		})
		$(buttons[1]).click(function(){
			window.location = "logout.php"
		})
	})

</script>