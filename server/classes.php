<?php

error_reporting(E_ALL); ini_set('display_errors', '1');

class Point {
	public $x;
	public $y;

	function __construct($x, $y){
		$this->x = $x;
		$this->y = $y;
	}
}

class Action {
	public $turn;
	public $type;
	public $dist;
	public $x;
	public $y;
	public $resolved;

	function __construct($turn, $type, $dist, $x, $y, $a, $cost, $delay, $costmod, $resolved){
		$this->turn = $turn;
		$this->type = $type;
		$this->dist = $dist;
		$this->x = $x;
		$this->y = $y;
		$this->a = $a;
		$this->cost = $cost;
		$this->delay = $delay;
		$this->costmod = $costmod;
		$this->resolved = $resolved;
	}
}

class Power {
	public $id;
	public $unitid;
	public $systemid;
	public $turn;
	public $type;
	public $cost;

	function __construct($id, $unitid, $systemid, $turn, $type, $cost){
		$this->id = $id;
		$this->unitid = $unitid;
		$this->systemid = $systemid;
		$this->turn = $turn;
		$this->type = $type;
		$this->cost = $cost;
	}
}

class FireOrder {
	public $id;
	public $gameid;
	public $turn;
	public $shooterid;
	public $targetid;
	public $weaponid;
	public $shots;
	public $req;
	public $rolls = array();
	public $notes;
	public $hits;
	public $resolved;

	public $shooter = false;
	public $target = false;
	public $weapon = false;
	public $dist = false;
	public $angleIn = false;
	public $loss = false;
	public $dmgRoll = false;
	public $hitSystem = array();
	public $hitSection = array();
	public $damages = array();

	function __construct($id, $gameid, $turn, $shooterid, $targetid, $weaponid, $shots, $req, $notes, $hits, $resolved){
		$this->id = $id;
		$this->gameid = $gameid;
		$this->turn = $turn;
		$this->shooterid = $shooterid;
		$this->targetid = $targetid;
		$this->weaponid = $weaponid;
		$this->shots = $shots;
		$this->req = $req;
		$this->notes = $notes;
		$this->hits = $hits;
		$this->resolved = $resolved;
	}
}

class Damage {
	public $id;
	public $fireid;
	public $gameid;
	public $shipid;
	public $structureid;
	public $systemid;
	public $turn;
	public $roll;
	public $type;
	public $totalDmg;
	public $shieldDmg;
	public $structDmg;
	public $armourDmg;
	public $mitigation;
	public $destroyed;
	public $notes;
	public $new;
	
	function __construct($id, $fireid, $gameid, $shipid, $structureid, $systemid, $turn, $roll, $type, $totalDmg, $shieldDmg, $structDmg, $armourDmg, $mitigation, $negation, $destroyed, $notes, $new){
		$this->id = $id;
		$this->fireid = $fireid;
		$this->gameid = $gameid;
		$this->shipid = $shipid;
		$this->structureid = $structureid;
		$this->systemid = $systemid;
		$this->turn = $turn;
		$this->roll = $roll;
		$this->type = $type;
		$this->totalDmg = $totalDmg;
		$this->shieldDmg = $shieldDmg;
		$this->structDmg = $structDmg;
		$this->armourDmg = $armourDmg;
		$this->mitigation = $mitigation;
		$this->negation = $negation;
		$this->destroyed = $destroyed;
		$this->notes = $notes;
		$this->new = $new;
	}
}

class Crit {
	public $id;
	public $shipid;
	public $systemid;
	public $turn;
	public $type;
	public $duration;
	public $new;
	public $outputmod;

	function __construct($id, $shipid, $systemid, $turn, $type, $duration, $new){
		$this->id = $id;
		$this->shipid = $shipid;
		$this->systemid = $systemid;
		$this->turn = $turn;
		$this->type = $type;
		$this->duration = $duration;
		$this->new = $new;
	}

	function inEffect($turn){
		if ($this->duration == 0){
			return true;
		}
		else if ($turn <= $this->turn + $this->duration){
			return true;
		}
		else return false;
	}
}

class Divider {
	public $shieldDmg;
	public $armourDmg;
	public $structDmg;

	function __construct($shieldDmg, $armourDmg, $structDmg){
		$this->shieldDmg = $shieldDmg;
		$this->armourDmg = $armourDmg;
		$this->structDmg = $structDmg;
	}
}

?>