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


	static function addToDirection($current, $add){
        $add = $add % 360;

		$ret = 0;
		if ($current + $add > 360){
			$ret =  0+($add-(360-$current));
				
		}else if ($current + $add < 0){
			$ret = 360 + ($current + $add);
		}else{	
			$ret = $current + $add;
		}
		return $ret;
	}
}


?>