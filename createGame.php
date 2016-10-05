<?php

error_reporting(E_ALL); ini_set('display_errors', '1');
require_once("dbManager.php");
require_once("gameManager.php");
require_once("debug.php");

session_start();


if (isset($_SESSION["userid"])){
	if (isset($_POST["gameName"]) && isset($_POST["pointValue"])){
		if ( $_POST["gameName"] != "" && $_POST["pointValue"] != "" ){
			$dbManager = new DBManager();
			If ($dbManager->createNewGameAndJoin($_SESSION["userid"], $_POST["gameName"], $_POST["pointValue"])){
				header("Location: lobby.php");
			}
		}
		else {
			echo "Please enter game data";
		}
	}
}
else {
	echo "invalid";
}
?>

<!DOCTYPE html>
<html>
<head>
	<link rel='stylesheet' href='style.css'/>
	<script src="jquery-2.1.1.min.js"></script>
	<script src='ajax.js'></script>
</head>
	<body>
		<div style="margin: auto; width: 50%">
			<div>
				<span>Create a new game</span>
			</div>
			<form method="post">
				<table>
					<tr>
						<td>
							<input type="form" placeholder="Game Namee" name="gameName"></input>		
						</td>
					</tr>
					<tr>
						<td>
							<input type="form" placeholder="Point Value" name="pointValue"></input>		
						</td>
					</tr>
					<tr>
						<td>
							<input type="submit" value="Create New Game"></input>	
						</td>
					</tr>
				</table>
		</div>
	</body>
</html>

<script>
</script>
