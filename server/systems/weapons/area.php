<?php

class Area extends Weapon {
	public $type = "Area";
	public $animation = "area";
	public $priority = 12;
	public $usage = -1;
	public $freeAim = 1;
	public $shots = 1;
	public $maxShots = 1;
	public $maxRange;
	public $aoe;

	function __construct($id, $parentId, $start, $end, $output = 0, $effiency, $destroyed = 0){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}

	public function createAreaFireOrders($gd, $fire){
		Debug::log("createAreaFireOrders");

		if (1){
			$origin = new Point($fire->shooter->x, $fire->shooter->y);
			$target = new Point($fire->x, $fire->y);
			$dist = floor(Math::getDist2($origin, $target));
			$maxDevi = $dist / 100 * $this->accDecay / 10;
			$devi = mt_rand(0, $maxDevi);
			$angle = mt_rand(0, 360);

			$newTarget = Math::getPointInDirection($devi, $angle, $target->x, $target->y);
			$fire->notes = $newTarget->x.";".$newTarget->y.";";

			Debug::log("dist: ".$dist.", maxDevi: ".$maxDevi."px, devi: ".$devi."px, angle: ".$angle);
			//Debug::log("newTarget ".$newTarget->x."/".$newTarget->y);

		}

		//$newTarget = new Point(-50, -160);
		//$fire->notes = $newTarget->x.";".$newTarget->y.";";


		$newFires = array();

		for ($i = 0; $i < sizeof($gd->ships); $i++){
			$d = Math::getDist2($gd->ships[$i]->getCurrentPosition(), $newTarget);
			//Debug::log("eMine impact distance to ".$gd->ships[$i]->name." #".$gd->ships[$i]->id.": ".$d);

			if ($d + $this->aoe <= $this->aoe*2){
				$a = round(Math::addAngle($gd->ships[$i]->getCurrentFacing() - $gd->ships[$i]->facing, Math::getAngle2($gd->ships[$i]->getCurrentPosition(), $newTarget)));
				//var_export($newTarget);var_export($gd->ships[$i]->x);var_export($gd->ships[$i]->y);
				//Debug::log("hitting, dist to impact: ".$d.", impact from: ".$a);

				$subFire = new FireOrder(
					$fire->id, 0, $gd->turn, $fire->shooterid, $gd->ships[$i]->id, $newTarget->x, $newTarget->y, $this->id, $fire->shots, 0, "", 1, 0
				);

				$subFire->cc = 0;
				$subFire->dist = $d;
				$subFire->angle = $a;
				$subFire->target = $gd->ships[$i];
				$subFire->weapon = $this;
				$newFires[] = $subFire;
			}
		}
		return $newFires;
	}


	public function doDamage($fire, $roll, $system){
		parent::doDamage($fire, $roll, $system);
	}
}


class EnergyMine extends Area {
	public $name = "EnergyMine";
	public $display = "EnergyMine";
	public $minDmg = 20;
	public $maxDmg = 28;
	public $accDecay = 160;
	public $shots = 1;
	public $animColor = "blue";
	public $projSize = 4;
	public $projSpeed = 4;
	public $reload = 1;
	public $mass = 14;
	public $powerReq = 4;
	public $traverse = -3;
	public $dmgLoss = 50;
	public $maxRange = 700;
	public $aoe = 50;
	public $notes = array("Shot deviates pending distance", "Area of Effect");

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

?>
