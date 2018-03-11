<?php

class Mixed extends Ship {
	public $ship = false;
	public $primary = false;
	public static $value = 0;
	public $mass = 0;
	public $profile = 0;
	public $mission = array();

	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes){
		$this->id = $id;
		$this->userid = $userid;
		$this->available = $available;
		$this->call = $call;
		$this->status = $status;
		$this->destroyed = $destroyed;
		$this->x = $x;
		$this->y = $y;
		$this->facing = $facing;
		$this->remainingDelay = $delay;
		$this->currentImpulse = $thrust;
		$this->notes = $notes;
	}
	
	public function addAllSystems(){
	}

	public function setProps($turn, $phase){
		$this->setBaseStats($phase, $turn);
		$this->setSize();
		$this->setMass();
		$this->setCurSpeed($turn, $phase);
		$this->setRemImpulse($turn);
		$this->setRemDelay($turn);
	}	

	public function setBaseStats($phase, $turn){
		$this->baseHitChance = 0;
		$this->baseTurnDelay = 0;
		$this->baseImpulseCost = 0;
	}
	
	public function setRemDelay($turn){
		$this->remainingDelay = 0;
	}

	public function setUnitState($turn, $phase){
		//Debug::log("setUnitState #".$this->id." ".get_class($this));
		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->setSubunitState($turn, $phase);
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

	public function getNewDamages($turn){
		$dmgs = array();

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->damages); $j++){
				if ($this->structures[$i]->damages[$j]->new){
					$dmgs[] = $this->structures[$i]->damages[$j];
				}
			}
		}
		return $dmgs;
	}

	public function getNewCrits($turn){
		$crits = array();

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->crits); $j++){
				if ($this->structures[$i]->crits[$j]->new){
					$crits[] = $this->structures[$i]->crits[$j];
				}
			}
		}
		return $crits;
	}

	public function getOverkillSystem($fire){
		return false;
	}

	public function addCritDB($crits){
		for ($i = 0; $i < sizeof($crits); $i++){
			for ($j = 0; $j < sizeof($this->structures); $j++){
				if ($this->structures[$j]->id == $crits[$i]->systemid){
					$this->structures[$j]->crits[] = $crits[$i];
					break;
				}
			}
		}
		return true;
	}

	public function hidePowers($turn){
		return;
	}

	public function applyDamage($dmg){
		if ($dmg->new){
			$dmg->overkill += $dmg->structDmg;
			$dmg->structDmg = 0;
		}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($dmg->systemid != $this->structures[$i]->id){continue;}
			
			$this->structures[$i]->addDamage($dmg);

			if ($dmg->destroyed){
				for ($j = 0; $j < sizeof($this->structures); $j++){
					if (!$this->structures[$j]->destroyed){
						return;
					}
				}
				$this->destroyed = 1;
			}
			return;
		}

		Debug::log("WARNING couldnt apply damage #".$dmg->id.", looking for unit #".$dmg->shipid."/".$dmg->systemid);
	}

	public function applyDBDamage($dmg){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($dmg->systemid == $this->structures[$i]->id){
				$this->structures[$i]->addDamage($dmg);
				return;
			}
		}

		Debug::log("WARNING couldnt apply DB damage #".$dmg->id.", looking for unit #".$dmg->shipid."/".$dmg->systemid);
	}

	public function setMove(&$gd){
		Debug::log("Handling mixed #".$this->id);

		$tPos;
		$dist = 0;
		$angle = -1;
		$type = "move";

		if ($this->mission->type == 1){ // PATROL
			//Debug::log("PATROL");
			if ($this->mission->arrived){
				$tPos = $this->getCurPos();
				$type = "patrol";
				//Debug::log("drag");
			}
			else {
				$origin = $this->getCurPos();
				$impulse = $this->getCurSpeed();
				$dist = Math::getDist2($origin, $this->mission);
				$angle = Math::getAngle2($origin, $this->mission);

				if ($impulse < $dist){
					//Debug::log("close in");
					$tPos = Math::getPointInDirection($impulse, $angle, $origin->x, $origin->y);
				}
				else {
					//Debug::log("arrival");
					$this->mission->arrived = $gd->turn;
					$tPos = new Point($this->mission->x, $this->mission->y);
				}
			}
		}
		else if ($this->mission->type == 2){ // STRIKE
			Debug::log("STRIKE");
			
			$t = $gd->getUnit($this->mission->targetid);

			if (!($t->ship || $t->squad) && $t->mission->targetid == $this->id){ // direct targetting
				if ($this->mission->arrived){ // at target, circle patrol
					$tPos = $this->getCurPos();
					$type = "patrol";
				}
				else { // on way to intercepting flight
					if (!$t->moveSet && mt_rand(0, 1)){
						//Debug::log("priority achieved: ".$this->id);
						$this->moveSet = 1;
						$t->setMove($gd);
					}

					$tPos = $t->getCurPos();
					$origin = $this->getCurPos();
					$impulse = $this->getCurSpeed();
					$dist = Math::getDist2($origin, $tPos);
					$angle = Math::getAngle2($origin, $tPos);

					$this->mission->x = $tPos->x;
					$this->mission->y = $tPos->y;

					if ($dist == 0){
						$type = "patrol";
						//Debug::log("target did reach first us, patrol");
						$this->mission->arrived = $gd->turn;
					}
					else  if ($impulse < $dist){
						//Debug::log("close in");
						$tPos = Math::getPointInDirection($impulse, $angle, $origin->x, $origin->y);
					}
					else {
						//Debug::log("move arrival");
						$this->mission->arrived = $gd->turn;
						if ($t->mission->targetid == $this->id){
							//Debug::log("so enemy arrived, too !");
							$t->mission->arrived = $gd->turn;
						}
					}
				}
			}
			else { // "normal" stack resolution
				if (!$t->moveSet){$t->setMove($gd);}

				if ($this->mission->arrived){ // get ship last position as move goal
					$tPos = $t->getCurPos();
					$dist = Math::getDist2($this->getCurPos(), $tPos);
					$angle = Math::getAngle2($this->getCurPos(), $tPos);
					//Debug::log("drag");
				}
				else {
					$tPos = $t->getCurPos();
					$origin = $this->getCurPos();
					$impulse = $this->getCurSpeed();
					$dist = Math::getDist2($origin, $tPos);
					$angle = Math::getAngle2($origin, $tPos);

					$this->mission->x = $tPos->x;
					$this->mission->y = $tPos->y;

					if ($impulse < $dist){
						//Debug::log("close in");
						$tPos = Math::getPointInDirection($impulse, $angle, $origin->x, $origin->y);
					}
					else {
						//Debug::log("arrival");
						$this->mission->arrived = $gd->turn;
					}
				}
			}
		}

		$move = new Action(-1, $this->id, $gd->turn, $type, $dist, $tPos->x, $tPos->y, $angle, 0, 0, 0, 1, 1);
		//Debug::log("adding move to => ".$move->x."/".$move->y);
		$this->actions[] = $move;
		$this->moveSet = 1;
	}

	public function getIncomingFireAngle($fire){
		if ($fire->cc && $this->flight){
			return 0;
		}
		
		for ($i = 0; $i < sizeof($this->angles); $i++){
			if ($this->angles[$i][0] == $fire->shooter->id){
				return $this->angles[$i][1];
			}
		}

		Debug::log("got no ANGLE set on ".$this->id." targeted by #".$fire->shooter->id);
	}

	public function resolveAreaFireOrder($fire){
		Debug::log("resolveAreaFireOrder on self: ".get_class($this));
		$fire->section = 0;		

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->destroyed){continue;}
			DmgCalc::doDmg($fire, 0, $this->structures[$i]);
		}
	}

	public function determineHits($fire){
		for ($i = 0; $i < sizeof($fire->rolls); $i++){
			if ($this->destroyed){
				Debug::log("aborting shot resolution vs dead target #".$this->id);
			}
			else {
				$target = $this->getHitSystem($fire);
				$fire->singleid = $target->id;
				$fire->req = $fire->shooter->calculateToHit($fire);
				if ($fire->rolls[$i] <= $fire->req){
					$fire->hits++;
					DmgCalc::doDmg($fire, $fire->rolls[$i], $target);
				}
			}
		}
	}


	public function hasLockOn($id){
		return false;
	}
	
	public function getRemIntegrity($fire){
		return $this->getStruct($fire->hitSystem->id)->getRemIntegrity();
	}

	public function getArmour($fire, $system){
		return array("stock" => $system->negation, "bonus" => 0);
	}

	public function getHitSection($fire){
		//Debug::log("Mixed getHitSection");
		return 0;
		return $this->getHitSystem($fire)->id;
	}

	public function getFlashDmgTargets($fire){
		$valid = array();

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->destroyed){continue;}
			$valid[] = $this->structures[$i];
		}
		return $valid;

		if (!sizeof($valid)){return $this->primary;}
		return $valid[mt_rand(0, sizeof($valid)-1)];
	}
	
	public function getFlashOverkillSystem($fire){
		return false;
	}
	
	public function getHitSystem($fire){
		$elements = array();
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->destroyed){continue;}
			$elements[] = $this->structures[$i];
		}
		return $elements[mt_rand(0, sizeof($elements)-1)];
	}

	public function addSubUnits($elements){
		for ($i = 0; $i < sizeof($elements); $i++){
			for ($j = 1; $j <= $elements[$i]["amount"]; $j++){
				$this->structures[] = new $elements[$i]["name"]($this->getId(), $this->id);
				$this->structures[sizeof($this->structures)-1]->traverse = $this->traverse;
				$this->index = $this->structures[sizeof($this->structures)-1]->index;
			}
		}
		return true;
	}

	public function getSystem($id){
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
		return $this->getStruct($fire->singleid)->getSubHitChance($fire);
	}

	public function setImpulseProfileMod(){
		$this->impulseHitMod = 0;
	}

	public function getEndState($turn){
		//Debug::log("getMoveState for ".$this->id);
		$facing = $this->actions[sizeof($this->actions)-1]->a;

		if ($facing > 360){
			$facing -= 360;
		}
		else if ($facing < 0){
			$facing += 360;
		}

		//Debug::log("getMoveState for ".get_class($this)." #".$this->id." current facing ".$this->facing.", now: ".$angle);

		return array("id" => $this->id, "x" => $this->actions[sizeof($this->actions)-1]->x, "y" => $this->actions[sizeof($this->actions)-1]->y, "delay" => $this->remainingDelay, "facing" => $facing, "thrust" => $this->currentImpulse, "rolling" => $this->rolling, "rolled" => $this->rolled);
	}
}

?>