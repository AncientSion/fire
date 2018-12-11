<?php

class Fighter extends Single {
	public $traverse = 1;
	public $size = 26;
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
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

class Zorth extends Fighter {
	public $name = "Zorth";
	public $role = "Light Interceptor";
	public $faction = "Vree Conglomerate";
	public static $value =  18;
	public $integrity = 16;
	public $negation = 3;
	public $baseImpulse = 160;
	public $baseHitChance = 18;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new FighterDual($this->getId(), $this->parentId, $this->id, 1, 
			array(
				array("FighterStandard", 1, 10, 14),
				array("FighterStrafe", 1, 10, 14)
			)
		);

	}
}

class Aurora extends Fighter {
	public $name = "Aurora";
	public $role = "Medium Fighter";
	public $faction = "Earth Alliance";
	public static $value =  28;
	public $integrity = 26;
	public $negation = 4;
	public $baseImpulse = 125;
	public $baseHitChance = 24;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new FighterDual($this->getId(), $this->parentId, $this->id, 2, 
			array(
				array("FighterStandard", 1, 10, 14),
				array("FighterStrafe", 1, 10, 14)
			)
		);

	}
}

class Thunderbolt extends Fighter {
	public $name = "Thunderbolt";
	public $role = "Superiority Fighter";
	public $faction = "Earth Alliance";
	public static $value =  34;
	public $integrity = 28;
	public $negation = 5;
	public $baseImpulse = 125;
	public $baseHitChance = 25;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new ParticlePulsar($this->getId(), $this->parentId, $this->id, 1, 1, 10, 14, 0, 360);
	}
}

class Sentri extends Fighter {
	public $name = "Sentri";
	public $role = "Interceptor";
	public $faction = "Centauri Republic";
	public static $value =  26;
	public $integrity = 24;
	public $negation = 5;
	public $baseImpulse = 140;
	public $baseHitChance = 22;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new FighterDual($this->getId(), $this->parentId, $this->id, 2, 
			array(
				array("FighterStandard", 1, 10, 14),
				array("FighterStrafe", 1, 10, 14)
			)
		);
		return;
		$this->systems[] = new ParticleGun($this->getId(), $this->parentId, $this->id, 2, 1, 10, 14);
	}
}

class Sitara extends Fighter {
	public $name = "Sitara";
	public $role = "Strike Fighter";
	public static $value =  26;
	public $integrity = 22;
	public $negation = 6;
	public $baseImpulse = 115;
	public $baseHitChance = 24;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new ParticleBolt($this->getId(), $this->parentId, $this->id, 1, 1, 34, 41, 0, 360);
	}
}

class Nial extends Fighter {
	public $name = "Nial";
	public $role = "Advanced Superiority Fighter";
	public $faction = "Minbari Federation";
	public static $value =  40;
	public $integrity = 30;
	public $negation = 7;
	public $baseImpulse = 150;
	public $baseHitChance = 26;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new FighterDual($this->getId(), $this->parentId, $this->id, 3, 
			array(
				array("FighterStandard", 1, 12, 16),
				array("FighterStrafe", 1, 12, 16)
			)
		);
	}
}

class Tishat extends Fighter {
	public $name = "Tishat";
	public $role = "Medium Fighter";
	public $faction = "Minbari Federation";
	public static $value =  34;
	public $integrity = 28;
	public $negation = 6;
	public $baseImpulse = 150;
	public $baseHitChance = 24;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new FighterDual($this->getId(), $this->parentId, $this->id, 2, 
			array(
				array("FighterStandard", 1, 11, 15),
				array("FighterStrafe", 1, 11, 15)
			)
		);
	}
}

class Gorith extends Fighter {
	public $name = "Gorith";
	public $role = "Medium Fighter";
	public $faction = "Narn Regime";
	public static $value =  23;
	public $integrity = 22;
	public $negation = 3;
	public $baseImpulse = 125;
	public $baseHitChance = 24;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new FighterDual($this->getId(), $this->parentId, $this->id, 2, 
			array(
				array("FighterStandard", 1, 10, 14),
				array("FighterStrafe", 1, 10, 14)
			)
		);
		return;
		$this->systems[] = new ParticleGun($this->getId(), $this->parentId, $this->id, 2, 1, 11, 15);
	}
	
	public $critEffects =  array( // type, mag, dura, effect
		array("Disabled", 160, 0, 0.00),
	);
}

class Frazi extends Fighter {
	public $name = "Frazi";
	public $role = "Heavy Fighter";
	public $faction = "Narn Regime";
	public static $value =  30;
	public $integrity = 26;
	public $negation = 5;
	public $baseImpulse = 120;
	public $baseHitChance = 26;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
	
	public $critEffects =  array( // type, mag, dura, effect
		array("Disabled", 160, 0, 0.00),
	);

	public function addSystems(){
		$this->systems[] = new FighterDual($this->getId(), $this->parentId, $this->id, 2, 
			array(
				array("FighterStandard", 1, 12, 16),
				array("FighterStrafe", 1, 12, 16)
			)
		);
	}
}

?>