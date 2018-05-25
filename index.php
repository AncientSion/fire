<?php
include(dirname(__FILE__) . "/global.php");
//session_start();

if (isset($_SESSION["userid"]) && $_SESSION["userid"] != false){
	header("Location: lobby.php");
	return;
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
		echo "<div style='color: red; font-size: 24px; margin: auto; margin-top: 50px; width: 400px'> Please enter valid registration data</div>";	
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
		<div id="loginDiv">
			<form method="post">
				<input type="text" style="float: left;" placeholder="Enter Username here" name="username" value=""></input>
				<input type="password" style="float: right;" placeholder="Enter Password here" name="password" value=""></input>
				<input type="submit" value="Login"></input>	
				</br>
			</form>
		</div>

		<div style="margin: auto; width: 700px">
			<img style="width: 700px; height: 322px;" src="varIcons/header.jpg">
		</div>
		
		<div id="registerDiv">
			<form method="post">
				<input type="text" style="float: left;" placeholder="Enter new Username here" name="newUsername"></input>	
				<input type="text" style="float: right;" placeholder="Enter new Password here" name="newPassword"></input>
				<input type="submit" value="Register New Account"></input>
			</form>	
		</div>
	</body>
</html>

<script>
</script>