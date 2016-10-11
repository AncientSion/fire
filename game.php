<?php

error_reporting(E_ALL); ini_set('display_errors', '1');
require_once("dbManager.php");
require_once("gameManager.php");
require_once("debug.php");

session_start();

if (isset($_SESSION["userid"])){
	$gameid = $_GET["gameid"];
	$userid = $_SESSION["userid"];
	echo "<script> var gameid = ".$gameid."; var userid = ".$userid.";</script>";
	$manager = new Manager($userid, $gameid);

	//debug::log("phase: ".$game["phase"]);

	$game = $manager->gamedata["game"];
	$playerstatus = $manager->gamedata["playerstatus"];
	$ships = $manager->gamedata["ships"];

	/*$w = new Omega(5, 2, "test", 50, 25, 90);

	foreach ($w->systems[0] as $key => $value){
			if ($value == NULL){$value = "null";} echo "key: ".$key." val: ".$value."</br>";
		}
	*/
		
	//	var_export(json_encode($manager->fireOrders));

	echo "<script>";
	echo "window.gd = ".json_encode($game, JSON_NUMERIC_CHECK).";";
	echo "window.ships = ".json_encode($ships, JSON_NUMERIC_CHECK).";";
	echo "window.playerstatus = ".json_encode($playerstatus, JSON_NUMERIC_CHECK).";";
	echo "</script>";
}
?>

<!DOCTYPE html>
<html>
<head>
	<link rel='stylesheet' href='style.css'/>
	<script src="jquery-2.1.1.min.js"></script>
	<script src="jquery-ui.js"></script>
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
					<div id="buttons"></div>
					<div id="currentPos">0 / 0</div>
					<span id="onArc">null</span>
					<span id="curArc">0</span>
					<span id="dist" style="color: red">0</span>
					<input type="button" value="end Phase" onclick="endPhase()"></input>
				</div>
				<canvas id ="canvas"></canvas>
				<canvas id ="planCanvas"></canvas>
				<canvas id ="fxCanvas"></canvas>
				<canvas id ="moveCanvas"></canvas>
				<canvas id ="mouseCanvas"></canvas>
			</div>
			<div id ="deployWrapper" class="disabled">
				<table id="deployTable">
					<tr>
						<th  width="50%" colSpan="2">
							Class
						</th>
						<th  width="30%" >
							Type
						</th>
						<th  width="20%" >
							Deploy in
						</th>
					</tr>
				</table>
			</div>
		</div>
		<table>
			<tr>
				<th>
					<?php echo "turn: ".$game["turn"]; ?>
				</th>
				<th>
					<?php echo "phase: ".$game["phase"]; ?>
				</th>
			</tr>
		</table>
		<table id="combatLog" class="disabled"></table>
		<div id="weaponAimTableWrapper" class="disabled">
			<table id="weaponAimTable"></table>
		</div>
		<div id="deployOverlay" class="disabled"></div>
		<div id="vectorDiv" class="disabled"></div>
	</body>
</html>

<script>
	$(document).ready(function(){
		var canSubmit = true;
		for (var i = 0; i < playerstatus.length; i++){
			if (playerstatus[i].userid == userid && playerstatus[i].status != "waiting"){
				canSubmit = false;
				break;
			}
		}

		if (!canSubmit){
			console.log("You did already submit your gamedata for the current phase");
		}

		window.game.canSubmit = canSubmit;
	})
</script>