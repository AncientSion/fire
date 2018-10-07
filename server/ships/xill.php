<?php

class Xill extends Heavy {
	public $name = "Xill";
	public $display = "Xill";
	public $faction = "Vree Conglomerate";
	public $size =  80;
	public static $value = 775;
	public $profile = array(0.9, 1.1);
	public $mass = 8000;

	public $integrity = 1000;
	public $vitalHP = 115;
	public $ep = 70;
	public $ew = 700;
	public $power = 4;

	function __construct($data = false){
        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 315, 45, 625, 19, 3);
		$front->systems[] = new MediumRailGun($this->getId(), $this->id, 315, 45);
		$front->systems[] = new MediumRailGun($this->getId(), $this->id, 315, 45);
		$front->systems[] = new MediumRailGun($this->getId(), $this->id, 315, 45);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 45, 135, 800, 18, 1);
		$right->systems[] = new MediumRailGun($this->getId(), $this->id, 45, 135);
		$right->systems[] = new MediumRailGun($this->getId(), $this->id, 45, 135);
		$right->systems[] = new MediumRailGun($this->getId(), $this->id, 45, 135);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 135, 225, 550, 16, 3);
		$aft->systems[] = new MediumRailGun($this->getId(), $this->id, 135, 225);
		$aft->systems[] = new MediumRailGun($this->getId(), $this->id, 135, 225);
		$aft->systems[] = new MediumRailGun($this->getId(), $this->id, 135, 225);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 225, 315, 800, 18, 1);
		$left->systems[] = new MediumRailGun($this->getId(), $this->id, 225, 315);
		$left->systems[] = new MediumRailGun($this->getId(), $this->id, 225, 315);
		$left->systems[] = new MediumRailGun($this->getId(), $this->id, 225, 315);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
			$this->structures[sizeof($this->structures)-1]->boostEffect[] = new Effect("Armour", 3);
			$this->structures[sizeof($this->structures)-1]->effiency = $this->traverse-1;
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