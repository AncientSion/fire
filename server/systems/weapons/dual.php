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
			$id = (string)($this->id * 100).(string)$i;

			$this->modes[] = $modes[$i];
			$this->states[] = 0;
			$this->weapons[] = new $modes[$i]($i, $parentId, $start, $end, 0, 0);
		}
	}

	public function getActiveSystem(){
		for ($i = 0; $i < sizeof($this->states); $i++){
			if ($this->states[$i]){
				return $this->weapons[$i];
			}
		}
	}

	public function setState($turn){
		parent::setState($turn);
		//echo "</br>system ".$this->id."</br>";

		for ($i = 0; $i < sizeof($this->powers); $i++){
			if ($this->powers[$i]->turn == $turn){
				if ($this->powers[$i]->type < 0){
					//echo "type: ".$this->powers[$i]->type;
					$index = -($this->powers[$i]->type+1);
					$this->states[$index] = 1;
				}
				else if ($this->powers[$i]->type == 1){
					$this->getActiveSystem()->addPowerEntry($this->powers[$i]);
				}
			}
		}
		//echo $this->getActiveSystem()->name;
	}
}

class DualPulseIon extends Weapon {
	public $type = "Dual";
	public $name = "";
	public $display = "";
	public $modes = array("LightPulse", "LightParticleBeam", "HeavyLaser");
	public $states = array(0, 0, 0);
	public $weapons = array();
	public $mass = 18;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = 0){
		for ($i = 0; $i < sizeof($this->modes); $i++){
        	$this->weapons[] = new $this->modes[$i]($id, $parentId, $start, $end, 0, 0);
		}
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

?>