<?php

class Mixed extends Ship {
	public $ship = false;
	public $primary = false;
	public $baseImpulse;
	public $mission = array();
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

	public function setProps($turn){
		$this->setSize();
		$this->setMass();
		$this->setCurrentImpulse($turn);
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

	public function setState($turn){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->setState($turn);
		}
		$this->isDestroyed();
		$this->setProps($turn);
	}

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
					Debug::log("shot #".$i.", req: ".$fire->req);
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

	public function getArmourValue($fire, $hitSystem){
		return $hitSystem->negation;
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

	public function addSubUnit($elements){
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
		return ceil($fire->hitSystem[sizeof($fire->hitSystem)-1]->getSubHitChance($fire));
	}

	public function testCriticals($turn){
		Debug::log("= testCriticals for ".get_class($this).", #".$this->id.", turn: ".$turn);
		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->testCrit($turn);
		}
	}

	public function getMoveState($turn){
		return array("id" => $this->id, "x" => $this->actions[sizeof($this->actions)-1]->x , "y" => $this->actions[sizeof($this->actions)-1]->y, "delay" => 0, "angle" => $this->actions[sizeof($this->actions)-1]->a, "thrust" => $this->currentImpulse);
	}
}

?>