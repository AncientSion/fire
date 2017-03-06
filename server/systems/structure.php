<?php
class Structure {
	public $id;
	public $parentId;
	public $start;
	public $end;
	public $negation;
	public $destroyed = false;
	public $integrity;
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

	public function applyDamage($dmg){
		$this->damages[] = $dmg;
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

	public function getRemainingIntegrity(){
		$remIntegrity = $this->integrity;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			$remIntegrity -= $this->damages[$i]->armourDmg;
		}
		return floor($remIntegrity);
	}

	public function getRemainingNegation($fire){
		return $this->getRemainingIntegrity() / $this->integrity * $this->negation;
		return round(pow($this->getRemainingIntegrity(), 1) / pow($this->integrity, 1) * $this->negation);
	}
}

class Primary extends Structure {
	
	function __construct($id, $parentId, $start, $end, $integrity, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $integrity, 0, $destroyed);
        $this->id = -1;
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