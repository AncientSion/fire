<?php

include_once 'global.php';

if (isset($_SESSION["userid"])){
	$manager = new Manager($_SESSION["userid"]);
	Debug::open();
	$username = $manager->getUsername();
	$dbManager = DBManager::app();

	if (isset($_POST["gameName"]) && isset($_POST["pointValue"]) && isset($_POST["reinforceValue"]) && isset($_POST["reinforceTurn"])){
		var_export($_POST);
		if ( $_POST["gameName"] != "" && $_POST["pointValue"] != "" && $_POST["reinforceValue"] != "" && $_POST["reinforceTurn"] != ""){
			if (ctype_digit($_POST["pointValue"]) && ctype_digit($_POST["reinforceValue"]) && ctype_digit($_POST["reinforceTurn"])){
				$id = $dbManager->createNewGameAndJoin($_SESSION["userid"], $_POST);
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

	$myGames = $dbManager->getGames($_SESSION["userid"]);
	$update = 0;
	for ($i = 0; $i < sizeof($myGames); $i++){
		if ($manager->canAdvance($myGames[$i])){
			$manager->prepareAdvance($myGames[$i]["id"]);
			if ($manager->doAdvance()){
				$update = 1;
			}
		}
	}

	if ($update){
		$myGames = $dbManager->getGames($_SESSION["userid"]);
	}

	$check = array();

	$myGamesElement = "<table id='activeGames'>";

	if ($myGames) {	
		$myGamesElement .= "<tr>";
		$myGamesElement .= "<th colSpan = 4>My Ongoing Games</th>";
		$myGamesElement .= "</tr>";

		$myGamesElement .= "<tr>";
		$myGamesElement .= "<th style='width: 35%'>Game Name</th>";
		$myGamesElement .= "<th style='width: 10%'>Turn</th>";
		$myGamesElement .= "<th style='width: 30%'>Phase</th>";
		$myGamesElement .= "<th style='width: 20%'>Status</th>";
		$myGamesElement .= "</tr>";
		
		foreach ($myGames as $game){
			if ($game["turn"] == -1){continue;}
			$phase = getPhaseString($game["phase"]);
			
			$myGamesElement .= "<tr id=".$game['id'].">";
			$myGamesElement .= "<td>";
			$myGamesElement .= "<a href=game.php?gameid=".$game['id'].">";
			$myGamesElement .= "<font color='darkcyan'>".$game["name"]."</font>";
			$myGamesElement .= "</a>";
			$myGamesElement .= "</td>";
			
			$myGamesElement .= "<td>".$game["turn"]."</td>";
			$myGamesElement .= "<td>".$phase."</td>";

			$status = $game["playerstatus"];
			$td;
			if ($game["status"] == "closed"){
				$td = "<td class='closed'>Completed</td>";
			}
			else if ($status == "waiting"){
				$td = "<td class='waiting'>Awaiting Orders</td>";
			}
			else {
				$td = "<td class='ready'>Waiting for Opponent</td>";
				$check[] = array($game["id"], $game["turn"], $game["phase"]);
			}
			$myGamesElement .= $td;
			$myGamesElement .= "</tr>";
		}
		
		$myGamesElement .= "</table>";
	}
	else {
		$myGamesElement .= "<tr><th>no Active Games found</tr></th></table>";
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
		$openGamesElement .= "<th style='font-size: 22px' colSpan = 5>Open Games</th>";
		$openGamesElement .= "</tr>";

		$openGamesElement .= "<tr>";
		$openGamesElement .= "<td style='font-size: 18px' >Game Name</td>";
		$openGamesElement .= "<td style='font-size: 18px' >PV</td>";
		$openGamesElement .= "<td style='font-size: 18px' >RV / Turn</td>";
		$openGamesElement .= "<td style='font-size: 18px' >Players</td>";
		//$openGamesElement .= "<td style='font-size: 18px' >Turn / Phase</td>";
		$openGamesElement .= "<td>My Status</td>";
		$openGamesElement .= "</tr>";

		
		foreach ($openGames as $game){
			$players = $dbManager->getPlayersInGame($game["id"]);
		//$players = 0;
		//$players = $dbManager->getAmountOfPlayersInGame($game["id"]);

			//var_export($game);

			$openGamesElement .= "<tr id=".$game['id'].">";
			$openGamesElement .= "<td width='40%'>";
			$openGamesElement .= "<a href=gameSetup.php?gameid=".$game['id'].">";
			$openGamesElement .= "<font color='darkcyan'>".$game["name"]."</font>";
			$openGamesElement .= "</a>";
			$openGamesElement .= "</td>";
			$openGamesElement .= "<td>".$game["pv"]."</td>";
			$openGamesElement .= "<td>".$game["reinforce"]." @ ".$game["reinforceTurn"]."</td>";
			$openGamesElement .= "<td>".sizeof($players)."</td>";
			//$openGamesElement .= "<td>".$game["turn"]." / ".$game["phase"]."</td>";

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
/*

	var active = true;
	if (this.destroyed || this.disabled){
		active = false;
	}


	if (!active){
		fighterDiv($("<image>")
			.attr("src", "varIcons/destroyed.png")
			.addClass("overlay")
			.hover(function(e){
				e.stopPropagation();
				var shipId = $(this).parent().parent().parent().data("shipId");
				var fighterId = $(this).parent().data("subId");
				game.getUnit(shipId).getSystem(fighterId).hover(e);
			})
			.click(function(e){
				e.stopPropagation();
				var shipId = $(this).parent().parent().parent().data("shipId");
				var fighterId = $(this).parent().data("subId");
				console.log(game.getUnit(shipId).getSystem(fighterId));
			}))
	}
	else {
		$(img)
		.hover(function(e){
			e.stopPropagation();
			var shipId = $(this).parent().parent().parent().data("shipId");
			var fighterId = $(this).parent().data("subId");
			game.getUnit(shipId).getSystem(fighterId).hover(e);
		})
		.click(function(e){
			e.stopPropagation();
			var shipId = $(this).parent().parent().parent().data("shipId");
			var fighterId = $(this).parent().data("subId");
			console.log(game.getUnit(shipId).getSystem(fighterId));
		});
	}



*/



	Debug::close();



?>
<script>
window.userid = <?php echo json_encode($_SESSION["userid"], JSON_NUMERIC_CHECK); ?>;
window.username = <?php echo json_encode($username); ?>;
window.check = <?php echo json_encode($check, JSON_NUMERIC_CHECK); ?>;
</script>



<!DOCTYPE html>
<html>
<head>
	<link rel='stylesheet' href='style.css'/>
	<script src="jquery-2.1.1.min.js"></script>
	<script src='ajax.js'></script>
	<script src='shared.js'></script>
</head>
	<body>
		<div id="instructWrapper">
			<div id="instructText">
			</div>
		</div>
		<div class="lobbyDiv">
			<?php
				if (isset($_SESSION["userid"])){
					echo "<soan style='color: lightGreen; font-size: 16px'>Welcome, ".$username." (ID: ".$_SESSION['userid'].")</span>";
				} else echo "error, no userid,";
			?>
		</div>
			<div class="lobbyDiv">
				<?php echo $myGamesElement; ?>
			</div>
			<div id="openGames" class="lobbyDiv">
				<?php echo $openGamesElement; ?>
			</div>
			<div class="lobbyDiv">
				<div class="link">
					Create a new Game
				</div>

				<div id="createGame" class="disabled">
					<form method="post">
						<table class="createGame">
							<tr>
								<td width=60%>
									Game Name
								</td>
								<td>
									<input type="form" style="text-align: center" value='myGame' placeholder="Game Name" name="gameName"></input>		
								</td>
							</tr>
							<tr>
								<td>
									Point Value
								</td>
								<td>
									<input type="form" style="text-align: center" value=3000 placeholder="3000" name="pointValue"></input>		
								</td>
							</tr>
							<tr>
								<td>
									Reinforcements Value
								</td>
								<td>
									<input type="form" style="text-align: center" value=1500 placeholder="1500" name="reinforceValue"></input>		
								</td>
							</tr>
							<tr>
								<td>
									Reinforcements Turn
								</td>
								<td>
									<input type="form" style="text-align: center" value=11 placeholder="11" name="reinforceTurn"></input>		
								</td>
							</tr>
								<td colSpan=2>
									<input type="submit" style="width: 60%" value="Confirm and Forward"></input>	
								</td>
							</tr>
						</table>
					</form>
				</div>
			</div>
			<div class="lobbyDiv">
				<div class="link">
					Logout
				</div>
			</div>
			<div class="chatWrapper">
				<div class="chatBox">
					<?php
						DBManager::app()->purgeChat();
						
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
		</div>
	</body>
</html>


<script>
	$(document).ready(function(){
		var buttons = $(".link");

		$(buttons[0]).click(function(){
			$("#createGame").toggleClass("disabled");
		})
		$(buttons[1]).click(function(){
			window.location = "logout.php"
		})
		$("#createGame").click(function(e){
			e.stopPropagation();
		})

		$(".chatWrapper").css("position", "relative").css("display", "inline-block").css("width", 700).css("margin-left", 100).css("margin-top", 20).find(".chatBox").scrollTop(function(){return this.scrollHeight}).end();
		
		var checkChat = setInterval(
			function(){
				ajax.checkChat();
				ajax.checkGameState();
			},
		7000);

		$("#instructWrapper")
			.css("left", 225)
			.css("top", 500)
			.contextmenu(function(e){
				e.preventDefault();
				e.stopPropagation();
				$(this).hide();
			})

		$(this).keypress(function(e){
			if (e.keyCode == 13){ // enter
				if ($(":focus").attr("id") == ("msg")){
					ajax.doChat();
				}
			}
		});
	
	})
</script>