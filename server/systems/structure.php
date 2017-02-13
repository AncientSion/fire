<?php
class Structure {
	public $id;
	public $parentId;
	public $start;
	public $end;
	public $mitigation;
	public $negation;
	public $destroyed = false;
	public $integrity;
	public $systems = array();
	public $damages = array();

	function __construct($id, $parentId, $start, $end, $mass, $mitigation, $negation, $destroyed = false){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->start = $start;
		$this->end = $end;
		$this->mitigation = $mitigation;
		$this->negation = $negation;
		$this->destroyed = $destroyed;
		$this->integrity = $this->getIntegrity($mass);
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

	public function getIntegrity($mass){
		return $mass;

		$t = 0;

		if ($this->start < $this->end){
			$t = $this->end - $this->start;
		}
		else if ($this->start > $this->end){
			$t += 360 - $this->start;
			$t += $this->end;
		}
		
		return floor($t / 360 * ($mass / 1.5));
	}

	public function getRemainingIntegrity(){
		$remIntegrity = $this->integrity;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			$remIntegrity -= $this->damages[$i]->armourDmg;
		}
		return floor($remIntegrity);
	}

	public function getRemainingMitigation(){
		return round(pow($this->getRemainingIntegrity(), 0.75) / pow($this->integrity, 0.75) * $this->mitigation);
	}

	public function getRemainingNegation($fire){
		return $this->getRemainingIntegrity() / $this->integrity * $this->negation;
		return round(pow($this->getRemainingIntegrity(), 1) / pow($this->integrity, 1) * $this->negation);
	}
}

class Primary extends Structure {

	function __construct($id, $parentId, $start, $end, $mass, $mitigation, $destroyed = false){	
        parent::__construct($id, $parentId, $start, $end, $mass, $mitigation, $destroyed);
        $this->id = -1;
	}

	public function getArmourMod(){
		return 1;
	}

	public function getIntegrity($mass){
		return $mass;
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