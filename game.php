<?php

	include_once $_SERVER["DOCUMENT_ROOT"]."/fire/global.php";


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
	<script src='squaddie.js'></script>
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
		<div class="optionsWrapper">
			<div class="options drawFriendlyEW">
				<img src=sysIcons/Sensor.png style="background-color: green">
			</div>
			<div class="options drawHostileEW">
				<img src=sysIcons/Sensor.png style="background-color: red">
			</div>
			<div class="options drawMoves">
				<img src=varIcons/plan.png>
			</div>
			<div class="options distMeter">
				<img src=varIcons/dist.png>
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
			<img src="varIcons/destroyed.png" style="width: 40px; height: 40px; margin-left: -40px">
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
						<th>
							Turn
						</th>
						<th>
							Phase
						</th>
						<th>
							PV
						</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>

		<div id="unitSelector" class="disabled">
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
				<tr>
					<th>Thrust Mod</th>
					<th>Lock Mod</th>
					<th>Mask Mod</th>
					<th>Base %</th>
					<th>FINAL</th>
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
		<div id="combatLogWrapper" class="disabled">
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
			<div id="combatLogInnerWrapper">
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
			<div class="reinforceWrapper">
				<table class="reinforceHead">
					<thead>
						<tr>
							<th colSpan=4>
								Reinforcements
							</th>
						</tr>
						<tr>
							<th  width="60%" colSpan="2">
								Class
							</th>
							<th  width="17%">
								ETA
							</th>
							<th>
								Cost
							</th>
						</tr>
					</thead>
				</table>
				<div class="reinforceBodyWrapper">
					<table id="reinforceBody">
						<tbody>
						</tbody>
					</table>
				</div>
				<div style="padding: 5px">
					<div style="display: inline-block; font-size: 20px; width: 150px; text-align: center">Total Cost</div>
					<div id="totalRequestCost">0</div>
				</div>
			</div>
		</div>
		<div id="deployOverlay">
			<span id="deployType"></span>	
			<span id="deployTarget"></span>	
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
			<div class="missionContainer">
				<div class="missionOption" style='margin-top: 10px'">
					<input type="radio" name="mission" value=1></input>
					<span>Patrol location</span>
				</div>
					<div class="missionOption" style='margin-top: 10px; margin-bottom: 10px'">
					<input type="radio" name="mission" value=2></input>
					<span>Strike / Escort / Intercept</span>
				</div>
					<input type="button" value="Launch Flight" onclick="game.enableFlightDeploy()"></input>
	
			</div>
		</div>
		<div id="crewDiv" class="disabled">
			<div class="header">
				Add crew specialists to the selected unit
			</div>
			<table id="crewTable">
			</table>
			<table style="margin:auto; width: 220px; margin-top: 10px">
				<tr><td><input type="button" value="Close" onclick='$(this).parent().parent().parent().parent().parent().toggleClass("disabled");'></td></tr>
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

		$(".missionOption").mousedown(function(e){
			e.stopPropagation();
		})

		$("input[type=button").mousedown(function(e){
			e.stopPropagation();
		})

		$("input[type=radio").mousedown(function(e){
			e.stopPropagation();
		})

		$("#combatLogWrapper")
			.find("#combatLog")
				.contextmenu(function(e){
					e.preventDefault(); e.stopPropagation();
				}).end()
				.find(".combatLogHeader").contextmenu(function(e){
					e.preventDefault(); e.stopPropagation();
					$(this).parent().find("#combatLog").toggleClass("disabled");
				});

		$("#combatLogWrapper").drag();

		$("#upperGUI").removeClass("disabled")
		$("#canvasDiv").removeClass("disabled")

		ui.deployOverlay.hide();

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
		.contextmenu(function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).hide();
		});

	$("#instructWrapper")
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
				if (e.keyCode == 101){ // e
					game.toggleDrawMovePaths();
				}
				if (e.keyCode == 117){ // u
					game.toggleUI();
				}
				else if (e.keyCode == 113){ // q
					game.toggleFriendlyEW();
				}
				else if (e.keyCode == 119){ // w
					game.toggleHostileEW();
				}
				else if (e.keyCode == 32){ // space
					game.toggleDistMeter();
				}
				else if (e.keyCode == 102){ // f
					if (game.phase != 3 || !game.animating){return;}

					game.animating = false;
					window.cancelAnimationFrame(anim);
					fxCtx.clearRect(0, 0, res.x, res.y);

					$("#combatLog").find("tr").each(function(i){if (i){$(this).remove()}});

					for (var i = 0; i < game.fireOrders.length; i++){
						game.fireOrders[i].animated = 1;
						game.fireOrders[i].weapon.createCombatLogEntry(game.fireOrders[i]);
					}

					game.createFireFinalEntry();

					if (game.unitExploAnims.length){
						game.createPlaceHolderEntry();
						for (var i = 0; i < game.unitExploAnims.length; i++){
							game.unitExploAnims[i].done = 1;
							game.unitExploAnims[i].animating = 0;
							for (var j = 0; j < game.unitExploAnims[i].entries.length; j++){
								game.unitExploAnims[i].entries[j].u.doDestroy();
							}
							
							game.createMiscLogEntry(i);
						}
					}

					game.fireResolved();
				}
				else if (e.keyCode == 109){ // m, cancel move animation
					if (!game.animating){return;}
					if (game.phase < 1 || game.phase > 2){return;}

					window.cancelAnimationFrame(anim);
				/*	for (var i = 0; i < game.ships.length; i++){
						if (game.ships[i].focus+1 > game.phase){continue;}
						game.ships[i].setPostMovePosition();
						game.ships[i].drawFacing = game.ships[i].getPlannedFacing();
					}
*/
					game.animShip = 1; game.animFlight = 1; game.animSalvo = 1;
					game.endMoveSubPhase();
					game.animShip = 0; game.animFlight = 0; game.animSalvo = 0;

					game.moveResolved();
					game.draw();
				}
			}
		});
	}

</script>