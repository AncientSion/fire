<?php

class Fighter extends Structure {
	public $name;
	public $display;
	public $value;
	public $mass;
	public $ep;
	public $negation = array();
	public $crits = array();
	public $integrity;
	public $turns;
	
	function __construct($id, $parentId){
		$this->id = $id;
		$this->parentId = $parentId;
		$this->addSystems();
	}

	function setState($turn){
		for ($i = sizeof($this->damages)-1; $i >= 0; $i--){
			if ($this->damages[$i]->destroyed){
				$this->destroyed = true;
				return;
			}
		}
		for ($i = 0; $i < sizeof($this->crits); $i++){
			if ($this->crits[$i]->type == "disengaged"){
				$this->destroyed = true;
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

	public function testCritical($turn){
		if ($this->destroyed || empty($this->damages)){
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

	public function getSubHitChance(){
		return ceil($this->mass/1.25);
	}
}

class Aurora extends Fighter {
	public $name = "Aurora";
	public $display = "Aurora";
	public $faction = "Earth Alliance";
	public $value = 34;
	public $mass = 38;
	public $ep = 100;
	public $integrity = 34;
	public $negation = array(8, 6, 6);
	public $turns = 5;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new LinkedParticleGun(sizeof($this->systems), $this->id, $this->parentId, 1, 2, 14, 18, 330, 30);
	}
}

class Thunderbolt extends Fighter {
	public $name = "Thunderbolt";
	public $display = "Thunderbolt";
	public $faction = "Earth Alliance";
	public $value = 46;
	public $mass = 42;
	public $ep = 110;
	public $integrity = 38;
	public $negation = array(10, 8, 8);
	public $turns = 5;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		//$id, $fighterId, $parentId, $linked, $minDmg, $maxDmg, $start, $end){
		$this->systems[] = new LinkedParticleGun(sizeof($this->systems), $this->id, $this->parentId, 2, 2, 14, 18, 330, 30);
	}
}

class Nial extends Fighter {
	public $name = "Nial";
	public $display = "Nial";
	public $faction = "Minbari Federation";
	public $value = 58;
	public $mass = 36;
	public $ep = 140;
	public $integrity = 42;
	public $negation = array(11, 10, 8);
	public $turns = 8;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new LinkedNeutronRepeater(sizeof($this->systems), $this->id, $this->parentId, 1, 3, 17, 21, 330, 30);
	}
}

class Sentri extends Fighter {
	public $name = "Sentri";
	public $display = "Sentri";
	public $faction = "Centauri Republic";
	public $value = 28;
	public $mass = 32;
	public $ep = 115;
	public $integrity = 32;
	public $negation = array(8, 7, 7);
	public $turns = 6;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->systems[] = new LinkedParticleGun(sizeof($this->systems), $this->id, $this->parentId, 1, 2, 13, 17, 330, 30);
	}
}

?>