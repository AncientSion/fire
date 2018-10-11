<?php 

class Obstacle extends Mixed {
	
	public $obstacle = 1;

	function __construct($data = false){
        parent::__construct($data);
	}

	function addAllSystems(){
		return;
	}
	
	public function setUnitState($turn, $phase){
		return true;
		//Debug::log("setUnitState ".get_class($this));
		for ($i = 0; $i < sizeof($this->structures); $i++){
			$this->structures[$i]->setSubunitState($turn, $phase);
		}

		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			$this->primary->systems[$i]->setState($turn, $phase);
		}

		$this->getSystemByName("Engine")->setPowerReq(0);
		$this->setBaseStats($turn, $phase);
		$this->setFaction();
		$this->setSpecialAbilities();
		$this->setProps($turn, $phase);
		$this->setCrewUpgrades($turn);
		$this->setMorale($turn, $phase);
		$this->isDestroyed();

		return true;
	}
}

?>