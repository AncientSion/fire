<?php

class Ship {
	public $id;
	public $facing = 0;
	public $shipType;
	public $userid;
	public $available;

	public $name;
	public $faction;
	public $size;
	public static $value;
	public $cost;

	public $ship = true;
	public $flight = false;
	public $salvo = false;

	public $mass = 0;
	public $profile = array();
	public $index = 0;
	public $actions = array();
	public $structures = array();

	public $destroyed = false;

	function __construct($id, $userid, $available){
		$this->id = $id;
		$this->userid = $userid;
		$this->available = $available;
		
		$this->addStructures();
		$this->addPrimary();
		$this->cost = $this::$value;
	}

	public function getId(){
		$this->index++;
		return $this->index;
	}

	public function addLoadout($dbLoad){ // [4, 17, 17]
		$chunk = array();
		$chunk[] = $dbLoad[0];

		for ($i = 1; $i < sizeof($dbLoad); $i++){
			if ($dbLoad[$i]["systemid"] != $chunk[sizeof($chunk)-1]["systemid"]){
				$this->getSystemById($chunk[sizeof($chunk)-1]["systemid"])->adjustLoad($chunk);
				$chunk = array();
				$chunk[] = $dbLoad[$i];
			}
			else {
				$chunk[] = $dbLoad[$i];
			}
		}

		$this->getSystemById($chunk[sizeof($chunk)-1]["systemid"])->adjustLoad($chunk);

		return true;
	}

	public function addFireDB($fires){
		for ($i = 0; $i < sizeof($fires); $i++){
			if ($fires[$i]->shooterid == $this->id){
				for ($k = 0; $k < sizeof($this->structures); $k++){
					for ($l = 0; $l < sizeof($this->structures[$k]->systems); $l++){
						if ($fires[$i]->weaponid == $this->structures[$k]->systems[$l]->id){
							$this->structures[$k]->systems[$l]->fireOrders[] = $fires[$i];
							break 2;
						}
					}
				}
			}
		}
		return true;
	}

	public function addDamageDB($damages){
		//Debug::log("begin: ".microtime(true));
		//soert damages by systemid ?
		for ($i = 0; $i < sizeof($damages); $i++){
			if ($damages[$i]->systemid == -1){
				$this->primary->damages[] = $damages[$i];
			}
			else {
				$this->getSystemById($damages[$i]->systemid)->damages[] = $damages[$i];
			}
			$this->getStructureById($damages[$i]->structureid)->damages[] = $damages[$i];
		}
		//Debug::log("finish: ".microtime(true));
		return true;
	}

	public function addPowerDB($powers){
		for ($j = 0; $j < sizeof($powers); $j++){
			for ($k = 0; $k < sizeof($this->structures); $k++){
				for ($l = 0; $l < sizeof($this->structures[$k]->systems); $l++){
					if ($this->structures[$k]->systems[$l]->id == $powers[$j]->systemid){
						$this->structures[$k]->systems[$l]->powers[] = $powers[$j];
						break 2;
					}
				}
			}
			for ($k = 0; $k < sizeof($this->primary->systems); $k++){
				if ($this->primary->systems[$k]->id == $powers[$j]->systemid){
					$this->primary->systems[$k]->powers[] = $powers[$j];
					break;
				}
			}
		}
		return true;
	}

	public function addCritDB($crits){
		for ($j = 0; $j < sizeof($crits); $j++){
			for ($k = 0; $k < sizeof($this->structures); $k++){
				for ($l = 0; $l < sizeof($this->structures[$k]->systems); $l++){
					if ($this->structures[$k]->systems[$l]->id == $crits[$j]->systemid){
						$this->structures[$k]->systems[$l]->crits[] = $crits[$j];
						break 2;
					}
				}
			}
			for ($k = 0; $k < sizeof($this->primary->systems); $k++){
				if ($this->primary->systems[$k]->id == $crits[$j]->systemid){
					$this->primary->systems[$k]->crits[] = $crits[$j];
					break;
				}
			}
		}
		return true;
	}

	public function applyDamage($dmg){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->id == $dmg->structureid){
				$this->structures[$i]->damages[] = $dmg;
				if ($dmg->systemid == -1){
					$this->primary->damages[] = $dmg;
					return;
				}
				else {
					for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
						if ($this->structures[$i]->systems[$j]->id == $dmg->systemid){
							$this->structures[$i]->systems[$j]->damages[] = $dmg;
							return;
						}
					}
					for ($j = 0; $j < sizeof($this->primary->systems); $j++){
						if ($this->primary->systems[$j]->id == $dmg->systemid){
							$this->primary->systems[$j]->damages[] = $dmg;
							return;
						}
					}
				}
			}
		}
		Debug::log("couldnt apply");
		return;
	}


	public function setState(){
		for ($i = sizeof($this->primary->damages)-1; $i >= 0; $i--){
			if ($this->primary->damages[$i]->destroyed){
				$this->destroyed = true;
				break;
			}
		}
		return true;
	}

	public function getPowerReq(){
		$need = 0;
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				$need += $this->structures[$i]->systems[$j]->powerReq;
			}
		}
		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			$need += $this->primary->systems[$i]->powerReq;
		}
		return $need;
	}

	public function getRemainingIntegrity($fire){
		$total = $this->primary->integrity;
		for ($i = 0; $i < sizeof($this->primary->damages); $i++){
			$total = $total - $this->primary->damages[$i]->structDmg;
		}
		return $total;
	}

	public function isDestroyed(){
		for ($i = 0; $i < sizeof($this->primary->damages); $i++){
			if ($this->primary->damages[$i]->destroyed){
				return true;
			}
		}
		return false;
	}

	public function resolveFireOrder($fire){
		//Debug::log("resolveFireOrder ID ".$fire->id.", shooter: ".get_class($fire->shooter)." #".$fire->shooterid." vs ".get_class($fire->target)." #".$fire->targetid.", w: ".get_class($fire->weapon)." #".$fire->weaponid);

		if ($this->destroyed){
			Debug::log("target destroyed id: #".$fire->target->id);
			return false;
		}

		$fire->dist = $this->getHitDist($fire);
		$fire->angleIn = $this->getHitAngle($fire);
		$fire->hitSection = $this->getHitSection($fire);
		$fire->req = ($this->getHitChance($fire) / 100 * $fire->weapon->getFireControlMod($fire))- $fire->weapon->getAccLoss($fire->dist);
		//Debug::log("normal hitangle from ship #".$fire->shooter->id." to target #".$this->id." : ".$fire->angleIn.", picking section: ".$fire->hitSection);
		$fire->weapon->rollForHit($fire);

		if ($fire->hits){
			$fire->weapon->doDamage($fire);
		}
		$fire->resolved = 1;
		return;
	}

	public function resolveBallisticFireOrder($fire){
		Debug::log("resolveBallisticFireOrder ID ".$fire->id.", shooter: ".get_class($fire->shooter)." #".$fire->shooterid." vs ".get_class($fire->target)." #".$fire->targetid.", w: ".$fire->weaponid);

		if ($this->destroyed){
			Debug::log("target destroyed id: #".$fire->target->id);
			return false;
		}

		$fire->dist = 0;
		$fire->angleIn = $this->getBallisticHitAngle($fire);
		$fire->hitSection = $this->getHitSection($fire);
		$fire->req = $fire->weapon->getFireControlMod($fire);

		//Debug::log("ballistic hitangle from ball #".$fire->shooter->id." to target #".$this->id." : ".$fire->angleIn.", picking section: ".$fire->hitSection);
		$fire->weapon->rollForHit($fire);

		if ($fire->hits){
			$fire->weapon->doDamage($fire);
		}
		$fire->resolved = 1;
		return;
	}

	public function getHitSection($fire){
		$locs = array();
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (Math::isInArc($fire->angleIn, $this->structures[$i]->start, $this->structures[$i]->end)){
				$locs[] = $this->structures[$i]->id;
			}
		}
		return $locs[mt_rand(0, sizeof($locs)-1)];
	}

	public function getHitSystem($fire){
		$roll;
		$struct = $fire->target->getStructureById($fire->hitSection);
		for ($j = 0; $j < sizeof($struct->systems); $j++){
			if (! $struct->systems[$j]->destroyed){
				$roll = mt_rand(0, 100);
				if ($roll <= $struct->systems[$j]->chance){
					return $struct->systems[$j];
				}
			}
		}
		for ($j = 0; $j < sizeof($this->primary->systems); $j++){
			if (! $this->primary->systems[$j]->destroyed){
			$roll = mt_rand(0, 100);
				if ($roll <= $this->primary->systems[$j]->chance){
					return $this->primary->systems[$j];
				}
			}
		}
		return $this->primary;
	}

	public function getHitChance($fire){
		$angle = $fire->angleIn;

		while ($angle > 90){
			$angle -= 180;
		}
		if ($angle < 0){
			$angle *= -1;
		}
		
		$base = $this->getBaseHitChance();
		$a = $base * $this->profile[0];
		$b = $base * $this->profile[1];
		$sub = ((90 - $angle) * $a) + (($angle - 0) * $b);
		$sub /= (90 - 0);

		return ceil($sub);
	}

	public function getBaseHitChance(){
		return ceil(pow($this->mass, 0.5));
	}

	public function getCurrentPosition(){
		for ($i = sizeof($this->actions)-1; $i >= 0; $i--){
			if ($this->actions[$i]->resolved == 1){
				return new Point($this->actions[$i]->x, $this->actions[$i]->y);
			}
		}
		return new Point(false, false);
	}

	public function getHitDist($fire){
		$tPos = $this->getCurrentPosition();
		$sPos = $fire->shooter->getCurrentPosition();
		return Math::getDist($tPos->x, $tPos->y,  $sPos->x, $sPos->y);
	}

	public function getHitAngle($fire){
		$tPos = $this->getCurrentPosition();
		$sPos = $fire->shooter->getCurrentPosition();

		$angle = Math::getAngle($tPos->x, $tPos->y, $sPos->x, $sPos->y);
		return round(Math::addAngle($this->facing, $angle));
	}

	public function getBallisticHitAngle($fire){
		$tPos = $this->getCurrentPosition();
		$sPos = $fire->shooter->getImpactTrajectory();

		$angle = Math::getAngle($tPos->x, $tPos->y, $sPos->x, $sPos->y);
		return round(Math::addAngle($this->facing, $angle));
	}

	public function testCriticalsShipLevel($turn, $phase){
		//Debug::log("= testCriticalsShipLevel for ".$this->classname.", ".$this->id.", turn: ".$turn);
		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->testCriticalsStructureLevel($turn);
		}
		if($this->ship){
			$this->primary->testCriticalsStructureLevel($turn);
		}
	}

	public function addSystem($obj){
		$obj->id = sizeof($this->systems)+1;
		$obj->parentid = $this->id;

		$this->systems[] = $obj;
	}

	public function getStructureById($id){
		//Debug::log("looking for: ".$id);
		for ($i = 0; $i < sizeof($this->structures); $i++){
			//Debug::log("now: ".$this->structures[$i]->id);
			if ($this->structures[$i]->id == $id){
				return $this->structures[$i];
			}
		}
	}

	public function getSystemById($id){
		//debug::log("looking for :".$id);
		if ($id == -1){
			return $this->primary;
		}
		else {
			for ($i = 0; $i < sizeof($this->primary->systems); $i++){
				if ($this->primary->systems[$i]->id == $id){
					return $this->primary->systems[$i];
				}
			}
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

	public function getNewCrits($turn){
		$crits = array();
		for ($j = 0; $j < sizeof($this->structures); $j++){
			for ($k = 0; $k < sizeof($this->structures[$j]->systems); $k++){
				for ($l = 0; $l < sizeof($this->structures[$j]->systems[$k]->crits); $l++){
					if ($this->structures[$j]->systems[$k]->crits[$l]->turn == $turn){
						$crits[] = $this->structures[$j]->systems[$k]->crits[$l];
					}
				}
			}
		}
		for ($k = 0; $k < sizeof($this->primary->systems); $k++){
			for ($l = 0; $l < sizeof($this->primary->systems[$k]->crits); $l++){
				if ($this->primary->systems[$k]->crits[$l]->turn == $turn){
					$crits[] = $this->primary->systems[$k]->crits[$l];
				}
			}
		}
		return $crits;
	}
}


class SuperHeavy extends Ship {
	public $shipType = "SuperHeavy";
	
	function __construct($id, $userid, $available){
        parent::__construct($id, $userid, $available);
	}
}

class Heavy extends Ship {
	public $shipType = "Heavy";
	
	function __construct($id, $userid, $available){
        parent::__construct($id, $userid, $available);
	}
}

class Medium extends Ship {
	public $shipType = "Medium";
	
	function __construct($id, $userid, $available){
        parent::__construct($id, $userid, $available);
	}
}

class Light extends Ship {
	public $shipType = "Light";
	
	function __construct($id, $userid, $available){
        parent::__construct($id, $userid, $available);
	}
}

class SuperLight extends Ship {
	public $shipType = "SuperLight";
	
	function __construct($id, $userid, $available){
        parent::__construct($id, $userid, $available);
	}
}

?>
