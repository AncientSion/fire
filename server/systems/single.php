<?php

class Single {
	public $id = 0;
	public $parentId = 0;
	public $integrity = 0;
	public $remaining = 0;
	public $newDmg = 0;
	public $recentDmg = 0;
	public $emDmg = 0;
	public $negation = 0;
	public $armourDmg = 0;
	public $destroyed = 0;
	public $disabled = 0;
	public $amount = 0;
	public $launch = 0;
	public $powerReq = 0;
	public $systems = array();
	public $damages = array();
	public $crits = array();
	public $powers = array();
	public $boostEffect = array();
	public $baseImpulse = 0;
	public $baseHitChance = 0;
	public $bonusNegation = 0;
	public $name = "";
	public $display = "";
	public $variant = "";
	public $rarity = 0;
	public $role = "";
	public $mass = 0;
	public $cost = 0;
	public static $value = 0;
	public $start = 0;
	public $end = 360;
	public $damaged = 0;
	public $traverse = 0;
	public $index = 0;
	public $system = false;
	public $squaddie = false;
	public $jamming = 0;
	public $turret = 0;
	
	public $critEffects =  array( // type, mag, dura, effect
		array("Disabled", 120, 0, 0.00),
	);

	function __construct($id, $parentId){
		$this->id = $id;
		$this->parentId = $parentId;

		$this->index = $this->id;
		$this->remaining = $this->integrity;
		$this->cost = static::$value;

		$this->setBaseStats(0, 0);
		$this->addSystems();		
		$this->setPowerOutput();
	}

	public function addTurretSystems($system, $turretId, $align){
		$system->turret = $turretId;
		$system->align = $align;
		$this->systems[] = $system;
	}

	public function addSubSystem($system, $align = 0){
		$this->systems[] = $system;
		$this->systems[sizeof($this->systems)-1]->align = $align;
	}

	public function getValue(){
		return static::$value;
	}

	public function getNewCrits($turn){
		$crits = array();

		for ($i = 0; $i < sizeof($this->crits); $i++){
			if ($this->crits[$i]->new){
				$crits[] = $this->crits[$i];
			}	
		}
		for ($i = 0; $i < sizeof($this->systems); $i++){
			for ($k = 0; $k < sizeof($this->systems[$i]->crits); $k++){
				if ($this->systems[$i]->crits[$k]->new){
					$crits[] = $this->systems[$i]->crits[$k];
				}
			}
		}

		return $crits;
	}

	public function getId(){
		$this->index++;
		return $this->index;
	}

	public function adjustLoad($dbLoad){
		//echo ("error adjust load: ".$this->display.", ".$this->parentId."\n");
		//Debug::log("error adjust load: ".$this->display.", ".$this->parentId.", target system: ".$dbLoad["systemid"]);
		//var_export($dbLoad);
		return;
	}

	public function addPowerEntry($power){
		$this->powers[] = $power;
	}

	public function setPowerOutput(){
		return;
	}

	public function getSubHitChance(){
		return $this->baseHitChance;
	}

	public function setMaxDmg($fire, $dmg){
		return $dmg;
	}

	public function getSystemByName($name){
		for ($i = 0; $i < sizeof($this->systems); $i++){
			if ($this->systems[$i]->name == $name){
				return $this->systems[$i];
			}
		}
	}

	public function getSystem($id){
		for ($i = 0; $i < sizeof($this->systems); $i++){
			if ($this->systems[$i]->id == $id){
				return $this->systems[$i];
			}
		}
	}

	public function setSingleJamming($turn){
		$jammer = $this->getSystemByName("Jammer");

		if (!$jammer || $jammer->destroyed || $jammer->disabled){
			$this->jamming = 0;
		} else $this->jamming = $jammer->getOutput($turn);
	}

	public function isDestroyed(){
		//Debug::log("isDestroyed ".get_class($this)." #".$this->id);
		if ($this->destroyed){
			return true;
		}
		for ($i = 0; $i < sizeof($this->crits); $i++){
			if ($this->crits[$i]->type == "Disabled"){
				$this->destroyed = true;
				return true;
			}
		}
		for ($i = sizeof($this->damages)-1; $i >= 0; $i--){
			if ($this->damages[$i]->destroyed){
				$this->destroyed = true;
				return true;
			}
		}
		return false;
	}

	public function isDestroyedThisTurn($turn){
		if (!$this->destroyed){return false;}
		for ($i = sizeof($this->damages)-1; $i >= 0; $i--){
			if ($this->damages[$i]->destroyed && $this->damages[$i]->turn == $turn){
				return true;
			} else if ($this->damages[$i]->turn < $turn){
				return false;
			}
		}
		return false;
	}	
	
	public function addDamage($dmg){
		if ($dmg->new){
			$this->emDmg += $dmg->emDmg;
			$this->newDmg += $dmg->hullDmg;
			if (!$this->destroyed && $this->emDmg >= $this->integrity){
				$this->doDropout();
			}
		}

		$this->armourDmg += $dmg->armourDmg;
		$this->remaining -= $dmg->hullDmg;
		$this->damages[] = $dmg;

		if ($dmg->turn == Manager::$turn){
			$this->recentDmg += $dmg->hullDmg;
		}
		if ($dmg->destroyed){
			$this->doDestroy();
		}
	}

	public function doDestroy(){
		//Debug::log("doDestroy!");
		$this->destroyed = true;
		for ($i = 0; $i < sizeof($this->systems); $i++){
			$this->systems[$i]->destroyed = true;
		}
	}

	public function getRemIntegrity(){
		return $this->remaining;
	}	

	public function setBonusNegation($turn){
		if (!sizeof($this->boostEffect) || $this->destroyed){return;}
		$this->bonusNegation = $this->getBoostEffect("Armour") * $this->getBoostLevel($turn);
	}

	public function getBonusNegation(){
		return $this->bonusNegation;
	}

	public function setSubunitState($turn, $phase){
		//Debug::log("setSubunitState ".get_class($this).", destroyed: ".$this->destroyed);
		if ($this->isDestroyed()){
			//Debug::log("destroyed = 1");
			$this->destroyed = 1;
		}

		if ($this->squaddie){$this->setNegation($this->integrity, 0);}
		
		for ($i = 0; $i < sizeof($this->systems); $i++){
			$this->systems[$i]->setState($turn, $phase);
		}
	}
	
	public function getRemNegation(){
		return $this->negation;
	}

	public function getArmour($fire){
		return array(
			"stock" => round($this->getRemNegation() * $this->getArmourMod()),
			"bonus" => round($this->getBonusNegation())
		);
	}

	public function getArmourMod(){
		return 1;
	}

	public function getRelDmg($turn){
		//Debug::log("getRelDmg on SINGLE #".$this->id."/".get_class($this));
		$old = 0; $new = 0;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			if ($this->damages[$i]->turn == $turn){
				$new += $this->damages[$i]->hullDmg;
				$new += $this->damages[$i]->emDmg*2;
			} else $old += $this->damages[$i]->hullDmg;
		}

		return new RelDmg($new, $old, $this->integrity);
	}
	
	public function determineCrit($dmg, $turn, $squad){
		if ($this->destroyed){return;}
		if (!$dmg->rel){return;}

		//Debug::log("___determineCrit ".get_class($this)." #".$this->id.", new: ".$dmg->new.", old: ".$dmg->old.", rel: ".$dmg->rel.", Squad: ".$squad);

		$sumDmg = ($dmg->new + $dmg->old)*100;
		$crit = DmgCalc::critProcedure($this->parentId, $this->id, $turn, $dmg->rel, $this->critEffects, $sumDmg, 0);

		if ($crit){
			$this->destroyed = 1;
			$this->crits[] = $crit;
		}
		return;
	}

	public function doDropout($turn){
		//Debug::log("Dropout!");
		$this->crits[] = new Crit(
			sizeof($this->crits)+1, $this->parentId, $this->id, $turn, "Disabled", 0, 0, 1
		);
		$this->destroyed = 1;
	}
}

?>