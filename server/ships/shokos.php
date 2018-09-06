<?php

class Shokos extends UltraLight {
	public $name = "Shokos";
	public $display = "Shokos";
	public $role = "Light Corvette";
	public $faction = "Narn Regime";
	public static $value = 220;
	public $mass = 1000;

	public $integrity = 330;
	public $ep = 130;
	public $ew = 400;
	public $power = 2;
	public $negation = 8;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new LightPlasmaPulse($this->getId(), $this->parentId, 270, 90);
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new TwinParticleBolter($this->getId(), $this->parentId, 240, 120);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new TwinParticleBolter($this->getId(), $this->parentId, 240, 120);
		$structs[] = $left;
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>