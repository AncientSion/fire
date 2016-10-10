<?php

error_reporting(E_ALL); ini_set('display_errors', '1');
require_once("server\systems\weapons\particle.php");
require_once("server\systems\weapons\laser.php");


class System {
	public $id;
	public $parentid;
	public $weapon = false;
	public $structure;
	public $armour;
	public $power;
	public $output;

	function __construct($parentid, $structure, $armour, $power, $output){
		$this->parentid = $parentid;
		$this->structure = $structure;
		$this->armour = $armour;
		$this->power = $power;
		$this->output = $output;
	}
}

class Weapon extends System {
	public $id;
	public $parentid;
	public $weapon = true;

	public $structure;
	public $armour;

	public $damage;
	public $accDecay;
	public $shots = 1;
	public $guns = 1;
	public $reload;

	function __construct($parentid, $structure, $armour, $power, $output = 0){
        parent::__construct($parentid, $structure, $armour, $power, $output);
	}
}

?>