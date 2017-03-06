<?php

class Mini extends Ship {
	public $ship = false;

	public function getNewCrits($turn){
		$crits = array();
		for ($j = 0; $j < sizeof($this->structures); $j++){
			for ($l = 0; $l < sizeof($this->structures[$j]->crits); $l++){
				if ($this->structures[$j]->crits[$l]->turn == $turn){
					$crits[] = $this->structures[$j]->crits[$l];
				}
			}
		}
		return $crits;
	}

	public function getStructureById($id){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->id == $id){
				return $this->structures[$i];
			}
		}
	}

	public function addDamageDB($damages){
		for ($j = 0; $j < sizeof($damages); $j++){
			if ($this->id == $damages[$j]->shipid){
				for ($k = 0; $k < sizeof($this->structures); $k++){
					if ($this->structures[$k]->id == $damages[$j]->structureid){
						$this->structures[$k]->damages[] = $damages[$j];
					}
				}
			}
		}
		return true;
	}

	public function addCritDB($crits){
	for ($j = 0; $j < sizeof($crits); $j++){
			for ($k = 0; $k < sizeof($this->structures); $k++){
				if ($this->structures[$k]->id == $crits[$j]->systemid){
					$this->structures[$k]->crits[] = $crits[$j];
					break;
				}
			}
		}
		return true;
	}

	public function setState(){
		if (get_class($this) == "Flight"){
			$this->size = 32 + sizeof($this->structures)*7;
			//Debug::log("flight id #".$this->id.", size: ".$this->size);
		}
		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->setState();
		}
		$destroyed = true;
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed){
				$destroyed = false;
				break;
			}
		}
		$this->destroyed = $destroyed;
	}

	public function applyDamage($dmg){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->id == $dmg->structureid){
				$this->structures[$i]->damages[] = $dmg;
				if ($dmg->destroyed){
					$this->structures[$i]->destroyed = true;
				}
				return;
			}
		}
		Debug::log("flight, couldnt apply");
	}
	
	public function getRemainingIntegrity($fire){
		return $this->getStructureById($fire->hitSystem->id)->getRemainingIntegrity();
	}

	public function isDestroyed(){
		if ($this->destroyed){
			return true;
		}
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (! $this->structures[$i]->destroyed){
				return false;
			}
		}
		$this->destroyed = true;
		return true;
	}

	public function resolveFireOrder($fire){
		//Debug::log("resolveFireOrder ID ".$fire->id.", shooter: ".get_class($fire->shooter)." #".$fire->shooterid." vs ".get_class($fire->target)." #".$fire->targetid.", w: ".get_class($fire->weapon)." #".$fire->weaponid);
		
		if ($this->isDestroyed()){
			Debug::log("target entirely destroyed id: #".$fire->target->id);
			$this->destroyed = true;
			return false;
		}
		else if ($this->isDogfight($fire)){
			$this->resolveDogfightFireOrder($fire);
			return true;
		}
		else {
			$fire->dist = $this->getHitDist($fire);
			$fire->angleIn = $this->getHitAngle($fire);
			$fire->hitSection = $this->getHitSection($fire);
			$fire->req = ($this->getHitChance($fire) / 100 * $fire->weapon->getFireControlMod($fire)) - $fire->weapon->getAccLoss($fire->dist);

			$fire->weapon->rollForHit($fire);

			if ($fire->hits){
				$fire->weapon->doDamage($fire);
			}
			$fire->resolved = 1;
			return;
		}
	}

	public function getHitSection($id){
		$locs = array();
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed){
				$locs[] = $this->structures[$i]->id;
			}
		}
		return $locs[mt_rand(0, sizeof($locs)-1)];
	}

	public function getHitChance($fire){
		return $this->getStructureById($fire->hitSection)->getSubHitChance();
	}

	public function getHitSystem($fire){
		return $this->getStructureById($fire->hitSection);
	}
}

class Salvo extends Mini {
	public $id;
	public $userid;
	public $targetid;
	public $classname;
	public $status;
	public $amount;
	public $destroyed;
	public $salvo = true;
	
	public $index = 0;
	public $actions = array();
	public $structures = array();

	function __construct($id, $userid, $targetid, $classname, $status, $amount, $destroyed){
		$this->id = $id;
		$this->userid = $userid;
		$this->targetid = $targetid;
		$this->classname = $classname;
		$this->status = $status;
		$this->amount = $amount;
		$this->destroyed = $destroyed;
		
		$this->addStructures($amount);
	}

	public function addStructures($amount){
		for ($i = 0; $i < $amount; $i++){
			$this->structures[] = new $this->classname($this->id, $i);
		}
	}

	public function addFireDB($fires){
		for ($i = 0; $i < sizeof($fires); $i++){
			if ($fires[$i]->shooterid == $this->id){
				for ($j = 0; $j < sizeof($this->structures); $j++){
					if ($fires[$i]->weaponid == $this->structures[$j]->id){
						$this->structures[$j]->fireOrders[] = $fires[$i];
						break 1;
					}
				}
			}
		}
		return true;
	}

	public function setState(){
		parent::setState();
		if ($this->actions[sizeof($this->actions)-1]->type == "impact"){
			$this->destroyed = true;
			return;
		}
	}

	public function isDogfight($fire){
		return false;
	}

	public function getSystemById($id){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->id == $id){
				return $this->structures[$i];
			}
		}
	}

	public function getCurrentPosition(){
		return new Point($this->actions[sizeof($this->actions)-1]->x, $this->actions[sizeof($this->actions)-1]->y);
	}	

	public function getImpactTrajectory(){
		return new Point($this->actions[sizeof($this->actions)-2]->x, $this->actions[sizeof($this->actions)-2]->y);
	}

	public function getHitAngle($fire){
		return false;
	}
}

class Ammo extends Weapon implements JsonSerializable{
	public $id;
	public $classname;
	public $type;
	public $minDmg;
	public $maxDmg;
	public $maxDist;
	public $impulse;
	public $integrity;
	public $armour;
	public $damages = array();
	public $mass;
	public $destroyed = false;
	public $fc = array();

	function __construct($parentId, $id){
		$this->parentId = $id;
		$this->id = $id;
	}

	public function jsonSerialize(){
		return array(
        	"id" => $this->id,
        	"classname" => $this->classname,
        	"type" => $this->type,
        	"minDmg" => $this->minDmg,
        	"maxDmg" => $this->maxDmg,
        	"maxDist" => $this->maxDist,
        	"impulse" => $this->impulse,
        	"integrity" => $this->integrity,
        	"armour" => $this->armour,
        	"mass" => $this->mass,
        	"damages" => $this->damages,
        	"crits" => $this->crits,
        	"destroyed" => $this->destroyed,
        	"fc" => $this->fc,
        	"fireOrders" => $this->fireOrders
        );
    }

	public function getRemainingNegation($fire){
		return $this->armour;
	}

	public function getArmourMod(){
		return 1;
	}

	public function getRemainingMitigation(){
		return 0;
	}

	public function getRemainingIntegrity(){
		$total = $this->integrity;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			$total -= $this->damages[$i]->structDmg;
		}
		return $total;
	}

	public function getAccLoss($dist){
		return 0;
	}

	public function getDamageMod($turn){
		return 1;
	}

	function setState(){
		for ($i = sizeof($this->damages)-1; $i >= 0; $i--){
			if ($this->damages[$i]->destroyed){
				//debug::log("setting BALL ele to damage destroyed: ".$this->id);
				$this->destroyed = true;
				return;
			}
		}
	}

	public function isDestroyed(){
		for ($i = 0; $i < sizeof($this->damages); $i++){
			if ($this->damages[$i]->destroyed){
				return true;
			}
		}
		return false;
	}

	public function getSubHitChance(){
		return ceil($this->$mass*5);
	}
}

class BallisticTorpedo extends Ammo {
	public $classname = "BallisticTorpedo";
	public $type = "explosive";
	public $minDmg = 65;
	public $maxDmg = 85;
	public $maxDist = 1400;
	public $impulse = 180;
	public $integrity = 18;
	public $armour = 8;
	public $mass = 4;
	public $fc = array(0 => 90, 1 => 30);

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class BallisticMissile extends Ammo {
	public $classname = "BallisticMissile";
	public $type = "explosive";
	public $minDmg = 45;
	public $maxDmg = 60;
	public $maxDist = 900;
	public $impulse = 280;
	public $integrity = 14;
	public $armour = 6;
	public $mass = 3;
	public $fc = array(0 => 80, 1 => 70);

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

?>