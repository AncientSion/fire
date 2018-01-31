<?php

class Altarian extends Medium {
	public $name = "Altarian";
	public $display = "Altarian";
	public $faction = "Centauri Republic";
	public $size =  55;
	public static $value = 525;
	public $profile = array(0.93, 1.07);
	public $mass = 4250;

	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 400, 18);
		$front->systems[] = new LightIon($this->getId(), $this->id, 240, 60);
		$front->systems[] = new HeavyIon($this->getId(), $this->id, 300, 60);
		$front->systems[] = new LightIon($this->getId(), $this->id, 300, 120);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 325, 16);
		$right->systems[] = new MediumIon($this->getId(), $this->id, 0, 120);
		$right->systems[] = new MediumIon($this->getId(), $this->id, 0, 120);
		$right->systems[] = new MediumIon($this->getId(), $this->id, 60, 180);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 16);
		$aft->systems[] = new Hangar($this->getId(), $this->id, 8, array("Sentri", "SitaraIon"), 8);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 325, 16);
		//$left->systems[] = new Hangar($this->getId(), $this->id, 8, array("Sentri", "SitaraIon"), 8);
		$left->systems[] = new MediumIon($this->getId(), $this->id, 240, 360);
		$left->systems[] = new MediumIon($this->getId(), $this->id, 240, 360);
		$left->systems[] = new MediumIon($this->getId(), $this->id, 180, 300);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 700);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, array(90, 3));
		$this->primary->systems[] = new Engine($this->getId(), $this->id, array(90, 3), 90);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, array(90, 3), 750, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, array(90, 3));
	}

	static function getKit($faction){
		return array(
			"id" => 0,
			"name" => "",
			"cost" => static::$value,
			"gameid" => 0,
			"userid" => 0,
			"upgrades" => 
			array(
				array(
					"active" => 0,
					"chance" => 40,
					"name" => "PATROL (Sentri) Outfit",
					"cost" => 175,
					"loads" =>
					array(
						array(
							"systemid" => 15,
							"display" => "Aft Main Hangar",
							"name" => "Sentri",
							"amount" => 8
						),
					)
				),
				array(
					"active" => 0,
					"chance" => 20,
					"name" => "Raid (Sentri/Sitara) Outfit",
					"cost" => 175,
					"loads" =>
					array(
						array(
							"systemid" => 15,
							"display" => "Aft Main Hangar",
							"name" => "Sentri",
							"amount" => 8
						),
						array(
							"systemid" => 15,
							"display" => "Aft Main Hangar",
							"name" => "Sitara (Ion)",
							"amount" => 2
						),
					)
				),
			)
		);
	}
}

?>