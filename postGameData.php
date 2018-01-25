<?php
//include_once 'global.php';

$manager;
$dbManager;

if (isset($_POST["type"])) {
	$dbManager = DBManager::app();

	if ($_POST["type"] == "chat"){
		$dbManager->insertChatMsg($_POST);
		return true;
	}

	$manager = new Manager($_POST["userid"], $_POST["gameid"]);

	if ($_POST["type"] == "joinGame") {
		Debug::log("joinGame success");
		if ($dbManager->createPlayerStatus($_POST["userid"], $_POST["gameid"], 0, -1, "joined")) {
			Debug::log("joinGame success");
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
		else echo "Invalid Fleet";
	}
}
else {
	echo "no data to be found";
}

?>
