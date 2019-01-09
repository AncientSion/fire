
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

	$element = "<div class='gameSetupStatus'>";
	$element .= "<table>";
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

	$element .= "</table></div>";

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
	<script src='systems.js'></script>
	<script src='structure.js'></script>
	<script src='classes.js'></script>
	<script src='mixed.js'></script>
	<script src='salvo.js'></script>
	<script src='flights.js'></script>
	<script src='squadron.js'></script>
	<script src='squaddie.js'></script>
	<script src='graphics.js'></script>
	<script src='cam.js'></script>
	<script src='game.js'></script>
	<script src='ajax.js'></script>
</head>
	<body style="padding: 5px">
		<div id="popupWrapper">
			<div class="popupText">
			</div>
		</div>

		<?php echo $element;?>

		<div class="fleetBought">
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

		<div id="fleetChoice">
			<div class="factionAvail"></div>
			<div class="factionContentWrapper"></div>
		</div>


		<div id="game" style="position: absolute; top: 5px; left: 875px">
			<canvas id="shipCanvas" class="gameCanvas" style='border: 1px solid white; z-index: 2'></canvas>
			<canvas id="fxCanvas" class="gameCanvas" style='z-index: 1'></canvas>
		</div>
		<div id="hangarDiv" class="disabled">
			<div class="header">
				Can store a total tonnage of up to <span id="capacity"></span> kT.
				<br>
				Can launch up to <span id="launchRate"></span> kTs of units per cycle.
				<br>
				<br>
				<span class="dedicatedCarrier">
					Dedicated carrier unit, <span class='yellow'>30 % cost discount</span>.
				</span>
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
				Assign experienced officers to this unit
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
			window.res = {x: 150, y: 150};
			window.game = {
				turn: 0,
			 	phase: -2,
			 	purchases: 1,
			 	openRequest: 0,
			 	canConfirm: 1,
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

				getPlayerStatus: function(){
					return {morale: 0}
				},

				doCloneSquaddie: function(data){
					var squadron = game.getUnit(aUnit);
					var sub = squadron.getSystem(data.systemId);
					if (squadron.getSlotsUsed() + sub.space > squadron.getMaxSlots()){return;}

					var copy = initSquaddie(JSON.parse(JSON.stringify(sub)));
						squadron.index++;
						copy.id = squadron.index;
						copy.create();

						for (var i = 0; i < copy.systems.length; i++){
							squadron.index++;
							copy.systems[i].id = squadron.index;
							copy.systems[i].setTotalBuyData();
						}

					this.finishExpandSquadron(squadron, copy);
				},

				requestSubUnit: function(data){
					var unit = game.getUnit(aUnit);
					if (!unit || !unit.squad){return;}
					if (game.openRequest){return;}
					if (unit.getRemainingSlots() < data.space){
						popup("Insufficent slot space remaining</br>" + $(unit.element).find(".squadSlots").html()); return;
					}

					var purchase = game.purchases;

					if (game.refit){purchase = unit.purchaseId;}

					game.openRequest = 1;
					$.ajax({
						type: "GET",
						url: "getGameData.php",
						datatype: "json",
						data: {
								type: "unitdata",
								unit: "squaddie",
								purchases: purchase,
								index: unit.index,
								name: data.name,
							},
						success: game.addUnitToSquadron,
						error: ajax.error,
					});
				},

				addUnitToSquadron: function(data){
					game.openRequest = 0;
					var squadron = game.getUnit(aUnit);
					var sub = initSquaddie(JSON.parse(data));
						sub.create();	
					squadron.index = sub.index;	

					game.finishExpandSquadron(squadron, sub);
				},

				finishExpandSquadron: function(squadron, squaddie){
					squadron.structures.push(squaddie);
					squadron.size = 50 + squadron.structures.length;
					squadron.setLayout();
					squadron.addSubContainers();
					squadron.setStats();
					squadron.setSubSystemState();
					squadron.updateImage();
					squaddie.fillSelfContainer();
					squaddie.previewSetup();
					drawShipPreview();

					squadron.recalcCommandUpgrades();
					game.setUnitTotal(squadron);
				},

				tryConfirmUnitPurchase: function(){
					var unit = game.getUnit(aUnit);
					var cur = game.getFleetCost();
					var add = unit.totalCost;
					var max = game.settings.pv;

					if (unit.squad && unit.structures.length < 1){
						popup("A squadron needs to include at least 1 units.");
					} else if (cur + add > max){
						popup("You have insufficient point value left");
					}
					else if (unit.hasUnsetupedSystems()){

					}
					else {this.doConfirmUnitPurchase(unit);}
				},

				doConfirmUnitPurchase: function(unit){
					unit.callsign = $("#nameWrapper").find("input").val();
					$("#popupWrapper").hide();

					if (game.system){
						game.getUnit(aUnit).doConfirmSystemLoadout();
						game.setUnitTotal(game.getUnit(aUnit));
					}
						

					if (this.refit){
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

					//$("#hangarDiv").addClass("disabled");
					//$("#weaponDiv").addClass("disabled");
					//$("#crewDiv").addClass("disabled");
					$("#hangarTable").html("");
					game.setReinforceFaction(unit);
					aUnit = 0;
					game.ships[0] = undefined;
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
					if  (!this.canConfirm){return;}
					this.canConfirm = 0;
					var data = [];

					for (var i = 0; i < game.shipsBought.length; i++){
						game.shipsBought[i].tr = undefined;

						var unit = {
							type: game.shipsBought[i].getUnitClass(),
							name:game.shipsBought[i].getUnitName(),
							command: game.shipsBought[i].command,
							callsign: game.shipsBought[i].callsign,
							faction: game.shipsBought[i].faction,
							totalCost: game.shipsBought[i].totalCost,
							moraleCost: game.shipsBought[i].moraleCost,
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

				setReinforceFaction: function(unit){
					if (game.faction != ""){return;}

					if (unit.ship){game.faction = unit.faction;}
					else {game.faction = unit.structures[0].faction;}
					$("#reinforceFaction").removeClass("disabled").html(game.faction);
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

					if (unit.squad){unit.setSlotUsage();}

					
					var table = document.getElementById("totalShipCost");
						table.innerHTML = "";

					unit.upgrades = [];
					unit.setBuyData();

					var tr = table.insertRow(-1);
						tr.insertCell(-1).innerHTML = "<th>Base Unit Cost</th>";
						tr.insertCell(-1).innerHTML = unit.cost;


					$(table)
						.append(unit.getBuyTableData(table))
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

				buildNotesList: function(data, t){
					var div = $("<div>").addClass("factionSpecialWrapper");

					for (var i = 0; i < data.length; i++){
						div.append($("<div>").addClass("factionSpecial")
							.append($("<div>").html(data[i][0]))
							.append($("<div>").html(data[i][1])))
					}

					$(t).append(div);
				},

				buildFactionUnitHeader: function(ele){
					ele.append(
						$("<table>")
						.append($("<thead>")
							.append($("<tr>")
								.append($("<th>").css("width", 90).html("Class"))
								.append($("<th>").html(""))
								.append($("<th>").css("width", 80).html("Turning"))
								.append($("<th>").css("width", 80).html("Sensor"))
								.append($("<th>").css("width", 50).html("Cost"))
								.append($("<th>").html("")
								)
							)
						)
						.append($("<tbody>"))
					)
				},

				buildShipList: function(data, t){
					for (var i = 0; i < data.length; i++){
						$(t).append(
							$("<tr>")
								.hover(function(){
									$(this).toggleClass("highlight");
								})
								.append($("<td>").html(data[i]["display"]))
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
										.click(function(){requestBaseUnitData($(this).data());})
									)
								)
							)
						}
				},

				buildSquadList: function(data, t){
					$(t).append(
						$("<tr>").append($("<td>").css("height", 10).attr("colSpan", 5)))
						.append(
						$("<tr>")
							.hover(function(){
								$(this).toggleClass("highlight");
							})
							.css("border-top", "1px solid white")
							.css("border-bottom", "1px solid white")
							.append($("<td>").html("Squadron"))
							.append($("<td>").addClass("squadron")
								.attr("colSpan", 4))
							.append($("<td>")
								.append($("<input>")
									.attr("type", "button")
									.attr("value", "Select")
									.data("name", "Squadron")
									.data("value", 0)
									.click(function(){requestBaseUnitData($(this).data());})
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
								.append($("<td>").html(data[i]["space"]))
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
										.click(function(){game.requestSubUnit($(this).data())})
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
				}
			}

			initPreviewCanvas();
			initFactionAvail();
		} else $("#game").hide();
	})

	function initFactionAvail(){
		console.log("initFactionAvail");
		var icons = [graphics.images.earth, graphics.images.centauri, graphics.images.minbari, graphics.images.narn, graphics.images.vree];
		window.isset = [];

		for (var i = 0; i < factions.length; i++){
			isset[i] = 0;
			$(".factionAvail")
				.append($("<div>")
					.addClass("factionOption")
					.data("faction", i)
					.hover(function(){
						$(this).toggleClass("highlight");
					})
					.click(function(){
						showFactionData($(this).data("faction"))
					})
					.append($(icons[i])))
		}

		for (var i = 0; i < factions.length; i++){
			$(".factionContentWrapper")
			.append($("<div>")
				.hide()
				.addClass("factionWrapper" + i)
				.append($("<div>")
					.html(factions[i])
					.addClass("factionName"))
				.append($("<div>")
					.addClass("factionContent")))

		}
	}

	function requestBaseUnitData(data){
		//console.log("requestBaseUnitData");
		if (game.refit){$(game.getUnit(game.refit).tr).removeClass("selected");}
		game.refit = 0;
		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
					type: "unitdata",
					unit: "ship",
					purchases: game.purchases,
					name: data.name,
					},
			success: prepShowShipDiv,
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

			ship.actions.push(new Move(-1, ship.id, 0, "deploy", 0, 0, res.x/2, res.y/2, -90, -90, 0, 0, 1, 1, 1));
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
			//.css("left", "450px").css("top", Math.max(240, $(".fleetBought").height()+30))
			.css("left", 800).css("top", 10)
			.removeClass("disabled")
			.find(".structContainer").show();

		addNamingDiv(unit);
		addSquadronSlotsDiv(unit);
		addCostDiv(unit);
		game.setUnitTotal(unit);

	}

	function addNamingDiv(unit){
		var callsign = unit.callsign;

		$(unit.element).append(
			$($("<div>")
			.attr("id", "nameWrapper")
			.append($("<table>")
				.append($("<tr>")
					.append($("<td>").css("width", 60).html("Name: "))
					.append($("<td>")
						.append($("<input>").attr("type", "text").prop("value", callsign).click(function(e){e.stopPropagation();})))))))
	}

	function addSquadronSlotsDiv(unit){
		if (!unit.squad){return;}

		$(unit.element)
			.prepend($("<div>")
				.addClass("squadSlots"))
		unit.setSlotUsage();
	}

	function addCostDiv(unit){
		$(unit.element).append($("<div>").css("border", "1px solid white").append($("<table>").attr("id", "totalShipCost")))
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
		//if (unit.squad && unit.structures.length > 2){size *= 1.25;}

		window.shipCtx.clearRect(0, 0, res.x, res.y);
		window.shipCtx.save();
		window.shipCtx.translate(res.x/2, res.y/2);
		window.shipCtx.rotate(-90*(Math.PI/180));
		window.shipCtx.drawImage(unit.getBaseImage(), -size, -size, size*2, size*2);
		window.shipCtx.restore();
	}

	function requestFactionData(i, callback){
		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
					type: "factiondata",
					faction: factions[i],
					},
			success: function(data){callback(i, data)},
			error: ajax.error,
		});
	}

	function showFactionData(i){
		if (isset[i]){
			var ele = $(".factionContentWrapper .factionWrapper" + i);
			if (ele.is(":visible")){ele.hide(); return;}

			$(".factionContentWrapper").children().each(function(){
				$(this).hide();
			})
			ele.show();
		}
		else requestFactionData(i, buildUnitList);
	}

	function buildUnitList(i, data){
		console.log("buildUnitList");
		data = JSON.parse(data);

		window.isset[i] = 1;
		div = $(".factionContentWrapper .factionWrapper" + i + " .factionContent");

		game.buildNotesList(data[0], div);
		game.buildFactionUnitHeader(div);

		var tbody = div.find("table tbody");
		game.buildShipList(data[1], tbody);
		game.buildSquadList(data[2], tbody);
		game.buildFighterList(data[3], tbody);
		game.buildBallisticList(data[4], tbody);

		showFactionData(i);
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