<?php

class Salvo extends Mixed {
	public $name = "Salvo";
	public $unitType = "Salvo";
	public $salvo = true;
	public $traverse = -4;
	public $missile = false;
	public $torpedo = false;

	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addSubUnits($elements){
		parent::addSubUnits($elements);
		$this->missile = $this->structures[0]->missile;
		$this->torpedo = $this->structures[0]->torpedo;
	}

	public function getFireOrder($gameid, $turn, $target){
		$fire = new FireOrder(-1, $gameid, $turn, $this->id, $target->id, 0, 0, $this->structures[0]->systems[0]->id, $this->getShots($turn), 0, "", 0, 0);
		$fire->weapon = $this->structures[0]->systems[0];
		$fire->target = $target;
		$fire->shooter = $this;
		return $fire;
	}

	public function setMass(){
		return;
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

	public function setCurSpeed($turn, $phase){
		//Debug::log("setCurSpeed ".get_class($this));

		if ($this->available == $turn && $phase == -1){$this->currentImpulse = 0; return;}
		
		$this->baseImpulse = $this->structures[0]->baseImpulse;
		if ($this->structures[0]->missile){
			$elapsed = 1 + $turn - $this->available;
			$this->currentImpulse = floor($this->baseImpulse * min(3, $elapsed + ($phase > 1)));
		}
		else {
			$this->currentImpulse = $this->baseImpulse;
		}
	}
	
	public function getCurSpeed(){
		return $this->currentImpulse;
	}

	public function setPosition(){
		return;
	}

	public function getFireAngle($fire){
		$angle = round(Math::getAngle2($this->actions[sizeof($this->actions)-1], $this->actions[0]));
		Debug::log("------- SALVO TRAJECT :".$angle);
		return $angle;
	}

	public function getTrajectoryStart(){
		return $this->actions[0];
	}

	public function addMission($data, $userid, $turn, $phase){
		$this->mission = new Mission($data[sizeof($data)-1]);
	}

	public function calculateToHit($fire){
		//return 100;
		$base = 100;
		$mask = $fire->target->getDefensiveBonus($this->id);
		$traverse = $fire->weapon->getTraverseMod($fire)*0.2;
		return ceil($base * (1-$mask) * (1-$traverse));
	}

	public function getLockMultiplier(){
		return 1;
	}

	public function getLockEffect($target){
		return 0;
	}

	public function getMaskEffect($shooter){
		return 0;
	}
}

?>