<?php
	ini_set('display_errors', 1); 
	error_reporting(E_ALL);
	
	include(dirname(__FILE__) . "/autoload.php");
	session_start();
	
    Debug::open();

	function getPhaseString($phase){
		switch ($phase){
			case -1:
				return "Initial Orders";
			case 0:
				return "Base Movement";
			case 1:
				return "Command Movement";
			case 2:
				return "Firing Orders";
			case 3:
				return "Damage Control";
			default:
				return "ERROR";
		}
	}
?>