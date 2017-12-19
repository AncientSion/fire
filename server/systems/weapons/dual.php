<?php

class Dual extends Weapon {
	public $type = "Dual";
	public $display = "";
	public $modes = array();
	public $states = array();
	public $weapons = array();
	public $dual = 1;
	public $powerReq = 0;

	function __construct($id, $parentId, $start, $end, $mass, $modes, $destroyed = 0){
		$this->mass = $mass;
		parent::__construct($id, $parentId, $start, $end, 0, $destroyed);

		for ($i = 0; $i < sizeof($modes); $i++){
			$this->states[] = 0;
			$this->modes[] = $modes[$i];
			$this->weapons[] = new $modes[$i]($i, $parentId, $start, $end, 0, 0);
			$this->powerReq = max($this->powerReq, $this->weapons[$i]->powerReq);

			$this->display .= $this->weapons[$i]->display." / ";
		}

		$this->display = substr($this->display, 0, strlen($this->display)-3);
	}

	public function setState($turn, $phase){
		//Debug::log("setState Dual");
		parent::setState($turn, $phase);
		$this->setActiveSystem($turn);
		$this->setProps();

		//if ($this->id == 16 && $this->parentId == 4){var_export($this->getActiveSystem());}
	}

	public function setActiveSystem($turn){
		//Debug::log("setActiveSystem");
		for ($i = sizeof($this->powers)-1; $i >= 0; $i--){
			if ($this->powers[$i]->type < 0){
				if ($this->powers[$i]->turn == $turn || $this->powers[$i]->turn == $turn-1){
					$this->states[abs($this->powers[$i]->type)-1] = 1;
					//Debug::log("setting active");
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
		//var_export($this->states); echo "<br><br>";
		//var_export($this->powers);echo "<br><br>";
		for ($i = 0; $i < sizeof($this->states); $i++){
			if ($this->states[$i]){
				//echo "returning </br>";
				return $this->weapons[$i];
			}
		}
		Debug::log("ERROR - ".$this->parentId."/".$this->id." CANT RETURN ACTIVE WEAPON");
	}

	public function setProps(){
		for ($i = 0; $i < sizeof($this->states); $i++){
			if ($this->states[$i]){
				$this->weapons[$i]->powers = $this->powers;
				$this->weapons[$i]->crits = $this->crits;
				$this->reload = $this->weapons[$i]->reload;
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