<?php

include_once 'global.php';

$dbManager = DBManager::app();
$manager = new Manager($_SESSION["userid"], $_SESSION["gameid"] = 0);
$gameid = $_SESSION["gameid"];
	

if (isset($_GET["type"])){
	if ($_GET["type"] == "chat"){
		echo JSON_encode($dbManager->getNewChat($_GET["time"]));
	}
	else if ($_GET["type"] == "gamedata"){
		echo JSON_encode($manager->getClientData(), JSON_NUMERIC_CHECK);
	}
	else if ($_GET["type"] == "gameState"){
		$return = array();
		for ($i = 0; $i < sizeof($_GET["data"]); $i++){
			$gd = $dbManager->getGameDetails($_GET["data"][$i][0]);

			if ($gd["turn"] != $_GET["data"][$i][1]){
				$_GET["data"][$i][1] = $gd["turn"];
				$return[] = $_GET["data"][$i];
			}
			else if ($gd["phase"] != $_GET["data"][$i][2]){
				$_GET["data"][$i][2] = $gd["phase"];
				$return[] = $_GET["data"][$i];
			}
		}

		echo json_encode($return, JSON_NUMERIC_CHECK);
	}
	else if ($_GET["type"] == "shiplist"){
		$ships = $manager->getShipsForFaction($_GET["faction"]);
		echo json_encode($ships);
	}
	else if ($_GET["type"] == "shipdata"){
		$unit = $manager->getPreviewData($_GET);
		echo json_encode($unit, JSON_NUMERIC_CHECK);
	}
	else if ($_GET["type"] == "unitStats"){
		echo json_encode($dbManager->getUnitStats($_GET["gameid"], $_GET["userid"]), JSON_NUMERIC_CHECK);
	}
}
	



?>


