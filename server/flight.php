<?php

class Flight extends Mini {
	public $flight = true;
	public $shipType = "Flight";
	public $classname = "Flight";
	public $name = "Flight";
	public $faction = false;
	public $size = 0;
	public $cost = 0;
	public $mass = 0;
	public $profile = 0;
	public $primary = false;
	public $dogfights = array();

	function __construct($id, $userid, $available){
		$this->id = $id;
		$this->userid = $userid;
		$this->available = $available;
	}

	public function addFighters($fighters){
		$fighter;
		for ($i = 0; $i < sizeof($fighters); $i++){
			for ($j = 1; $j <= $fighters[$i]["amount"]; $j++){
				$this->structures[] = new $fighters[$i]["classname"](
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

	public function createFireOrders($gameid, $turn, $flights, $counts){ //[1, 7, 12]
		//$id, $gameid, $turn, $shooterid, $targetid, $weaponid, $shots, $req, $notes, $hits, $resolved){
		$fires = array();

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed){
				$roll = mt_rand($counts[0], $counts[sizeof($counts)-1]); // 9
				for ($j = sizeof($counts)-1; $j >= 0; $j--){
					if ($roll <= $counts[$j] && $roll >= $counts[$j-1]){
						$fires[] = array(
							"gameid" => $gameid,
							"turn" =>$turn,
							"shooterid" => $this->id,
							"targetid" => $flights[$j-1]->id,
							"weaponid" => $this->structures[$i]->systems[0]->id,
							"shots" => $this->structures[$i]->systems[0]->shots
						);
						break;
					}
				}
			}
		}
		return $fires;
	}

	public function resolveDogfightFireOrder($fire){
		//Debug::log("resolveDogfightFireOrder ID ".$fire->id.", shooter: ".get_class($fire->shooter)." #".$fire->shooterid." vs ".get_class($fire->target)." #".$fire->targetid.", w: ".$fire->weaponid);

		$fire->dist = 0;
		$fire->angleIn = mt_rand(0, 359);
		$fire->hitSection = $this->getHitSection($fire);
		$fire->req = ($this->getHitChance($fire) / 100 * $fire->weapon->getFireControlMod($fire));
		$fire->weapon->rollForHit($fire);

		if ($fire->hits){
			$fire->weapon->doDamage($fire);
		}
		$fire->resolved = 1;
		return;
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

class Fighter extends Structure implements JsonSerializable {
	public $value;
	public $mass;
	public $ep;
	public $negation = array();
	public $crits = array();
	public $integrity;
	public $disabled = false;
	public $turns = 1;
	
	function __construct($id, $parentId){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->addSystems();
	}

	function setState(){
		for ($i = sizeof($this->damages)-1; $i >= 0; $i--){
			if ($this->damages[$i]->destroyed){
				$this->destroyed = true;
				return;
			}
		}
		for ($i = 0; $i < sizeof($this->crits); $i++){
			if ($this->crits[$i]->type == "disengaged"){
				$this->disabled = true;
			}
		}
	}

	public function getCurrentIntegrity(){
		return $this->getRemainingIntegrity();
	}

	public function jsonSerialize(){
		return array(
        	"id" => $this->id,
        	"name" => $this->name,
        	"faction" => $this->faction,
        	"value" => $this->value,
        	"mass" => $this->mass,
        	"integrity" => $this->integrity,
        	"ep" => $this->ep,
        	"turns" => $this->turns,
        	"negation" => $this->negation,
        	"systems" => $this->systems,
        	"damages" => $this->damages,
        	"crits" => $this->crits,
        	"destroyed" => $this->destroyed
        );
    }

	public function getCritEffects(){
		return array("disengaged");
	}

	public function getCritTreshs(){
		return array(75);
	}

	public function testCriticalsStructureLevel($turn){
		if ($this->destroyed || $this->disabled || empty($this->damages)){
			return;
		}
		else {
			$dmg = 0;
			for ($i = 0; $i < sizeof($this->damages); $i++){
				$dmg += $this->damages[$i]->structDmg;
			}

			if ($dmg){
				$dmg = ceil($dmg / $this->integrity * 100);
				$crits = $this->getCritEffects();
				$tresh = $this->getCritTreshs();
				$mod = mt_rand(-10, 15);
				$val = $dmg + $mod;
				if ($val <= $tresh[0]){
					return false;
				}
				
				for ($i = sizeof($tresh)-1; $i >= 0; $i--){
					if ($val > $tresh[$i]){
						//($id, $shipid, $systemid, $turn, $type, $duration, $new){
						$this->crits[] = new Crit(
							sizeof($this->crits)+1,
							$this->parentId,
							$this->id,
							$turn,
							$crits[$i],
							-1,
							1
						);
						return;
					}
				}
			}
		}
	}

	public function getRemainingIntegrity(){
		$total = $this->integrity;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			$total -= $this->damages[$i]->structDmg;
		}
		return $total;
	}

	public function getHitAngle($fire){
		$tPos = $this->getCurrentPosition();
		$sPos = $fire->shooter->getCurrentPosition();
		$angle = Math::getAngle($tPos->x, $tPos->y, $sPos->x, $sPos->y);
		return round(Math::addAngle($this->facing, $angle));
	}

    public function getRemainingNegation($fire){
    	if ($fire->angleIn >= 330 && $fire->angleIn <= 30){
    		return $this->negation[0];
    	}
    	else if ($fire->angleIn >= 150 && $fire->angleIn <= 210){
    		return $this->negation[2];
		}
		else {
    		return $this->negation[1];
		}
    }

    public function getArmourMod(){
    	return 1;
    }

	public function isDestroyed(){
		if ($this->destroyed){
			return true;
		}
		for ($i = 0; $i < sizeof($this->damages); $i++){
			if ($this->damages[$i]->destroyed){
				return true;
			}
		}
		return false;
	}

	public function getSubHitChance(){
		return ceil($this->mass/1.5);
	}
}

class Aurora extends Fighter {
	public $name = "Aurora";
	public $faction = "Earth Alliance";
	public $value = 34;
	public $mass = 38;
	public $ep = 90;
	public $integrity = 34;
	public $negation = array(8, 6, 6);
	public $turns = 2;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new LinkedParticleGun(sizeof($this->systems), $this->id, $this->parentId, 2, 13, 16, 330, 30);
	}
}

class Thunderbolt extends Fighter {
	public $name = "Thunderbolt";
	public $faction = "Earth Alliance";
	public $value = 40;
	public $mass = 42;
	public $ep = 100;
	public $integrity = 38;
	public $negation = array(10, 8, 8);
	public $turns = 2;


	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		//$id, $fighterId, $parentId, $linked, $minDmg, $maxDmg, $start, $end){
		$this->systems[] = new LinkedParticleGun(sizeof($this->systems), $this->id, $this->parentId, 2, 14, 17, 330, 30);
	}
}

class Nial extends Fighter {
	public $name = "Nial";
	public $faction = "Minbari Federation";
	public $value = 58;
	public $mass = 36;
	public $ep = 120;
	public $integrity = 42;
	public $negation = array(11, 10, 8);
	public $turns = 3;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new LinkedNeutronRepeater(sizeof($this->systems), $this->id, $this->parentId, 3, 16, 19, 330, 30);
	}
}

class Sentri extends Fighter {
	public $name = "Sentri";
	public $faction = "Centauri Republic";
	public $value = 28;
	public $mass = 32;
	public $ep = 110;
	public $integrity = 32;
	public $negation = array(8, 7, 7);
	public $turns = 2;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new LinkedParticleGun(sizeof($this->systems), $this->id, $this->parentId, 2, 12, 15, 330, 30);
	}
}
?>