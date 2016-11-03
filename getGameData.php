<?php

include_once 'global.php';

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
			$ships = $manager->getShipsForFaction($_GET["faction"]);
			echo json_encode($ships);
		}
		else if ($_GET["type"] == "shipdata"){
			$ship = $manager->getShipClass($_GET["shipClass"]);
			echo json_encode($ship);
		}
	}
}
	



?>
