<?php

	include_once $_SERVER["DOCUMENT_ROOT"]."/fire/global.php";

	$gameid = $_GET["gameid"];
	$gameid = 2;
	$db = DBManager::app();

	$sql = "SELECT
				units.name, units.id, units.userid,
				COALESCE(SUM(damages.armourDmg), 0) AS ArmourDamage,
				COALESCE(SUM(damages.structDmg), 0) AS SystemDamage,
				COALESCE(SUM(damages.overkill), 0) AS HealthDamage
				from units
			LEFT JOIN fireorders ON
				fireorders.shooterid = units.id
			LEFT JOIN damages ON
				damages.fireid = fireorders.id
			WHERE units.gameid = ".$gameid." GROUP BY units.id";

	//$sql = "SELECT * from UNITS where gameid = ".$gameid;

	$rows = $db->query($sql);

	foreach ($rows as $row){
		var_export($row);
		echo "</br></br>";
	}

?>


<!DOCTYPE html>
<html>
<head>
	<link rel='stylesheet' href='style.css'/>
</head>
	<body>
	
	</body>
</html>