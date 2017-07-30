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
				$this->destroyed = true;
				return true;
			}
		}
		return false;
	}

	public function setNegation($main, $armourDmg){
		$p = 2;
		$this->parentPow = round(pow($main, $p));
		$this->parentIntegrity = $main;
		$this->armourDmg += $armourDmg;
		$this->remainingNegation = round((pow($main - $this->armourDmg, $p) / $this->parentPow) * $this->negation);
	}

	public function getCurrentNegation(){
		$p = 2;
		return round(pow($this->parentIntegrity - $this->armourDmg, $p) / $this->parentPow * $this->negation);
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

	public function applyDamage($dmg){
		//debug::log($this->remaining);
		$this->remaining -= $dmg->overkill;

		if ($dmg->systemid == -1){
			$this->damages[] = $dmg;
			$this->remaining -= $dmg->structDmg;
		}

		if (!$this->destroyed && $this->remaining < 1){
			Debug::log("unit #".$this->id." below 0");
			$this->destroyed = 1;
		}
	}

	public function getArmourMod(){
		return 1;
	}

	public function getHitChance(){
		return $this->remaining*1.5;
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
			array("Disabled", 65, 0, 0)
		);
	}

	public function determineCrit($old, $new, $turn){
		$dmg = ($old + $new) / $this->integrity * 100;
		Debug::log("checking crit for".get_class($this));
		$crits = $this->getValidEffects();
		$valid = array();

		for ($i = 0; $i < sizeof($crits); $i++){
			if ($dmg > $crits[$i][1]){
				$valid[] = $crits[$i];
			}
		}

		for ($i = 0; $i < sizeof($valid); $i++){
			if (mt_rand(0, 1)){
				Debug::log("Droput!");
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