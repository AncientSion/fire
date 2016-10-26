<?php

class Math {

	function __construct(){

	}

	static function getDist($ax, $ay, $bx, $by){
		return ceil(sqrt ( pow($bx - $ax, 2) + pow($by - $ay, 2) ) );
	}

	static function getAngle($ax, $ay, $bx, $by){
		return Math::radToDeg(atan2($by - $ay, $bx - $ax));

	}

	static function radToDeg($rad){
		return $rad * (180 / M_PI);
	}
/*
	static function addAngle($facing, $hitAngle){
		debug::log("facing: ".$facing.", angle: ".$hitAngle);
		$a = $hitAngle - $facing;
		if ($a < -180){
			$a = $a + 360;
		}
		else if ($a > 180){
			$a = $a - 360;
		}

		return $a;
	}	
	*/

	static function addAngle($facing, $hitAngle){
		//debug::log("facing: ".$facing.", angle: ".$hitAngle);
		//150     - 94

		$ret = 360 - $facing + $hitAngle;

		if ($ret < 0){
			return 360 - $ret;
		}
		else if ($ret > 360){
			return $ret - 360;
		}
		else if ($ret == 360){
			$ret = 0;
		}

		return $ret;
	}

	static function isInArc($angle, $start, $end){

		//debug::log("testing ".$angle." versus ".$start." - ".$end);

		if ($angle >= $start && $angle <= $end){
			//Debug::log("AAAAAA");
			return true;
		}
		//  
		//	testing 322 versus. 300 to 60
		//	testing 55 versus. 270 to 90
		elseif ($start > $end){
			if ($angle > $start){
				//Debug::log("BBBBBB");
				return true;
			}
			elseif ($angle < $end){
				//Debug::log("CCCCCC");
				return true;
			}
		}
	}


/*

			fire 46
			shooter: 153 vs target154
			testing 322 versus. 300 to 60
			testing 322 versus. 60 to 180
			testing 322 versus. 180 to 300
			fire 47
			shooter: 153 vs target154
			testing 322 versus. 300 to 60
			testing 322 versus. 60 to 180
			testing 322 versus. 180 to 300


*/

		/*	$("#curArc").html("vector angle, start, end: " + direction + " - " + start + " - " + end);
			
			if (start == end)
				return true;
				
			if ((direction == 0 && start == 360) || (direction == 0 && end == 360))
				return true;

			if (start > end){
				return (direction >= start || direction <= end);			
			}
			else if (direction >= start && direction <= end){
				return true;
			}
			else {
				return false;
			}
		*/
}


?>