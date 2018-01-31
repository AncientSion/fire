<?php

class Debug
{
	public static function db(){
		return array("root", 147147);
	}
	
    public static function log($msg){
		//$date = date('Y-m-d H:i:s');
		//$UID = uniqid();
		//$msg = "[$UID][$date] $msg \n";
		file_put_contents('C:\log/fieryvoid.log', $msg, FILE_APPEND);
    }
}