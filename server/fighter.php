<?php

class Fighter extends Single {
	public $traverse = 1;
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
		$this->addSystems();
		for ($i = 0; $i < sizeof($this->systems); $i++){
			$this->systems[$i]->fighterId = $this->id;
		}
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
	public $baseImpulse = 225;
	public $baseHitChance = 24;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new FighterDual($this->getId(), $this->parentId, $this->id, 2, 
			array(
				array("FighterStandard", 1, 12, 16),
				array("FighterStrafe", 1, 12, 16)
			)
		);

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
	public $baseImpulse = 125;
	public $baseHitChance = 25;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new ParticlePulsar($this->getId(), $this->parentId, $this->id, 1, 1, 12, 16, 0, 360);
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
	public $baseImpulse = 140;
	public $baseHitChance = 22;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new FighterDual($this->getId(), $this->parentId, $this->id, 2, 
			array(
				array("FighterStandard", 1, 12, 16),
				array("FighterStrafe", 1, 12, 16)
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
	public $mass = 34;
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
	public $mass = 31;
	public $integrity = 30;
	public $negation = 7;
	public $baseImpulse = 150;
	public $baseHitChance = 26;
	public $jamming = 15;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new FighterDual($this->getId(), $this->parentId, $this->id, 3, 
			array(
				array("FighterStandard", 1, 14, 18),
				array("FighterStrafe", 1, 14, 18)
			)
		);
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
	public $baseImpulse = 150;
	public $baseHitChance = 24;
	public $jamming = 15;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new FighterDual($this->getId(), $this->parentId, $this->id, 2, 
			array(
				array("FighterStandard", 1, 13, 17),
				array("FighterStrafe", 1, 13, 17)
			)
		);
	}
}

class Gorith extends Fighter {
	public $name = "Gorith";
	public $role = "Medium Fighter";
	public $faction = "Narn Regime";
	public static $value =  23;
	public $mass = 34;
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
				array("FighterStandard", 1, 12, 16),
				array("FighterStrafe", 1, 12, 16)
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
	public $mass = 34;
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
				array("FighterStandard", 1, 13, 17),
				array("FighterStrafe", 1, 13, 17)
			)
		);
		return;
		$this->systems[] = new ParticleGun($this->getId(), $this->parentId, $this->id, 2, 1, 13, 17);
	}
}

?>