<?php

class Haven extends SuperLight {
	public $name = "Haven";
	public $display = "Haven";
	public $role = "Cutter";
	public $faction = "Centauri Republic";
	public static $value = 230;
	public $mass = 900;

	public $integrity = 310;
	public $ep = 135;
	public $ew = 450;
	public $power = 0;
	public $negation = 8;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new LightPlasma($this->getId(), $this->parentId, 315, 45);
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new LightParticle($this->getId(), $this->parentId, 300, 180);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new LightParticle($this->getId(), $this->parentId, 180, 60);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}



?>