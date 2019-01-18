<?php

class Math {

	function __construct(){
	}

	static function rotatePoint($shiftX, $shiftY, $point, $angle){
		$radians = (M_PI / 180) * $angle;
		$cos = cos($radians);
		$sin = cos($radians);

		return new Point(
			($cos * ($point->x - $shiftX)) - ($sin * ($point->y - $shiftY)) + $shiftX,
			($cos * ($point->y - $shiftY)) + ($sin * ($point->x - $shiftX)) + $shiftY
		);
	}

	static function dot($a, $b){
		return ($a->x * $b->x) + ($a->y * $b->y); 
	}

	static function isWithinCircle($oPos, $tPos, $arc){
		$oPosToCenter = static::getDist($oPos, $arc->getCurPos());
		$tPosToCenter = static::getDist($tPos, $arc->getCurPos());

		if ($oPosToCenter < $arc->size/2 && $tPosToCenter < $arc->size/2){
			return static::getDist($oPos, $tPos);
		} return false;
	}

	static function isWithinRect($pos, $rectPoints){
		$ab = static::newV($rectPoints[0], $rectPoints[2]);
		$am = static::newV($rectPoints[0], $pos);
		$bc = static::newV($rectPoints[1], $rectPoints[2]);
		$bm = static::newV($rectPoints[1], $pos);

		$dot_abam = static::dot($ab, $am);
		$dot_abab = static::dot($ab, $ab);
		$dot_bcbm = static::dot($bc, $bm);
		$dot_bcbc = static::dot($bc, $bc);

		return 0 <= $dot_abam && $dot_abam <= $dot_abab && 0 <= $dot_bcbm && $dot_bcbm <= $dot_bcbc;
	}

	static function newV($p1, $p2){
		return new Point($p2->x - $p1->x, $p2->y - $p1->y);
	}

	static function lineRectIntersect($shooter, $target, $rectPoints){
		$testResult;
		$intersectPoints = array();

		for ($i = 0; $i < sizeof($rectPoints)-1; $i++){
			$testResult = static::lineLineIntersect($shooter, $target, $rectPoints[$i], $rectPoints[$i+1]);
			if (!$testResult){continue;}
			$intersectPoints[] = $testResult;
		}

		$testResult = static::lineLineIntersect($shooter, $target, $rectPoints[3], $rectPoints[0]);
		if ($testResult){$intersectPoints[] = $testResult;}

		if (sizeof($intersectPoints) == 1){
			$isInside = static::isWithinRect($shooter, $rectPoints);
			$shooterToIntersect = static::getDist($shooter, $intersectPoints[0]);
			$shooterToTarget = static::getDist($shooter, $target);
			$targetToIntersect = static::getDist($target, $intersectPoints[0]);

			if ($isInside || $shooterToIntersect > $shooterToTarget){
				$intersectPoints[0]->type = 1;
			}
		}

		return $intersectPoints;
	}

	static function lineLineIntersect($a, $b, $c, $d) {
		$ua = ($d->x - $c->x) * ($a->y - $c->y) - ($d->y - $c->y) * ($a->x - $c->x);
		$ub = ($b->x - $a->x) * ($a->y - $c->y) - ($b->y - $a->y) * ($a->x - $c->x);
		$denom = ($d->y - $c->y) * ($b->x - $a->x) - ($d->x - $c->x) * ($b->y - $a->y);

		if ($denom == 0){
			if (abs($ua) == 0 && abs($ub) == 0){
				return new Intersector(
					($a->x + $b->x) / 2,
					($a->y + $b->y) / 2
				);
			}
		}
		else {
			$ua /= $denom;
			$ub /= $denom;

			if ($ua >= 0 && $ua <= 1 && $ub >= 0 && $ub <= 1){
				return new Intersector(
					$a->x + $ua * ($b->x - $a->x),
					$a->y + $ua * ($b->y - $a->y)
				);
			}
		}
		return false;
	}

	static function lineCircleIntersect($a, $b, $c, $size) {
		//Debug::log("lineCircleIntersect ".$size);
		// Calculate the euclidean distance between a & b
		$data = array();

		$eDistAtoB = sqrt(pow($b->x - $a->x, 2) + pow($b->y - $a->y, 2));

		if (!$eDistAtoB){
			Debug::log("---------------------------------Math LineCircle die");
			//Debug::trace();
			die();
		}
		// compute the direction vector d from a to b
		$d = new Point(($b->x - $a->x) / $eDistAtoB, ($b->y - $a->y) / $eDistAtoB);

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
			$dist = sqrt(pow($size, 2) - pow($eDistCtoE, 2));

			$entry = new Intersector(
					(($t - $dist) * $d->x) + $a->x, 
					(($t - $dist) * $d->y) + $a->y
					);

			$exit = new Intersector(
					(($t + $dist) * $d->x) + $a->x, 
					(($t + $dist) * $d->y) + $a->y,
					1);

			if (static::is_on($a, $b, $entry)){
				//Debug::log("entry!");
				$data[] = $entry;
			}
			if (static::is_on($a, $b, $exit)){
				//Debug::log("exit!");
				$data[] = $exit;
			}
		}
		return $data;
	}

	static function is_on($a, $b, $c) {
		return (round(static::getDist($a, $c) + static::getDist($c, $b)) == round(static::getDist($a, $b)));
	}

	static function getPointInDirection($dist, $a, $oX, $oY){
		$x = round($oX + $dist * cos($a * M_PI / 180));
		$y = round($oY + $dist * sin($a * M_PI / 180));
		return new Point($x, $y);
	} 

	static function getDist4($ax, $ay, $bx, $by){
		return ceil(sqrt(pow($bx - $ax, 2) + pow($by - $ay, 2)));
	}

	static function getDist($a, $b){
		return sqrt(pow($b->x - $a->x, 2) + pow($b->y - $a->y, 2));
	}

	static function getAngle($a, $b){
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

	static function adjustAngle($angle){
		if ($angle > 360){
			$angle -= 360;
		}
		else if ($angle < 0){
			$angle += 360;
		}
		return $angle;
	}

	static function canIntercept($origin, $target, $targetVector, $v){
		$tx = $target->x - $origin->x;
		$ty = $target->y - $origin->y;
		$tvx = $targetVector->vx;
		$tvy = $targetVector->vy;

		$a = $tvx*$tvx + $tvy*$tvy - $v*$v;
		$b = 2 * ($tvx * $tx + $tvy * $ty);
		$c = $tx*$tx + $ty*$ty;

		$ts = Math::solveIntercept($a, $b, $c);

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

	static function solveIntercept($a, $b, $c){
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

	static function getMirrorAngle($a){
		return 360 - $a;
	}

	static function getBaseHitChance($mass){
		return ceil(pow($mass, 0.4)*1.5) + 135;
	}

	static function getBaseTurnDelay($mass){
		return round(pow($mass, 0.45)/20, 2);
	}

	static function getEnginePowerNeed($mass){
		return round(pow($mass, 0.5) * 0.004, 2);
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