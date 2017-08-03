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

class Vector {
	public $x;
	public $y;

	public $m;
	public $vx;
	public $vy;

	function __construct($a, $b){
		$this->x = $b->x - $a->x;
		$this->y = $b->y - $a->y;

		$x = pow($this->x, 2);
		$y = pow($this->y, 2);

		$this->m = sqrt($x + $y);
		$this->vx = $this->x / $this->m;
		$this->vy = $this->y / $this->m;
	}
}

class Effect {
	public $type;
	public $value;

	function __construct($type, $value){
		$this->type = $type;
		$this->value = $value;
	}
}

class Mission {
	public $id;
	public $unitid;
	public $type;
	public $targetid;
	public $turn;
	public $x;
	public $y;

	function __construct($data){
		//var_export($data);
		$this->id = $data["id"];
		$this->unitid = $data["unitid"];
		$this->type = $data["type"];
		$this->turn = $data["turn"];
		$this->targetid = $data["targetid"];
		$this->x = $data["x"];
		$this->y = $data["y"];
	}
}

class HitTable {
	function __construct($systems){
		
	}
}
class Action {
	public $id;
	public $turn;
	public $type;
	public $dist;
	public $x;
	public $y;
	public $resolved;

	function __construct($id, $turn, $type, $dist, $x, $y, $a, $cost, $delay, $costmod, $resolved){
		$this->id = $id;
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

class EW {
	public $id;
	public $unitid;
	public $systemid;
	public $turn;
	public $angle;
	public $dist;
	public $type;
	function __construct($id, $unitid, $systemid, $turn, $angle, $dist, $type){
		$this->id = $id;
		$this->unitid = $unitid;
		$this->systemid = $systemid;
		$this->turn = $turn;
		$this->angle = $angle;
		$this->dist = $dist;
		$this->type = $type;
	}
}

class Power {
	public $id;
	public $unitid;
	public $systemid;
	public $turn;
	public $type;
	public $cost;
	public $new;

	function __construct($id, $unitid, $systemid, $turn, $type, $cost){
		$this->id = $id;
		$this->unitid = $unitid;
		$this->systemid = $systemid;
		$this->turn = $turn;
		$this->type = $type;
		$this->cost = $cost;
		$this->new = 0;
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
	public $angle = false;
	//public $loss = false;
	//public $dmgRoll = false;
	//public $hitSystem = array();
	//public $section = array();
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
	public $overkill;
	public $destroyed;
	public $notes;
	public $new;
	
	function __construct($id, $fireid, $gameid, $shipid, $structureid, $systemid, $turn, $roll, $type, $totalDmg, $shieldDmg, $structDmg, $armourDmg, $overkill, $negation, $destroyed, $notes, $new){
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
		$this->overkill = $overkill;
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
	public $value;
	public $new;
	
	function __construct($id, $shipid, $systemid, $turn, $type, $duration, $value, $new){
		$this->id = $id;
		$this->shipid = $shipid;
		$this->systemid = $systemid;
		$this->turn = $turn;
		$this->type = $type;
		$this->duration = $duration;
		$this->value = $value;
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
	public $notes;

	function __construct($shieldDmg, $armourDmg, $structDmg, $notes = ""){
		$this->shieldDmg = $shieldDmg;
		$this->armourDmg = $armourDmg;
		$this->structDmg = $structDmg;
		$this->notes = $notes;
	}
}

?>