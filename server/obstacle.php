<?php 

class Obstacle extends Minor {
	
	public $name = "Obstacle";
	public $display = "Asteroid Cluster";
	public $obstacle = 1;
	public $traverse = 10;
	public $interference;
	public $collision;
	public $rockSize;
	public $scale;
	public $systems = array();
	public $critEffects = array();
	public $density;
	public $faction = "Neutral";

	function __construct($data = false){
        parent::__construct($data);
        $this->size = $data["delay"];
        $this->density = $data["rolling"];
        $this->rockSize = $data["rolled"];
        $this->scale = $data["flipped"];

       // $this->curImp = round($this->curImp * 125 / $this->size / $this->rockSize * 2);
        $this->interference = round($this->density * 0.8);
        $this->collision = round($this->density / 30 * ($this->curImp ? $this->curImp : 30));
	}		

	public function addPrimary(){
		//Debug::log("addPrimary #".$this->id.", index: ".$this->index);
		$this->primary = new Shared($this->getId());
		//Debug::log("density ".$this->density.", rockSize ".$this->rockSize.", result: ".round($this->density / 3 / $this->rockSize));

		$this->primary->systems[] = new AsteroidRam($this->getId(), $this->id,
		// minDmg, maxDmg, $shots
		$this->totalCost, $this->moraleCost, ceil($this->density / $this->rockSize / 2));
	}

	public function getDeployState($turn){
		//Debug::log("getDeployState for ".$this->id.", destroyed: ".$this->destroyed);
		return $this->getEndState($turn);
	}

	public function getEndState($turn){

		//Debug::log("getEndState for ".$this->id.", destroyed: ".$this->destroyed);

		$x = sizeof($this->actions) ? $this->actions[sizeof($this->actions)-1]->x : $this->x;
		$y = sizeof($this->actions) ? $this->actions[sizeof($this->actions)-1]->y : $this->y;

		return array(
			"id" => $this->id,
			"destroyed" => $this->destroyed,
			"withdraw" => $this->withdraw,
			"manual" => $this->manual,
			"x" => $x,
			"y" => $y,
			"heading" => $this->heading,
			"facing" => $this->facing,
			"thrust" => $this->getCurSpeed(),
			"delay" => $this->size,
			"rolling" => $this->density,
			"rolled" => $this->rockSize,
			"flipped" => $this->scale,
			"status" => $this->status,
			"notes" => "",
		);
	}
	
	public function addAllSystems(){
		$this->addPrimary();
		$this->addStructures();
	}

	public function addStructures(){
		return;
	}

	public function getSystem($id){
		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			if ($this->primary->systems[$i]->id == $id){
				return $this->primary->systems[$i];
			}
		}
		return false;

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->id == $id){
				return $this->structures[$i];
			}
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				if ($this->structures[$i]->systems[$j]->id == $id){
					return $this->structures[$i]->systems[$j]->getActiveSystem();
				}
			}
		}
	}
	
	public function setUnitState($turn, $phase){
		$this->isDestroyed();
	}

	public function isDestroyed(){
		return false;
	}

	public function setMove(){
		Debug::log("**** setMove ".get_class($this)." #".$this->id);
		if ($this->moveSet){return;}

		$origin = $this->getCurPos();
		$speed = $this->getCurSpeed();
		$angle = $this->getActualHeading();
		$target = Math::getPointInDirection($speed, $angle, $origin->x, $origin->y);

		$move = new Move(-1, $this->id, Manager::$turn, "move", 0, $speed, $target->x, $target->y, 0, 0, 0, 0, 0, 1, 1);
		$this->actions[] = $move;
		$this->moveSet = 1;
	}

	public function doTestCrits($turn){
		return;
	}

	public function getNewDamages($turn){
		return array();
	}

	public function getNewCrits($turn){
		return array();
	}
}
?>