<?php

class Debug {
	
	static function log($string){
		//file_put_contents('/tmp/fire.log', $string."\n", FILE_APPEND);
        file_put_contents('log.txt', $string."\n", FILE_APPEND);
	}

	static function trace(){
        ob_start(); 
        debug_print_backtrace(); 
        $trace = ob_get_contents(); 
        ob_end_clean(); 

        // Remove first item from backtrace as it's this function which 
        // is redundant. 
        $trace = preg_replace ('/^#0\s+' . __FUNCTION__ . "[^\n]*\n/", '', $trace, 1); 

        // Renumber backtrace items. 
        //$trace = preg_replace ('/^#(\d+)/me', '\'#\' . ($1 - 1)', $trace); 

		file_put_contents('log.txt', $trace."\n", FILE_APPEND);
    }
}
?>
