<?php

class System {
	public $id;
	public $parentId;
	public $weapon = 0;
	public $utility = 0;
	public $destroyed = false;
	public $disabled = 0;
	public $locked = 0;
	public $dual = 0;
	public $powerReq = 1;
	public $output = 0;
	public $name = "";
	public $display = "";
	public $mount = "";
	public $damages = array();
	public $powers = array();
	public $crits = array();
	public $integrity = 0;
	public $linked = 1;
	public $effiency = 0;
	public $maxBoost = 0;
	public $maxRange = 0;
	public $mass;
	public $boostEffect = array();
	public $modes = array();
	public $armourMod = 1;
	public $armour = 0;
	public $internal = 0;
	public $damaged = 0;
	public $tiny = 0;
	public $accDecay = 0;
	public $minDmg = 0;
	public $maxDmg = 0;
	public $priority = 0;
	public $usage = -3;
	public $freeAim = 0;
	public $width = 1;
	public $notes = array();
	public $emDmg = 0;
	public $loadout = 0;

	function __construct($id, $parentId, $output = 0, $width = 1){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->output = $output;
		$this->width = $width;
	}

	public function setState($turn, $phase){
		$this->isDisabled($turn);
		$this->isDestroyed();
		$this->isPowered($turn);
	}

	public function getHitChance(){
		return $this->integrity*3;
	}

	public function adjustLoad($dbLoad){
		Debug::log("FATAL ERROR ADJUSTLOAD");
		return;
	}

	public function getActiveSystem(){
		return $this;
	}

	public function addPowerEntry($power){
		//if ($this->parentId == 15 && $this->id == 14){Debug::log("adding");}
		$this->powers[] = $power;
	}

	public function setArmourData($rem){
		$this->armourMod = 1;
		$this->armour = floor($rem * $this->armourMod);
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
		for ($i = sizeof($this->crits)-1; $i >= 0; $i--){
			if ($this->crits[$i]->type == "Disabled"){
				if ($turn <= $this->crits[$i]->turn + $this->crits[$i]->duration){
					$this->disabled = true;
					return true;
				}
			}
		}
		return false;
	}

	public function getBoostEffect($type){
		for ($i = 0; $i < sizeof($this->boostEffect); $i++){
			if ($this->boostEffect[$i]->type == $type){
				return $this->boostEffect[$i]->value;
			}
		}
		return 0;
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

	public function getCritMod($type, $turn){
		$mod = 0;
		for ($i = 0; $i < sizeof($this->crits); $i++){
			switch ($this->crits[$i]->type){
				case $type: 
					$mod =+ $this->crits[$i]->value; break;
				default: break;
			}
		}
		return $mod;
	}
	public function getPowerUsage($turn){
		$usage = $this->powerReq;

		for ($i = sizeof($this->powers)-1; $i >= 0; $i--){
			if ($this->powers[$i]->turn == $turn){
				switch ($this->powers[$i]->type){
					case 0: return 0; break;
					case 1: $usage += $this->powers[$i]->cost; break;
					default: continue;
				}
			} else return $usage;
		}
		return $usage;
	}

	public function getRemIntegrity(){
		$rem = $this->integrity;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			$rem -= $this->damages[$i]->structDmg;
		}
		return $rem;
	}

	public function setMaxDmg($fire, $dmg){
		return $dmg;
	}

	public function singleCritTest($turn, $extra){
		$old = 0; $new = 0;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			if ($this->damages[$i]->turn == $turn){
				$new += $this->damages[$i]->structDmg;
				$new += $this->damages[$i]->emDmg*2;
			} else $old += $this->damages[$i]->structDmg;
		}

		if ($new){
			$this->determineCrit($new, $old, $turn);
		}
	}

	public function getValidEffects(){
		return array(// attr, %-tresh, duration, modifier
			array("Damage", 30, 0, 0),
			array("Accuracy", 30, 0, 0)
		);
	}

	public function determineCrit($new, $old, $turn){
		$new = round($new / $this->integrity * 100);
		$old = round($old / $this->integrity * 100);
		$effects = $this->getValidEffects();

		//Debug::log("determineCrit for ".get_class($this)." #".$this->id." on unit #".$this->parentId.", new: ".$new."%, old: ".$old."%");

		$trigger = 80;

		$dmg = floor($new + $old);
		if ($new > $trigger){
			$chance = 50;
			$min = floor($chance * (1+($dmg - $trigger)/(100 - $trigger)));
			$roll = mt_rand(0, 100);
			if ($roll < $min){
				$this->crits[] = new Crit(
					sizeof($this->crits)+1, $this->parentId, $this->id, $turn, "Disabled", 1, 0, 1
				);
			}
		}

		$mod = $this->getCritModMax($new + $old);
		if ($mod < 5){return;}

		$trigger = floor($new + $old/2);

		for ($i = 0; $i < sizeof($effects); $i++){
			$roll = mt_rand(0, 100); 
			if ($roll > $trigger){/*Debug::log(" NO CRIT - roll: ".$roll. ", tresh: ".$trigger); */continue;}
			//else {Debug::log(" CRIT - roll: ".$roll. ", tresh: ".$trigger);}

			//$id, $shipid, $systemid, $turn, $type, $duration, $value, $new){
			$this->crits[] = new Crit(
				sizeof($this->crits)+1, $this->parentId, $this->id, $turn, $effects[$i][0], 0,  ($mod * (1 + (0.5*$i))), 1
			);
			$roll -= 30;
		}
	}

	public function addDamage($dmg){
		if ($dmg->new){
			$this->damaged = 1;
			$this->emDmg += $dmg->emDmg;
		}

		$this->damages[] = $dmg;
		
		if ($dmg->destroyed){
			$this->destroyed = true;
		}
	}
}

