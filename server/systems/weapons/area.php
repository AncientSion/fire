<?php

class Area extends Weapon {
	public $type = "Area";
	public $animation = "area";
	public $priority = 12;
	public $usage = -1;
	public $freeAim = 1;

	function __construct($id, $parentId, $start, $end, $output = 0, $effiency, $destroyed = 0){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}

	public function doDamage($fire, $roll, $system){
		Debug::log("doDamage, weapon: ".get_class($this).", target: ".$fire->target->id."/".$system->id);

		if ($system->destroyed){
			Debug::log("multi disable, return");
			return;
		}
	}
}	

class EnergyMine extends Area {
	public $name = "EnergyMine";
	public $display = "EnergyMine";
	public $minDmg = 6;
	public $maxDmg = 9;
	public $accDecay = 30;
	public $shots = 5;
	public $animColor = "lightBlue";
	public $projSize = 2;
	public $projSpeed = 8;
	public $reload = 1;
	public $mass = 14;
	public $powerReq = 4;
	public $traverse = -3;
	public $aoe = 50;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

?>
