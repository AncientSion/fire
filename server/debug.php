<?php

class Debug {
	
	static function log($string){
		file_put_contents('/tmp/fire.log', $string, FILE_APPEND);
	//	file_put_contents('log.txt', $string."\n", FILE_APPEND);
	}
}
?>
