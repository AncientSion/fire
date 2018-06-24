<?php

/*
class Darkner extends Medium {
	public $name = "Darkner";
	public $display = "Darkner";
	public $faction = "Centauri Republic";
	public $size =  45;
	public static $value = 420;
	public $profile = array(0.93, 1.07);
	public $mass = 3000;

	public $integrity = 525;
	public $vitalHP = 80;
	public $ep = 85;
	public $ew = 800;
	public $power = 2;

	function __construct($data = false){
        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 400, 18, 3);
		$front->systems[] = new SuperHeavyParticle($this->getId(), $this->id, 300, 60);
		$front->systems[] = new LightParticle($this->getId(), $this->id, 300, 120);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 300, 12, 1);
		$right->systems[] = new MediumParticle($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 300, 12, 1);
		$left->systems[] = new MediumParticle($this->getId(), $this->id, 180, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}
*/

class Darkner extends Light {
	public $name = "Darkner";
	public $display = "Darkner";
	public $role = "Ballistic Support Frigate";
	public $faction = "Centauri Republic";
	public static $value =  180;
	public $mass = 1400;

	public $integrity = 370;
	public $ep = 80;
	public $ew = 450;
	public $negation = 11;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new MissileLauncher($this->getId(), $this->id, 300, 120, array(
			array("Javelin", 16, 4), array("Myrmidon", 9, 3)));
		$front->systems[] = new LightParticle($this->getId(), $this->parentId, 270, 90);
		$structs[] = $front;
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>