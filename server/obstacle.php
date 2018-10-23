<?php 

class Obstacle extends Mixed {
	
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

	function __construct($data = false){
        parent::__construct($data);
        $this->size = $data["delay"];
        $this->density = $data["rolling"];
        $this->rockSize = $data["rolled"];
        $this->scale = $data["flipped"];

       // $this->curImp = round($this->curImp * 125 / $this->size / $this->rockSize * 2);
        $this->interference = round($this->density / 2 * $this->rockSize);
        $this->collision = round($this->interference / 25 * $this->curImp);
	}	

	public function getDeployState($turn){
		Debug::log("getDeployState for ".$this->id.", destroyed: ".$this->destroyed);
		return $this->getEndState($turn);
	}

	public function getEndState($turn){

		Debug::log("getEndState for ".$this->id.", destroyed: ".$this->destroyed);

		$x; $y;

		if ($turn > 1){
			$x = $this->actions[0]->x;
			$y = $this->actions[0]->y;
		}
		else {
			$x = $this->x;
			$y = $this->y;
		}

		return array(
			"id" => $this->id,
			"destroyed" => $this->destroyed,
			"withdraw" => $this->withdraw,
			"manual" => $this->manual,
			"x" => $x,
			"y" => $y,
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

	public function addPrimary(){
		//Debug::log("addPrimary #".$this->id.", index: ".$this->index);
		$this->primary = new Shared($this->getId());
		//Debug::log("density ".$this->density.", rockSize ".$this->rockSize.", result: ".round($this->density / 3 / $this->rockSize));
		$this->primary->systems[] = new AsteroidRam($this->getId(), $this->id, $this->totalCost, $this->moraleCost, round($this->density / 3 / $this->rockSize));
	}

	public function addStructures(){
		return;
		$amount = ceil(20 * $this->size / 4 * $this->block / 250 * $this->collision) / 100;
		for ($i = 1; $i <= $amount; $i++){
			$this->structures[] = new Asteroid($this->size, $amount);
		}
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

	public function setMove(&$gd){
		//Debug::log("**** setMove ".$this->id);
		if ($this->moveSet){return;}

		$origin = $this->getCurPos();
		$speed = $this->getCurSpeed();
		$angle = $this->getCurFacing();
		$target = Math::getPointInDirection($speed, $angle, $origin->x, $origin->y);

		$move = new Action(-1, $this->id, $gd->turn, "move", 0, $speed, $target->x, $target->y, 0, 0, 0, 0, 1, 1);
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

class Asteroid {
	public $id = 0;
	public $size;
	public $layout;
	public $systems = array();
	public $crits = array();

	function __construct($parentSize, $amount){
		$this->size = mt_rand(10, 30) / 100 * $parentSize;
	}
}
?>