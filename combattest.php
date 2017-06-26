<?php
	include_once 'global.php';
	//$manager = new Manager();

	function foo($weapon, $target, $details){
			$target = new $target(0,0,0,0,0,0);
			$weapon = new $weapon(0,0,0,0,0,0,0);
			$fire = new FireOrder(0,0,0,0,0,0,0,0,0,0,0,0);
			$target->setupForDamage();
			$fire->section = $target->structures[0]->id;
			$target->structures[0]->setNegation($target->primary->integrity, 0);
			$fire->weapon = $weapon;
			$fire->target = $target;
			$guns = 25;

			$totalArmour = 0;
			$totalStruct = 0;

			echo "<table style='display:inline-block; margin-left:30px; margin-right: 60px; vertical-align: top'>";

			echo "<tr><th style='font-size: 20px' colSpan=7>".$guns."x ".get_class($fire->weapon)." vs ".get_class($fire->target)."</th></tr>";

			echo "<tr style='font-size: 14px'>";
			echo "<th>Shot</th>";
			echo "<th>Structure</th>";
			echo "<th>TotalDMG</th>";
			echo "<th>StructDMG</th>";
			echo "<th>ArmourDMG</th>";
			echo "<th>Left Armour</th>";
			echo "</tr>";

			for ($i = 0; $i < $guns; $i++){
				echo "<tr>";

				echo "<td>#";
				echo $i;
				echo "</td>";

				echo "<td>";
				echo $target->primary->getRemainingIntegrity($fire);
				echo "</td>";

				$weapon->doDamage($fire, 0, $target->primary);

				$armour = 0;
				$struct = 0;

				for ($k = 0; $k < sizeof($fire->damages); $k++){
					$armour += $fire->damages[$k]->armourDmg;
					$struct += $fire->damages[$k]->structDmg;
					$struct += $fire->damages[$k]->overkill;

					$totalArmour += $armour;
					$totalStruct += $struct;

					if ($details){
						echo "<td>";
						echo $armour + $struct;
						echo "</td>";

						echo "<td>";
						echo $struct;
						echo "</td>";

						echo "<td>";
						echo $target->structures[0]->armourDmg;
						echo "</td>";

						echo "<td>";
						echo $target->structures[0]->getCurrentNegation();
						echo "</td>";
					}
				}
				$fire->damages = array();
						
				//echo "</tr>";

				if ($target->primary->getRemainingIntegrity($fire) <= 0){
					break;
				}

			}	
			echo "<tr></tr>";	
			echo "<tr></tr>";	
			echo "<tr></tr>";	
			echo "<tr></tr>";	
			echo "<tr></tr>";	
			echo "<tr></tr>";	
			echo "<tr>";
			echo "<td>#".$i."</td>";
			echo "<td>".$target->primary->getRemainingIntegrity()."</td>";
			echo "<td>".$target->structures[0]->getCurrentNegation($fire)."</td>";
			echo "<td>".$totalStruct."</td>";
			echo "<td>".$totalArmour."</td>";
			echo "<td>".$target->structures[0]->getCurrentNegation()."</td>";
			echo "</tr>";

	}

?>

<!DOCTYPE html>
<html>
<head>
	<link rel='stylesheet' href='style.css'/>
</head>
	<body> 
		<?php

			$time = -microtime(true);

			foo("HeavyIon", "Hyperion", 1);
			foo("HeavyIon", "Tinashi", 1);

			$time += microtime(true); 
			//echo "<span style='font-size: 20px'>Time: ".round($time, 3)." seconds.";
		
		?>
	</body>
</html>





<script>

</script>