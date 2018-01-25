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
}
else {
	echo "no data to be found";
}

?>
