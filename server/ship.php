<?php

class Ship {
	public $id;
	public $userid;
	public $available;
	public $call;
	public $status;
	public $destroyed;
	public $x;
	public $y;
	public $facing;
	public $delay;
	public $thrust;
	public $rolling;
	public $rolled;

	public $disabled = false;

	public $baseHitChance;
	public $remainingDelay;
	public $currentImpulse;
	public $flipping = 0;
	public $remainingImpulse;
	public $baseImpulse;
	public $impulseHitMod = 0;

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
	public $squad = false;
	public $traverse = 0;
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
	public $slipAngle = 15;
	public $turnStep = 1;
	public $baseTurnDelay;
	public $baseImpulseCost;
	public $hitTable;
	public $cc = array();
	public $damaged = 0;
	public $moveSet = 0;

	public $ep = 0;
	public $ew = 0;
	public $power = 0;

	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
		$this->id = $id;
		$this->userid = $userid;
		$this->available = $available;
		$this->call = $call;
		$this->status = $status;
		$this->destroyed = $destroyed;
		$this->x = $x;
		$this->y = $y;
		$this->facing = $facing;
		$this->remainingDelay = $delay;
		$this->currentImpulse = $thrust;
		$this->rolling = $rolling;
		$this->rolled = $rolled;
		$this->notes = $notes;
	}

	public function addAllSystems(){
		$this->addPrimary();
		$this->addStructures();
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, $this->integrity);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, $this->vitalHP, static::$value);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, $this->vitalHP, $this->ep);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, $this->vitalHP, $this->ew);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, $this->vitalHP);
	}

	public function getId(){
		$this->index++;
		return $this->index;
	}

	public function setPreviewState($turn, $phase){
		$this->currentImpulse = $this->baseImpulse;
		$this->getSystemByName("Reactor")->setOutput($this->getPowerReq(), $this->power);

		for ($j = 0; $j < sizeof($this->structures); $j++){
			$this->structures[$j]->remNegation = $this->structures[$j]->negation;
		}
	}

	public function setUnitState($turn, $phase){
		//Debug::log("ship setUnitState #".$this->id."/".$this->display);

		$this->setBaseStats($turn, $phase);
		$this->setStructureState($turn, $phase);
		$this->setProps($turn, $phase);

		for ($i = 0; $i < sizeof($this->primary->systems); $i++){ // check primary criticals
			$this->primary->systems[$i]->setState($turn, $phase);
			switch ($this->primary->systems[$i]->name){
				case "Bridge":
					if ($this->primary->systems[$i]->destroyed || $this->primary->systems[$i]->disabled){
						$this->doUncommandShip($turn);
					}
					break;
				case "Reactor":
					if ($this->primary->systems[$i]->destroyed){
						$this->destroyed = 1;
					}
					else if ($this->primary->systems[$i]->disabled){
						$this->doUnpowerAllSystems($turn);
					}
					break;
			}
		}

		$this->getSystemByName("Engine")->setPowerReq($this->mass);
		$this->getSystemByName("Reactor")->setOutput($this->getPowerReq(), $this->power);

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				$rem = $this->structures[$i]->getRemNegation();
				$this->structures[$i]->systems[$j]->setState($turn, $phase);
				$this->structures[$i]->systems[$j]->setArmourData($rem);
			}
		}

		$this->setCrewBoosts($turn);
		$this->isDestroyed();

		return true;
	}

	public function setCrewBoosts($turn){
		$bridge = $this->getSystemByName("Bridge");
		for ($i = 0; $i < sizeof($bridge->loads); $i++){
			if (!$bridge->loads[$i]["amount"]){continue;}
			$target = $this->getSystemByName($bridge->loads[$i]["name"]);
			for ($j = 0; $j < $bridge->loads[$i]["amount"]; $j++){
				$target->powers[] = new Power(0, $this->id, 0, $turn, 2, 0);
			}
		}
	}

	public function setStructureState($turn, $phase){
		$main = $this->primary->integrity;
		//$multi = $this->getArmourMultiplier() + 1;
		$multi = 4;
		$elements = sizeof($this->structures);
		$each = $main * $multi / $elements;

		for ($i = 0; $i < sizeof($this->structures); $i++){ // 
			$this->structures[$i]->setNegation($each, 0);
		}
	}

	public function getArmourMultiplier(){
		return pow(1.2, $this->traverse+3);
	}

	public function setProps($turn, $phase){
		//Debug::log("setProps ".get_class($this)." #".$this->id);
		$this->cost = static::$value;
		$this->setCurSpeed($turn, $phase);
		$this->setRemImpulse($turn);
		$this->setRemDelay($turn);
		$this->setSpecialActionState($turn, $phase);
	}

	public function setPosition(){
		for ($i = sizeof($this->actions)-1; $i >= 0; $i--){
			if ($this->actions[$i]->resolved){
				$this->x = $this->actions[$i]->x;
				$this->y = $this->actions[$i]->y;
				return;
			}
		}
	}

	public function setBaseStats($phase, $turn){
		$this->baseHitChance = Math::getBaseHitChance($this->mass);
		$this->baseTurnDelay = Math::getBaseTurnDelay($this->mass);
	}

	public function getImpulseStep(){
			return floor($this->getBaseImpulse() / 8);
	}

	public function hidePowers($turn){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = sizeof($this->structures[$i]->powers)-1; $j >= 0; $j--){
				if ($this->structures[$i]->powers[$j]->turn == $turn){
					array_splice($this->structures[$i]->powers, $j, 1);
				} else break;
			}
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				for ($k = sizeof($this->structures[$i]->systems[$j]->powers)-1; $k >= 0; $k--){
					if ($this->structures[$i]->systems[$j]->powers[$k]->turn == $turn){
						if ($this->structures[$i]->systems[$j]->powers[$k]->type == 0){
							$this->structures[$i]->systems[$j]->disabled = 0;
						}
						array_splice($this->structures[$i]->systems[$j]->powers, $k, 1);
					} else break;
				}
			}
		}
		//if (!$this->ship){return;}

		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			if ($this->primary->systems[$i]->name == "Sensor"){
				$this->primary->systems[$i]->hideEW($turn);
			}
			for ($j = sizeof($this->primary->systems[$i]->powers)-1; $j >= 0; $j--){
				if ($this->primary->systems[$i]->powers[$j]->turn == $turn && $this->primary->systems[$i]->powers[$j]->type != 2){
					array_splice($this->primary->systems[$i]->powers, $j, 1);
				} else break;
			}
		}
	}

	public function hideFireOrders($turn, $phase){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($k = 0; $k < sizeof($this->structures[$i]->systems); $k++){
				for ($l = sizeof($this->structures[$i]->systems[$k]->fireOrders)-1; $l >= 0; $l--){
					if ($this->structures[$i]->systems[$k]->fireOrders[$l]->turn == $turn && $this->structures[$i]->systems[$k]->usage == $phase){
						array_splice($this->structures[$i]->systems[$k]->fireOrders, $l, 1);
					} else break;
				}
			}
		}
	}
	
	public function hideActions(){;
		for ($i = sizeof($this->actions)-1; $i >= 0; $i--){
			if (!$this->actions[$i]->resolved){
				if ($this->actions[$i]->type == "roll"){$this->rolling = !$this->rolling;}
				array_splice($this->actions, $i, 1);
			}
		}
	}

	public function getBaseImpulse(){
		return $this->baseImpulse;
	}

	public function setCurSpeed($turn, $phase){
		$impulse = $this->currentImpulse;
		if ($turn == $this->available){
			$impulse = $this->getBaseImpulse();
		}
		$step = $this->getImpulseStep();

		for ($i = 0; $i < sizeof($this->actions); $i++){
			if (!$this->actions[$i]->resolved){continue;}
			if ($this->actions[$i]->type == "speed"){
				$impulse += $step*$this->actions[$i]->dist;
			}
		}
		$this->currentImpulse = $impulse;
	}

	public function getCurSpeed(){
		//Debug::log("getCurSpeed #".$this->id);
		return $this->currentImpulse;
	}

	public function setRemImpulse($turn){
		if (sizeof($this->actions) && $this->actions[sizeof($this->actions)-1]->turn == $turn){
			$this->remainingImpulse = 0;
		}
		else { 
			$this->remainingImpulse = $this->getCurSpeed();
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
			} else if ($this->actions[$i]->type == "jumpIn"){
				$facing += $this->actions[$i]->a;
			} else if ($this->actions[$i]->type == "flip"){
				$facing += 180;
			}
		}

		if ($facing > 360){
			$facing -= 360;
		}
		else if ($facing < 0){
			$facing += 360;
		}

		//Debug::log("getMoveState for ".get_class($this)." #".$this->id." current facing ".$this->facing.", now: ".$facing);

		return array("id" => $this->id, "x" => $this->actions[sizeof($this->actions)-1]->x, "y" => $this->actions[sizeof($this->actions)-1]->y, "delay" => $delay, "facing" => $facing, "thrust" => $this->currentImpulse, "rolling" => $this->rolling, "rolled" => $this->rolled);
	}

	public function isRolling(){
		return $this->rolling;
	}

	public function isRolled(){
		return $this->rolled;
	}

	public function setRemDelay($turn){
		return;
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
		//echo $this->remainingDelay;
	}

	public function setSpecialActionState($turn, $phase){
		for ($i = 0; $i < sizeof($this->actions); $i++){
			if ($this->actions[$i]->type == "flip"){
				$this->flipping = !$this->flipping;
			}
			else if ($this->actions[$i]->type == "roll"){
				$this->rolling = !$this->rolling;
			}
		}
	}

	public function addLoadout($dbLoad){
		$chunk = array();
		$chunk[] = $dbLoad[0];

		for ($i = 1; $i < sizeof($dbLoad); $i++){
			if ($dbLoad[$i]["systemid"] != $chunk[sizeof($chunk)-1]["systemid"]){
				$this->getSystem($chunk[sizeof($chunk)-1]["systemid"])->adjustLoad($chunk);
				$chunk = array();
				$chunk[] = $dbLoad[$i];
			}
			else {
				$chunk[] = $dbLoad[$i];
			}
		}
		//var_export($chunk); var_export($this->name); echo "</br></br>";
		$this->getSystem($chunk[sizeof($chunk)-1]["systemid"])->adjustLoad($chunk);

		return true;
	}

	public function addFireDB($fires){
		for ($i = 0; $i < sizeof($fires); $i++){
			//Debug::log("FIRE trying to add fire to ".$fires[$i]->weaponid ." on ".$this->id);
			$this->getSystem($fires[$i]->weaponid)->fireOrders[] = $fires[$i];
		}
	}

	public function addPowerDB($powers){
		for ($i = 0; $i < sizeof($powers); $i++){
			//if ($this->id == 15 && $powers[$i]->systemid == 14){Debug::log("adding");}
			//echo ($this->id.", ".get_class($this).", ".$powers[$i]->unitid."/".$powers[$i]->systemid);
			$this->getSystem($powers[$i]->systemid)->addPowerEntry($powers[$i]);
		}
	}

	public function addDamageDB($damages){
		for ($i = 0; $i < sizeof($damages); $i++){
			$this->applyDBDamage($damages[$i]);
		}
	}

	public function addCritDB($crits){
		for ($i = 0; $i < sizeof($crits); $i++){
			$found = 0;

			for ($j = 0; $j < sizeof($this->primary->systems); $j++){
				if ($this->primary->systems[$j]->id == $crits[$i]->systemid){
					$this->primary->systems[$j]->crits[] = $crits[$i];
					$found = 1;
					break;
				}
			}

			if ($found){
				continue;
			}

			for ($j = 0; $j < sizeof($this->structures); $j++){
				for ($k = 0; $k < sizeof($this->structures[$j]->systems); $k++){
					if ($this->structures[$j]->systems[$k]->id == $crits[$i]->systemid){
						$this->structures[$j]->systems[$k]->crits[] = $crits[$i];
						$found = 1;
						break 2;
					}
				}
			}

			if (!$found){
				Debug::log("ERROR unable to apply ship crit id: ".$crits[$i]->id);
			}
		}

		//return true;
		$bridge = $this->getSystemByName("Bridge");
		for ($i = 0; $i < sizeof($bridge->crits); $i++){
			for ($j = 0; $j < sizeof($this->primary->systems); $j++){
				if ($this->primary->systems[$j]->name == $bridge->crits[$i]->type){
					$copy = clone $bridge->crits[$i];
					$copy->type = "Officer KIA";
					$this->primary->systems[$j]->crits[] = $copy;
					$bridge->crits[$i]->type = "Officer KIA: ".$bridge->crits[$i]->type;
					break;
				}
			}
		}

		return true;
	}

	public function applyDamage($dmg){

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($dmg->structureid == $this->structures[$i]->id){
				$this->structures[$i]->armourDmg += $dmg->armourDmg;

				if ($dmg->systemid == 1){
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

		Debug::log("WARNING couldnt SHIP applyDamage: #".$dmg->id);
	}

	public function applyDBDamage($dmg){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($dmg->structureid == $this->structures[$i]->id){
				$this->structures[$i]->armourDmg += $dmg->armourDmg;

				if ($dmg->systemid == 1){
					$this->primary->addDamage($dmg);
					return;
				}

				for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
					if ($this->structures[$i]->systems[$j]->id == $dmg->systemid){
						$this->structures[$i]->systems[$j]->addDamage($dmg);
						$this->primary->addDamage($dmg);
						return;
					}
				}

				for ($j = 0; $j < sizeof($this->primary->systems); $j++){
					if ($this->primary->systems[$j]->id == $dmg->systemid){
						$this->primary->systems[$j]->addDamage($dmg);
						$this->primary->addDamage($dmg);
						return;
					}
				}
			}
		}

		Debug::log("WARNING couldnt apply SHIP applyDBDamage: #".$dmg->id);
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

	public function getRemIntegrity($fire){
		//Debug::log("ship getRemIntegrity, rem: ".$this->primary->remaining);
		$total = $this->primary->integrity;
		for ($i = 0; $i < sizeof($this->primary->damages); $i++){
			$total = $total - $this->primary->damages[$i]->structDmg;
		}
		//Debug::log("total: ".$total);
		return $total;
	}

	public function isDestroyed(){
		//Debug::log("isDestroyed()".get_class($this));
		$kill = 0;
		if ($this->destroyed){
			return true;
		}
		if ($this->primary->isDestroyed()){
			$kill = 1;
		}
		else if ($this->getSystemByName("Reactor")->destroyed){
			$kill = 1;
		}
		else if ($this->getSystemByName("Bridge")->destroyed){
			$kill = 1;
		}

		if ($kill){
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

	public function resolveFireOrder($fire){ // target
		if ($this->isDestroyed()){
			Debug::log("STOP - resolveFireOrder #".$fire->id.", TARGET: ".get_class($this)." isDestroyed()");
		}
		else if ($fire->weapon->aoe){
			Debug::log("resolveFireOrder AREA - #".$fire->id.", TARGET ".get_class($this)." #".$fire->targetid.", w: ".get_class($fire->weapon)." #".$fire->weaponid);

			$fire->section = $this->getHitSection($fire);
			DmgCalc::doDmg($fire, $this->getHitSystem($fire));

		}
		else {
			Debug::log("resolveFireOrder - #".$fire->id.", shooter: ".get_class($fire->shooter)." #".$fire->shooterid." vs ".get_class($this)." #".$fire->targetid.", w: ".get_class($fire->weapon)." #".$fire->weaponid.", shots: ".$fire->shots);

			$fire->cc = $this->isCloseCombat($fire->shooter->id);
			$fire->dist = $this->getHitDist($fire);
			$fire->angle = $this->getIncomingFireAngle($fire);
			$fire->section = $this->getHitSection($fire);

			$this->rollToHit($fire);
			$this->determineHits($fire);
			$fire->resolved = 1;
		}

		$fire->resolved = 1;
	}

	public function resolveAreaFireorder($fire){

		if ($this->isDestroyed()){
			Debug::log("STOP - resolveFireOrder ".get_class($this)." (target) isDestroyed() = true");
			$fire->resolved = 1;
		}
		else {
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

	public function determineHits($fire){ // target
		$fire->req = $fire->shooter->calculateToHit($fire);

		for ($i = 0; $i < sizeof($fire->rolls); $i++){
			if ($this->destroyed){
				Debug::log("ERROR aborting shot resolution vs dead target #".$this->id);
			}
			else  if ($fire->rolls[$i] <= $fire->req){
				$fire->hits++;
				DmgCalc::doDmg($fire, $this->getHitSystem($fire));
			}
		}
	}

	public function calculateToHit($fire){ // shooter
		//return 100;
		$multi = 1;
		$req = 0;
		
		$base = $fire->target->getHitChance($fire);
		$traverse = 1-($fire->weapon->getTraverseMod($fire) * 0.2);
		$range = $fire->weapon->getAccuracyLoss($fire);

		$multi += $this->getOffensiveBonus($fire->target->id); //Debug::log($multi);
		$multi -= $fire->target->getDefensiveBonus($this->id); //Debug::log($multi);
		$multi += $fire->target->getImpulseProfileMod($fire); //Debug::log($multi);

		$req = $base * $multi * $traverse - $range;
		//Debug::log("CALCULATE TO HIT - angle: ".$fire->angle.", base: ".$base.", trav: ".$traverse.", total multi: ".$multi.", dist/range: ".$fire->dist."/".$range.", req: ".$req);

		return ceil($req);
	}

	public function getArmour($fire, $system){
		return $this->getStruct($fire->section)->getArmourValue($system);
	}

	public function getOverkillSystem($fire){
		return true;
	}

	public function getFlashTargets($fire){
		$valid = array();
		$struct = $this->getStruct($fire->section);
		for ($i = 0; $i < sizeof($struct->systems); $i++){
			if ($struct->systems[$i]->destroyed){continue;}
			$valid[] = $struct->systems[$i];
		}
		return $valid;
	}

	public function getFlashOverkillSystem($fire){
		$valid = array();
		$struct = $this->getStruct($fire->section);
		for ($i = 0; $i < sizeof($struct->systems); $i++){
			if ($struct->systems[$i]->destroyed){continue;}
			$valid[] = $struct->systems[$i];
		}

		if (!sizeof($valid)){return $this->primary;}
		return $valid[mt_rand(0, sizeof($valid)-1)];
	}
	
	public function getFacingElement($fire){
		return $this->getStruct($fire->section);
	}

	public function getHitSystem($fire){
		//return $this->getSystemByName("Bridge");
		//return $this->getPrimaryHitSystem();
		//Debug::log("getHitSystem ".$this->name);
		$roll;
		$current = 0;
		$main = $this->primary->getHitChance();
		//Debug::log("main: ".$main);
		$total = $main;

		$struct = $this->getFacingElement($fire);

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
		//Debug::log("getPrimaryHitSystem: #".$this->id);
		$valid = array();
		$fraction = round($this->primary->remaining / $this->primary->integrity, 2);
		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			if ($this->primary->systems[$i]->destroyed){continue;}
			//if (!$this->isExposed($fraction, $this->primary->systems[$i])){continue;}
			$valid[] = $this->primary->systems[$i];
		}

		if (!sizeof($valid)){
			Debug::log("no internals -> MAIN");
			return $this->primary;
		}

		$roll;
		$current = 0;
		$total = $this->primary->getHitChance();

		for ($i = 0; $i < sizeof($valid); $i++){
			$total += $valid[$i]->getHitChance();
		}
		$roll = mt_rand(0, $total);
		$current += $this->primary->getHitChance();

		//Debug::log("roll: ".$roll.", all: ".$total);

		if ($roll <= $current){
			//Debug::log("roll ".$roll.", total: ".$total.", current ".$current.", HITTING main structure");
			return $this->primary;
		}
		else {
			//Debug::log("hitting internal");
			for ($i = 0; $i < sizeof($valid); $i++){
				$current += $valid[$i]->getHitChance();
				//Debug::log("current: ".$current);
				if ($roll <= $current){
					//Debug::log("roll ".$roll.", total:".$total.", current ".$current.", HITTING INTERNAL ".$valid[$i]->name." #".$valid[$i]->id.", odds: ".$valid[$i]->getHitChance()."/".$total);
					return $valid[$i];
				}
			}
		}
	}

	public function isExposed($fraction, $system){
		//return true;
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

	public function getLockEffect($target){
		if ($target->ship || $target->squad){
			return 0.5 + (0.08 * $this->traverse);
		}
		else if ($target->flight){
			return 1.5;
		}
		else if ($target->salvo){
			return 3;
		}
	}

	public function getMaskEffect($target){
		if ($target->ship || $target->squad){
			return 0.5 + (0.08 * $this->traverse);
		}
		else if ($target->flight){
			return 0;
		}
		else if ($target->salvo){
			return 0.33;
		}
	}
	public function setImpulseProfileMod(){
		$now = $this->getCurSpeed();
		$stock = $this->getBaseImpulse();

		$ratio = $now/$stock;
		if ($ratio != 1){
			$this->impulseHitMod =  (1-$ratio)/2;
		}
		return;

		//return 1+((($this->getBaseImpulse() / $this->getCurSpeed())-1)/2);
	}

	public function getImpulseProfileMod(){
		return $this->impulseHitMod;
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

	public function getCurPos(){
		for ($i = sizeof($this->actions)-1; $i >= 0; $i--){
			if ($this->actions[$i]->resolved == 1){
				return new Point($this->actions[$i]->x, $this->actions[$i]->y);
			}
		}
		return new Point($this->x, $this->y);
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
		
		$tPos = $this->getCurPos();
		$sPos = $fire->shooter->getCurPos();
		return Math::getDist($tPos->x, $tPos->y, $sPos->x, $sPos->y);
	}

	public function getIncomingFireAngle($fire){
		if ($fire->cc){
			if ($this->ship || $this->squad){
				return $fire->shooter->getFireAngle($fire);
			} else return 0;
		}
		
		for ($i = 0; $i < sizeof($this->angles); $i++){
			if ($this->angles[$i][0] == $fire->shooter->id){
				return $this->angles[$i][1];
			}
		}

		Debug::log("got no ANGLE set on ".$this->id." targeted by #".$fire->shooter->id);
	}

	public function getCurFacing(){
		$facing = $this->facing;
		for ($i = 0; $i < sizeof($this->actions); $i++){
			$facing += $this->actions[$i]->a;
		}
		return $facing;
	}

	public function getHitSection($fire){
		if ($fire->cc && $fire->shooter->flight){return $this->structures[mt_rand(0, sizeof($this->structures)-1)]->id;}
		$fire->angle = Math::addAngle($this->facing, $fire->angle);
		if ($this->rolled){$fire->angle = Math::getMirrorAngle($fire->angle);}

		$locs = array();
		//Debug::log("facing: ".$this->facing." => to adjusted: ".$fire->angle);
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (Math::isInArc($fire->angle, $this->structures[$i]->start, $this->structures[$i]->end)){
				$locs[] = $this->structures[$i]->id;
			}
		}
		return $locs[mt_rand(0, sizeof($locs)-1)];
	}

	public function handleCritTesting($turn){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->destroyed){continue;}
			$this->structures[$i]->singleCritTest($turn, 0);
		}
}

	public function addSystem($obj){
		$obj->id = sizeof($this->systems)+1;
		$obj->parentid = $this->id;

		$this->systems[] = $obj;
	}

	public function getStruct($id){
		//Debug::log("getStruct looking for: ".$id);
		for ($i = 0; $i < sizeof($this->structures); $i++){;
			if ($this->structures[$i]->id == $id){
				return $this->structures[$i];
			}
		}
	}

	public function getSystem($id){
		//if ($id == 14){Debug::log("ship getSystem looking for: ".$id);}
		if ($id == 1){
			return $this->primary;
		}
		else {
			for ($i = 0; $i < sizeof($this->primary->systems); $i++){
				if ($this->primary->systems[$i]->id == $id){
					return $this->primary->systems[$i];
				}
			}
			for ($i = 0; $i < sizeof($this->structures); $i++){
				if ($this->structures[$i]->id == $id){
					return $this->structures[$i];
				}
				for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
					if ($this->structures[$i]->systems[$j]->id == $id){
						//if ($id == 14){Debug::log("ding");}
						return $this->structures[$i]->systems[$j]->getActiveSystem();
					}
				}
			}
		}
		echo ("ERROR ship getSystem: ".$id." on unit #".$this->id."/".$this->display);
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

	public function getNewCrits($turn){
		$crits = array();

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

		if ($this->primary->damages){
			for ($i = 0; $i < sizeof($this->primary->damages); $i++){
				if ($this->primary->damages[$i]->new){
					$dmgs[] = $this->primary->damages[$i];
				}
			}
		}
		
		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			for ($j = 0; $j < sizeof($this->primary->systems[$i]->damages); $j++){
				if ($this->primary->systems[$i]->damages[$j]->new){
					$dmgs[] = $this->primary->systems[$i]->damages[$j];
				}
			}
		}

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
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

	public function getLockMultiplier(){
		return 0.5;
	}

	static function getKit($faction){
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

	public function setBonusNegation($turn){
		if ($this->salvo){return;}
		else if ($this->flight){return;}
		else {
			for ($i = 0; $i < sizeof($this->structures); $i++){
				$this->structures[$i]->setBonusNegation($turn);
			}
		}
	}

	public function addSubUnits($elements){
		return;
	}

	public function addMission($data, $userid, $turn, $phase){
		return;
	}
}

class Medium extends Ship {
	public $baseImpulse = 165;
	public $traverse = 0;
	public $slipAngle = 15;
	public $baseImpulseCost = 35;

	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
		parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);

		$this->hitTable = array(
			"Bridge" => 0.6,
			"Engine" => 0.8,
			"Sensor" => 1,
			"Reactor" => 0.6
		);
	}

	public function handleCritTesting($turn){
		//Debug::log("= handleCritTesting for ".$this->name.", #".$this->id.", turn: ".$turn);

		$potential = array();

		for ($i = 0; $i < sizeof($this->structures); $i++){
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				if (!$this->structures[$i]->systems[$j]->destroyed){
					$this->structures[$i]->systems[$j]->singleCritTest($turn, 0);
				}
				//else if (mt_rand(0, 1) && $this->structures[$i]->systems[$j]->isDestroyedThisTurn($turn)){
				else if ($this->structures[$i]->systems[$j]->isDestroyedThisTurn($turn)){
					$usage = $this->structures[$i]->systems[$j]->getPowerUsage($turn);
					$potential[] = $usage;
					$this->structures[$i]->systems[$j]->damages[sizeof($this->structures[$i]->systems[$j]->damages)-1]->notes .= "o".$usage.";";
				}
			}
		}

		for ($j = 0; $j < sizeof($this->primary->systems); $j++){
			if ($this->primary->systems[$j]->destroyed){continue;}

			$this->primary->systems[$j]->singleCritTest($turn, 0);
		}


		if (sizeof($potential) || $this->primary->emDmg){
			for ($j = 0; $j < sizeof($this->primary->systems); $j++){
				if ($this->primary->systems[$j]->name == "Reactor"){
					$this->primary->systems[$j]->applyPowerSpike($turn, $potential, $this->primary->emDmg);
					return;
				}
			}
		}
	}
}

class Heavy extends Medium {
	public $baseImpulse = 155;
	public $traverse = 1;
	//public $baseImpulseCost = 45;
	
	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
		parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}
}

class SuperHeavy extends Heavy {
	public $baseImpulse = 140;
	public $traverse = 2;
	//public $baseImpulseCost = 50;
	
	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
		parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}
}

class UltraHeavy extends SuperHeavy {
	public $baseImpulse = 130;
	public $traverse = 3;
	//public $baseImpulseCost = 55;
	
	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
		parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}
}

?>
