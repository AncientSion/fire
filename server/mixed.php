<?php

class Mixed extends Ship {
	public $ship = false;
	public $primary = false;
	public $baseImpulse;
	public $mission;
	public $cost = 0;
	public $mass = 0;
	public $profile = 0;

	function __construct($id, $userid, $available, $status, $destroyed){
		$this->id = $id;
		$this->userid = $userid;
		$this->available = $available;
		$this->status = $status;
		$this->destroyed = $destroyed;
	}

	public function setProps($turn, $phase){
		$this->setSize();
		$this->setMass();
		$this->setCurrentImpulse($turn, $phase);
		$this->setRemainingImpulse($turn);
		$this->setRemainingDelay($turn);
		$this->setBaseStats();
	}	

	public function setBaseStats(){
		$this->baseHitChance = 0;
		$this->baseTurnCost = 0;
		$this->baseTurnDelay = 0;
		$this->baseImpulseCost = 0;
	}
	
	public function setRemainingDelay($turn){
		$this->remainingDelay = 0;
	}

	public function setState($turn, $phase){
		//Debug::log("setState #".$this->id);
		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->setState($turn);
		}
		$this->isDestroyed();
		$this->setProps($turn, $phase);
	}

	public function isDestroyed(){
		if ($this->destroyed){
			return true;
		}
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (! $this->structures[$i]->isDestroyed()){
				return false;
			}
		}
		$this->destroyed = 1;
		return true;
	}

	public function getNewCrits($turn){
		$crits = array();
		if (!$this->damaged){return $crits;}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->crits); $j++){
				if ($this->structures[$i]->crits[$j]->new){
					$crits[] = $this->structures[$i]->crits[$j];
				}
			}
		}
		return $crits;
	}

	public function getOverKillSystem($fire){
		return false;
	}

	public function getStructureById($id){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->id == $id){
				return $this->structures[$i];
			}
		}
	}

	public function addDamageDB($damages){
		for ($j = 0; $j < sizeof($damages); $j++){
			if ($this->id == $damages[$j]->shipid){
				for ($k = 0; $k < sizeof($this->structures); $k++){
					if ($this->structures[$k]->id == $damages[$j]->systemid){
						$this->structures[$k]->damages[] = $damages[$j];
						break;
					}
				}
			}
		}
		return true;
	}

	public function addCritDB($crits){
		for ($j = 0; $j < sizeof($crits); $j++){
			for ($k = 0; $k < sizeof($this->structures); $k++){
				if ($this->structures[$k]->id == $crits[$j]->systemid){
					$this->structures[$k]->crits[] = $crits[$j];
					break;
				}
			}
		}
		return true;
	}

	public function applyDamage($dmg){
		$this->damaged = 1;
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->id == $dmg->systemid){
				$this->structures[$i]->damages[] = $dmg;
				if ($dmg->destroyed){
					$this->structures[$i]->destroyed = true;
				}
				return;
			}
		}
	}
	public function setupForDamage($turn){
		return;
	}

	public function setMove(&$gd){
		$t = $gd->getUnit($this->mission->targetid);

		if (!$t->moveSet){$t->setMove($gd);}

		Debug::log("Handling mixed #".$this->id);

		$tPos;
		$dist;
		$angle;
		$type = "move";

		if ($this->mission->type == 1){ // PATROL
			Debug::log("PATROL");
			if ($this->mission->arrived){
				$tPos = $t->getCurrentPosition();
				$type = "patrol";
				$angle = -1;
				Debug::log("drag");
			}
			else {
				$origin = $this->getCurrentPosition();
				$impulse = $this->getCurrentImpulse();
				$dist = Math::getDist2($origin, $this->mission);
				$angle = Math::getAngle2($origin, $this->mission);

				if ($impulse < $dist){
					Debug::log("close in");
					$tPos = Math::getPointInDirection($impulse, $angle, $origin->x, $origin->y);
				}
				else {
					Debug::log("arrival");
					$this->mission->arrived = $gd->turn;
					$tPos = new Point($this->mission->x, $this->mission->y);
				}
			}
		}
		else if ($this->mission->type == 2){ // STRIKE
			Debug::log("STRIKE");
			if ($this->mission->arrived){ // get ship last position as move goal
				$tPos = $t->getCurrentPosition();
				$dist = Math::getDist2($this->getCurrentPosition(), $tPos);
				$angle = Math::getAngle2($this->getCurrentPosition(), $tPos);
				Debug::log("drag");
			}
			else {
				$tPos = $gd->getUnit($this->mission->targetid)->getCurrentPosition();
				$origin = $this->getCurrentPosition();
				$impulse = $this->getCurrentImpulse();
				$dist = Math::getDist2($origin, $tPos);
				$angle = Math::getAngle2($origin, $tPos);

				$this->mission->x = $tPos->x;
				$this->mission->y = $tPos->y;

				if ($impulse < $dist){
					Debug::log("close in");
					$tPos = Math::getPointInDirection($impulse, $angle, $origin->x, $origin->y);
				}
				else {
					Debug::log("arrival");
					$this->mission->arrived = $gd->turn;
				}
			}
		}

		$move = new Action(-1, $this->id, $gd->turn, $type, $dist, $tPos->x, $tPos->y, $angle, 0, 0, 0, 1, 1);
		Debug::log("adding move to target #".$t->id." => ".$move->x."/".$move->y);
		$this->actions[] = $move;
		$this->moveSet = 1;
	}

	public function getImpactAngle($fire){
		if ($fire->cc){
			if ($this->flight && ($fire->shooter->flight || $fire->shooter->ship)){
				return $fire->shooter->getFireAngle($fire);
			}
			else if ($this->salvo && $fire->shooter->flight){
				return $fire->shooter->getFireAngle($fire);
			} else if ($this->salvo && $fire->shooter->ship){
				return round(Math::getAngle2($fire->shooter->getCurrentPosition(), $this->getTrajectoryStart()));
			}
		}
		
		for ($i = 0; $i < sizeof($this->angles); $i++){
			if ($this->angles[$i][0] == $fire->shooter->id){
				return $this->angles[$i][1];
			}
		}

		Debug::log("got no ANGLE set on ".$this->id." targeted by #".$fire->shooter->id);
	}

	public function determineHits($fire){
		for ($i = 0; $i < sizeof($fire->rolls); $i++){
			if ($fire->target->destroyed){
				Debug::log("aborting shot resolution vs dead target #".$this->id);
			}
			$target = $this->getHitSystem($fire);
			$fire->singleid = $target->id;
			$fire->req = $this->calculateToHit($fire);
			if ($fire->rolls[$i] < $fire->req){
				$fire->weapon->doDamage($fire, $fire->rolls[$i], $target);
			}
		}
	}


	public function hasLockOn($id){
		return false;
	}
	
	public function getRemainingIntegrity($fire){
		return $this->getStructureById($fire->hitSystem->id)->getRemainingIntegrity();
	}

	public function getArmourValue($fire, $hitSystem){
		return $hitSystem->negation;
	}

	public function getHitSection($fire){
		return 0;
	}
	
	public function getHitSystem($fire){
		$elements = array();
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed){
				$elements[] = $this->structures[$i];
			}
		}
		return $elements[mt_rand(0, sizeof($elements)-1)];
	}

	public function addSubUnits($elements){
		for ($i = 0; $i < sizeof($elements); $i++){
			for ($j = 1; $j <= $elements[$i]["amount"]; $j++){
				$this->structures[] = new $elements[$i]["name"](
					$this->getId(),
					$this->id
				);
				for ($k = 0; $k < sizeof($this->structures[sizeof($this->structures)-1]->systems); $k++){
					$this->structures[sizeof($this->structures)-1]->systems[$k]->id = $this->getId();
				}
			}
		}
		return true;
	}

	public function getSystemById($id){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->id == $id){
				return $this->structures[$i];
			}
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				if ($this->structures[$i]->systems[$j]->id == $id){
					return $this->structures[$i]->systems[$j];
				}
			}
		}
	}

	public function getHitChance($fire){
		return $this->getStructureById($fire->singleid)->getSubHitChance($fire);
	}

	public function testForCrits($turn){
		//Debug::log("= testForCrits for ".get_class($this).", #".$this->id.", turn: ".$turn);
		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->testCrit($turn, 0);
		}
	}

	public function getLockMultiplier(){
		return 1.0;
	}

	public function getDeployState($turn){
		return $this->getMoveState($turn);
	}

	public function getMoveState($turn){
		//Debug::log("getMoveState for ".$this->id);
		$angle = $this->actions[sizeof($this->actions)-1]->a;

		if ($angle > 360){
			$angle -= 360;
		}
		else if ($angle < 0){
			$angle += 360;
		}

		//Debug::log("getMoveState for ".get_class($this)." #".$this->id." current facing ".$this->facing.", now: ".$angle);

		return array("id" => $this->id, "x" => $this->actions[sizeof($this->actions)-1]->x, "y" => $this->actions[sizeof($this->actions)-1]->y, "delay" => $this->remainingDelay, "angle" => $angle, "thrust" => $this->currentImpulse);
	}
}

?>