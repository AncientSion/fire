<?php
class Structure {
	public $id;
	public $parentId;
	public $integrity;
	public $armour;
	public $systems = array();
	public $damages = array();
	public $destroyed = false;
	function __construct($id, $parentId, $start, $end, $integrity, $armour, $mitigation, $destroyed = false){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->start = $start;
		$this->end = $end;
		$this->integrity = $integrity;
		$this->armour = $armour;
		$this->mitigation = $mitigation;
		$this->destroyed = $destroyed;
	}

	public function getRemainingIntegrity(){
		$remIntegrity = $this->integrity;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			$remIntegrity -= $this->damages[$i]->structDmg;
		}
		return $remIntegrity;
	}

	public function getRemainingArmour(){
		$remArmour = $this->armour;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			$remArmour -= $this->damages[$i]->armourDmg;
		}
		
		return $remArmour;
	}
}

?>