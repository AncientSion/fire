<?php

class Mini extends Ship {
	public $ship = false;
	public $baseImpulse;
	public $mission = array();

	public function getNewCrits($turn){
		$crits = array();
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->crits); $j++){
				if ($this->structures[$i]->crits[$j]->turn == $turn){
					$crits[] = $this->structures[$i]->crits[$j];
				}
			}
		}
		return $crits;
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

	public function addMissionDB($data){
		$this->mission = new Mission($data);
	}

	public function resolveFireOrder($fire){
		Debug::log("resolveFireOrder ID ".$fire->id.", shooter: ".get_class($fire->shooter)." #".$fire->shooterid." vs ".get_class($fire->target)." #".$fire->targetid.", w: ".get_class($fire->weapon)." #".$fire->weaponid);

		if ($this->isDestroyed()){
			$fire->resolved = -1;
		}
		else {
			$fire->cc = $this->isCloseCombat($fire->shooter->id);
			$fire->dist = $this->getHitDist($fire);
			$fire->angle = $this->getHitAngle($fire);
			$fire->section = $this->getHitSection($fire);

			$rollIndex = 0;
			for ($i = 0; $i < $fire->shots; $i++){
				$fire->weapon->rollToHit($fire);
				for ($j = $rollIndex; $j < sizeof($fire->rolls); $j++){
					$fire->hitSystem[] = $this->getHitSystem($fire);
					$fire->req = $this->calculateToHit($fire);
					if ($fire->rolls[$j] <= $fire->req){
						$fire->weapon->doDamage($fire, $fire->rolls[$j], $fire->hitSystem[$j]);
					}
				}
				$rollIndex = sizeof($fire->rolls);
			}
			$fire->resolved = 1;
		}
	}

	public function hasLockOn($id){
		return false;
	}
	
	public function getRemainingIntegrity($fire){
		return $this->getStructureById($fire->hitSystem->id)->getRemainingIntegrity();
	}

	public function isDestroyed(){
		if ($this->destroyed){
			//Debug::log(" -> destroyed");
			return true;
		}
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (! $this->structures[$i]->isDestroyed()){
				//Debug::log(" -> not destroyed");
				return false;
			}
		}
		//Debug::log(" -> destroyed");
		$this->destroyed = true;
		if ($this->flight){$this->status = "destroyed";}
		return true;
	}

	public function createFireOrders($gameid, $turn, $targets, $odds){
		$fires = array();
		$fires[] = array(
			"id" => -1,
			"gameid" => $gameid,
			"turn" => $turn,
			"shooterid" => $this->id,
			"targetid" => $this->targetid,
			"weaponid" => 0,
			"resolved" => 0
		);
		return $fires;
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

	public function getHitChance($fire){
		return ceil($fire->hitSystem[sizeof($fire->hitSystem)-1]->getSubHitChance($fire));
	}

	public function testCriticals($turn){
		Debug::log("= testCriticals for ".get_class($this).", #".$this->id.", turn: ".$turn);
		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->testCrit($turn);
		}
	}

	public function getDeployState($turn){
		if ($this->available == $turn){
			return array("id" => $this->id, "x" => $this->actions[sizeof($this->actions)-1]->x , "y" => $this->actions[sizeof($this->actions)-1]->y, "delay" => 0, "angle" => $this->actions[sizeof($this->actions)-1]->a, "thrust" => $this->currentImpulse);
		}
	}

	public function getMoveState($turn){
		return array("id" => $this->id, "x" => $this->actions[sizeof($this->actions)-1]->x , "y" => $this->actions[sizeof($this->actions)-1]->y, "delay" => 0, "angle" => $this->actions[sizeof($this->actions)-1]->a, "thrust" => $this->currentImpulse);
	}
}

class Salvo extends Mini {
	public $targetid;
	public $name;
	public $amount;
	public $salvo = true;
	public $target;
	public $index = 0;
	public $actions = array();
	public $structures = array();
	public $baseImpulse;
	public $traverse = -4;

	function __construct($id, $userid, $amount, $targetid, $name, $status, $available, $destroyed){
		$this->id = $id;
		$this->userid = $userid;
		$this->amount = $amount;
		$this->targetid = $targetid;
		$this->name = $name;
		$this->status = $status;
		$this->available = $available;
		$this->destroyed = $destroyed;
		
		$this->addStructures($amount);
	}


	public function getImpulseProfileMod(){
		return 0;
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

	public function setProps($turn){
		$this->baseHitChance = $this->structures[0]->getSubHitChance();
		$this->baseImpulse = ceil(pow($this->structures[0]->mass, -0.75)*250);
		$this->setCurrentImpulse($turn);
	}

	public function setCurrentImpulse($turn){
		$this->currentImpulse = $this->baseImpulse * ($turn - $this->available +2);
	}
	
	public function getCurrentImpulse(){
		return $this->currentImpulse;
	}

	public function addStructures($amount){
		for ($i = 0; $i < $amount; $i++){
			$this->structures[] = new $this->name($i, $this->id);
		}
	}

	public function addFireDB($fires){
		for ($i = 0; $i < sizeof($fires); $i++){
			if ($fires[$i]->shooterid == $this->id){
				$this->fireOrder = $fires[$i];
				return;
			}
		}
		return true;
	}

	public function setState($turn){
		$this->setProps($turn);
		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->setState($turn);
		}
		if (sizeof($this->actions) && $this->actions[sizeof($this->actions)-1]->type == "impact"){
			$this->destroyed = true;
			return;
		}
		$this->isDestroyed();
	}
	
	public function getSystemById($id){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->id == $id){
				return $this->structures[$i];
			}
		}
	}

	public function getImpactTrajectory(){
		return new Point($this->x, $this->y);
	}

	public function getHitAngle($fire){
		return 0;
	}

	public function getArmourValue($fire, $hitSystem){
		return $hitSystem->negation;
	}

	public function resolveBallisticFireOrder($fire){
		parent::resolveBallisticFireOrder($fire);
		if ($this->isDestroyed()){
			$this->actions[sizeof($this->actions)-1]->x = $fire->shooter->actions[sizeof($fire->shooter->actions)-1]->x + mt_rand(-6, 6);
			$this->actions[sizeof($this->actions)-1]->y = $fire->shooter->actions[sizeof($fire->shooter->actions)-1]->y + mt_rand(-6, 6);
			$this->status = "intercepted";
		}
		return;
	}

	public function getHitDist($fire){
		$sPos = $fire->shooter->getCurrentPosition();
		$tPos; $dist;

		if ($this->targetid == $fire->shooter->id){ // direct intercpet
			$tPos = $this->getImpactTrajectory();
			$dist = Math::getDist($tPos->x, $tPos->y, $sPos->x, $sPos->y);

			if ($dist - $this->getCurrentImpulse() < $fire->shooter->size/2){
				$dist = $fire->shooter->size/2;
			} else $dist = $dist - $this->getCurrentImpulse();
		}
		else {
			$tPos = $this->getCurrentPosition();
			$dist = Math::getDist($tPos->x, $tPos->y, $sPos->x, $sPos->y);
		}
		return $dist;
	}
}

?>