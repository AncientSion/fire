<?php

class Flight extends Mini {
	public $flight = true;
	public $shipType = "Flight";
	public $name = "Flight";
	public $classname = "Flight";
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
				$pick = mt_rand(1, $counts[sizeof($counts)-1]); // 9
				for ($j = sizeof($counts)-1; $j >= 0; $j--){
					if ($pick < $counts[$j] && $pick >= $counts[$j-1]){
						$fires[] = array(
							"gameid" => $gameid,
							"turn" =>$turn,
							"shooterid" => $this->id,
							"targetid" => $flights[$j-1]->id,
							"weaponid" => $this->structures[$i]->systems[0]->id,
							"shots" => $this->structures[$i]->systems[0]->shots
						);
					}
				}
			}
		}
		return $fires;
	}

	public function resolveDogfightFireOrder($fire){
		Debug::log("resolveDogfightFireOrder ID ".$fire->id.", shooter: ".get_class($fire->shooter)." #".$fire->shooterid." vs ".get_class($fire->target)." #".$fire->targetid.", w: ".$fire->weaponid);

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

	public function getHitDist($fire){
		$tPos = $this->getCurrentPosition();
		$sPos = $fire->shooter->getCurrentPosition();
		return Math::getDist($tPos->x, $tPos->y,  $sPos->x, $sPos->y);
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
	public static $value;
	public static $mass;
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

	public function jsonSerialize(){
		return array(
        	"id" => $this->id,
        	"classname" => $this->classname,
        	"name" => $this->name,
        	"faction" => $this->faction,
        	"value" => static::$value,
        	"mass" => static::$mass,
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
		return ["disengaged"];
	}

	public function getCritTreshs(){
		return [85];
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
				$mod = mt_rand(0, 35);

				for ($i = sizeof($tresh)-1; $i >= 0; $i--){
					if ($dmg + $mod > $tresh[$i]){
						if (mt_rand(1, 10) > 5){
							//$id, $gameid, $shipid, $systemid, $turn, $type, $duration, $new){
							$this->crits[] = new Crit(
								sizeof($this->crits)+1,
								-1,
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
			return;
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
		for ($i = 0; $i < sizeof($this->damages); $i++){
			if ($this->damages[$i]->destroyed){
				return true;
			}
		}
		return false;
	}

	public function getSubHitChance(){
		return ceil(static::$mass/2);
	}
}

class Aurora extends Fighter {
	public $classname = "Aurora";
	public $name = "Aurora";
	public $faction = "Earth Alliance";
	public static $value = 34;
	public static $mass = 38;
	public $ep = 100;
	public $integrity = 32;
	public $negation = array(8, 7, 6);
	public $turns = 2;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new LinkedParticleGun(sizeof($this->systems), $this->id, $this->parentId, 2, 13, 16, 330, 30);
	}
}

class Thunderbolt extends Fighter {
	public $classname = "Thunderbolt";
	public $name = "Thunderbolt";
	public $faction = "Earth Alliance";
	public static $value = 40;
	public static $mass = 42;
	public $ep = 105;
	public $integrity = 36;
	public $negation = array(9, 8, 7);
	public $turns = 2;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new ParticlePulsar(sizeof($this->systems), $this->id, $this->parentId, 13, 17, 330, 30);
	}
}

class Nial extends Fighter {
	public $classname = "Nial";
	public $name = "Nial";
	public $faction = "Minbari Federation";
	public static $value = 58;
	public static $mass = 36;
	public $ep = 120;
	public $integrity = 40;
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
	public $classname = "Sentri";
	public $name = "Sentri";
	public $faction = "Centauri Republic";
	public static $value = 28;
	public static $mass = 32;
	public $ep = 110;
	public $integrity = 36;
	public $negation = array(8, 7, 7);
	public $turns = 2;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new LinkedParticleGun(sizeof($this->systems), $this->id, $this->parentId, 2, 11, 15, 330, 30);
	}
}
?>