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

	public function getRemainingIntegrity(){
		$rem = $this->integrity;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			$rem -= $this->damages[$i]->structDmg;
		}
		return $rem;
	}

	public function getHitChance(){
		return $this->mass*7;
	}

	public function testCrit($turn){
		if ($this->destroyed || empty($this->damages)){
			return;
		}

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

	public function determineCrit($old, $new, $turn){
		$dmg = ($new + ($old/2)) / $this->integrity * 100;
		$possible = $this->getValidEffects();
		$valid = array();

		for ($i = 0; $i < sizeof($possible); $i++){
			if ($dmg > $possible[$i][1]){
				$valid[] = $possible[$i];
			}
		}
		Debug::log("determineCrit for ".$this->display." #".$this->id.", dmg: ".$dmg.", possible: ".sizeof($possible).", inRange: ".sizeof($valid));

		for ($i = 0; $i < sizeof($valid); $i++){
			if (mt_rand(0, 1)){
				$mod = 0;
				$duration = $valid[$i][2];

				if ($valid[$i][0] == "Disabled"){ // is disabled && internal, 50% duration +1;
					if (!$this->internal){
						$duration += mt_rand(0, 1);
					}
				}
				else { // output, dmg, accuracy
					$mod = (round($dmg/20)/10);

					if ($this->internal){
						$duration += mt_rand(0, 1);
					}

					for ($i = sizeof($this->critsS); $i >= 0; $i--){
						if ($this->crits[$i]->turn < $turn){break;}
						if ($this->crits[$i]->turn == $turn && $this->crits[$i]->type == "Disabled"){
							$duration += $this->crits[$i]->duration;
						}
					}
				}

				$this->crits[] = new Crit(
					sizeof($this->crits)+1,
					$this->parentId, $this->id, $turn,
					$valid[$i][0], $duration,
					$mod,
					1
				);
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

