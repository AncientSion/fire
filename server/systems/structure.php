<?php

class Structure {
	public $id;
	public $parentId;
	public $start;
	public $end;
	public $integrity;
	public $negation;
	public $type;
	public $destroyed = false;
	public $remainingNegation = 0;
	public $armourDmg = 0;
	public $parentIntegrity = 0;
	public $parentPow;
	public $systems = array();
	public $damages = array();
	public $powers = array();
	public $boostEffect = array();
	public $effiency = 0;
	public $bonusNegation = 0;

	function __construct($id, $parentId, $start, $end, $integrity, $negation){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->start = $start;
		$this->end = $end;
		$this->integrity = $integrity;
		$this->negation = $negation;

		$this->setName();
	}

	public function isDestroyed(){
		if ($this->destroyed){
			return true;
		}
		for ($i = sizeof($this->damages)-1; $i >= 0; $i--){
			if ($this->damages[$i]->destroyed){
				$this->destroyed = true;
				return true;
			}
		}
		return false;
	}

	public function addPowerEntry($power){
		$this->powers[] = $power;
	}

	public function setNegation($main, $armourDmg){
		$p = 1.25;
		$this->parentIntegrity = round($main);

		$this->parentPow = round(pow($this->parentIntegrity, $p));
		$this->armourDmg += $armourDmg;
		$this->remainingNegation = round((pow($this->parentIntegrity - $this->armourDmg, $p) / $this->parentPow) * $this->negation);
	}

	public function getCurrentNegation(){
		$p = 1.25;
		return round(pow($this->parentIntegrity - $this->armourDmg, $p) / $this->parentPow * $this->negation);
	}

	public function setBonusNegation($turn){
		if (!sizeof($this->boostEffect)){return;}
		$this->bonusNegation = $this->getBoostEffect("Armour") * $this->getBoostLevel($turn);
	}

	public function getBonusNegation(){
		return $this->bonusNegation;
	}

	public function getArmourValue($system){
		return array(
			"stock" => round($this->getCurrentNegation() * $system->getArmourMod()),
			"bonus" => round($this->getBonusNegation() * $system->getArmourMod())
		);
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

	public function setName(){
		$this->type = $this->getName();
	}

	public function getName(){
		$a = Math::getArcDir($this);

		switch ($a){
			case 0: return "Bow";
			case 360: return "Bow";
			case 60: return "Bow Starboard";
			case 78: return "Main Starboard";
			case 90: return "Starboard";
			case 120: return "Rear Starboard";
			case 150: return "Rear Starboard";
			case 180: return "Rear";
			case 210: return "Rear Port";
			case 222: return "Rear Port";
			case 240: return "Rear Port";
			case 270: return "Port";
			case 282: return "Main Port";
			case 300: return "Bow Port";
		}
	}
}

class Primary {
	public $name = "Main Structure";
	public $display = "Main Structure";
	public $id;
	public $parentId;
	public $start;
	public $end;
	public $integrity;
	public $destroyed = false;
	public $systems = array();
	public $damages = array();
	public $remaining = 0;
	public $damaged = 0;
	public $emDmg = 0;

	function __construct($id, $parentId, $start, $end, $integrity){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->start = $start;
		$this->end = $end;
		$this->integrity = floor($integrity*0.85);
		$this->remaining = floor($integrity*0.85);
	}

	public function isDestroyed(){
		if ($this->destroyed){
			return true;
		}
		return false;
	}

	public function addDamage($dmg){
		if ($dmg->new){
			$this->damaged = 1;
			if ($dmg->systemid == 1){$this->emDmg += $dmg->emDmg;}
		}

		if ($dmg->systemid == 1){
			$dmg->overkill += $dmg->structDmg;
			$dmg->structDmg = 0;
			$this->damages[] = $dmg;
		}

		$this->remaining -= $dmg->overkill;

		if ($this->remaining < 1){
			$this->destroyed = 1;
		}
	}

	public function getArmourMod(){
		return 1;
	}

	public function getHitChance(){
		return ($this->integrity * 0.7);
		//return max($this->remaining *1.4, $this->integrity *0.2);
		//return floor($this->remaining *1.4);
	}

	public function setMaxDmg($fire, $dmg){
		return $dmg;
	}

	public function getRemainingIntegrity(){
		return $this->remaining;
	}
}




?>