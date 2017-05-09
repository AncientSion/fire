<?php

class System {
	public $id;
	public $parentId;
	public $weapon = 0;
	public $destroyed = 0;
	public $disabled = 0;
	public $locked = 0;
	public $dual = 0;
	public $powerReq = 1;
	public $output;
	public $name;
	public $display;
	public $damages = array();
	public $powers = array();
	public $crits = array();
	public $integrity = 0;
	public $linked = 1;
	public $effiency = 0;
	public $maxBoost = 0;
	public $mass;
	public $boostEffect = 0;
	public $modes = array();
	public $armourMod;

	function __construct($id, $parentId, $output = 0, $destroyed = 0){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->output = $output;
		$this->destroyed = $destroyed;
		$this->integrity = $this->mass*2;

		$this->setArmourMod();
	}

	public function setState($turn){
		$this->isDisabled($turn);
		$this->isDestroyed();
		$this->isPowered($turn);
	}

	public function getActiveSystem(){
		return $this;
	}

	public function addPowerEntry($power){
		$this->powers[] = $power;
	}

	public function setArmourMod(){
		$this->armourMod = 1;
	}

	public function getArmourMod(){
		return $this->armourMod;
	}

	public function isPowered($turn){
		if ($this->disabled || $this->destroyed){return false;}
		for ($i = sizeof($this->powers)-1; $i >= 0; $i--){
			if ($this->powers[$i]->turn == $turn){
				if ($this->powers[$i]->type == 0){
					$this->disabled = 1;
					return false;
				}
			} else break;
		} 
		return true;
	}

	public function doUnpower($turn){
		$this->powers[] = new Power(0, $this->parentId, $this->id, $turn, 0, 0, 1);
		$this->disabled = 1;
	}

	public function isDestroyed(){
		if ($this->destroyed){return true;}
		for ($i = sizeof($this->damages)-1; $i >= 0; $i--){
			if ($this->damages[$i]->destroyed){
				$this->destroyed = true;
				return true;
			}
		}
		return false;
	}

	public function isDisabled($turn){
		if (!sizeof($this->crits)){
			return false;
		}
		else if ($this->crits[sizeof($this->crits)-1]->type == "disabled"){
			if ($turn <= $this->crits[sizeof($this->crits)-1]->turn + $this->crits[sizeof($this->crits)-1]->duration){
				$this->disabled = true;
				return true;
			}
		}
		return false;
	}

	public function getCurrentIntegrity(){
		return $this->getRemainingIntegrity();
	}

	function getRemainingIntegrity(){
		$rem = $this->integrity;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			$rem -= $this->damages[$i]->structDmg;
		}
		return $rem;
	}

	public function getHitChance(){
		return $this->mass*10;
	}

	public function testCriticalSystemLevel($turn){
		if ($this->destroyed){
			return;
		}
		else if (empty($this->damages)){
			return;
		}
		else {
			$old = 0;
			$new = 0;
			for ($i = 0; $i < sizeof($this->damages); $i++){
				if ($this->damages[$i]->turn == $turn){
					$new += $this->damages[$i]->structDmg;
				}
				else {
					$old += $this->damages[$i]->structDmg;
				}
			}

			if ($new){
				$dmg = ceil(($new + ($old/2)) / $this->integrity * 100);
				$this->determineCrititcal($dmg, $turn);
			} else return;
		}
	}

	public function getCritEffects(){
		return array("control1", "control2", "control3", "control4", "control5", "control6");
	}

	public function getCritTreshs(){
		return array(20, 30, 50, 65, 80, 90);
	}

	public function getCritDuration(){
		return array(2, 2, 2, 2, 2, 2);
	}

	public function determineCrititcal($dmg, $turn){
		//Debug::log("Crit test for: #".$this->id." - ".get_class($this).", dmg: ".$dmg."%");
		$crits = $this->getCritEffects();
		$tresh = $this->getCritTreshs();
		$duration = $this->getCritDuration();
		$mod = mt_rand(-15, 10);
		$val = $dmg + $mod;
		if ($val <= $tresh[0]){
			return false;
		}

		for ($i = sizeof($tresh)-1; $i >= 0; $i--){
			if ($val > $tresh[$i]){
				//$id, $shipid, $systemid, $turn, $type, $duration, $new){
				$this->crits[] = new Crit(
					sizeof($this->crits)+1,
					$this->parentId,
					$this->id,
					$turn,
					$crits[$i],
					$duration[$i],
					1
				);
				return true;
			}
		}
	}

	public function applyDamage($dmg){
		$this->damages[] = $dmg;
		if ($dmg->destroyed){
			$this->destroyed = true;
		}
	}
}

