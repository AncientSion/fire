<?php

include_once $_SERVER["DOCUMENT_ROOT"]."/fire/global.php";
$userid = 0;
$gameid = 0;
if (isset($_SESSION["userid"])){$userid = $_SESSION["userid"];}
if (isset($_SESSION["gameid"])){$gameid = $_SESSION["gameid"];}


//Debug::log("getGameData.php");
//Debug::log("userid: ".$userid); Debug::log("gameid: ".$gameid);


if (isset($_GET["type"])){
	if ($_GET["type"] == "chat"){
		//Debug::log("chat");
		echo JSON_encode(DBManager::app()->getNewChat($_GET["time"]));
	}
	else if ($_GET["type"] == "gamedata"){
		$manager = new Manager($_GET["gameid"], $_GET["userid"]);
		$manager->getGameData();
		//$manager->handleFocusMovePhase(); return;
		echo JSON_encode($manager->getClientData(), JSON_NUMERIC_CHECK);
		return;
	}
	else if ($_GET["type"] == "gameState"){
		//Debug::log("gameState");
		$dbManager = DBManager::app();
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
	else {
		$dbManager = DBManager::app();
		$manager = new Manager($gameid, $userid);
		if ($_GET["type"] == "factiondata"){
			$ships = $manager->getFactionData($_GET["faction"]);
			echo json_encode($ships);
		}
		else if ($_GET["type"] == "unitdata"){
			$unit = $manager->getPreviewData($_GET);
			echo json_encode($unit, JSON_NUMERIC_CHECK);
		}
		else if ($_GET["type"] == "unitStats"){
			//Debug::log("unitStats");
			echo json_encode($dbManager->getDamageStatistics($_GET["gameid"], $_GET["userid"]), JSON_NUMERIC_CHECK);
		}
	}
}
	



?>


