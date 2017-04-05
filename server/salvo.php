<?php

class Mini extends Ship {
	public $ship = false;

	public function getNewCrits($turn){
		$crits = array();
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->crits); $j++){
				if ($this->structures[$i]->crits[$j]->turn == $turn){
					$crits[] = $this->structures[$i]->crits[$j];
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
	}
	
	public function getRemainingIntegrity($fire){
		return $this->getStructureById($fire->hitSystem->id)->getRemainingIntegrity();
	}

	public function isDestroyed(){
		if ($this->destroyed){
			return true;
		}
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (! $this->structures[$i]->isDestroyed()){
				return false;
			}
		}
		$this->destroyed = true;
		return true;
	}

	public function createFireOrders($gameid, $turn, $targets, $odds){
		$fires = array();
		for ($j = 0; $j < sizeof($this->structures); $j++){
			if (!$this->structures[$j]->isDestroyed()){
				
				$fires[] = array(
					"id" => -1,
					"gameid" => $gameid,
					"turn" => $turn,
					"shooterid" => $this->id,
					"targetid" => $this->targetid,
					"weaponid" => $this->structures[$j]->id,
					"shots" => 1,
					"resolved" => 0
				);
			}
		}
		return $fires;
	}

	public function getHitSection($fire){
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
	public $name;
	public $status;
	public $amount;
	public $destroyed;
	public $salvo = true;
	public $target;
	public $index = 0;
	public $actions = array();
	public $structures = array();

	function __construct($id, $userid, $targetid, $name, $status, $amount, $destroyed){
		$this->id = $id;
		$this->userid = $userid;
		$this->targetid = $targetid;
		$this->name = $name;
		$this->status = $status;
		$this->amount = $amount;
		$this->destroyed = $destroyed;
		
		$this->addStructures($amount);
	}

	public function addStructures($amount){
		for ($i = 0; $i < $amount; $i++){
			$this->structures[] = new $this->name($this->id, $i);
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

	public function getImpactTrajectory(){
		return new Point($this->actions[sizeof($this->actions)-2]->x, $this->actions[sizeof($this->actions)-2]->y);
	}

	public function getHitAngle($fire){
		return false;
	}

	public function getImpulse(){
		return $this->structures[0]->impulse;
	}

	public function resolveBallisticFireOrder($fire){
		parent::resolveBallisticFireOrder($fire);

		if ($this->isDestroyed()){
			$this->actions[sizeof($this->actions)-1]->x = $fire->shooter->actions[sizeof($fire->shooter->actions)-1]->x + mt_rand(-6, 6);
			$this->actions[sizeof($this->actions)-1]->y = $fire->shooter->actions[sizeof($fire->shooter->actions)-1]->y + mt_rand(-6, 6);
			$this->status = "intercepted";
		}
		return;
	}

	public function resolveInterceptFireOrder($fire){
		Debug::log("resolveInterceptFireOrder ID ".$fire->id.", shooter: ".get_class($fire->shooter)." #".$fire->shooterid." vs ".get_class($fire->target)." #".$fire->targetid.", w: ".get_class($fire->weapon)." #".$fire->weaponid);
		
		if ($this->isDestroyed()){
			Debug::log("skipping FireOrder - target entirely destroyed id: #".$fire->target->id);
			$fire->req = -1;
		}
		else {
			$fire->dist = $this->getInterceptHitDist($fire);
			$fire->hitSection = $this->getHitSection($fire);
			$fire->req = ($this->getHitChance($fire) / 100 * $fire->weapon->getFireControlMod($fire)) - $fire->weapon->getAccLoss($fire->dist);

			$fire->weapon->rollForHit($fire);

			if ($fire->hits){
				$fire->weapon->doDamage($fire);
			}
		}
		$fire->resolved = 1;
	}

	public function getHitDist($fire){
		$tPos = $this->getCurrentPosition();
		$sPos = $fire->shooter->getCurrentPosition();
		$dist = Math::getDist($tPos->x, $tPos->y, $sPos->x, $sPos->y);

		if ($this->targetid == $fire->shooter->id){
			$dist = max($dist, $fire->shooter->size/2);			
		}
		Debug::log("intercept range: ".$dist);
		return $dist;
	}

}

class Ammo extends Weapon {
	public $id;
	public $impulse;
	public $armour;
	public $damages = array();
	public $mass;
	public $destroyed = false;
	public $fc = array();
	public $cost;

	function __construct($parentId, $id){
		$this->parentId = $parentId;
		$this->id = $id;
	}

	public function jsonSerialize(){
		return array(
        	"id" => $this->id,
        	"name" => $this->name,
        	"display" => $this->display,
        	"type" => $this->type,
        	"minDmg" => $this->minDmg,
        	"maxDmg" => $this->maxDmg,
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
				$this->destroyed = true;
				return;
			}
		}
	}

	public function getSubHitChance(){
		return ceil(sqrt($this->mass)*10);
	}
}

?>