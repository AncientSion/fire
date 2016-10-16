<?php

error_reporting(E_ALL); ini_set('display_errors', '1');
require_once("server\ships\omega.php");
require_once("server\ships\sharlin.php");
require_once("server\systems\systems.php");
require_once("debug.php");

class Ship {
	public $id;
	public $x;
	public $y;
	public $facing;
	public $shipClass;
	public $shipType;
	public $userid;

	public $name;
	public $faction;
	public $size;
	public $value;
	public $ep;

	public $mass = 0;
	public $baseHitChance = 0;
	public $profile = array();	
	public $index = 0;
	public $actions = array();
	public $structures = array();

	function __construct($id, $userid, $x, $y, $facing){
		$this->id = $id;
		$this->userid = $userid;
		$this->x = $x;
		$this->y = $y;
		$this->facing = $facing;
		
		$this->addStructures();
	}

	public function getId(){
		$this->index++;
		return $this->index;
	}

	public function getBaseHitChance(){
		return ceil(pow($this->mass, 0.5));
	}

	public function getHitChanceFromAngle($angle){
		//Debug::log("angle: ".$angle);

		if ($angle < 0){
			$angle *= -1;
		}

		while ($angle > 90){
			$angle /= 2;
		}
		
		$base = $this->getBaseHitChance();
		//Debug::log("base: ".$base);
		$a = $base * $this->profile[0];
		$b = $base * $this->profile[1];

		$sub = ((90 - $angle) * $a) + (($angle - 0) * $b);
		$sub /= (90 - 0);

		return ceil($sub);

	}

	public function getLoc(){
		return array("x" => $this->x, "y" => $this->y);
	}


	public function addSystem($obj){
		$obj->id = sizeof($this->systems)+1;
		$obj->parentid = $this->id;

		$this->systems[] = $obj;
	}


	public function getWeaponById($id){
		//debug::log("looking: ".$id);
		for ($i = 0; $i < sizeof($this->systems); $i++){
			//debug::log($this->systems[$i]->id);
			if ($this->systems[$i]->id == $id){
				//debug::log("found!");
				return $this->systems[$i];
			}
		}
	}


}

?>
