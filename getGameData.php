<?php

include_once 'global.php';
$userid = 0;
$gameid = 0;
if (isset($_SESSION["userid"])){$userid = $_SESSION["userid"];}
if (isset($_SESSION["gameid"])){$gameid = $_SESSION["gameid"];}


//Debug::log("getGameData.php");


if (isset($_GET["type"])){
	if ($_GET["type"] == "chat"){
		echo JSON_encode(DBManager::app()->getNewChat($_GET["time"]));
	}
	else if ($_GET["type"] == "gamedata"){
		$manager = new Manager($_GET["gameid"], $_GET["userid"]);
		$manager->getGameData();
		echo JSON_encode($manager->getClientData(), JSON_NUMERIC_CHECK);
		return;
	}
	else {
		$dbManager = DBManager::app();
		$manager = new Manager($gameid, $userid);
		if ($_GET["type"] == "gameState"){
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
			$ships = $manager->getUnitsForFaction($_GET["faction"]);
			echo json_encode($ships);
		}
		else if ($_GET["type"] == "shipdata"){
			$unit = $manager->getPreviewData($_GET);
			echo json_encode($unit, JSON_NUMERIC_CHECK);
		}
		else if ($_GET["type"] == "unitStats"){
			echo json_encode($dbManager->getDamageStatistics($gameid, $userid), JSON_NUMERIC_CHECK);
		}
	}
}
	



?>


