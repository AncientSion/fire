<?php

include_once 'global.php';

if (isset($_SESSION["userid"])){
	$manager = new Manager($_SESSION["userid"]);
	$username = $manager->getUsername();
	$dbManager = DBManager::app();

	echo "<script>";
	echo "window.userid = ".$_SESSION["userid"].";";
	echo "window.username = '".$username."';";
	echo "</script>";
	if (isset($_POST["gameName"]) && isset($_POST["pointValue"]) && isset($_POST["reinforceValue"])){
		if ( $_POST["gameName"] != "" && $_POST["pointValue"] != "" && $_POST["reinforceValue"] != ""){
			if (ctype_digit($_POST["pointValue"]) && ctype_digit($_POST["reinforceValue"])){
				$id = $dbManager->createNewGameAndJoin($_SESSION["userid"], $_POST["gameName"], $_POST["pointValue"], $_POST["reinforceValue"]);
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

	$ongoingGames = $dbManager->getMyGames($_SESSION["userid"]);
	for ($i = 0; $i < sizeof($ongoingGames); $i++){
		//Debug::log("checking for canAdvance ".$ongoingGames[$i]["id"]);
		if ($manager->canAdvance($ongoingGames[$i]["id"])){
			//Debug::log("can!, now preparing");
			$manager->prepareAdvance($ongoingGames[$i]["id"]);
			$manager->doAdvance();
			$manager = new Manager($_SESSION["userid"]);
		}
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
					$phase = "Deployment / Initial"; break;
				case 0:
					$phase = "Capital Movement"; break;
				case 1:
					$phase = "Flight Movement"; break;
				case 2:
					$phase = "Firing"; break;
				case 3:
					$phase = "Damage Control"; break;
				default:
					break;
			}
			
			$ongoingGamesElement .= "<tr>";
			$ongoingGamesElement .= "<td>";
			$ongoingGamesElement .= "<a href=game.php?gameid=".$game['id'].">";
			$ongoingGamesElement .= "<font color='darkcyan'>".$game["name"]."</font>";
			$ongoingGamesElement .= "</a>";
			$ongoingGamesElement .= "</td>";
			
			$ongoingGamesElement .= "<td>".$game["turn"]."</td>";
			$ongoingGamesElement .= "<td>".$phase."</td>";

			$status = $game["playerstatus"];
			$td;
			if ($status == "waiting"){
				$td = "<td style='color: white; background-color: #ff3d00'>Awaiting Orders</td>";
			}
			else {
				$td = "<td style='color: white; background-color: green'>Waiting for Opponent</td>";
			}
			$ongoingGamesElement .= $td;
			$ongoingGamesElement .= "</tr>";
		}
		
		$ongoingGamesElement .= "</table>";
	}
	else {
		$ongoingGamesElement .= "<tr><th>no Active Games found</tr></th></table>";
	}

	$openGames = $manager->getOpenGames();

	/*for ($i = 0; $i < sizeof($openGames); $i++){
		if ($openGames[$i]["id"] == 1){
			if ($dbManager->gameIsReady($openGames[$i]["id"])){
				if ($dbManager->startGame($openGames[$i]["id"])){
					echo "SUCCESS";
				}
			}
		}
	}*/
	
	$openGamesElement = "<table>";
	if ($openGames) {
		$openGamesElement .= "<tr>";
		$openGamesElement .= "<th style='font-size: 26px' colSpan = 5>Open Games</th>";
		$openGamesElement .= "</tr>";

		$openGamesElement .= "<tr>";
		$openGamesElement .= "<td style='font-size: 18px' >Game Name</td>";
		$openGamesElement .= "<td style='font-size: 18px' >Point Value</td>";
		$openGamesElement .= "<td style='font-size: 18px' >Reinforce / Turn</td>";
		$openGamesElement .= "<td style='font-size: 18px' >Players</td>";
		$openGamesElement .= "<td>My Status</td>";
		$openGamesElement .= "</tr>";

		
		foreach ($openGames as $game){
			$players = $dbManager->getPlayersInGame($game["id"]);
		//$players = 0;
		//$players = $dbManager->getAmountOfPlayersInGame($game["id"]);

			$openGamesElement .= "<tr>";
			$openGamesElement .= "<td width='40%'>";
			$openGamesElement .= "<a href=gameSetup.php?gameid=".$game['id'].">";
			$openGamesElement .= "<font color='darkcyan'>".$game["name"]."</font>";
			$openGamesElement .= "</a>";
			$openGamesElement .= "</td>";
			$openGamesElement .= "<td>".$game["pv"]."</td>";
			$openGamesElement .= "<td>".$game["reinforce"]."</td>";
			$openGamesElement .= "<td>".sizeof($players)."</td>";

			$in = false;
			for ($i = 0; $i < sizeof($players); $i++){
				//Debug::log("looking for: ".$manager->userid.", now: ".$players[$i]["id"]);
				if ($players[$i]["userid"] == $manager->userid){
					$in = true;
					$status = $players[$i]["status"];
					$style = "";
					if ($status == "ready"){$style = "background-color: green'";
					} else $style = "background-color: yellow; color: black'";

					$openGamesElement .= "<td style='".$style.">".$status."</td>";
				}
			}
			if (!$in){
				$openGamesElement .= "<td></td>";
			}

		}
		
		$openGamesElement .= "</table>";
	}
	else {
		$openGamesElement .= "<tr><th>no Open Games found</tr></th></table>";
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
	<script src='shared.js'></script>
</head>
	<body>
		<div style>
			<div class="lobbyDiv">
				<span>
					<?php
						if (isset($_SESSION["userid"])){
							echo "<font color='red'>Welcome, ".$username.", your player ID: ".$_SESSION['userid']."</font>";
						} else echo "error, no userid,";
					?>
				</span>
			</div>
			<div class="lobbyDiv">
				<?php echo $ongoingGamesElement; ?>
			</div>
			<div class ="chatWrapper" style="position: absolute; left: 100px; top: 395px">
				<div class ="chatBox">
					<?php
						$chat = DBManager::app()->getFullChat();
						$last = 0;
						if (sizeof($chat)){
							for ($i = 0; $i < sizeof($chat); $i++){
								echo "<span>".date("G:i:s", $chat[$i]["time"])." - ".$chat[$i]["username"].": ".$chat[$i]["msg"]."</span></br>";
							}
							$last = $chat[sizeof($chat)-1]["time"];
						}// else $last = 1;

						echo "<script>window.time = ".$last.";</script>";
						//var_export($last);

					?>
				</div>
				<div class ="sendWrapper">
					<input id="msg" placeholder ="chat here" type="text">
				</div>
			</div>
			<div class="lobbyDiv">
				<?php echo $openGamesElement; ?>
			</div>
			<div class="link">
				Create a new Game
				<div id="createGame" class="disabled">
					<form method="post">
						<table style="margin: auto" >
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
									<input type="form" style="text-align: center" placeholder="Reinforce / Turn" name="reinforceValue"></input>		
								</td>
							</tr>
							<tr>
								<td>
									<input type="submit" style="width: 100%" value="Confirm and Forward"></input>	
								</td>
							</tr>
						</table>
				</div>
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
		$("#createGame").click(function(e){
			e.stopPropagation();
		})

		$(".chatWrapper").find(".chatBox").scrollTop(function(){return this.scrollHeight});
		var checkChat = setInterval(
			function(){
				ajax.getChat();
			},
		7000);

		$(this).keypress(function(e){
			if (e.keyCode == 13){ajax.doChat();} // enter
		})

	})
</script>