<?php

class Single {
	public $id = 0;
	public $parentId = 0;
	public $integrity = 0;
	public $remaining = 0;
	public $negation = 0;
	public $armourDmg = 0;
	public $destroyed = 0;
	public $disabled = 0;
	public $amount = 0;
	public $launch = 0;
	public $systems = array();
	public $damages = array();
	public $crits = array();
	public $baseImpulse = 0;
	public $baseHitChance = 0;
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
	public $emDmg = 0;
	public $system = false;
	public $squaddie = false;
	
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
		$this->addStructures();
		$this->setPowerOutput();
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

		if ($this->squaddie){
			for ($i = 0; $i < sizeof($this->structures); $i++){
				for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
					for ($k = 0; $k < sizeof($this->structures[$i]->systems[$j]->crits); $k++){
						if ($this->structures[$i]->systems[$j]->crits[$k]->new){
							$crits[] = $this->structures[$i]->systems[$j]->crits[$k];
						}
					}
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
		echo ("error adjust load: ".$this->display.", ".$this->parentId."\n");
		//Debug::log("error adjust load: ".$this->display.", ".$this->parentId.", target system: ".$dbLoad["systemid"]);
		//var_export($dbLoad);
		return;
	}

	public function addPowerEntry($power){
		$this->powers[] = $power;
	}

	public function addStructures(){
		return;
	}

	public function setPowerOutput(){
		return;
	}

	public function getSubHitChance($fire){
		return $this->baseHitChance;
	}

	public function setMaxDmg($fire, $dmg){
		return $dmg;
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
			//Debug::log($this->parentId."/".$this->id." total emDmg: ".$this->emDmg);
			if (!$this->destroyed && $this->emDmg >= $this->integrity){
				//Debug::log("immediate disable");
				$this->doDropout();
			}
		}

		$this->armourDmg += $dmg->armourDmg;
		$this->remaining -= $dmg->hullDmg;
		$this->damages[] = $dmg;

		if ($dmg->destroyed){
			$this->destroyed = true;
		}
	}

	public function getRemIntegrity(){
		return $this->remaining;
	}	

	public function setBonusNegation($turn){
		if (!sizeof($this->boostEffect)){return;}
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
		
		for ($i = 0; $i < sizeof($this->systems); $i++){
			$this->systems[$i]->setState($turn, $phase);
		}
	}
	
	public function getRemNegation(){
		return $this->negation;
	}

	public function getRelDmg($turn){
		//Debug::log("getRelDmg ".get_class($this)." #".$this->id);
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
		$crit = DmgCalc::critProcedure($this->parentId, $this->id, $turn, $dmg->rel, $this->critEffects, $sumDmg);

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