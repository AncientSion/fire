<?php

class Sharlin extends Ship {

	public $mass = 19000;
	public $profile = array(70, 85);


	function __construct($id, $userid, $shipClass, $x, $y, $facing){
		$this->name = "Sharlin";
		$this->faction = "Minbari Federation";
		$this->id = $id;
		$this->shipClass = $shipClass;
		$this->userid = $userid;
		$this->x = $x;
		$this->y = $y;
		$this->facing = $facing;
	}
}





?>