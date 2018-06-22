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

                'warhead' => '/server/systems/weapons/ammo.php',
                'hasta' => '/server/systems/weapons/ammo.php',
                'javelin' => '/server/systems/weapons/ammo.php',
                'triarii' => '/server/systems/weapons/ammo.php',
                'myrmidon' => '/server/systems/weapons/ammo.php',
                'vanguard' => '/server/systems/weapons/ammo.php',
                'needle' => '/server/systems/weapons/ammo.php',
                'naga' => '/server/systems/weapons/ammo.php',
                'cyclops' => '/server/systems/weapons/ammo.php',
                'titan' => '/server/systems/weapons/ammo.php',
                'vran' => '/server/systems/weapons/ammo.php',
                'vranoth' => '/server/systems/weapons/ammo.php',
                'vranothka' => '/server/systems/weapons/ammo.php',

                'mixed' => '/server/mixed.php',

                'salvo' => '/server/salvo.php',
                'missile ' =>  '/server/ammo.php',
                'torpedo ' =>  '/server/ammo.php',

                'flight' => '/server/flight.php',
                'fighter' => '/server/fighter.php',

                'squadron' => '/server/squadron.php',                
                'squaddie' => '/server/squaddie.php',
                'light' => '/server/squaddie.php',
                'superlight' => '/server/squaddie.php',
                
                'aurora' => '/server/fighter.php',
                'thunderbolt' => '/server/fighter.php',
                'nial' => '/server/fighter.php',
                'tishat' => '/server/fighter.php',
                'sentri' => '/server/fighter.php',
                'sitaraparticle' => '/server/fighter.php',
                'sitaraplasma' => '/server/fighter.php',
                'gorith' => '/server/fighter.php',
                'frazi' => '/server/fighter.php',

                'vorchana' => '/server/ships/vorchana.php',
                'vorchanb' => '/server/ships/vorchanb.php',
                'mograth' => '/server/ships/mograth.php',
                'vorchar' => '/server/ships/vorchar.php',
                'haven' => '/server/ships/haven.php',
                'darkner' => '/server/ships/darkner.php',
                'altarian' => '/server/ships/altarian.php',
                'demos' => '/server/ships/demos.php',
                'primus' => '/server/ships/primus.php',
                'centurion' => '/server/ships/centurion.php',
                'tech' => '/server/ships/tech.php',
                'octurion' => '/server/ships/octurion.php',

                'sharlin' => '/server/ships/sharlin.php',
                'tigara' => '/server/ships/tigara.php',
                'tinashi' => '/server/ships/tinashi.php',
                'rolentha' => '/server/ships/rolentha.php',
                'whitestar' => '/server/ships/whitestar.php',
                'torotha' => '/server/ships/torotha.php',

                'omega' => '/server/ships/omega.php',
                'avenger' => '/server/ships/avenger.php',
                'hyperion' => '/server/ships/hyperion.php',
                'saggitarius' => '/server/ships/saggitarius.php',
                'artemis' => '/server/ships/artemis.php',
                'olympus' => '/server/ships/olympus.php',
                'tethys' => '/server/ships/tethys.php',
                'crius' => '/server/ships/crius.php',
                'hermes' => '/server/ships/hermes.php',

                'gquan' => '/server/ships/gquan.php',
                'gsten' => '/server/ships/gsten.php',
                'katoc' => '/server/ships/katoc.php',
                'rongoth' => '/server/ships/rongoth.php',
                'dagkar' => '/server/ships/dagkar.php',
                'trakk' => '/server/ships/trakk.php',
                'thentus' => '/server/ships/thentus.php',
                'shokos' => '/server/ships/shokos.php',
                'shokov' => '/server/ships/shokov.php',

                'battlecrab' => '/server/ships/battlecrab.php',

                'system' => '/server/systems/system.php',
                'weapon' => '/server/systems/weapon.php',
                
                'primarysystem' => '/server/systems/nonweapon.php',
                'bridge' => '/server/systems/nonweapon.php',
                'engine' => '/server/systems/nonweapon.php',
                'reactor' => '/server/systems/nonweapon.php',
                'lifesupport' => '/server/systems/nonweapon.php',
                'sensor' => '/server/systems/nonweapon.php',
                'cyber' => '/server/systems/nonweapon.php',
                
                'bulkhead' => '/server/systems/nonweapon.php',
                'hangar' => '/server/systems/nonweapon.php',

                'dual' => '/server/systems/weapons/dual.php',
                'dualpulseion' => '/server/systems/weapons/dual.php',

                'plasma' => '/server/systems/weapons/plasma.php',
                'lightplasmashredder' => '/server/systems/weapons/plasma.php',
                'lightplasma' => '/server/systems/weapons/plasma.php',
                'mediumplasma' => '/server/systems/weapons/plasma.php',
                'heavyplasma' => '/server/systems/weapons/plasma.php',
                'heavyplasmamaser' => '/server/systems/weapons/plasma.php',
                'magcompressor' => '/server/systems/weapons/plasma.php',

                'laser' => '/server/systems/weapons/laser.php',
                'bLaser' => '/server/systems/weapons/laser.php',
                'lightparticlebeam' => '/server/systems/weapons/laser.php',
                'lightlaser' => '/server/systems/weapons/laser.php',
                'mediumlaser' => '/server/systems/weapons/laser.php',
                'heavylaser' => '/server/systems/weapons/laser.php',
                'superheavylaser' => '/server/systems/weapons/laser.php',
                'neutronlaser' => '/server/systems/weapons/laser.php',
                'molecularslicer' => '/server/systems/weapons/laser.php',
                'neutronaccelerator' => '/server/systems/weapons/laser.php',

                'matter' => '/server/systems/weapons/matter.php',
                'heavyrailgun' => '/server/systems/weapons/matter.php',
                'mediumrailgun' => '/server/systems/weapons/matter.php',
                'lightrailgun' => '/server/systems/weapons/matter.php',

                'test' => '/server/systems/weapons/matter.php',

                'pulse' => '/server/systems/weapons/pulse.php',
                'lightpulse' => '/server/systems/weapons/pulse.php',
                'mediumpulse' => '/server/systems/weapons/pulse.php',
                'heavypulse' => '/server/systems/weapons/pulse.php',
                'fusionpulsar' => '/server/systems/weapons/pulse.php',

                'lightplasmapulse' => '/server/systems/weapons/pulse.php',
                'mediumplasmapulse' => '/server/systems/weapons/pulse.php',
                'heavyplasmapulse' => '/server/systems/weapons/pulse.php',
                'lightempulse' => '/server/systems/weapons/pulse.php',
                
                'lightemneedler' => '/server/systems/weapons/particle.php',
                'mediumemdissipator' => '/server/systems/weapons/particle.php',
                'shockcannon' => '/server/systems/weapons/particle.php',

                'particle' => '/server/systems/weapons/particle.php',
                'twinparticlebolter' => '/server/systems/weapons/particle.php',
                'lightparticle' => '/server/systems/weapons/particle.php',
                'mediumparticle' => '/server/systems/weapons/particle.php',
                'heavyparticle' => '/server/systems/weapons/particle.php',
                'superheavyparticle' => '/server/systems/weapons/particle.php',
                'fusioncannon' => '/server/systems/weapons/particle.php',
                'heavyfusioncannon' => '/server/systems/weapons/particle.php',

                'antimatterconverter' => '/server/systems/weapons/particle.php',

                'area' => '/server/systems/weapons/area.php',
                'energymine' => '/server/systems/weapons/area.php',
                'graviticmine' => '/server/systems/weapons/area.php',

                'launcher' => '/server/systems/weapons/launcher.php',
                'missilelauncher' => '/server/systems/weapons/launcher.php',
                'torpedolauncher' => '/server/systems/weapons/launcher.php',

                'fighterweapon' => '/server/systems/weapons/linked.php',
                'particlegun' => '/server/systems/weapons/linked.php',
                'neutronrepeater' => '/server/systems/weapons/linked.php',
                'ionbolt' => '/server/systems/weapons/linked.php',
                'fighterpulse' => '/server/systems/weapons/linked.php',
                'particlepulsar' => '/server/systems/weapons/linked.php',
                'fighterplasma' => '/server/systems/weapons/linked.php',
                'plasmabomb' => '/server/systems/weapons/linked.php',

                'structure' => '/server/systems/structure.php',
                'primary' => '/server/systems/structure.php',
                'single' => '/server/systems/single.php',

                'debug' => '/server/debug.php',
                'math' => '/server/math.php',
                'squadbuilder' => '/server/squadbuilder.php',
                'dmgcalc' => '/server/dmgcalc.php',
                'morale' => '/server/classes.php',
                'section' => '/server/classes.php',
                'shared' => '/server/classes.php',
                'point' => '/server/classes.php',
                'vector' => '/server/classes.php',
                'action' => '/server/classes.php',
                'fireorder' => '/server/classes.php',
                'mission' => '/server/classes.php',
                'damage' => '/server/classes.php',
                'power' => '/server/classes.php',
                'crit' => '/server/classes.php',
                'effect' => '/server/classes.php',
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