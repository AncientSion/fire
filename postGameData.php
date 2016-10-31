<?php

error_reporting(E_ALL); ini_set('display_errors', '1');
require_once("dbManager.php");
require_once("gameManager.php");
require_once("debug.php");

session_start();

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
		Debug::log("buyInitialFleet");

		$valid = $manager->validateFleetCost($_POST["gameid"], $_POST["ships"]);
		if ($valid){
			debug::log("valid: ".$valid);
			if ($dbManager->buyShips($_POST["userid"], $_POST["gameid"], $_POST["ships"])) {
				if ($dbManager->createReinforcementsEntry($_POST["userid"], $_POST["gameid"], $valid, $_POST["faction"])) {
					if ($dbManager->setPlayerStatus($_POST["userid"], $_POST["gameid"], -1, -1, "ready")) {
						if ($dbManager->gameIsReady($_POST["gameid"])) {
							if ($dbManager->startGame($_POST["gameid"])) {
							}
						}
						else {
							echo "player ready, game not";
						}
					}
				}
			}
		}
	}
	else if ($_POST["type"] == "deployment"){
		if ($dbManager->deployShips($_POST["gameid"], $_POST["deployedShips"])){
			if ($dbManager->setPlayerStatus($_POST["userid"], $_POST["gameid"], $_POST["gameturn"], $_POST["gamephase"], "ready")){
				echo "deploy success";
			}
		}
		else {
			echo "deployShips fail";
		}
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
		if ($dbManager->issueFire($_POST["gameid"], $_POST["gameturn"], $_POST["fire"])){
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
}
else {
	echo "no data to be found";
}

?>
