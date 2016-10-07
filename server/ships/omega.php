<?php

class Omega extends Ship {

	public $mass = 15000;
	public $profile = array(80, 85);


	function __construct($id, $userid, $shipClass, $x, $y, $facing){
		$this->name = "Omega";
		$this->faction = "Earth Alliance";
		$this->id = $id;
		$this->shipClass = $shipClass;
		$this->userid = $userid;
		$this->x = $x;
		$this->y = $y;
		$this->facing = $facing;
	}

}



?>