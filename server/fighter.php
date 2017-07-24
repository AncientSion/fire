<?php

class Fighter extends Single {
	public $name;
	public $display;
	public $value;
	public $mass;
	public $ep;
	public $negation = array();
	public $crits = array();
	public $integrity;
	public $turns;
	
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

	public function getSubHitChance(){
		return ceil($this->mass/1.25);
	}
}

class Aurora extends Fighter {
	public $name = "Aurora";
	public $display = "Aurora";
	public $faction = "Earth Alliance";
	public $value = 34;
	public $mass = 38;
	public $ep = 100;
	public $integrity = 30;
	public $negation = array(6, 5, 5);

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new LinkedParticleGun(sizeof($this->systems), $this->id, $this->parentId, 1, 2, 14, 18, 330, 30);
	}
}

class Thunderbolt extends Fighter {
	public $name = "Thunderbolt";
	public $display = "Thunderbolt";
	public $faction = "Earth Alliance";
	public $value = 40;
	public $mass = 42;
	public $ep = 110;
	public $integrity = 34;
	public $negation = array(7, 6, 6);

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
			//t($id, $fighterId, $parentId, $shots, $minDmg, $maxDmg, $start, $end){
		$this->systems[] = new ParticlePulsar(sizeof($this->systems), $this->id, $this->parentId, 3, 12, 16, 330, 30);
	}
}

class Nial extends Fighter {
	public $name = "Nial";
	public $display = "Nial";
	public $faction = "Minbari Federation";
	public $value = 54;
	public $mass = 36;
	public $ep = 140;
	public $integrity = 36;
	public $negation = array(10, 9, 7);

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new LinkedNeutronRepeater(sizeof($this->systems), $this->id, $this->parentId, 1, 3, 16, 20, 330, 30);
	}
}

class Sentri extends Fighter {
	public $name = "Sentri";
	public $display = "Sentri";
	public $faction = "Centauri Republic";
	public $value = 28;
	public $mass = 32;
	public $ep = 115;
	public $integrity = 28;
	public $negation = array(7, 7, 6);

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new LinkedParticleGun(sizeof($this->systems), $this->id, $this->parentId, 1, 2, 13, 17, 330, 30);
	}
}

class Sitara extends Fighter {
	public $name = "Sitara";
	public $display = "Sitara";
	public $faction = "Centauri Republic";
	public $value = 24;
	public $mass = 32;
	public $ep = 105;
	public $integrity = 26;
	public $negation = array(5, 5, 5);

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new IonBolt(sizeof($this->systems), $this->id, $this->parentId, 1, 1, 30, 37, 330, 30);
	}
}

class Gorith extends Fighter {
	public $name = "Gorith";
	public $display = "Gorith";
	public $faction = "Narn Regime";
	public $value = 22;
	public $mass = 30;
	public $ep = 85;
	public $integrity = 28;
	public $negation = array(5, 5, 4);

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new LinkedParticleGun(sizeof($this->systems), $this->id, $this->parentId, 1, 2, 13, 17, 330, 30);
	}
}

class Frazi extends Fighter {
	public $name = "Frazi";
	public $display = "Frazi";
	public $faction = "Narn Regime";
	public $value = 32;
	public $mass = 35;
	public $ep = 100;
	public $integrity = 32;
	public $negation = array(7, 7, 6);

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new LinkedParticleGun(sizeof($this->systems), $this->id, $this->parentId, 1, 2, 15, 19, 330, 30);
	}
}

?>