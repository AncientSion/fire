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
	public $gameid;
	public $shipid;
	public $structureid;
	public $turn;
	public $totalDmg;
	public $structDmg;
	public $armourDmg;
	public $mitigation;
	
	function __construct($id, $gameid, $shipid, $structureid, $turn, $totalDmg, $structDmg, $armourDmg, $mitigation){
		$this->id = $id;
		$this->gameid = $gameid;
		$this->shipid = $shipid;
		$this->structureid = $structureid;
		$this->turn = $turn;
		$this->totalDmg = $totalDmg;
		$this->structDmg = $structDmg;
		$this->armourDmg = $armourDmg;
		$this->mitigation = $mitigation;
	}
}


?>