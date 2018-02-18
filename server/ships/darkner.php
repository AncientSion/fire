<?php
class Darkner extends Medium {
	public $name = "Darkner";
	public $display = "Darkner";
	public $faction = "Centauri Republic";
	public $size =  45;
	public static $value = 420;
	public $profile = array(0.93, 1.07);
	public $mass = 3000;

	public $integrity = 525;
	public $vitalHP = 80;
	public $ep = 85;
	public $ew = 800;
	public $power = 2;

	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 400, 18);
		$front->systems[] = new HeavyMuon($this->getId(), $this->id, 315, 45);
		$front->systems[] = new MediumMuon($this->getId(), $this->id, 300, 60);
		$front->systems[] = new HeavyMuon($this->getId(), $this->id, 315, 45);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 300, 12);
		$right->systems[] = new LightMuon($this->getId(), $this->id, 300, 180);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 300, 12);
		$left->systems[] = new LightMuon($this->getId(), $this->id, 180, 60);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

/*class Darkner extends Light {
	public $name = "Darkner";
	public $display = "Darkner";
	public $role = "Long-range Support Frigate";
	public $faction = "Centauri Republic";
	public static $value =  300;
	public $cost = 300;
	public $mass = 1400;

	public $integrity = 440;
	public $ep = 100;
	public $ew = 550;
	public $power = 2;
	public $negation = 14;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new SuperHeavyMuon($this->getId(), $this->parentId, 315, 45);
		$front->systems[] = new LightMuon($this->getId(), $this->parentId, 240, 120);
		$structs[] = $front;
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}*/

?>