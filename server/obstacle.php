<?php 

class Obstacle extends Mixed {
	
	public $name = "Obstacle";
	public $display = "Asteroid Swarm";
	public $obstacle = 1;
	public $traverse = 10;
	public $size = 300;
	public $vector = 0;

	function __construct($data = false){
        parent::__construct($data);
        $this->vector = $data["totalCost"];
        $this->size = $data["moraleCost"];
        $this->totalCost = 0;
        $this->moaleCost = 0;
	}

	function addAllSystems(){
		$this->addStructures();
		return;
	}

	public function addStructures(){
		for ($i = 0; $i < 5; $i++){
			$this->structures[] = new Asteroid(0, 0);
		}
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

class Asteroid {
	public $size = 30;
	public $layout;
	public $systems = array();

	function __construct($x, $y){
		$this->layout = new Point($x, $y);
	}
}
?>