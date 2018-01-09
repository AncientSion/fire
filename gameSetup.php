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
	$element .= "<th colSpan=2 style='font-size: 20px; border: 2px solid white'>".$game["name"]." - ".$game["pv"]." points</th>";

	$element .= "<tr>";
	$element .= "<th>Player Name</th>";
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

	if ($ready){
	}
	else if ($joined){
		$element .= "<tr><td colSpan='2' class='leaveGame' onclick='leaveGame()'>Leave Game</td></tr>";	
	}
	else {
		$element .= "<tr><td colSpan='2' class='joinGame' onclick='joinGame()'>Join Game</td></tr>";	
	}
		$element .= "<tr><td colSpan='2' class='toLobby' onclick='window.goToLobby()'>Return to Lobby</td></tr>";	

	$element .= "</table>";

	if ($ready){
		echo "<script> window.ready = true;</script>";
	}
	else if ($joined){
		echo "<script> window.joined = true;</script>";
	}

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
	<script src='imageloader.js'></script>
	<script src='game.js'></script>
	<script src='ajax.js'></script>
</head>
	<body style="padding: 20px">
		<div id ="popupWrapper">
			<div id="popupText">
			</div>
		</div>
		<table style="height: 200px; width: 700px;">
			<tr>
				<td style="vertical-align: top;">
					<div style="margin: auto">
						<?php echo $element; ?>
					</div>
				</td>
				<td style="vertical-align: top; padding-left: 30px">
					<div>
						<table id="shipsBoughtTable">
							<tr>
								<th colSpan=2 style="width: 350px">
									Current Fleet Selection
								</th>
							</tr>
							<tr>
								<th>
									Total Fleet Cost:
								</th>
								<th id="totalFleetCost" style="width:50px">
									0
								</th>
							</tr>
							<tr>
								<th class="buttonTD disabled" onclick="confirmFleetPurchase()" colSpan=2>
									Confirm Fleet Selection
								</th>
							</tr>
						</table>
					</div>
					<div id="reinforceFaction" class="disabled"></div>
				</td>
			</tr>
		</table>
		<table>
			<tr>
				<td style="vertical-align: top;">
					<div id="factionDiv">			
					</div>
				</td>
			</tr>
		</table>
		<div id="game" class="disabled" style="top: 650px; left: 125px">
			<canvas id="canvas" style='z-index: 0'></canvas>
			<canvas id="shipCanvas" style='border: 2px solid white; z-index: 2'></canvas>
			<canvas id="fxCanvas" style='z-index: 1'></canvas>
		</div>
		<div id="hangarLoadoutDiv" class="disabled">
			<div class="header">
				Pick Strikecraft for the selected Hangar
			</div>
			<div class="header">
				Can launch up to <span id="launchRate"></span> units per cycle.
			</div>
			<div class="header">
				Sufficient space for <span id="capacity"></span> units.
			</div>
			<table id="hangarTable">
			</table>
			<table style="margin:auto; width: 220px; margin-top: 10px">
				<tr><td class="buttonTD disabled" onclick='confirmSystemLoadout()'>Confirm Loadout</td></tr>
			</table>
		</div>
		<div id="weaponLoadoutDiv" class="disabled">
			<div class="header">
				Pick Ammunition for the selected weapon
			</div>
			<div class="header">
				Can fire all <span id="reload"></span> turn/s.
			</div>
			<table id="weaponTable">
			</table>
			<table style="margin:auto; width: 220px; margin-top: 10px">
				<tr><td class="buttonTD disabled" onclick='confirmSystemLoadout()'>Confirm Loadout</td></tr>
			</table>
		</div>
	</body>
</html>

<script>
	window.preload();

	$(document).ready(function(){
		$("#confirmFleet").hover(function(){
			$(this).toggleClass("selectionHighlight");
		});
		$("#popupWrapper")
			.css("left", 700)
			.css("top", 300)
			.contextmenu(function(e){
				e.preventDefault();
				e.stopPropagation();
				$(this).hide();
			});

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

				getUnitName: function(){
					if (this.ships[0].ship){return this.ships[0].name;
					} else return "Squadron";
				},
				
				getUnitDisplay: function(){
					if (this.ships[0].ship){return this.ships[0].name;
					} else var html = "Squadron (";
					for (var i = 0; i < this.ships[0].structures.length; i++){html +=  this.ships[0].structures[i].name + "/";}
					return html.substr(0, html.length-1) + ")";
				},
				getUnitClass: function(){
					if (this.ships[0].ship){return "Ship";
					} else return "Squadron";},
				getUnit: function(id){	
					return this.ships[0];
				},
				getUnitType: function(val){
					return Game.prototype.getUnitType.call(this, val);
				},

				setUnitTotal: function(){
					var table = document.getElementById("totalShipCost");
						table.innerHTML = "";
					game.ships[0].totalCost = game.ships[0].cost;
					game.ships[0].upgrades = [];
					game.ships[0].setBuyData();


					var tr = table.insertRow(-1);

					if (game.ships[0].ship){
						tr.insertCell(-1).innerHTML = "<th>Base Ship Cost</th>";
						tr.insertCell(-1).innerHTML = game.ships[0].cost;
					} 
					else {
						tr.insertCell(-1).innerHTML = "<th>Squadron Setup</th>"; tr.childNodes[0].colSpan = 2;
					}

					for (var i = 0; i < game.ships[0].upgrades.length; i++){
						var tr = table.insertRow(-1);
							tr.insertCell(-1).innerHTML = game.ships[0].upgrades[i].name + " #" + game.ships[0].upgrades[i].systemid;
							tr.insertCell(-1).innerHTML = game.ships[0].upgrades[i].cost;

							$(tr)
								.data("systemid", game.ships[0].upgrades[i].systemid)
								.hover(function(){
									$(this).toggleClass("rowHighlight");
									$(game.getUnit(0).getSystemById($(this).data("systemid")).element).toggleClass("borderHighlight");
								})
	

							game.ships[0].totalCost += game.ships[0].upgrades[i].cost;
					}

					var tr = table.insertRow(-1);
						tr.insertCell(-1).innerHTML = "Total Cost";
						tr.insertCell(-1).innerHTML = game.ships[0].totalCost;


					var tr = table.insertRow(-1);
					var button = tr.insertCell(-1);
						button.innerHTML = "Confirm Ship Selection";
						button.className = "buttonTD";
						button.colSpan = 2;
						$(button).click(function(){
							window.addUnitToFleet();
						});
					}
				}

			initPreviewCanvas();
			initFactionTable();
		} else $("#game").hide();
	})


	function initFactionTable(){
		var icons = [images.earth, images.centauri, images.minbari, images.narn];		

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
								requestShipsForFaction(this, buildShipList);
							}
						})
						.contextmenu(function(e){
							e.stopPropagation(); e.preventDefault();
							setReinforceFaction(this);
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
											.append($("<th>").css("width", 130).html("Class"))
											.append($("<th>").html(""))
											.append($("<th>").css("width", 90).html("Mobility"))
											.append($("<th>").css("width", 80).html("Sensor"))
											.append($("<th>").css("width", 50).html("Cost"))
											.append($("<th>").css("width", 100).html("")
											)
										)
									)
								)
							)
			$("#factionDiv").append(table);
		}
	}

	function setReinforceFaction(ele){
		game.faction = factions[$(ele).data("faction")];
		$("#reinforceFaction").removeClass("disabled").html("Reinforcements:</br>" + game.faction);
	}

	function getFleetCost(){
		var cost = 0;
		for (var i = 0; i < window.game.shipsBought.length; i++){
			cost += window.game.shipsBought[i].value;
		}
		return cost;
	}

	function confirmSystemLoadout(){
		game.ships[0].doConfirmSystemLoadout();
	}

	function canSubmit(){
		var fleetCost = getFleetCost();
		if (fleetCost && fleetCost <= window.maxPoints){
			$("#shipsBoughtTable").find(".buttonTD").removeClass("disabled");
		}
		else {$("#shipsBoughtTable").find(".buttonTD").addClass("disabled");}
	}

	function confirmFleetPurchase(){
		if (game.faction.length > 2){
			for (var i = 0; i < game.shipsBought.length; i++){
				for (var j = game.shipsBought[i].upgrades.length-1; j >= 0; j--){
					if (game.shipsBought[i].upgrades[j].loads.length == 0){
						game.shipsBought[i].upgrades.splice(j, 1);
					}
				}
			}
			ajax.confirmFleetPurchase(playerid, gameid, window.game.shipsBought, redirect);
		}
		else popup("Please also pick your reinforcement faction </br>(right click the faction name on the left menu).");
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
		if (!(game.ships[0] instanceof Ship) || !game.ships[0].squad){return;}
		else if (game.ships[0] == undefined || !game.ships[0].squad){return;}
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
		$("#hangarLoadoutDiv").addClass("disabled");
		$("#weaponLoadoutDiv").addClass("disabled");
		$("#hangarTable").html("");

		var ship = window.initiateUnit(JSON.parse(data));
			game.ships[0] = ship;

			ship.actions.push(new Move(-1, "deploy", 0, res.x/2, res.y/2, 0, 0, 0, 1, 1, 1));
			ship.create();
			ship.setImage();
			ship.createBaseDiv();
			ship.previewSetup();
			drawShipPreview();

		$("#game").show();
		$(".shipDiv")
			.css("left", "460px").css("top", "220px").removeClass("disabled")
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

		var sub = window.initiateSquaddie(JSON.parse(data));
			sub.create();

		game.ships[0].structures.push(sub);
		game.ships[0].index = sub.index;
		game.ships[0].setLayout();
		game.ships[0].setSubElements();
		game.ships[0].setStats()
		sub.expandElement();
		sub.previewSetup();

		window.game.setUnitTotal();
	}


	function addUnitToFleet(){
		var cur = Math.floor($("#totalFleetCost").html());
		var add = game.ships[0].totalCost;
		var max = window.maxPoints;

		if (game.ships[0].squad && game.ships[0].structures.length < 2){
			popup("A squadron needs to include at least 2 units.");
			return false;
		}

		if (cur + add > max){
			popup("You have insufficient point value left");
			return false;
		}

		var ship = {
			type: game.getUnitClass(),
			name: game.getUnitName(),
			display: game.getUnitDisplay(),
			faction: game.ships[0].faction,
			value: game.ships[0].totalCost,
			purchaseId: window.game.shipsBought.length,
			upgrades: game.ships[0].upgrades,
			turn: 1,
			eta: 0,
			launchData: game.ships[0].getLaunchData()
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
			td.innerHTML = ship.display;
		var td = tr.insertCell(-1)
			td.innerHTML = ship.value;
		tr.appendChild(td);

		var target = document.getElementById("totalFleetCost");
			target.parentNode.parentNode.insertBefore(tr, target.parentNode);
			$(target).html(getFleetCost());

		$(".shipDiv").remove();
		$("#game").addClass("disabled");
		$("#hangarLoadoutDiv").addClass("disabled");
		$("#hangarTable").html("");
		game.ships[0] = undefined;
		canSubmit();
	}

	function removeShipFromFleet(ele){
		for (var i = window.game.shipsBought.length; i--; i > 0){
			if (window.game.shipsBought[i].purchaseId == $(ele).data("purchaseId")){
				window.game.shipsBought.splice(i, 1);
				$(ele).remove();
				break;
			}
		}
		$("#totalFleetCost").html(getFleetCost());
		canSubmit();
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

	function buildShipList(data, ele){
		var t = $("#factionDiv").find("#" + $(ele).data("faction"))
		data = JSON.parse(data);
		$(ele).data("set", 1);

		// capitals
		for (var i = 0; i < data[0].length; i++){
			$(t).append(
				$("<tr>")
					.hover(function(){
						$(this).toggleClass("highlight");
					})
					.append($("<td>").html(data[0][i]["name"]))
					.append($("<td>").html(""))
					.append($("<td>").html(""))
					.append($("<td>").html(""))
					.append($("<td>").html(data[0][i]["value"]))
					.append(
						$("<td>").html("Add Unit")
						.data("name", data[0][i]["name"])
						.data("value", data[0][i]["value"])
						.hover(function(){$(this).toggleClass("selectionHighlight");})
						.click(function(){requestSingleUnitData($(this).data("name"));})
					)
				)
		}

		/// squadron
		$(t).append(
			$("<tr>")
				.hover(function(){
					$(this).toggleClass("highlight");
				})
				.css("border", "1px solid")
				.append($("<td>").html("Squadron"))
				.append($("<td>").html("14"))
				.append($("<td>").html(""))
				.append($("<td>").html(""))
				.append($("<td>").html(""))
				.append($("<td>").html("Add Unit")
					.data("name", "Squadron")
					.data("value", 0)
					.hover(function(){
						$(this).toggleClass("selectionHighlight");
					})
					.click(function(){requestSingleUnitData($(this).data("name"));})
				)
		)

		//squaddie
		for (var i = 0; i < data[1].length; i++){
			$(t).append(
				$("<tr>")
					.hover(function(){
						$(this).toggleClass("highlight");
					})
					.append($("<td>").html(data[1][i]["name"]))
					.append($("<td>").html(data[1][i]["space"]))
					.append($("<td>").html(data[1][i]["ep"]))
					.append($("<td>").html(data[1][i]["ew"]))
					.append($("<td>").html(data[1][i]["value"]))
					.append(
						$("<td>").html("Add Unit")
						.data("name", data[1][i]["name"])
						.data("value", data[1][i]["value"])
						.data("space", data[1][i]["space"])
						.hover(function(){$(this).toggleClass("selectionHighlight");})
						.click(function(){requestSquadUnit($(this))})
					)
				)
		}
		showShipList(ele);
	}

	function showShipList(ele){
		$(ele).next().toggleClass("disabled");
		//return;

		var t = $(".factionUpperTable").position();
		var h =  $(".factionUpperTable").height();
		$("#game").css("top", t.top+h+20);
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