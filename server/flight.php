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

	public function setCurrentImpulse($turn, $phase){
		//if ($this->available == $turn && !$this->actions[0]->resolved){return;}

		if (!isset($this->mission)){return;}

		$elapsed = 0;
		if ($this->mission->arrived){
			$elapsed = 0;
		}
		else if ($this->mission->type > 1 || !$this->mission->arrived){
			$elapsed = $turn - $this->mission->turn + ($phase > 1);
		}

		$this->baseImpulse = floor(pow($this->mass, -0.7)*1250); // bout 125 to 150
		$this->currentImpulse = min($this->baseImpulse * (1+$elapsed), $this->baseImpulse*3);
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