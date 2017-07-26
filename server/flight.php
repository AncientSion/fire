<?php

class Flight extends Mini {
	public $flight = true;
	public $shipType = "Flight";
	public $name = "Flight";
	public $display = "Flight";
	public $faction = false;
	public $baseSize = 35;
	public $unitSize = 8;

	public $fSize = 20;
	public $size = 0;
	public $cost = 0;
	public $mass = 0;
	public $profile = 0;
	public $primary = false;
	public $dogfights = array();
	public $baseImpulse = 300;
	public $traverse = -3;
	public $turnAngle = 40;
	public $ep = 500;

	function __construct($id, $userid, $available, $status, $destroyed){
		$this->id = $id;
		$this->userid = $userid;
		$this->available = $available;
		$this->status = $status;
		$this->destroyed = $destroyed;
	}

	public function setState($turn){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->setState($turn);
		}
		$this->isDestroyed();
		$this->lockFighterWeapons($turn);
		$this->setProps($turn);
	}

	public function setProps($turn){
		//Debug::log("setProps #".$this->id);
		$this->cost = static::$value;
		$this->setSize();
		$this->setMass();
		$this->setEP();
		$this->setCurrentImpulse($turn);
		$this->setRemainingImpulse($turn);
		$this->setRemainingDelay($turn);
		$this->setBaseStats();
		$this->setLaunchPenalties($turn);
	}

	public function setLaunchPenalties($turn){
		if ($this->available == $turn){
			$this->currentImpulse = floor($this->currentImpulse * 0.6);
			$this->ep = floor($this->currentImpulse * 0.4);
		} else if ($this->available == $turn-1){
			$this->currentImpulse = floor($this->currentImpulse / 0.6);
		}
	}

	public function setBaseStats(){
		$this->baseHitChance = 0;//ceil(pow($this->mass, 1/3)*5);
		$this->baseTurnCost = round(pow($this->mass, 1.15)/100, 2);
		$this->baseTurnDelay = $this->baseTurnCost * 2;
		$this->baseImpulseCost = round(pow($this->mass, 1.15)/4, 2);
	}

	public function setMass(){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed){
				$this->mass = max($this->mass, $this->structures[$i]->mass);
			}
		}
	}

	public function setEP(){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed){
				$this->ep = min($this->ep, $this->structures[$i]->ep);
			}
		}
	}

	public function lockFighterWeapons($turn){
		if (sizeof($this->dogfights)){
			for ($i = 0; $i < sizeof($this->structures); $i++){
				if (!$this->structures[$i]->destroyed){
					$this->structures[$i]->lockWeapons($turn);
				}
			}
		}
	}

	public function setSize(){
		$alive = 0;
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed){
				$alive++;
			}
		}
		$this->size = $this->baseSize + $alive*$this->unitSize;
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
		Debug::log("creating fires for flight #".$this->id);
		//$id, $gameid, $turn, $shooterid, $targetid, $weaponid, $shots, $req, $notes, $hits, $resolved){
		$fires = array();
		$self = 0;
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->destroyed){
				continue;
			}
			$self++;
		}

		$req = 80;
		if ($odds[sizeof($odds)-1] < $self){
			//Debug::log("ueberzahl");
			$dif = ($self - $odds[sizeof($odds)-1])-2;
			$req *= (1-($dif*0.15));
			//Debug::log("self: ".$self.", them: ".$odds[sizeof($odds)-1]." dif: ".$dif.", req: ".$req);
		}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->destroyed){
				continue;
			} 
			else if (mt_rand(0, 100) < $req){
				$roll = mt_rand($odds[0], $odds[sizeof($odds)-1]); // 9
				for ($j = sizeof($odds)-1; $j >= 0; $j--){
					if ($roll <= $odds[$j] && $roll >= $odds[$j-1]){
						$fires[] = array(
							"gameid" => $gameid,
							"turn" =>$turn,
							"shooterid" => $this->id,
							"targetid" => $targets[$j-1]->id,
							"weaponid" => $this->structures[$i]->systems[0]->id,
							"resolved" => 0
						);
						break;
					}
				}
			}
		}
		Debug::log($self." fighters vs ".$odds[sizeof($odds)-1]." fighters, fires: ".sizeof($fires));
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

	public function isDogfight($fire){
		for ($i = 0; $i < sizeof($this->dogfights); $i++){
			if ($this->dogfights[$i] == $fire->shooterid){
				return true;
			}
		}
		return false;
	}
}
?>