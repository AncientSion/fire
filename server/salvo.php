<?php

class Salvo extends Mixed {
	public $name = "Salvo";
	public $unitType = "Salvo";
	public $salvo = true;
	public $traverse = -4;
	public $trajectory;

	function __construct($id, $userid, $available, $status, $destroyed){		
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function getFireOrder($gameid, $turn, $target){
		$fire = new FireOrder(-1, $gameid, $turn, $this->id, $target->id, $this->structures[0]->systems[0]->id, $this->getShots($turn), 0, 0, "", 0, 0);
		$fire->weapon = $this->structures[0]->systems[0];
		$fire->target = $target;
		$fire->shooter = $this;
		return $fire;
	}

	public function setMass(){
		if (!sizeof($this->structures)){return;}
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

	public function setCurrentImpulse($turn, $phase){
		$this->baseImpulse = ceil(pow($this->mass, -0.75)*325);

		$elapsed = 1 + $turn - $this->available;

		$this->currentImpulse = $this->baseImpulse * min(3, $elapsed + ($phase > 1));
	}
	
	public function getCurrentImpulse(){
		return $this->currentImpulse;
	}

	public function getFireAngle($fire){
		$angle = Math::getAngle2($this->actions[0], $this->getTrajectoryStart());
		return round($angle);
	}

	public function getTrajectoryStart(){
		return $this->trajectory;
	}

	public function addMissionDB($data, $userid, $turn, $phase){
		$this->mission = new Mission($data[sizeof($data)-1]);
	}
}

?>