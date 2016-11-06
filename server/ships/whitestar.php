<?php

class WhiteStar extends Ship {

	public $shipClass = "WhiteStar";
	public $name = "White Star";
	public $faction = "Minbari Federation";
	public $size = 40;
	public static $value = 600;
	public $profile = array(1, 1.1);
	public $mass = 2750;
	public $ep = 120;

	function __construct($id, $userid, $x, $y, $facing, $available){		
        parent::__construct($id, $userid, $x, $y, $facing, $available);
	}

	public function addStructures(){
		$structs = [];

		$front = new Structure($this->getId(), $this->id, 300, 60, 450, 450, 70);
		$front->systems[] = new NeutronLaser($this->getId(), $this->id, 330, 30);
		$front->systems[] = new NeutronLaser($this->getId(), $this->id, 330, 30);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 450, 450, 70);
		$right->systems[] = new FusionPulsar($this->getId(), $this->id, 0, 60);
		$right->systems[] = new FusionPulsar($this->getId(), $this->id, 0, 60);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 450, 450, 70);
		$left->systems[] = new FusionPulsar($this->getId(), $this->id, 300, 360);
		$left->systems[] = new FusionPulsar($this->getId(), $this->id, 300, 360);
		$structs[] = $left;
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>