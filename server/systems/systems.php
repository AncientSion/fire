<?php

error_reporting(E_ALL); ini_set('display_errors', '1');
require_once("server\systems\weapons\particle.php");
require_once("server\systems\weapons\laser.php");

include_once('include.php');

class Structure {
	public $id;
	public $parentId;
	public $health;
	public $armour;
	public $systems = array();
	public $destroyed = false;

	function __construct($id, $parentId, $start, $end, $armour, $health){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->start = $start;
		$this->end = $end;
		$this->armour = $armour;
		$this->health = $health;

		//$this->id = $manager->getId();
	}
}

class System {
	public $id;
	public $parentId;
	public $weapon = false;
	public $destroyed = false;
	public $decayVar = 1000;
	public $powerUsage; 
	public $output;
	public $name;
	public $display;

	function __construct($id, $parentId, $output){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->output = $output;
	}
}

class Weapon extends System {
	public $weapon = true;
	public $damage;
	public $accDecay;
	public $shots = 1;
	public $guns = 1;
	public $reload = 1;
	public $powerUsage = 2; 

	function __construct($id, $parentId, $start, $end, $output = 0){
		$this->start = $start;
		$this->end = $end;
        parent::__construct($id, $parentId, $output);
	}

	public function getAccLoss ($dist){
		return ceil($this->accDecay * $dist / $this->decayVar);
	}

	public function getDmgLoss($dist){
		return 0;
	}

	public function getDamage($dist){
		return floor($this->damage - ($this->damage / 100  * $this->getDmgLoss($dist)));
	}
}

?>