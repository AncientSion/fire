<?php

class Esharan extends Medium {
	public $name = "Esharan";
	public $display = "Esharan";
	public $faction = "Minbari Federation";
	public $size =  70;
	public static $value = 530;
	public $profile = array(0.9, 1.1);
	public $mass = 4250;

	public $integrity = 650;
	public $vitalHP = 85;
	public $ep = 80;
	public $ew = 600;
	public $power = 6;


	function __construct($data = false){
        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 475, 20, 3);
			$front->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
			$front->systems[] = new EMSubjugator($this->getId(), $this->id, 300, 60);
			$front->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
		$structs[] = $front;
		
		$right = new Structure($this->getId(), $this->id, 60, 180, 400, 17, 1);
			$right->systems[] = new TwinEMProjector($this->getId(), $this->id, 0, 180);
			$right->systems[] = new TwinEMProjector($this->getId(), $this->id, 0, 180);
			$right->systems[] = new TwinEMProjector($this->getId(), $this->id, 0, 180);
			$right->systems[] = new TwinEMProjector($this->getId(), $this->id, 0, 180);
		$structs[] = $right;
		
		$left = new Structure($this->getId(), $this->id, 180, 300, 400, 17, 1);
			$left->systems[] = new TwinEMProjector($this->getId(), $this->id, 180, 360);
			$left->systems[] = new TwinEMProjector($this->getId(), $this->id, 180, 360);
			$left->systems[] = new TwinEMProjector($this->getId(), $this->id, 180, 360);
			$left->systems[] = new TwinEMProjector($this->getId(), $this->id, 180, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>