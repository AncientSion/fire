<?php


class Mixed extends Ship {
	public $ship = false;
	public $primary = false;
	public static $value = 0;
	public $mass = 0;
	public $profile = 0;
	public $mission = array();
	public $turnAngle = 0;
	public $slipAngle = 0;
	public $turnStep = 0;
	
	public $critEffects =  array();

	function __construct($data = false){
        parent::__construct($data);
	}
	
	public function addAllSystems(){
		return;
	}

	public function setUnitState($turn, $phase){
		//Debug::log("setUnitState #".$this->id." ".get_class($this));
		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->setSubunitState($turn, $phase);
		}
		$this->setBaseStats($phase, $turn);
		$this->setMorale($turn, $phase);
		$this->isDestroyed();
		$this->setProps($turn, $phase);
	}

	public function setBonusNegation($turn){
		return;
	}

	public function setSize(){
		$this->size = 50 + sizeof($this->structures)*10;
	}

	public function setMorale($turn, $phase){
		return;
	}

	public function isDestroyed(){
		//Debug::log($this->destroyed);
		if ($this->destroyed){
			return true;
		}
		//Debug::log($this->destroyed);
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->isDestroyed()){
				return false;
			}
		}
		$this->destroyed = 1;
		return true;
	}

	public function isRolling(){
		return 0;
	}

	public function isRolled(){
		return 0;
	}

	public function doTestCrits($turn){
		//Debug::log("= doTestCrits for ".$this->name.", #".$this->id.", turn: ".$turn);
		if ($this->salvo && $this->mission->arrived){return;}
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->destroyed){continue;}
			$dmg = $this->structures[$i]->getRelDmg($turn);
			if (!$dmg->new){continue;}
			$this->structures[$i]->determineCrit($dmg, $turn, 0);
		}
		$this->isDestroyed();
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

		if ($this->squad){
			for ($k = 0; $k < sizeof($this->primary->systems); $k++){
				for ($l = 0; $l < sizeof($this->primary->systems[$k]->crits); $l++){
					if ($this->primary->systems[$k]->crits[$l]->new){
						$crits[] = $this->primary->systems[$k]->crits[$l];
					}// else break;
				}
			}
		}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			$crits = array_merge($crits, $this->structures[$i]->getNewCrits($turn));
		}
		return $crits;
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

	public function hideAllPowers($turn){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				$this->structures[$i]->systems[$j]->doHidePowerOrders($turn);
			}
		}
	}

	public function setMove(&$gd){
		Debug::log("**** setMove ".$this->id);
		if ($this->moveSet){return;}

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
					$this->mission->arrived = $gd->turn;
					$tPos = new Point($this->mission->x, $this->mission->y);
				}
			}
		}
		else if ($this->mission->type == 2){ // STRIKE
			$t = $this->mission->target;
			$tPos = $t->getCurPos();

			Debug::log("Target: ".get_class($t)." #".$t->id);

			if ($t->flight){
				Debug::log("target is a flight");
				if ($t->mission->type == 1 && $this->mission->arrived && $t->mission->arrived && $t->moveSet && !$t->actions[sizeof($actions)-1]->dist){
					Debug::log("target is patrol, i have arrived - no move");
					$tPos = $origin;
					$dist = 0;
					$type = "patrol";
				}
				else if ($this->mission->arrived && $t->mission->arrived && $t->mission->type == 2){
					Debug::log("i have arrived, target has arrived, target is striking another unit, im following!");
					$dist = Math::getDist2($origin, $tPos);
					$type = "move";
				}
				else {
					if ($this->mission->arrived && $t->mission->arrived && $t->mission->targetid == $this->id && $this->mission->targetid == $t->id){
						Debug::log("intercept each other, both arrived, no move");
						$dist = 0;
						$type = "patrol";
						$this->mission->arrived = $gd->turn;
					}
					else if (!$t->moveSet){
						Debug::log("target flight as not moved yet");
						$shift = 0;
						if ($this->mission->targetid == $t->id && $t->mission->targetid == $this->id){
							Debug::log("two flights intercepts each other, havent arrived");

							if ($speed > $t->getCurSpeed() || $speed == $t->getCurSpeed() && $this->id > $t->id){
								$shift = 1;
								Debug::log("im faster (or equal and > ID), target moves before me");
							}
						}
						if ($shift){
							$this->moveSet = 1;
							$t->setMove($gd);
							$this->moveSet = 0;
						}
					}

					

					$tPos = $t->getCurPos();
					$dist = Math::getDist2($origin, $tPos);



					if (!$dist){
						Debug::log("Dist to T is 0 - static !");
						$type = "patrol";
						$this->mission->arrived = $gd->turn;
						$t->mission->arrived = $gd->turn;
					}
					else  if ($speed < $dist){
						Debug::log("close in");
						$dist = $speed;
						$tPos = Math::getPointInDirection($speed, Math::getAngle2($origin, $tPos), $origin->x, $origin->y);
					}
					else {
						Debug::log("move arrival");
						$this->mission->arrived = $gd->turn;
						if ($t->mission->targetid == $this->id){
							//Debug::log("so enemy arrived, too !");
							$t->mission->arrived = $gd->turn;
						}
					}
				}
			}
			else { // SHIP SQUAD
				$tPos = $t->getCurPos();
				$dist = Math::getDist2($origin, $tPos);
				$angle = Math::getAngle2($origin, $tPos);

				if ($speed < $dist){ // on route or drag -> own speed
					Debug::log("close in");
					$dist = $speed;
					$tPos = Math::getPointInDirection($speed, $angle, $origin->x, $origin->y);
				}
				else { // ON ROUTE; REACH
					Debug::log("arrival");
					$this->mission->arrived = $gd->turn;
				}
			}
		}

		$move = new Action(-1, $this->id, $gd->turn, $type, 0, $dist, $tPos->x, $tPos->y, $angle, 0, 0, 0, 1, 1);
		Debug::log($this->id." --- adding ".$move->type." to => ".$move->x."/".$move->y.", dist: ".$dist);
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
	
	public function getRemIntegrity($fire){
		return $this->getStruct($fire->hitSystem->id)->getRemIntegrity();
	}

	public function getArmour($fire, $system){
		return array("stock" => $system->negation, "bonus" => 0);
	}

	public function getHitSection($fire){
		//Debug::log("Mixed getHitSection");
		return 0;
	}

	public function getFlashTargets($fire){
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
		//Debug::log("add subs to #".$this->id.", element len ".sizeof($elements));
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
					return $this->structures[$i]->systems[$j]->getActiveSystem();
				}
			}
		}
	}

	public function determineHitso($fire){
		//Debug::log("determineHits ".get_class($this)))

		for ($i = 0; $i < $fire->shots; $i++){
			$roll = mt_rand(1, 100);
			$fire->rolls[] = $roll;
		}

		for ($i = 0; $i < sizeof($fire->rolls); $i++){
			if ($this->destroyed){$fire->cancelShotResolution($i); return;}
			else {
				$target = $this->getHitSystem($fire);
				$fire->subtargetid = $target->id;
				$fire->req = $fire->shooter->calculateToHit($fire);
				if ($fire->rolls[$i] <= $fire->req){
					if ($target->jamming){
						Debug::log("hit but active jammer ".$target->jamming);
						$roll = mt_rand(1, 100);
						if ($roll <= $fire->target->jamming){
							Debug::log("failed jamming roll ".$roll);
							$fire->rolls[$i] *= -1;
						}
						else {
							Debug::log("passed jamming roll");
							$fire->hits++;
							DmgCalc::doDmg($fire, $i, $target);
						}
					}
					else {
						$fire->hits++;
						DmgCalc::doDmg($fire, $i, $target);
					}
				}
				else Debug::log("miss");
			}
		}
	}

	public function determineObstacleHits($fire){
		Debug::log("determineObstacleHits ".get_class($this).", shots ".$fire->shots.", req ".$fire->req);

		$fire->section = 0;
		$shots = 0;

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->destroyed){Debug::log("skip id ".$this->structures[$i]->id); continue;}

			$fire->rolls = [];
			$this->doRollShots($fire);
			$shots += sizeof($fire->rolls);
			//Debug::log($shots);

			for ($j = 0; $j < sizeof($fire->rolls); $j++){
				if ($this->structures[$i]->destroyed){$fire->cancelShotResolution($j); break;}
				else if ($fire->rolls[$j] <= $fire->req){
					$fire->hits++;
					DmgCalc::doDmg($fire, $i, $this->structures[$i]);
				}
			}
		}

		$fire->rolls = [];
		$fire->notes .= $fire->shots.";";
		$fire->shots = $shots;
		//Debug::log(" = ".$fire->shots);
	}


	public function determineHits($fire){
		//Debug::log("determineHits ".get_class($this));
		for ($i = 0; $i < sizeof($fire->rolls); $i++){
			if ($this->destroyed){$fire->cancelShotResolution($i); return;}
			else {
				$target = $this->getHitSystem($fire);
				$fire->subtargetid = $target->id;
				$fire->req = $fire->shooter->calculateToHit($fire);
				if ($fire->rolls[$i] <= $fire->req){
					if ($this->didPassDefenses($fire, $i, $target)){
						$fire->hits++;
						DmgCalc::doDmg($fire, $i, $target);
					}
				}
			}
		}
	}


	public function getHitChance($fire){
		return $this->getStruct($fire->subtargetid)->getSubHitChance($fire);
	}

	public function setImpulseProfileMod(){
		if (!$this->squad){return;}
		parent::setImpulseProfileMod();
	}

	public function setJamming($turn){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->setSingleJamming($turn);
		}
	}

	public function getEndState($turn){
		//Debug::log("getEndState for ".$this->id);
		$facing = $this->actions[sizeof($this->actions)-1]->a;

		if ($facing > 360){
			$facing -= 360;
		}
		else if ($facing < 0){
			$facing += 360;
		}

		//Debug::log("getEndState for ".get_class($this)." #".$this->id." current facing ".$this->facing.", now: ".$facing.", rolling: ".$this->rolling.", rolled: ".$this->rolled);
	
		return array(
			"id" => $this->id,
			"destroyed" => $this->destroyed,
			"withdraw" => $this->withdraw,
			"manual" => $this->manual,
			"x" => $this->actions[sizeof($this->actions)-1]->x,
			"y" => $this->actions[sizeof($this->actions)-1]->y,
			"delay" => 0,
			"facing" => $this->getCurFacing(),
			"thrust" => $this->getCurSpeed(),
			"rolling" => $this->isRolling(),
			"rolled" => $this->isRolled(),
			"flipped" => $this->flipped,
			"status" => $this->status,
			"notes" => "",
		);
	}
}

class Minor extends Mixed {
	function __construct($data = false){
        parent::__construct($data);
	}

	public function doTestMorale($turn){
		return false;
	}
}
?>