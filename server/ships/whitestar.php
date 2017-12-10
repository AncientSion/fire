<?php

class WhiteStar extends Light {
	public $name = "WhiteStar";
	public $display = "White Star";
	public $faction = "Minbari Federation";
	public $size =  50;
	public static $value = 600;
	public $profile = array(0.95, 1.05);
	public $mass = 2500;

	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes){
        parent::__construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 500, 21);
		$front->systems[] = new FusionPulsar($this->getId(), $this->id, 300, 60);
		$front->systems[] = new NeutronAccelerator($this->getId(), $this->id, 330, 30);
		$front->systems[] = new FusionPulsar($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 425, 19);
		$right->systems[] = new FusionPulsar($this->getId(), $this->id, 0, 60);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 425, 19);
		$left->systems[] = new FusionPulsar($this->getId(), $this->id, 300, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 700);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, array(60, 3));
		$this->primary->systems[] = new Engine($this->getId(), $this->id, array(60, 3), 110, 5);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, array(60, 3), 850, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, array(60, 3), 4);
	}
}

?>