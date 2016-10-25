<?php

error_reporting(E_ALL); ini_set('display_errors', '1');
require_once("server\ships\omega.php");
require_once("server\ships\sharlin.php");
require_once("server\systems\systems.php");
require_once("debug.php");

class Ship {
	public $id;
	public $x = 0;
	public $y = 0;
	public $facing = 0;
	public $shipClass;
	public $shipType = "type";
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

	public function getHitSection($fire){
		//$left = new Structure($this->getId(), $this->id, -60, 60, 7, 150);
		//$right = new Structure($this->getId(), $this->id, 60, 180, 7, 150);
		//$aft = new Structure($this->getId(), $this->id, -180, -60, 7, 150);


		$angle = $fire->angleIn;

		$valid = array();

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (Math::isInArc($angle, $this->structures[$i]->start, $this->structures[$i]->end)){
				$valid[] = $this->structures[$i]->id;
			}
		}

		$fire->hitLocs = $valid;
		$roll = mt_rand(1, sizeof($fire->hitLocs));
		$fire->pick = $fire->hitLocs[$roll-1];

		return $fire;
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
		//debug::log("looking for :".$id);
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				//debug::log("now :".$this->structures[$i]->systems[$j]->id);
				if ($this->structures[$i]->systems[$j]->id == $id){
					return $this->structures[$i]->systems[$j];
				}
			}
		}
	}
}

?>
