<?php

class Mini extends Ship {
	public $ship = false;

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

	public function setState($turn){
		//Debug::log("setting state for #".$this->id);
		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->setState($turn);
		}
		$this->isDestroyed();
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
/*
	public function resolveFireOrder($fire){
		Debug::log("resolveFireOrder ID ".$fire->id.", shooter: ".get_class($fire->shooter)." #".$fire->shooterid." vs ".get_class($fire->target)." #".$fire->targetid.", w: ".get_class($fire->weapon)." #".$fire->weaponid);

		if ($this->isDestroyed()){
			$fire->resolved = -1;
		}
		else {
			$fire->dist = $this->getHitDist($fire);
			$fire->angle = $this->getHitAngle($fire);
			$fire->section = $this->getSection($fire);
			$fire->hitSystem[] = $this->getHitSystem($fire);
			$fire->req = ceil($this->getHitChance($fire) * (1-($fire->weapon->getTraverseMod($fire)*0.2)) - $fire->weapon->getAccLoss($fire->dist));
			$fire->weapon->rollToHit($fire);

			for ($i = 0; $i < $fire->shots; $i++){
				if ($fire->rolls[$i] <= $fire->req)
					$fire->weapon->doDamage($fire, $fire->rolls[$i], $fire->hitSystem[$i]);
				}
			}
		$fire->resolved = 1;
	}*/

	public function resolveFireOrder($fire){
		Debug::log("resolveFireOrder ID ".$fire->id.", shooter: ".get_class($fire->shooter)." #".$fire->shooterid." vs ".get_class($fire->target)." #".$fire->targetid.", w: ".get_class($fire->weapon)." #".$fire->weaponid);

		if ($this->isDestroyed()){
			$fire->resolved = -1;
		}
		else {
			$fire->dist = $this->getHitDist($fire);
			$fire->angle = $this->getHitAngle($fire);
			$fire->section = $this->getSection($fire);
			for ($i = 0; $i < $fire->shots; $i++){
				$fire->hitSystem[] = $this->getHitSystem($fire);
				$fire->req = ceil($this->getHitChance($fire) * (1-($fire->weapon->getTraverseMod($fire)*0.2)) - $fire->weapon->getAccLoss($fire->dist));
			}
			
			$fire->weapon->rollToHit($fire);

			for ($i = 0; $i < $fire->shots; $i++){
				if ($fire->rolls[$i] <= $fire->req)
					$fire->weapon->doDamage($fire, $fire->rolls[$i], $fire->hitSystem[$i]);
				}
			}
		$fire->resolved = 1;
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
		$shots = 0;
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed && !$this->structures[$i]->disabled){
				$shots++;
			}
		}
		//Debug::log("salvo: ".$this->id.", shots: ".$shots);
		$fires = array();
		$fires[] = array(
			"id" => -1,
			"gameid" => $gameid,
			"turn" => $turn,
			"shooterid" => $this->id,
			"targetid" => $this->targetid,
			"weaponid" => 0,
			"shots" => $shots,
			"resolved" => 0
		);

		return $fires;
	}

	public function getSection($fire){
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
		return ceil($fire->hitSystem[sizeof($fire->hitSystem)-1]->getSubHitChance() * $this->getLockMod($fire));
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
	public $fireOrder;

	function __construct($id, $userid, $targetid, $name, $status, $amount, $destroyed){
		$this->id = $id;
		$this->userid = $userid;
		$this->targetid = $targetid;
		$this->name = $name;
		$this->status = $status;
		$this->amount = $amount;
		$this->destroyed = $destroyed;
		
		$this->addStructures($amount);
		$this->setProps();
	}

	public function getShots(){
		$shots = 0;
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->isDestroyed()){
				$shots++;
			}
		}
		return $shots;
	}

	public function setProps(){
		$this->baseHitChance = ceil(sqrt($this->structures[0]->mass)*10);
		$this->baseImpulse = ceil(pow($this->structures[0]->mass, -0.5)*250);
	}

	public function addStructures($amount){
		for ($i = 0; $i < $amount; $i++){
			$this->structures[] = new $this->name($this->id, $i);
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
		parent::setState($turn);
		if ($this->actions[sizeof($this->actions)-1]->type == "impact"){
			$this->destroyed = true;
			return;
		}
	}

	public function isDogfight($fire){
		return 0;
	}

	public function getSystemById($id){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->id == $id){
				return $this->structures[$i];
			}
		}
	}

	public function getImpactTrajectory(){
		return new Point($this->actions[sizeof($this->actions)-2]->x, $this->actions[sizeof($this->actions)-2]->y);
	}

	public function getHitAngle($fire){
		return 0;
	}

	public function getBaseImpulse(){
		return $this->baseImpulse;
	}

	public function getAccelSteps(){
		$steps = 2;
		for ($i = 1; $i < sizeof($this->actions); $i++){
			if ($this->actions[$i]->resolved && $this->actions[$i]->type == "move"){
				$steps++;
			}
		}
		return $steps;
	}

	public function getImpulse(){
		return $this->getBaseImpulse() * $this->getAccelSteps();
	}

	public function getArmourValue($fire, $hitSystem){
		return $hitSystem->armour;
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
		$tPos = $this->getCurrentPosition();
		$sPos = $fire->shooter->getCurrentPosition();
		$dist = Math::getDist($tPos->x, $tPos->y, $sPos->x, $sPos->y);

		if ($this->targetid == $fire->shooter->id){
			$dist = max($dist, $fire->shooter->size/2);			
		}
		//Debug::log("intercept range: ".$dist);
		return $dist;
	}

}

?>