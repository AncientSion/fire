<?php

class Flight extends Mixed {
	public $flight = true;
	public $unitType = "Flight";
	public $name = "Flight";
	public $display = "Flight";
	public $faction = false;
	public $baseSize = 30;
	public $unitSize = 6;

	public $fSize = 15;
	public $traverse = -3;

	function __construct($id, $userid, $available, $status, $destroyed){		
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function setBaseStats(){
		$this->baseHitChance = 0;//ceil(pow($this->mass, 1/3)*5);
		$this->baseTurnCost = round(pow($this->mass, 1.15)/100, 2);
		$this->baseTurnDelay = $this->baseTurnCost * 2;
		$this->baseImpulseCost = round(pow($this->mass, 1.15)/4, 2);
	}

	public function setMass(){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed){
				$this->mass = max($this->mass, $this->structures[$i]->mass);
			}
		}
	}

	public function setCurrentImpulse($turn){
		$this->baseImpulse = floor(pow($this->mass, -1.5) * 65000);
		$this->currentImpulse = $this->baseImpulse;
	}

	public function setSize(){
		$alive = 0;
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed){
				$alive++;
			}
		}
		$this->size = $this->baseSize + $alive*$this->unitSize;
	}

    public function getArmourValue($fire, $hitSystem){
    	//Debug::log("getRemainingNegation FLIGHT, angle: ".$fire->angle);
    	if ($fire->angle >= 330 || $fire->angle <= 30){
    		return $hitSystem->negation[0];
    	}
    	else if (($fire->angle > 30 && $fire->angle < 150) || ($fire->angle > 210 && $fire->angle < 330)){
    		return $hitSystem->negation[1];
		}
		else {
    		return $hitSystem->negation[2];
		}
    }
}
?>