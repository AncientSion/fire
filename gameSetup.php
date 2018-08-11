<?php

include_once $_SERVER["DOCUMENT_ROOT"]."/fire/global.php";

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
	$manager = new Manager(0, $playerid);
	$players = $dbManager->getPlayersInGame($gameid);
	echo "<script>";
	echo "window.players = ".json_encode($players).";";
	echo "window.factions = ".json_encode($manager->getFactions()).";";
	echo "window.settings = ".json_encode($game).";";
	echo "window.userid = ".$playerid.";";
	echo "</script>";
	$joined = false;
	$ready = false;

	$element = "<table class='gameSetupStatus'";
	$element .= "<tr>";
	$element .= "<th colSpan=2 style='font-size: 22px;'>".$game["name"]."</th>";
	$element .= "</tr>";
	$element .= "<tr>";
	$element .= "<th colSpan=2 style='font-size: 16px;'>".$game["pv"]." Initial point value</br>".$game["reinforce"]." Reinforcement point value @ turn ".$game["reinforceTurn"]." - ETA ".$game["reinforceETA"]."</th>";
	$element .= "</tr>";

	$element .= "<tr style='height: 10px;'><td colSpan=2></td></tr>";

	$element .= "<tr style='border-bottom: 1px solid white'>";
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
			$element .= "<tr style='border-bottom: 1px solid white'>";
			$element .= "<td style='text-align: center'>".$player["username"]."</td>";

			$status = $player["status"];
			if ($status == "ready"){
				$element .= "<td style='color: black; background-color: lightGreen; text-align: center'>".$status."</td>";

			}
			else if ($status == "joined"){
				$element .= "<td style='color: black; background-color: #ffeb3e; text-align: center'>".$status."</td>";
			}

			$element .= "</tr>";
		}
	}
	$element .= "<tr style='height: 20px;'><td colSpan=2></td></tr>";

	if ($ready){}
	else if ($joined){$element .= "<tr><td colSpan=2><input type='button' value='Leave Game' onclick='leaveGame()'></td></tr>";}
	else {$element .= "<tr><td colSpan=2><input type='button' onclick='joinGame()' value='Join Game'></td></tr>";}

	$element .= "<tr><td colSpan=2><input type='button' onclick='window.goToLobby()' value='Return to Lobby'></td></tr>";	

	$element .= "</table>";

	if ($ready){echo "<script> window.ready = true;</script>";}
	else if ($joined){echo "<script> window.joined = true;</script>";}

}
else header("Location: index.php");
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
	<script src='squaddie.js'></script>
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
		<table>
			<tr>
				<td>
					<div style="margin: auto">
						<?php echo $element;?>
					</div>
				</td>
			</tr>
		</table>

		<div style="position: absolute; top: 13px; left: 445px; border: 1px solid white;">
			<table id="shipsBoughtTable">
				<thead>
					<tr>
						<th colSpan=5 style="font-size: 20px">
							Fleet Overview
						</th>
					</tr>
					<tr>
						<th id="reinforceFaction" class="disabled" colSpan=5 style="font-size: 14px">							
						</th>
					</tr>
				</thead>
				<tbody>
					<tr style="height: 10px">
						<td style="width: 24px"></td>
						<td style="width: 24px"></td>
						<td></td>
						<td style="width: 55px"></td>
						<td style="width: 24px"></td>
					</tr>
					<tr>
						<td colSpan=5 id="focusGain">
						</td>
					</tr>
					<tr>
						<th colSpan=5>
							<span id="remPV">
							</span>
						</th>
					</tr>
					<tr style="height: 10px"><th colSpan=5></th></tr>
					<tr>
						<th colSpan=5>
							<input type="button" style="font-size: 20px" onclick="game.tryConfirmFleet()" value="Confirm Fleet Selection">
						</th>
					</tr>
				</tbody>
			</table>
		</div>

		<table style="position: absolute; top: 240px">
			<tr>
				<td>
					<div id="factionDiv">			
					</div>
				</td>
			</tr>
		</table>
		<div id="game" style="position: absolute; top: 13px; left: 875px">
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
				<input type="button" value="Confirm Loadout" onclick="game.getUnit(aUnit).doConfirmSystemLoadout()">
			</div>
		</div>
		<div id="weaponDiv" class="disabled">
			<div class="header">
				Pick Ammunition for the selected weapon
			</div>
			<table id="weaponTable">
			</table>
			<div class="header">
				<input type="button" value="Confirm Loadout" onclick="game.getUnit(aUnit).doConfirmSystemLoadout()">
			</div>
		</div>
		<div id="crewDiv" class="disabled">
			<div class="header">
				Add crew specialists to the selected unit
			</div>
			<table id="crewTable">
			</table>
			<div class="header">
				<input type="button" value="Confirm Training" onclick="game.getUnit(aUnit).doConfirmSystemLoadout()">
			</div>
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
			 	purchases: 1,
			 	refit: 0,
				ships: [],				
				shipsBought: [],
				userid: window.userid,
				faction: "",
				arcRange: res.x/2,
				system: 0,
				fighters: [],
				ballistics: [],
				settings: window.settings,

				doCloneSquaddie: function(data){
					var squadron = game.getUnit(aUnit);
					var sub = squadron.getSystem(data.systemId);

					if (squadron.slots[0] + sub.space > squadron.slots[1]){return;}

					var copy = initSquaddie(JSON.parse(JSON.stringify(sub)));
						copy.index = squadron.index +1;
						copy.id = copy.index;
						copy.create();

						id = copy.id;

						for (var i = 0; i < copy.structures.length; i++){
							for (var j = 0; j < copy.structures[i].systems.length; j++){
								id++;
								copy.structures[i].systems[j].id = id;
								copy.structures[i].systems[j].setTotalBuyData();
							}
						}

					squadron.structures.push(copy);
					squadron.index = id;
					squadron.setLayout();
					squadron.setSubElements();
					squadron.setStats();
					squadron.setSubSystemState();
					copy.expandElement();
					copy.previewSetup();

					game.setUnitTotal(squadron);
				},

				tryConfirmUnitPurchase: function(){
					var unit = game.getUnit(aUnit);
					var cur = game.getFleetCost();
					var add = unit.totalCost;
					var max = game.settings.pv;

					if (unit.squad && unit.structures.length < 2){
						popup("A squadron needs to include at least 2 units.");
					} else if (cur + add > max){
						popup("You have insufficient point value left");
					}
					else {this.doConfirmUnitPurchase(unit);}
				},

				doConfirmUnitPurchase: function(unit){
					unit.display = $("#nameWrapper").find("input").val();

					if (this.refit){
						//console.log("confirmRefit");
						//console.log($(unit.tr).html());
						$(unit.tr).removeClass("selected").find("td").each(function(i){
							if (i == 2){$(this).html(unit.getPurchaseHeader())}
							else if (i == 3){$(this).html(unit.totalCost)}
						})
						this.refit = 0;
					}
					else {
						unit.purchaseId = game.purchases;
						game.shipsBought.push(unit);
						game.purchases++;

						var tr = $("<tr>")
							.addClass("purchase")
							.data("purchaseId", game.shipsBought[game.shipsBought.length-1].purchaseId)
							//.hover(function(e){
							//	$(this).toggleClass("highlight");
							//})
							.contextmenu(function(e){
								e.preventDefault(); e.stopPropagation();
							})
							.click(function(e){
								e.preventDefault(); e.stopPropagation();
							})
							.append($("<td>")
								.append($("<img>")
									.addClass("size20").attr("src", "varIcons/cmd.png").hide()))
							.append($("<td>")
								.append($("<img>")
									.addClass("size20").attr("src", "varIcons/refit.png")
									.click(function(e){
										e.preventDefault(); e.stopPropagation();
										game.getPurchasedUnit($(this).parent().parent().data("purchaseId")).doRefit();
									}))
									.hover(function(){
										$(this).toggleClass("hover")
									}))
							.append($("<td>")
								.html(unit.getPurchaseHeader(unit))
								.click(function(e){
									e.preventDefault(); e.stopPropagation();
									game.setAsCommand($(this).parent().data("purchaseId"));
								}))
							.append($("<td>").html(unit.totalCost))
							.append($("<td>")
								.append($("<img>")
									.addClass("size20").attr("src", "varIcons/undo.png")
									.click(function(e){
										e.preventDefault(); e.stopPropagation();
										game.removeUnit($(this).parent().parent().data("purchaseId"));
									}))
									.hover(function(){
										$(this).toggleClass("hover")
									}))

						game.shipsBought[game.shipsBought.length-1].tr = tr;
						$("#shipsBoughtTable tr").eq(-4).before(tr);
					}


					$("#remPoints").html()
					$(".shipDiv").remove();
					game.setRemPV()
					window.shipCtx.clearRect(0, 0, res.x, res.y);
					window.fxCtx.clearRect(0, 0, res.x, res.y);
					$("#hangarDiv").addClass("disabled");
					$("#weaponDiv").addClass("disabled");
					$("#hangarTable").html("");
					if (game.faction == ""){game.setReinforceFaction(unit.faction);}
					aUnit = 0;
					game.ships[0] = undefined;
					game.system = 0;
				},

				getPurchasedUnit: function(purchaseId){
					for (var i = 0; i < game.shipsBought.length; i++){
						if (game.shipsBought[i].purchaseId == purchaseId){
							return game.shipsBought[i];
						}
					}
				},

				removeUnit: function(purchaseId){
					if (game.refit == purchaseId){
						game.refit = 0;
					}
					for (let i = game.shipsBought.length-1; i >= 0; i--){
						if (game.shipsBought[i].purchaseId == purchaseId){
							$(game.shipsBought[i].tr).remove();
							game.shipsBought.splice(i, 1);
							break;
						}
					}

					if ($(".shipDiv").data("shipId") == purchaseId){
						$(".shipDiv").remove();
					}

					game.setRemPV();
					game.setFocusGain();
					$("#popupWrapper").hide();
				},

				tryConfirmFleet: function(){
					if (!game.shipsBought.length){
						popup("Please add units to your fleet.")
					}
					else if (!game.hasCommandUnit()){
						popup("Please select a unit to serve as Fleet Command.</br>(Left click one of your purchased units)");
					} else if (!game.hasReinforceFaction()){			
						popup("Please select a faction to receive reinforcements from.</br>(Right-click on the faction names on the left)");
					}
					else popup("Are you absolutly sure you want to confirm your fleet setup ?</br>(Right click this to cancel)</br></br><input type='button' class='popupEntryConfirm' onclick='game.doConfirmFleet()' value='Yes, im sure'>");
				},

				doConfirmFleet: function(){
					var data = [];


					for (var i = 0; i < game.shipsBought.length; i++){
						game.shipsBought[i].tr = undefined;

						var unit = {
							type: game.shipsBought[i].getUnitClass(),
							name:game.shipsBought[i].getUnitName(),
							command: game.shipsBought[i].command,
							display: game.shipsBought[i].display,
							faction: game.shipsBought[i].faction,
							totalCost: game.shipsBought[i].totalCost,
							upgrades: game.shipsBought[i].getAllUpgrades(),
							turn: 1,
							eta: 0,
						}
						data.push(unit);
					}

					ajax.confirmFleetPurchase(playerid, gameid, data, redirect);
				},

				setAsCommand: function(purchaseId){
					for (let i = 0; i < game.shipsBought.length; i++){
						if (game.shipsBought[i].command){
							game.shipsBought[i].command = 0;
						}
					}

					for (let i = 0; i < game.shipsBought.length; i++){
						if (game.shipsBought[i].purchaseId == purchaseId){
							game.shipsBought[i].command = 1;
							$(game.shipsBought[i].tr).find("td").first().find("img").show();
						} else $(game.shipsBought[i].tr).find("td").first().find("img").hide();
					}

					this.setFocusGain();
				},

				getCommandUnit: function(){
					for (let i = 0; i < game.shipsBought.length; i++){
						if (game.shipsBought[i].command){return game.shipsBought[i];}
					}
					return false
				},

				setRemPV: function(){
					$("#remPV").html(" (" + (game.settings.pv - this.getFleetCost()) + " points left)");
				},

				setFocusGain: function(){
					var unit = this.getCommandUnit();
					if (unit){
						var gain = this.getCommandUnit().getFocusIfCommand();
						$("#focusGain").html("Focus: " + (unit.baseFocusRate + unit.modFocusRate) + " %  / " + gain + " points per Turn");
					}
					else $("#focusGain").html("");
				},

				getSampleSubUnit: function(name){
					for (let i = 0; i < this.fighters.length; i++){
						if (this.fighters[i].name == name){return this.fighters[i];}
					}
					for (let i = 0; i < this.ballistics.length; i++){
						if (this.ballistics[i].name == name){return this.ballistics[i];}
					}
				},

				getUnit: function(id){
					for (var i = 0; i < this.shipsBought.length; i++){
						if (this.shipsBought[i].id == id){
							return this.shipsBought[i];
						}
					}
					return this.ships[0];
				},

				setReinforceFaction: function(faction){
					if (faction.length < 3){return;}
					game.faction = faction;
					$("#reinforceFaction").removeClass("disabled").html(faction);
				},
				
				getFleetCost: function(){
					//return this.shipsBought.map(x => x.value).reduce((l,r) => l+r, 0);
					var cost = 0;
					for (var i = 0; i < game.shipsBought.length; i++){
						cost += game.shipsBought[i].totalCost;
						if (game.refit == game.shipsBought[i].id){
							console.log("refit");
							cost -= game.shipsBought[i].totalCost;
						}
					}
					return cost;
				},

				hasReinforceFaction: function(){
					if (game.faction.length > 2){return true;}
					return false;
				},

				hasCommandUnit: function(){
					for (var i = 0; i < window.game.shipsBought.length; i++){
						if (game.shipsBought[i].command){return true;}
					} return false;
				},

				setUnitTotal: function(unit){
					var table = document.getElementById("totalShipCost");
						table.innerHTML = "";

					unit.upgrades = [];
					unit.setBuyData();

					var tr = table.insertRow(-1);
						tr.insertCell(-1).innerHTML = "<th>Base Unit Cost</th>";
						tr.insertCell(-1).innerHTML = unit.cost;

					$(table).append(unit.getBuyTableData(table))

				/*	if (unit.squad && unit.structures.length > 2){
						var size = unit.structures.length;
						var mod = 0;
						if (size == 3){mod = 8;} else if (size == 4){mod = 12;}
						var extra = Math.floor(unit.totalCost / 100 * mod);

						var tr = table.insertRow(-1);
							tr.insertCell(-1).innerHTML = size + " units, each unit costs + " + mod + "%";
							tr.insertCell(-1).innerHTML = extra;

							unit.totalCost += extra
					} */

					$(table)
						.append(
						$("<tr>")
							.append($("<th>").html("Total Unit Cost").css("font-size", 20))
							.append($("<th>").html(unit.totalCost).addClass("yellow").css("font-size", 20)))
						.append(
						$("<tr>")
							.append($("<td>")
								.attr("colSpan", 2)
								.append($("<input>")
									.attr("type", "button")
									.attr("value", "Confirm Unit Setup")
									.click(function(){
										game.tryConfirmUnitPurchase();
									}))))

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
								.append($("<td>")
									.append($("<input>")
										.attr("type", "button")
										.attr("value", "Select")
										.data("name", data[i]["name"])
										.data("value", data[i]["value"])
										.click(function(){requestBaseUnitData($(this).data("name"));})
									)
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
							.css("border-top", "1px solid white")
							.css("border-bottom", "1px solid white")
							.append($("<td>").html("Squadron"))
							.append($("<td>").html("Can group units worth up to </br>10 formation points (FP)</br> into a singular Squadron")
								.attr("colSpan", 4))
							.append($("<td>")
								.append($("<input>")
									.attr("type", "button")
									.attr("value", "Select")
									.data("name", "Squadron")
									.data("value", 0)
									.click(function(){requestBaseUnitData($(this).data("name"));})
								)
							)
					)

					for (var i = 0; i < data.length; i++){
						$(t).append(
							$("<tr>")
								.hover(function(){
									$(this).toggleClass("highlight");
								})
								.append($("<td>").html(data[i]["name"]))
								.append($("<td>").html(data[i]["space"] + " FP"))
								.append($("<td>").html(data[i]["ep"]))
								.append($("<td>").html(data[i]["ew"]))
								.append($("<td>").html(data[i]["value"]))
								.append($("<td>")
									.append($("<input>")
										.attr("type", "button")
										.attr("value", "Select")
										.data("name", data[i]["name"])
										.data("value", data[i]["value"])
										.data("space", data[i]["space"])
										.click(function(){requestSubUnit($(this))})
									)
								)
							)
						}
				},

				buildFighterList: function(data, t){
					for (var i = 0; i < data.length; i++){
						var fighter = initFighter(data[i]);
						this.fighters.push(fighter);
					}
				},
				buildBallisticList: function(data, t){
					for (var i = 0; i < data.length; i++){
						var ballistic = initBallistic(data[i]);
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
							.css("width", "50%")
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

	function requestBaseUnitData(name){
		//console.log("requestBaseUnitData");
		if (game.refit){$(game.getUnit(game.refit).tr).removeClass("selected");}
		game.refit = 0;
		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
					type: "shipdata",
					unit: "ship",
					purchases: game.purchases,
					name: name,
					},
			success: prepShowShipDiv,
			error: ajax.error,
		});
	}

	function requestSubUnit(ele){
		var unit = game.getUnit(aUnit);
		if (!unit || !unit.squad){return;}
		else if (unit.structures.length >= 4){popup("A squadron can only contain up to 4 units."); return;}
		else if (unit.slots[0] + $(ele).data("space") > unit.slots[1]){
			popup("This Squadron can only hold units worth a total of " + unit.slots[1]+  " Formation Points (FP).</br>The Squadron currently requires " + unit.slots[1] + " FP.</br>Adding another " + $(ele).data("name") + " would bring the FP to " + (unit.slots[0] + $(ele).data("space"))+".") ;return;}

		var purchase = game.purchases;

		if (game.refit){purchase = unit.purchaseId;}

		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
					type: "shipdata",
					unit: "squaddie",
					purchases: purchase,
					index: unit.index,
					name: $(ele).data("name"),
				},
			success: addUnitToSquadron,
			error: ajax.error,
		});
	}

	function prepShowShipDiv(data){
		$(".shipDiv").remove();
		$("#popupWrapper").hide()
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
		doShowShipDiv(ship);
	}

	function doShowShipDiv(unit){
		if (unit.squad){$(unit.element).find(".ep").html("0 / 0").end().find(".profile").html("");}
		aUnit = unit.id;

		$("#game").show();
		$(unit.element)
			.css("left", "450px").css("top", Math.max(240, $("#fleetInfo").height()+30)).removeClass("disabled")
			.find(".structContainer").show();

		addNamingDiv(unit);
		addCostDiv(unit);
		game.setUnitTotal(unit);

	}

	function addNamingDiv(unit){
		var name = unit.display;

		$(unit.element).append(
			$($("<div>")
			.attr("id", "nameWrapper")
			.append($("<table>")
				.append($("<tr>")
					.append($("<td>").css("width", 60).html("Name: "))
					.append($("<td>")
						.append($("<input>").attr("type", "text").prop("value", name).click(function(e){e.stopPropagation();})))))))
	}

	function addCostDiv(unit){
		$(unit.element).append($("<div>").css("border", "1px solid white").append($("<table>").attr("id", "totalShipCost")))

	}

	function addUnitToSquadron(data){

		var unit = game.getUnit(aUnit);
		var sub = initSquaddie (JSON.parse(data));
			sub.create();			

		unit.structures.push(sub);
		unit.index = sub.index;
		unit.size = (50 + unit.structures.length*10) * 0.7;
		unit.setLayout();
		unit.setSubElements();
		unit.setStats();
		unit.setSubSystemState();
		unit.updateImage();
		//unit.primary.systems[0].select();
		//unit.doConfirmSystemLoadout();
		sub.expandElement();
		sub.previewSetup();
		drawShipPreview();

		unit.recalcCommandUpgrades();
		game.setUnitTotal(unit);
	}

	function initPreviewCanvas(){
		var c = document.getElementsByTagName("canvas");
		for (let i = 0; i < c.length; i++){
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
		var unit = game.getUnit(aUnit);
		var size = shipCanvas.width/4;
		if (unit.squad && unit.structures.length > 2){
			size *= 1.25;
		}

		window.shipCtx.clearRect(0, 0, res.x, res.y);
		window.shipCtx.save();
		window.shipCtx.translate(res.x/2, res.y/2);
		window.shipCtx.rotate(unit.getPlannedFacing()*(Math.PI/180));
		window.shipCtx.drawImage(unit.getBaseImage(), -size, -size, size*2, size*2);
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