<?php

class Fighter extends Single {
	
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
        	"faction" => $this->faction,
        	"value" => $this->value,
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

	public function setBaseStats(){
		$this->baseHitChance = ceil($this->mass/1.5);
	}
}

class Aurora extends Fighter {
	public $name = "Aurora";
	public $display = "Aurora";
	public $faction = "Earth Alliance";
	public $value = 29;
	public $mass = 38;
	public $ep = 100;
	public $integrity = 25;
	public $negation = 5;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new LinkedParticleGun(sizeof($this->systems), $this->id, $this->parentId, 1, 2, 11, 15, 0, 360);
	}
}

class Thunderbolt extends Fighter {
	public $name = "Thunderbolt";
	public $display = "Thunderbolt";
	public $faction = "Earth Alliance";
	public $value = 32;
	public $mass = 42;
	public $ep = 110;
	public $integrity = 29;
	public $negation = 6;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
			//t($id, $fighterId, $parentId, $shots, $minDmg, $maxDmg, $start, $end){
		$this->systems[] = new ParticlePulsar(sizeof($this->systems), $this->id, $this->parentId, 3, 11, 15, 0, 360);
	}
}

class Nial extends Fighter {
	public $name = "Nial";
	public $display = "Nial";
	public $faction = "Minbari Federation";
	public $value = 44;
	public $mass = 36;
	public $ep = 140;
	public $integrity = 31;
	public $negation = 8;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new LinkedNeutronRepeater(sizeof($this->systems), $this->id, $this->parentId, 1, 3, 14, 18, 0, 360);
	}
}

class Sentri extends Fighter {
	public $name = "Sentri";
	public $display = "Sentri";
	public $faction = "Centauri Republic";
	public $value = 28;
	public $mass = 32;
	public $ep = 115;
	public $integrity = 24;
	public $negation = 6;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new LinkedParticleGun(sizeof($this->systems), $this->id, $this->parentId, 1, 2, 10, 14, 0, 360);
	}
}

class Sitara extends Fighter {
	public $name = "Sitara";
	public $display = "Sitara";
	public $faction = "Centauri Republic";
	public $value = 24;
	public $mass = 32;
	public $ep = 105;
	public $integrity = 22;
	public $negation = 5;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new IonBolt(sizeof($this->systems), $this->id, $this->parentId, 1, 1, 34, 42, 0, 360);
	}
}

class Gorith extends Fighter {
	public $name = "Gorith";
	public $display = "Gorith";
	public $faction = "Narn Regime";
	public $value = 22;
	public $mass = 30;
	public $ep = 85;
	public $integrity = 22;
	public $negation = 4;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new LinkedParticleGun(sizeof($this->systems), $this->id, $this->parentId, 1, 2, 11, 15, 0, 360);
	}
}

class Frazi extends Fighter {
	public $name = "Frazi";
	public $display = "Frazi";
	public $faction = "Narn Regime";
	public $value = 32;
	public $mass = 35;
	public $ep = 100;
	public $integrity = 27;
	public $negation = 6;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new LinkedParticleGun(sizeof($this->systems), $this->id, $this->parentId, 1, 2, 13, 17, 0, 360);
	}
}

?>