<?php

error_reporting(E_ALL); ini_set('display_errors', '1');
require_once("server\systems\weapons\particle.php");
require_once("server\systems\weapons\laser.php");


class System {
	public $id;
	public $weapon = false;
	public $structure;
	public $armour;
	public $power;
	public $output;
	public $decayVar = 1000;

	function __construct( $structure, $armour, $power, $output){
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
	public $reload = 1;

	function __construct($structure, $armour, $power, $output = 0){
        parent::__construct($structure, $armour, $power, $output);
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