<?php

class Math {

	function __construct(){

	}

	static function getDist($ax, $ay, $bx, $by){
		return sqrt( pow($bx - $ax, 2) + pow($by - $ay, 2) );
	}

	static function getAngle($ax, $ay, $bx, $by){
		return Math::radToDeg(atan2($by - $ay, $bx - $ax));

	}

	static function radToDeg($rad){
		return $rad * (180 / M_PI);
	}

	static function addAngle($facing, $hitAngle){
		$a = $hitAngle - $facing;
		if ($a < -180){
			$a = $a + 360;
		}
		else if ($a > 180){
			$a = $a - 360;
		}

		return $a;
	}
}


?>