<?php

class Squadron extends Ship {
	public $ship = false;
	public $squad = true;
	public $name = "Squadron";
	public $display = "Squadron";
	public $baseTurnCost = 0;
	public $baseTurnDelay = 0;
	public $baseImpulseCost = 0;
	public $baseImpulse = 1000;
	public $slipAngle = 1000;
	public $turnAngle = 1000;
	public $traverse = -1;

	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes){
		$this->id = $id;
		$this->userid = $userid;
		$this->available = $available;
		$this->status = $status;
		$this->destroyed = $destroyed;
		$this->x = $x;
		$this->y = $y;
		$this->facing = $facing;
		$this->remainingDelay = $delay;
		$this->currentImpulse = $thrust;
		$this->notes = $notes;

		$this->primary = new Shared();
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, array(0, 0), 0, 0);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, array(0, 0), 1000, 0);
	}
	
	public function addSubUnits($elements){
		//Debug::log("SQUADRON addSubUnits ".sizeof($elements));

		for ($i = 0; $i < sizeof($elements); $i++){
			for ($j = 1; $j <= $elements[$i]["amount"]; $j++){
				$this->structures[] = new $elements[$i]["name"]($this->getId(), $this->id);
				$this->index = $this->structures[sizeof($this->structures)-1]->index;
			}
		}
		return true;
	}

	public function setUnitState($turn, $phase){
		//Debug::log("SQUADRON setUnitState ".$this->display." #".$this->id);

		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->setUnitState($turn, $phase);
		}

		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			$this->primary->systems[$i]->setState($turn, $phase);
		}

		$this->setProps($turn, $phase);

		return true;
	}

	public function setBaseStats(){
		//Debug::log("setBaseStats #".$this->id);

		$this->size = 40 + sizeof($this->structures)*20;

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->destroyed || $this->structures[$i]->disabled){continue;}
			$this->baseTurnCost = max($this->baseTurnCost, $this->structures[$i]->baseTurnCost);
			$this->baseTurnDelay = max($this->baseTurnDelay, $this->structures[$i]->baseTurnDelay);
			$this->baseImpulseCost = max($this->baseImpulseCost, $this->structures[$i]->baseImpulseCost);
			$this->baseImpulse = min($this->baseImpulse, $this->structures[$i]->baseImpulse);
			$this->slipAngle = min($this->slipAngle, $this->structures[$i]->slipAngle);
			$this->turnAngle = min($this->turnAngle, $this->structures[$i]->turnAngle);

			$this->primary->systems[0]->output = max($this->primary->systems[0]->output, $this->structures[$i]->ew);
			$this->primary->systems[1]->output = min($this->primary->systems[1]->output, $this->structures[$i]->ep);
		}
	}	

	public function hideFireOrders($turn){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->structures); $j++){
				for ($k = 0; $k < sizeof($this->structures[$i]->structures[$j]->systems); $k++){
					for ($l = 0; $l < sizeof($this->structures[$i]->structures[$j]->systems[$k]->fireOrders); $l++){
						if ($this->structures[$i]->structures[$j]->systems[$k]->fireOrders[$l]->turn == $turn){
							array_splice($this->structures[$i]->structures[$j]->systems[$k]->fireOrders, $l, 1);
						} else break;
					}
				}
			}
		}
	}

	public function getSystemById($id){
		//Debug::log("Squadron getSystemById #".$id);
		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			if ($this->primary->systems[$i]->id == $id){
				return $this->primary->systems[$i];
			}
		}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->id == $id){return $this->structures[$i];}

			for ($j = 0; $j < sizeof($this->structures[$i]->structures); $j++){
				for ($k = 0; $k < sizeof($this->structures[$i]->structures[$j]->systems); $k++){
					if ($this->structures[$i]->structures[$j]->systems[$k]->id == $id){
						return $this->structures[$i]->structures[$j]->systems[$k];
					}
				}
			}
		}
		//Debug::log("ERROR squadron getSystemById: ".$id);
	}

	public function determineHits($fire){
		for ($i = 0; $i < sizeof($fire->rolls); $i++){
			if ($fire->target->destroyed){
				Debug::log("aborting shot resolution vs dead target #".$this->id);
			}
			$target = $this->getHitSystem($fire);
			$fire->singleid = $target->id;
			$fire->req = $fire->shooter->calculateToHit($fire);
			if ($fire->rolls[$i] < $fire->req){
				//Debug::log("hit");
				$fire->hits++;
				$fire->weapon->doDamage($fire, $fire->rolls[$i], $target);
			}
		}
	}

	public function getHitChance($fire){
		return $this->getStruct($fire->singleid)->getSubHitChance($fire);
	}
	
	public function getHitSystem($fire){
		$elements = array();
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed){
				$elements[] = $this->structures[$i];
			}
		}
		return $elements[mt_rand(0, sizeof($elements)-1)];
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
		$this->destroyed = 1;
		return true;
	}

	public function getArmour($fire, $system){
		return $system->getArmourValue($system);
	}

	public function testForCrits($turn){
		Debug::log("= testForCrits for ".$this->name.", #".$this->id.", turn: ".$turn);

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->destroyed){continue;}
			if (!$this->structures[$i]->damaged){Debug::log("subunit ".$i." not damaged!"); continue;}

			$this->structures[$i]->testCrit($turn, 0);
		}
	}

	public function getNewCrits($turn){
		$crits = array();
		if (!$this->damaged){Debug::log("no dmg, return."); return $crits;}

		/*for ($k = 0; $k < sizeof($this->primary->systems); $k++){
			for ($l = 0; $l < sizeof($this->systems[$k]->crits); $l++){
				if ($this->systems[$k]->crits[$l]->new){
					$crits[] = $this->systems[$k]->crits[$l];
				}// else break;
			}
		}*/

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->damaged){continue;}

			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				for ($k = 0; $k < sizeof($this->structures[$i]->systems[$j]->crits); $k++){
					if ($this->structures[$i]->systems[$j]->crits[$k]->new){
						Debug::log("found new crit");
						$crits[] = $this->structures[$i]->systems[$j]->crits[$k];
					}
				}
			}
		}
		return $crits;
	}

	public function getNewDamages($turn){
		$dmgs = array();
		if (!$this->damaged){return $dmgs;}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->damages); $j++){
				if ($this->structures[$i]->damages[$j]->new){
					$dmgs[] = $this->structures[$i]->damages[$j];
				}
			}
		}
		return $dmgs;
	}

	public function applyDamage($dmg){
		$dmg->overkill += $dmg->structDmg;
		$dmg->structDmg = 0;

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($dmg->systemid == $this->structures[$i]->id){

				if ($dmg->new && $dmg->overkill){
					$this->damaged = 1;
					$this->structures[$i]->damaged = 1;
				}

				$this->structures[$i]->addDamage($dmg);
				return;
			}
		}

		Debug::log("WARNING couldnt apply damage #".$dmg->id.", looking for unit #".$dmg->shipid."/".$dmg->systemid);
	}

	public function getSystemByName($name){
		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			if ($this->primary->systems[$i]->name == $name){
				return $this->systems[$i];
			}
		}
	}
}



class Squaddie extends Single {

	public $baseHitChance;
	public $baseTurnCost;
	public $baseTurnDelay;
	public $baseImpulseCost;

	public $faction = "";
	public $size = 0;
	public $damaged = 0;

	public $start = 0;
	public $end = 360;
	public $ep = 0;
	public $ew = 0;
	public $power = 0;
	public $remaining = 0;
	public $negation = 0;

	public $powers = array();
	public $boostEffect = array();
	public $effiency = 0;

	public $bonusNegation = 0;
	public $remainingNegation = 0;
	public $armourDmg = 0;
	public $parentIntegrity = 0;
	public $parentPow;
	
	function __construct($id, $parentId){
		$this->id = $id;
		$this->parentId = $parentId;

		$this->remaining = $this->integrity;
		$this->index = $this->id;

		$this->setBaseStats();
		$this->addStructures();
		$this->setPowerOutput();
	}

	public function setPowerOutput(){
		$need = 0;
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				$need += $this->structures[$i]->systems[$j]->powerReq;
			}
		}
		$this->power += $need;
	}

	public function getId(){
		$this->index++;
		return $this->index;
	}

	public function setBaseStats(){
		$this->baseHitChance = ceil(pow($this->mass, 0.4)*1.5)+30;
		$this->baseTurnCost = round(pow($this->mass, 1.25)/25000, 2);
		$this->baseTurnDelay = round(pow($this->mass, 0.45)/18, 2);
		$this->baseImpulseCost = round(pow($this->mass, 1.25)/700, 2);
	}

	public function setUnitState($turn, $phase){
		//Debug::log("  setUnitState ".$this->display." #".$this->id);
		if ($this->isDestroyed()){
			$this->destroyed = 1;
		}

		for ($i = 0; $i < sizeof($this->systems); $i++){ // check primary criticals
			$this->systems[$i]->setState($turn, $phase);
		}

		$this->setNegation($this->integrity, 0);
		return true;
	}

	public function getBaseImpulse(){
		return $this->baseImpulse;
	}

	public function getSubHitChance($fire){
		return $this->baseHitChance;
	}

	public function getOverKillSystem($fire){
		return false;
	}

	public function getRemainingIntegrity(){
		return $this->remaining;
	}

	public function setNegation($main, $armourDmg){
		$this->parentIntegrity = round($main*1.5);

		$p = 1.5;
		$this->parentPow = round(pow($main*1.5, $p));
		$this->armourDmg += $armourDmg;
		$this->remainingNegation = round((pow($main*1.5 - $this->armourDmg, $p) / $this->parentPow) * $this->negation);
	}

	public function getCurrentNegation(){
		$p = 1.5;
		return round(pow($this->parentIntegrity - $this->armourDmg, $p) / $this->parentPow * $this->negation);
	}
	
	public function getArmourValue($system){
		//Debug::log("get armour for ".$system->name." - ".$this->getCurrentNegation());
		return array(
			"stock" => round($this->getCurrentNegation() * $system->getArmourMod()),
			"bonus" => round($this->bonusNegation * $system->getArmourMod())
		);
	}

	public function getArmourMod(){
		return 1;;
	}

	public function testCrit($turn, $extra){
		$old = 0; $new = 0;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			if ($this->damages[$i]->turn == $turn){
				$new += $this->damages[$i]->overkill;
			} else $old += $this->damages[$i]->overkill;
		}

		if ($new){
			$this->determineCrit($old, $new, $turn);
		}
	}

	public function getValidEffects(){
		return array(// attr, %-tresh, duration, modifier
			array("Disabled", 70, 0, 0)
		);
	}

	public function determineCrit($old, $new, $turn){
		$dmg = round(($old/2 + $new) / $this->integrity * 100);
		Debug::log("determineCrit for ".$this->name.", new: ".$new."/".$old.", total: ".$dmg." %");
		if (!$dmg){return;}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				$roll = mt_rand(0, 100);
				if ($roll < $dmg){
					Debug::log("applying crit to squaddie sub system, roll: ".$roll);
					$this->structures[$i]->systems[$j]->crits[] = new Crit(
						0, $this->parentId, $this->structures[$i]->systems[$j]->id, $turn, "Disabled", 0, 0, 1
					);
				}// else Debug::log("bad roll: ".$roll);
			}
		}

		return;




		$crits = $this->getValidEffects();
		$valid = array();

		for ($i = 0; $i < sizeof($crits); $i++){
			if ($dmg > $crits[$i][1]){
				$valid[] = $crits[$i];
			}
		}

		if (sizeof($valid)){
			$mod = mt_rand(0, floor($dmg));
			if ($mod > $valid[0][1]/2) { // above tresh && mt_rand(0, dmg) > tresh/2
				Debug::log("Dropout - dmg: ".$dmg.", tresh: ".$valid[0][1].", mt_rand(0, ".floor($dmg).") = ".$mod.", > ".$valid[0][1]/2);
				$this->crits[] = new Crit(
					sizeof($this->crits)+1,
					$this->parentId, $this->id, $turn,
					$valid[0][0], $valid[0][2],
					0,
					1
				);
			}
		}
	}

	public function addDamage($dmg){
		$this->armourDmg += $dmg->armourDmg;
		$this->remaining -= $dmg->overkill;
		$this->damages[] = $dmg;

		if (!$this->destroyed && $this->remaining < 1){
			$this->destroyed = 1;
		}
	}

	public function getName(){
		return "Main";
	}

	public function addPowerEntry($power){
		$this->powers[] = $power;
	}

}

class Light extends Squaddie {
	public $baseImpulse = 190;
	public $traverse = -1;
	public $size = 60;
	public $slipAngle = 25;
	public $turnAngle = 40;
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}

class SuperLight extends Squaddie {
	public $baseImpulse = 200;
	public $traverse = -2;
	public $size = 50;
	public $slipAngle = 25;
	public $turnAngle = 35;
	
	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}
}


?>