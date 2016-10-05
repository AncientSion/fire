<?php

error_reporting(E_ALL); ini_set('display_errors', '1');
require_once("dbManager.php");
require_once("debug.php");
session_start();


if (isset($_SESSION["userid"]) && $_SESSION["userid"] != false){
	header("Location: lobby.php");
}


if (isset($_POST["username"]) && isset($_POST["password"])){
	if ( $_POST["username"] != "" && $_POST["password"] != "" ){
		$dbManager = DBManager::app();
		$data = $dbManager->validateLogin($_POST["username"], $_POST["password"]);
		if ($data){
			$_SESSION["userid"] = $data["id"];
			$_SESSION["access"] = $data["access"];
			header("Location: lobby.php");	
		}
		else {
			echo "<font color='red'>Please enter valid login data</font>";
		}
	}
	else {
			echo "<font color='red'>Please enter valid login data</font>";
	}
}
else if (isset($_POST["newUsername"]) && isset($_POST["newPassword"])){
	if ( $_POST["newUsername"] != "" && $_POST["newPassword"] != "" ){
		$dbManager = new DBManager();
		$dbManager->registerAccount($_POST["newUsername"], $_POST["newPassword"]);
	}
	else {
		echo "Please enter valid registratin data";	
	}
}



?>

<!DOCTYPE html>
<html>
<head>
	<link rel='stylesheet' href='style.css'/>
	<script src="jquery-2.1.1.min.js"></script>
</head>
	<body> 
		<div style="margin: auto; width: 500px">
			<div id="loginDiv">
				<form method="post">
					<input type="form" style="margin-bottom: 5px; margin-top: 5px" placeholder="Enter Username here" name="username" value="Chris"></input>
					<input type="form" style="margin-bottom: 5px;"placeholder="Enter Password here" name="password" value="147147"></input>
					<input type="submit" style="width: auto; display: block;" value="Login"></input>	
					</br>
				</form>
					<input type="button" style="margin-top: 30px; margin-bottom: 10px;" value="Or Register" onclick="register()"></input>
			</div>
			
			<div id="registerDiv">
				<form method="post">
					<input type="form" placeholder="Enter new Username here" name="newUsername"></input>	
					<input type="form" placeholder="Enter new Password here" name="newPassword"></input>
					<input type="submit" value="Create Account"></input>
				</form>	
			</div>
			<div style="margin: auto; margin-top: 20px; display: block; text-align: center; width: auto; border: none;">
				<span>
					<a href="logout.php">
						EXIT
					</a>
				</span>
			</div>
		</div>
	</body>
</html>

<script>

function register(){
	$("#loginDiv").hide();
	$("#registerDiv").show();
}

</script>