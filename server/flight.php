<?php

class Flight extends Mixed {
	public $flight = true;
	public $unitType = "Flight";
	public $name = "Flight";
	public $display = "Flight";
	public $faction = false;
	public $baseSize = 30;
	public $unitSize = 5;

	public $fSize = 15;
	public $traverse = -4;

	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes){
        parent::__construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes);
	}

	public function setMass(){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed){
				$this->mass = max($this->mass, $this->structures[$i]->mass);
			}
		}
	}

	public function setCurrentImpulse($t, $p){
		//Debug::log("setCurrentImpulse #".$this->id);
		if (!$this->mass){$this->baseImpulse = 0; $this->currentImpulse = 0; return;}
		$this->baseImpulse = floor(pow($this->mass, -2.5)*600000);
		if (!isset($this->mission) || !sizeof($this->mission)){return;}

		$elapsed = 0;

		if ($this->available == $this->mission->turn){
			$elapsed++;
		} else $elapsed += 0.5;
		
		//if ($this->mission->type > 1 || !$this->mission->arrived){
		//var_export($this->mission);
		if (!$this->mission->arrived){
			$elapsed += $t - $this->mission->turn;
		}

		$this->currentImpulse = floor($this->baseImpulse * min(4, $elapsed + ($p > 1)));
	}

	public function setSize(){
		$alive = 0;
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed){
				$alive++;
			}
		}
		$this->size = $this->baseSize + $this->unitSize * $alive;
	}

	public function getFireAngle($fire){
		return mt_rand(0, 359);
	}

	public function addMissionDB($data, $userid, $turn, $phase){
		if ($this->userid == $userid){
			$this->mission = new Mission($data[sizeof($data)-1]);
		}
		else if ($phase == -1){
			for ($i = sizeof($data)-1; $i >= 0; $i--){
				if ($data[$i]["turn"] == $turn){continue;}
				$this->mission = new Mission($data[$i]);
				return;
			}
		} else $this->mission = new Mission($data[sizeof($data)-1]);
	}

	public function getLockMultiplier(){
		return 1.5;
	}
}
?>