<?php

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
	public $exploSize;
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
		//Debug::log("rollForHit");	
		$hits = 0;
		$notes = "";

		for ($j = 0; $j < $this->shots; $j++){
			$roll = mt_rand(1, 100);
			$fire->rolls[] = $roll;
			if ($roll <= $fire->req){
				$notes .= $roll."-";
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
		return mt_rand($this->minDmg, $this->maxDmg) / 100 * (100-$this->getDmgLoss($fire));
	}
}

?>