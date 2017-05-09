<?php

class Ammo extends Weapon {
	public $id;
	public $armour;
	public $cost;
	public $traverse = 2;

	function __construct($parentId, $id){
		$this->parentId = $parentId;
		$this->id = $id;
		$this->integrity = 2+$this->mass*3;
		$this->armour = 2+$this->mass;
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
        	"armour" => $this->armour,
        	"mass" => $this->mass,
        	"damages" => $this->damages,
        	"crits" => $this->crits,
        	"destroyed" => $this->destroyed,
        	"fc" => $this->fc,
        	"fireOrders" => $this->fireOrders
        );
    }

	public function getRemainingIntegrity(){
		$total = $this->integrity;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			$total -= $this->damages[$i]->structDmg;
		}
		return $total;
	}

	public function getSubHitChance(){
		return ceil(sqrt($this->mass)*10);
	}

	public function getAccLoss($dist){
		return 0;
	}

	public function getDamageMod($turn){
		return 1;
	}

	function setState($turn){
		for ($i = sizeof($this->damages)-1; $i >= 0; $i--){
			if ($this->damages[$i]->destroyed){
				$this->destroyed = true;
				return;
			}
		}
	}
}

class Hasta extends Ammo {
	public $name = "Hasta";
	public $display = "Light Antifighter Missiles";
	public $type = "explosive";
	public $minDmg = 25;
	public $maxDmg = 30;
	public $mass = 2;
	public $cost = 6;
	public $traverse = -3;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Javelin extends Ammo {
	public $name = "Javelin";
	public $display = "Multi-purpose Missiles";
	public $type = "explosive";
	public $minDmg = 36;
	public $maxDmg = 48;
	public $mass = 4;
	public $cost = 10;
	public $traverse = -1;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Patriot extends Ammo {
	public $name = "Patriot";
	public $display = "Light Interceptor Missiles";
	public $type = "explosive";
	public $minDmg = 13;
	public $maxDmg = 18;
	public $mass = 2;
	public $cost = 8;
	public $traverse = -4;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Naga extends Ammo {
	public $name = "Naga";
	public $display = "Multi-purpose Missiles";
	public $type = "explosive";
	public $minDmg = 36;
	public $maxDmg = 48;
	public $mass = 4;
	public $cost = 10;
	public $traverse = -1;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Cyclops extends Ammo {
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

class Titan extends Ammo {
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