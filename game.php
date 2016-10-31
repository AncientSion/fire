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

echo json_encode($manager->pickReinforcements());

$game = $manager->game;
$playerstatus = $manager->playerstatus;
$ships = $manager->ships;
$damages = $manager->damages;

$phase;

switch ($game["phase"]){
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
echo "window.gd = ".json_encode($game, JSON_NUMERIC_CHECK).";";
echo "window.ships = ".json_encode($ships, JSON_NUMERIC_CHECK).";";
echo "window.playerstatus = ".json_encode($playerstatus, JSON_NUMERIC_CHECK).";";
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
				<!--	<div id="buttons"></div>
					<div id="currentPos">0 / 0</div>
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
								<?php echo $game["turn"]; ?>
							</td>
							<td>
								<?php echo $phase; ?>
							</td>
							<td id="reinforce">
								<?php echo $manager->reinforcements["points"]." Points"; ?>
							</td>
						</tr>
					</table>
					<input type="button" value="Confirm Orders" onclick="endPhase()"></input>
				</div>
				<div id="combatlogWrapper">
					<table id="combatLog" class="disabled">
						<tr>
							<th>
								Type
							</th>
							<th>
								Shooter
							</th>
							<th>
								Target
							</th>
							<th>
								Weapon
							</th>
							<th>
								Guns
							</th>
							<th>
								Hits
							</th>
							<th>
								Shots
							</th>
						</tr>
					</table>
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
						<th style="font-size: 18px;" colSpan=3>
							Incoming Reinforcements
						</th>
					</tr>
					<tr>
						<th  width="50%" colSpan="2">
							Class
						</th>
						<th  width="30%" >
							Type
						</th>
						<th  width="20%" >
							Arrival in
						</th>
					</tr>
				</table>
				<table id="reinforceTable" class="disabled">
					<tr>
						<th style="font-size: 18px;" colSpan=3>
							Requestable Reinforcements
						</th>
					</tr>
					<tr>
						<th  width="50%" colSpan="2">
							Class
						</th>
						<th  width="30%" >
							Type
						</th>
						<th  width="20%" >
							Estimated Arrival
						</th>
					</tr>
				</table>
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
})
</script>