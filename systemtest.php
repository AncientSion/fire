<?php
	include_once 'global.php';
	$manager = new Manager();


	foreach ($_POST as $key => $val){
		if (!$val){
			continue;
		}
		$system = new $val(0, 0, 0, 0);
		$avg = round(($system->minDmg + $system->maxDmg)/2, 2);
		echo "<table class='unitTest'><tr><th colSpan=2 style='width: 210px'>".$system->name."</th></tr>";
		echo "<tr><th colSpan=2 style='text-align: center'>".($system->display)."</th></tr>";
		echo "<tr><td colSpan=2>".$system->fc[0]."% / ".$system->fc[1]."%</td></tr>";
		echo "<tr><td>AccDecay</td><td style='text-align: right'>".($system->accDecay)."</td></tr>";
		echo "<tr><td>Shots</td><td style='text-align: right'>".($system->shots)."</td></tr>";
		echo "<tr><td>MinDmg</td><td style='text-align: right'>".($system->minDmg)."</td></tr>";
		echo "<tr><td>MaxDmg</td><td style='text-align: right'>".($system->maxDmg)."</td></tr>";
		echo "<tr><td>Avg</td><td style='text-align: right'>".($avg)."</td></tr>";
		echo "<tr><td>Dmg per Salvo</td><td style='text-align: right'>".($avg*$system->shots)."</td></tr>";
		echo "</table>";
	}
		/*	
			<?php

				$time = -microtime(true);

				$systems = $manager->logSystemsByClass(array("Matter", "Ion", "Pulse"));
				//$compare = array("LightIon", "MediumIon", "LightPulse", "MediumPulse", "FusionCannon");
				//$systems = $manager->compareSystems($compare);

				for ($i = 0; $i < sizeof($systems); $i++){

				echo "<table class='unitTest'><tr><th colSpan=2 style='width: 210px'>".$systems[$i]->name."</th></tr>";


					$avg = round(($systems[$i]->minDmg + $systems[$i]->maxDmg)/2, 2);
dem
					echo "<tr><th colSpan=2 style='text-align: center'>".($systems[$i]->display)."</th></tr>";
					echo "<tr><td colSpan=2>".$systems[$i]->fc[0]."% / ".$systems[$i]->fc[1]."%</td></tr>";
					echo "<tr><td>AccDecay</td><td style='text-align: right'>".($systems[$i]->accDecay)."</td></tr>";
					echo "<tr><td>Shots</td><td style='text-align: right'>".($systems[$i]->shots)."</td></tr>";
					echo "<tr><td>MinDmg</td><td style='text-align: right'>".($systems[$i]->minDmg)."</td></tr>";
					echo "<tr><td>MaxDmg</td><td style='text-align: right'>".($systems[$i]->maxDmg)."</td></tr>";
					echo "<tr><td>Avg</td><td style='text-align: right'>".($avg)."</td></tr>";
					echo "<tr><td>Dmg per Salvo</td><td style='text-align: right'>".($avg*$systems[$i]->shots)."</td></tr>";

					echo "</table>";

				}

				$time += microtime(true); 
				echo "</br><span style='font-size: 20px'>Time: ".round($time, 3)." seconds.";

			?>
*/

?>

<!DOCTYPE html>
<html>
<head>
	<link rel='stylesheet' href='style.css'/>
</head>
	<body> 
		<div>
			<form method="post">
				<table style="width: 100%; margin: auto" >
					<tr>
						<td>
							<input type="form" style="text-align: center" placeholder="system name" name="a"></input>		
						</td>
					</tr>
					<tr>
						<td>
							<input type="form" style="text-align: center" placeholder="system name" name="b"></input>		
						</td>
					</tr>
					<tr>
						<td>
							<input type="form" style="text-align: center" placeholder="system name" name="c"></input>		
						</td>
					</tr>
					<tr>
						<td>
							<input type="form" style="text-align: center" placeholder="system name" name="d"></input>		
						</td>
					</tr>
					<tr>
						<td>
							<input type="form" style="text-align: center" placeholder="system name" name="e"></input>		
						</td>
					</tr>
					<tr>
						<td>
							<input type="submit" value="Confirm and Forward"></input>	
						</td>
					</tr>
				</table>
		</div>
	</body>
</html>





<script>

</script>