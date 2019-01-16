<?php

include_once $_SERVER["DOCUMENT_ROOT"]."/fire/global.php";

//$dbManager = DBManager::app();
//$dbManager->setInitialCommandUnit(1, 1, array(array("id" => 5, "name" => "Hyperion", "command" => 1)));


if (0){
	return;
	echo Manager::alterShipFiles();
	return;
}

//echo DmgCalc::setWeaponPriority(); return;

if (isset($_SESSION["userid"])){

	$dbManager = DBManager::app();

	if (isset($_POST["anew"])){
		echo $dbManager->anew();
		header("Location: lobby.php");
		return;
	}
	else if (isset($_POST["dump"])){
		echo $dbManager->dump();
		header("Location: lobby.php");
		return;
	}
	else if (isset($_POST["startGame"])){
		$gameid = 1;
		DBManager::app()->startGame($gameid);
		header("Location: game.php?gameid=".$gameid);
		return;
	}

	$manager = new Manager(0, $_SESSION["userid"]);
	$username = $manager->getUsername();

	if (isset($_POST["gameName"]) && isset($_POST["pointValue"]) && isset($_POST["reinforceValue"]) && isset($_POST["reinforceTurn"])
	&& isset($_POST["reinforceETA"])){
		if ($_POST["gameName"] == ""){return;}
		if ($_POST["pointValue"] == ""){return;}
		if ($_POST["reinforceValue"] == ""){return;}
		if ($_POST["reinforceTurn"] == ""){return;}
		if ($_POST["reinforceETA"] == ""){return;}
		if ($_POST["reinforceAmount"] == ""){return;}
		if ($_POST["obstaclesAmount"] == ""){return;}
		if ($_POST["nebulaAmount"] == ""){return;}
	//	if ($_POST["obstaclesSizeMin"] == ""){return;}
	//	if ($_POST["obstaclesSizeMax"] == ""){return;}

		if (!ctype_digit($_POST["pointValue"])){return;}
		if (!ctype_digit($_POST["reinforceValue"])){return;}
		if (!ctype_digit($_POST["reinforceTurn"])){return;}
		if (!ctype_digit($_POST["reinforceETA"])){return;}
		if (!ctype_digit($_POST["reinforceAmount"])){return;}
		if (!ctype_digit($_POST["obstaclesAmount"])){return;}
		if (!ctype_digit($_POST["nebulaAmount"])){return;}
	//	if (!ctype_digit($_POST["obstaclesSizeMin"])){return;}
	//	if (!ctype_digit($_POST["obstaclesSizeMax"])){return;}

		$id = $dbManager->createNewGameAndJoin($_SESSION["userid"], $_POST);
		if ($id){header("Location: gameSetup.php?gameid=".$id);}
		else echo "<span class='hinter'>ERROR</span>";
	}

	$myGames = $dbManager->getGames($_SESSION["userid"]);
	$update = 0;
	if (1){
		for ($i = 0; $i < sizeof($myGames); $i++){
			if ($manager->canAdvance($myGames[$i])){
				$manager->prepareAdvance($myGames[$i]["id"]);
				if ($manager->doAdvance()){
					$update = 1;
				}
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
			if ($game["turn"] == 0){continue;}
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
					} else $style = "background-color: #ffeb3e; color: black'";

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
		<div id="instructWrapper style='top'">
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
			<?php
				if (isset($_SESSION['userid']) && $_SESSION['userid'] == 1){
					echo "<div class='lobbyDiv'>";
						echo "<form method='post'>";
							echo "<input type='submit' value='startGame' name='startGame'>";
						echo "</form>";
					echo "</div>";

					echo "<div class='lobbyDiv'>";
						echo "<form method='post'>";
							echo "<input type='submit' value='anew' name='anew'>";
						echo "</form>";
					echo "</div>";

					echo "<div class='lobbyDiv'>";
						echo "<form method='post'>";
							echo "<input type='submit' value='dump' name='dump'>";
						echo "</form>";
					echo "</div>";
				}
			?>
			<div class="lobbyDiv">
				<?php echo $myGamesElement; ?>
			</div>
			<div id="openGames" class="lobbyDiv">
				<?php echo $openGamesElement; ?>
			</div>
			<div class="lobbyDiv">
				<div style="margin-bottom: 20px">
					<input id="createGameToggle" style="margin-top: 50px; width: 180px" type="button" value="Create a new Game" onclick="toggleGameCreation()">
				</div>

				<div>
					<form method="post">
						<table id="createGameMenu">
							<tr>
								<td width=70%>
									Game Name
								</td>
								<td>
									<input type="text" style="text-align: center" value='myGame' placeholder="Game Name" name="gameName"></input>		
								</td>
							</tr>
							<tr>
								<td>
									Initial Point Value
								</td>
								<td>
									<input type="number" style="text-align: center" value=3500 placeholder="3500" name="pointValue" step="250"></input>
								</td>
							</tr>
							<tr style="height: 10px"><td></td></tr>
							<tr>
								<td>
									Reinforcements Point Value
								</td>
								<td>
									<input type="number" style="text-align: center" value=1500 placeholder="1500" name="reinforceValue" step="100"></input>		
								</td>
							</tr>
							<tr>
								<td>
									Reinforcements purchase turn
								</td>
								<td>
									<input type="number" style="text-align: center" value=11 placeholder="11" name="reinforceTurn" step="1"></input>		
								</td>
							<tr>
								<td>
									Reinforcements arrival delay in turns
								</td>
								<td>
									<input type="number" style="text-align: center" value=3 placeholder="3" name="reinforceETA" step="1"></input>		
								</td>
							</tr>
							<tr>
								<td>
									# of possible Reinforcements
								</td>
								<td>
									<input type="number" style="width: 100%; text-align: center" value=10 placeholder="10" name="reinforceAmount" step="1" min="0" max="20"></input>		
								</td>
							</tr>
							<tr style="height: 10px"><td></td></tr>
							<tr>
								<td>
									Total amount of Asteroid fields
								</td>
								<td>
									<input type="number" style="width: 100%; text-align: center" value=5 placeholder="5" name="obstaclesAmount" step="1" min="0" max="10"></input>		
								</td>
							</tr>
							<tr>
								<td>
									Total amount of Nebula
								</td>
								<td>
									<input type="number" style="width: 100%; text-align: center" value=2 placeholder="2" name="nebulaAmount" step="1" min="0" max="5"></input>		
								</td>
							</tr>
							<tr style="height: 10px"><td></td></tr>
							<tr>
								<td>
									Minimum size per field / nebula
								</td>
								<td>
									<input type="number" style="width: 100%; text-align: center" value=75 placeholder="75" name="obstaclesSizeMin" step="25" min="50"></input>		
								</td>
							</tr>
							<tr>
								<td>
									Maximum size per field / nebula
								</td>
								<td>
									<input type="number" style="width: 100%; text-align: center" value=150 placeholder="175" name="obstaclesSizeMax" step="25" min="100" max="300"></input>		
								</td>
							</tr>
							<tr>
								<td colSpan=2 style="border: none">
									<input type="submit" style="width: 40%" value="Confirm and Forward"></input>	
								</td>
							</tr>
						</table>
					</form>
				</div>
			</div>
			
			<div class="lobbyDiv">
				<?php
					echo "<div class='chatWrapper'>";
					$value = "";
					DBManager::app()->purgeChat();				
					$chat = DBManager::app()->getFullChat();

					$last = 0;
					if (sizeof($chat)){
						for ($i = 0; $i < sizeof($chat); $i++){
							$value .= date("G:i:s", $chat[$i]["time"])." - ".$chat[$i]["username"].": ".$chat[$i]["msg"]."\n";
						}
						$last = $chat[sizeof($chat)-1]["time"];
					}

					echo "<textarea readonly class='chatBox' rows=7>".$value."</textarea>";
					echo "<textarea id='msg' class='sendWrapper' rows=2></textarea>";
					echo "</div>";
					echo "<script>var time = ".$last.";</script>";
				?>
			</div>
			<div class="lobbyDiv">
				<input style="margin-top: 50px; width: 100px" type="button" value="Logout" onclick="doLogout()">
			</div>
		</div>
	</body>
</html>


<script>
	$(document).ready(function(){

		$(".chatWrapper").find(".chatBox").scrollTop(function(){return this.scrollHeight}).end();
		
		var checkChat = setInterval(
			function(){ajax.checkChat();},
		5000);

		var checkGames = setInterval(
			function(){ajax.checkGameState();},
		20000);

		$("#instructWrapper")
			.css("left", 225)
			.css("top", 500)
			.contextmenu(function(e){
				e.preventDefault();
				e.stopPropagation();
				$(this).hide();
			})

		$("#createGameMenu").addClass("disabled");

		$(this).keypress(function(e){
			if ($(":focus").attr("id") == ("msg")){
				if (e.keyCode == 13){ajax.doChat(e);}
				else return;
			}
		});
	
	})

	function doLogout(){
		window.location = "logout.php"
	}

	function toggleGameCreation(){
		$("#createGameMenu").toggleClass("disabled")
	}
</script>