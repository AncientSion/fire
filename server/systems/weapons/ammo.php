<?php

class Missile extends Single {

	function __construct($id, $parentId){
		$this->integrity = $this->mass*3;
		$this->negation = $this->mass-1;

		parent::__construct($id, $parentId);
		$this->systems[] = new Warhead($this->getId(), $this->parentId, $this->minDmg, $this->maxDmg, $this->traverse);
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

	public function setBaseStats($phase, $turn){
		$this->baseHitChance = ceil(sqrt($this->mass)*5);
		$this->baseImpulse = ceil(pow($this->mass, -0.75)*325);
	}
}

class Warhead extends Weapon {
	public $priority = 10;
	public $type = "explosive";

	function __construct($id, $parentId, $minDmg, $maxDmg, $traverse){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->minDmg = $minDmg;
		$this->maxDmg = $maxDmg;
		$this->traverse = $traverse;
	}

	public function doDamagef($fire, $roll, $system){
		Debug::log("DO_DAMAGE BALLISTIC fireorder, target: ".get_class($system)." #".$system->id);

		parent::doDamage($fire, $roll, $system);
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
	public $display = "Light Anti-Fighter Missiles";
	public $minDmg = 18;
	public $maxDmg = 24;
	public $mass = 3;
	public $cost = 6;
	public $traverse = -3;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
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

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
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

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class Vanguard extends Missile {
	public $name = "Vanguard";
	public $display = "Light Interceptor Missiles";
	public $minDmg = 9;
	public $maxDmg = 12;
	public $mass = 2;
	public $cost = 6;
	public $traverse = -5;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class Needle extends Missile {
	public $name = "Needle";
	public $display = "Light Anti-Fighter Missiles";
	public $minDmg = 18;
	public $maxDmg = 24;
	public $mass = 3;
	public $cost = 6;
	public $traverse = -3;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
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

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class Cyclops extends Missile {
	public $name = "Cyclops";
	public $display = "Light Antiship Missiles";
	public $minDmg = 50;
	public $maxDmg = 68;
	public $mass = 5;
	public $cost = 14;
	public $traverse = 0;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class Titan extends Missile {
	public $name = "Titan";
	public $display = "Heavy Antiship Missiles";
	public $minDmg = 70;
	public $maxDmg = 88;
	public $mass = 7;
	public $cost = 16;
	public $traverse = 1;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

?>