<?php

class Zetorr extends Heavy {
	public $name = "Zetorr";
	public $display = "Zetorr";
	public $faction = "Vree Conglomerate";
	public $size =  45;
	public static $value = 450;
	public $profile = array(1, 1);
	public $mass = 3200;

	public $integrity = 475;
	public $vitalHP = 60;
	public $ep = 95;
	public $ew = 650;
	public $power = 3;

	function __construct($data = false){
        parent::__construct($data);
	}

	public function addSpecials(){
		$this->primary->systems[] = new GravitonSupressor($this->getId(), $this->id, $this->vitalHP, $this->traverse);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 315, 45, 625, 16, 4);
		$front->systems[] = new TriParticleInterdictor($this->getId(), $this->id, 270, 90);
		$front->systems[] = new TriParticleInterdictor($this->getId(), $this->id, 270, 90);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 400, 16, 1);
		$right->systems[] = new TriParticleInterdictor($this->getId(), $this->id, 270, 90);
		$right->systems[] = new TriParticleInterdictor($this->getId(), $this->id, 270, 90);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 475, 16, 1);
		$left->systems[] = new TriParticleInterdictor($this->getId(), $this->id, 270, 90);
		$left->systems[] = new TriParticleInterdictor($this->getId(), $this->id, 270, 90);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addTurrets(){
		$turrets = array();
		
		$turretA = new Turret($this->getId(), $this->id, "Dorsal Main Turret", 0, 360, 160, 12);
		$turretA->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 0, 360);
		$turretA->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 0, 360);
		$turrets[] = $turretA;
		
		$turretB = new Turret($this->getId(), $this->id, "Ventral Main Turret", 0, 360, 160, 12);
		$turretB->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 0, 360);
		$turretB->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 0, 360);
		$turrets[] = $turretB;

		for ($i = 0; $i < sizeof($turrets); $i++){
			$this->structures[] = $turrets[$i];
			//$this->structures[sizeof($this->structures)-1]->boostEffect[] = new Effect("Armour", 3);
			//$this->structures[sizeof($this->structures)-1]->effiency = $this->traverse-1;
		}
	}

	static function getKit($faction){
		return array(
			"id" => 0,
			"name" => "",
			"cost" => static::$value,
			"totalCost" => 0,
			"moraleCost" => 0, 
			"gameid" => 0,
			"userid" => 0,
			"upgrades" => 
			array(
				array(
					"active" => 0,
					"chance" => 65,
					"notes" => "PATROL (Aurora) Outfit",
					"cost" => 300,
					"loads" =>
					array(
						array(
							"systemid" => 9,
							"display" => "Front Main Hangar",
							"name" => "Aurora",
							"amount" => 10
						),
					)
				),
			)
		);
	}
}

?>