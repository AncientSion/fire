<?php

class Xonn extends SuperHeavy {
	public $name = "Xonn";
	public $display = "Xonn";
	public $faction = "Vree Conglomerate";
	public $size =  80;
	public static $value = 1240;
	public $profile = array(1, 1);
	public $mass = 12000;

	public $integrity = 1300;
	public $vitalHP = 80;
	public $ep = 75;
	public $ew = 900;
	public $power = 0;

	function __construct($data = false){
        parent::__construct($data);
	}

	public function addSpecials(){
		$this->primary->systems[] = new GravitonSupressor($this->getId(), $this->id, $this->vitalHP, $this->traverse);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 315, 45, 625, 18, 5);
		$front->systems[] = new TriParticleInterdictor($this->getId(), $this->id, 270, 90);
		$front->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 300, 60);
		$front->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 300, 60);
		//$front->systems[] = new AntimatterCannon($this->getId(), $this->id, 315, 45);
		$front->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 300, 60);
		$front->systems[] = new TriParticleInterdictor($this->getId(), $this->id, 270, 90);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 45, 135, 800, 18, 1);
		$right->systems[] = new TriParticleInterdictor($this->getId(), $this->id, 0, 180);
		$right->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 30, 150);
		$right->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 30, 150);
		//$right->systems[] = new AntimatterCannon($this->getId(), $this->id, 45, 135);
		$right->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 30, 150);
		$right->systems[] = new TriParticleInterdictor($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 135, 225, 550, 18, 4);
		$aft->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 120, 240);	

		//$front->systems[] = new Hangar$this->getId(), $this->id, 160, 12, array(array("Aurora", 24), array("Thunderbolt", 24)));
		$aft->systems[] = new Hangar($this->getId(), $this->id, 180, 600, 300, array("Zorth", "Tzymm"), 2);
		$aft->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 120, 240);
	/*	$aft->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new AntimatterCannon($this->getId(), $this->id, 135, 225);
		$aft->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 120, 240);
	*/	$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 225, 315, 800, 18, 1);
		$left->systems[] = new TriParticleInterdictor($this->getId(), $this->id, 180, 360);
		$left->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 210, 330);
		$left->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 210, 330);
		//$left->systems[] = new AntimatterCannon($this->getId(), $this->id, 225, 315);
		$left->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 210, 330);
		$left->systems[] = new TriParticleInterdictor($this->getId(), $this->id, 180, 360);
		$structs[] = $left;
		
	//	$turretD = new Turret($this->getId(), $this->id, "Ventral Main Turret", 0, 360, 160, 12);
	//	$turretD->systems[] = new AntimatterCannon($this->getId(), $this->id, 0, 360);
	//	$turretD->systems[] = new AntimatterCannon($this->getId(), $this->id, 0, 360);
	//	$structs[] = $turretD;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
			//$this->structures[sizeof($this->structures)-1]->boostEffect[] = new Effect("Armour", 3);
			//$this->structures[sizeof($this->structures)-1]->effiency = $this->traverse-1;
		}
	}

	public function addTurrets(){
		$turrets = array();

		$turretA = new Turret($this->getId(), $this->id, "Dorsal Turret #1", 0, 360, 180, 14);
			$turretA->systems[] = new AntimatterCannon($this->getId(), $this->id, 0, 360);
			$turretA->systems[] = new AntimatterCannon($this->getId(), $this->id, 0, 360);
			$turretA->systems[] = new AntimatterCannon($this->getId(), $this->id, 0, 360);
		$turrets[] = $turretA;
		
		$turretC = new Turret($this->getId(), $this->id, "Ventral Main Turret", 0, 360, 140, 14);
			$turretC->systems[] = new TorpedoLauncher($this->getId(), $this->id, 315, 0, 360, array(array("Ullt", 20, 5)));
			$turretC->systems[] = new TorpedoLauncher($this->getId(), $this->id, 315, 0, 360, array(array("Ullt", 20, 5)));
		$turrets[] = $turretC;

		$turretB = new Turret($this->getId(), $this->id, "Dorsal Turret #2", 0, 360, 180, 14);
			$turretB->systems[] = new AntimatterCannon($this->getId(), $this->id, 0, 360);
			$turretB->systems[] = new AntimatterCannon($this->getId(), $this->id, 0, 360);
			$turretB->systems[] = new AntimatterCannon($this->getId(), $this->id, 0, 360);
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