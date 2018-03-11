<?php

class Shokov extends Shokos {
	public $name = "Shokov";
	public $display = "Shokov";
	public $variant = "Shokos";
	public $rarity = 1;
	public $role = "Torpedo Cutter";
	public $faction = "Narn Regime";
	public $cost = 280;

	public $ew = 425;
	public $power = -3;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new TorpedoLauncher($this->getId(), $this->parentId, 315, 45, array(array("Vran", 8, 2)));
		$front->systems[] = new TorpedoLauncher($this->getId(), $this->parentId, 315, 45, array(array("Vran", 8, 2)));

		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new LightPlasmaPulse($this->getId(), $this->parentId, 0, 180);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new LightPlasmaPulse($this->getId(), $this->parentId, 180, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	static function getKit($faction){
		return array();
	}
}

?>