<?php

	include_once 'global.php';


	$gameid = $_GET["gameid"];
	$userid;

	if (isset($_SESSION["userid"])) {
		$userid = $_SESSION["userid"];
	} else $userid = 0;
	//if (!$manager->turn){header("Location: lobby.php");}
	echo "<script> window.gameid = ".$gameid."; window.userid = ".$userid.";</script>";



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
	<script src='mixed.js'></script>
	<script src='salvo.js'></script>
	<script src='flights.js'></script>
	<script src='squadron.js'></script>
	<script src='systems.js'></script>
	<script src='graphics.js'></script>
	<script src='cam.js'></script>
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
		</div>
		<div id="phaseSwitchDiv" style="width: 100%; height: 100%">
			<div id="phaseSwitchInnerDiv">
			</div>
		</div>
		<div class="chatWrapper disabled">
			<div class="chatBox">
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
			<div class="sendWrapper">
				<input id="msg" placeholder ="chat here" type="text">
			</div>
		</div>
		<div id="plusImpulse" class="ui disabled">
			<img src="varIcons/plus.png" style="width: 25px; height: 25px">
		</div>
		<div id="minusImpulse" class="ui disabled">
			<img src="varIcons/minus.png" style="width: 25px; height: 25px">
		</div>
		<div id="doUndoLastAction" class="ui disabled">
			<img src="varIcons/destroyed.png" style="width: 25px; height: 25px">
		</div>
		<div id="roll" class="ui disabled">
			<img src="varIcons/roll.png" style="width: 40px; height: 40px">
		</div>
		<div id="flip" class="ui disabled">
			<img src="varIcons/flip.png" style="width: 40px; height: 40px">
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
			<!---
				<tr>
					<th style="text-align: left">
						Cost / 1°
					</th>
					<th id="turnCost" style="width: 55px, text-align: center">
					</th>
				</tr>
				<tr>
					<th style="text-align: left">
						Delay / 1°
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
				s			<img class="size20" src="varIcons/plusWhite.png">
						</div>
					</td>
					<td>
						<div class="doUndoShortenTurn">
							<img class="size20" src="varIcons/minusWhite.png">
						</div>
					</td>
				</tr>
			-->
			</table>
		</div>
		<div id="epButton" class="turnEle ui disabled">
			<table style="margin:auto; width: 100%;">
				<tr>
					<th style="width: 60%; text-align: left">
						 Eff. Turn Ability 
					</th>
					<th id="remEP" style="text-align: center">
					</th>
				</tr>
				<tr>
					<th id="impulseText" style="text-align: left">
						 Cost : Rem 
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
		<div id="shortenInfo" class="ui disabled">
			<div></div>
		</div>
		<div id="doShorten" class="ui disabled">
			<div></div>
		</div>
		<div id="upperGUI" class="disabled">
			<table id="overview">
				<thead>
					<tr>
						<th width="10%">
							Turn
						</th>
						<th width="70%">
							Phase
						</th>
						<th width="20%">
							PV
						</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>

		<div id="unitGUI" class="disabled">
		</div>

		<div id="canvasDiv" class="disabled">
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
					<th width=20%>Section</th>
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
					<th>Base</th>
					<th>Thrust Mod</th>
					<th>Lock Mod</th>
					<th>Mask Mod</th>
					<th>Result</th>
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
					<th width=12%>Final</th>
				</tr>
			</table>
		</div>
		<div id="combatlogWrapper" class="disabled">
			<table class="combatLogHeader">
				<thead>
					<tr>
						<th style="border-bottom: 1px solid white;" colSpan=9>Combat Log</th>
					</tr>
					<tr>
						<th style="border-left: 1px solid white;" width=50px>Type</th>
						<th width=105px>Shooter</th>
						<th width=105px>Target</th>
						<th width=160px>Weapon</th>
						<th width=70px>Chance</th>
						<th width=60px>Hits</th>
						<th width=70px>Armour</th>
						<th width=70px>System</th>
						<th style="border-right: 1px solid white" width=70px>Hull</th>
					</tr>
				</thead>
			</table>
			<div id="combatlogInnerWrapper">
				<table id="combatLog">
					<tbody>
						<tr style="height: 10px">
							<th width=50px></th>
							<th width=105px></th>
							<th width=105px></th>
							<th width=160px></th>
							<th width=60px></th>
							<th width=60px></th>
							<th width=70px></th>
							<th width=70px></th>
							<th width=70px></th>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div id="deployLogWrapper" class="disabled">
			<table id="deloyLog">
				<tr>
					<th width=100%>val</th>
				</tr>
			</table>
		</div>
		<div id="deployWrapper">
			<table id="deployTable">
				<thead>
					<tr>
						<th class="head" colSpan=3>
							Incoming Units
						</th>
					</tr>
					<tr>
						<th  width="50%" colSpan="2">
							Class
						</th>
						<th colSpan=2 width="20%">
							ETA
						</th>
					</tr>
				</thead>
			</table>
			<table id="reinforceTable">
				<thead>
					<tr>
						<th colSpan=4>
							Reinforcements
						</th>
					</tr>
					<tr>
						<th  width="65%" colSpan="2">
							Class
						</th>
						<th  width="17%" >
							ETA
						</th>
						<th  width="18%" >
							Cost
						</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
				</table>
			</div>
			<div id="deployOverlay" class="disabled">
				<span id="deployType"></span>	
				<span id="deployTarget"</span>	
				<div class="img"></div>			
			</div>
			<div id="vectorDiv" class="disabled"></div>
			<div id="hangarDiv" class="disabled">
				<div class="header">
					<span>Assemble and launch a flight</span>
					<br>
					Can launch up to <span id="launchRate"></span> units per cycle.
					<br>
					Sufficient space for <span id="capacity"></span> units.
				</div>
				<table id="hangarTable">
				</table>
				<div id ="missionType">
					<table style="border: 1px solid white">
						<tr><th colSpan=3>Select Mission Type</th></tr>
						<tr><td></td><td width=70%>Patrol location</td><td></td></tr>
						<tr><td></td><td>Strike / Escort / Intercept unit</td><td></td></tr>
					</table>
				</div>
				<div class="header">
					<div class="buttonTD disabled" onclick="game.enableFlightDeploy()">Launch Flight</div>
				</div>
			</div>
			<div id="crewDiv" class="disabled">
				<div class="header">
					Add crew specialists to the selected unit
				</div>
				<table id="crewTable">
				</table>
				<table style="margin:auto; width: 220px; margin-top: 10px">
					<tr><td class="buttonTD" onclick='game.ships[0].doConfirmSystemLoadout()'>Confirm Training</td></tr>
				</table>
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

	function showUI(){
		$("#mouseCanvas").on("mouseleave", function(){
			$("#weaponAimTableWrapper").hide();
		})

		$("#combatlogWrapper")
			.find("#combatLog")
				.contextmenu(function(e){
					e.preventDefault(); e.stopPropagation();
				}).end()
				.find(".combatLogHeader").contextmenu(function(e){
					e.preventDefault(); e.stopPropagation();
					$(this).parent().find("#combatLog").toggleClass("disabled");
				});

		$("#combatlogWrapper").drag();

		$("#upperGUI").removeClass("disabled")
		$("#canvasDiv").removeClass("disabled")

		$("#roll")
		.click(function(){
			game.getUnit(aUnit).doRoll()
		});
		
		$("#flip")
		.click(function(){
			game.getUnit(aUnit).doFlip()
		});

		$("#doUndoLastAction")
		.click(function(){
			game.getUnit(aUnit).doUndoLastAction()
		});


		$("#plusImpulse")
		.click(function(){
			game.getUnit(aUnit).doIncreaseImpulse();
		});

		$("#minusImpulse")
		.click(function(){
			game.getUnit(aUnit).doDecreaseImpulse();
		});

		$("#turnButton")
		.click(function(){
			game.getUnit(aUnit).switchTurnMode();
		})

	/*	$(".doTurn")
		.click(function(){
			//console.log("issueTurn")
		//	game.getUnit($(this).data("shipid")).issueTurn($(this).data("a"))
		//	game.getUnit($(this).data("shipid")).switchTurnMode();

		})

		$("#doShorten")
		.click(function(){
			game.getUnit(aUnit).doShortenTurn();
		})
		.contextmenu(function(e){
			e.stopPropagation(); e.preventDefault();
			game.getUnit(aUnit).doUndoShortenTurn();
		})
	*/


	$("#maxCutVector")
	.click(function(){
		//console.log("maxVector")
		game.getUnit($(this).data("shipid")).moveInVector($(this).data("dist"));
	})	
	$("#maxTurnVector")
	.click(function(){
		//console.log("maxVector")
		game.getUnit($(this).data("shipid")).moveToMaxTurnVector();
	})	
	$("#maxVector")
	.click(function(){
		//console.log("maxVector")
		game.getUnit($(this).data("shipid")).moveToMaxVector();
	})

	$("#popupWrapper")
		.css("left", res.x / 2 - 300)
		.css("top", res.y / 2 - 300)
		.contextmenu(function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).hide();
		});

	$("#instructWrapper")
		.css("left", res.x / 2 - 300)
		.css("top", res.y / 2 - 300)
		.contextmenu(function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).hide();
		});

	$("#hangarDiv").drag()
	$("#crewDiv").drag()
}
	
	function initiateKeyDowns(){
		$(this).keypress(function(e){
			if ($(":focus").attr("id") == ("msg")){
				if (e.keyCode == 13){ajax.doChat();}
				else return;
			}
			else if (game){
				if (e.keyCode == 101){ // e - disable unit circle
					game.drawCircle = !game.drawCircle;
					game.redraw();
				}
				if (e.keyCode == 117){ // u - disable movement UI
					game.toggleUI();
				}
				else if (e.keyCode == 113){ // q - show friendly sensor
					if (!game.animating && !game.sensorMode){
						//game.drawShipOverlays();
						game.drawAllSensorSettings(1);
					}
				}
				else if (e.keyCode == 119){ // w - show hostile sensor
					if (!game.animating && !game.sensorMode){
						//game.drawShipOverlays();
						game.drawAllSensorSettings(0);
					}
				}
				else if (e.keyCode == 32){ // space - dist logger
					if (game.vector){
						game.vector = false;
						$("#vectorDiv").addClass("disabled");
						mouseCtx.clearRect(0, 0, res.x, res.y);
					}
					else {
						game.vector = true;
						$("#vectorDiv").removeClass("disabled");
					}
				}
				else if (e.keyCode == 102){ // f, cancel fire animation
					if (game.phase == 3 && game.animating){
						game.animating = false;
						window.cancelAnimationFrame(anim);
						fxCtx.clearRect(0, 0, res.x, res.y);
						$("#combatLog").find("tr").each(function(i){
							if (i){
								$(this).remove()
							}
						})
						for (var i = 0; i < game.fireOrders.length; i++){
							game.fireOrders[i].animated = 1;
							game.fireOrders[i].weapon.createCombatLogEntry(game.fireOrders[i]);
						}

						game.createFireFinalEntry();

						for (var i = 0; i < game.unitExploAnims.length; i++){
							for (var j = 0; j < game.unitExploAnims[i].entries.length; j++){
								game.unitExploAnims[i].entries[j].u.doDraw = 0;
							}
							game.createMiscLogEntry(i);
						}

						game.fireResolved();
					}
				}
				else if (e.keyCode == 109){ // m, cancel move animation
					if (game.phase == 1 || game.phase == 2){
						window.cancelAnimationFrame(anim);
						for (var i = 0; i < game.ships.length; i++){
							if (!game.ships[i].actions.length){continue;}
							game.ships[i].drawX = game.ships[i].actions[game.ships[i].actions.length-1].x;
							game.ships[i].drawY = game.ships[i].actions[game.ships[i].actions.length-1].y;
							game.ships[i].drawFacing = game.ships[i].getPlannedFacing();
						}

						game.animShip = 1; game.animFlight = 1; game.animSalvo = 1;
						game.endMoveSubPhase();
						game.animShip = 0; game.animFlight = 0; game.animSalvo = 0;

						game.movementDone();
						//game.draw();
					}
				}
			}
		});
	}

</script>