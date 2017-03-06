<?php

class WhiteStar extends Light {

	public $classname = "WhiteStar";
	public $name = "White Star";
	public $faction = "Minbari Federation";
	public $size = 50;
	public static $value = 600;
	public $profile = array(0.95, 1.05);
	public $mass = 2750;

	function __construct($id, $userid, $available){		
        parent::__construct($id, $userid, $available);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 550, 30);
		$front->systems[] = new NeutronLaser($this->getId(), $this->id, 330, 30);
		$front->systems[] = new NeutronLaser($this->getId(), $this->id, 330, 30);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 450, 26);
		$right->systems[] = new FusionPulsar($this->getId(), $this->id, 0, 60);
		$right->systems[] = new FusionPulsar($this->getId(), $this->id, 0, 60);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 450, 26);
		$left->systems[] = new FusionPulsar($this->getId(), $this->id, 300, 360);
		$left->systems[] = new FusionPulsar($this->getId(), $this->id, 300, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 775);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 60);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 60, 120);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 60);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 60);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 60, $this->getPowerReq());
	}
}

?>