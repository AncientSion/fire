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
		for ($i = 0; $i < sizeof($this->crits); $i++){
			if ($this->crits[$i]->type == "Disabled"){
				$this->destroyed = true;
				return;
			}
		}
		for ($i = sizeof($this->damages)-1; $i >= 0; $i--){
			if ($this->damages[$i]->destroyed){
				$this->destroyed = true;
				return;
			}
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
		for ($i = 0; $i < sizeof($this->crits); $i++){
			if ($this->crits[$i]->type == "Disabled"){
				$this->destroyed = true;
				return;
			}
		}
		for ($i = sizeof($this->damages)-1; $i >= 0; $i--){
			if ($this->damages[$i]->destroyed){
				$this->destroyed = true;
				return;
			}
		}
	}

	public function testCrit($turn, $extra){
		$old = 0; $new = 1;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			if ($this->damages[$i]->turn == $turn){
				$new += $this->damages[$i]->overkill;
			} else $old += $this->damages[$i]->overkill;
		}

		Debug::log("testCrit for: ".get_class($this).", old: ".$old.", new: ".$new.", turn: ".$turn);
		if ($new){
			$this->determineCrit($old, $new, $turn);
		}
	}

	public function getCurrentNegation(){
		return $this->negation;
	}

	public function determineCrit($old, $new, $turn){
		$dmg = round(($new + $old) / $this->integrity * 100);

		Debug::log(" => FLIGHT determineCrit #".$this->parentId."/".$this->id." for ".$this->name.", old/new ".$old."/".$new." => ".$dmg);

		$chance = 50;
		$tresh = 70;

		if ($dmg > $tresh){
			$min = floor($chance * (1+($dmg - $tresh)/(100 - $tresh)));
			$roll = mt_rand(0, 100);

			Debug::log("chance;: ".$min.", roll: ".$roll);
			if ($roll < $min){
				Debug::log("dropout!");
				$this->crits[] = new Crit(
					sizeof($this->crits)+1, $this->parentId, $this->id, $turn, "Disabled", 0, 0, 1
				);
				return;
			}
		}
	}
}


?>