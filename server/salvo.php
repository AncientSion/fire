<?php

class Salvo extends Minor {
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
		//$angle = round(Math::getAngle($this->getTurnStartPosition(), $this->actions[sizeof($this->actions)-1]));
		$angle = round(Math::getAngle($this->actions[sizeof($this->actions)-1], $this->getTurnStartPosition()));
		Debug::log("------- SALVO TRAJECT: ".$angle);
		return $angle;
	}

	public function calculateToHit($fire){
		$base = 70;
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

	public function setMove(){
		if ($this->moveSet){return;}
		Debug::log("**** setMove ".$this->id);

		$origin = $this->getCurPos();
		$speed = $this->getCurSpeed();
		$t;
		$tPos;
		$dist = 0;
		$angle = 0;
		$type = "move";
		Debug::log("**** Handling ".get_class($this)." #".$this->id.", speed ".$speed);

		$t = $this->mission->target;
	
		$tPos = $t->getCurPos();
		$dist = Math::getDist($origin, $tPos);
		$angle = Math::getAngle($origin, $tPos);

		if ($speed < $dist){ // on route or drag -> own speed
			Debug::log("close in");
			$tPos = Math::getPointInDirection($speed, $angle, $origin->x, $origin->y);
			$dist = $speed;
		}
		else { // ON ROUTE; REACH
			Debug::log("arrival");
			$this->mission->arrived = Manager::$turn;
		}

		$move = new Move(-1, $this->id, Manager::$turn, $type, 0, $dist, $tPos->x, $tPos->y, $angle, $angle, 0, 0, 0, 1, 1);
		Debug::log($this->id." --- adding ".$move->type." to => ".$move->x."/".$move->y.", dist: ".$dist);
		$this->actions[] = $move;
		$this->moveSet = 1;
	}
}

?>