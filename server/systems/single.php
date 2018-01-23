<?php

class Single {
	public $id = 0;
	public $parentId = 0;
	public $integritx = 0;
	public $remaining = 0;
	public $negation = 0;
	public $armourDmg = 0;
	public $destroyed = 0;
	public $disabled = 0;
	public $systems = array();
	public $damages = array();
	public $crits = array();
	public $baseImpulse = 0;
	public $baseHitChance = 0;
	public $name = "";
	public $display = "";
	public $role = "";
	public $mass = 0;
	public static $value;
	public $cost = 0;
	public $start = 0;
	public $end = 360;
	public $damaged = 0;
	public $traverse = 0;
	public $index = 0;

	function __construct($id, $parentId){
		$this->id = $id;		
		$this->parentId = $parentId;

		$this->index = $this->id;
		$this->remaining = $this->integrity;

		$this->setBaseStats(0, 0);
		$this->addStructures();
		$this->setPowerOutput();
	}

	public function getId(){
		$this->index++;
		return $this->index;
	}

	public function addStructures(){
		return;
	}

	public function setPowerOutput(){
		return;
	}

	public function setBaseStats($phase, $turn){
		$this->baseHitChance = ceil(sqrt($this->mass)*5);
	}

	public function getSubHitChance($fire){
		return $this->baseHitChance;
	}

	public function setMaxDmg($fire, $dmg){
		return $dmg;
	}

	public function isDestroyed(){
		if ($this->destroyed){
			return true;
		}
		for ($i = sizeof($this->damages)-1; $i >= 0; $i--){
			if ($this->damages[$i]->destroyed){
				$this->destroyed = true;
				return true;
			} else return false;
		}
		return false;
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
	
	public function addDamage($dmg){
		$this->armourDmg += $dmg->armourDmg;
		$this->remaining -= $dmg->overkill;
		$this->damages[] = $dmg;

		if (!$this->destroyed && $this->remaining < 1){
			$this->destroyed = 1;
		}
	}

	public function getRemainingIntegrity(){
		return $this->remaining;
	}	

	public function setBonusNegation($turn){
		if (!sizeof($this->boostEffect)){return;}
		$this->bonusNegation = $this->getBoostEffect("Armour") * $this->getBoostLevel($turn);
	}

	public function getBonusNegation(){
		return $this->bonusNegation;
	}

	public function setUnitState($turn, $phase){
		for ($i = sizeof($this->damages)-1; $i >= 0; $i--){
			if ($this->damages[$i]->destroyed){
				$this->destroyed = true;
				return;
			}
		}
		for ($i = 0; $i < sizeof($this->crits); $i++){
			if ($this->crits[$i]->type == "Disabled"){
				$this->destroyed = true;
			}
		}
	}

	public function testCrit($turn, $extra){
		//Debug::log("testCrit for: ".get_class($this));
		$old = 0; $new = 0;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			if ($this->damages[$i]->turn == $turn){
				$new += $this->damages[$i]->overkill;
			} else $old += $this->damages[$i]->overkill;
		}

		//Debug::log("testCrit for: ".get_class($this).", new: ".$new.", turn: ".$turn.", size: ".sizeof($this->damages));
		if ($new){
			$this->determineCrit($old, $new, $turn);
		}
	}

	public function getValidEffects(){
		return array(// attr, %-tresh, duration, modifier
			array("Disabled", 70, 0, 0)
		);
	}

	public function getCurrentNegation(){
		return $this->negaton;
	}

	public function determineCrit($old, $new, $turn){
		$dmg = ($old + $new) / $this->integrity * 100;
		$crits = $this->getValidEffects();
		$valid = array();

		for ($i = 0; $i < sizeof($crits); $i++){
			if ($dmg > $crits[$i][1]){
				$valid[] = $crits[$i];
			}
		}

		if (sizeof($valid)){
			$mod = mt_rand(0, floor($dmg));
			if ($mod > $valid[0][1]/2) { // above tresh && mt_rand(0, dmg) > tresh/2
				Debug::log(" ====>  DROPOUT dmg: ".$dmg.", tresh: ".$valid[0][1].", mt_rand(0, ".floor($dmg).") = ".$mod.", > ".$valid[0][1]/2);
				$this->crits[] = new Crit(
					sizeof($this->crits)+1,
					$this->parentId, $this->id, $turn,
					$valid[0][0], $valid[0][2],
					0,
					1
				);
			}
		}
	}
}


?>