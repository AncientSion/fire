<?php

class Tech extends SuperHeavy {
	public $name = "Tech";
	public $display = "Tech";
	public $faction = "Centauri Republic";
	public $size =  100;
	public static $value = 1080;
	public $profile = array(0.92, 1.08);
	public $mass = 12500;

	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 1050, 22);
		$front->systems[] = new LightIon($this->getId(), $this->id, 300, 120);
		$front->systems[] = new HeavyIon($this->getId(), $this->id, 300, 60);
		$front->systems[] = new HeavyIon($this->getId(), $this->id, 300, 60);
		$front->systems[] = new LightIon($this->getId(), $this->id, 240, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 1300, 21);
		$right->systems[] = new HeavyIon($this->getId(), $this->id, 0, 120);
		$right->systems[] = new LightIon($this->getId(), $this->id, 300, 120);
		$right->systems[] = new HeavyIon($this->getId(), $this->id, 0, 120);
		$right->systems[] = new LightIon($this->getId(), $this->id, 300, 120);
		$right->systems[] = new Hangar($this->getId(), $this->id, 9, array("Sentri", "Sitara"), 9);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 900, 29);
		$aft->systems[] = new MediumIon($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumIon($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 1300, 21);
		$left->systems[] = new LightIon($this->getId(), $this->id, 240, 60);
		$left->systems[] = new HeavyIon($this->getId(), $this->id, 240, 360);
		$left->systems[] = new LightIon($this->getId(), $this->id, 240, 60);
		$left->systems[] = new HeavyIon($this->getId(), $this->id, 240, 360);
		$left->systems[] = new Hangar($this->getId(), $this->id, 9, array("Sentri", "Sitara"), 9);
		$structs[] = $left;
		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 1300);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, array(160, 4));
		$this->primary->systems[] = new Engine($this->getId(), $this->id, array(160, 4), 65);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, array(160, 4), 900, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, array(160, 4));
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
					"cost" => 275,
					"loads" =>
					array(
						array(
							"systemid" => 16,
							"name" => "Sentri",
							"amount" => 5
						),
						array(
							"systemid" => 25,
							"name" => "Sentri",
							"amount" => 5
						),
					)
				),
				array(
					"active" => 0,
					"chance" => 20,
					"name" => "WAR (Combined) Outfit",
					"cost" => 450,
					"loads" =>
					array(
						array(
							"systemid" => 16,
							"name" => "Sentri",
							"amount" => 9
						),
						array(
							"systemid" => 25,
							"name" => "Sitara",
							"amount" => 9
						),
					)
				),
			)
		);
	}


}

?>