<?php

class System {
	public $id;
	public $parentId;
	public $weapon = 0;
	public $utility = 0;
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
	public $boostEffect = array();
	public $modes = array();
	public $armourMod;
	public $internal = 0;
	public $damaged = 0;
	public $tiny = 0;

	function __construct($id, $parentId, $output = 0, $destroyed = 0){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->output = $output;
		$this->destroyed = $destroyed;
		$this->integrity = $this->mass*2;

		$this->setArmourMod();
	}

	public function setState($turn){
		//Debug::log("set state system: ".$this->parentId);
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
		// ($id, $unitid, $systemid, $turn, $type, $cost){
		$this->powers[] = new Power(0, $this->parentId, $this->id, $turn, 0, 0);
		$this->disabled = 1;
	}

	public function isDestroyedThisTurn($turn){
		if (!$this->destroyed){return false;}
		for ($i = sizeof($this->damages)-1; $i >= 0; $i--){
			if ($this->damages[$i]->destroyed && $this->damages[$i]->turn == $turn){
				return true;
			} else if ($this->damages[$i]->turn < $turn){
				return false;
			}
		}
		return false;
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

	public function getBoostEffect($type){
		for ($i = 0; $i < sizeof($this->boostEffect); $i++){
			if ($this->boostEffect[$i]->type == $type){
				//Debug::log("return:".$this->boostEffect[$i]->value/100);
				return $this->boostEffect[$i]->value;
			}
		}
		return 0;
	}

	public function getCritMod($type, $turn){
		$mod = 0;
		for ($i = 0; $i < sizeof($this->crits); $i++){
			switch ($this->crits[$i]->type){
				case $type: 
					$mod = $mod - $this->crits[$i]->value; break;
				default: break;
			}
		}
		return $mod;
	}

	public function getBoostLevel($turn){
		$boost = 0;
		for ($i = sizeof($this->powers)-1; $i >= 0; $i--){
			if ($this->powers[$i]->turn == $turn){
				switch ($this->powers[$i]->type){
					case 1: 
					$boost++;
					break;
				}
			}
			else break;
		}
		return $boost;
	}

	public function getPowerUsage($turn){
		$usage = $this->powerReq;

		for ($i = sizeof($this->powers)-1; $i >= 0; $i--){
			if ($this->powers[$i]->turn == $turn){
				switch ($this->powers[$i]->type){
					case 0: return 0; break;
					case 1: $usage += $this->effiency; break;
					default: continue;
				}
			} else return $usage;
		}
		return $usage;
	}

	public function getRemainingIntegrity(){
		$rem = $this->integrity;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			$rem -= $this->damages[$i]->structDmg;
		}
		return $rem;
	}

	public function getHitChance(){
		return $this->mass*8;
	}

	public function testCrit($turn, $extra){
		$old = 0; $new = 0;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			if ($this->damages[$i]->turn > $turn){
				break;
			}
			else if ($this->damages[$i]->turn == $turn){
				$new += $this->damages[$i]->structDmg;
			} else $old += $this->damages[$i]->structDmg;
		}

		if ($new){
			$this->determineCrit($old, $new, $turn);
		}
	}

	public function getValidEffects(){
		return array(// attr, %-tresh, duration, modifier
			array("Disabled", 80, 1, 0),
			array("Damage", 30, 0, 0),
			array("Accuracy", 30, 0, 0)
		);
	}

	public function determineCrit($old, $new, $turn){
		$dmg = round(($new + ($old/2)) / $this->integrity * 100);
		$possible = $this->getValidEffects();


		Debug::log("determineCrit for ".$this->display." #".$this->id." on unit #".$this->parentId.", dmg: ".$dmg."%");

		$mod = $this->getCritModMax($dmg);
		if ($mod < 0.05){return;}

		for ($i = 0; $i < sizeof($possible); $i++){
			if (mt_rand(0, 1)){continue;}
			if ($dmg + mt_rand(-10, 10) < $possible[$i][1]){continue;}
			$duration = $possible[$i][2];
			if ($duration && $dmg > 90 && mt_rand(0, 1)){$duration += 1;}

			//$id, $shipid, $systemid, $turn, $type, $duration, $value, $new){
			$this->crits[] = new Crit(
				sizeof($this->crits)+1, $this->parentId, $this->id, $turn, $possible[$i][0], $duration, $mod, 1
			);
			Debug::log("applying crit: ".$this->crits[sizeof($this->crits)-1]->type." / ".$this->crits[sizeof($this->crits)-1]->value);

		}
	}

	public function addDamage($dmg){
		$this->damaged = 1;
		$this->damages[] = $dmg;
		if ($dmg->destroyed){
			$this->destroyed = true;
		}
	}
}

