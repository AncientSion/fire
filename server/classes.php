<?php

error_reporting(E_ALL); ini_set('display_errors', '1');
require_once("debug.php");

class FireOrder {
	public $id;
	public $gameid;
	public $turn;
	public $shooterid;
	public $targetid;
	public $weaponid;
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

	function __construct($id, $gameid, $turn, $shooterid, $targetid, $weaponid, $req, $notes, $hits, $resolved){
		$this->id = $id;
		$this->gameid = $gameid;
		$this->turn = $turn;
		$this->shooterid = $shooterid;
		$this->targetid = $targetid;
		$this->weaponid = $weaponid;
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
	public $turn;
	public $type;
	public $totalDmg;
	public $shieldDmg;
	public $structDmg;
	public $armourDmg;
	public $mitigation;
	public $destroyed;
	public $notes;
	public $roll;
	public $new;
	
	function __construct($id, $fireid, $gameid, $shipid, $structureid, $turn, $roll, $type, $totalDmg, $shieldDmg, $structDmg, $armourDmg, $mitigation, $destroyed, $notes, $new){
		$this->id = $id;
		$this->fireid = $fireid;
		$this->gameid = $gameid;
		$this->shipid = $shipid;
		$this->structureid = $structureid;
		$this->turn = $turn;
		$this->roll = $roll;
		$this->type = $type;
		$this->totalDmg = $totalDmg;
		$this->shieldDmg = $shieldDmg;
		$this->structDmg = $structDmg;
		$this->armourDmg = $armourDmg;
		$this->mitigation = $mitigation;
		$this->destroyed = $destroyed;
		$this->notes = $notes;
		$this->new = $new;
	}
}


?>