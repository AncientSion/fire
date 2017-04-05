<?php
class Structure {
	public $id;
	public $parentId;
	public $start;
	public $end;
	public $negation;
	public $destroyed = false;
	public $integrity;
	public $intBase;
	public $remaining;
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
		$this->intBase = pow($integrity, 1.25);
	}

	public function applyDamage($dmg){
		$this->damages[] = $dmg;
		$this->remaining -= $dmg->armourDmg;
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

	public function testCriticalsStructureLevel($turn){
		for ($i = 0; $i < sizeof($this->systems); $i++){
			$this->systems[$i]->testCriticalSystemLevel($turn);
		}
	}

	public function getNewDamages($turn){
		$dmg = 0;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			if ($this->damages[$i]->turn == $turn){
				$dmg += $this->damages[$i]->armourDmg;
			}
		}
		return $dmg;
	}

	public function setRemainingIntegrity(){
		if (!$this->destroyed){
			$this->remaining = $this->getRemainingIntegrity();
		}
	}

	public function getRemainingIntegrity(){
		$remIntegrity = $this->integrity;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			$remIntegrity -= $this->damages[$i]->armourDmg;
		}
		return floor($remIntegrity);
	}

	public function getCurrentIntegrity(){
		return $this->remaining;
	}

	public function getRemainingNegation($fire){
		//return $this->getRemainingIntegrity() / $this->integrity * $this->negation;
		return round(pow($this->remaining, 1.25) / $this->intBase * $this->negation);
	}
}

class Primary extends Structure {
	
	function __construct($id, $parentId, $start, $end, $integrity, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $integrity, 0, $destroyed);
        $this->id = -1;
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

	public function testCriticalsStructureLevel($turn){
		for ($i = 0; $i < sizeof($this->systems); $i++){
			$this->systems[$i]->testCriticalSystemLevel($turn);
		}
	}

	public function getRemainingIntegrity(){
		$remIntegrity = $this->integrity;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			$remIntegrity -= $this->damages[$i]->structDmg;
		}
		return $remIntegrity;
	}
}

?>