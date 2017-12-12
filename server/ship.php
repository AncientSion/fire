<?php

class Ship {
	public $id;
	public $facing = 0;
	public $x;
	public $y;
	public $userid;
	public $available;
	public $status;
	public $destroyed;
	public $disabled = false;

	public $baseHitChance;
	public $currentImpulse;
	public $remainingImpulse;
	public $remainingDelay;
	public $baseImpulse;

	public $name = "";
	public $display = "";
	public $faction = "";
	public $notes = "";
	public $size;
	public static $value;
	public $cost;

	public $ship = true;
	public $flight = false;
	public $salvo = false;
	public $traverse;
	public $mass = 0;
	public $profile = array();
	public $index = 0;
	public $actions = array();
	public $structures = array();
	public $locks = array();
	public $masks = array();
	public $distances = array();
	public $angles = array();

	public $turnAngle = 30;
	public $slipAngle = 20;
	public $turnStep = 1;
	public $baseTurnCost;
	public $baseTurnDelay;
	public $baseImpulseCost;
	public $hitTable;
	public $cc = array();
	public $damaged = 0;
	public $moveSet = 0;

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

		$this->addPrimary();
		$this->addStructures();
		$this->getSystemByName("Reactor")->setOutput($this->getPowerReq());
	}

	public function getId(){
		$this->index++;
		return $this->index;
	}

	public function setState($turn, $phase){
		//Debug::log("setState #".$this->id);
		if ($this->primary->isDestroyed()){
			$this->destroyed = 1;
		}

		for ($i = 0; $i < sizeof($this->primary->systems); $i++){ // check primary criticals
			$this->primary->systems[$i]->setState($turn);
			switch ($this->primary->systems[$i]->name){
				case "Reactor":
					if ($this->primary->systems[$i]->destroyed){
						$this->destroyed = 1;
					}
					else if ($this->primary->systems[$i]->disabled){
						$this->doUnpowerAllSystems($turn);
					}
					break;
				case "Bridge":
					if ($this->primary->systems[$i]->destroyed || $this->primary->systems[$i]->disabled){
						$this->doUncommandShip($turn);
					}
					break;
			}
		}

		for ($i = 0; $i < sizeof($this->structures); $i++){ // 
			$armourDmg = 0;
			$structDmg = 0;
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				$this->structures[$i]->systems[$j]->setState($turn); // set system states
				for ($k = 0; $k < sizeof($this->structures[$i]->systems[$j]->damages); $k++){// set armour
					$armourDmg += $this->structures[$i]->systems[$j]->damages[$k]->armourDmg;
					$structDmg += $this->structures[$i]->systems[$j]->damages[$k]->structDmg;
				}
			}
			for ($j = 0; $j < sizeof($this->primary->damages); $j++){
				if ($this->primary->damages[$j]->structureid == $this->structures[$i]->id){
					$armourDmg += $this->primary->damages[$j]->armourDmg;
					$structDmg += $this->primary->damages[$j]->structDmg;
				}
			}
			$this->structures[$i]->setNegation($this->primary->integrity, 0);
		}

		$this->setProps($turn, $phase);

		return true;
	}

	public function setProps($turn, $phase){
		//Debug::log("setProps #".$this->id);
		$this->cost = static::$value;
		$this->setCurrentImpulse($turn, $phase);
		$this->setRemainingImpulse($turn);
		$this->setRemainingDelay($turn);
		$this->setBaseStats();
	}

	public function setPosition(){
		if ($this->salvo){
			$this->trajectory = new Point($this->x, $this->y);
			//Debug::log("setting trajectory for #".$this->id.": ".$this->x."/".$this->y);
		}
		else {
			for ($i = sizeof($this->actions)-1; $i >= 0; $i--){
				if ($this->actions[$i]->resolved){
					$this->x = $this->actions[$i]->x;
					$this->y = $this->actions[$i]->y;
					return;
				}
			}
		}
	}

	public function setBaseStats(){
		$this->baseHitChance = ceil(pow($this->mass, 0.4)*1.5)+30;
		$this->baseTurnCost = round(pow($this->mass, 1.25)/25000, 2);
		$this->baseTurnDelay = round(pow($this->mass, 0.45)/18, 2) * $this->getBaseImpulse() / 130;
		$this->baseImpulseCost = round(pow($this->mass, 1.25)/600, 2);
	}

	public function getImpulseStep(){
			return floor($this->getBaseImpulse() / 8);
	}

	public function hidePowers($turn){
		for ($j = 0; $j < sizeof($this->structures); $j++){
			for ($k = sizeof($this->structures[$j]->powers)-1; $k >= 0; $k--){
				if ($this->structures[$j]->powers[$k]->turn == $turn){
					array_splice($this->structures[$j]->powers, $k, 1);
				} else break;
			}
			for ($k = 0; $k < sizeof($this->structures[$j]->systems); $k++){
				for ($l = sizeof($this->structures[$j]->systems[$k]->powers)-1; $l >= 0; $l--){
					if ($this->structures[$j]->systems[$k]->powers[$l]->turn == $turn){
						if ($this->structures[$j]->systems[$k]->powers[$l]->type == 0){
							$this->structures[$j]->systems[$k]->disabled = 0;
						}
						array_splice($this->structures[$j]->systems[$k]->powers, $l, 1);
					} else break;
				}
			}
		}
		if (!$this->ship){return;}

		for ($j = 0; $j < sizeof($this->primary->systems); $j++){
			if ($this->primary->systems[$j]->name == "Sensor"){
				$this->primary->systems[$j]->hideEW($turn);
			}
			for ($k = sizeof($this->primary->systems[$j]->powers)-1; $k >= 0; $k--){
				if ($this->primary->systems[$j]->powers[$k]->turn == $turn){
					array_splice($this->primary->systems[$j]->powers, $k, 1);
				} else break;
			}
		}
	}

	public function hideFireOrders($turn){
		for ($j = 0; $j < sizeof($this->structures); $j++){
			for ($k = 0; $k < sizeof($this->structures[$j]->systems); $k++){
				for ($l = sizeof($this->structures[$j]->systems[$k]->fireOrders)-1; $l >= 0; $l--){
					if ($this->structures[$j]->systems[$k]->fireOrders[$l]->turn == $turn){
						array_splice($this->structures[$j]->systems[$k]->fireOrders, $l, 1);
					} else break;
				}
			}
		}
	}

	public function hideActions(){;
		for ($i = sizeof($this->actions)-1; $i >= 0; $i--){
			if (!$this->actions[$i]->resolved){
				array_splice($this->actions, $i, 1);
			}
		}
	}

	public function getBaseImpulse(){
		return $this->baseImpulse;
	}

	public function setCurrentImpulse($turn, $phase){
		//if (!$this->flight){return;}
		//Debug::log("id: ".$this->id);
		$impulse = $this->currentImpulse;
		//Debug::log("c ".$this->currentImpulse);
		if ($turn == $this->available){
			//Debug::log("launchTurn");
			$impulse = $this->getBaseImpulse();
		}
		$step = $this->getImpulseStep();
			//Debug::log("step: ".$step);

		for ($i = 0; $i < sizeof($this->actions); $i++){
			if (!$this->actions[$i]->resolved){continue;}
			if ($this->actions[$i]->type == "speed"){
				//Debug::log("add: ".$$step*$this->actions[$i]->dist);
				$impulse += $step*$this->actions[$i]->dist;
			}
		}
		//Debug::log("end: ".$this->currentImpulse);
		$this->currentImpulse = $impulse;
	}

	public function getCurrentImpulse(){
		//Debug::log("getCurrentImpulse #".$this->id);
		return $this->currentImpulse;
	}

	public function setRemainingImpulse($turn){
		if (sizeof($this->actions) && $this->actions[sizeof($this->actions)-1]->turn == $turn){
			$this->remainingImpulse = 0;
		}
		else { 
			$this->remainingImpulse = $this->getCurrentImpulse();
		}
	}

	public function getEndState($turn){
		//Debug::log("getMoveState for ".$this->id);
		$delay = $this->remainingDelay;
		$facing = $this->facing;
		for ($i = 0; $i < sizeof($this->actions); $i++){
			if ($this->actions[$i]->turn < $turn){continue;}
			if ($delay && $this->actions[$i]->type == "move"){
				$delay = max(0, $delay - $this->actions[$i]->dist);
			} else if ($this->actions[$i]->type == "turn"){
				$delay += $this->actions[$i]->delay;
				$facing += $this->actions[$i]->a;
			} else if ($this->actions[$i]->type == "deploy"){
				$facing += $this->actions[$i]->a;
			} else if ($this->actions[$i]->type == "jump"){
				$facing += $this->actions[$i]->a;
			}
		}

		if ($facing > 360){
			$facing -= 360;
		}
		else if ($facing < 0){
			$facing += 360;
		}

		//Debug::log("getMoveState for ".get_class($this)." #".$this->id." current facing ".$this->facing.", now: ".$facing);

		return array("id" => $this->id, "x" => $this->actions[sizeof($this->actions)-1]->x, "y" => $this->actions[sizeof($this->actions)-1]->y, "delay" => $delay, "facing" => $facing, "thrust" => $this->currentImpulse);
	}

	public function setRemainingDelay($turn){
		$delay = 0;

		for ($i = 0; $i < sizeof($this->actions); $i++){
			if (!$this->actions[$i]->resolved){continue;}
			if ($delay && $this->actions[$i]->type == "move"){
				$delay = max(0, $delay - $this->actions[$i]->dist);
			} else if ($this->actions[$i]->type == "turn"){
				$delay += $this->actions[$i]->delay;
			}
		}

		$this->remainingDelay = $delay;
	}

	public function addLoadout($dbLoad){ // [4, 17, 17]
		$chunk = array();
		$chunk[] = $dbLoad[0];

		//if (get_class($this) == "Demos"){
		//	var_export($dbload);
		//	$this->getSystemById($chunk[sizeof($chunk)-1]["systemid"])->adjustLoad($chunk);
		//}

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
			$this->getBaseSystemById($fires[$i]->weaponid)->fireOrders[] = $fires[$i];
		}
	}

	public function addDamageDB($damages){
		for ($i = 0; $i < sizeof($damages); $i++){
			$this->applyDamage($damages[$i]);
		}
	}

	public function addPowerDB($powers){
		for ($i = 0; $i < sizeof($powers); $i++){
			//Debug::log("adding entry");
			$this->getBaseSystemById($powers[$i]->systemid)->addPowerEntry($powers[$i]);
		}
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

	public function setupForDamage($turn){
		$this->primary->setRemainingIntegrity();

		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->setBonusNegation($turn);
		}
	}

	public function applyDamage($dmg){
		$this->damaged = 1;

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($dmg->structureid == $this->structures[$i]->id){
				$this->structures[$i]->armourDmg += $dmg->armourDmg;

				if ($dmg->systemid == -1){
					$this->primary->addDamage($dmg);
					if ($this->primary->isDestroyed()){
						//Debug::log("destroying unit #".$this->id);
						$this->destroyed = 1;
					}
					return;
				}
				else {
					for ($i = 0; $i < sizeof($this->structures); $i++){
						if ($this->structures[$i]->id == $dmg->structureid){
							for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
								if ($this->structures[$i]->systems[$j]->id == $dmg->systemid){
									$this->structures[$i]->systems[$j]->addDamage($dmg);
									$this->primary->addDamage($dmg);
									if ($this->primary->isDestroyed()){
										//Debug::log("destroying unit #".$this->id);
										$this->destroyed = 1;
									}
									return;
								}
							}
						}
					}
				}
				for ($j = 0; $j < sizeof($this->primary->systems); $j++){
					if ($this->primary->systems[$j]->id == $dmg->systemid){
						$this->primary->systems[$j]->addDamage($dmg);
						$this->primary->addDamage($dmg);
						if ($this->primary->isDestroyed()){
							//Debug::log("destroying unit #".$this->id);
							$this->destroyed = 1;
						}
						return;
					}
				}
			}
		}

		Debug::log("WARNING couldnt apply damage: #.".$dmg->id);
	}

	public function doUnpowerAllSystems($turn){
		debug::log("doUnpowerAllSystems");
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				$this->structures[$i]->systems[$j]->doUnpower($turn);
			}
		}
	}

	public function doUncommandShip(){
		$this->disabled = 1;
		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			$this->primary->systems[$i]->locked = 1;
		}
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				$this->structures[$i]->systems[$j]->locked = 1;
			}
		}
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
		if ($this->destroyed){
			return true;
		}
		else if ($this->getSystemByName("Reactor")->destroyed){
			$this->destroyed = 1;
			$this->status = "destroyed";
			return true;
		}
		else if ($this->getSystemByName("Bridge")->destroyed){
			$this->destroyed = 1;
			$this->status = "destroyed";
			return true;
		}
		return false;
	}	

	public function isCloseCombat($id){
		for ($i = 0; $i < sizeof($this->cc); $i++){
			if ($this->cc[$i] == $id){
				//Debug::log("close combat! ".$this->id."/".$fire->shooterid);
				return true;
			}
		}
		return false;
	}

	public function getTotalMass(){
		$data = array();

		$hangar = 0;
		$main = $this->primary->integrity;
		$guns = 0;
		$int = 0;

		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			$int += $this->primary->systems[$i]->mass;
		}

		foreach ($this->structures as $struct){
			foreach ($struct->systems as $sys){
				if ($sys->utility){
					$hangar += $sys->mass;
				} else $guns += $sys->mass;
			}
		}

		return array($main, $int, $guns, $hangar);
	}

	public function resolveFireOrder($fire){
		Debug::log("resolveFireOrder - ID ".$fire->id.", shooter: ".get_class($fire->shooter)." #".$fire->shooterid." vs ".get_class($fire->target)." #".$fire->targetid.", w: ".get_class($fire->weapon)." #".$fire->weaponid.", shots: ".$fire->shots);

		if ($this->isDestroyed()){
			Debug::log("ERROR - resolveFireOrder isDestroyed()");
			$fire->resolved = 1;
		}
		else {
			$fire->cc = $this->isCloseCombat($fire->shooter->id);
			$fire->dist = $this->getHitDist($fire);
			$fire->angle = $this->getImpactAngle($fire);
			$fire->section = $this->getHitSection($fire);

			$this->rollToHit($fire);
			$this->determineHits($fire);

			$fire->resolved = 1;
		}
	}

	public function rollToHit($fire){
		for ($i = 0; $i < $fire->shots; $i++){
			$roll = mt_rand(1, 100);
			$fire->rolls[] = $roll;
			$fire->notes .= $roll.";";
		}
		return true;
	}

	public function determineHits($fire){
		$fire->req = $this->calculateToHit($fire);

		for ($i = 0; $i < sizeof($fire->rolls); $i++){
			if ($fire->target->destroyed){
				Debug::log("aborting shot resolution vs dead target #".$this->id);
			}
			else  if ($fire->rolls[$i] <= $fire->req){
				$fire->hits++;
				$fire->weapon->doDamage($fire, $fire->rolls[$i], $this->getHitSystem($fire));
			}
		}
	}

	public function calculateToHit($fire){
		//return 100;

		if ($fire->shooter->salvo){
			return ceil(90 * (1-($fire->weapon->getTraverseMod($fire)*0.2)));
		}

		$multi = 1;
		$req = 0;
		
		$base = $this->getHitChance($fire);
		$traverse = $fire->weapon->getTraverseMod($fire);
		$traverse = 1-($traverse*0.2);
		$range = $fire->weapon->getAccuracyLoss($fire);

		$multi += $fire->shooter->getOffensiveBonus($this->id);
		//Debug::log($multi);
		$multi += $this->getImpulseProfileMod($fire);
		//Debug::log($multi);
		$multi -= $this->getDefensiveBonus($fire->shooter->id);
		//Debug::log($multi);

		$req = $base * $multi * $traverse - $range;
		//Debug::log("CALCULATE TO HIT - angle: ".$fire->angle.", base: ".$base.", trav: ".$traverse.", total multi: ".$multi.", dist/range: ".$fire->dist."/".$range.", req: ".$req);

		return ceil($req);
	}

	public function getArmour($fire, $system){
		return $this->getStruct($fire->section)->getArmourValue($system);
	}

	public function getOverKillSystem($fire){
		return true;
	}

	public function getHitSystem($fire){
		//return $this->getPrimaryHitSystem();
		//Debug::log("getHitSystem ".$this->name);
		$roll;
		$current = 0;
		$main = $this->primary->getHitChance();// * $this->getShipTypeMod();
		//Debug::log("main: ".$main);
		$total = $main;

		$struct = $fire->target->getStruct($fire->section);

		for ($i = 0; $i < sizeof($struct->systems); $i++){
			if ($struct->systems[$i]->destroyed){continue;}
			$total += $struct->systems[$i]->getHitChance();
			//Debug::log("adding: ".$struct->systems[$i]->name." for ".$struct->systems[$i]->getHitChance());
		}

		//Debug::log("total: ".$total);

		$roll = mt_rand(0, $total);
		//Debug::log("roll: ".$roll);
		$current += $main;
		if ($roll <= $current){
			//Debug::log($roll.", get primary system");
			return $this->getPrimaryHitSystem();
		}
		else {
			for ($i = 0; $i < sizeof($struct->systems); $i++){
				if (!$struct->systems[$i]->destroyed){
					$current += $struct->systems[$i]->getHitChance();
					//Debug::log("current: ".$current);
					if ($roll <= $current){
						//Debug::log("EXTERNAL HIT: ".$struct->systems[$i]->name." #".$struct->systems[$i]->id);
						return $struct->systems[$i];
					}
				}
			}
		}
		//Debug::log("ERROR getHitSystem()");
	}

	public function getPrimaryHitSystem(){
		Debug::log("getPrimaryHitSystem: #".$this->id);
		$roll;
		$current = 0;
		$total = $this->primary->getHitChance();
		$fraction = round($this->primary->remaining / $this->primary->integrity, 3);
		Debug::log("main: ".$total."/".$this->primary->integrity." => ".$fraction. " %");
		$valid = array();

		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			if (! $this->primary->systems[$i]->destroyed){
				if ($this->isExposed($fraction, $this->primary->systems[$i])){
					$valid[] = $this->primary->systems[$i];
				}
			}
		}

		if (!sizeof($valid)){
			Debug::log("hitting main structure");
			return $this->primary;
		}

		//Debug::log("valid:".sizeof($valid));

		for ($i = 0; $i < sizeof($valid); $i++){
			$total += $valid[$i]->getHitChance();
		}
		$roll = mt_rand(0, $total);
		$current += $this->primary->getHitChance();
		//Debug::log("roll: ".$roll.", all: ".$total);

		if ($roll <= $current){
			Debug::log("roll:".$roll.", current: ".$current.", HITTING main structure");
			return $this->primary;
		}
		else {
			//Debug::log("hitting internal");
			for ($i = 0; $i < sizeof($valid); $i++){
				$current += $valid[$i]->getHitChance();
				//Debug::log("current: ".$current);
				if ($roll <= $current){
					Debug::log("roll .".$roll.", current: ".$current.", HITTING non main structure HIT --- ".$valid[$i]->name." #".$valid[$i]->id.", odds: ".$valid[$i]->getHitChance()."/".$total);
					return $valid[$i];
				}
			}
		}
	}

	public function isExposed($fraction, $system){
		if ($fraction <= $this->getHitTreshold($system)){
			return true;
		}
		return false;
	}

	public function getHitChance($fire){
		$angle = $fire->angle;

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

		return $sub;
	}

	public function getBaseHitChance(){
		return $this->baseHitChance;
	}

	public function getImpulseProfileMod($fire){
		if (!$fire->shooter->ship || !$fire->target->ship){
			//Debug::log("shooter or target is NOT A SHIP -> no impulse mod");
			return 0;
		}

		$now = $this->getCurrentImpulse();
		$stock = $this->getBaseImpulse();

		$ratio = $now/$stock;
		if ($ratio == 1){
			return 0;
		} else return (1-$ratio)/2;

		//return 1+((($this->getBaseImpulse() / $this->getCurrentImpulse())-1)/2);
	}

	public function getOffensiveBonus($id){
		for ($i = 0; $i < sizeof($this->locks); $i++){
			if ($this->locks[$i][0] == $id){
				return $this->locks[$i][1];
			}
		} return 0;
	}	

	public function getDefensiveBonus($id){
		for ($i = 0; $i < sizeof($this->masks); $i++){
			if ($this->masks[$i][0] == $id){
				return $this->masks[$i][1];
			}
		} return 0;
	}

	public function getCurrentPosition(){
		for ($i = sizeof($this->actions)-1; $i >= 0; $i--){
			if ($this->actions[$i]->resolved == 1){
				return new Point($this->actions[$i]->x, $this->actions[$i]->y);
			}
		}
		return new Point($this->x, $this->y);
	}

	public function getLatestPosition(){
		return $this->actions[sizeof($this->actions)-1];
	}

	public function getFacing(){
		return $this->facing;
	}

	public function setFacing(){
		for ($i = 0; $i < sizeof($this->actions); $i++){
			//if ($this->actions[$i]->type == "turn"){
				$this->facing += $this->actions[$i]->a;
			//}
		}

		if ($this->facing > 360){
			$this->facing -= 360;
		} else if ($this->facing < 0){
			$this->facing += 360;
		}
		
		//Debug::log("setting facing for: #".$this->id.": ".$thia->facing);
	}

	public function getHitDist($fire){
		if ($fire->cc){
			return 0;
		}
		
		for ($i = 0; $i < sizeof($this->distances); $i++){
			if ($this->distances[$i][0] == $fire->shooter->id){
				return $this->distances[$i][1];
			}
		}

		Debug::log("ERROR got no DIST set on ".$this->id." targeted by #".$fire->shooter->id);
		
		$tPos = $this->getCurrentPosition();
		$sPos = $fire->shooter->getCurrentPosition();
		return Math::getDist($tPos->x, $tPos->y, $sPos->x, $sPos->y);
	}

	public function getImpactAngle($fire){
		if ($fire->cc){
			$angle = $fire->shooter->getFireAngle($fire);
			return $angle;
		}
		
		for ($i = 0; $i < sizeof($this->angles); $i++){
			if ($this->angles[$i][0] == $fire->shooter->id){
				return $this->angles[$i][1];
			}
		}

		Debug::log("got no ANGLE set on ".$this->id." targeted by #".$fire->shooter->id);
	}

	public function getHitSection($fire){
		if ($fire->cc && $fire->shooter->flight){
			return $this->structures[mt_rand(0, sizeof($this->structures)-1)]->id;
		}

		$locs = array();
		$fire->angle = Math::addAngle($this->facing, $fire->angle);
		//Debug::log("angle: ".$fire->angle.", facing: ".$this->facing." => to adjusted: ".$adjusted);
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (Math::isInArc($fire->angle, $this->structures[$i]->start, $this->structures[$i]->end)){
				$locs[] = $this->structures[$i]->id;
			}
		}
		return $locs[mt_rand(0, sizeof($locs)-1)];
	}


	public function getFireAngle($fire){
		return mt_rand(0, 359);
	}

	public function testForCrits($turn){
		//Debug::log("= testForCrits for ".$this->name.", #".$this->id.", turn: ".$turn);

		$all = 0;

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				if (!$this->structures[$i]->systems[$j]->damaged){continue;}
				if ($this->structures[$i]->systems[$j]->destroyed){
					if (mt_rand(0, 1) && $this->structures[$i]->systems[$j]->isDestroyedThisTurn($turn, 0)){

						$overload = $this->structures[$i]->systems[$j]->getPowerUsage($turn);
						$all += $overload;
						$this->structures[$i]->systems[$j]->damages[sizeof($this->structures[$i]->systems[$j]->damages)-1]->notes .= "o".$overload.";";
					}
				}

				if ($this->structures[$i]->systems[$j]->destroyed){continue;}
				$this->structures[$i]->systems[$j]->testCrit($turn, 0);
			}
		}

		for ($j = 0; $j < sizeof($this->primary->systems); $j++){
			if ($this->primary->systems[$j]->destroyed){continue;}
			if (!$this->primary->systems[$j]->damaged){continue;}

			$this->primary->systems[$j]->testCrit($turn, 0);
		}


		if ($all){
			Debug::log("potential total power spike for unit #".$this->id.": ".$all);
			for ($j = 0; $j < sizeof($this->primary->systems); $j++){
				if ($this->primary->systems[$j]->name == "Reactor"){
					$this->primary->systems[$j]->applyPowerSpike($turn, $all);
					return;
				}
			}
		}
	}

	public function addSystem($obj){
		$obj->id = sizeof($this->systems)+1;
		$obj->parentid = $this->id;

		$this->systems[] = $obj;
	}

	public function getStruct($id){
		//Debug::log("looking for: ".$id);
		for ($i = 0; $i < sizeof($this->structures); $i++){
			//Debug::log("now: ".$this->structures[$i]->id);
			if ($this->structures[$i]->id == $id){
				return $this->structures[$i];
			}
		}
	}

	public function getBaseSystemById($id){
		//Debug::log("looking for id ".$id);
		if ($this->ship){
			for ($i = 0; $i < sizeof($this->primary->systems); $i++){
				if ($this->primary->systems[$i]->id == $id){
					return $this->primary->systems[$i];
				}
			}
		}
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

	public function getSystemByStructure($id, $systemid){
		if ($id == -1){
			for ($i = 0; $i < sizeof($this->primary->systems); $i++){
				if ($this->primary->systems[$i]->id == $systemid){
					return $this->primary->systems[$i];
				}
			}
		}
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->id == $id){
				for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
					if ($this->structures[$i]->systems[$j]->id == $systemid){
						return $this->structures[$i]->systems[$j];
					}
				}
			}
		}
	}

	public function getSystemById($id){
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
					if ($this->structures[$i]->systems[$j]->id == $id){
						return $this->structures[$i]->systems[$j]->getActiveSystem();
					}
				}
			}
		}
	}

	public function getSystemByName($name){
		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			if ($this->primary->systems[$i]->name == $name){
				return $this->primary->systems[$i];
			}
		}
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				if ($this->structures[$i]->systems[$j]->name == $name){
					return $this->structures[$i]->systems[$j];
				}
			}
		}
	}

	public function getInternals(){
		$sum = 0;
		foreach ($this->primary->systems as $system){
			$sum += $system->integrity;
		}
		return $sum;
	}

	public function getWeapons(){
		$mass = 0;

		for ($j = 0; $j < sizeof($this->structures); $j++){
			for ($k = 0; $k < sizeof($this->structures[$j]->systems); $k++){
				if (is_a($this->structures[$j]->systems[$k], "Hangar")){
					continue;
				}
				$mass += $this->structures[$j]->systems[$k]->mass;
			}
		}
		return $mass;
	}

	public function getArmourLog(){
		$data = array(
			"integrity" => 0,
			"negation" => array()
		);

		$total = 0;

		foreach ($this->structures as $struct){
			$data["integrity"] += $struct->integrity;
			$data["negation"][] = $struct->negation;
		}
		return $data;
	}

	public function getStructure(){
		return $this->primary->integrity;
	}

	public function getEP(){
		for ($j = 0; $j < sizeof($this->primary->systems); $j++){
			if ($this->primary->systems[$j]->name == "Engine"){
				return $this->primary->systems[$j]->output;
			}
		}
	}

	public function getActiveLocks($turn){
		$sensor = $this->getSystemByName("Sensor");
		$str = $sensor->getOutput($turn);
		$ew = $sensor->ew[sizeof($sensor->ew)-1];
	}

	public function getNewCrits($turn){
		$crits = array();
		if (!$this->damaged){return $crits;}

		for ($k = 0; $k < sizeof($this->primary->systems); $k++){
			for ($l = 0; $l < sizeof($this->primary->systems[$k]->crits); $l++){
				if ($this->primary->systems[$k]->crits[$l]->new){
					$crits[] = $this->primary->systems[$k]->crits[$l];
				}// else break;
			}
		}

		for ($j = 0; $j < sizeof($this->structures); $j++){
			for ($k = 0; $k < sizeof($this->structures[$j]->systems); $k++){
				for ($l = 0; $l < sizeof($this->structures[$j]->systems[$k]->crits); $l++){
					if ($this->structures[$j]->systems[$k]->crits[$l]->new){
						$crits[] = $this->structures[$j]->systems[$k]->crits[$l];
					}// else break;
				}
			}
		}
		return $crits;
	}

	public function getNewDamages($turn){
		$dmgs = array();
		if (!$this->damaged){return $dmgs;}

		if ($this->primary->damages){
			for ($i = 0; $i < sizeof($this->primary->damages); $i++){
				if ($this->primary->damages[$i]->new){
					$dmgs[] = $this->primary->damages[$i];
				}
			}
		}
		
		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			if (!$this->primary->systems[$i]->damaged){continue;}
			for ($j = 0; $j < sizeof($this->primary->systems[$i]->damages); $j++){
				if ($this->primary->systems[$i]->damages[$j]->new){
					$dmgs[] = $this->primary->systems[$i]->damages[$j];
				}
			}
		}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				if (!$this->structures[$i]->systems[$j]->damaged){continue;}
				for ($k = 0; $k < sizeof($this->structures[$i]->systems[$j]->damages); $k++){
					if ($this->structures[$i]->systems[$j]->damages[$k]->new){
						$dmgs[] = $this->structures[$i]->systems[$j]->damages[$k];
					}
				}
			}
		}
		return $dmgs;
	}

	public function getHitTreshold($system){
		return $this->hitTable[$system->name];
	}

	public function getShipTypeMod(){
		return 1;
	}

	public function getLockMultiplier(){
		return 0.5;
	}

	static function getKit(){
	return array(
		"id" => 0,
		"name" => "",
		"cost" => static::$value,
		"gameid" => 0,
		"userid" => 0,
		"upgrades" => 
			array(
			)
		);
	}
}


class UltraHeavy extends Ship {
	public $baseImpulse = 130;
	public $traverse = 3;
	
	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes){
        parent::__construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes);

		$this->hitTable = array(
			"Bridge" => 0.35,
			"Engine" => 0.85,
			"Sensor" => 0.9,
			"Reactor" => 0.75
		);
	}
}

class SuperHeavy extends Ship {
	public $baseImpulse = 145;
	public $traverse = 2;
	
	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes){
        parent::__construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes);

		$this->hitTable = array(
			"Bridge" => 0.5,
			"Engine" => 0.85,
			"Sensor" => 0.9,
			"Reactor" => 0.7
		);
	}
}

class Heavy extends Ship {
	public $baseImpulse = 160;
	public $traverse = 1;
	
	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes){
        parent::__construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes);

		$this->hitTable = array(
			"Bridge" => 0.55,
			"Engine" => 0.8,
			"Sensor" => 0.9,
			"Reactor" => 0.65
		);
	}
}

class Medium extends Ship {
	public $baseImpulse = 175;
	public $traverse = 0;

	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes){
        parent::__construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes);

		$this->hitTable = array(
			"Bridge" => 0.65,
			"Engine" => 0.8,
			"Sensor" => 1,
			"Reactor" => 0.7
		);
	}

	public function getShipTypeMod(){
		return 1.15;
	}
}

class Light extends Ship {
	public $baseImpulse = 190;
	public $traverse = -1;
	
	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes){
        parent::__construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes);

		$this->hitTable = array(
			"Bridge" => 0.5,
			"Engine" => 0.8,
			"Sensor" => 1,
			"Reactor" => 0.7
		);
	}

	public function getShipTypeMod(){
		return 1.3;
	}
}

class SuperLight extends Ship {
	public $baseImpulse = 200;
	public $traverse = -2;
	
	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes){
        parent::__construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes);

		$this->hitTable = array(
			"Bridge" => 0.85,
			"Engine" => 1,
			"Sensor" => 1,
			"Reactor" => 0.9
		);
	}	

	public function getShipTypeMod(){
		return 1.45;
	}
}

?>
