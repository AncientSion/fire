<?php

class Flight extends Mini {
	public $flight = true;
	public $shipType = "Flight";
	public $name = "Flight";
	public $display = "Flight";
	public $faction = false;
	public $size = 0;
	public $cost = 0;
	public $mass = 0;
	public $profile = 0;
	public $primary = false;
	public $dogfights = array();
	public $baseImpulse = 210;
	public $traverse = -3;

	function __construct($id, $userid, $available, $status, $destroyed){
		$this->id = $id;
		$this->userid = $userid;
		$this->available = $available;
		$this->status = $status;
		$this->destroyed = $destroyed;
	}

	function setState($turn){
		parent::setState($turn);
		$alive = 0;
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed){
				$alive++;
			}
		}
		$this->size = 32 + $alive*5;
	}

	public function addFighters($fighters){
		$fighter;
		for ($i = 0; $i < sizeof($fighters); $i++){
			for ($j = 1; $j <= $fighters[$i]["amount"]; $j++){
				$this->structures[] = new $fighters[$i]["name"](
					$this->getId(),
					$this->id
				);
				for ($k = 0; $k < sizeof($this->structures[sizeof($this->structures)-1]->systems); $k++){
					$this->structures[sizeof($this->structures)-1]->systems[$k]->id = $this->getId();
				}
			}
		}
		return true;
	}
	
	public function getSystemById($id){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->id == $id){
				return $this->structures[$i];
			}
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				if ($this->structures[$i]->systems[$j]->id == $id){
					return $this->structures[$i]->systems[$j];
				}
			}
		}
	}

	public function createFireOrders($gameid, $turn, $targets, $odds){ //[1, 7, 12]
		//$id, $gameid, $turn, $shooterid, $targetid, $weaponid, $shots, $req, $notes, $hits, $resolved){
		$fires = array();

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed){
				$roll = mt_rand($odds[0], $odds[sizeof($odds)-1]); // 9
				for ($j = sizeof($odds)-1; $j >= 0; $j--){
					if ($roll <= $odds[$j] && $roll >= $odds[$j-1]){
						$fires[] = array(
							"gameid" => $gameid,
							"turn" =>$turn,
							"shooterid" => $this->id,
							"targetid" => $targets[$j-1]->id,
							"weaponid" => $this->structures[$i]->systems[0]->id,
							"shots" => $this->structures[$i]->systems[0]->shots,
							"resolved" => 0
						);
						break;
					}
				}
			}
		}
		return $fires;
	}

    public function getArmourValue($fire, $hitSystem){
    	//Debug::log("getRemainingNegation FLIGHT, angle: ".$fire->angle);
    	if ($fire->angle >= 330 || $fire->angle <= 30){
    		return $hitSystem->negation[0];
    	}
    	else if (($fire->angle > 30 && $fire->angle < 150) || ($fire->angle > 210 && $fire->angle < 330)){
    		return $hitSystem->negation[1];
		}
		else {
    		return $hitSystem->negation[2];
		}
    }

	public function resolveDogfightFireOrder($fire){
		Debug::log("resolveDogfightFireOrder ID ".$fire->id.", shooter: ".get_class($fire->shooter)." #".$fire->shooterid." vs ".get_class($fire->target)." #".$fire->targetid.", w: ".$fire->weaponid);

		if ($this->isDestroyed()){
			$fire->resolved = -1;
		}
		else {
			$fire->dist = 0;
			$fire->angle = mt_rand(0, 359);
			$fire->section = $this->getSection($fire);
			$fire->hitSystem[] = $this->getHitSystem($fire);
			$fire->req = ceil($this->getHitChance($fire) * $this->getDogfightHitModifier() * (1-($fire->weapon->getTraverseMod($fire)*0.2)) - $fire->weapon->getAccLoss($fire->dist));
			$fire->weapon->rollToHit($fire);

			for ($i = 0; $i < $fire->shots; $i++){
				if ($fire->rolls[$i] <= $fire->req){
					$fire->weapon->doDamage($fire, $fire->rolls[$i], $fire->hitSystem[$i]);
				}
			}
			$fire->resolved = 1;
		}
	}

	public function isDogfight($fire){
		for ($i = 0; $i < sizeof($this->dogfights); $i++){
			if ($this->dogfights[$i] == $fire->shooterid){
				return true;
			}
		}
		return false;
	}

	public function getDogfightHitModifier(){
		return 2;
	}
}
?>