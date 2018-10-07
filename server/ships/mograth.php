<?php

class Mograth extends Light {
	public $name = "Mograth";
	public $display = "Mograth";
	public $role = "Multi-purpose Frigate";
	public $faction = "Centauri Republic";
	public static $value = 340;
	public $mass = 1400;

	public $integrity = 370;
	public $ep = 100;
	public $ew = 525;
	public $negation = 12;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addStructures(){
		$structs = array();
		
		$front = new Section(300, 60);
		$front->systems[] = new MediumParticle($this->getId(), $this->parentId, 315, 45);
		$front->systems[] = new MediumParticle($this->getId(), $this->parentId, 315, 45);
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new LightParticle($this->getId(), $this->parentId, 270, 90);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new LightParticle($this->getId(), $this->parentId, 270, 90);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>