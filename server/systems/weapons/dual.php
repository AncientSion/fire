<?php

class Dual extends Weapon {
	public $type = "Dual";
	public $display = "Combo System";
	public $modes = array();
	public $states = array();
	public $weapons = array();
	public $dual = 1;

	function __construct($id, $parentId, $start, $end, $mass, $modes, $destroyed = 0){
		$this->mass = $mass;
		parent::__construct($id, $parentId, $start, $end, 0, $destroyed);

		for ($i = 0; $i < sizeof($modes); $i++){
			$this->states[] = 0;
			$this->modes[] = $modes[$i];
			$this->weapons[] = new $modes[$i]($i, $parentId, $start, $end, 0, 0);
		}
	}

	public function setState($turn){
		parent::setState($turn);
		$this->setActiveSystem($turn);
		$this->setProps();

		//if ($this->id == 16 && $this->parentId == 4){var_export($this->getActiveSystem());}
	}

	public function setActiveSystem($turn){
		for ($i = sizeof($this->powers)-1; $i >= 0; $i--){
			if ($this->powers[$i]->type < 0){
				if ($this->powers[$i]->turn == $turn || $this->powers[$i]->turn == $turn-1){
					$this->states[abs($this->powers[$i]->type)-1] = 1;
					return;
				}
			}
		}
		$this->powers[] = new Power(0, $this->parentId, $this->id, $turn, -1, 0);
		$this->powers[sizeof($this->powers)-1]->new = 1;
		$this->states[0] = 1;
	}

	public function getActiveSystem(){
		//echo "getActiveSystem ".$this->parentId."/".$this->id."</br>";
		//var_Export($this->states); echo "<br>";
		//var_export($this->powers);echo "<br>";
		for ($i = 0; $i < sizeof($this->states); $i++){
			if ($this->states[$i]){
				//echo "returning </br>";
				return $this->weapons[$i];
			}
		}
		Debug::log($this->parentId."/".$this->id." CANT RETURN ACTIVE WEAPON");
	}

	public function setProps(){
		for ($i = 0; $i < sizeof($this->states); $i++){
			if ($this->states[$i]){
				$this->weapons[$i]->powers = $this->powers;
				$this->weapons[$i]->crits = $this->crits;
				return;
			}
		}
	}
}

class DualPulseIon extends Weapon {
	public $type = "Dual";
	public $name = "";
	public $display = "";
	public $modes = array("LightPulse", "LightParticleBeam", "HeavyLaser");
	public $states = array(0, 0, 0);
	public $weapons = array();
	public $mass = 15;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = 0){
		for ($i = 0; $i < sizeof($this->modes); $i++){
        	$this->weapons[] = new $this->modes[$i]($id, $parentId, $start, $end, 0, 0);
		}
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

?>