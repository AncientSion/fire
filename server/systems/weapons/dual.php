<?php

class Dual extends Weapon {
	public $type = "Dual";
	public $name = "Dual";
	public $display = "Dual";
	public $modes = array();
	public $states = array();
	public $weapons = array();
	public $dual = 1;
	public $dualParent = 0;
	public $powerReq = 0;

	function __construct($id, $parentId, $start, $end, $mass, $modes, $destroyed = 0){
		$this->mass = $mass;
		parent::__construct($id, $parentId, $start, $end, 0, $destroyed);

		for ($i = 0; $i < sizeof($modes); $i++){
			$this->states[] = 0;
			$this->modes[] = $modes[$i];
			$this->weapons[] = new $modes[$i]($i, $parentId, $start, $end, 0, 0);
			$this->weapons[sizeof($this->weapons)-1]->dualParent = $this->id;
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
		//if ($this->parentId == 15 && $this->id == 14){
		//	Debug::log("setActiveSystempowers: ".sizeof($this->powers));
		//}
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
		//if ($this->parentId == 15 && $this->id == 14){
		//	Debug::log("getActiveSystem: ".sizeof($this->powers));
			//	echo "</br>getActiveSystem ".$this->parentId."/".$this->id."</br>";
			//var_export($this->states); echo "<br><br>";
			//	var_export($this->powers); echo "<br><br>";
			//Debug::log("powers: ".sizeof($this->powers));
		//}
		for ($i = 0; $i < sizeof($this->states); $i++){
			if ($this->states[$i]){
				//echo "returning </br>";
				return $this->weapons[$i];
			}
		}
		//Debug::log("ERROR - ".$this->parentId."/".$this->id." CANT RETURN ACTIVE WEAPON, return DUAL");
		return $this;
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

?>