<?php

class Missile extends Single {
	public $negation;
	public $cost;
	public $start = 0;
	public $end = 360;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
		$this->integrity = 2+$this->mass*3;
		$this->negation = $this->mass;
		$this->systems[] = new Warhead($this->id, sizeof($this->systems)+1, $this->minDmg, $this->maxDmg, $this->traverse);
	}

	public function getValidEffects(){
		return array(// attr, %-tresh, duration, modifier
			array("Disabled", 80, 0, 0)
		);
	}

	public function jsonSerialize(){
		return array(
        	"id" => $this->id,
        	"name" => $this->name,
        	"display" => $this->display,
        	"type" => $this->type,
        	"minDmg" => $this->minDmg,
        	"maxDmg" => $this->maxDmg,
        	"impulse" => $this->impulse,
        	"integrity" => $this->integrity,
        	"negation" => $this->negation,
        	"mass" => $this->mass,
        	"damages" => $this->damages,
        	"crits" => $this->crits,
        	"destroyed" => $this->destroyed,
        	"fc" => $this->fc,
        	"fireOrders" => $this->fireOrders
        );
    }

	public function getSubHitChance(){
		return ceil(sqrt($this->mass)*15);
	}
}

class Warhead extends Weapon {
	public $priority = 10;
	public $type = "explosive";

	function __construct($parentId, $id, $minDmg, $maxDmg, $traverse){
		$this->parentId = $parentId;
		$this->id = $id;
		$this->minDmg = $minDmg;
		$this->maxDmg = $maxDmg;
		$this->traverse = $traverse;
	}

	public function rollToHit($fire){
		for ($i = 0; $i < $fire->shots; $i++){
			$roll = mt_rand(1, 100);
			$fire->rolls[] = $roll;
			$fire->notes = $fire->notes." ".$roll;
			if ($roll <= $fire->req){
				$fire->hits++;
			}
		}
		return true;
	}

	public function getAccuracyLoss($dist){
		return 0;
	}

	public function getDamageMod($turn){
		return 1;
	}
}

class Hasta extends Missile {
	public $name = "Hasta";
	public $display = "Light Antifighter Missiles";
	public $type = "explosive";
	public $minDmg = 23;
	public $maxDmg = 28;
	public $mass = 3;
	public $cost = 6;
	public $traverse = -3;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Javelin extends Missile {
	public $name = "Javelin";
	public $display = "Multi-purpose Missiles";
	public $type = "explosive";
	public $minDmg = 33;
	public $maxDmg = 45;
	public $mass = 4;
	public $cost = 10;
	public $traverse = -1;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Patriot extends Missile {
	public $name = "Patriot";
	public $display = "Light Interceptor Missiles";
	public $type = "explosive";
	public $minDmg = 13;
	public $maxDmg = 17;
	public $mass = 2;
	public $cost = 8;
	public $traverse = -4;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Naga extends Missile {
	public $name = "Naga";
	public $display = "Multi-purpose Missiles";
	public $type = "explosive";
	public $minDmg = 33;
	public $maxDmg = 45;
	public $mass = 4;
	public $cost = 10;
	public $traverse = -1;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Cyclops extends Missile {
	public $name = "Cyclops";
	public $display = "Light Antiship Missiles";
	public $type = "explosive";
	public $minDmg = 55;
	public $maxDmg = 76;
	public $mass = 6;
	public $cost = 14;
	public $traverse = 0;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Titan extends Missile {
	public $name = "Titan";
	public $display = "Heavy Antiship Missiles";
	public $type = "explosive";
	public $minDmg = 78;
	public $maxDmg = 96;
	public $mass = 8;
	public $cost = 16;
	public $traverse = 1;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

?>