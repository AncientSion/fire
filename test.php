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
		<table class="fullBorderTable">
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
					Struct per M
				</th>
				<th>
					Armour per M
				</th>
			</tr>
		</table>
			<?php

				$time = -microtime(true);

				$ships = $manager->logShips("All");
				

				function sortMass($a, $b){
					return $a->mass - $b->mass;
				}

				usort($ships, "sortMass");



				for ($i = 0; $i < sizeof($ships); $i++){
					$fires[] = new FireOrder(0,0,0,0,0,0,0,0,0,0,0,0);
				}
				for ($i = 0; $i < sizeof($fires); $i++){
					$fires[$i]->section = $ships[$i]->structures[0]->id;
					$fires[$i]->target = $ships[$i];

					echo "<table class='unitTest'><tr><th colSpan=2 style='width: 210px'>".$ships[$i]->classname."</th></tr>";

					$main = 0;
					$internal = 0;
					$wpn = 0;
					$hangar = 0;

					for ($j = 0; $j < 500; $j++){
						$sys = $ships[$i]->getHitSystem($fires[$i]);
						if ($sys instanceof Hangar){
							$hangar++;
						}
						else if ($sys instanceof Weapon){
							$wpn++;
						}
						else if ($sys instanceof PrimarySystem){
							$internal++;
						}
						else {
							$main++;
						}
					}

					$mass = $ships[$i]->mass;
					$armour = $ships[$i]->getArmour();			
					$struct = $ships[$i]->getStructure();
					$negation = array_sum($armour["negation"]) / sizeof($armour["negation"]);

					echo "<tr><td>Mass</td><td style='text-align: right'>".($ships[$i]->mass)."</td></tr>";
					echo "<tr><td>Str per 1 Mass</td><td style='text-align: right'>".(round($struct / $mass, 2))."</td></tr>";
					echo "<tr><td>Arm per 1 Mass</td><td style='text-align: right'>".(round($armour["integrity"] / $mass, 2))."</td></tr>";
					echo "<tr><td>Weapon Mass</td><td style='text-align: right'>".(round($ships[$i]->getWeapons() / $mass, 3))."</td></tr>";
					echo "<tr><td>Avg Armour</td><td style='text-align: right'>".(round($negation, 2))."</td></tr>";
					echo "<tr><td></td><td></td></tr>";
					echo "<tr><td>Main Structure</td><td style='text-align: right'>".(round($main / $j, 2)*100)."%</td></tr>";
					echo "<tr><td>Internals</td><td style='text-align: right'>".(round($internal / $j, 2)*100)."%</td></tr>";
					echo "<tr><td>Primary Total</td><td style='text-align: right'>".(round(($main+$internal) / $j, 2)*100)."%</td></tr>";
					echo "<tr><td>Weapons</td><td style='text-align: right'>".(round($wpn / $j, 2)*100)."%</td></tr>";
					echo "<tr><td>Hangar</td><td style='text-align: right'>".(round($hangar / $j, 2)*100)."%</td></tr>";

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