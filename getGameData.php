<?php


error_reporting(E_ALL); ini_set('display_errors', '1');
require_once("dbManager.php");
require_once("gameManager.php");
require_once("debug.php");

session_start();



if (isset($_SESSION["userid"]) && isset($_SESSION["gameid"])){
	$dbManager = DBManager::app();
	$manager = new Manager($_SESSION["userid"], $_SESSION["gameid"] = 0);
	$gameid = $_SESSION["gameid"];
		
	if (isset($_GET["type"])){
		if ($_GET["type"] == "status"){
			$status = $dbManager->getGameStatus(
												$_GET["gameid"],
												$_GET["userid"],
												$_GET["currentTurn"]
											);
			echo JSON_encode($status);
		}
		else if ($_GET["type"] == "shiplist"){
			$ret = $manager->getShipsForFaction($_GET["faction"]);
			echo json_encode($ret);
		}
		else if ($_GET["type"] == "shipdata"){
			$status = "shipdata";
			echo JSON_encode($status);
		}
	}
}
	



?>
