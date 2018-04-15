<?php

class Thentus extends Light {
	public $name = "Thentus";
	public $display = "Thentus";
	public $role = "Heavy Patrol Frigate";
	public $faction = "Narn Regime";
	public static $value = 310;
	public $mass = 1300;

	public $integrity = 440;
	public $ep = 110;
	public $ew = 500;
	public $power = 3;
	public $negation = 11;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new bLaser($this->getId(), $this->parentId, 315, 45, 3);
		$front->systems[] = new bLaser($this->getId(), $this->parentId, 315, 45, 5);
		$front->systems[] = new bLaser($this->getId(), $this->parentId, 315, 45, 7);
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new HeavyLaser($this->getId(), $this->parentId, 315, 45);
		$right->systems[] = new TwinParticleBolter($this->getId(), $this->parentId, 0, 180);

		$structs[] = $right;
		$left = new Section(180, 300);
		$left->systems[] = new LightLaser($this->getId(), $this->parentId, 315, 45);
		$left->systems[] = new TwinParticleBolter($this->getId(), $this->parentId, 180, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>