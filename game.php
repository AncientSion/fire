<?php

include_once 'global.php';

$gameid = $_GET["gameid"];
$userid;

if (isset($_SESSION["userid"])) {
	$userid = $_SESSION["userid"];
}
else $userid = 0;

$manager = new Manager($userid, $gameid);

echo "<script> window.gameid = ".$gameid."; window.userid = ".$userid.";</script>";

$phase;


switch ($manager->game["phase"]){
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

$status;

foreach ($manager->playerstatus as $player){
	if ($player["userid"] == $userid){
		$status = $player["status"];
	}
}
	echo "<script>";
	echo "window.gd = ".json_encode($manager->game, JSON_NUMERIC_CHECK).";";
	echo "window.ships = ".json_encode($manager->ships, JSON_NUMERIC_CHECK).";";
	echo "window.ballistics = ".json_encode($manager->ballistics, JSON_NUMERIC_CHECK).";";
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
	<script src='flights.js'></script>
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
		<div id ="instructWrapper">
			<div id="instructText">
			</div>
		</div>
		<div id="game">
			<div id ="phaseSwitchDiv">
				<div id="phaseSwitchInnerDiv">
					<div id="turnDiv">
					</div>
					<div id="phaseDiv">
					</div>
				</div>
			</div>
			<div id="impulseGUI" class="ui disabled">
				<table>
					<tr>
						<td>
							Impulse:
						</td>
						<td  id="impulse">
						</td>
					</tr>
					<tr>
						<td>
							Active Turn Delay:
						</td>
						<td  id="remTurnDelay">
						</td>
					</tr>
					<tr>
						<td>
							Future Turn Delay:
						</td>
						<td  id="nextTurnDelay">
						</td>
					</tr>
					<tr>
						<td>
							Engine Power:
						</td>
						<td  id="enginePower">
						</td>
					</tr>
					<tr>
						<td>
							Impulse Change:
						</td>
						<td  id="impulseChange">
						</td>
					</tr>
						<td>
							Turn Cost:
						</td>
						<td  id="turnCost">
						</td>
					</tr>
					<tr id="increaseImpulse" class="disabled">
						<td colspan=2>
							Increase Impulse
						</td>
					</tr>
					<tr id="decreaseImpulse" class="disabled">
						<td colspan=2>
							Decrease Impulse
						</td>
					</tr>
					<tr id="undoLastAction" class="disabled">
						<td colspan=2>
							Undo last action
						</td>
					</tr>
				</table>
			</div>
			<div id="turnLeft" class="turnEle ui disabled">
				<table style="margin:auto;">
					<tr>
						<th colSpan=2>
							Turn
						</th>
					</tr>
					<tr>
						<td>
							EP Cost
						</td>
						<td id="epCost">
						</td>
					</tr>
					<tr>
						<td>
							Next Turn
						</td>
						<td id="turnDelay">
						</td>
					</tr>
				</table>
			</div>
			<div id="turnRight" class="turnEle ui disabled">
				<table style="margin:auto;">
					<tr>
						<th colSpan=2>
							Turn
						</th>
					</tr>
					<tr>
						<td>
							EP Cost
						</td>
						<td id="epCost">
						</td>
					</tr>
					<tr>
						<td>
							Next Turn
						</td>
						<td id="turnDelay">
						</td>
					</tr>
				</table>
			</div>
			<div id="maxTurnVector" class="ui disabled">
			</div>
			<div id="maxVector" class="ui disabled">
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
							<?php 
								if ($status == "ready"){
									echo '<th style="background-color: red;" colSpan=3 id="confirmOrders" onclick="game.endPhase()">Waiting for Opponent';
								}
								else {
									echo '<th colSpan=3 id="confirmOrders" onclick="game.endPhase()">Confirm Orders';
								}
								?>
							</th>
						</tr>
					</table>
					<input type="button" value="reset" onclick=reset()></input>
				</div>
				<div id="combatlogWrapper" class="disabled">
					<table id="combatLog">
						<tr>
							<th colspan=8 style="font-size: 16px; width: 100%; border: 1px solid white"">
								Combat Log
							</th>
						</tr>
						<tr>
							<th style="width: 15%">
								Type
							</th>
							<th style="width: 14%">
								Shooter
							</th>
							<th style="width: 19%">
								Target
							</th>
							<th style="width: 17%">
								Weapon
							</th>
							<th style="width: 8%">
								Chance
							</th>
							<th style="width: 12%">
								Hits / Shots
							</th>
							<th style="width: 10%">
								Armour
							</th>
							<th style="width: 10%">
								Structure
							</th>
						</tr>
					</table>
				</div>
				<div id ="deployWrapper" class="disabled">
					<table id="deployTable">
						<tr>
							<th style="font-size: 18px; background-color: lightBlue; color: black" colSpan=3>
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
							<th style="font-size: 18px; background-color: lightBlue; color: black;" colSpan=4>
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
									echo "<td><img class='img50' src=shipIcons/".strtolower($entry["classname"]).".png></td>";
									echo "<td>".$entry["classname"]."</td>";
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
		<div id="shortInfo" class="disabled"></div>
		<div id="weaponAimTableWrapper" class="disabled">
			<table id="targetInfo"></table>
			<table id="weaponInfo">
				<tr class="weaponAimHeader">
					<td style="width: 52%">Weapon</td>
					<td style="width: 12%">Fire Control</td>
					<td style="width: 12%">Dmg loss</td>
					<td style="width: 12%">Acc loss</td>
					<td style="width: 12%">Final est.</td>
				</tr>
			</table>
		</div>



		<div id="deployOverlay" class="disabled"></div>
		<div id="vectorDiv" class="disabled"></div>
		<div id="hangarLoadoutDiv" class="disabled">
			<div class="header">
				Assemble and launch a flight
			</div>
			<div class="header">
				Can launch up to <span id="launchRate"></span> units per turn
			</div>
			<div class="header">
				Has a capacity of <span id="capacity"></span> tons
			</div>
			<table id="hangarTable">
			</table>
			<div class="header">
				<input type="button" class="disabled" value="Launch selected strikecraft as mixed flight";
			</div>
		</div>
	</body>
</html>

<script>

	function reset(){
		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {type: "reset"},
			error: ajax.error,
		});
	}

	$(document).ready(function(){

		window.res.x = window.innerWidth-1;
		window.res.y = window.innerHeight-1;

		$("#mouseCanvas").bind("mouseleave", function(){
			$("#weaponAimTableWrapper").hide();
		})

		$(this).keypress(function(e){
			if (game){
				if (e.keyCode == 32){ // space
					if (game.vector){
						game.vector = false;
						$("#vectorDiv").addClass("disabled");
						mouseCtx.clearRect(0, 0, res.x, res.y);
					}
					else {
						game.vector = true;
						$("#vectorDiv").removeClass("disabled");
					}
				//console.log(game.vector);
				}
				else if (e.keyCode == 111){ // ctrl, opacity
					if (game.opacity){
						$(this).find(".ui").each(function(i){
							$(this).removeClass("opaque");
						})
						game.opacity = false;
					}
					else {
						$(this).find(".ui").each(function(i){
							$(this).addClass("opaque");
						})
						game.opacity = true;
					}
				}
				else if (e.keyCode == 99){ // alt, cancel animation
					if (game.animateFire){
						game.animateFire = false;
						window.cancelAnimationFrame(anim);
						fxCtx.clearRect(0, 0, res.x, res.y);
						game.draw();
						$("#combatLog").find("tr").each(function(i){
							if (i > 2){
								$(this).remove()
							}
						})
						for (var i = 0; i < game.fireOrders.length; i++){
							game.createLogEntry(game.fireOrders[i]);
						}
						for (var i = 0; i < game.ballistics.length; i++){
							if (game.ballistics[i].type = "Impact"){
								game.createBallisticLogEntry(game.ballistics[i]);
							}
						}
					}
				}
			}
		})
		
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

		$("#deployWrapper").contextmenu(function(e){
			e.preventDefault();
			e.stopPropagation();
			game.disableDeployment();
			$("#deployTable").find(".selected").each(function(){
				$(this).removeClass("selected");
			});
			$(this).hide();
		})

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

		document.getElementById("combatlogWrapper").onmousedown = function () {
		    _drag_init(this);
		    return false;
		};


		$("#increaseImpulse")
		.click(function(){
			//console.log("doIncreaseImpulse")
			game.getUnitById(aShip).doIncreaseImpulse();
		});

		$("#decreaseImpulse")
		.click(function(){
			//console.log("doDecreaseImpulse")
			game.getUnitById(aShip).doDecreaseImpulse();
		});

		$("#undoLastAction")
		.click(function(){
			//console.log("undoLastAction")
			game.getUnitById(aShip).undoLastOrder()
		});

		$(".turnEle")
		.click(function(){
			//console.log("issueTurn")
			game.getUnitById($(this).data("shipid")).issueTurn($(this).data("a"))
		})

		$("#maxVector")
		.click(function(){
			//console.log("maxVector")
			game.getUnitById($(this).data("shipid")).moveToMaxVector();
		})

		$("#maxTurnVector")
		.click(function(){
			//console.log("maxTurnVector")
			game.getUnitById($(this).data("shipid")).moveToMaxTurnVector();
		})
	})


</script>