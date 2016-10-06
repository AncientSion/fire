<?php

class Ship {
	public $id;
	public $x;
	public $y;
	public $facing;
	public $shipClass;
	public $shipType;
	public $userid;


	function __construct($id, $userid, $shipClass, $x, $y, $facing){
		$this->id = $id;
		$this->shipClass = $shipClass;
		$this->userid = $userid;
		$this->x = $x;
		$this->y = $y;
		$this->facing = $facing;
	}

	function getLoc(){
		return array("x" => $this->x, "y" => $this->y);
	}
}

?>
