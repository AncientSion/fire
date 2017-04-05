<?php
spl_autoload_register(
    function($class) {
        static $classes = null;
        if ($classes === null) {
            $classes = array(
                'ship' => '/server/ship.php',
                'superheavy' => '/server/ship.php',
                'ultraheavy' => '/server/ship.php',
                'heavy' => '/server/ship.php',
                'medium' => '/server/ship.php',
                'light' => '/server/ship.php',
                'superlight' => '/server/ship.php',

                'mini' => '/server/salvo.php',

                'salvo' => '/server/salvo.php',
                'ammo' => '/server/salvo.php',    

                'hasta' => '/server/systems/weapons/launcher.php',
                'javelin' => '/server/systems/weapons/launcher.php',
                'barracuda' => '/server/systems/weapons/launcher.php',
                'myrmidon' => '/server/systems/weapons/launcher.php',
                'zeus' => '/server/systems/weapons/launcher.php',

                'flight' => '/server/flight.php',

                'fighter' => '/server/flight.php',
                'aurora' => '/server/flight.php',
                'thunderbolt' => '/server/flight.php',
                'nial' => '/server/flight.php',
                'sentri' => '/server/flight.php',

                'haven' => '/server/ships/haven.php',
                'vorchan' => '/server/ships/vorchan.php',
                'demos' => '/server/ships/demos.php',
                'primus' => '/server/ships/primus.php',

                'sharlin' => '/server/ships/sharlin.php',
                'tinashi' => '/server/ships/tinashi.php',
                'whitestar' => '/server/ships/whitestar.php',

                'omega' => '/server/ships/omega.php',
                'avenger' => '/server/ships/avenger.php',
                'hyperion' => '/server/ships/hyperion.php',
                'saggitarius' => '/server/ships/saggitarius.php',
                'artemis' => '/server/ships/artemis.php',
                'olympus' => '/server/ships/olympus.php',
                'tethys' => '/server/ships/tethys.php',

                'system' => '/server/systems/system.php',
                'primarysys tem' => '/server/systems/system.php',
                'weapon' => '/server/systems/system.php',
                
                'bridge' => '/server/systems/system.php',
                'engine' => '/server/systems/system.php',
                'reactor' => '/server/systems/system.php',
                'lifesupport' => '/server/systems/system.php',
                'sensor' => '/server/systems/system.php',
                
                'hangar' => '/server/systems/system.php',

                'laser' => '/server/systems/weapons/laser.php',
                'lightlaser' => '/server/systems/weapons/laser.php',
                'mediumlaser' => '/server/systems/weapons/laser.php',
                'heavylaser' => '/server/systems/weapons/laser.php',
                'neutronlaser' => '/server/systems/weapons/laser.php',
                'neutronaccelerator' => '/server/systems/weapons/laser.php',

                'matter' => '/server/systems/weapons/matter.php',
                'heavyrailgun' => '/server/systems/weapons/matter.php',
                'mediumrailgun' => '/server/systems/weapons/matter.php',
                'lightrailgun' => '/server/systems/weapons/matter.php',

                'pulse' => '/server/systems/weapons/pulse.php',
                'lightpulsecannon' => '/server/systems/weapons/pulse.php',
                'mediumpulsecannon' => '/server/systems/weapons/pulse.php',

                'particle' => '/server/systems/weapons/particle.php',
                'lightion' => '/server/systems/weapons/particle.php',
                'mediumion' => '/server/systems/weapons/particle.php',
                'heavyion' => '/server/systems/weapons/particle.php',
                'particlebeam' => '/server/systems/weapons/particle.php',
                'heavyparticlebeam' => '/server/systems/weapons/particle.php',
                'FusionCannon' => '/server/systems/weapons/particle.php',
                'fusionpulsar' => '/server/systems/weapons/particle.php',

                'em' => '/server/systems/weapons/em.php',
                'empulsecannon' => '/server/systems/weapons/em.php',

                'launcher' => '/server/systems/weapons/launcher.php',
                'missilelauncher' => '/server/systems/weapons/launcher.php',

                'linked' => '/server/systems/weapons/linked.php',
                'linkedparticle' => '/server/systems/weapons/linked.php',
                'linkedparticlegun' => '/server/systems/weapons/linked.php',
                'linkedneutronrepeater' => '/server/systems/weapons/linked.php',

                'structure' => '/server/systems/structure.php',

                'debug' => '/server/debug.php',
                'math' => '/server/math.php',
                'point' => '/server/classes.php',
                'vector' => '/server/classes.php',
                'action' => '/server/classes.php',
                'fireorder' => '/server/classes.php',
                'damage' => '/server/classes.php',
                'power' => '/server/classes.php',
                'crit' => '/server/classes.php',
                'divider' => '/server/classes.php',
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