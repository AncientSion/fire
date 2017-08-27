<?php

class Salvo extends Mixed {
	public $name = "Salvo";
	public $unitType = "Salvo";
	public $salvo = true;
	public $traverse = -4;

	function __construct($id, $userid, $available, $status, $destroyed){		
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}
	
	public function getImpulseProfileMod(){
		return 0;
	}

	public function setMass(){
		$this->mass = $this->structures[0]->mass;
	}

	public function setSize(){
		$this->size = 18;
	}

	public function getShots($turn){
		$shots = 0;
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->isDestroyed()){
				$shots++;
			}
		}
		return $shots;
	}

	public function setCurrentImpulse($turn){
		$this->baseImpulse = ceil(pow($this->mass, -0.75)*250);
		$this->currentImpulse = $this->baseImpulse * ($turn - $this->available +2);
	}
	
	public function getCurrentImpulse(){
		return $this->currentImpulse;
	}
}

?>