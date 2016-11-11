<?php
class Structure {
	public $id;
	public $parentId;
	public $integrity;
	public $systems = array();
	public $damages = array();
	public $destroyed = false;

	function __construct($id, $parentId, $start, $end, $mass, $mitigation, $destroyed = false){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->start = $start;
		$this->end = $end;
		$this->mitigation = $mitigation;
		$this->destroyed = $destroyed;
		$this->integrity = $this->getIntegrity($mass);
	}

	public function getIntegrity($mass){
		$t = 0;

		if ($this->start < $this->end){
			$t = $this->end - $this->start;
		}
		else if ($this->start > $this->end){
			$t += 360 - $this->start;
			$t += $this->end;
		}
		
		return floor($t / 360 * $mass / 2);
	}

	public function getRemainingIntegrity(){
		$remIntegrity = $this->integrity;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			$remIntegrity -= $this->damages[$i]->armourDmg;
		}
		return $remIntegrity;
	}
}

class Primary extends Structure {

	function __construct($id, $parentId, $start, $end, $mass, $mitigation, $destroyed = false){	
        parent::__construct($id, $parentId, $start, $end, $mass, $mitigation, $destroyed);
	}

	public function getIntegrity($mass){
		return $mass/2;
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