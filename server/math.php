<?php

class Math {

	function __construct(){
	}

	static function isInPath($a, $b, $c, $size) {
		// Calculate the euclidean distance between a & b
		$eDistAtoB = sqrt(pow($b->x - $a->x, 2) + pow($b->y - $a->y, 2));

		// compute the direction vector d from a to b
		$d = new Point(($b->x-$a->x) / $eDistAtoB, ($b->y-$a->y) / $eDistAtoB);

		// Now the line equation is x = dx*t + ax, y = dy*t + ay with 0 <= t <= 1.

		// compute the value t of the closest point to the circle center (cx, cy)
		$t = ($d->x * ($c->x - $a->x)) + ($d->y * ($c->y - $a->y));

		// compute the coordinates of the point e on line and closest to c
		$e = array(new Point(($t * $d->x) + $a->x, ($t * $d->y) + $a->y), 0);

		// Calculate the euclidean distance between c & e
		$eDistCtoE = sqrt(pow($e[0]->x - $c->x, 2) + pow($e[0]->y - $c->y, 2));

		// test if the line intersects the circle
		if ($eDistCtoE <= $size){
			//Debug::log("eDistCtoE ".$eDistCtoE." below size ".$size);
			// compute distance from t to circle intersection point
			$dt = sqrt( pow($size, 2) - pow($eDistCtoE, 2));

			$in = array(
				new Point(
					(($t-$dt) * $d->x) + $a->x, 
					(($t-$dt) * $d->y) + $a->y
				), 0);
			$in[1] = static::is_on($a, $b, $in[0]);
			Debug::log("x ".$in[0]->x.", y ".$in[0]->y);

			$out = array(
				new Point(
					(($t+$dt) * $d->x) + $a->x, 
					(($t+$dt) * $d->y) + $a->y
				), 0);
			$out[1] = static::is_on($a, $b, $out[0]);
			Debug::log("x ".$out[0]->x.", y ".$out[0]->y);

			return array("dist" => $dt, "points" => array($in, $out));
		}
		return false;
	}

	static function is_on($a, $b, $c) {
		return (round(static::getDist2($a, $c) + static::getDist2($c, $b)) == round(static::getDist2($a, $b)));
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
		return sqrt ( pow($b->x - $a->x, 2) + pow($b->y - $a->y, 2) );
	}
	static function getDist2a($a, $b){
		return ceil(sqrt ( pow($b->x - $a->x, 2) + pow($b->y - $a->y, 2) ) );
	}

	static function getAngle($ax, $ay, $bx, $by){
		return Math::radToDeg(atan2($by - $ay, $bx - $ax));
	}

	static function getAngle2($a, $b){
		return Math::addAngle(0, Math::radToDeg(atan2($b->y - $a->y, $b->x - $a->x)));
	}

	static function radToDeg($rad){
		return $rad * (180 / M_PI);
	}

	static function addAngle($f, $a){
		$ret = 360 - $f + $a;
		while ($ret > 360){$ret -= 360;}
		while ($ret < 0){$ret += 360;}
		return $ret;
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

	static function getVector($a, $b, $s){
		return new Vector($a, $b, $s);
	}

	static function canIntercept($origin, $target, $targetVector, $v){
		$tx = $target->x - $origin->x;
		$ty = $target->y - $origin->y;
		$tvx = $targetVector->vx;
		$tvy = $targetVector->vy;

		$a = $tvx*$tvx + $tvy*$tvy - $v*$v;
		$b = 2 * ($tvx * $tx + $tvy * $ty);
		$c = $tx*$tx + $ty*$ty;

		$ts = Math::solve($a, $b, $c);

		$sol = false;
		if ($ts){
			$t0 = $ts[0];
			$t1 = $ts[1];
			$t = min($t0, $t1);
			if ($t < 0){$t = max($t0, $t1);}
			if ($t0 > 0){
				$sol = new Point(
					$target->x + $tvx * $t,
					$target->y + $tvy * $t
				);
			}
		}
		return $sol;
	}

	static function solve($a, $b, $c){
		$sol = false;
		if (abs($a) < 1e-6){
			if (abs($b) < 1e-6){
				$sol = abs($c) < 1e-6 ? array(0, 0) : false;
			}
			else {
				$sol = array(-$c/$b, -$c/$b);
			}
		}
		else {
			$disc = $b*$b - 4*$a*$c;
			if ($disc >= 0){
				$disc = sqrt($disc);
				$a = 2*$a;
				$sol = array( (-$b-$disc)/$a, (-$b+$disc)/$a );
			}
		}
		return $sol;
	}
	static function getArcWidth($system){
		if ($system->arc[0][0] < $system->arc[0][1]){ return $system->arc[0][1] - $system->arc[0][0];}
		else if ($system->arc[0][0] > $system->arc[0][1]){ return 360 - $system->arc[0][0] + $system->arc[0][1];}	
	}

	static function getArcDir($system){
		if ($system->start == 0 && $system->end == 360){
			return 0;
		}
		else if ($system->start > $system->end){
			return $system->start + $system->end;
		}
		else return ($system->start + $system->end) / 2;
	}

	static function getRolledArc($a, $b){
		$start = 360 - $b;
		$end = 360 - $a;
	}

	static function getMirrorAngle($a){
		return 360 - $a;
	}

	static function getBaseHitChance($mass){
		return ceil(pow($mass, 0.4)*1.5) + 130;
	}

	static function getBaseTurnDelay($mass){
		return round(pow($mass, 0.45)/20, 2);
	}

	static function getBaseTurnCost($mass){
		return round(pow($mass, 1.25)/200000, 2);
	}

	static function getEnginePowerNeed($mass){
		return round(pow($mass, 1.1)/70000, 2);
	}

	static function getBaseImpulseCost($mass){
		return round(pow($mass, 1.05)/250, 2);
	}

/*
	function getIntercept(src, dst, v){
		var tx = dst.x - src.x;
		var	ty = dst.y - src.y;
		var	tvx = dst.move.vx;
		var	tvy = dst.move.vy;

		// Get quadratic equation components
		var a = tvx*tvx + tvy*tvy - v*v;
		var b = 2 * (tvx * tx + tvy * ty);
		var c = tx*tx + ty*ty;

		// Solve quadratic
		var ts = quad(a, b, c); // See quad(), below

		// Find smallest positive solution
		var sol = null;
		if (ts) {
			var t0 = ts[0], t1 = ts[1];
			var t = Math.min(t0, t1);
			if (t < 0) t = Math.max(t0, t1);    
			if (t > 0) {
				sol = {
					x: dst.x + dst.move.vx * t,
					y: dst.y + dst.move.vy * t
				};
			}
		}
		return sol;
	}

	function quad(a,b,c) {
		var sol = null;
		if (Math.abs(a) < 1e-6) {
			if (Math.abs(b) < 1e-6) {
				sol = Math.abs(c) < 1e-6 ? [0,0] : null;
			} else {
				sol = [-c/b, -c/b];
			}
		} else {
			var disc = b*b - 4*a*c;
			if (disc >= 0) {
				disc = Math.sqrt(disc);
				a = 2*a;
				sol = [(-b-disc)/a, (-b+disc)/a];
			}
		}
		return sol;
	}
*/




}


?>