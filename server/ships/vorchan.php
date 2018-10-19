<?php

class Vorchan extends SuperLight {
	public $name = "Vorchan";
	public $display = "Vorchan";
	public $role = "Attack Frigate";
	public $faction = "Centauri Republic";
	public static $value = 280;
	public $mass = 1250;
	public $integrity = 370;
	
	public $ep = 1020;
	public $ew = 525;
	public $power = 2;
	public $negation = 11;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new MissileLauncher($this->getId(), $this->parentId, 300, 60, 0, array(array("Javelin", 9, 3), array("Hasta", 12, 4)));
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new LightPlasma($this->getId(), $this->parentId, 215, 45);
		//$right->systems[] = new MagCompressor($this->getId(), $this->parentId, 315, 45);
		//$right->systems[] = new MediumShock($this->getId(), $this->parentId, 315, 45);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new LightPlasma($this->getId(), $this->parentId, 215, 45);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>