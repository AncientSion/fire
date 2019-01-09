<?php

class Missile extends Single {
	public $size = 20;
	public $missile = 1;
	public $torpedo = 0;
	public $maxRange = 0;
	public $reload = 3;
	public $dmgType = "Standard";
	public $fireMode = "Standard";

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
	
	public function setBaseStats($phase, $turn){
		if ($this->missile){
			//$this->baseImpulse = ceil(pow($this->mass, -0.75)*400);
			$this->baseHitChance = ceil(sqrt($this->mass)*5);
		}
		else {
			$this->baseImpulse = $this->maxRange;
			$this->baseHitChance = 5;
		}
	}
}

class Torpedo extends Missile {
	public $missile = 0;
	public $torpedo = 1;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	//public function setBaseStats($phase, $turn){
	//	$this->baseHitChance = ceil(sqrt($this->mass)*5);
	//	$this->baseImpulse = $this->maxRange;
	//}
}

class Warhead extends Weapon {
	public $name = "Warhead";
	public $role = "Warhead";
	public $type = "Warhead";
	public $animation = "contact";
	public $linked = 1;

	function __construct($id, $parentId, $tracking, $minDmg, $maxDmg, $fireMode = "Standard", $dmgType = "Standard", $melt = 0){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->tracking = $tracking;
		$this->minDmg = $minDmg;
		$this->maxDmg = $maxDmg;
		$this->fireMode = $fireMode;
		$this->dmgType = $dmgType;
		$this->melt = $melt;
	}

	public function getAccuracyLoss($dist){
		return 0;
	}

	public function getDamageMod($turn){
		return 1;
	}
}

class Vran extends Torpedo {
	public $name = "Vran";
	public $role = "Light Particle Torpedo";
	public static $prio = 0;
	public $integrity = 6;
	public $negation = 1;
	public $tracking = 3;
	public $maxRange = 700;
	public $reload = 2;
	public static $value = 0;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	function addSystems(){
		$this->addSubSystem(new Warhead($this->getId(), $this->parentId, $this->tracking, 28, 32));
	}
}

class Vranoth extends Vran {
	public $name = "Vranoth";
	public $role = "Medium Particle Torpedo";
	public static $prio = 0;
	public $integrity = 8;
	public $negation = 2;
	public $tracking = 4;
	public $maxRange = 850;
	public $reload = 3;
	public static $value = 0;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	function addSystems(){
		$this->addSubSystem(new Warhead($this->getId(), $this->parentId, $this->tracking, 34, 46));
	}
}

class VranothKa extends Vranoth {
	public $name = "VranothKa";
	public $role = "Heavy Particle Torpedo";
	public static $prio = 0;
	public $integrity = 10;
	public $negation = 3;
	public $tracking = 5;
	public $maxRange = 1000;
	public $reload = 3;
	public static $value = 0;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	function addSystems(){
		$this->addSubSystem(new Warhead($this->getId(), $this->parentId, $this->tracking, 54, 70));
	}
}

class Ullt extends Torpedo {
	public $name = "Ullt";
	public $role = "Medium Antimatter Torpedo";
	public static $prio = 0;
	public $integrity = 8;
	public $negation = 3;
	public $tracking = 4;
	public $maxRange = 700;
	public $reload = 3;
	public static $value = 0;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	function addSystems(){
		$this->addSubSystem(new Warhead($this->getId(), $this->parentId, $this->tracking, 42, 51));
	}
}

class Hasta extends Missile {
	public $name = "Hasta";
	public $role = "Light Anti-Fighter Missiles";
	public static $prio = 0;
	public $mass = 2;
	public $integrity = 4;
	public $negation = 1;
	public static $value = 3;
	public $tracking = 1;
	public $baseImpulse = 175;
	public $size = 15;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	function addSystems(){
		$this->addSubSystem(new Warhead($this->getId(), $this->parentId, $this->tracking, 15, 18));
	}
}

class Javelin extends Missile {
	public $name = "Javelin";
	public $role = "Conv. Multirole Missiles";
	public static $prio = 0;
	public $mass = 4;
	public $integrity = 8;
	public $negation = 2;
	public static $value = 4;
	public $tracking = 3;
	public $baseImpulse = 150;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	function addSystems(){
		$this->addSubSystem(new Warhead($this->getId(), $this->parentId, $this->tracking, 32, 44));
	}
}

class Triarii extends Missile {
	public $name = "Triarii";
	public $role = "Plasma Multirole Missiles";
	public static $prio = 0;
	public $mass = 4;
	public $integrity = 8;
	public $negation = 2;
	public static $value = 6;
	public $tracking = 3;
	public $baseImpulse = 150;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	function addSystems(){
		$this->addSubSystem(new Warhead($this->getId(), $this->parentId, $this->tracking, 32, 44, "Standard", "Plasma", 50));
	}
}

class Myrmidon extends Missile {
	public $name = "Myrmidon";
	public $role = "Light Conv. Antiship Missiles";
	public static $prio = 0;
	public $mass = 5;
	public $integrity = 10;
	public $negation = 3;
	public static $value = 7;
	public $tracking = 4;
	public $baseImpulse = 125;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	function addSystems(){
		$this->addSubSystem(new Warhead($this->getId(), $this->parentId, $this->tracking, 54, 70));
	}
}

class Vanguard extends Missile {
	public $name = "Vanguard";
	public $role = "Light Interceptor Missiles";
	public static $prio = 0;
	public $mass = 2;
	public $integrity = 4;
	public $negation = 0;
	public static $value = 3;
	public $tracking = 0;
	public $baseImpulse = 225;
	public $size = 15;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	function addSystems(){
		$this->addSubSystem(new Warhead($this->getId(), $this->parentId, $this->tracking, 9, 12));
	}
}

class Needle extends Missile {
	public $name = "Needle";
	public $role = "Light Anti-Fighter Missiles";
	public static $prio = 0;
	public $mass = 2;
	public $integrity = 4;
	public $negation = 0;
	public static $value = 3;
	public $tracking = 1;
	public $baseImpulse = 175;
	public $size = 15;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	function addSystems(){
		$this->addSubSystem(new Warhead($this->getId(), $this->parentId, $this->tracking, 15, 18));
	}
}

class Naga extends Missile {
	public $name = "Naga";
	public $role = "Multirole Missiles";
	public static $prio = 0;
	public $mass = 4;
	public $integrity = 8;
	public $negation = 2;
	public static $value = 4;
	public $tracking = 3;
	public $baseImpulse = 150;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	function addSystems(){
		$this->addSubSystem(new Warhead($this->getId(), $this->parentId, $this->tracking, 30, 42));
	}
}

class Cyclops extends Missile {
	public $name = "Cyclops";
	public $role = "Light Antiship Missiles";
	public static $prio = 0;
	public $mass = 5;
	public $integrity = 10;
	public $negation = 3;
	public static $value = 6;
	public $tracking = 4;
	public $baseImpulse = 125;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	function addSystems(){
		$this->addSubSystem(new Warhead($this->getId(), $this->parentId, $this->tracking, 50, 66));
	}
}

class Titan extends Missile {
	public $name = "Titan";
	public $role = "Heavy Antiship Missiles";
	public static $prio = 0;
	public $mass = 7;
	public $integrity = 14;
	public $negation = 5;
	public static $value = 8;
	public $tracking = 5;
	public $baseImpulse = 100;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	function addSystems(){
		$this->addSubSystem(new Warhead($this->getId(), $this->parentId, $this->tracking, 70, 88));
	}
}

?>