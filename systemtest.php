<?php
	include_once 'global.php';
	$manager = new Manager();
?>

<!DOCTYPE html>
<html>
<head>
	<link rel='stylesheet' href='style.css'/>
</head>
	<body> 
			<?php

				$time = -microtime(true);

				$systems = $manager->logSystemsByClass(array("Matter", "Ion"));
				//$compare = array("LightIon", "MediumIon", "LightPulseCannon", "MediumPulseCannon", "FusionCannon");
				//$systems = $manager->compareSystems($compare);

				for ($i = 0; $i < sizeof($systems); $i++){

				echo "<table class='unitTest'><tr><th colSpan=2 style='width: 210px'>".$systems[$i]->name."</th></tr>";


					$avg = round(($systems[$i]->minDmg + $systems[$i]->maxDmg)/2, 2);

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

		</table>
	</body>
</html>





<script>

</script>