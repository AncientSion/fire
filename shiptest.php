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

		//	$ships = $manager->logShips("Omega", "Primus", "Hyperion", "GQuan", "Artemis", "Demos", "Haven", "Olympus");		

		// $ships = $manager->logShips("Omega", "Primus", "Hyperion", "Artemis", "Altarian", "Vorchan", "Haven");
		//	$ships = $manager->logShips("all");
			$ships = $manager->logShips("Omega", "Primus", "Hyperion", "Artemis", "Altarian", "Vorchan");
			$shots = 200;
		/*	foreach ($ships[0]->structures[3]->systems as $sys){
				var_export($sys);
				echo "<br><br>";
			}
		*/

			function sortMass($a, $b){
				return $b->mass - $a->mass;
			}

			usort($ships, "sortMass");


			for ($i = 0; $i < sizeof($ships); $i++){

				$mass = $ships[$i]->mass;	
				$ep = $ships[$i]->getEP();

				echo "<table class='unitTest'><tr><th colSpan=2 style='width: 80%'>".$ships[$i]->name."</th></tr>";
				echo "<tr><td colSpan=2>".($ships[$i]->shipType)."</td></tr>";
				echo "<tr><td style='text-align: left'>Mass</td><td style='text-align: right'>".($mass)."</td></tr>";
				echo "<tr><td style='text-align: left'>Main HP</td><td style='text-align: right'>".($ships[$i]->primary->integrity)."</td></tr>";
				echo "<tr><td style='text-align: left'>Total Extra Internal HP </td><td style='text-align: right'>".($ships[$i]->getInternals())."</td></tr>";

				echo "<tr><td style='text-align: left'>EP</td><td style='text-align: right'>".($ep)."</td></tr>";
				echo "<tr><td style='text-align: left'>Turn Cost per 1°</td><td style='text-align: right'>".($ships[$i]->baseTurnCost)."</td></tr>";
				echo "<tr><td style='text-align: left'>Turn Delay per 1°</td><td style='text-align: right'>".($ships[$i]->baseTurnDelay)."</td></tr>";
				echo "<tr><td style='text-align: left'>Max Angle based on EP</td><td style='text-align: right'>".(round($ep / $ships[$i]->baseTurnCost, 2))."°</td></tr>";
				echo "<tr><td style='text-align: left'>Turn Delay 30°</td><td style='text-align: right'>".($ships[$i]->baseTurnDelay * 30)." px</td></tr>";
				echo "<tr><td style='text-align: left'>Base Impulse</td><td style='text-align: right'>".($ships[$i]->baseImpulse)."</td></tr>";
				echo "<tr><td style='text-align: left'>MAX Turn @ Base Impulse</td><td style='text-align: right; color: red'>".(round($ships[$i]->baseImpulse / $ships[$i]->baseTurnDelay, 2))."°</td></tr>";

				$data = $ships[$i]->getTotalMass();
				echo "<tr><td style='text-align: left'>Weapon Mass</td><td style='text-align: right'>".(round($data[2] / $mass * 100, 2))."%</td></tr>";
				echo "<tr><td style='text-align: left'>Main</td><td style='text-align: right'>".($data[0])."</td></tr>";
				echo "<tr><td style='text-align: left'>Internal</td><td style='text-align: right'>".($data[1])."</td></tr>";
				echo "<tr><td style='text-align: left'>Guns</td><td style='text-align: right'>".($data[2])."</td></tr>";
				echo "<tr><td style='text-align: left'>Hangar</td><td style='text-align: right'>".($data[3])."</td></tr>";
				echo "<tr><td style='text-align: left'>Sum</td><td style='text-align: right'>".(array_sum($data))."</td></tr>";


				$fire = new FireOrder(0,0,0,0,0,0,0,0,0,0,0,0);
				$fire->target = $ships[$i];
				$fire->section = $ships[$i]->structures[0]->id;

				$main = 0;
				$internal = 0;
				$wpn = 0;
				$hangar = 0;

				for ($j = 0; $j < $shots; $j++){
			//		var_export($fire);
					$sys = $ships[$i]->getHitSystem($fire);
					if ($sys instanceof Hangar){
						$hangar++;
					}
					else if ($sys instanceof Weapon){
						$wpn++;
					}
					else if ($sys instanceof PrimarySystem){
						$internal++;
						//echo "</br>hitting: ".$sys->name;
					}
					else {
						$main++;
					}
				}

				echo "<tr><td colSpan=2 style='text-align: center; border: 1px solid white;'>Hit Chance from 0° / Front</td></tr>";
				echo "<tr><td style='text-align: left'>Main Structure</td><td style='text-align: right'>".(round($main / $j, 2)*100)."%</td></tr>";
				echo "<tr><td style='text-align: left'>Internals</td><td style='text-align: right'>".(round($internal / $j, 2)*100)."%</td></tr>";
				echo "<tr><th>Primary Total</th><th style='text-align: right'>".(round(($main+$internal) / $j, 2)*100)."%</th></tr>";
				echo "<tr><td style='text-align: left'>Weapons</td><td style='text-align: right'>".(round($wpn / $j, 2)*100)."%</td></tr>";
				echo "<tr><td style='text-align: left'>Hangar</td><td style='text-align: right'>".(round($hangar / $j, 2)*100)."%</td></tr>";
				echo "<tr><th>Outer Total</th><th style='text-align: right'>".(round(($wpn+$hangar) / $j, 2)*100)."%</th></tr>";


				$fire = new FireOrder(0,0,0,0,0,0,0,0,0,0,0,0);
				$fire->target = $ships[$i];
				$fire->section = $ships[$i]->structures[1]->id;

				$main = 0;
				$internal = 0;
				$wpn = 0;
				$hangar = 0;

				for ($j = 0; $j < $shots; $j++){
			//		var_export($fire);
					$sys = $ships[$i]->getHitSystem($fire);
					if ($sys instanceof Hangar){
						$hangar++;
					}
					else if ($sys instanceof Weapon){
						$wpn++;
					}
					else if ($sys instanceof PrimarySystem){
						$internal++;
					}
					else if ($sys instanceof Primary){
						$main++;
					}
					else {debug::log("error");}
				}

				echo "<tr><td colSpan=2 style='text-align: center; border: 1px solid white;'>Hit Chance from 90° / Side</td></tr>";
				echo "<tr><td style='text-align: left'>Main Structure (inc. Intern.)</td><td style='text-align: right'>".(round($main / $j, 2)*100)."%</td></tr>";
				//echo "<tr><td style='text-align: left'>Internals</td><td style='text-align: right'>".(round($internal / $j, 2)*100)."%</td></tr>";
				echo "<tr><th>Primary Total</th><th style='text-align: right'>".(round(($main+$internal) / $j, 2)*100)."%</th></tr>";
				echo "<tr><td style='text-align: left'>Weapons</td><td style='text-align: right'>".(round($wpn / $j, 2)*100)."%</td></tr>";
				echo "<tr><td style='text-align: left'>Hangar</td><td style='text-align: right'>".(round($hangar / $j, 2)*100)."%</td></tr>";
				echo "<tr><th>Outer Total</th><th style='text-align: right'>".(round(($wpn+$hangar) / $j, 2)*100)."%</th></tr>";

				echo "</table>";
			}




			/*
			$time += microtime(true); 
			echo "</br><span style='font-size: 20px'>Time: ".round($time, 3)." seconds.";



			$time = -microtime(true);
				for ($i = 0; $i < 10000000; $i++){
					pow($i,0.5);
					//sqrt($i);
				}

			$time += microtime(true); 

			echo "</br><span style='font-size: 20px'>Time: ".round($time, 3)." seconds.";

			$time = -microtime(true);
				for ($i = 0; $i < 10000000; $i++){
					sqrt($i);
				}

			$time += microtime(true); 

			echo "</br><span style='font-size: 20px'>Time: ".round($time, 3)." seconds.";
			*/			
		?>
	</body>
</html>





<script>

</script>