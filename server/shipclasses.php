<?php

require_once("/server/baseship.php");

class Omega extends Starship {
	function __construct(){
		$this->name = "Omega";
		$this->faction = "Earth Alliance";
	}
}

class Primus extends Starship {
	function __construct(){
		$this->name = "Primus";
		$this->faction = "Centauri Republic";
	}
}

?>
