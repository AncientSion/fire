<?php

class Trakk extends SuperLight {
	public $name = "Trakk";
	public $display = "Trakk";
	public $role = "Attack Frigate";
	public $faction = "Narn Regime";
	public static $value = 260;
	public $mass = 1250;

	public $integrity = 380;
	public $ep = 100;
	public $ew = 450;
	public $negation = 10;
	public $power = 1;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new MediumPlasmaPulse($this->getId(), $this->parentId, 315, 45);
		$front->systems[] = new TwinParticleBolter($this->getId(), $this->parentId, 270, 90);
		$front->systems[] = new MediumPlasmaPulse($this->getId(), $this->parentId, 315, 45);
		$structs[] = $front;
		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>