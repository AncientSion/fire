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
				<td style="vertical-align: top;">
					<div style="margin: auto; margin-left: 30px;">
						<table id ="shipsBoughtTable">
							<tr>
								<th colSpan=2 style="width: 300px; font-size: 20px">
									Current Fleet Selection
								</th>
							</tr>
							<tr>
								<th style="font-size: 14px;">
									Total Fleet Cost:
								</th>
								<th id="totalFleetCost" style="font-size: 14px; width:50px">
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
		<div id="game" class="disabled" style="width: 420px; height: 400px; top: 650px; left: 125px">
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
				Has a capacity of <span id="capacity"></span> tons
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

		if (window.ready){
			$("#shipsBoughtTable").hide();
			$("#game").hide();
		}
		else if (window.joined){
			window.turn = new Turn();
			window.preview = true;
			window.game = {
				turn: 0,
			 	phase: -2,
				ships: [],				
				shipsBought: [],

				getUnitById: function(id){	
					return this.ships[0];
				},
				getUnitType: function(val){
					switch (val){
						case 3: return "Ultra Heavy";
						case 2: return "Super Heavy";
						case 1: return "Heavy";
						case 0: return "Medium";
						case -1: return "Light";
						case -2: return "SuperLight";
						case -3: return "Flight";
						case -4: return "Salvo";
					}
				},

				setShipTotal: function(){
					game.ships[0].totalCost = game.ships[0].cost;
					game.ships[0].upgrades = [];

					for (var i = 0; i < game.ships[0].structures.length; i++){
						for (var j = 0; j < game.ships[0].structures[i].systems.length; j++){
							if (game.ships[0].structures[i].systems[j].totalCost > 0){
								game.ships[0].upgrades.push(game.ships[0].structures[i].systems[j].getUpgradeData());
							}
						}
					}

					var table = document.getElementById("totalShipCost");
						table.innerHTML = "";

					var tr = table.insertRow(-1);
						tr.insertCell(-1).innerHTML = "Base Ship Cost";
						tr.insertCell(-1).innerHTML = game.ships[0].cost;

					for (var i = 0; i < game.ships[0].upgrades.length; i++){
						var tr = table.insertRow(-1);
							tr.insertCell(-1).innerHTML = game.ships[0].upgrades[i].name
							tr.insertCell(-1).innerHTML = game.ships[0].upgrades[i].cost;
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
							window.addShipToFleet();
						});
					}
		}

		window.res = {x:200, y: 200};
		initPreviewCanvas();

		var icons = [images.earth, images.centauri, images.minbari, images.narn];
		

		var table = document.createElement("table"); 
			table.className = "factionUpperTable";
		var tr = document.createElement("tr"); 
		var th = document.createElement("th");
			th.style.fontSize = "30px";
			th.colSpan = 3;
			th.innerHTML = "Assemble Your Fleet"; tr.appendChild(th); table.appendChild(tr);

		for (var i = 0; i < factions.length; i++){
			var tr = document.createElement("tr");
				$(tr).data("row", i);
				$(tr).data("faction", factions[i]);
				$(tr).data("avail", false);
				$(tr).mouseenter(function(){
					$(this).addClass("highlight");
				}).mouseleave(function(){
					$(this).removeClass("highlight");
				});
				$(tr).click(function(){
					requestShipsForFaction($(this).data("faction"), this, showShipList);
				});

			var td = document.createElement("td");
				td.style.textAlign = "center";
				td.appendChild(icons[i]); tr.appendChild(td);
			var td = document.createElement("td");
				td.style.textAlign = "center";
				td.style.fontSize = "20px";
				td.innerHTML = factions[i];
				td.style.width = "40%"; tr.appendChild(td);
			var td = document.createElement("td");
				td.style.textAlign = "center";
				td.innerHTML = '<img src="' + icons[i].src + '"></img>' ; tr.appendChild(td);

				table.appendChild(tr);


			var tr = document.createElement("tr");
				tr.style.display = "none";
			var td = document.createElement("td");
				td.colSpan = 3;
			var subTable = document.createElement("table");
				subTable.className = "factionclassnameTable";

			var subTr = document.createElement("tr");
					subTh = document.createElement("th");
					subTh.style.width = "200px";
					subTh.style.fontSize = "16px";
					subTh.innerHTML = "Class";
				subTr.appendChild(subTh);
					subTh = document.createElement("th");
					subTh.style.width = "70px";
					subTh.style.fontSize = "16px";
					subTh.innerHTML = "Cost";
				subTr.appendChild(subTh);
					subTh = document.createElement("th");
					subTh.style.fontSize = "16px";
				subTr.appendChild(subTh);

				subTable.appendChild(subTr);
				td.appendChild(subTable); 
				tr.appendChild(td);

				table.appendChild(tr);
			}

			$("#factionDiv").append(table);
		}
		else {
			$("#game").hide();
		}

	});


	function getFleetCost(){
		var cost = 0;
		for (var i = 0; i < window.game.shipsBought.length; i++){
			cost += window.game.shipsBought[i].value;
		}
		return cost;
	}

	function confirmSystemLoadout(){
		for (var i = 0; i < game.ships[0].structures.length; i++){
			for (var j = 0; j < game.ships[0].structures[i].systems.length; j++){
				if (game.ships[0].structures[i].systems[j].selected){
					game.ships[0].structures[i].systems[j].select();
					return;
				}
			}
		}
	}

	function canSubmit(){
		var fleetCost = getFleetCost();
		if (fleetCost && fleetCost <= window.maxPoints){
			$("#shipsBoughtTable").find(".buttonTD").removeClass("disabled");
		}
		else {
			$("#shipsBoughtTable").find(".buttonTD").addClass("disabled");
		}
		/*if (reinforceFaction.length && fleetCost){
			$("#confirmFleet").removeClass("disabled");
		}
		else {
			$("#confirmFleet").addClass("disabled");
		}*/
	}

	function confirmFleetPurchase(){
		ajax.confirmFleetPurchase(playerid, gameid, window.game.shipsBought, redirect);
	}

	function requestShipData(name){
		//		console.log("requestShipData");
		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
					type: "shipdata",
					name: name,
					},
			success: showShipDiv,		
			error: ajax.error,
		});
	}

	function showShipDiv(data){
		window.ships = [];

		window.ships[0] = JSON.parse(data);
		$(".shipDiv").remove();
		$("#hangarLoadoutDiv").addClass("disabled");
		$("#weaponLoadoutDiv").addClass("disabled");
		$("#hangarTable").html("");

		for (var i = 0; i < window.ships.length; i++){
			var ship = window.initiateShip(window.ships[i]);
				ship.facing = -90;
			ship.actions.push(new Move(-1, "deploy", 0, res.x/2, res.y/2, 270, 0, 0, 1, 1, 1));
		}

		game.ships[0] = ship;
		ship.create();
		$("#game").removeClass("disabled");
		ship.createBaseDiv();
		ship.previewSetup();
		$(".shipDiv")
			.css("left", "460px").css("top", "220px").removeClass("disabled")
			.find(".structContainer").show();
		drawShipPreview();

		var div = document.createElement("div");
			div.style.border = "1px solid white";
		var table = document.createElement("table");		
			table.id = "totalShipCost";

		div.appendChild(table);

		document.getElementsByClassName("shipDiv")[0].appendChild(div);
		window.game.setShipTotal();
	}


	function addShipToFleet(){

		var cur = Math.floor($("#totalFleetCost").html());
		var add = game.ships[0].totalCost;
		var max = window.maxPoints;

		if (cur + add <= max){

			var ship = {
				name: game.ships[0].name,
				type: "Ship",
				faction: game.ships[0].faction,
				value: game.ships[0].totalCost,
				purchaseId: window.game.shipsBought.length,
				upgrades: game.ships[0].upgrades,
				turn: 1,
				eta: 0
			}

			window.game.shipsBought.push(ship);

			var tr = document.createElement("tr");
			$(tr).data("purchaseId", ship.purchaseId)
				.click(function(e){
					e.preventDefault();
					removeShipFromFleet($(this));
				}).hover(function(e){
					$(this).toggleClass("fontHighlight");
				})

			var td = tr.insertCell(-1)
				td.innerHTML = ship.name;
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
				canSubmit();
		}
		else {
			popup("You have insufficient point value left");
			return false;
		}
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

		var canva = document.getElementsByTagName("canvas");
		for (var i = 0; i < canva.length; i++){
			canva[i].width = res.x;
			canva[i].height = res.y;
			canva[i].style.width = res.x;
			canva[i].style.height = res.y;
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
		window.shipCtx.rotate(-90*(Math.PI/180));
		var size = shipCanvas.width/4;
		window.shipCtx.drawImage(game.ships[0].img, -size, -size, size*2, size*2);
		window.shipCtx.restore();
	}

	function requestShipsForFaction(faction, ele, callback){
		if (!$(ele).data("avail")){
			$.ajax({
				type: "GET",
				url: "getGameData.php",
				datatype: "json",
				data: {
						type: "shiplist",
						faction: faction
						},
				success: function(data){
							callback(data, ele)
						},
				error: ajax.error,
			});
		}
		else {
			$(ele.parentNode.childNodes[($(ele).data("row")*2)+2]).slideToggle(0);
			var t = $(".factionUpperTable").position();
			var h =  $(".factionUpperTable").height();
			$("#game").css("top", t.top+h+20);
		}
	}

	function showShipList(shiplist, ele){
		if (shiplist){
			shiplist = JSON.parse(shiplist);
		} else return;

		var row = $(ele).data("row");

		if (!$(ele).data("avail")){
			for (var i = 0; i < shiplist.length; i++){
				var subTr = document.createElement("tr")
					$(subTr).hover(function(){
						$(this).toggleClass("highlight");
					})

					var subTd = subTr.insertCell(-1);
						subTd.innerHTML = shiplist[i]["name"];

					var subTd = subTr.insertCell(-1);
						subTd.innerHTML = shiplist[i]["value"];

					var subTd = subTr.insertCell(-1);	
						subTd.innerHTML = "Add to fleet";
						$(subTd).data("name", shiplist[i]["name"]).data("value", shiplist[i]["value"])
							.hover(function(){
								$(this).toggleClass("selectionHighlight");
							}).click(function(){
								requestShipData(this.parentNode.childNodes[0].innerHTML);
							})
						subTr.appendChild(subTd); 

					//	subTable.appendChild(subTr);

					ele.parentNode.childNodes[(row*2)+2].childNodes[0].childNodes[0].appendChild(subTr);

				$(ele).data("avail", true);
			}
		}


		$(ele.parentNode.childNodes[(row*2)+2]).slideToggle(0);

		var t = $(".factionUpperTable").position();
		var h =  $(".factionUpperTable").height();
		$("#game").css("top", t.top+h+20);

	}

	function selectReinforcementFaction(faction){
		reinforceFaction.push(faction);
		canSubmit();
		return;
	}

	function unselectReinforcementFaction(faction){
		for (var i = reinforceFaction.length; i >= 0; i--){
			if (reinforceFaction[i] == faction){
				reinforceFaction.splice(i, 1);
				canSubmit();
				return;
			}
		}
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