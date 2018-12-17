<?php

class Xorr extends Medium {
	public $name = "Xorr";
	public $display = "Xorr";
	public $faction = "Vree Conglomerate";
	public $size =  45;
	public static $value = 460;
	public $profile = array(1, 1);
	public $mass = 2750;

	public $integrity = 500;
	public $vitalHP = 57;
	public $ep = 95;
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

		$front = new Structure($this->getId(), $this->id, 300, 60, 625, 14, 2);
		$front->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 300, 60);
		$front->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 800, 14, 1);
		$right->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 30, 150);
		$right->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 30, 150);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 800, 14,1);
		$left->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 210, 330);
		$left->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 210, 330);
		$structs[] = $left;

		$turretA = new Turret($this->getId(), $this->id, "Dorsal Main Turret", 0, 360, 160, 11);
		$turretA->systems[] = new AntimatterCannon($this->getId(), $this->id, 0, 360);
		$turretA->systems[] = new AntimatterCannon($this->getId(), $this->id, 0, 360);
		$structs[] = $turretA;
		
	//	$turretB = new Turret($this->getId(), $this->id, "Ventral Main Turret", 0, 360, 160, 12);
	//	$turretB->systems[] = new AntimatterCannon($this->getId(), $this->id, 0, 360);
	//	$turretB->systems[] = new AntimatterCannon($this->getId(), $this->id, 0, 360);
	//	$structs[] = $turretB;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
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
					"chance" => 60,
					"cost" => 80,
					"notes" => "Naga Outfit",
					"units" => array(),
					"loads" => 
					array(
						array(
							"systemid" => 12,
							"display" => "Port Missile Launcher",
							"name" => "Naga",
							"amount" => 4
						),
						array(
							"systemid" => 16,
							"display" => "Starboard Missile Launcher",
							"name" => "Naga",
							"amount" => 4
						)
					)
				),
				array(
					"active" => 0,
					"chance" => 30,
					"cost" => 70,
					"notes" => "Needle Outfit",
					"units" => array(),
					"loads" => 
					array(
						array(
							"systemid" => 12,
							"display" => "Port Missile Launcher",
							"name" => "Needle",
							"amount" => 10
						),
						array(
							"systemid" => 16,
							"display" => "Starboard Missile Launcher",
							"name" => "Needle",
							"amount" => 10
						)
					)
				)
			)
		);
	}
}

?>