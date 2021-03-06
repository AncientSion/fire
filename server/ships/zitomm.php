<?php

class Zitomm extends Heavy {
	public $name = "Zitomm";
	public $display = "Zitomm";
	public $faction = "Vree Conglomerate";
	public $carrier = true;
	public $size =  70;
	public static $value = 600;
	public $profile = array(1, 1);
	public $mass = 7000;

	public $integrity = 750;
	public $vitalHP = 7;
	public $ep = 70;
	public $ew = 700;
	public $power = 0;

	function __construct($data = false){
        parent::__construct($data);
	}

	public function addSpecials(){
		$this->primary->systems[] = new GravitonSupressor($this->getId(), $this->id, $this->vitalHP, $this->traverse);

	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 315, 45, 625, 16, 4);
		$front->systems[] = new AntimatterBlaster($this->getId(), $this->id, 300, 60);
		$front->systems[] = new AntimatterBlaster($this->getId(), $this->id, 300, 60);
		$front->systems[] = new AntimatterBlaster($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 45, 135, 800, 16, 1);
		$right->systems[] = new TwinParticleBolter($this->getId(), $this->id, 0, 180);
		$right->systems[] = new Hangar($this->getId(), $this->id, 160, 900, 300, array("Zorth", "Tzymm"));
		$right->systems[] = new TwinParticleBolter($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 135, 225, 550, 14, 3);
		$aft->systems[] = new AntimatterBlaster($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new AntimatterBlaster($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new AntimatterBlaster($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 225, 315, 800, 16, 1);
		$left->systems[] = new TwinParticleBolter($this->getId(), $this->id, 180, 360);
		$left->systems[] = new Hangar($this->getId(), $this->id, 160, 900, 300, array("Zorth", "Tzymm"));
		$left->systems[] = new TwinParticleBolter($this->getId(), $this->id, 180, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addTurrets(){
		$turrets = array();
		
	/*	$turretA = new Turret($this->getId(), $this->id, "Dorsal Main Turret", 0, 360, 160, 12);
		$turretA->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 0, 360);
		$turretA->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 0, 360);
		$turrets[] = $turretA;
		
		$turretB = new Turret($this->getId(), $this->id, "Ventral Main Turret", 0, 360, 160, 12);
		$turretB->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 0, 360);
		$turretB->systems[] = new MediumAntiProtonPulsar($this->getId(), $this->id, 0, 360);
		$turrets[] = $turretB;
	*/
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