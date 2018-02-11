<?php

class Fighter extends Single {
	public $dropout = array(70);
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
		$this->addSystems();
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

	public function jsonSerialize(){
		return array(
        	"id" => $this->id,
        	"name" => $this->name,
        	"display" => $this->display,
        	"faction" => $this->faction,
        	"value" => static::$value,
        	"mass" => $this->mass,
        	"integrity" => $this->integrity,
        	"ep" => $this->ep,
        	"turns" => $this->turns,
        	"negation" => $this->negation,
        	"systems" => $this->systems,
        	"damages" => $this->damages,
        	"crits" => $this->crits,
        	"destroyed" => $this->destroyed
        );
    }

	public function setBaseStats($phase, $turn){
		$this->baseHitChance = ceil($this->mass/1.5);
	}
}

class Aurora extends Fighter {
	public $name = "Aurora";
	public $display = "Aurora";
	public $faction = "Earth Alliance";
	public static $value =  28;
	public $mass = 34;
	public $ep = 100;
	public $integrity = 26;
	public $negation = 4;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new ParticleGun($this->getId(), $this->id, $this->parentId, 1, 2, 12, 16, 0, 360);
	}
}

class Thunderbolt extends Fighter {
	public $name = "Thunderbolt";
	public $display = "Thunderbolt";
	public $faction = "Earth Alliance";
	public static $value =  35;
	public $mass = 36;
	public $integrity = 29;
	public $negation = 5;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new ParticlePulsar($this->getId(), $this->id, $this->parentId, 1, 1, 12, 16, 0, 360);
	}
}

class Sentri extends Fighter {
	public $name = "Sentri";
	public $display = "Sentri";
	public $faction = "Centauri Republic";
	public static $value =  26;
	public $mass = 32;
	public $integrity = 24;
	public $negation = 5;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new ParticleGun($this->getId(), $this->id, $this->parentId, 1, 2, 10, 14, 0, 360);
	}
}

class Sitara extends Fighter {
	public $faction = "Centauri Republic";
	public static $value =  24;
	public $integrity = 22;
	public $negation = 5;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class SitaraIon extends Sitara {
	public $name = "SitaraIon";
	public $display = "Sitara (Ion)";
	public $mass = 34;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new IonBolt($this->getId(), $this->id, $this->parentId, 1, 1, 36, 44, 0, 360);
	}
}

class SitaraPlasma extends Sitara {
	public $name = "SitaraPlasma";
	public $display = "Sitara (Plasma)";
	public $mass = 32;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new PlasmaBomb($this->getId(), $this->id, $this->parentId, 2, 1, 42, 59, 0, 360);
	}
}

class Nial extends Fighter {
	public $name = "Nial";
	public $display = "Nial";
	public $faction = "Minbari Federation";
	public static $value =  45;
	public $mass = 31;
	public $integrity = 31;
	public $negation = 7;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new NeutronRepeater($this->getId(), $this->id, $this->parentId, 1, 3, 14, 18, 0, 360);
	}
}

class Gorith extends Fighter {
	public $name = "Gorith";
	public $display = "Gorith";
	public $faction = "Narn Regime";
	public static $value =  22;
	public $mass = 34;
	public $integrity = 22;
	public $negation = 4;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new ParticleGun($this->getId(), $this->id, $this->parentId, 1, 2, 11, 15, 0, 360);
	}
}

class Frazi extends Fighter {
	public $name = "Frazi";
	public $display = "Frazi";
	public $faction = "Narn Regime";
	public static $value =  32;
	public $mass = 36;
	public $integrity = 27;
	public $negation = 5;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new ParticleGun($this->getId(), $this->id, $this->parentId, 1, 2, 13, 17, 0, 360);
	}
}

?>