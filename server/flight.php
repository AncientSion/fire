<?php

class Flight extends Minor {
	public $flight = true;
	public $unitType = "Flight";
	public $name = "Flight";
	public $display = "Flight";
	public $faction = false;
	public $baseSize = 30;
	public $unitSize = 5;

	public $fSize = 15;
	public $traverse = 1;
	public $baseImpulse = 1000;

	function __construct($data = false){
        parent::__construct($data);
	}

	public function getMaxSpeed (){
		return $this->baseImpulse*3;
	}

	public function setCurSpeed($turn, $phase){
		//Debug::log($this->curImp);

		$elapsed = 1;

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->destroyed || $this->structures[$i]->disabled){continue;}
			$this->baseImpulse = min($this->baseImpulse, $this->structures[$i]->baseImpulse);
		}

		if (!isset($this->mission) || empty($this->mission) || !sizeof($this->structures)){return;}

		if ($this->mission->type == 1 && $this->mission->arrived){
			$elapsed = 0;
		}

		$elapsed += $turn - $this->mission->turn;

		$this->curImp = floor($this->baseImpulse * min(3, $elapsed + ($phase > 1)));
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

	public function addMission($data, $userid, $turn, $phase){
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

	public function getLockEffect($target){
		if ($target->ship || $target->squad){
			return 0.25;
		}
		else if ($target->flight){
			return 1;
		}
		else if ($target->salvo){
			return 2;
		}
	}

	public function getMaskEffect($shooter){
		return 0;
		if ($shooter->ship || $shooter->squad){
			return 0.5;
		}
	}
}

?>