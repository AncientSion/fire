<?php

class Salvo extends Mixed {
	public $name = "Salvo";
	public $unitType = "Salvo";
	public $salvo = true;
	public $missile = false;
	public $torpedo = false;
	public $traverse = 0;

	function __construct($data = false){
        parent::__construct($data);
	}

	public function addSubUnits($elements){
		parent::addSubUnits($elements);
		$this->missile = $this->structures[0]->missile;
		$this->torpedo = $this->structures[0]->torpedo;
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
		//Debug::log("setCurSpeed ".get_class($this).", size ".sizeof($this->structures));
		//Debug::trace();

		if ($this->available == $turn && $phase == -1){$this->curImp = 0; return;}
		
		$this->baseImpulse = $this->structures[0]->baseImpulse;
		if ($this->structures[0]->missile){
			$elapsed = 1 + $turn - $this->available;
			$this->curImp = floor($this->baseImpulse * min(3, $elapsed + ($phase > 1)));
		}
		else {
			$this->curImp = $this->baseImpulse;
		}
	}

	public function setPosition(){
		return;
	}

	public function getTurnStartPosition(){
		if ($this->torpedo){return $this->actions[0];}
		if ($this->missile && $this->available == $this->actions[sizeof($this->actions)-1]->turn){return $this->actions[0];}
		return new Point($this->x, $this->y);
	}

	public function getFireAngle($fire){
		//$origin = $this->getTurnStartPosition();
		//$impact = $this->actions[sizeof($this->actions)-1];

		//var_export($origin);
		//var_export($impact);
		//$angle = round(Math::getAngle2($this->getTurnStartPosition(), $this->actions[sizeof($this->actions)-1]));
		$angle = round(Math::getAngle2($this->actions[sizeof($this->actions)-1], $this->getTurnStartPosition()));
		Debug::log("------- SALVO TRAJECT: ".$angle);
		return $angle;
	}

	public function addMission($data, $userid, $turn, $phase){
		$this->mission = new Mission($data[sizeof($data)-1]);
	}

	public function calculateToHit($fire){
		$base = 80;
		//$base = 120;
		$mask = $fire->target->getDefensiveBonus($this->id);
		$tracking = $fire->weapon->getTrackingMod($fire)*0.2;
		return ceil($base * (1-$mask) * (1-$tracking));
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