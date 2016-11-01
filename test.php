<?php

error_reporting(E_ALL); ini_set('display_errors', '1');
require_once("dbManager.php");
require_once("gameManager.php");
require_once("debug.php");
session_start();

$manager = new Manager();
$ships = $manager->logShips();


?>

<!DOCTYPE html>
<html>
<head>
	<link rel='stylesheet' href='style.css'/>
	<script src="jquery-2.1.1.min.js"></script>
</head>
	<body> 
		<table class="borderTable">
			<tr>
				<th>
					Class
				</th>
				<th>
					Cost
				</th>
				<th>
					Mass
				</th>
				<th>
					Struct
				</th>
				<th>
					Armour
				</th>
				<th>
					Total
				</th>
				<th>
					Struct / Armour R
				</th>
				<th>
					Mass / Health R
				</th>
			</tr>
			<?php 
				for ($i = 0; $i < sizeof($ships); $i++){

					$mass = $ships[$i]->mass;
					$struct = $ships[$i]->getStructure();
					$armour = $ships[$i]->getArmour();

					echo "<tr>";
					echo "<td>".$ships[$i]->shipClass."</td>";
					echo "<td>".$ships[$i]::$value."</td>";
					echo "<td>".$mass."</td>";
					echo "<td>".$struct."</td>";
					echo "<td>".$armour."</td>";
					echo "<td>".($struct + $armour)."</td>";
					echo "<td>".(floor($struct / $armour * 100)/10)."</td>";
					echo "<td>".floor($mass / ($struct + $armour) * 10)."</td>";
					echo "</tr>";
				}
			?>
	</body>
</html>

<script>

</script>