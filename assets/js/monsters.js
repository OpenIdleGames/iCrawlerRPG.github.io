var Monsters = function() {
	var monsterList = [
		//First Tier
		{name:"Rat", killed:0},
		{name:"Bat", killed:0},
		{name:"Slime", killed:0},
		{name:"Kobold", killed:0},
		{name:"Wolf", killed:0},
		{name:"Lizard", killed:0},
		{name:"Goblin", killed:0},
		{name:"Bandit", killed:0},
		{name:"Spider", killed:0},
		{name:"Eagle", killed:0},

		//Second Tier
		{name:"Bear", killed:0},
		{name:"Snake", killed:0},
		{name:"Troll", killed:0},
		{name:"Kobold Warrior", killed:0},
		{name:"Giant Wolf", killed:0},
		{name:"Ghoul", killed:0},
		{name:"Alligator", killed:0},
		{name:"Giant Lizard", killed:0},
		{name:"Giant Rat", killed: 0},
		{name:"Orc Child", killed:0},

		//Third Tier
		{name: "Stone Golem", killed: 0},
		{name: "Lesser Elemental", killed: 0},
		{name: "Kobold Chieftain", killed: 0},
		{name: "Weakened Minotaur", killed: 0},
		{name: "Troll Warrior", killed: 0},
		{name: "Wisp", killed: 0},
		{name: "Dragon Hatchling", killed: 0},
		{name: "Goblin Shaman", killed: 0},
		{name: "Giant Snake", killed: 0},
		{name: "Mummy", killed: 0},

		//Fourth Tier
		{name: "Elemental", killed: 0},
		{name: "Lesser Imp", killed: 0},
		{name: "Lizardman", killed: 0},
		{name: "Orc", killed: 0},
		{name: "Troll Chieftain", killed: 0},
		{name: "Cyclops", killed: 0},
		{name: "Young Vampire", killed: 0},
		{name: "Harpy", killed: 0},
		{name: "Empowered Wisp", killed: 0},
		{name: "Ancient Mummy", killed: 0},

		//Fifth Tier
		{name: "Imp", killed: 0},
		{name: "Orc Soldier", killed: 0},
		{name: "Young Minotaur", killed: 0},
		{name: "Floating Eye", killed: 0},
		{name: "Banshee", killed: 0},
		{name: "Young Dragon", killed: 0},
		{name: "Cyclops Warrior", killed: 0},
		{name: "Lizardman Archer", killed: 0},
		{name: "Living Armor", killed: 0},
		{name: "Frenzied Goblin", killed: 0}
	];

	var instancedMonster = {
		name: "",
		currentHealth: 0,
		maximumHealth: 0,
		strength: 0,
		dexterity: 0,
		constitution: 0,
		status: 0
	};

	var self = this;
	//Save Method
	self.save = function() {
		var monstersSave = {
			savedMonsterList: monsterList,
			savedInstancedMonster: instancedMonster
		};
		localStorage.setItem("monstersSave",JSON.stringify(monstersSave));
	};

	//Load Method
	self.load = function() {
		var monstersSave = JSON.parse(localStorage.getItem("monstersSave"));
		if (monstersSave) {
			if (monstersSave.savedMonsterList !== undefined) {
				loadMonsterList(monstersSave.savedMonsterList);
			}
			if (monstersSave.savedInstancedMonster !== undefined) {
				loadInstancedMonster(monstersSave.savedInstancedMonster);
			}
		}
	};

	var loadMonsterList = function(savedMonsterList) {
		for (var i = 0; i < savedMonsterList.length; i++) {
			if (i == monsterList.length) {
				break;
			}
			if (savedMonsterList[i].killed !== undefined) {
				monsterList[i].killed = savedMonsterList[i].killed;
			}
		}
	};

	var loadInstancedMonster = function(savedInstancedMonster) {
		if (savedInstancedMonster.name !== undefined) {
			instancedMonster.name = savedInstancedMonster.name;
		}
		if (savedInstancedMonster.currentHealth !== undefined) {
			instancedMonster.currentHealth = savedInstancedMonster.currentHealth;
		}
		if (savedInstancedMonster.maximumHealth !== undefined) {
			instancedMonster.maximumHealth = savedInstancedMonster.maximumHealth;
		}
		if (savedInstancedMonster.strength !== undefined) {
			instancedMonster.strength = savedInstancedMonster.strength;
		}
		if (savedInstancedMonster.dexterity !== undefined) {
			instancedMonster.dexterity = savedInstancedMonster.dexterity;
		}
		if (savedInstancedMonster.constitution !== undefined) {
			instancedMonster.constitution = savedInstancedMonster.constitution;
		}
		if (savedInstancedMonster.status !== undefined) {
			instancedMonster.status = savedInstancedMonster.status;
		}
	};

	//Getters
	self.getMonsterList = function() {
		return monsterList;
	};

	self.getInstancedMonster = function() {
		return instancedMonster;
	};

	//Setters
	self.setInstancedMonster = function(updatedMonster) {
		instancedMonster = updatedMonster;
	};

	//Other Methods
	self.attackMelee = function() {
		if(player.getInBattle()) {
			self.battle(instancedMonster, false);
		}
	};

	self.loadMonsterInfo = function(monster) {
		if (monster !== undefined) {
			document.getElementById("monstername").innerHTML = monster.name;
			document.getElementById("monsterhp").innerHTML = Math.round(monster.currentHealth);
			document.getElementById("monsterstr").innerHTML = monster.strength;
			document.getElementById("monsterdex").innerHTML = monster.dexterity;
			document.getElementById("monstercon").innerHTML = monster.constitution;
			document.getElementById("monsterbar").style.width = 100*(monster.currentHealth/monster.maximumHealth) + "%";
			document.getElementById("combatlog").innerHTML = "You are attacked by a " + monster.name + "!<br>";
			player.setInBattle(true);
		}
		else {
			document.getElementById("monstername").innerHTML = "None";
			document.getElementById("monsterhp").innerHTML = "0";
			document.getElementById("monsterstr").innerHTML = "0";
			document.getElementById("monsterdex").innerHTML = "0";
			document.getElementById("monstercon").innerHTML = "0";
			document.getElementById("monsterbar").style.width = "0%";
		}
	};

	self.battle = function(monster, spellCast) {
		if(!player.getInBattle()) {
			player.setInBattle(true);
			player.loadRestButton();
			player.loadExploreButton();
			self.loadMonsterInfo(monster);
			if (buffs.getCastFireballInBattle()) {
				spells.castSpell("fireball");
			}
		}
		else {
			var isDead = false;
			if (!spellCast) {
				document.getElementById("combatlog").innerHTML = '';
				if (buffs.getCastCureInBattle() && player.getHealthCurrentValue() <= player.getHealthMaximumValue()/2) {
					if (!spells.castSpell("cure")) {
						isDead = playerAttacks(monster);
					}
					else {
						return true;
					}
				}
				else {
					isDead = playerAttacks(monster);
				}
			}
			if (!isDead) {
				isDead = monsterAttacks(monster);
			}
		}
	};

	var playerAttacks = function(monster) {
		var damage = damageFormula(player.getStrengthLevel(), player.getDexterityLevel(), monster.constitution, monster.currentHealth);
		if (buffs.getRageTimeLeft() !== 0) {
			damage *= 5;
		}
		if (damage >= monster.currentHealth) {
			damage = monster.currentHealth;
		}
		document.getElementById("combatlog").innerHTML += "You dealt " + Math.round(damage) + " damage to the " + monster.name + ".<br>";
		player.gainExperience(monster);
		return self.monsterTakeDamage(monster, damage);
	};

	self.monsterTakeDamage = function(monster, damage) {
		monster.currentHealth -= damage;
		document.getElementById("monsterhp").innerHTML = Math.floor(monster.currentHealth);
		document.getElementById("monsterbar").style.width = 100*(monster.currentHealth/monster.maximumHealth) + "%";
		if (monster.currentHealth <= 0) {
			monsterDeath(monster);
			return true;
		}
		return false;
	};

	var monsterDeath = function(monster) {
		player.setInBattle(false);
		document.getElementById("combatlog").innerHTML += "You have defeated the " + monster.name + "!";
		updateMonsterKilled(monster.name);
		upgrades.gainExcelia(monster);
		player.loadRestButton();
		player.loadExploreButton();
		self.loadMonsterInfo();
	};

	var updateMonsterKilled = function(name) {
		for (var i = 0; i < monsterList.length; i++) {
			if (monsterList[i].name == name) {
				monsterList[i].killed++;
			}
		}
	};

	var damageFormula = function(attackerStrength, attackerDexterity, defenderConstitution, defenderHealth) {
		var strengthWeigth = 2;
		var dexterityWeigth = 0.1;
		var constitutionWeigth = 0.5;
		var damage = ((attackerStrength * strengthWeigth) - (defenderConstitution * constitutionWeigth)) * (attackerDexterity * dexterityWeigth);

		if (damage < 0) {
			damage = 0;
		}
		else if (damage > defenderHealth) {
			damage = defenderHealth;
		}
		return damage;
	};

	var monsterAttacks = function(monster) {
		var damage = damageFormula(monster.strength, monster.dexterity, player.getConstitutionLevel(), player.getHealthCurrentValue());
		if (buffs.getAegisTimeLeft() === 0) {
			var barrier = buffs.getBarrierLeft();
			if (barrier > 0) {
				if (barrier >= damage) {
					buffs.setBarrierLeft(barrier - damage);
					document.getElementById("combatlog").innerHTML += "Your barrier absorbed " + Math.round(damage) + " damage from " + monster.name + "'s attack.<br>";
					buffs.updateTemporaryBuffs(false);
					return false;
				}
				else {
					document.getElementById("combatlog").innerHTML += "Your barrier absorbed " + Math.round(barrier) + " damage from " + monster.name + "'s attack.<br>";
					document.getElementById("combatlog").innerHTML += "Your barrier has shattered.<br>";
					damage -= barrier;
					buffs.setBarrierLeft(0);
					buffs.updateTemporaryBuffs(false);
				}
			}
			player.setHealthCurrentValue(player.getHealthCurrentValue() - damage);
			document.getElementById("combatlog").innerHTML += "You took " + Math.round(damage) + " damage from the " + monster.name + "'s attack.<br>";
			if (player.getHealthCurrentValue() === 0) {
				player.death(monster);
				return true;
			}
		}
		else {
			document.getElementById("combatlog").innerHTML += "Aegis absorbed " + Math.round(damage) + " damage from " + monster.name + "'s attack.<br>";
		}
		return false;
	};

	self.battleChance = function(boolean) {
		if (boolean) {
			rollMonster();
			return true;
		}
		else {
			var check = Math.random()*100;
			if (check <= tower.getFloorMonsterDensity(player.getCurrentFloor())) {
				rollMonster();
				return true;
			}
			return false;
		}
	};

	var rollMonster = function() {
		var tier = Math.floor((player.getCurrentFloor()-1)/10);
		var monster = Math.floor(Math.random()*10);
		while(monster == 10) {
			monster = Math.floor(Math.random()*10);
		}
		instancedMonster = createMonster((tier*10) + monster);
		self.battle(instancedMonster, false);
	};

	var createMonster = function(number) {
		var tempMonster = {name: "", currentHealth: 0, maximumHealth:0 , strength: 0, dexterity: 0, constitution: 0, status: 0};
		var statPool = Math.round((player.getCurrentFloor() * 15) + Math.pow(1.1, player.getCurrentFloor() - 1) - 1);
		tempMonster.name = monsterList[number].name;
		tempMonster.strength++;
		tempMonster.dexterity++;
		tempMonster.constitution++;
		statPool -= 3;
		distributeStats(tempMonster, statPool);
		tempMonster.maximumHealth = calculateHealth(tempMonster.constitution);
		tempMonster.currentHealth = tempMonster.maximumHealth;
		return tempMonster;
	};

	var distributeStats = function(monster, statPool) {
		var choice;
		while (statPool !== 0) {
			choice = Math.floor(Math.random()*3);
			while (choice == 3) {
				choice = Math.floor(Math.random()*3);
			}
			if (choice === 0) {
				monster.strength++;
			}
			else if (choice == 1) {
				monster.dexterity++;
			}
			else if (choice == 2) {
				monster.constitution++;
			}
			statPool--;
		}
	};

	var calculateHealth = function(constitution) {
		return (Math.pow(constitution, 2) * 4);
	};

	self.runAway = function() {
		if (player.getInBattle()) {
			document.getElementById("combatlog").innerHTML = "";
			var runRoll = Math.random() * (instancedMonster.strength + instancedMonster.dexterity + instancedMonster.constitution);
			if (runRoll < player.getSpeedLevel()) {
				document.getElementById("combatlog").innerHTML += "You escaped from the battle against " + instancedMonster.name + ".";
				self.loadMonsterInfo();
				player.setSpeedExperience(player.getSpeedExperience() + runRoll);
				player.setInBattle(false);
				player.loadExploreButton();
				player.loadRestButton();
			}
			else {
				document.getElementById("combatlog").innerHTML += "You failed to run away.<br>";
				self.battle(instancedMonster, true);
			}
		}
	}
};

var monsters = new Monsters();