<?php

error_reporting(E_ALL); ini_set('display_errors', '1');
require_once("server\systems\weapons\particle.php");
require_once("server\systems\weapons\laser.php");

include_once('include.php');

class Structure {
	public $id;
	public $parentId;
	public $integrity;
	public $armour;
	public $systems = array();
	public $damages = array();
	public $destroyed = false;

	function __construct($id, $parentId, $start, $end, $armour, $integrity, $destroyed = false){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->start = $start;
		$this->end = $end;
		$this->armour = $armour;
		$this->integrity = $integrity;
		$this->destroyed = $destroyed;
	}


	public function getRemainingIntegrity(){
		echo json_encode($this->damages);
		echo "<br><br>";
		$dmg = 0;
		if (sizeof($this->damages)){
			for ($i = 0; $i < sizeof($this->damages); $i++){
				$dmg = $dmg + $this->damages[$i]->damage;
			}
		}

		return $this->integrity - $dmg;
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

	function __construct($id, $parentId, $output, $destroyed = false){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->output = $output;
		$this->destroyed = $destroyed;
	}
}

class Weapon extends System {
	public $weapon = true;
	public $minDmg;
	public $maxDmg;
	public $accDecay;
	public $shots = 1;
	public $guns = 1;
	public $reload = 1;
	public $powerUsage = 2;
	public $fireOrders = [];

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
		$this->start = $start;
		$this->end = $end;
        parent::__construct($id, $parentId, $output, $destroyed);
	}

	public function rollForHit($fire){
		$hits = 0;
		$notes = "";

		for ($j = 0; $j < $this->shots; $j++){
				$roll = mt_rand(1, 100);
				$notes = $notes.$roll.",";

			if ($roll <= $fire->req){
				$hits++;
			}
		}

		$fire->hits = $hits;
		$fire->notes = $notes;

		return $fire;
	}

	public function getAccLoss ($dist){
		return ceil($this->accDecay * $dist / $this->decayVar);
	}

	public function getDmgLoss($fire){
		return 0;
	}

	public function getDamage($fire){
		$fire->dmgRoll = mt_rand($this->minDmg, $this->maxDmg);
		$fire->loss = $this->getDmgLoss($fire);

		return $fire;
	}
}

?>