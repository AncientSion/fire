<?php

include_once 'global.php';

if (isset($_SESSION["userid"])){
	if (isset($_POST["gameName"]) && isset($_POST["pointValue"])){
		if ( $_POST["gameName"] != "" && $_POST["pointValue"] != ""){
			if (ctype_digit($_POST["pointValue"])){
				$dbManager = new DBManager();
				$id = $dbManager->createNewGameAndJoin($_SESSION["userid"], $_POST["gameName"], $_POST["pointValue"]);
				if ($id){
					header("Location: gameSetup.php?gameid=".$id);
				}
			}
			else {
				echo "<span class='hinter'>Invalid point value entered</span>";
			}
		}
		else {
				echo "<span class='hinter'>Please enter valid game data</span>";
		}
	}
}
else {
	echo "<span class='hinter'>Please login</span>";
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
							<input type="form" value='myGame' placeholder="Game Name" name="gameName"></input>		
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
