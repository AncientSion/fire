<?php

include_once 'global.php';

$manager;
$dbManager;

if (isset($_POST["type"])) {
	$manager = new Manager($_POST["userid"], $_POST["gameid"]);
	$dbManager = DBManager::app($_POST["userid"]);


	if ($_POST["type"] == "joinGame") {
		debug::log("join");
		if ($dbManager->createPlayerStatus($_POST["userid"], $_POST["gameid"], 0, -1, "joined")) {
			echo "joinGame success";
		}
		else {
			echo "joinGame fail";
		}
	}
	else if ($_POST["type"] == "leaveGame") {
		if ($dbManager->leaveGame($_POST["userid"], $_POST["gameid"])) {
			echo "leaveGame success";
		}
		else {
			echo "leaveGame fail";
		}
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
		if (isset($_POST["deployedShips"])){
			$dbManager->deployShipsDB($_POST["gameid"], $_POST["deployedShips"]);
		}
		if (isset($_POST["deployedFlights"])){
			$dbManager->deployFlightsDB($_POST["userid"], $_POST["gameid"], $_POST["deployedFlights"]);
		}
		if (isset($_POST["powers"])){
			$dbManager->insertPowers($_POST["gameid"], $_POST["gameturn"], $_POST["powers"]);
		}
		if (isset($_POST["fireOrders"])){
			$dbManager->insertFireOrders($_POST["gameid"], $_POST["gameturn"], $_POST["fireOrders"]);
		}
		if (isset($_POST["reinforcements"])){
			for ($i = 0; $i < sizeof($_POST["reinforcements"]); $i++){
				$_POST["reinforcements"][$i]["turn"] = $manager->turn;
			}
			$dbManager->requestReinforcements($_POST["userid"], $_POST["gameid"], $_POST["reinforcements"]);
		}

		$dbManager->setPlayerStatus($_POST["userid"], $_POST["gameid"], $_POST["gameturn"], $_POST["gamephase"], "ready");
	}
	else if ($_POST["type"] == "movement"){
		if ($dbManager->issueMovement($_POST["gameid"], $_POST["ships"])){
			if ($dbManager->setPlayerStatus($_POST["userid"], $_POST["gameid"], $_POST["gameturn"], $_POST["gamephase"], "ready")){
				echo "movement success";
			}
		}
		else {
			echo "movement fail";
		}
	}
	else if ($_POST["type"] == "firing"){
		if ($dbManager->insertFireOrders($_POST["gameid"], $_POST["gameturn"], $_POST["fireOrders"])){
			if ($dbManager->setPlayerStatus($_POST["userid"], $_POST["gameid"], $_POST["gameturn"], $_POST["gamephase"], "ready")){
				echo "firing success";
			}
		}
		else {
			echo "firing fail";
		}
	}
	else if ($_POST["type"] == "damageControl"){
		if ($dbManager->setPlayerStatus($_POST["userid"], $_POST["gameid"], $_POST["gameturn"], $_POST["gamephase"], "ready")){
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
