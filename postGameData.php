<?php
include_once $_SERVER["DOCUMENT_ROOT"]."/fire/global.php";

$manager;
$dbManager;
//return;

if (isset($_POST["type"])) {
	$dbManager = DBManager::app();

	if ($_POST["type"] == "chat"){
		$dbManager->insertChatMsg($_POST);
		return true;
	}

	$manager = new Manager($_POST["gameid"], $_POST["userid"]);

	if ($_POST["type"] == "joinGame") {
		//Debug::log("joinGame success");
		if ($dbManager->createPlayerStatus($_POST["userid"], $_POST["gameid"], 0, -1, "joined")) {
			//Debug::log("joinGame success");
		}
		else {
			//echo "joinGame fail";
		}
	}
	else if ($_POST["type"] == "leaveGame") {
		echo $dbManager->leaveGame($_POST["userid"], $_POST["gameid"]);
	}
	else if ($_POST["type"] == "buyInitialFleet") {
		$rem = $manager->verifyFleetCost($_POST["ships"]);
		if ($rem < 0){echo "Invalid Fleet"; return;}
	
		if ($dbManager->processInitialBuy($_POST["userid"], $_POST["gameid"], $_POST["ships"], $rem, $_POST["faction"])){
			if ($dbManager->gameIsReady($_POST["gameid"])) {
				if ($dbManager->startGame($_POST["gameid"])) {
					header("Location: game.php?gameid=".$_POST["gameid"]);
				}
			}
			else {
				header("Location: lobby.php");
			}
		}
	}
	else if ($_POST["type"] == "deploy"){
		if (isset($_POST["deployedShips"])){
			$dbManager->deployShipsDB($_POST["gameid"], $_POST["deployedShips"]);
		}
		if (isset($_POST["requestReinforce"])){
			$dbManager->requestShipsDB($_POST["userid"], $_POST["gameid"], $manager->turn, $_POST["requestReinforce"]);
		}
		if (isset($_POST["plannedMoves"])){
			$dbManager->insertClientActions($_POST["plannedMoves"]);
		}
		if (isset($_POST["deployedFlights"])){
			$dbManager->deployFlightsDB($_POST["userid"], $_POST["gameid"], $_POST["deployedFlights"]);
		}
		if (isset($_POST["missions"])){
			$dbManager->insertMissions($_POST["missions"]);
		}
		if (isset($_POST["powers"])){
			$dbManager->insertPowers($_POST["gameid"], $_POST["turn"], $_POST["powers"]);
		}
		if (isset($_POST["fireOrders"])){
			$dbManager->insertClientFireOrders($_POST["gameid"], $_POST["turn"], $_POST["fireOrders"]);
		}
		if (isset($_POST["ew"])){
			$dbManager->insertEW($_POST["ew"]);
		}
		$dbManager->setPlayerStatus($_POST["userid"], $_POST["gameid"], $_POST["turn"], $_POST["phase"], "ready");
	}
	else if ($_POST["type"] == "movement"){
		$dbManager->deletePlannedMoves($_POST["ships"], $_POST["turn"]);
		$dbManager->insertClientActions($_POST["ships"]);
		$dbManager->setPlayerStatus($_POST["userid"], $_POST["gameid"], $_POST["turn"], $_POST["phase"], "ready");
	}
	else if ($_POST["type"] == "firing"){
		if ($dbManager->insertClientFireOrders($_POST["gameid"], $_POST["turn"], $_POST["fireOrders"])){
			//return;
			if ($dbManager->setPlayerStatus($_POST["userid"], $_POST["gameid"], $_POST["turn"], $_POST["phase"], "ready")){
				echo "firing success";
			}
		}
		else {
			echo "firing fail";
		}
	}
	else if ($_POST["type"] == "damageControl"){
		if (sizeof($_POST["jumpout"])){
			$dbManager->jumpOutUnits($_POST["jumpout"]);
		}
		if (sizeof($_POST["focus"])){
			$dbManager->updateFocusState($_POST["focus"]);
		}
		if (sizeof($_POST["commandChange"]) && $_POST["commandChange"]["new"]){
			$dbManager->updateCommandState($_POST);
		}
		if ($dbManager->setPlayerStatus($_POST["userid"], $_POST["gameid"], $_POST["turn"], $_POST["phase"], "ready")){
			echo "damageControl success";
		}
	}
	else if ($_POST["type"] == "concede"){
		$dbManager->handleConcession($_POST["userid"], $_POST["gameid"], $_POST["turn"], $_POST["phase"]);
	}
}
else {
	echo "lacking post data !";
}

?>
