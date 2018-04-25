<?php

class Missile extends Single {
	public $missile = 1;
	public $torpedo = 0;
	public $maxRange = 0;

	function __construct($id, $parentId){
		if ($this->missile){
			$this->integrity = $this->mass*3;
			$this->negation = $this->mass-1;
		}

		parent::__construct($id, $parentId);
		$this->systems[] = new Warhead($this->getId(), $this->parentId, $this->minDmg, $this->maxDmg, $this->traverse);
	}
	
	public function setBaseStats($phase, $turn){
		$this->baseHitChance = ceil(sqrt($this->mass)*5);
		if ($this->missile){$this->baseImpulse = ceil(pow($this->mass, -0.75)*400);}
		else {$this->baseImpulse = $this->maxRange;}
	}

	public function singleCritTest($turn, $extra){
		return;
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
	public $display = "Warhead";
	public $type = "Warhead";
	public $fireMode = "Standard";
	public $dmgType = "Standard";
	public $animation = "explosive";
	public $linked = 1;

	function __construct($id, $parentId, $minDmg, $maxDmg, $traverse){
		$this->id = $id;
		$this->parentId = $parentId;
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

class Vran extends Torpedo {
	public $name = "Vran";
	public $display = "Light Particle Torpedo";
	public static $prio = 0;
	public $minDmg = 28;
	public $maxDmg = 32;
	public $integrity = 5;
	public $negation = 1;
	public $traverse = -1;
	public $maxRange = 600;
	public static $value = 0;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class Vranoth extends Vran {
	public $name = "Vranoth";
	public $display = "Medium Particle Torpedo";
	public static $prio = 0;
	public $minDmg = 34;
	public $maxDmg = 46;
	public $integrity = 8;
	public $negation = 2;
	public $traverse = 0;
	public $maxRange = 800;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class VranothKa extends Vranoth {
	public $name = "VranothKa";
	public $display = "Heavy Particle Torpedo";
	public static $prio = 0;
	public $minDmg = 54;
	public $maxDmg = 72;
	public $integrity = 11;
	public $negation = 3;
	public $traverse = 1;
	public $maxRange = 1000;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class Hasta extends Missile {
	public $name = "Hasta";
	public $display = "Light Anti-Fighter Missiles";
	public static $prio = 0;
	public $minDmg = 15;
	public $maxDmg = 18;
	public $mass = 2;
	public static $value = 3;
	public $traverse = -3;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class Javelin extends Missile {
	public $name = "Javelin";
	public $display = "Impr. Multirole Missiles";
	public static $prio = 0;
	public $minDmg = 32;
	public $maxDmg = 44;
	public $mass = 4;
	public static $value = 5;
	public $traverse = -1;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
		$this->negation += 1;
	}
}

class Triarii extends Missile {
	public $name = "Triarii";
	public $display = "Heavy Multirole Missiles";
	public static $prio = 0;
	public $minDmg = 41;
	public $maxDmg = 53;
	public $mass = 4;
	public static $value = 7;
	public $traverse = -1;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class Vanguard extends Missile {
	public $name = "Vanguard";
	public $display = "Light Interceptor Missiles";
	public static $prio = 0;
	public $minDmg = 9;
	public $maxDmg = 12;
	public $mass = 2;
	public static $value = 3;
	public $traverse = -4;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class Needle extends Missile {
	public $name = "Needle";
	public $display = "Light Anti-Fighter Missiles";
	public static $prio = 0;
	public $minDmg = 15;
	public $maxDmg = 18;
	public $mass = 2;
	public static $value = 3;
	public $traverse = -3;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class Naga extends Missile {
	public $name = "Naga";
	public $display = "Multirole Missiles";
	public static $prio = 0;
	public $minDmg = 30;
	public $maxDmg = 42;
	public $mass = 4;
	public static $value = 5;
	public $traverse = -1;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class Cyclops extends Missile {
	public $name = "Cyclops";
	public $display = "Light Antiship Missiles";
	public static $prio = 0;
	public $minDmg = 50;
	public $maxDmg = 68;
	public $mass = 5;
	public static $value = 8;
	public $traverse = 0;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class Titan extends Missile {
	public $name = "Titan";
	public $display = "Heavy Antiship Missiles";
	public static $prio = 0;
	public $minDmg = 70;
	public $maxDmg = 88;
	public $mass = 7;
	public static $value = 10;
	public $traverse = 1;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

?>