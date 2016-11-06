<?php

spl_autoload_register(
    function($class) {
        static $classes = null;
        if ($classes === null) {
            $classes = array(
                'ship' => '/server/ship.php',

                'sharlin' => '/server/ships/sharlin.php',
                'tinashi' => '/server/ships/tinashi.php',
                'whitestar' => '/server/ships/whitestar.php',
                'omega' => '/server/ships/omega.php',
                'hyperion' => '/server/ships/hyperion.php',
                'tethys' => '/server/ships/tethys.php',

                'system' => '/server/systems/system.php',
                'weapon' => '/server/systems/system.php',

                'laser' => '/server/systems/weapons/laser.php',
                'lightlaser' => '/server/systems/weapons/laser.php',
                'heavylaser' => '/server/systems/weapons/laser.php',
                'neutronlaser' => '/server/systems/weapons/laser.php',

                'particle' => '/server/systems/weapons/particle.php',
                'standardparticlebeam' => '/server/systems/weapons/particle.php',
                'fusioncannon' => '/server/systems/weapons/particle.php',
                'fusionpulsar' => '/server/systems/weapons/particle.php',
                
                'structure' => '/server/systems/structure.php',

                'debug' => '/server/debug.php',
                'classes' => '/server/classes.php',
                'manager' => '/server/manager.php',
                'dbmanager' => '/server/dbManager.php',
            );
        }
        $cn = strtolower($class);
        if (isset($classes[$cn])) {
            require __DIR__ . $classes[$cn];
        }
    }
);

