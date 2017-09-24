<?php

class Flight extends Mixed {
	public $flight = true;
	public $unitType = "Flight";
	public $name = "Flight";
	public $display = "Flight";
	public $faction = false;
	public $baseSize = 25;
	public $unitSize = 4;

	public $fSize = 15;
	public $traverse = -3;

	function __construct($id, $userid, $available, $status, $destroyed){		
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function setMass(){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed){
				$this->mass = max($this->mass, $this->structures[$i]->mass);
			}
		}
	}

	public function setCurrentImpulse($turn){
		$this->baseImpulse = floor(pow($this->mass, -0.8)*4000);
		$this->currentImpulse = $this->baseImpulse;
	}

	public function setSize(){
		$alive = 0;
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed){
				$alive++;
			}
		}
		$this->size = $this->baseSize + $alive*$this->unitSize;
	}

	public function getFireAngle($fire){
		return mt_rand(0, 359);
	}

	public function addMissionDB($data, $userid, $turn, $phase){
		//Debug::log("flight #".$this->id.", data :".sizeof($data));
		if ($this->userid == $userid){
			$this->mission = new Mission($data[sizeof($data)-1]);
		}
		else if ($phase == -1){
			for ($i = sizeof($data)-1; $i >= 0; $i--){
				if ($data[$i]["turn"] < $turn){
					$this->mission = new Mission($data[$i]);
					return;
				}
			}
		} else $this->mission = new Mission($data[sizeof($data)-1]);

	}
}
?>