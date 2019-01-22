<?php

error_reporting(E_ALL); ini_set('display_errors', '1');

class Morale {
	public $damage;
	public $crew;
	public $crit;
	public $rem;

	function __construct($baseMorale, $damage, $cmd, $crew, $crit){
		//var_export(func_get_args());
		$this->baseMorale = $baseMorale;
		$this->damage = floor($damage);
		$this->cmd = $cmd == true ? 10 : 0;
		$this->crew = $crew;
		$this->crit = $crit;
		$this->rem = $this->baseMorale + $this->damage + $this->cmd + $this->crew + $this->crit;
	}
}

class RelDmg {
	public $new = 0.00;
	public $old = 0.00;
	public $rel = 0.00;
	public $hits = 0;

	function __construct($new, $old, $integrity, $hits = 0){ // 331 30, 0, 90
		$this->new = round($new / $integrity, 2); // 60  - 0.25
		$this->old = round($old / $integrity, 2); // 120 - 0.50
		$this->rel = round($new / ($integrity-$old), 2); // rem 0.25
		$this->hits = $hits;
	}
}

class Shared {
	public $systems = array();
	public $id;

	function __construct($id){
		$this->id = $id;
	}
}

class Section {
	public $start = 0;
	public $end = 0;
	public $systems = array();

	function __construct($start, $end){
		$this->start = $start;
		$this->end = $end;
	}
}

class Point {
	public $x;
	public $y;

	function __construct($x, $y){
		$this->x = $x;
		$this->y = $y;
	}
}

class Intersector {
	public $x;
	public $y;
	public $type;

	function __construct($x, $y, $type = 0){
		$this->x = $x;
		$this->y = $y;
		$this->type = $type;

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
	public $type = "";
	public $value = 0;
	public $effiency = 0;

	function __construct($type, $value, $effiency = 0){
		$this->type = $type;
		$this->value = $value;
		$this->effiency = $effiency;
	}
}

class GD {
	public $id = 0;
	public $name = "";
	public $pv = 0;
	public $reinforce = 0;
	public $status = "";
	public $turn = 0;
	public $phase = 0;
	public $reinforceTurn = 0;
	public $reinforceETA = 0;
	public $reinforceAmount = 0;
	public $focusMod = 0;
	public static $jumpTimer = 1;

	function __construct($data){
		//Debug::log("creating GD");
		//var_export($data);
		$this->id = $data["id"];
		$this->name = $data["name"];
		$this->pv = $data["pv"];
		$this->reinforce = $data["reinforce"];
		$this->status = $data["status"];
		$this->turn = $data["turn"];
		$this->phase = $data["phase"];
		$this->reinforceTurn = $data["reinforceTurn"];
		$this->reinforceETA = $data["reinforceETA"];
		$this->reinforceAmount = $data["reinforceAmount"];
		$this->focusMod = $data["focusMod"];
	}
}

class Mission {
	public $id;
	public $unitid;
	public $type;
	public $targetid;
	public $turn;
	public $phase;
	public $x;
	public $y;
	public $arrived;
	public $new = 0;
	public $target = false;

	function __construct($data){
		//var_export($data);
		$this->id = $data["id"];
		$this->unitid = $data["unitid"];
		$this->type = $data["type"];
		$this->turn = $data["turn"];
		$this->phase = $data["phase"];
		$this->targetid = $data["targetid"];
		$this->x = $data["x"];
		$this->y = $data["y"];
		$this->arrived = $data["arrived"];
	}
}

class HitTable {
	function __construct($systems){
		
	}
}

class Move {
	public $id;
	public $unitid;
	public $turn;
	public $type;
	public $forced;
	public $dist;
	public $x;
	public $y;
	public $resolved;
	public $new;
	public $manual = 0;

	function __construct($id, $unitid, $turn, $type, $forced, $dist, $x, $y, $h, $f, $cost, $delay, $costmod, $resolved, $new){
		
		$this->id = $id;
		$this->unitid = $unitid;
		$this->turn = $turn;
		$this->type = $type;
		$this->forced = $forced;
		$this->dist = $dist;
		$this->x = $x;
		$this->y = $y;
		$this->h = $h;
		$this->f = $f;
		$this->cost = $cost;
		$this->delay = $delay;
		$this->costmod = $costmod;
		$this->resolved = $resolved;
		$this->new = $new;
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
	public static $value;
	public $new;

	function __construct($id, $unitid, $systemid, $turn, $type, $cost){
		$this->id = $id;
		$this->unitid = $unitid;
		$this->systemid = $systemid;
		$this->turn = $turn;
		$this->type = $type; // 1 boost, 0 unpower, .-1 dualsystem mode
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
	public $x;
	public $y;
	public $weaponid;
	public $shots;
	public $req;
	public $rolls = array();
	public $dmgs = array();
	public $notes;
	public $hits;
	public $resolved;
	public $cc = false;

	public $shooter = false;
	public $target = false;
	public $weapon = false;
	public $dist = false;
	public $angle = false;

	function __construct($id, $gameid, $turn, $shooterid, $targetid, $x,$y, $weaponid, $shots, $req, $notes, $hits, $resolved){
		$this->id = $id;
		$this->gameid = $gameid;
		$this->turn = $turn;
		$this->shooterid = $shooterid;
		$this->targetid = $targetid;
		$this->x = $x;
		$this->y = $y;
		$this->weaponid = $weaponid;
		$this->shots = $shots;
		$this->req = $req;
		$this->notes = $notes;
		$this->hits = $hits;
		$this->resolved = $resolved;
	}

	public function getSectionId($system){
		if ($system->turret){
			return $system->id;
		} return $this->section->id;
	}

	public function cancelShotResolution($i){
		Debug::log("cancelShotResolution from shot $i");
		for ($j = $i; $j < $this->rolls; $j++){
			$this->rolls[$j] = 999;
		}
	}

	public function setWeaponShots(){
		if ($this->shots){return;}
		$this->shots = $this->weapon->getShots($this->turn);
	}

}

class Damage {
	public $id;
	public $fireid;
	public $gameid;
	public $unitid;
	public $structureid;
	public $systemid;
	public $turn;
	public $roll = 0;
	public $type;
	public $totalDmg;
	public $shieldDmg;
	public $armourDmg;
	public $systemDmg;
	public $hullDmg;
	public $emDmg;
	public $destroyed;
	public $notes;
	public $new;
	
	function __construct($id, $fireid, $gameid, $unitid, $structureid, $systemid, $turn, $type, $totalDmg, $shieldDmg, $armourDmg, $systemDmg, $hullDmg, $emDmg, $negation, $destroyed, $notes, $new){
		$this->id = $id;
		$this->fireid = abs($fireid);
		$this->gameid = $gameid;
		$this->unitid = $unitid;
		$this->structureid = $structureid;
		$this->systemid = $systemid;
		$this->turn = $turn;
		$this->type = $type;
		$this->totalDmg = $totalDmg;
		$this->shieldDmg = $shieldDmg;
		$this->armourDmg = $armourDmg;
		$this->systemDmg = $systemDmg;
		$this->hullDmg = $hullDmg;
		$this->emDmg = $emDmg;
		$this->negation = $negation;
		$this->destroyed = $destroyed;
		$this->notes = $notes;
		$this->new = $new;
	}
}

class Crit {
	public $id;
	public $unitid;
	public $systemid;
	public $turn;
	public $type;
	public $duration;
	public $value;
	public $display = "";
	public $new = 0;
	public $notes = "";
	
	function __construct($id, $unitid, $systemid, $turn, $type, $duration, $value, $new){
		$this->id = $id;
		$this->unitid = $unitid;
		$this->systemid = $systemid;
		$this->turn = $turn;
		$this->type = $type;
		$this->duration = $duration;
		$this->value = $value;
		$this->new = $new;
	}

	function inEffect($turn){
		if ($this->duration < 1 ){
			return true;
		}
		else if ($turn <= $this->turn + $this->duration){
			return true;
		}
		else return false;
	}
}

class Divider {
	public $shieldDmg = 0;
	public $armourDmg = 0;
	public $systemDmg = 0;
	public $hullDmg = 0;
	public $emDmg = 0;
	public $notes = "";

	function __construct($shieldDmg, $armourDmg, $systemDmg, $emDmg, $notes = ""){
		$this->shieldDmg = $shieldDmg;
		$this->armourDmg = $armourDmg;
		$this->systemDmg = $systemDmg;
		$this->emDmg = $emDmg;
		$this->notes = $notes;
	}
}

?>