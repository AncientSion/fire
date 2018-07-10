<?php

class Thentus extends Light {
	public $name = "Thentus";
	public $display = "Thentus";
	public $role = "Heavy Patrol Frigate";
	public $faction = "Narn Regime";
	public static $value = 325;
	public $mass = 1300;

	public $integrity = 400;
	public $ep = 110;
	public $ew = 500;
	public $negation = 10;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		//$front->systems[] = new bLaser($this->getId(), $this->parentId, 315, 45, 3);
		//$front->systems[] = new bLaser($this->getId(), $this->parentId, 315, 45, 5);
		//$front->systems[] = new bLaser($this->getId(), $this->parentId, 315, 45, 7);
		$front->systems[] = new LightPLasmaPulse($this->getId(), $this->parentId, 270, 90);
		$front->systems[] = new MediumLaser($this->getId(), $this->parentId, 315, 45);
		$front->systems[] = new LightPLasmaPulse($this->getId(), $this->parentId, 270, 90);
		$structs[] = $front;

		$right = new Section(60, 180);
		//$right->systems[] = new HeavyLaser($this->getId(), $this->parentId, 315, 45);
		//$right->systems[] = new LightPLasmaPulse($this->getId(), $this->parentId, 270, 90);
		$right->systems[] = new TwinParticleBolter($this->getId(), $this->parentId, 300, 120);

		$structs[] = $right;
		$left = new Section(180, 300);
		//$left->systems[] = new LightLaser($this->getId(), $this->parentId, 315, 45);
		//$left->systems[] = new LightPLasmaPulse($this->getId(), $this->parentId, 300, 60);
		$left->systems[] = new TwinParticleBolter($this->getId(), $this->parentId, 240, 60);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>