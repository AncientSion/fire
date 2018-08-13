<?php

class Fighter extends Single {
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
		$this->addSystems();
	}

	public function setBaseStats($phase, $turn){
	}

	public function lockWeapons($turn){
		for ($i = 0; $i < sizeof($this->systems); $i++){
			for ($j = sizeof($this->systems[$i]->fireOrders)-1; $j >= 0; $j--){
				if ($this->systems[$i]->fireOrders[$j]->turn == $turn){
					$this->systems[$i]->locked = 1;
					return;
				}
				else if ($this->systems[$i]->fireOrders[$j]->turn < $turn){
					return;
				}
			}
		}
	}
}

class Aurora extends Fighter {
	public $name = "Aurora";
	public $role = "Medium Fighter";
	public $faction = "Earth Alliance";
	public static $value =  28;
	public $mass = 34;
	public $integrity = 26;
	public $negation = 4;
	public $baseImpulse = 100;
	public $baseHitChance = 24;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new ParticleGun($this->getId(), $this->id, $this->parentId, 1, 2, 12, 16, 0, 360);
	}
}

class Thunderbolt extends Fighter {
	public $name = "Thunderbolt";
	public $role = "Superiority Fighter";
	public $faction = "Earth Alliance";
	public static $value =  34;
	public $mass = 36;
	public $integrity = 28;
	public $negation = 5;
	public $baseImpulse = 100;
	public $baseHitChance = 25;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new ParticlePulsar($this->getId(), $this->id, $this->parentId, 1, 1, 12, 16, 0, 360);
	}
}

class Sentri extends Fighter {
	public $name = "Sentri";
	public $role = "Interceptor";
	public $faction = "Centauri Republic";
	public static $value =  26;
	public $mass = 32;
	public $integrity = 24;
	public $negation = 5;
	public $baseImpulse = 110;
	public $baseHitChance = 22;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new ParticleGun($this->getId(), $this->id, $this->parentId, 1, 2, 10, 14, 0, 360);
	}
}

class Sitara extends Fighter {
	public $name = "Sitara";
	public $role = "Strike Fighter";
	public static $value =  26;
	public $mass = 34;
	public $integrity = 22;
	public $negation = 6;
	public $baseImpulse = 90;
	public $baseHitChance = 24;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new ParticleBolt($this->getId(), $this->id, $this->parentId, 1, 1, 30, 36, 0, 360);
	}
}

class Nial extends Fighter {
	public $name = "Nial";
	public $role = "Advanced Superiority Fighter";
	public $faction = "Minbari Federation";
	public static $value =  40;
	public $mass = 31;
	public $integrity = 30;
	public $negation = 7;
	public $baseImpulse = 120;
	public $baseHitChance = 26;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new NeutronRepeater($this->getId(), $this->id, $this->parentId, 1, 3, 14, 18, 0, 360);
	}
}

class Tishat extends Fighter {
	public $name = "Tishat";
	public $role = "Medium Fighter";
	public $faction = "Minbari Federation";
	public static $value =  34;
	public $mass = 29;
	public $integrity = 28;
	public $negation = 6;
	public $baseImpulse = 120;
	public $baseHitChance = 24;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new NeutronRepeater($this->getId(), $this->id, $this->parentId, 1, 2, 13, 17, 0, 360);
	}
}

class Gorith extends Fighter {
	public $name = "Gorith";
	public $role = "Medium Fighter";
	public $faction = "Narn Regime";
	public static $value =  21;
	public $mass = 34;
	public $integrity = 22;
	public $negation = 3;
	public $baseImpulse = 100;
	public $baseHitChance = 24;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new ParticleGun($this->getId(), $this->id, $this->parentId, 1, 2, 11, 15, 0, 360);
	}
}

class Frazi extends Fighter {
	public $name = "Frazi";
	public $role = "Heavy Fighter";
	public $faction = "Narn Regime";
	public static $value =  30;
	public $mass = 34;
	public $integrity = 26;
	public $negation = 5;
	public $baseImpulse = 1000;
	public $baseHitChance = 26;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new ParticleGun($this->getId(), $this->id, $this->parentId, 1, 2, 13, 17, 0, 360);
	}
}

?>