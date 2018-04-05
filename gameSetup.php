<?php

include_once 'global.php';

if (isset($_SESSION["userid"])){
	$gameid = $_GET["gameid"];
	$playerid = $_SESSION["userid"];

	$_SESSION["gameid"] = $_GET["gameid"];
	echo "<script>var gameid = ".$gameid."; var playerid = ".$playerid.";</script>";
	$dbManager = DBManager::app($gameid);
	$game = $dbManager->getGameDetails($gameid);
	if (!$game){
		header("Location: lobby.php");
	}

	if ($game["status"] == "active"){
		header("Location: game.php?gameid=".$game["id"]);
	}
	$manager = new Manager($playerid);
	$players = $dbManager->getPlayersInGame($gameid);
	echo "<script>";
	echo "window.players = ".json_encode($players).";";
	echo "window.factions = ".json_encode($manager->getFactions()).";";
	echo "window.maxPoints = ".$game["pv"].";";
	echo "window.userid = ".$playerid.";";
	echo "</script>";
	$joined = false;
	$ready = false;

	$element = "<table class='gameSetupStatus'";
	$element .= "<tr>";
	$element .= "<th colSpan=2 style='font-size: 20px; border: 2px solid white'>".$game["name"]."</th>";
	$element .= "</tr>";
	$element .= "<tr>";
	$element .= "<th colSpan=2 style='font-size: 20px; border: 2px solid white'>".$game["pv"]." PV + ".$game["reinforce"]." PV @ Turn ".$game["reinforceTurn"]."</th>";
	$element .= "</tr>";

	$element .= "<tr>";
	$element .= "<th width='80%'>Player Name</th>";
	$element .= "<th>Status</th>";
	$element .= "</tr>";

	if (!$players){
		$element .= "<tr>";
		$element .= "<td colSpan='2'>No Player ingame yet</td>";
		$element .= "</tr>";
	}
	else {
		foreach ($players as $player){
			if ($player["userid"] == $playerid) {
				if ($player["status"] == "ready") {
					$ready = true;
				}
				else if ($player["status"] == "joined") {
					$joined = true;
				}
			}
			$element .= "<tr>";
			$element .= "<td style='border-bottom: 1px solid white; text-align: center'>".$player["username"]."</td>";

			$status = $player["status"];
			if ($status == "ready"){
				$element .= "<td style='color: black; background-color: lightGreen; border-bottom: 1px solid white; text-align: center'>".$status."</td>";

			}
			else if ($status == "joined"){
				$element .= "<td style='color: black; background-color: yellow; border-bottom: 1px solid white; text-align: center'>".$status."</td>";
			}

			$element .= "</tr>";
		}
	}

	if ($ready){}
	else if ($joined){$element .= "<tr><td colSpan=2><div class='buttonTD' onclick='leaveGame()'>Leave Game</div></td></tr>";}
	else {$element .= "<tr><td colSpan=2><div class='buttonTD' onclick='joinGame()'>Join Game</div></td></tr>";}
	
	//$element .= "<tr><td colSpan='2' class='buttonTD' onclick='window.goToLobby()'>Return to Lobby</td></tr>";	

	$element .= "<tr><td colSpan=2><div class='buttonTD' onclick='window.goToLobby()'>Return to Lobby</div></td></tr>";	

	$element .= "</table>";

	if ($ready){echo "<script> window.ready = true;</script>";}
	else if ($joined){echo "<script> window.joined = true;</script>";}

}
else {
	$element = "<span>PLEASE LOGIN</span>";
}
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
</head>
	<body style="padding: 10px">
		<div id ="popupWrapper">
			<div id="popupText">
			</div>
		</div>
		<div id="nameWrapper">
			<table>
				<tr><th>Please name this unit</th></tr>
				<tr><td class="name"><input type="form"></td></tr>
				<tr><td class="buttonTD" onclick="doConfirmPurchase()">Confirm Unit Selection</td></td>
			</table>
		</div>
		<table style="width: 700px; top: 200px">
			<tr>
				<td style="vertical-align: top;">
					<div style="margin: auto">
						<?php echo $element; ?>
					</div>
				</td>
				<td style="vertical-align: top; padding-left: 30px">
					<div id="reinforceFaction" class="disabled"></div>
					<div>
						<table id="shipsBoughtTable">
							<tr>
								<th colSpan=2 style="width: 350px">
									Current Fleet Selection
								</th>
							</tr>
							<tr>
								<td style='font-size: 18px'>
									Total Cost:
								</td>
								<td id="totalFleetCost" style="width:60px">
									0
								</td>
							</tr>
							<tr class="buttonTD disabled" onclick="confirmFleetPurchase()">
								<th>Confirm Fleet Selection</th>
								<th id="remPV"></th>
							</tr>
						</table>
					</div>
				</td>
			</tr>
		</table>
		<table style="position: absolute; top: 215px">
			<tr>
				<td>
					<div id="factionDiv">			
					</div>
				</td>
			</tr>
		</table>
		<div id="game" style="position: absolute; top: 13px; left: 825px">
			<canvas id="shipCanvas" style='border: 1px solid white; z-index: 2'></canvas>
			<canvas id="fxCanvas" style='z-index: 1'></canvas>
		</div>
		<div id="hangarDiv" class="disabled">
			<div class="header">
				<span>Configure Fighter loadout.</span>
				<br>
				Can launch up to <span id="launchRate"></span> units per cycle.
				<br>
				Sufficient space for <span id="capacity"></span> units.
			</div>
			<table id="hangarTable">
			</table>
			<div class="header">
				<div class="buttonTD disabled" onclick="game.ships[0].doConfirmSystemLoadout()">Confirm Loadout</div>
			</div>
		</div>
		<div id="weaponDiv" class="disabled">
			<div class="header">
				Pick Ammunition for the selected weapon
			</div>
			<table id="weaponTable">
			</table>
			<table style="margin:auto; width: 220px; margin-top: 10px">
				<tr><td class="buttonTD disabled" onclick='game.ships[0].doConfirmSystemLoadout()'>Confirm Loadout</td></tr>
			</table>
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
	graphics.preload();

	$(document).ready(function(){

		$("#popupWrapper")
			.css("left", 700)
			.css("top", 300)
			.contextmenu(function(e){
				e.preventDefault();
				e.stopPropagation();
				$(this).hide();
			});

		$("#nameWrapper").css("left", 800).css("top", 300)
		$("#hangarDiv").drag();
		$("#weaponDiv").drag();
		$("#crewDiv").drag();

		if (window.ready){
			$("#shipsBoughtTable").hide();
			$("#game").hide();
		}
		else if (window.joined){
			window.turn = new Turn();
			window.preview = true;
			window.aUnit = 1;
			window.res = {x: 200, y: 200};
			window.game = {
				turn: 0,
			 	phase: -2,
				ships: [],				
				shipsBought: [],
				userid: window.userid,
				faction: "",
				arcRange: res.x/2,
				canSubmit: 0,
				system: 0,
				fighters: [],
				ballistics: [],

				getUnitName: function(){
					if (this.ships[0].ship){return this.ships[0].name;
					} else return "Squadron";
				},

				getSampleSubUnit: function(name){
					for (let i = 0; i < this.fighters.length; i++){
						if (this.fighters[i].name == name){return this.fighters[i];}
					}
					for (let i = 0; i < this.ballistics.length; i++){
						if (this.ballistics[i].name == name){return this.ballistics[i];}
					}
				},
				
				getUnitDisplay: function(){
					if (this.ships[0].ship){return this.ships[0].name;
					} else var html = "Squadron (";
					for (var i = 0; i < this.ships[0].structures.length; i++){html +=  this.ships[0].structures[i].name + "/";}
					return html.substr(0, html.length-1) + ")";
				},

				getUnitClass: function(){
					if (this.ships[0].ship){return "Ship";
					} else return "Squadron";
				},

				getUnit: function(id){	
					return this.ships[0];
				},
				getUnitType: function(val){
					return Game.prototype.getUnitType.call(this, val);
				},

				setReinforceFaction: function(faction){
					if (faction.length < 3){return;}
					game.faction = faction;
					$("#reinforceFaction").removeClass("disabled").html("Reinforcements: " + faction);
				},
				
				getFleetCost: function(){
					var cost = 0;
					for (var i = 0; i < window.game.shipsBought.length; i++){
						cost += window.game.shipsBought[i].value;
					}
					return cost;
				},

				canSubmit: function(){
					var fleetCost = game.getFleetCost();
					if (fleetCost && fleetCost <= window.maxPoints){
						$("#shipsBoughtTable").find(".buttonTD").removeClass("disabled");
					}
					else {$("#shipsBoughtTable").find(".buttonTD").addClass("disabled");}
				},

				getFleetCost: function(){
					return this.shipsBought.map(x => x.value).reduce((l,r) => l+r, 0);
				},

				setUnitTotal: function(){
					var table = document.getElementById("totalShipCost");
						table.innerHTML = "";
					game.ships[0].totalCost = game.ships[0].cost;
					game.ships[0].upgrades = [];
					game.ships[0].setBuyData();

					var tr = table.insertRow(-1);

					//if (game.ships[0].ship){
						tr.insertCell(-1).innerHTML = "<th>Base Unit Cost</th>";
						tr.insertCell(-1).innerHTML = game.ships[0].cost;
					//} 
					//else {
					//	tr.insertCell(-1).innerHTML = "<th>Squadron Setup</th>"; tr.childNodes[0].colSpan = 2;
					//}

					$(table).append(game.ships[0].getBuyTableData(table))

					if (game.ships[0].squad && game.ships[0].structures.length > 2){
						var size = game.ships[0].structures.length;
						var mod = 0;
						if (size == 3){mod = 8;} else if (size == 4){mod = 12;}
						var extra = Math.floor(game.ships[0].totalCost / 100 * mod);

						var tr = table.insertRow(-1);
							tr.insertCell(-1).innerHTML = "Squadron size: " + size + ", total cost +" + mod + "%";
							tr.insertCell(-1).innerHTML = extra;

							game.ships[0].totalCost += extra
					}

					$(table).append(
						$("<tr>")
							.append($("<th>").html("Total Unit Cost").css("font-size", 20))
							.append($("<th>").html(game.ships[0].totalCost).css("font-size", 20)))


					var tr = table.insertRow(-1);
					var button = tr.insertCell(-1);
						button.innerHTML = "Confirm Setup";
						button.className = "buttonTD";
						button.colSpan = 2;
						$(button).click(function(){
							window.confirmPurchase();
						});
				},


				buildShipList: function(data, t){
					for (var i = 0; i < data.length; i++){
						$(t).append(
							$("<tr>")
								.hover(function(){
									$(this).toggleClass("highlight");
								})
								.append($("<td>").html(data[i]["name"]))
								.append($("<td>").html(""))
								.append($("<td>").html(data[i]["ep"]))
								.append($("<td>").html(data[i]["ew"]))
								.append($("<td>").html(data[i]["value"]))
								.append($("<td>").html("Select")
									.data("name", data[i]["name"])
									.data("value", data[i]["value"])
									.hover(function(){$(this).toggleClass("selectionHighlight");})
									.click(function(){requestSingleUnitData($(this).data("name"));})
								)
							)
						}
				},

				buildSquadList: function(data, t){
					$(t).append(
						$("<tr>")
							.hover(function(){
								$(this).toggleClass("highlight");
							})
							.css("border", "1px solid")
							.append($("<td>").html("Squadron"))
							.append($("<td>").html("Can hold a Command Value of up to 10")
								.attr("colSpan", 4))
							.append($("<td>").html("Select")
								.data("name", "Squadron")
								.data("value", 0)
								.hover(function(){
									$(this).toggleClass("selectionHighlight");
								})
								.click(function(){requestSingleUnitData($(this).data("name"));})
							)
					)

					for (var i = 0; i < data.length; i++){
						$(t).append(
							$("<tr>")
								.hover(function(){
									$(this).toggleClass("highlight");
								})
								.append($("<td>").html(data[i]["name"]))
								.append($("<td>").html(data[i]["space"] + " CP"))
								.append($("<td>").html(data[i]["ep"]))
								.append($("<td>").html(data[i]["ew"]))
								.append($("<td>").html(data[i]["value"]))
								.append($("<td>").html("Select")
									.data("name", data[i]["name"])
									.data("value", data[i]["value"])
									.data("space", data[i]["space"])
									.hover(function(){$(this).toggleClass("selectionHighlight");})
									.click(function(){requestSquadUnit($(this))})
								)
							)
						}
				},

				buildFighterList: function(data, t){
					for (var i = 0; i < data.length; i++){
						var fighter = initFighter(data[i]);;
						this.fighters.push(fighter);
					}
				},
				buildBallisticList: function(data, t){
					for (var i = 0; i < data.length; i++){
						var ballistic = initBallistic(data[i]);;
						this.ballistics.push(ballistic);
					}
				},
			}

			initPreviewCanvas();
			initFactionTable();
		} else $("#game").hide();
	})


	function initFactionTable(){
		var icons = [graphics.images.earth, graphics.images.centauri, graphics.images.minbari, graphics.images.narn, graphics.images.shadows];		

		var table = document.createElement("table"); 
			table.className = "factionUpperTable";
		var tr = document.createElement("tr"); 
		var th = document.createElement("th");
			th.style.fontSize = "30px";
			th.colSpan = 3;
			th.innerHTML = "Assemble Your Fleet"; tr.appendChild(th); table.appendChild(tr);

		for (var i = 0; i < factions.length; i++){
			$(table)
				.append(
					$("<tr>")
						.data("row", i)
						.data("faction", i)
						.data("set", 0)
						.hover(function(){
							$(this).toggleClass("highlight");
						})
						.click(function(){
							if ($(this).data("set") == 1){
								showShipList($(this));
							}
							else {
								requestShipsForFaction(this, buildUnitList);
							}
						})
						.contextmenu(function(e){
							e.stopPropagation(); e.preventDefault();
							game.setReinforceFaction(factions[$(this).data("faction")]);
						})
						.append(
							$("<td>")
							.append(
								$(icons[i]))
						)
						.append(
							$("<td>")
							.css("fontSize", 20)
							.css("width", "40%")
							.html(factions[i])
						)
						.append(
							$("<td>")
							.html('<img src="' + icons[i].src + '"></img>')
						)
					)
				.append(
					$("<tr>")
						.addClass("disabled")
						.append(
							$("<td>")
							.attr("colSpan", 3)
							.append(
								$("<table>")
									.addClass("factionSubTable ")
									.attr("id", i)
									.append(
										$("<tr>")
											.append($("<th>").css("width", 90).html("Class"))
											.append($("<th>").html(""))
											.append($("<th>").css("width", 80).html("Turning"))
											.append($("<th>").css("width", 80).html("Sensor"))
											.append($("<th>").css("width", 50).html("Cost"))
											.append($("<th>").html("")
											)
										)
									)
								)
							)
			$("#factionDiv").append(table);
		}
	}

	function confirmFleetPurchase(){
		//if (!game.canSubmit){return;}
		//else if (game.faction.length > 2){
			/*for (var i = 0; i < game.shipsBought.length; i++){
				for (var j = game.shipsBought[i].upgrades.length-1; j >= 0; j--){
					if (game.shipsBought[i].upgrades[j].loads.length == 0){
						game.shipsBought[i].upgrades.splice(j, 1);
					}
				}
			}*/
			game.canSubmit = 0;
			ajax.confirmFleetPurchase(playerid, gameid, window.game.shipsBought, redirect);
		//}
		//else popup("Please also pick your reinforcement faction </br>(right click the faction name on the left menu).");
	}

	function requestSingleUnitData(name){
		//console.log("requestSingleUnitData");
		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
					type: "shipdata",
					unit: "ship",
					index: 0,
					name: name,
					},
			success: showShipDiv,
			error: ajax.error,
		});
	}

	function requestSquadUnit(ele){
		if (game.ships[0] == undefined || !game.ships[0].squad){return;}
		else if (game.ships[0].structures.length >= 4){popup("A squadron can only contain up to 4 units.");return;}
		else if (game.ships[0].slots[0] + $(ele).data("space") > game.ships[0].slots[1]){
			popup("A squadron has a maximum Command Value of " + game.ships[0].slots[1]+".</br>Adding another " + $(ele).data("name") + " would bring the required Command Value to " + (game.ships[0].slots[0] + $(ele).data("space"))) ;return;}

		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
					type: "shipdata",
					unit: "squaddie",
					index: game.ships[0].index,
					name: $(ele).data("name"),
					},
			success: addUnitToSquadron,
			error: ajax.error,
		});
	}

	function showShipDiv(data){
		$(".shipDiv").remove();
		$("#nameWrapper").hide().find("input").attr("placeholder", "Callsign")
		$("#hangarDiv").addClass("disabled");
		$("#weaponDiv").addClass("disabled");
		$("#crewDiv").addClass("disabled");
		$("#hangarTable").html("");

		var ship = window.initUnit(JSON.parse(data));
			game.ships[0] = ship;
			game.system = 0;

			ship.actions.push(new Move(-1, "deploy", 0, res.x/2, res.y/2, 0, 0, 0, 1, 1, 1));
			ship.setUnitState();
			ship.setSubSystemState();
			ship.create();
			ship.setImage();
			ship.createBaseDiv();
			ship.previewSetup();
			drawShipPreview();

		if (ship.squad){$(ship.element).find(".ep").html("0 / 0");}

		$("#game").show();
		$(".shipDiv")
			.css("left", "450px").css("top", "220px").removeClass("disabled")
			.find(".structContainer").show();

		var div = document.createElement("div");
			div.style.border = "1px solid white";
		var table = document.createElement("table");		
			table.id = "totalShipCost";

		div.appendChild(table);

		game.ships[0].element.appendChild(div);
		window.game.setUnitTotal();

	}

	function addUnitToSquadron(data){
		var sub = window.initSquaddie (JSON.parse(data));
			sub.create();

		game.ships[0].structures.push(sub);
		game.ships[0].index = sub.index;
		game.ships[0].setLayout();
		game.ships[0].setSubElements();
		game.ships[0].setStats();
		game.ships[0].setSubSystemState();
		sub.expandElement();
		sub.previewSetup();

		window.game.setUnitTotal();
	}

	function confirmPurchase(){
		var cur = game.getFleetCost();
		var add = game.ships[0].totalCost;
		var max = window.maxPoints;

		if (game.ships[0].squad && game.ships[0].structures.length < 2){
			popup("A squadron needs to include at least 2 units.");
		} else if (cur + add > max){
			popup("You have insufficient point value left");
		}
		else {window.addNameToUnit();}
	}

	function addNameToUnit(){
		$("#nameWrapper").show().find("input").val("").focus();
	}

	function doConfirmPurchase(){
		game.ships[0].call = $("#nameWrapper").find("input").val();

		var ship = {
			type: game.getUnitClass(),
			name: game.getUnitName(),
			display: game.getUnitDisplay(),
			call: game.ships[0].call,
			faction: game.ships[0].faction,
			value: game.ships[0].totalCost,
			purchaseId: window.game.shipsBought.length,
			upgrades: game.ships[0].getAllUpgrades(),
			turn: 1,
			eta: 0,
		}

		window.game.shipsBought.push(ship);

		var tr = document.createElement("tr");
		$(tr).data("purchaseId", window.game.shipsBought[window.game.shipsBought.length-1].purchaseId)
			.hover(function(e){
				$(this).toggleClass("fontHighlight");
			})
			.click(function(e){
				e.preventDefault(); e.stopPropagation();
				removeShipFromFleet($(this));
			})

		var td = tr.insertCell(-1)
			td.innerHTML = ship.display + " " + game.ships[0].getCallSign();
		var td = tr.insertCell(-1)
			td.innerHTML = ship.value;
		tr.appendChild(td);

		var target = document.getElementById("totalFleetCost");
			target.parentNode.parentNode.insertBefore(tr, target.parentNode);
			$(target).html(game.getFleetCost());

		$(".shipDiv").remove();
		$("#remPV").html("(" + (window.maxPoints - game.getFleetCost()) + ")");
		$("#nameWrapper").hide();
		$("#game").addClass("disabled");
		$("#hangarDiv").addClass("disabled");
		$("#hangarTable").html("");
		$("remPV").html("");
		if (game.faction == ""){game.setReinforceFaction(game.ships[0].faction);}
		game.ships[0] = undefined;
		game.system = 0;
		game.canSubmit();
	}

	function removeShipFromFleet(ele){
		for (var i = window.game.shipsBought.length; i--; i > 0){
			if (window.game.shipsBought[i].purchaseId == $(ele).data("purchaseId")){
				window.game.shipsBought.splice(i, 1);
				$(ele).remove();
				break;
			}
		}
		$("#totalFleetCost").html(game.getFleetCost());
		$("#remPV").html("(" + (window.maxPoints - game.getFleetCost()) + ")");
		game.canSubmit();
	}
	

	function initPreviewCanvas(){
		var c = document.getElementsByTagName("canvas");
		for (var i = 0; i < c.length; i++){
			c[i].width = res.x;
			c[i].height = res.y;
			c[i].style.width = res.x;
			c[i].style.height = res.y;
		}

		window.fxCanvas = document.getElementById("fxCanvas");
		window.fxCtx = fxCanvas.getContext("2d");
		window.fxCanvas.style.opacity = 0.4;
		window.shipCanvas = document.getElementById("shipCanvas");
		window.shipCtx = shipCanvas.getContext("2d");


	}

	function drawShipPreview(){
		window.shipCtx.clearRect(0, 0, res.x, res.y);
		window.shipCtx.save();
		window.shipCtx.translate(res.x/2, res.y/2);
		window.shipCtx.rotate(game.ships[0].getPlannedFacing()*(Math.PI/180));
		var size = shipCanvas.width/4;
		window.shipCtx.drawImage(game.ships[0].getBaseImage(), -size, -size, size*2, size*2);
		window.shipCtx.restore();
	}

	function requestShipsForFaction(ele, callback){
		var ele = ele;
		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
					type: "shiplist",
					faction: factions[$(ele).data("faction")]
					},
			ele: ele,
			success: function(data){callback(data, this.ele)},
			error: ajax.error,
		});
	}

	function buildUnitList(data, ele){
		data = JSON.parse(data);

		var t = $("#factionDiv").find("#" + $(ele).data("faction"))
		$(ele).data("set", 1);

		game.buildShipList(data[0], t);
		game.buildSquadList(data[1], t);
		game.buildFighterList(data[2], t);
		game.buildBallisticList(data[3], t);

		showShipList(ele);
	}

	function showShipList(ele){
		$(ele).next().toggleClass("disabled");
		//return;

		var t = $(".factionUpperTable").position();
		var h =  $(".factionUpperTable").height();
		//$("#game").css("top", t.top+h+20);
	}

	function joinGame(){
		console.log("joinGame");
		ajax.joinGame(playerid, gameid, refresh);
	}

	function leaveGame(){
		console.log("leaveGame");
		ajax.leaveGame(playerid, gameid, window.goToLobby);
	}

</script>