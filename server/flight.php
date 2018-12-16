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

	public function setMove(){
		if ($this->moveSet){return;}
		Debug::log("**** setMove ".get_class($this)." #".$this->id);

		$origin = $this->getCurPos();
		$speed = $this->getCurSpeed();
		$t;
		$tPos;
		$dist = 0;
		$angle = 0;
		$type = "move";
		Debug::log("**** Handling ".get_class($this)." #".$this->id.", speed ".$speed);
		
		if ($this->mission->type == 1){ // PATROL
			//Debug::log("PATROL");
			if ($this->mission->arrived){
				$tPos = $this->getCurPos();
				$type = "patrol";
				//Debug::log("drag");
			}
			else {
				$dist = Math::getDist2($origin, $this->mission);
				$angle = Math::getAngle2($origin, $this->mission);

				if ($speed < $dist){
					//Debug::log("close in");
					$tPos = Math::getPointInDirection($speed, $angle, $origin->x, $origin->y);
				}
				else {
					//Debug::log("arrival");
					$this->mission->arrived = Manager::$turn;
					$tPos = new Point($this->mission->x, $this->mission->y);
				}
			}
		}
		else if ($this->mission->type == 2){ // STRIKE
			$t = $this->mission->target;

			Debug::log("Target: ".get_class($t)." #".$t->id);

			if ($t->ship || $t->squad || ($t->flight && $t->mission->targetid != $this->id)){
				Debug::log("ship, squad, dumb flight");
				if (!$t->moveSet){
					Debug::log("switch context");
					$t->setMove();
				}

				$tPos = $t->getCurPos();
				$dist = Math::getDist2($origin, $tPos);
				$angle = Math::getAngle2($origin, $tPos);

				if ($dist == 0){
					Debug::log("dist 0");
					$type = "patrol";
				}
				else if ($speed >= $dist){ // on route or drag -> own speed
					Debug::log("arrival");
					$this->mission->arrived = Manager::$turn;
				}
				else { // ON ROUTE; REACH
					Debug::log("close in");
					$tPos = Math::getPointInDirection($speed, $angle, $origin->x, $origin->y);
					$dist = $speed;
				}
			}
			else if ($t->flight && $t->mission->targetid == $this->id){
				Debug::log("flight on flight");
				$tPos = $t->getCurPos();
				$otherSpeed = $t->getCurSpeed();
				$dist = Math::getDist2($origin, $tPos);
				$angle = Math::getAngle2($origin, $tPos);

				if ($dist == 0){
					Debug::log("dist 0");
					$type = "patrol";
				}
				else if ($speed + $otherSpeed >= $dist){
					Debug::log("flight vs Flight arrival");
					$ownDist = $dist / ($speed + $otherSpeed) * $speed;
					$tPos = Math::getPointInDirection($ownDist, $angle, $origin->x, $origin->y);
					$this->mission->arrived = Manager::$turn;
				}
				else {
					Debug::log("close in");
					$tPos = Math::getPointInDirection($speed, $angle, $origin->x, $origin->y);
					$dist = $speed;
				}
			}

		}

		$move = new Move(-1, $this->id, Manager::$turn, $type, 0, $dist, $tPos->x, $tPos->y, $angle, $angle, 0, 0, 0, 1, 1);
		Debug::log($this->id." --- adding ".$move->type." to => ".$move->x."/".$move->y.", dist: ".$dist);
		$this->actions[] = $move;
		$this->moveSet = 1;
	}
}

?>