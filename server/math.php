<?php

class Math {

	function __construct(){
	}

	static function getPointInDirection($dist, $a, $oX, $oY){
		$x = round($oX + $dist * cos($a * M_PI / 180));
		$y = round($oY + $dist * sin($a * M_PI / 180));
		return new Point($x, $y);
	} 

	static function getDist($ax, $ay, $bx, $by){
		return ceil(sqrt ( pow($bx - $ax, 2) + pow($by - $ay, 2) ) );
	}

	static function getDist2($a, $b){
		return ceil(sqrt ( pow($b->x - $a->x, 2) + pow($b->y - $a->y, 2) ) );
	}

	static function getAngle($ax, $ay, $bx, $by){
		return Math::radToDeg(atan2($by - $ay, $bx - $ax));
	}

	static function radToDeg($rad){
		return $rad * (180 / M_PI);
	}

	static function addAngle($f, $a){ // facing, angle
	//demos vs sag	   f 60,  a  49  -> 109    -10/350
	//primus vs omega  f 30,  a -35  -> 354    -60/300

		//360 - f +  a
		//$a = $a % 360;
		$ret = 360 - $f + $a;
		//Debug::log("f: ".$f.", a: ".$a.", ret: ".$ret);

		if ($ret >= 360){
			return $ret - 360;
		}
		else if ($ret < 0){
			return $ret + 360;
		}
		else return $ret;




		/*if ($f > 180 && $a < 0){
			$f -= 180; 
			$a *= 1;
		}

		if ($a < 0){
			$f = 360 - $f;
		}
		if ($f + $a > 360){
			$ret = 0 + ($a -(360-$f));
		}
		else if ($f + $a < 0){
			$ret = 360 + ($f + $a);
		}
		else {
			$ret = $f + $a;
		}
		return $ret;
		*/
	}

	static function isInArc($angle, $start, $end){
		if ($angle >= $start && $angle <= $end){
			return true;
		}
		elseif ($start > $end){
			if ($angle > $start){
				return true;
			}
			elseif ($angle < $end){
				return true;
			}
		}
	}
}


?>