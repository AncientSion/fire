<?php

error_reporting(E_ALL); ini_set('display_errors', '1');
require_once("server\ships\sharlin.php");
require_once("server\ships\omega.php");
require_once("server\ships\hyperion.php");
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
	public $available;

	public $name;
	public $faction;
	public $size;
	public static $value;
	public $ep;

	public $mass = 0;
	public $baseHitChance = 0;
	public $profile = array();	
	public $index = 0;
	public $actions = array();
	public $structures = array();

	function __construct($id, $userid, $x, $y, $facing, $available){
		$this->id = $id;
		$this->userid = $userid;
		$this->x = $x;
		$this->y = $y;
		$this->facing = $facing;
		$this->available = $available;
		
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
		$angle = $fire->angleIn;
		$valid = array();
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (Math::isInArc($angle, $this->structures[$i]->start, $this->structures[$i]->end)){
				$valid[] = $this->structures[$i]->id;
			}
		}
		$fire->hitLocs = $valid;
		$fire->pick = $valid[mt_rand(0, sizeof($fire->hitLocs)-1)];
		return $fire;
	}

	public function createDamageObject($fire){
		//Debug::log("createDamageObject");	
		$structure = $this->getStructureById($fire->pick);

		$remIntegrity = $structure->getRemainingIntegrity();
		$remArmour = $structure->getRemainingArmour();

		$armourMod = pow($remArmour, 0.5) / pow($structure->armour, 0.5);
		$mitigation = round($structure->mitigation * $armourMod);

		$dmg = $fire->dmgRoll;

		$shielDmg = 0;
		$armourDmg = round($dmg / 100 * $mitigation);
		$structDmg = round($dmg - $armourDmg);

		$notes = "";
		$destroyed = false;
		$type = $fire->weapon->type;


		$dmg = new Damage(
			sizeof($structure->damages)+1,
			$fire->id,
			$fire->gameid,
			$this->id, 
			$structure->id, 
			$fire->turn,
			$type,
			$fire->dmgRoll,
			$shielDmg,
			$structDmg, 
			$armourDmg,
			$mitigation,
			$destroyed,
			$notes,
			1
		);
		return $dmg;
	}

	public function applyDamage($id, $dmg){
		//function __construct($id, $shipid, $structureid, $turn){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->id == $id){
				$this->structures[$i]->damages[] = $dmg;
				//unset($this->structures[$i]->systems);
				//echo json_encode($this->structures[$i]);
				break;
			}
		}
	}

	public function getLoc(){
		return array("x" => $this->x, "y" => $this->y);
	}


	public function addSystem($obj){
		$obj->id = sizeof($this->systems)+1;
		$obj->parentid = $this->id;

		$this->systems[] = $obj;
	}

	public function getStructureById($id){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->id == $id){
				return $this->structures[$i];
			}
		}
	}
	public function getSystemById($id){
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

	public function getStructure(){
		$total = 0;

		foreach ($this->structures as $struct){
			$total += $struct->integrity;
		}
		return $total;
	}

	public function getArmour(){
		$total = 0;

		foreach ($this->structures as $struct){
			$total += $struct->armour;
		}
		return $total;
	}
}

?>
