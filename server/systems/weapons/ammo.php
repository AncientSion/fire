<?php

class Missile extends Single {
	public $negation;
	public $cost;
	public $start = 0;
	public $end = 360;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
		$this->integrity = $this->mass*3;
		$this->negation = $this->mass-1;
		$this->systems[] = new Warhead($this->parentId, sizeof($this->systems)+1, $this->minDmg, $this->maxDmg, $this->traverse);
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
        	"Thrust" => $this->impulse,
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

	public function setBaseStats(){
		$this->baseHitChance = ceil(sqrt($this->mass)*5);
		$this->baseImpulse = ceil(pow($this->mass, -0.75)*325);
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
	public $minDmg = 18;
	public $maxDmg = 24;
	public $mass = 3;
	public $cost = 6;
	public $traverse = -3;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Javelin extends Missile {
	public $name = "Javelin";
	public $display = "Multirole Missiles";
	public $minDmg = 33;
	public $maxDmg = 45;
	public $mass = 4;
	public $cost = 10;
	public $traverse = -1;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Triarii extends Missile {
	public $name = "Triarii";
	public $display = "Heavy Multirole Missiles";
	public $minDmg = 41;
	public $maxDmg = 53;
	public $mass = 4;
	public $cost = 12;
	public $traverse = -1;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Vanguard extends Missile {
	public $name = "Vanguard";
	public $display = "Light Interceptor Missiles";
	public $minDmg = 9;
	public $maxDmg = 12;
	public $mass = 2;
	public $cost = 6;
	public $traverse = -4;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Needle extends Missile {
	public $name = "Needle";
	public $display = "Antifighter Missiles";
	public $minDmg = 18;
	public $maxDmg = 24;
	public $mass = 3;
	public $cost = 6;
	public $traverse = -3;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Naga extends Missile {
	public $name = "Naga";
	public $display = "Multirole Missiles";
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