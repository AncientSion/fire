<?php

error_reporting(E_ALL); ini_set('display_errors', '1');
require_once("dbManager.php");
require_once("gameManager.php");
require_once("debug.php");

session_start();


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

	$element = "<table style='margin: 0 0 0 0; width: 300px'>";
	$element .= "<tr>";
	$element .= "<th colSpan=2>".$game["name"]."</th>";
	$element .= "</tr>";
	$element .= "<tr>";
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
				$element .= "<td style='color: green; border-bottom: 1px solid white; text-align: center'>".$status."</td>";

			}
			else if ($status == "joined"){
				$element .= "<td style='color: yellow; border-bottom: 1px solid white; text-align: center'>".$status."</td>";
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
	//	$ships = $dbManager->getShipsForPlayer($playerid, $gameid);
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
	<script src='classes.js'></script>
	<script src='cam.js'></script>
	<script src='game.js'></script>
	<script src='systems.js'></script>
	<script src='imageloader.js'></script>
</head>
	<body>
		<table style="width: 700px;"">
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
								<th colSpan=2 style="width: 300px; font-size: 16px">
									Current Fleet Selection
								</th>
							</tr>
							<tr>
								<th style="font-size: 16px">
									Total Fleet Cost:
								</th>
								<th id="totalFleetCost">
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
		<table style="width: 700px">
			<tr>
				<td style="vertical-align: top;">
					<div id="factionDiv">			
					</div>
				</td>
			</tr>
		</table>
		<table id="shipPreview" class="shipPreview disabled" style="width: 700px;">
			<tr>
				<td>
		<canvas id="fxCanvas" style="z-index: 1; width: 400px; height: 400px; position: relative;"></canvas>
		<canvas id="shipCanvas" style="z-index: 2; width: 400px; height: 400px; position: relative; margin-left: -405px"></canvas>
				</td>
				<td style="vertical-align: top;">
						<table>
							<tr>
								<td>
							</td>
								<td id="game">
								</td>
							</tr>
						</table>
					</div>
				</td>
			</tr>
		</table>
		




	</body>
</html>

<script>
	preloadFactions();


	$(document).ready(function(){

	//	$(this).contextmenu(function(e){
	//		e.preventDefault();
	//	});
		if (window.ready){
			$("#shipsBoughtTable").hide();
		}
		else if (window.joined){
			 window.preview = true;
			 window.game = {
				ships: [],
				getShipById: function(id){	
					return this.ships[0];
				},
				shipsBought: [],
			}

			window.res = {x:400, y: 400};

			window.shipCanvas = document.getElementById("shipCanvas");
			window.shipCanvas.width = res.x;
			window.shipCanvas.height = res.y;
			window.shipCtx = shipCanvas.getContext("2d");

			window.fxCanvas = document.getElementById("fxCanvas");
			window.fxCanvas.width = res.x;
			window.fxCanvas.height = res.y;
			window.fxCtx = fxCanvas.getContext("2d");

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
					subTable.className = "factionShipclassTable";

				var subTr = document.createElement("tr");
						subTh = document.createElement("th");
						subTh.style.width = "250px";
						subTh.style.fontSize = "16px";
						subTh.innerHTML = "Shipclass";
					subTr.appendChild(subTh);
						subTh = document.createElement("th");
						subTh.style.width = "100px";
						subTh.style.fontSize = "16px";
						subTh.innerHTML = "PV";
					subTr.appendChild(subTh);
						subTh = document.createElement("th");
						subTh.style.width = "150px";
						subTh.style.fontSize = "16px";
					subTr.appendChild(subTh);						


				subTable.appendChild(subTr)

	;			td.appendChild(subTable); 
				tr.appendChild(td);

				table.appendChild(tr);
			}

			$("#factionDiv").append(table);
		}
	});

	function addToFleet(ele){
		var ship = {
			shipClass: $(ele).data("shipClass"),
			pv: $(ele).data("pv"),
			purchaseId: window.window.game.shipsBought.length,
		}

		var cur = Math.floor($("#totalFleetCost").html());
		var add = ship.pv;
		var max = Math.floor($("#maxPointValue").html());


		if (cur + add <= max){

			window.game.shipsBought.push(ship);

			var tr = document.createElement("tr");
				$(tr).data("purchaseId", ship.purchaseId);
				tr.addEventListener("contextmenu", function(e){
					e.preventDefault();
					for (var i = window.game.shipsBought.length; i--; i > 0){
						if (window.game.shipsBought[i].purchaseId == $(this).data("purchaseId")){
							window.game.shipsBought.splice(i, 1);
							break;
						}
					}
					$(tr).remove();
					adjustFleetCost();
				})

			for (var i in ship){
				if (i != "purchaseId"){
					var td = document.createElement("td");
						td.style.textAlign = "center";
						td.innerHTML = ship[i];
					tr.appendChild(td);
				}
			}

			var target = document.getElementById("totalFleetCost");
				target.parentNode.parentNode.insertBefore(tr, target.parentNode);

			adjustFleetCost();
		}
		else {
			alert ("you have insufficient point value left");
		}
	}

	function adjustFleetCost(){
		var target = document.getElementById("totalFleetCost");
		var cost = 0;
		for (var i = 0; i < window.game.shipsBought.length; i++){
			cost += window.game.shipsBought[i].pv;
			}
		$(target).html(cost);

		if (cost > 0){
			$("#confirmFleet").removeClass("disabled");
		}
		else {
			$("#confirmFleet").addClass("disabled");
		}
	}

	function confirmFleetPurchase(){
		ajax.confirmFleetPurchase(playerid, gameid, window.game.shipsBought, redirect);
	}

	function requestShipData(shipclass){
		console.log("requestShipData");
		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
					type: "shipdata",
					shipclass: shipclass,
					},
			success: showShipPreview,		
			error: ajax.error,
		});
	}

	function showShipPreview(data){
		data  = JSON.parse(data);
		document.getElementById("game").innerHTML = "";

		var ship = new Ship(
							data.id,
							data.shipClass,
							0,
							0,
							0,
							data.userid,
							"blue"
						)

		ship.actions.push(new Move("deploy", 0, 200, 200, -90, 0, 0, 0));
		
		ship.faction = data.faction;
		ship.mass = data.mass;
		ship.value = data.value;
		ship.ep = data.ep;
		ship.profile = data.profile;
		ship.size = data.size;


		for (var j = 0; j < data.structures.length; j++){
			var struct = new Structure(
										data.id,
										data.structures[j].start,
										data.structures[j].end,
										data.structures[j].armour,
										data.structures[j].health,
										data.structures[j].destroyed
									);

			for (var k = 0; k < data.structures[j].systems.length; k++){
				var system = new window[data.structures[j].systems[k].name](
																			data.id, 
																			data.structures[j].systems[k].start,
																			data.structures[j].systems[k].end
																			)
				struct.systems.push(system);

				}
				ship.structures.push(struct);
			}


		game.ships[0] = ship;
		ship.create(); ship.preview();

		$(".shipDiv").css("position", "relative").css("left", "0px").css("top", "0px").removeClass("disabled");
		$("#shipPreview").removeClass("disabled");

	}

	function requestShipsForFaction(faction, ele, callback){
		console.log("requestShipsForFaction");
		if (!$(ele).data("avail")){
			console.log("requestin");
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
		shiplist = JSON.parse(shiplist);
		if (!shiplist[0].length){
			return;
		}

		var row = $(ele).data("row");

		if (!$(ele).data("avail")){
			for (var i = 0; i < shiplist[0].length; i++){
				var subTr = document.createElement("tr")
					$(subTr).mouseenter(function(){
						$(this).addClass("highlight");
					}).mouseleave(function(){
						$(this).removeClass("highlight");
					});

					subTr.addEventListener("contextmenu", function(e){
						e.preventDefault();
						requestShipData(this.childNodes[0].innerHTML);
					})
					

					console.log(shiplist[0][i]);

					var subTd = document.createElement("td");
						subTd.innerHTML = shiplist[0][i];
						subTr.appendChild(subTd); 

					var subTd = document.createElement("td");
						subTd.innerHTML = shiplist[1][i];
						subTr.appendChild(subTd); 

					var subTd = document.createElement("td");							
						subTd.innerHTML = "Add to fleet";
						$(subTd).data("shipClass", shiplist[0][i]).data("pv", shiplist[1][i]).mouseenter(function(){
							$(this).addClass("fontHighlight");
						}).mouseleave(function(){
							$(this).removeClass("fontHighlight");
						}).click(function(){
							addToFleet(this);
						})
						subTr.appendChild(subTd); 

					//	subTable.appendChild(subTr);

					ele.parentNode.childNodes[(row*2)+2].childNodes[0].childNodes[0].appendChild(subTr);

				$(ele).data("avail", true);
			}
		}


		$(ele.parentNode.childNodes[(row*2)+2]).slideToggle(0);

	}

	function joinGame(){
		console.log("joinGame");
		ajax.joinGame(playerid, gameid, refresh);
	}

	function leaveGame(){
		console.log("leaveGame");
		ajax.leaveGame(playerid, gameid, refresh);
	}

</script>