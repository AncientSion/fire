<?php

error_reporting(E_ALL); ini_set('display_errors', '1');
require_once("server\ships\omega.php");
require_once("server\ships\sharlin.php");

class Ship {
	public $id;
	public $x;
	public $y;
	public $facing;
	public $shipClass;
	public $shipType;
	public $userid;

	public $mass = 0;
	public $baseHitChance = 0;
	public $profile = array();

	public $name;
	public $faction;

	function __construct($id, $userid, $shipClass, $x, $y, $facing){
		$this->id = $id;
		$this->shipClass = $shipClass;
		$this->userid = $userid;
		$this->x = $x;
		$this->y = $y;
		$this->facing = $facing;
	}

	public function getBaseHitChance(){
		return ceil(pow($this->mass, 0.5));
	}

	public function getHitChanceFromAngle($angle){

		if ($angle < 0){
			$angle *= -1;
		}

		if ($angle > 90){
			$angle /= 2;
		}


		$a = $this->profile[0];
		$b = $this->profile[1];

		$sub = ((90 - $angle) * $a) + (($angle - 0) * $b);
		$sub /= (90 - 0);

		return $sub;

	}

	public function getLoc(){
		return array("x" => $this->x, "y" => $this->y);
	}
}

?>
