<?php

class VorchanB extends Light {
	public $name = "VorchanB";
	public $display = "VorchanB";
	public $role = "Light Warship";
	public $faction = "Centauri Republic";
	public static $value = 330;
	public $mass = 1250;

	public $integrity = 400;
	public $ep = 120;
	public $ew = 525;
	public $power = 3;
	public $negation = 11;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new LightPlasmaShredder($this->getId(), $this->parentId, 315, 45);
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new LightParticle($this->getId(), $this->parentId, 300, 120);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new LightParticle($this->getId(), $this->parentId, 240, 60);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>