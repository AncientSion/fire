<?php

class Darkner extends Light {
	public $name = "Darkner";
	public $display = "Darkner";
	public $role = "Long-range Support Frigate";
	public $faction = "Centauri Republic";
	public static $value =  370;
	public $cost = 370;
	public $mass = 1400;

	public $integrity = 475;
	public $ep = 45;
	public $ew = 575;
	public $power = 4;
	public $negation = 14;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new HeavyIon($this->getId(), $this->parentId, 330, 30);
		$front->systems[] = new HeavyIon($this->getId(), $this->parentId, 330, 30);
		$structs[] = $front;

		/*$right = new Section(60, 180);
		$right->systems[] = new LightIon($this->getId(), $this->id, 300, 180);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new ightIon($this->getId(), $this->id, 180, 60);
		$structs[] = $left;
		*/
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>