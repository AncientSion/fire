<?php
	include_once 'global.php';

	$balls = array();

				$time = -microtime(true);

	for ($i = 0; $i < 15; $i++){
		$balls[] = new Salvo($i, 1, 0, "Hasta", "launched", 1, 0);

		$balls[$i]->shooterid = mt_rand(0, 10);

		if (mt_rand(0, 3) >= 1){
			$balls[$i]->target = new Salvo($i, 0, 0, 0, 0, 0, 0);
		} else $balls[$i]->target = new Tethys($i, 0, 0);
	}

	
	foreach ($balls as $ball){
		echo "</br>";
		echo $ball->id." - target: ". get_class($ball->target)." #".$ball->target->id;
		echo "</br>";
	}

	/*usort($balls, function($a, $b){
		if ($a->target->salvo != $b->target->salvo){
			return $b->target->salvo - $a->target->salvo;
		}
		else return $a->target->id - $b->target->id;
	});*/

		usort($balls, function($a, $b){
			return $a->shooterid - $b->shooterid;
		});

		echo "</br>";
		echo "</br>";
		echo "</br>";

	foreach ($balls as $ball){
		echo "</br>";
		//echo $ball->id." - target: ". get_class($ball->target)." #".$ball->target->id;
		echo $ball->id." - ".$ball->shooterid;
		echo "</br>";
	}
		echo "</br>";
		echo "</br>";
				$time += microtime(true); 
				echo "</br><span style='font-size: 20px'>Time: ".round($time, 3)." seconds.";
	?>

<!DOCTYPE html>
<html>
<head>
	<link rel='stylesheet' href='style.css'/>
</head>
	<body> 
	</body>
</html>





<script>

</script>