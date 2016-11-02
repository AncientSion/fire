<?php

error_reporting(E_ALL); ini_set('display_errors', '1');
require_once("dbManager.php");
require_once("gameManager.php");
require_once("debug.php");

session_start();
$gameid = $_GET["gameid"];
$userid;

if (isset($_SESSION["userid"])) {
	$userid = $_SESSION["userid"];
}
else $userid = 0;

$manager = new Manager($userid, $gameid);

echo "<script> window.gameid = ".$gameid."; window.userid = ".$userid.";</script>";

//$manager->pickReinforcements();

$phase;

switch ($manager->game["phase"]){
	case -1;
		$phase = "Deployment / Initial";
		break;
	case 1;
		$phase = "Movement";
		break;
	case 2;
		$phase = "Firing";
		break;
	case 3;
		$phase = "Damage Control";
		break;
	default:
		break;
}

$status;

foreach ($manager->playerstatus as $player){
	if ($player["userid"] == $userid){
		$status = $player["status"];
	}
}

//echo sizeof($ships);
//echo var_export($ships[0]);
//$fireorders = $manager->fires;

/*$w = new Omega(5, 2, "test", 50, 25, 90);

foreach ($w->systems[0] as $key => $value){
		if ($value == NULL){$value = "null";} echo "key: ".$key." val: ".$value."</br>";
	}
*/
	
//	var_export(json_encode($manager->fireOrders));

echo "<script>";
echo "window.gd = ".json_encode($manager->game, JSON_NUMERIC_CHECK).";";
echo "window.ships = ".json_encode($manager->ships, JSON_NUMERIC_CHECK).";";
echo "window.playerstatus = ".json_encode($manager->playerstatus, JSON_NUMERIC_CHECK).";";
echo "window.reinforcements = ".json_encode($manager->reinforcements, JSON_NUMERIC_CHECK).";";
echo "window.incoming = ".json_encode($manager->incoming, JSON_NUMERIC_CHECK).";";
//echo "window.fireOrders = ".json_encode($fireorders, JSON_NUMERIC_CHECK).";";
echo "</script>";

?>

<!DOCTYPE html>
<html>
<head>
	<link rel='stylesheet' href='style.css'/>
	<script src="jquery-2.1.1.min.js"></script>
	<script src='mathLib.js'></script>
	<script src='shared.js'></script>
	<script src='shipclasses.js'></script>
	<script src='classes.js'></script>
	<script src='systems.js'></script>
	<script src='graphics.js'></script>
	<script src='cam.js'></script>
	<script src='imageloader.js'></script>
	<script src='game.js'></script>
	<script src='ajax.js'></script>
	<script src='script.js'></script>
</head>
	<body>
		<div id ="popupWrapper">
			<div id="popupText">
			</div>
		</div>
		<div id="game">
			<div id ="phaseSwitchDiv" class="disabled">
				<div id="phaseSwitchInnerDiv">
					<div id="turnDiv">
					</div>
					<div id="phaseDiv">
					</div>
				</div>
			</div>
			<div id="canvasDiv">
				<div id="upperGUI">
					<div id="currentPos">0 / 0</div>

				
				<!--	<div id="buttons"></div>
					<span id="onArc">null</span>
					<span id="curArc">0</span>
					<span id="dist" style="color: red">0</span>
				-->
					<table id="overview">
						<tr>
							<th width="10%">
								Turn
							</th>
							<th width="55%">
								Phase
							</th>
							<th width="35%">
								Reinforce
							</th>
						</tr>
						<tr>
							<td>
								<?php echo $manager->game["turn"]; ?>
							</td>
							<td>
								<?php echo $phase; ?>
							</td>
							<td id="reinforce">
								<?php echo $manager->reinforce["points"]; ?>
							</td>
						</tr>
						<tr>
							<th colSpan=3 id="confirmOrders" onclick="game.endPhase()">
								<?php 
									if ($status == "ready"){
										echo "Waiting for Opponent";
									} else echo "Confirm Orders";
								?>
							</th>
						</tr>
					</table>
				</div>
				<div id="combatlogWrapper">
					<table id="combatLog" class="disabled">
						<tr>
							<th style="width: 10%">
								Type
							</th>
							<th style="width: 20%">
								Shooter
							</th>
							<th style="width: 20%">
								Target
							</th>
							<th style="width: 20%">
								Weapon
							</th>
							<th style="width: 10%">
								Guns
							</th>
							<th style="width: 10%">
								Hits
							</th>
							<th style="width: 10%">
								Shots
							</th>
						</tr>
					</table>
				</div>
				<div id ="deployWrapper" class="disabled">
					<table id="deployTable">
						<tr>
							<th style="font-size: 18px; background-color: lightGreen;" colSpan=3>
								Incoming Reinforcements
							</th>
						</tr>
						<tr>
							<th  width="50%" colSpan="2">
								Class
							</th>
							<th colSpan=2 width="20%" >
								Arrival in
							</th>
						</tr>
					</table>
					<table id="reinforceTable">
						<tr>
							<th style="font-size: 18px; background-color: lightGreen;" colSpan=4>
								Requestable Reinforcements
							</th>
						</tr>
						<tr>
							<th  width="50%" colSpan="2">
								Class
							</th>
							<th  width="30%" >
								Arrival
							</th>
							<th  width="20%" >
								Cost
							</th>
						</tr>
						<?php
							if (sizeof($manager->reinforcements)){
								foreach ($manager->reinforcements as $entry){
									echo "<tr class='requestReinforcements'>";
									echo "<td><img class='img50' src=shipIcons/".strtolower($entry["shipClass"]).".png></td>";
									echo "<td>".$entry["shipClass"]."</td>";
									echo "<td>".$entry["arrival"]." turn/s</td>";
									echo "<td>".$entry["cost"]."</td>";
									echo "</tr>";
								}

								echo "<tr>";
								echo "<th style='border: none; background-color: black;'></th>";
								echo "<th style='border: none; background-color: black;'></th>";
								echo "<th style='padding: 5px; font-size: 12px'> Total Cost</th>";
								echo "<th style='padding: 5px; font-size: 15px' id='totalRequestCost'>0</th>";
								echo "</tr>";

							}
						?>
					</table>
				</div>

				<canvas id ="canvas"></canvas>
				<canvas id ="planCanvas"></canvas>
				<canvas id ="fxCanvas"></canvas>
				<canvas id ="moveCanvas"></canvas>
				<canvas id ="mouseCanvas"></canvas>
			</div>
		</div>
		<div id="weaponAimTableWrapper" class="disabled">
			<table id="weaponAimTable"></table>
		</div>
		<div id="deployOverlay" class="disabled"></div>
		<div id="vectorDiv" class="disabled"></div>
	</body>
</html>

<script>

	$(document).ready(function(){
		$("#reinforce").hover(
			function(e){
				$(this).addClass("selected");
			},
			function(e){
				$(this).removeClass("selected");
			}
		).
		click(function(e){
			$("#deployWrapper").show();
		});

		var i = 0;

		$("#deployWrapper").contextmenu(function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).hide();
		})


		$("#popupWrapper").contextmenu(function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).hide();
		});

		$(".requestReinforcements").each(function(i){
			$(this)
			.data("id", window.reinforcements[i]["id"])
			.data("cost", window.reinforcements[i]["cost"])
			.click(function(e){
				e.stopPropagation();
				if (game.phase == -1){
					if (! game.deploying){				
						if ($(this).hasClass("selected")){
							$(this).removeClass("selected");
							game.selectReinforcements($(this).data("id"));
						}	
						else {
							if (game.reinforcePoints >= $(this).data("cost") + game.getCurrentReinforceCost()){
								$(this).addClass("selected");
								game.selectReinforcements($(this).data("id"));
							}
							else {
								popup("You have insufficient Reinforce Points ("+game.reinforcePoints+") available.");
							}
						}
					}
					else {
						popup("Ship deployment active, please deploy and try again.");
					}
				}
				else {
					popup("Reinforces can only be requested in Deployment/Initial Phase.");
				}
			})
		})
	})



</script>