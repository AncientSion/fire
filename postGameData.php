<?php

include_once 'global.php';

$manager;
$dbManager;

if (isset($_POST["type"])) {
	if (isset($_POST["type"])){
		DBManager::app()->insertChatMsg($_POST);
		return true;
	}
	return;

	$manager = new Manager($_POST["userid"], $_POST["gameid"]);
	$dbManager = DBManager::app($_POST["userid"]);

	if ($_POST["type"] == "joinGame") {
		if ($dbManager->createPlayerStatus($_POST["userid"], $_POST["gameid"], 0, -1, "joined")) {
			echo "joinGame success";
		}
		else {
			echo "joinGame fail";
		}
	}
	else if ($_POST["type"] == "leaveGame") {
		echo $dbManager->leaveGame($_POST["userid"], $_POST["gameid"]);
	}
	else if ($_POST["type"] == "buyInitialFleet") {
		$rem = $manager->validateFleetCost($_POST["ships"]);
		if ($rem >= 0){
			if ($dbManager->processInitialBuy($_POST["userid"], $_POST["gameid"], $_POST["ships"], $rem, $_POST["ships"][0]["faction"])) {
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
		else echo "Invalid Fleet";
	}
	else if ($_POST["type"] == "deployment"){
		if (isset($_POST["initial"])){
			$dbManager->deployShipsDB($_POST["gameid"], $_POST["initial"]);
		}
		if (isset($_POST["reinforce"])){
			$dbManager->requestShipsDB($_POST["userid"], $_POST["gameid"], $manager->turn, $_POST["reinforce"]);
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
		//return;
		$dbManager->setPlayerStatus($_POST["userid"], $_POST["gameid"], $_POST["turn"], $_POST["phase"], "ready");
	}
	else if ($_POST["type"] == "movement"){;
		if ($dbManager->insertClientActions($_POST["ships"])){
			if ($dbManager->setPlayerStatus($_POST["userid"], $_POST["gameid"], $_POST["turn"], $_POST["phase"], "ready")){
				echo "movement success";
			}
		} else echo "movement fail";
	}
	else if ($_POST["type"] == "firing"){
		if ($dbManager->insertClientFireOrders($_POST["gameid"], $_POST["turn"], $_POST["fireOrders"])){
			if ($dbManager->setPlayerStatus($_POST["userid"], $_POST["gameid"], $_POST["turn"], $_POST["phase"], "ready")){
				echo "firing success";
			}
		}
		else {
			echo "firing fail";
		}
	}
	else if ($_POST["type"] == "damageControl"){
		if ($dbManager->setPlayerStatus($_POST["userid"], $_POST["gameid"], $_POST["turn"], $_POST["phase"], "ready")){
			echo "damageControl success";
		}
	}
	else if ($_POST["type"] == "reset"){
		if ($manager->reset()){
		}
	}
}
else {
	echo "no data to be found";
}

?>
