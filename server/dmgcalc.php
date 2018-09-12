<?php

class DmgCalc {

	static function critProcedure($unitid, $systemid, $turn, $new, $effects, $magAdd){

		Debug::log("critProcedure $unitid, $systemid, $turn, $new, $magAdd");

		if ($unitid && $new < 0.15){return false;}
		$chance = round((1-((1-$new)*(1-$new)))*100);
		$chanceRoll = mt_rand(0, 100);

		if ($chanceRoll > $chance){
			Debug::log("___opening test SUCCESS, roll: ".$roll.", chance: ".$chance);
			return false;
		} else Debug::log("___opening test FAIL, roll: ".$roll.", chance: ".$chance);

		$roll = mt_rand(0, 100);
		$magnitude = $roll + $magAdd;


		Debug::log("chance to fail: $chance, rolled $chanceRoll, magRoll $roll, modifier $magAdd, total $magnitude");
		if ($magnitude  < $effects[0][1]){return;}

		for ($i = sizeof($effects)-1; $i >= 0; $i--){
			if ($magnitude < $effects[$i][1]){continue;}

	
			Debug::log("crit: ".$effects[$i][0]);
			//($id, $shipid, $systemid, $turn, $type, $duration, $value, $new){
			return 
				new Crit(
					0, $unitid, $systemid, $turn,
					$effects[$i][0], $effects[$i][2], $effects[$i][3],
					1
				);
		}
		return false;
	}


	public static function setWeaponPriority(){
		$names = array(
			"SuperHeavyLaser", "HeavyLaser", "MediumLaser", "LightLaser", "LightParticleBeam", "NeutronLaser", "AssaultNeutronLaser", "HeavyAntimatterBeamProjector",
			"SuperHeavyParticle", "HeavyParticle", "MediumParticle", "LightParticle", "TwinParticleBolter", "FusionCannon", "HeavyFusionCannon",
			"HeavyPlasma", "MediumPlasma", "LightPlasma", "LightPlasmaShredder",
			"AntimatterConverter", "MagCompressor",
			"LightPulse", "MediumPulse", "HeavyPulse", "PulseFusionCannon",
			"LightPlasmaPulse", "MediumPlasmaPulse", "HeavyPlasmaPulse",
			"MediumRailGun", "HeavyRailGun"
		);

		$weapons = array();

		for ($i = 0; $i < sizeof($names); $i++){
			$weapons[] = new $names[$i](0, 0, 0, 0, 0, 0);

			$val = ($weapons[$i]->minDmg + $weapons[$i]->maxDmg)/2;

			if (isset($weapons[$i]->rakes)){
				$val /= $weapons[$i]->rakes;
			}

			if (isset($weapons[$i]->melt)){
				$val *= 1 + ($weapons[$i]->melt/100);
			}

			if (isset($weapons[$i]->pulse)){
			}

			if ($weapons[$i]->fireMode == "Flash"){
				$val *= 0.5;
			}

			$val = round($val);
			//Debug::log($i.": ".$val);

			$weapons[$i]::setStaticPriority($val);
		}

		usort($weapons, function($a, $b){
			return $b::$prio - $a::$prio;
		});

		for ($i = 0; $i < sizeof($weapons); $i++){
			$weapons[$i]::setStaticPriority($i);
		}

		//foreach ($weapons as $wpn){echo $wpn->name." / ".$wpn::$prio." / ".ceil(($wpn->minDmg + $wpn->maxDmg)/2)."</br>";}
		return $weapons;
	}

	public static function createAreaFireOrders($gd, $fire){
		Debug::log("createAreaFireOrders");

		$origin = new Point($fire->shooter->x, $fire->shooter->y);
		$target = new Point($fire->x, $fire->y);
		$dist = floor(Math::getDist2($origin, $target));

		if ($fire->weapon->deviate){
			$maxDevi = $dist / 100 * $fire->weapon->accDecay / 10;
			$devi = mt_rand(0, $maxDevi);
			$angle = mt_rand(0, 360);
			$impact = Math::getPointInDirection($devi, $angle, $target->x, $target->y);
			Debug::log("dist: ".$dist.", maxDevi: ".$maxDevi."px, devi: ".$devi."px, angle: ".$angle);
		}
		else {
			$angle = Math::getAngle2($origin, $target);
			$impact = $target;
		}

		$fire->notes = $impact->x.";".$impact->y.";";

		//Debug::log("newTarget ".$newTarget->x."/".$newTarget->y);
		

		//$newTarget = new Point(-50, -160);
		//$fire->notes = $newTarget->x.";".$newTarget->y.";";


		$newFires = array();

		for ($i = 0; $i < sizeof($gd->ships); $i++){
			$d = Math::getDist2($gd->ships[$i]->getCurPos(), $impact);
			//Debug::log("eMine impact distance to ".$gd->ships[$i]->name." #".$gd->ships[$i]->id.": ".$d);

			if ($d + $fire->weapon->aoe <= $fire->weapon->aoe*2){
				$a = round(Math::addAngle($gd->ships[$i]->getCurFacing() - $gd->ships[$i]->facing, Math::getAngle2($gd->ships[$i]->getCurPos(), $impact)));
				//var_export($newTarget);var_export($gd->ships[$i]->x);var_export($gd->ships[$i]->y);
				//Debug::log("hitting, dist to impact: ".$d.", impact from: ".$a);

				$subFire = new FireOrder(
					$fire->id, 0, $gd->turn, $fire->shooterid, $gd->ships[$i]->id, $impact->x, $impact->y, $fire->weapon->id, $fire->shots, 0, "", 1, 0
				);

				$subFire->cc = 0;
				$subFire->dist = $d;
				$subFire->angle = $a;
				$subFire->shooter = &$fire->shooter;
				$subFire->target = $gd->ships[$i];
				$subFire->weapon = $fire->weapon;
				$newFires[] = $subFire;
			}
		}
		return $newFires;
	}

	public static function calcDmg($weapon, $totalDmg, $negation){
		switch ($weapon->dmgType){
			case "Standard": return static::calcStandardDmg($weapon, $totalDmg, $negation);
			case "Matter": return static::calcMatterDmg($weapon, $totalDmg, $negation);
			case "Plasma": return static::calcPlasmaDmg($weapon, $totalDmg, $negation);
			case "Molecular": return static::calcMolecularDmg($weapon, $totalDmg, $negation);
			case "EM": return static::calcEMDmg($weapon, $totalDmg, $negation);
			default: Debug::log("calcDmg ERROR: ".$weapon->dmgType); break;
		}
	}

	public static function doDmg($fire, $hit, $system){
		switch ($fire->weapon->fireMode){
			case "Standard": static::doStandardDmg($fire, $hit, $system); break;
			case "Ballistic": static::doStandardDmg($fire, $hit, $system); break;
			case "Pulse": static::doPulseDmg($fire, $hit, $system); break;
			case "Laser": static::doLaserDmg($fire, $hit, $system); break;
			case "Shockwave": static::doShockDamage($fire, $hit, $system); break;
			case "Flash": static::doFlashDmg($fire, $hit, $system); break;
			case "Special": static::doSpecialDmg($fire, $hit, $system); break;
			default: Debug::log("doDmg ERROR: ".$weapon->fireMode); break;
		}

		$fire->weapon->postDmg($fire);
	}

	public static function doSpecialDmg($fire, $hit, $system){
		$fire->weapon->handleDmg($fire, $hit, $system);
	}

	public static function doStandardDmg($fire, $hit, $system){
		//Debug::log("hitting: ".get_class($system));
		$destroyed = 0;
		$totalDmg = $fire->weapon->getTotalDamage($fire, $hit, $system);
		$okSystem = 0;
		$remInt = $system->getRemIntegrity();
		
		$negation = $fire->target->getArmour($fire, $system);
		
		$dmg = static::calcDmg($fire->weapon, $totalDmg, $negation);
		$dmg = $system->setMaxDmg($fire, $dmg);

		Debug::log("fire #".$fire->id.", doStandardDmg, weapon: ".(get_class($fire->weapon)).", target #".$fire->target->id."/".$system->id."/".get_class($system).", totalDmg: ".$totalDmg.", remaining: ".$remInt.", armour: ".$negation["stock"]."+".$negation["bonus"]);

		if ($remInt <= $dmg->systemDmg){ // destroyed
			//Debug::log("destroying");
			$destroyed = 1;
			$okSystem = $fire->target->getOverkillSystem($fire);

			if ($okSystem){
				$dmg->hullDmg += abs($remInt - $dmg->systemDmg);
				$dmg->systemDmg = $remInt;
				Debug::log(" => OVERKILL ship target system ".$system->name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->systemDmg.", OK for: ".$dmg->hullDmg." dmg");
			}
			else {
				$dmg->systemDmg = $remInt;
				Debug::log(" => destroying non-ship target system ".$system->name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->systemDmg);
			}
		}

		$entry = new Damage(
			-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
			$totalDmg, $dmg->shieldDmg, $dmg->armourDmg, $dmg->systemDmg, $dmg->hullDmg, $dmg->emDmg, array_sum($negation), $destroyed, $dmg->notes, 1
		);

		$fire->damages[] = $entry;
		$fire->target->addTopDamage($entry);	
	}

	public static function doPulseDmg($fire, $hit, $system){
		$destroyed = 0;
		$totalDmg = $fire->weapon->getTotalDamage($fire, $hit, $system);
		$remInt = $system->getRemIntegrity();
		$okSystem = 0;

		$negation = $fire->target->getArmour($fire, $system);
		$dmg = DmgCalc::calcDmg($fire->weapon, $totalDmg, $negation);

		$total = 0;
		$shield = 0;
		$struct = 0;
		$armour = 0;
		$em = 0;

		//$name = get_class($system);
		//$hits = $fire->weapon->basePulses + min($fire->weapon->extraPulses, floor(($fire->req - $fire->rolls[sizeof($fire->rolls)-1]) / $fire->weapon->grouping));
		$hits = $fire->weapon->getMultiShotHits($fire, $system);
		$dmg->notes .= ("v".$hits.";");

		Debug::log("fire #".$fire->id.", doPulseDmg, weapon: ".$fire->weapon->name.", target #".$fire->target->id."/".$system->id."/".$system->name.", hits: ".$hits.", totalDmg: ".$totalDmg.", remaining: ".$remInt.", armour: ".$negation["stock"]."+".$negation["bonus"].", armourDmg: ".$dmg->armourDmg);

		/*if ($negation["bonus"] > 1){
			Debug::log("PulseDmg:</br>");
			var_export($dmg);
			echo "</br></br>";
		}*/

		for ($i = 0; $i < $hits; $i++){
			$total += $totalDmg;
			$shield += $dmg->shieldDmg;
			$armour += $dmg->armourDmg;
			$struct += $dmg->systemDmg;
			$em += $dmg->emDmg;
			//Debug::log("added hit ".($i+1).", ".$shield."/".$armour."/".$struct);
		}
		$dmg->shieldDmg = $shield;
		$dmg->armourDmg = $armour;
		$dmg->systemDmg = $struct;
		$dmg->emDmg = $em;

		$dmg = $system->setMaxDmg($fire, $dmg);

		if ($remInt <= $dmg->systemDmg){ // destroyed
			//Debug::log("destroying");
			$destroyed = 1;
			$okSystem = $fire->target->getOverkillSystem($fire);

			if ($okSystem){
				$dmg->hullDmg += abs($remInt - $struct);
				$dmg->systemDmg -= $dmg->hullDmg;
				//Debug::log(" => hit ".($i+1).", adding ".$dmg->systemDmg."/".$dmg->armourDmg." to overkill which is now: ".$dmg->hullDmg." pts");
			}
			else {
				$dmg->systemDmg = $remInt;
				Debug::log(" => destroying non-ship target system ".$system->name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->systemDmg);
			}
		}

		$entry = new Damage(
			-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
			$total, $dmg->shieldDmg, $dmg->armourDmg, $dmg->systemDmg, $dmg->hullDmg, $dmg->emDmg, array_sum($negation), $destroyed, $dmg->notes, 1
		);

		$fire->damages[] = $entry;
		$fire->target->addTopDamage($entry);
	}

	public static function doLaserDmg($fire, $hit, $system){
		$totalDmg = $fire->weapon->getTotalDamage($fire, $hit, $system);
		$okSystem = 0;
		$rakes = $fire->weapon->rakes;
		$reduce = 1 + ($rakes-1) * $fire->target instanceof Mixed;
		$systems = array();
		$entry;

		$print = "hitting --- ";
		if ($totalDmg <= 0){return;}
			
		$rake = floor($totalDmg / $fire->weapon->rakes);
		Debug::log("fire #".$fire->id.", doLaserDmg, weapon: ".get_class($fire->weapon).", target: ".$fire->target->id." for ".$totalDmg." dmg");

		while ($rakes){
			if ($fire->target->ship){
				if ($rakes < $fire->weapon->rakes){$system = $fire->target->getHitSystem($fire);}
				for ($i = 0; $i < sizeof($systems); $i++){
					if ($systems[$i] == $system->id){Debug::log("Laser DOUBLE HIT, switching to PRIMARY");$system = $fire->target->primary;}
				}
				if ($system->id > 1){$systems[] = $system->id;}
			}

			$print .= " ".get_class($system)."/".$system->id.": ".$rake." dmg, ";
			$destroyed = 0;
			$remInt = $system->getRemIntegrity();
			$negation = $fire->target->getArmour($fire, $system);

			$dmg = DmgCalc::calcDmg($fire->weapon, $rake, $negation);
			$dmg = $system->setMaxDmg($fire, $dmg);
			
			$rakes -= $reduce;

			if ($remInt - $dmg->systemDmg < 1){
				$destroyed = 1;
				$name = get_class($system);
				$okSystem = $fire->target->getOverkillSystem($fire);

				if ($okSystem){
					$dmg->hullDmg += abs($remInt - $dmg->systemDmg);
				}
				else {
					$rakes = 0;
				}
				$dmg->systemDmg = $remInt;
				Debug::log(" => OVERKILL ship target system ".$name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->systemDmg.", OK for: ".$dmg->hullDmg." dmg");
			}


			$entry = new Damage(
				-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
				$totalDmg, $dmg->shieldDmg, $dmg->armourDmg, $dmg->systemDmg, $dmg->hullDmg, $dmg->emDmg, array_sum($negation), $destroyed, $dmg->notes, 1
			);


			$fire->damages[] = $entry;
			$fire->target->addTopDamage($entry);
		}

		Debug::log($print);




/*
			if (!$fire->target->squad || $rakes == $fire->weapon->rakes-1){
				$entry = new Damage(
					-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
					$totalDmg, $dmg->shieldDmg, $dmg->armourDmg, $dmg->systemDmg, $dmg->hullDmg, $dmg->emDmg, array_sum($negation), $destroyed, $dmg->notes, 1
				);
			}

			if (!$fire->target->squad || !$rakes){
				$fire->damages[] = $entry;
				$fire->target->addTopDamage($entry);
			}
			else if ($rakes){
				$enarmtry->shieldDmg += $dmg->shieldDmg; $entry->systemDmg += $dmg->systemDmg; $entry->armourDmg += $dmg->ourDmg; $entry->destroyed = $destroyed;
			}
		}
		Debug::log($print);
*/	}

	public static function doFlashDmg($fire, $hit, $ignored){
		$system;

		if ($fire->target->ship){
			$system = $fire->target->primary;
		} else $system = $ignored;

		$baseDmg = $fire->weapon->getTotalDamage($fire, $hit, $system);
		$damageMod = $baseDmg / $fire->weapon->getBaseDamage($fire, $hit, $system);

		Debug::log("fire #".$fire->id.", doFlashDmg, weapon: ".(get_class($fire->weapon)).", target #".$fire->target->id."/".$system->id."/".get_class($system).", baseDmg: ".$baseDmg);

		static::doStandardDmg($fire, $hit, $system);

		if (!$fire->target->ship){return;}

		$secondary = $fire->target->getFlashTargets($fire);
		shuffle($secondary);
		$values = $fire->weapon->dmgs;
		$index = 1;

		for ($i = 0; $i < sizeof($secondary); $i++){
			//$fire->hits++;
			$system = $secondary[$i];
			$remInt = $system->getRemIntegrity();
			$destroyed = 0;
			$negation = $fire->target->getArmour($fire, $system);	
			$subDamage = $values[$index];
			$totalDmg = ceil($values[$index] * $damageMod);
			$dmg = static::calcDmg($fire->weapon, $totalDmg, $negation);
			$dmg = $system->setMaxDmg($fire, $dmg);

			Debug::log("doing: ".$totalDmg." to ".$system->name." #".$system->id.", value: ".$values[$index]);

			if ($remInt <= $dmg->systemDmg){ // destroyed
				//Debug::log("destroying");
				$destroyed = 1;

				$dmg->systemDmg = $remInt;
				//Debug::log(" => destroying non-ship target system ".$system->name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->systemDmg);
			}

			$entry = new Damage(
				-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
				$totalDmg, $dmg->shieldDmg, $dmg->armourDmg, $dmg->systemDmg, $dmg->hullDmg, $dmg->emDmg, array_sum($negation), $destroyed, $dmg->notes, 1
			);

			$fire->damages[] = $entry;
			$fire->target->addTopDamage($entry);
			
			//Debug::log("doing: ".$values[$index]."% to ".$system->name);
			if ($index == 3){
				$index = 1;
			} else $index++;
		}
	}

	public static function doShockDamage($fire, $hit, $system){
		$totalDmg = $fire->weapon->getTotalDamage($fire, $hit, $system);


		Debug::log("fire #".$fire->id.", doShockDamage, weapon: ".(get_class($fire->weapon)).", target #".$fire->target->id.", baseDmg: ".$totalDmg);
		
		if ($fire->target->ship){
			static::doStandardDmg($fire, $hit, $fire->target->primary);
		}

		$targets = $fire->target->getFlashTargets($fire);

		for ($i = 0; $i < sizeof($targets); $i++){
			static::doStandardDmg($fire, $hit, $targets[$i]);
		}
			
		return true;

	}
	public static function doShockDamag2e($fire, $hit, $system){
		$totalDmg = $fire->weapon->getTotalDamage($fire, $hit, $system);


		Debug::log("fire #".$fire->id.", doShockDamage, weapon: ".(get_class($fire->weapon)).", target #".$fire->target->id.", baseDmg: ".$totalDmg);
		
		if ($fire->target->ship){
			static::doPulseDmg($fire, $hit, $fire->target->primary);
		}

		$targets = $fire->target->getFlashTargets($fire);

		for ($i = 0; $i < sizeof($targets); $i++){
			static::doPulseDmg($fire, $hit, $targets[$i]);
		}
			
		return true;

	}

	public static function doShockDamage1($fire, $hit, $system){
		$totalDmg = $fire->weapon->getTotalDamage($fire, $hit, $system);
		$targets = $fire->target->getFlashTargets($fire);
		$negation;

		Debug::log("shock, sub targets: ".sizeof($targets).", damage: ".$totalDmg);

		$dmgs = array();

		if ($fire->target->ship){
			$fire->hits--;

			$coreDmg = floor($totalDmg / 100 * $fire->weapon->flashDiv[0]); // 160
			$systemDmg = floor($totalDmg / 100 * $fire->weapon->flashDiv[1]); // 80
			$allSystems = sizeof($fire->target->getStruct($fire->section)->systems); // 3

			if (sizeof($targets)){
				$subDmg = floor($systemDmg / $allSystems);
				$overflow = $subDmg * ($allSystems - sizeof($targets));
				$coreDmg += $overflow;

				Debug::log("VS SHIP systems ".$subDmg." dmg ea, overflow to core: ".$overflow);
				for ($i = 0; $i < sizeof($targets); $i++){
					$dmgs[] = $subDmg;
				}
			} 
			else {
				$coreDmg += $systemDmg;
				Debug::log("full overflow");
			}


			$targets[] = $fire->target->primary;
			$dmgs[] = floor($coreDmg);
			Debug::log("VS SHIP, struct: ".$dmgs[sizeof($dmgs)-1]."dmg");
		}
		else {		
			Debug::log("VS NON SHIP");
			$fire->hits = 0;
			for ($i = 0; $i < sizeof($targets); $i++){
				$dmgs[] = $totalDmg;
			}
		}

		Debug::log("flash targets: ".sizeof($targets));
		for ($i = 0; $i < sizeof($targets); $i++){
			$fire->hits++;
			$system = $targets[$i];
			$destroyed = 0;
			$remInt = $system->getRemIntegrity();
			$negation = $fire->target->getArmour($fire, $system);

			$dmg = static::calcDmg($fire->weapon, $dmgs[$i], $negation);

			if ($remInt - $dmg->systemDmg < 1){
				$destroyed = 1;
				$dmg->hullDmg = $dmg->systemDmg - $remInt;
				Debug::log("destroying, rem: ".$remInt.", dmg: ".$dmg->systemDmg.", adding overkill ".$dmg->hullDmg);
				$dmg->systemDmg = $remInt;
			}
			
			Debug::log("dealing ".$dmg->armourDmg."/".$dmg->systemDmg."/".$dmg->hullDmg." to ".$targets[$i]->display);

			$entry = new Damage(
				-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
				$dmgs[$i], $dmg->shieldDmg, $dmg->armourDmg, $dmg->systemDmg, $dmg->hullDmg, $dmg->emDmg, array_sum($negation), $destroyed, $dmg->notes, 1
			);

			$fire->damages[] = $entry;
			$fire->target->addTopDamage($entry);
		}
	}

	public static function doFlashDmg3($fire, $system){ // old flas
		$totalDmg = $fire->weapon->getTotalDamage($fire, $hit, $system);
		$targets = $fire->target->getFlashTargets($fire);
		$negation;

		Debug::log("flash, targets: ".sizeof($targets).", damage: ".$totalDmg);

		for ($i = 0; $i < sizeof($targets); $i++){
			$fire->hits++;
			$system = $targets[$i];
			$destroyed = 0;
			$remInt = $system->getRemIntegrity();
			$negation = $fire->target->getArmour($fire, $system);
			$dmg = static::calcDmg($fire->weapon, $totalDmg, $negation);

			if ($remInt - $dmg->systemDmg < 1){
				$destroyed = 1;
				$dmg->systemDmg = $remInt;
			}
			
			$entry = new Damage(
				-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
				$totalDmg, $dmg->shieldDmg, $dmg->armourDmg, $dmg->systemDmg, $dmg->hullDmg, $dmg->emDmg, array_sum($negation), $destroyed, $dmg->notes, 1
			);

			$fire->damages[] = $entry;
			$fire->target->addTopDamage($entry);

		}
	}
	
	public static function doFlashDmg2($fire, $system){ // old flash
		$totalDmg = $fire->weapon->getTotalDamage($fire, $hit, $system);
		$toDo = $totalDmg;
		if ($fire->target->ship){$system = $fire->target->getFlashOverkillSystem($fire);}

		while ($toDo){
			$push = false;
			$destroyed = 0;
			$remInt = $system->getRemIntegrity();
			$negation = $fire->target->getArmour($fire, $system);
			$dmg = static::calcDmg($fire->weapon, $toDo, $negation);
			$name = get_class($system);

			Debug::log("fire #".$fire->id.", doFlashDmg, weapon: ".(get_class($fire->weapon)).", target #".$fire->target->id."/".$system->id."/".$name.", totalDmg: ".$totalDmg.", remaining: ".$remInt.", armour: ".$negation["stock"]."+".$negation["bonus"]);

			if ($remInt - $dmg->systemDmg < 1){ // destroy system
				Debug::log(" => destroying target system ".$name." #".$system->id.", rem: ".$remInt.", doing: ".$dmg->systemDmg);
				$destroyed = 1;
				$dmg->systemDmg = $remInt;
				$push = true;
			}
			else if ($toDo){ // no dmg left
				Debug::log("dmg depleted");
				$push = true;
			}

			if ($push){
				$toDo -= $dmg->shieldDmg; 
				$toDo -= $dmg->armourDmg; 
				$toDo -= $dmg->systemDmg; 
				$toDo -= $dmg->emDmg;
				$fire->hits++;
				
				$entry = new Damage(
					-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
					$totalDmg, $dmg->shieldDmg, $dmg->armourDmg, $dmg->systemDmg, $dmg->hullDmg, $dmg->emDmg, array_sum($negation), $destroyed, $dmg->notes, 1
				);

				$fire->damages[] = $entry;
				$fire->target->addTopDamage($entry);	

				if ($toDo){
					$system = $fire->target->getFlashOverkillSystem($fire);
					if ($system){Debug::log("next target: ".$system->name);}
					else {Debug::log("FLASH to primary, EXIT"); return;}
				}
			}
		}
	}

	public static function calcEMDmg($weapon, $totalDmg, $negation){
		$shieldDmg = 0;
		$armourDmg = 0;
		$systemDmg = 0;
		$emDmg = 0;
		$notes = "";

		$shieldDmg = round(min($totalDmg, $negation["bonus"]));
		$armourDmg = round(min($totalDmg-$shieldDmg, $negation["stock"]));
		$emDmg = round($totalDmg - $shieldDmg - $armourDmg);
		$armourDmg = 0;

		return new Divider($shieldDmg * $weapon->linked, $armourDmg * $weapon->linked, $systemDmg * $weapon->linked, $emDmg * $weapon->linked, $notes);
	}

	public static function calcStandardDmg($weapon, $totalDmg, $negation){
		//Debug::log("calcStandardDmg, negation: ".$negation["stock"]."/".$negation["bonus"]);
		$shieldDmg = 0;
		$armourDmg = 0;
		$systemDmg = 0;
		$emDmg = 0;
		$notes = "";

		if ($totalDmg <= array_sum($negation)){ 
			$notes = "b;";
			$shieldDmg = round(min($totalDmg, $negation["bonus"]));
			$armourDmg = round(min($totalDmg-$shieldDmg, $negation["stock"])/2);
		}
		else {
			$notes = "p;";
			$shieldDmg = round(min($totalDmg, $negation["bonus"]));
			$armourDmg = round(min($totalDmg-$shieldDmg, $negation["stock"]));
			$systemDmg = round($totalDmg - $shieldDmg - $armourDmg);
		}

		return new Divider($shieldDmg * $weapon->linked, $armourDmg * $weapon->linked, $systemDmg * $weapon->linked, $emDmg * $weapon->linked, $notes);
	}

	public static function calcMatterDmg($weapon, $totalDmg, $negation){
		//Debug::log("calcMatterDmg, negation: ".$negation["stock"]."/".$negation["bonus"]);
		$shieldDmg = 0;
		$armourDmg = 0;
		$systemDmg = 0;
		$emDmg = 0;
		$notes = "";

		if ($totalDmg <= array_sum($negation)){ 
			$notes = "b;";
			$shieldDmg = round(min($totalDmg, $negation["bonus"]));
			$armourDmg = round($totalDmg/2);
		}
		else {
			$notes = "p;";
			$shieldDmg = round(min($totalDmg, $negation["bonus"]/2));
			$armourDmg = round(min($totalDmg-$shieldDmg, $negation["stock"]/2));
			$systemDmg = round($totalDmg - $shieldDmg - $armourDmg);
		}
		
		return new Divider($shieldDmg * $weapon->linked, $armourDmg * $weapon->linked, $systemDmg * $weapon->linked, $emDmg * $weapon->linked, $notes);
	}

	public static function calcMolecularDmg($weapon, $totalDmg, $negation){
		$shieldDmg = 0;
		$armourDmg = 0;
		$systemDmg = 0;
		$emDmg = 0;
		$notes = "";

		if ($totalDmg <= array_sum($negation)){ 
			$notes = "b;";
			$armourDmg = round($totalDmg/4);
		}
		else {
			$notes = "p;";
			$shieldDmg = round(min($totalDmg, $negation["bonus"]/4));
			$armourDmg = round(min($totalDmg-$shieldDmg, $negation["stock"]/4));
			$systemDmg = round($totalDmg - $shieldDmg - $armourDmg);
		}
		
		return new Divider($shieldDmg * $weapon->linked, $armourDmg * $weapon->linked, $systemDmg * $weapon->linked, $emDmg * $weapon->linked, $notes);
	}

	public static function calcPlasmaDmg($weapon, $totalDmg, $negation){
		//Debug::log("calcPlasmaDmg, negation: ".$negation["stock"]."/".$negation["bonus"]);
		$shieldDmg = 0;
		$armourDmg = 0;
		$systemDmg = 0;
		$emDmg = 0;
		$notes = "";

		if ($totalDmg <= array_sum($negation)){ 
			$notes = "b;";
			$shieldDmg = round(min($totalDmg, $negation["bonus"]));
			$armourDmg = round($totalDmg-$shieldDmg);
		}
		else {
			$notes = "p;";
			$shieldDmg = round(min($totalDmg, $negation["bonus"]));
			$armourDmg = round(min($totalDmg-$shieldDmg, $negation["stock"]));
			$systemDmg = round($totalDmg - $shieldDmg - $armourDmg);
			$armourDmg += floor(($totalDmg-$shieldDmg) / 100 * $weapon->melt);

//		shield	round(min(16, 3))
//		armour 	round(min(16-3, 9))
//		struct	round (16-3-9)
//		armour	+= floor(16 / 100 * 50)

//		shield	3
//		armour	9
//		struct	4
//		armouzr	8

		}

		return new Divider($shieldDmg * $weapon->linked, $armourDmg * $weapon->linked, $systemDmg * $weapon->linked, $emDmg * $weapon->linked, $notes);
	}
}





?>