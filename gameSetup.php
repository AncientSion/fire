<?php

include_once 'global.php';

if (isset($_SESSION["userid"])){
	$gameid = $_GET["gameid"];
	$playerid = $_SESSION["userid"];

	$_SESSION["gameid"] = $_GET["gameid"];
	echo "<script> var gameid = ".$gameid."; var playerid = ".$playerid.";</script>";
	$dbManager = DBManager::app($gameid);
	$manager = new Manager($playerid);

	echo "<script> window.factions = ".json_encode($manager->getFactions()).";</script>";

	$game = $dbManager->getGameDetails($gameid);
	$players = $dbManager->getPlayersInGame($gameid);
	echo "<script> window.players = ".json_encode($players).";</script>";
	$joined = false;
	$ready = false;

	$element = "<table class='gameSetupStatus'";
	$element .= "<tr>";
	$element .= "<th colSpan=2 style='font-size: 20px; border: 2px solid white'>".$game["name"]."</th>";
	$element .= "</tr>";
	$element .= "<tr style='border:1px solid white'>";
	$element .= "<th>Point Value: </th><th id='maxPointValue'>".$game["pv"]."</th>";
	$element .= "</tr>";

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
		$element .= "<tr><td colSpan='2'>";	
		$element .= "<input id='gameId' style='width: 100%' type='button' value='Leave Game' onclick='leaveGame()'>";
		$element .= "</tr></td>";
	}
	else {
		$element .= "<tr><td colSpan='2'>";	
		$element .= "<input id='gameId' style='width: 100%' type='button' value='Join Game' onclick='joinGame()'>";
		$element .= "</tr></td>";
	}

	$element .= "<tr><td style='padding: 10px 10px 10px 10px; text-align: center' colSpan='2'>";
	$element .= "<a href='lobby.php'>Return to Lobby</a>";
	$element .= "</tr></td>";
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
	<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
	<meta content="utf-8" http-equiv="encoding">
	<link rel='stylesheet' href='style.css'/>
	<script src="jquery-2.1.1.min.js"></script>
	<script src='ajax.js'></script>
	<script src='shared.js'></script>
	<script src='mathLib.js'></script>
	<script src='shipclasses.js'></script>
	<script src='flights.js'></script>
	<script src='classes.js'></script>
	<script src='cam.js'></script>
	<script src='game.js'></script>
	<script src='systems.js'></script>
	<script src='imageloader.js'></script>
</head>
	<body>
		<div id ="popupWrapper">
			<div id="popupText">
			</div>
		</div>
		<table style="height: 200px; width: 700px;">
			<tr>
				<td style="vertical-align: top;">
					<div style="margin: auto; margin-top: 30px;">
						<?php echo $element; ?>
					</div>
				</td>
				<td style="vertical-align: top;">
					<div style="margin: auto; margin-top: 30px; margin-left: 50px;">
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
							<tr id="confirmFleet" class="disabled" onclick="confirmFleetPurchase()">
								<th colSpan = 2 style="cursor: pointer">
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
		<div id="game" style="width: 420px; height: 400px">
			<canvas id="shipCanvas"></canvas>
			<canvas id="fxCanvas"></canvas>
		</div>
		<div id="hangarLoadoutDiv" class="disabled">
			<div class="header">
				Pick Strikecraft for the selected Hangar
			</div>
			<div class="header">
				Can launch up to <span id="launchRate"></span> units per turn
			</div>
			<div class="header">
				Has a capacity of <span id="capacity"></span> tons
			</div>
			<table id="hangarTable">
			</table>
		</div>
	</body>
</html>

<script>
	window.preload();
	var reinforceFaction = [];

	$(document).ready(function(){
		if (window.ready){
			$("#shipsBoughtTable").hide();
		}
		else if (window.joined){
			 window.preview = true;

			 window.game = {
			 	phase: -2,
				ships: [],
				getShipById: function(id){	
					return this.ships[0];
				},
				shipsBought: [],

				addFighter: function(ele){
					game.ships[0].getSystemById($("#hangarLoadoutDiv").data("systemid")).addFighter(ele);
				},

				removeFighter: function(ele){
					game.ships[0].getSystemById($("#hangarLoadoutDiv").data("systemid")).removeFighter(ele);
				},

				setShipTotal: function(){
					game.ships[0].totalCost = game.ships[0].cost;
					game.ships[0].upgrades = [];

					for (var i = 0; i < game.ships[0].structures.length; i++){
						for (var j = 0; j < game.ships[0].structures[i].systems.length; j++){
							if (game.ships[0].structures[i].systems[j].totalCost > 0){
								game.ships[0].upgrades.push(
									{
										name: game.ships[0].structures[i].systems[j].display,
										systemid: game.ships[0].structures[i].systems[j].id,
										cost: game.ships[0].structures[i].systems[j].totalCost,
										loads: game.ships[0].structures[i].systems[j].loads
									}
								)
							}
						}
					}

					var table = document.getElementById("totalShipCost");
						table.innerHTML = "";
					var tr = document.createElement("tr");
					var td = document.createElement("td");
						td.innerHTML = "Base Ship Cost: "; tr.appendChild(td);
					var td = document.createElement("td");
						td.innerHTML = game.ships[0].cost; tr.appendChild(td); table.appendChild(tr);

					for (var i = 0; i < game.ships[0].upgrades.length; i++){
						var tr = document.createElement("tr");
						var td = document.createElement("td");
							td.innerHTML = game.ships[0].upgrades[i].name; tr.appendChild(td);
						var td = document.createElement("td");
							td.innerHTML = game.ships[0].upgrades[i].cost; tr.appendChild(td); table.appendChild(tr);
							game.ships[0].totalCost += game.ships[0].upgrades[i].cost;
					}

					var tr = document.createElement("tr");
					var th = document.createElement("th");
						th.innerHTML = "Total Cost: "; tr.appendChild(th);
					var th = document.createElement("th");
						th.innerHTML = game.ships[0].totalCost; tr.appendChild(th); table.appendChild(tr);
				}
		}


		window.res = {x:200, y: 200};
		initPreviewCanvas();

		var icons = [factionImages.earthFaction, factionImages.centauriFaction, factionImages.minbariFaction];

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

				$(td).contextmenu(function(e){
					return;
					e.preventDefault();
					e.stopPropagation();
					var fact = $(this).html();
					if ($(this).hasClass("selected")){
						$(this).removeClass("selected");
						unselectReinforcementFaction(fact);
					}
					else {
						$(this).addClass("selected");
						selectReinforcementFaction(fact);
					}

					//console.log(reinforceFaction);
				});

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
	});


	function getFleetCost(){
		var cost = 0;
		for (var i = 0; i < window.game.shipsBought.length; i++){
			cost += window.game.shipsBought[i].value;
		}
		return cost;
	}

	function canSubmit(){
		if (getFleetCost()){
			$("#confirmFleet").removeClass("disabled")
		}
		else {
			$("#confirmFleet").addClass("disabled")
		}
		/*if (reinforceFaction.length && fleetCost){
			$("#confirmFleet").removeClass("disabled");
		}
		else {
			$("#confirmFleet").addClass("disabled");
		}*/
	}

	function confirmFleetPurchase(){
		ajax.confirmFleetPurchase(playerid, gameid, window.game.shipsBought, window.reinforceFaction, redirect);
	}

	function requestShipData(classname){
		//		console.log("requestShipData");
		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
					type: "shipdata",
					classname: classname,
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
		$("#hangarTable").html("");

		for (var i = 0; i < window.ships.length; i++){
			var ship = window.initiateShip(i);		
			ship.actions.push(new Move("deploy", 0, res.x/2, res.y/2, 270, 0, 0));
		}

		game.ships[0] = ship;
		ship.create();
		$("#fxCanvas").removeClass("disabled");
		$("#shipCanvas").removeClass("disabled");
		drawShipPreview();
		ship.createDiv();

		var div = document.createElement("div");
			div.style.display = "block";
			div.style.border = "1px solid white";
			div.style.width = "400px";
		var table = document.createElement("table");
			table.id = "totalShipCost";

		var input = document.createElement("input");
			input.type = "button";
			input.value = "Confirm Ship Selection";
			input.addEventListener("click", function(){
				window.addShipToFleet();
			})

		var subDiv = document.createElement("div"); subDiv.className = "header";
			subDiv.appendChild(input);

		div.appendChild(table); div.appendChild(subDiv);

		document.getElementsByClassName("shipDiv")[0].appendChild(div);
		window.game.setShipTotal();
		$(".shipDiv").css("position", "relative").css("left", "415px").css("top", "-285px").removeClass("disabled");
	}


	function addShipToFleet(){

		var cur = Math.floor($("#totalFleetCost").html());
		var add = game.ships[0].totalCost;
		var max = Math.floor($("#maxPointValue").html());

		if (cur + add <= max){

			var ship = {
				classname: game.ships[0].classname,
				faction: game.ships[0].faction,
				value: game.ships[0].totalCost,
				purchaseId: window.game.shipsBought.length,
				upgrades: game.ships[0].upgrades,
				turn: 1,
				arrival: 0
			}

			window.game.shipsBought.push(ship);

			var tr = document.createElement("tr");
			$(tr).data("purchaseId", ship.purchaseId)
				.contextmenu(function(e){
					e.preventDefault();
					for (var i = window.game.shipsBought.length; i--; i > 0){
						if (window.game.shipsBought[i].purchaseId == $(this).data("purchaseId")){
							window.game.shipsBought.splice(i, 1);
							break;
						}
					}
					$(this).remove();
					$("#totalFleetCost").html(getFleetCost());
				}).hover(
					function(e){
						$(this).addClass("fontHighlight");
					},
					function(e){
						$(this).removeClass("fontHighlight");
					}
			);

			var td = document.createElement("td");
				td.style.textAlign = "center";
				td.innerHTML = ship.classname; tr.appendChild(td);
			var td = document.createElement("td");
				td.style.textAlign = "center";
				td.innerHTML = ship.value; tr.appendChild(td);
			tr.appendChild(td);

			var target = document.getElementById("totalFleetCost");
				target.parentNode.parentNode.insertBefore(tr, target.parentNode);
				$(target).html(getFleetCost());
				$(".shipDiv").addClass("disabled");
				$("#shipCanvas").addClass("disabled");
				$("#fxCanvas").addClass("disabled");
				$("#hangarLoadoutDiv").addClass("disabled");
				$("#hangarTable").html("");
				canSubmit();
		}
		else {
			alert ("you have insufficient point value left");
			return false;
		}
	}

	function initPreviewCanvas(){
		window.fxCanvas = document.getElementById("fxCanvas");
		window.fxCanvas.className ="previewCanvas disabled";
		window.fxCanvas.width = res.x;
		window.fxCanvas.height = res.y;
		window.fxCanvas.style.width = res.x;
		window.fxCanvas.style.height = res.y;
		window.fxCtx = fxCanvas.getContext("2d");

		window.shipCanvas = document.getElementById("shipCanvas");
		window.shipCanvas.className = "disabled";
		window.shipCanvas.width = res.x;
		window.shipCanvas.height = res.y;
		window.shipCanvas.style.width = res.x;
		window.shipCanvas.style.height = res.y;
		window.shipCtx = shipCanvas.getContext("2d");
	}

	function drawShipPreview(){
		window.shipCtx.clearRect(0, 0, res.x, res.y);
		window.shipCtx.save();
		window.shipCtx.translate(res.x/2, res.y/2);
		window.shipCtx.rotate(-90*(Math.PI/180));
		var size = 50;
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
		}
	}

	function showShipList(shiplist, ele){
		if (shiplist){
			shiplist = JSON.parse(shiplist);
		}
		else {
			return;
		}

		var row = $(ele).data("row");

		if (!$(ele).data("avail")){
			for (var i = 0; i < shiplist.length; i++){
				var subTr = document.createElement("tr")
					$(subTr).mouseenter(function(){
						$(this).addClass("highlight");
					}).mouseleave(function(){
						$(this).removeClass("highlight");
					});

					var subTd = document.createElement("td");
						subTd.innerHTML = shiplist[i]["classname"];
						subTr.appendChild(subTd); 

					var subTd = document.createElement("td");
						subTd.innerHTML = shiplist[i]["value"];
						subTr.appendChild(subTd); 

					var subTd = document.createElement("td");							
						subTd.innerHTML = "Add to fleet";
						$(subTd).data("classname", shiplist[i]["classname"]).data("value", shiplist[i]["value"]).mouseenter(function(){
							$(this).addClass("selected");
						}).mouseleave(function(){
							$(this).removeClass("selected");
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
		ajax.leaveGame(playerid, gameid);
	}

</script>