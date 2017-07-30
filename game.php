"<?php

include_once 'global.php';

$time = -microtime(true);


$gameid = $_GET["gameid"];
$userid;
$phase;

if (isset($_SESSION["userid"])) {
	$userid = $_SESSION["userid"];
} else $userid = 0;

$manager = new Manager($userid, $gameid);
if ($manager->status == "active"){
	$manager->getGameData();
} else {
	header("Location: lobby.php");
}


echo "<script> window.gameid = ".$gameid."; window.userid = ".$userid.";</script>";


switch ($manager->phase){
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
		$phase = "Firing Orders";
		break;
	case 3:
		$phase = "Damage Control";
		break;
	default:
		break;
}

$status = 0;

foreach ($manager->playerstatus as $player){
	if ($player["userid"] == $userid){
		$status = $player["status"];
	}
}

echo "<script>";
echo "window.game = ".json_encode($manager->getClientData(), JSON_NUMERIC_CHECK).";";
//echo "window.gd = ".json_encode($manager->game, JSON_NUMERIC_CHECK).";";
//echo "window.ships = ".json_encode($manager->getShipData($userid), JSON_NUMERIC_CHECK).";";
echo "window.ballistics = ".json_encode($manager->ballistics, JSON_NUMERIC_CHECK).";";
echo "window.playerstatus = ".json_encode($manager->playerstatus, JSON_NUMERIC_CHECK).";";
//echo "window.reinforcements = ".json_encode($reinforcements, JSON_NUMERIC_CHECK).";";
//echo "window.incoming = ".json_encode($manager->incoming, JSON_NUMERIC_CHECK).";";
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
	<script src='salvo.js'></script>
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
		<div id="popupWrapper">
			<div id="popupText">
			</div>
		</div>
		<div id="instructWrapper">
			<div id="instructText">
			</div>
		</div>
		<div id="game">
			<div id="phaseSwitchDiv">
				<div id="phaseSwitchInnerDiv">
					<div>
						<?php
							echo "Turn ".$manager->turn;
						?>
					</div>
					<div>
						<?php
							echo $phase;
						?>
					</div>
					<div class="hintDiv">
						<?php
							$hints = array();
							$hints[] = "Press 'F' to cancel fire animations and display the combat log immediatly";
							$hints[] = "Press 'M' to cancel move animations and immediatly position each unit";
							$hints[] = "Press '+' or '-' to increase or decrease EP allocation for turn shortening";
							$hints[] = "Press 'SPACE' to enable and disable a tool to measure distances and angles.";
							$hints[] = "Matter weapons like the Railgun are able to penetrate enemy armour. They ignore 50 % of the target units armour.";
							$hints[] = "In addition to dealing very high damage, Plasma weapons deal additional damage to the target units armour.";
							$hints[] = "Plasma weapons do less damage the further the target is away. Get close or charge your plasma weapons up for less damage dropoff.";
							$hints[] = "Laser have an optimal focal point. The farther away the target unit, the less damage the Laser will deal.";
							$hints[] = "Laser rake over a target. As such they are likely to hit more than one system which also means their final damage is very dependant on the armour of the target unit.";
							$hints[] = "Lasers can usually be boosted with extra power for increased damage output.";
							$hints[] = "Each Pulse weapon will score a fixed base amount of hits. This amount will then be increased further if you scored a good roll on the hit dice.";
							$hints[] = "Pulse weapons fire a volley of several shots. All shots of a volley hit the same unit (or system). As such, armour is applied for each single hit.";
							$hints[] = "For the most part, weapons with more than 1 shot will spread all their shots over a target, instead of focusing them on a single fighter or system.";
							echo $hints[mt_rand(0, sizeof($hints)-1)];
						?>
					</div>
				</div>
			</div>
			<div id="plusImpulse" class="ui">
				<img src="varIcons/plus.png" style="width: 30px; height: 30px">
			</div>
			<div id="minusImpulse" class="ui">
				<img src="varIcons/minus.png" style="width: 30px; height: 30px">
			</div>
			<div id="undoLastAction" class="ui">
				<img src="varIcons/destroyed.png" style="width: 30px; height: 30px">
			</div>
			<div id="turnButton" class="turnEle ui disabled">
				<table class="doTurn" style="margin:auto; width: 100%;">
					<tr>
						<th style="text-align: left">
							 Turning
						</th>
						<th id="turnMode" style="text-align: center">
							 OFF
						</th>
					</tr>
					<tr>
						<th style="text-align: left">
							 Speed
						</th>
						<th id="impulseMod" style="text-align: center">
						</th>
					</tr>
					<tr>
						<th style="text-align: left">
							Cost / 1
						</th>
						<th id="turnCost" style="width: 55px, text-align: center">
						</th>
					</tr>
					<tr>
						<th style="text-align: left">
							Delay / 1
						</th>
						<th id="turnDelay" style="width: 55px; text-align: center">
						</th>
					</tr>
					<tr>
						<th style="text-align: left">
							EP Mod
						</th>
						<th id="turnMod" style="width: 55px; text-align: center">
						</th>
					</tr>
					<tr id="shortenTurn" class="disabled">
						<td>
							<div class="doShortenTurn">
								<img class="size20" src="varIcons/plusWhite.png">
							</div>
						</td>
						<td>
							<div class="doUndoShortenTurn">
								<img class="size20" src="varIcons/minusWhite.png">
							</div>
						</td>
					</tr>
				</table>
			</div>
			<div id="epButton" class="turnEle ui disabled">
				<table style="margin:auto; width: 100%;">
					<tr>
						<th style="text-align: left">
							 Engine Power
						</th>
						<th id="remEP" style="text-align: center">
						</th>
					</tr>
					<tr>
						<th style="text-align: left">
							 Thrust Change 
						</th>
						<th id="ImpulseCost" style="text-align: center">
						</th>
					</tr>
				</table>
			</div>
			<div id="maxCutVector" class="ui disabled">
				<div></div>
			</div>
			<div id="maxTurnVector" class="ui disabled">
				<div></div>
			</div>
			<div id="maxVector" class="ui disabled">
				<div></div>
			</div>
			<div id="upperGUI">
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
							<?php echo $manager->turn; ?>
						</td>
						<td>
							<?php echo $phase; ?>
						</td>
						<td id="reinforce">
							<?php
								echo $manager->value;
							?>
						</td>
					</tr>
					<tr>
						<?php 
							if (!$status){
								echo '<th colSpan=3 id="confirmOrders" style="background-color: yellow;">Anonymus Mode</th>';
							}
							else if ($status == "ready"){
								echo '<th colSpan=3 id="confirmOrders" style="background-color: lightGreen;">Waiting for Opponent</th>';
							}
							else {
								echo '<th colSpan=3 id="confirmOrders" onclick="this.disabled=true;game.endPhase()">Confirm Orders</th>';
							}
							?>
					</tr>
				</table>
			</div>
			<div id="unitGUI">
			</div>
			<div id="canvasDiv">
				<canvas id="canvas"></canvas>
				<canvas id="fxCanvas"></canvas>
				<canvas id="planCanvas"></canvas>
				<canvas id="moveCanvas"></canvas>
				<canvas id="salvoCanvas"></canvas>
				<canvas id="mouseCanvas"></canvas>
				<canvas id="drawCanvas"></canvas>
			</div>
			<div id="shortInfo" class="disabled">				
			</div>
			<div id="weaponAimTableWrapper" class="disabled">
				<table id="targetInfo">
					<tr>
						<th width=20%>Target</th>
						<th width=20%>Type</th>
						<th width=20%>Armour</th>
						<th width=20%></th>
						<th width=20%>Dist</th>
					</tr>
					<tr id="targetData1">
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr><td colSpan=5 height=10px></td></tr>
					<tr>
						<th>Base Hit</th>
						<th>Thrust Mod</th>
						<th>Lock Mod</th>
						<th>Mask Mod</th>
						<th>Final Hit</th>
					</tr>
					<tr id="targetData2">
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</table>
				<table id="weaponInfo">
					<tr>
						<th width=47%>Weapon</th>
						<th width=10%>Dmg</th>
						<th width=19%>Tracking</th>
						<th width=12%>Range</th>
						<th width=12%>End</th>
					</tr>
				</table>
			</div>
			<div id="combatlogWrapper" class="disabled">
				<div class="combatLogHeader">
					Combat Log
				</div>
				<table id="combatLog">
					<tr>
						<th width=110px>Type</th>
						<th width=105px>Shooter</th>
						<th width=105px>Target</th>
						<th width=160px>Weapon</th>
						<th width=60px>Chance</th>
						<th width=60px>Hits</th>
						<th width=70px>Armour</th>
						<th width=70px>System</th>
						<th width=70px>Hull</th>
					</tr>
				</table>
			</div>
			<div id="deployLogWrapper" class="disabled">
				<table id="deloyLog">
					<tr>
						<th width=100%>val</th>
					</tr>
				</table>
			</div>
			<div id="deployWrapper" class="disabled">
				<table id="deployTable">
					<tr>
						<th class="head" colSpan=3>
							Incoming Units
						</th>
					</tr>
					<tr>
						<th  width="50%" colSpan="2">
							Class
						</th>
						<th colSpan=2 width="20%" >
							ETA
						</th>
					</tr>
					<?php
						foreach ($manager->ships as $ship){
							if ($ship->ship && $manager->phase < 1 && $ship->userid == $manager->userid && $ship->available == $manager->turn){
								echo "<tr class='deployNow ".$ship->id."'</td>";
								echo "<td><img class='img50' src=shipIcons/".strtolower($ship->name).".png></td>";
								echo "<td class='green font20'>".$ship->name."</td>";
								echo "<td class='green font20'> NOW </td>";
								echo "</tr>";
							}							
							else if ($ship->ship && $manager->phase < 1 && $ship->userid != $manager->userid && $ship->available == $manager->turn){
								if ($manager->phase == -1){
									echo "<tr class='deployNow ".$ship->id."'</td>";
									echo "<td><img class='img50' src=varIcons/vortex.png></td>";
									echo "<td class='red font20'>Unknown</td>";
									echo "<td class='red font20'> NOW </td>";
									echo "</tr>";
								}
								else if ($manager->phase == 0){
									echo "<tr class='deployNow ".$ship->id."'</td>";
									echo "<td><img class='img50' src=shipIcons/".strtolower($ship->name).".png></td>";
									echo "<td class='red font20'>".$ship->name."</td>";
									echo "<td class='red font20'> NOW </td>";
									echo "</tr>";
								}
							}
						}
						for ($i = 0; $i < sizeof($manager->incoming); $i++){
							if ($manager->incoming[$i]["userid"] == $manager->userid){
								$val = "deployLater ".$manager->incoming[$i]["id"];
								echo "<tr class='".$val."'</td>";
								echo "<td><img class='img50' src=shipIcons/".strtolower($manager->incoming[$i]["name"]).".png></td>";
								echo "<td class='green font20'>".$manager->incoming[$i]["name"]."</td>";
								$rem = $manager->incoming[$i]["available"] - $manager->turn;
								if ($rem == 1){
									echo "<td class='font20'>1 Turn</td></tr>";
								} else echo "<td class='font20'>".$rem." Turns</td></tr>";
							}
							else if ($manager->incoming[$i]["userid"] != $manager->userid && $manager->incoming[$i]["available"] == $manager->turn+1){
								$val = "deployLater ".$manager->incoming[$i]["id"];
								echo "<tr class='".$val."'</td>";
								echo "<td><img class='img50' src=varIcons/vortex.png></td>";
								echo "<td class='red font20'>Unknown</td>";
								echo "<td class='font20'>1 Turn</td></tr>";
							}
						}
					?>
				</table>
				<table id="reinforceTable">
					<tr>
						<th class="head" colSpan=4>
							Reinforcements
						</th>
					</tr>
					<tr>
						<th  width="50%" colSpan="2">
							Class
						</th>
						<th  width="30%" >
							ETA
						</th>
						<th  width="20%" >
							Cost
						</th>
					</tr>
					<?php
						if (sizeof($manager->rdyReinforcements)){
							//echo "<script>console.log(window.reinforcements)</script>";
							foreach ($manager->rdyReinforcements as $ship){
									if ($ship->userid != $manager->userid){continue;}
									echo "<tr class='requestReinforcements'>";
									echo "<td><img class='img50' src=shipIcons/".strtolower($ship->name).".png></td>";
									echo "<td>".$ship->name."</td>";
									echo "<td>".($ship->available - $manager->turn)." turn/s</td>";
									echo "<td class='cost'>".$ship->cost."</td>";
									echo "</tr>";
								}

							echo "<tr>";
							echo "<td style='border: none; background-color: black;'></td>";
							echo "<td style='border: none; background-color: black;'></td>";
							echo "<td style='padding: 5px; font-size: 12px'> Total Cost</td>";
							echo "<td style='padding: 5px; font-size: 15px' id='totalRequestCost'>0</td>";
							echo "</tr>";
						}
					?>
				</table>
			</div>
			<div id="deployOverlay" class="disabled">
				<span>Deploy</span>			
				<div class="img"></div>			
			</div>
			<div id="vectorDiv" class="disabled"></div>
			<div id="hangarLoadoutDiv" class="disabled">
			<div class="header">
				Assemble and launch a flight
			</div>
			<div class="header">
				Can launch up to <span id="launchRate"></span> units per cycle.
			</div>
			<div class="header">
				Has a capacity of <span id="capacity"></span> tons
			</div>
			<table id="hangarTable">
			</table>
			<div class="header">
				<input type="button" class="disabled" value="Launch selected strikecraft as mixed flight">
			</div>
		</div>
	</body>
</html>

<?php 
	$time += microtime(true); 
	//Debug::log("serve gamedata time: ".round($time, 3)." seconds.");
?>

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
		//$("#reinforceTable").hide();
		$("#mouseCanvas").on("mouseleave", function(){
			$("#weaponAimTableWrapper").hide();
		})
		$("#combatLog").contextmenu(function(e){
			e.stopPropagation();
		})
		$("#combatlogWrapper").contextmenu(function(e){
			e.preventDefault(); e.stopPropagation();
			$(this).find("#combatLog").toggleClass("disabled");
		})

		window.initiateKeyDowns();

		document.getElementById("combatlogWrapper").onmousedown = function(){
		    _drag_init(this);
		    return false;
		};

		$("#plusImpulse")
		.click(function(){
			game.getUnitById(aUnit).doIncreaseImpulse();
		});

		$("#minusImpulse")
		.click(function(){
			game.getUnitById(aUnit).doDecreaseImpulse();
		});

		$("#undoLastAction")
		.click(function(){
			game.getUnitById(aUnit).undoLastAction()
		});

		$(".doTurn")
		.click(function(){
			//console.log("issueTurn")
		//	game.getUnitById($(this).data("shipid")).issueTurn($(this).data("a"))
		//	game.getUnitById($(this).data("shipid")).switchTurnMode();

		})
		$("#turnButton")
		.click(function(){
			game.getUnitById(aUnit).switchTurnMode();
		})

		$(".doShortenTurn")
		.click(function(e){
			e.stopPropagation();
			game.getUnitById(aUnit).doShortenTurn(false)
		})
		.contextmenu(function(e){
			e.stopPropagation();
			e.preventDefault();
			game.getUnitById(aUnit).doShortenTurn(true)
		})

		$(".doUndoShortenTurn")
		.click(function(e){
			e.stopPropagation();
			game.getUnitById(aUnit).doUndoShortenTurn(false)
		})
		.contextmenu(function(e){
			e.stopPropagation();
			e.preventDefault();
			game.getUnitById(aUnit).doUndoShortenTurn(true)
		})

	/*	$("#maxVector")
		.click(function(){
			//console.log("maxVector")
			game.getUnitById($(this).data("shipid")).moveToMaxVector();
		})

		$("#maxTurnVector")
		.click(function(){
			//console.log("maxTurnVector")
			game.getUnitById($(this).data("shipid")).moveToMaxTurnVector();
		})

		$("#maxCutVector")
		.click(function(){
			//console.log("maxTurnVector")
			game.getUnitById($(this).data("shipid")).moveToMaxCutVector();
		})
	*/
	
		$("#maxCutVector")
		.click(function(){
			//console.log("maxVector")
			game.getUnitById($(this).data("shipid")).moveInVector($(this).data("dist"));
		})	
		$("#maxTurnVector")
		.click(function(){
			//console.log("maxVector")
			game.getUnitById($(this).data("shipid")).moveInVector($(this).data("dist"));
		})	
		$("#maxVector")
		.click(function(){
			//console.log("maxVector")
			game.getUnitById($(this).data("shipid")).moveInVector($(this).data("dist"));
		})




	})


	function initiateKeyDowns(){
		$(this).keypress(function(e){
			if (game){
				if (e.keyCode == 32){ // space - dist logger
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
				else if (e.keyCode == 102){ // f, cancel fire animation
					if (game.animateFire){
						game.animateFire = false;
						window.cancelAnimationFrame(anim);
						fxCtx.clearRect(0, 0, res.x, res.y);
						$("#combatLog").find("tr").each(function(i){
							if (i >= 2){
								$(this).remove()
							}
						})
						for (var i = 0; i < game.fireOrders.length; i++){
							game.createCombatLogEntry(game.fireOrders[i]);
						}
						for (var i = 0; i < animate.ballAnims.length; i++){
							for (var j = animate.ballAnims[i].anims.length-1; j >= 0; j--){
								animate.doLog(i, j);
							}
						}
						for (var i = 0; i < game.ballistics.length; i++){
							game.ballistics[i].setPostMovePosition();
						}
						game.draw();
					}
				}
				else if (e.keyCode == 109){ // m, cancel move animation
					if (game.phase == 1 || game.phase == 2){
						window.cancelAnimationFrame(anim);
						for (var i = 0; i < game.ships.length; i++){
							game.ships[i].deployed = true;
							game.ships[i].setPostMovePosition();
							game.ships[i].setPostMoveFacing();
						}
					}
					game.deployDone();
				}
				else if (e.keyCode == 43){ // +
					if (game.phase == 0 || game.phase == 1){
						if (game.turnMode){
							game.getUnitById(aUnit).doShortenTurn(false);
						}
					}
				}
				else if (e.keyCode == 45){ // *
					if (game.phase == 0 || game.phase == 1){
						if (game.turnMode){
							game.getUnitById(aUnit).doUndoShortenTurn(false);
						}
					}
				}
			}
		});
	}

</script>