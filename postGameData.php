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
		$valid = $manager->validateFleetCost($_POST["gameid"], $_POST["ships"]);
		if ($valid){
			if ($dbManager->buyShips($_POST["userid"], $_POST["gameid"], $_POST["ships"])) {
				if ($dbManager->createReinforceEntry($_POST["userid"], $_POST["gameid"], $valid, $_POST["faction"])) {
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
		if (isset($_POST["deployedShips"])){
			$dbManager->deployShips($_POST["gameid"], $_POST["deployedShips"]);

		}
		if (isset($_POST["reinforcements"])){
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
	else if ($_POST["type"] == "reset"){
			Debug::log("A");
		if ($manager->reset()){
			Debug::log("RESET");
		}
	}
}
else {
	echo "no data to be found";
}

?>
