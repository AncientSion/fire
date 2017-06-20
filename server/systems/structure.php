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
				return true;
				$this->destroyed = true;
			}
		}
		return false;
	}

	public function setNegation($main, $armourDmg){
		$this->parentPow = round(pow($main, 1.25));
		$this->parentIntegrity = $main;
		$this->armourDmg += $armourDmg;
		$this->remainingNegation = round(pow($main - $this->armourDmg, 1.25) / $this->parentPow * $this->negation);
	}

	public function getCurrentNegation(){
		return round(pow($this->parentIntegrity - $this->armourDmg, 1.25) / $this->parentPow * $this->negation);
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
	}

	public function applyDamage($dmg){
		$this->damages[] = $dmg;
		$this->remaining -= $dmg->structDmg;
		if ($dmg->destroyed){
			$this->destroyed = 1;
		}
	}

	public function getArmourMod(){
		return 1;
	}

	public function getHitChance(){
		return $this->integrity;
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
	public $systems = array();
	public $damages = array();
	public $crits = array();

	function __construct($id, $parentId){
		$this->id = $id;
		$this->parentId = $parentId;
	}

	public function isDestroyed(){
		if ($this->destroyed){
			return true;
		}
		for ($i = sizeof($this->damages)-1; $i >= 0; $i--){
			if ($this->damages[$i]->destroyed){
				return true;
				$this->destroyed = true;
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
			if ($this->crits[$i]->type == "disengaged"){
				$this->destroyed = true;
			}
		}
	}

	public function getHitAngle($fire){
		$tPos = $this->getCurrentPosition();
		$sPos = $fire->shooter->getCurrentPosition();
		$angle = Math::getAngle($tPos->x, $tPos->y, $sPos->x, $sPos->y);
		return round(Math::addAngle($this->facing, $angle));
	}
	
	public function testCrit($turn){
		if ($this->destroyed || empty($this->damages)){
			return;
		}
		$dmg = 0;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			$dmg += $this->damages[$i]->structDmg;
		}

		if ($dmg){
			$this->determineCrit((ceil($dmg) / $this->integrity * 100), $turn);
		}
	}

	public function getValidEffects(){
		return array(// attr, %-tresh, duration, modifier
			array("Disabled", 80, 0, 0)
		);
	}

	public function determineCrit($dmg, $turn){
		Debug::log("ceching crit for".get_class($this));
		$crits = $this->getValidEffects();
		$valid = array();

		for ($i = 0; $i < sizeof($crits); $i++){
			if ($dmg > $crits[$i][1]){
				$valid[] = $crits[$i];
			}
		}

		for ($i = 0; $i < sizeof($valid); $i++){
			if (mt_rand(0, 1)){
				$this->crits[] = new Crit(
					sizeof($this->crits)+1,
					$this->parentId, $this->id, $turn,
					$valid[$i][0], $valid[$i][2],
					0,
					1
				);
				return;
			}
		}
	}
}
?>