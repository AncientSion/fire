<?php

class Area extends Weapon {
	public $type = "Area";
	public $animation = "area";
	public $accDecay = 0;
	public $deviate = 0;
	public $usage = -1;
	public $freeAim = 1;
	public $shots = 1;
	public $maxShots = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
	}
}

class EnergyMine extends Area {
	public $name = "EnergyMine";
	public $display = "Energy Mine";
	public $fireMode = "Shockwave";
	public static $prio = 0;
	public $minDmg = 19;
	public $maxDmg = 27;
	public $animColor = "blue";
	public $projSize = 3;
	public $projSpeed = 5;
	public $reload = 5;
	public $maxBoost = 1;
	public $maxRange = 1000;
	public $effiency = 4;
	public $integrity = 56;
	public $powerReq = 6;
	public $tracking = -1;
	public $aoe = 65;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->boostEffect[] = new Effect("Reload", -1);
		$this->notes = array("Area of Effect");
        $this->setShockData();
	}

	public function setArmourData($rem){
		$this->mount = "Catapult";
		$this->armourMod = 0.2;
		$this->armour = floor($rem * $this->armourMod);
	}

	public function getBaseDamage($fire, $hit, $system){
		$base = mt_rand($this->getMinDamage(), $this->getMaxDamage());
		$multi = $system->traverse;
		Debug::log("AREA getBaseDamage ".get_class($system)." baseDmg " .$base.", multi ".$multi);
		return $base * $multi;
	}
}

class GraviticMine extends Area {
	public $name = "GraviticMine";
	public $display = "Gravitic Mine";
	public $fireMode = "Special";
	public static $prio = 0;
	public $minDmg = 30;
	public $maxDmg = 30;
	public $animColor = "green";
	public $projSize = 3;
	public $projSpeed = 5;
	public $reload = 5;
	public $maxRange = 1000;
	public $integrity = 56;
	public $powerReq = 10;
	public $aoe = 65;

	function __construct($id, $parentId, $start, $end, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $output, $width);
        $this->boostEffect[] = new Effect("Reload", -1);
		$this->notes = array("Area of Effect", "Pulls units towards point of impact");
	}

	function handleDmg($fire, $hit, $system){
		Debug::log("handleDmg ".get_class($this)." versus ".$fire->target->name.", impact dist: ".$fire->dist.", angle: ".$fire->angle);

		$origin = new Point($fire->target->x, $fire->target->y);
		$shiftDist = min($fire->dist, 50);
		//push
		$target = Math::getPointInDirection($shiftDist, $fire->angle, $origin->x, $origin->y);
		//pull
		//$target = Math::getPointInDirection($shiftDist, $fire->angle-180, $origin->x, $origin->y);
		
		$fire->target->actions[] = new Action(-1, $fire->target->id, $fire->turn, "move", 1, $shiftDist, $target->x, $target->y, 0, 0, 0, 0, 1, 1);
	}
}

?>
