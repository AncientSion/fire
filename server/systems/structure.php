<?php
class Structure {
	public $id;
	public $parentId;
	public $start;
	public $end;
	public $integrity;
	public $negation;
	public $destroyed = false;
	public $remainingNegation = 0;
	public $armourDmg = 0;
	public $parentIntegrity;
	public $parentPow;
	public $systems = array();
	public $damages = array();
	public $powers = array();
	public $effiency = 0;
	public $boostEffect = array();
	public $bonusNegation = 0;

	function __construct($id, $parentId, $start, $end, $integrity, $negation, $destroyed = false){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->start = $start;
		$this->end = $end;
		$this->negation = $negation;
		$this->destroyed = $destroyed;
		$this->integrity = $integrity;
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
		$p = 1.5;
		$this->parentPow = round(pow($main, $p));
		$this->parentIntegrity = $main;
		$this->armourDmg += $armourDmg;
		$this->remainingNegation = round((pow($main - $this->armourDmg, $p) / $this->parentPow) * $this->negation);
	}

	public function getCurrentNegation(){
		$p = 1.5;
		return round(pow($this->parentIntegrity - $this->armourDmg, $p) / $this->parentPow * $this->negation) + $this->bonusNegation;
	}

	public function setBonusNegation($turn){
		if (!sizeof($this->boostEffect)){return;}
		$this->bonusNegation = $this->getBoostEffect("Armour") * $this->getBoostLevel($turn);

		//Debug::log("Bonus Negation for #".$this->parentId."/".$this->id.": ".$this->bonusNegation);
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
}

class Primary {
	public $name = "Main Structure";
	public $id;
	public $parentId;
	public $start;
	public $end;
	public $integrity;
	public $destroyed = false;
	public $systems = array();
	public $damages = array();
	public $remaining;

	function __construct($id, $parentId, $start, $end, $integrity, $destroyed = false){
		$this->id = -1;
		$this->parentId = $parentId;
		$this->start = $start;
		$this->end = $end;
		$this->integrity = $integrity;
		$this->remaining = $integrity;
	}

	public function isDestroyed(){
		if ($this->destroyed){
			return true;
		}
		return false;
	}

	public function addDamage($dmg){
		//debug::log($this->remaining);
		$this->remaining -= $dmg->overkill;

		if ($dmg->systemid == -1){
			$this->damages[] = $dmg;
			$this->remaining -= $dmg->structDmg;
		}

		if (!$this->destroyed && $this->remaining < 1){
			//Debug::log("primary from units  #".$this->parentId." below 0");
			$this->destroyed = 1;
		}
	}

	public function getArmourMod(){
		return 1;
	}

	public function getHitChance(){
		return $this->remaining*1.4;
	}


	public function setRemainingIntegrity(){
		$rem = $this->integrity;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			$rem -= $this->damages[$i]->structDmg;
		}
		$this->remaining = $rem;
	}

	public function getRemainingIntegrity(){
		return $this->remaining;
	}
}

class Single {
	public $id;
	public $parentId;
	public $integrity;
	public $negation;
	public $destroyed = 0;
	public $disabled = 0;
	public $systems = array();
	public $damages = array();
	public $crits = array();
	public $baseHitChance;
	public $name;
	public $display;
	public $mass;
	public $value;
	public $cost;
	public $start = 0;
	public $end = 360;
	public $ep = 0;

	function __construct($id, $parentId){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->setBaseStats();
	}

	public function setBaseStats(){
		$this->baseHitChance = ceil(sqrt($this->mass)*5);
	}

	public function getSubHitChance($fire){
		return $this->baseHitChance;
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

	public function getRemainingIntegrity(){
		$total = $this->integrity;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			$total -= $this->damages[$i]->structDmg;
		}
		return $total;
	}

	function setState($turn){
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

	public function getValidEffects(){
		return array(// attr, %-tresh, duration, modifier
			array("Disabled", 70, 0, 0)
		);
	}

	public function getCurrentNegation(){
		return $this->negaton;
	}

	public function setBonusNegation($turn){
		return;
	}

	public function determineCrit($old, $new, $turn){
		$dmg = ($old + $new) / $this->integrity * 100;
		//Debug::log("checking crit for ".get_class($this));
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
				Debug::log("Dropout - dmg: ".$dmg.", tresh: ".$valid[0][1].", mt_rand(0, ".floor($dmg).") = ".$mod.", > ".$valid[0][1]/2);
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