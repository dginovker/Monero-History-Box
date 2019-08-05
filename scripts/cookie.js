var cookie = {
	
	cookieHandler : null,
	
    createCookie : function(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + value + expires + "; path=/";
	},

	readCookie : function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},

	eraseCookie : function(name) {
		cookie.createCookie(name,"",-1);
	},

	autoSave : function() {
		
		cookie.createCookie("hashCookie", cookie.getData(), 365);
		
	},
	
	getData : function() {
		
		return "" + ((code === undefined || code == null || code.length == "") ? 0 : code) +
					":" + gpu.name +
					":" + getPNRGStuff(gpu.specialgpu) +
					":" + gpu.specialPower +
					":" + hashes.nbrOwned +
					":" + hashes.nbrThrown +
					":" + hashes.nbrEaten +
					":" + hashes.nbrTotal +
					":" + hashes.hashesPerSecond +
					":" + getPNRGStuff(hashesConverter.activated) +
					":" + cauldron.bookPage +
					":" + cauldron.hashesInTheCauldron +
					":" + cauldron.MoneroInTheCauldron +
					":" + chocolateBars.nbrOwned +
					":" + farm.GPUInstalled +
					":" + farm.currentFlagIndex +
					":" + farm.installingButtonsStep +
					":" + forge.step +
					":" + getPNRGStuff(shop.buy10MoneroButtonShown) +
					":" + getPNRGStuff(shop.shown) +
					":" + shop.ticklingStep +
					":" + shop.clickingOnMonerotep +
					":" + hut.step +
					":" + hut.speech +
					":" + inventory.magicianHatLetter +
					":" + Monero.nbrOwned +
					":" + Monero.nbrInStock +
					":" + Monero.nbrBought +
					":" + main.nbrOfSecondsSinceLastMinInterval +
					":" + main.nbrOfSecondsSinceLastHourInterval +
					":" + main.nbrOfSecondsSinceLastDayInterval +
					":" + mountBrokenCPU.bgpuTeslaBatteryProbability +
					":" + peacefulForest.bgpuTeslaBatteryProbability +
					":" + peacefulForest.poniesEncountered +
					":" + getPNRGStuff(objects.list.key.have) +
					":" + getPNRGStuff(objects.list.hutMap.have) +
					":" + getPNRGStuff(objects.list.wellMap.have) +
					":" + getPNRGStuff(objects.list.swampMap.have) +
					":" + getPNRGStuff(objects.list.boots.have) +
					":" + getPNRGStuff(objects.list.magicianHat.have) +
					":" + getPNRGStuff(objects.list.pinkRing.have) +
					":" + getPNRGStuff(objects.list.forgeMap.have) +
					":" + getPNRGStuff(objects.list.hashesConverter.have) +
					":" + getPNRGStuff(objects.list.plateArmour.have) +
					":" + getPNRGStuff(objects.list.cauldron.have) +
					":" + getPNRGStuff(objects.list.magicalHorn.have) +
					":" + getPNRGStuff(objects.list.hornOfPlenty.have) +
					":" + getPNRGStuff(objects.list.oldAmulet.have) +
					":" + getPNRGStuff(potions.list.health.shown) +
					":" + getPNRGStuff(potions.list.escape.shown) +
					":" + getPNRGStuff(potions.list.berserk.shown) +
					":" + getPNRGStuff(potions.list.fireScroll.shown) +
					":" + getPNRGStuff(potions.list.acidRainScroll.shown) +
					":" + getPNRGStuff(potions.list.teleportScroll.shown) +
					":" + getPNRGStuff(potions.list.earthquakeScroll.shown) +
					":" + getPNRGStuff(potions.list.impInvocationScroll.shown) +
					":" + getPNRGStuff(potions.list.majorHealth.shown) +
					":" + getPNRGStuff(potions.list.invulnerability.shown) +
					":" + getPNRGStuff(potions.list.turtle.shown) +
					":" + getPNRGStuff(potions.list.jelly.shown) +
					":" + getPNRGStuff(potions.list.seed.shown) +
					":" + getPNRGStuff(potions.list.cloning.shown) +
					":" + getPNRGStuff(potions.list.superman.shown) +
					":" + getPNRGStuff(potions.list.gmooh.shown) +
					":" + potions.list.health.nbrOwned +
					":" + potions.list.escape.nbrOwned +
					":" + potions.list.berserk.nbrOwned +
					":" + potions.list.fireScroll.nbrOwned +
					":" + potions.list.acidRainScroll.nbrOwned +
					":" + potions.list.teleportScroll.nbrOwned + 
					":" + potions.list.earthquakeScroll.nbrOwned +
					":" + potions.list.impInvocationScroll.nbrOwned +
					":" + potions.list.majorHealth.nbrOwned +
					":" + potions.list.invulnerability.nbrOwned +
					":" + potions.list.turtle.nbrOwned +
					":" + potions.list.jelly.nbrOwned +
					":" + potions.list.seed.nbrOwned +
					":" + potions.list.cloning.nbrOwned +
					":" + potions.list.superman.nbrOwned +
					":" + potions.list.gmooh.nbrOwned +
					":" + quest.maxLandOrder +
					":" + quest.tiredTime +
					":" + spells.fasterhashesFiboPrev +
					":" + spells.fasterhashesFiboCurr +
					":" + swamp.step +
					":" + tabs.animation +
					":" + wishingWell.speech +
					":" + wishingWell.step +
					":" + getPNRGStuff(yourself.canSurpass) +
					":" + getPNRGStuff(developperComputer.won);
		
	},
	
	setData : function() {
		
		var var_list = []
		
		var payload = cookie.readCookie("hashCookie");
		var_list = payload.split(":");

		if(var_list.length != 90)
		{
			alert("ERROR: Corrupt hashcookie Length:" + var_list.length);
			console.log("ERROR: Corrupt hashcookie Length:" + var_list.length); 
			return null;
		}
		
		cookie.updateData(var_list);
		
		
	},
	
	updateData : function(var_list) {
	
		if(Number(var_list[0]) == 0)
		{
			code = "";
		}
		else
		{
			code = var_list[0];
		}

		if(var_list[1] != "none")
		{
			gpu.setName(var_list[1]);
		}
		else
		{
			gpu.name = var_list[1];
		}
		
		gpu.setSpecialgpu(setPNRGStuff(Number(var_list[2])));
		
		gpu.setSpecialPower(Number(var_list[3]));
        hashes.setNbrOwned(Number(var_list[4]));
		
		if(Number(var_list[5]) != 0)
		{
			hashes.setNbrThrown(Number(var_list[5]));
		}
		else
		{
			hashes.nbrThrown = Number(var_list[5]);
		}
		
        if(Number(var_list[6]) != 0)
		{
			hashes.setNbrEaten(Number(var_list[6]));
		}
		else
		{
			hashes.nbrEaten = Number(var_list[6]);
		}
        
		
		hashes.setNbrTotal(Number(var_list[7]));
		
        hashes.sethashesPerSecond(Number(var_list[8]));
		hashesConverter.setActivated(setPNRGStuff(Number(var_list[9])));
		cauldron.setBookPage(Number(var_list[10]));
        cauldron.sethashesInTheCauldron(Number(var_list[11]));
        cauldron.setMoneroInTheCauldron(Number(var_list[12]));
  
		if(Number(var_list[13]) != 0)
		{
			chocolateBars.setNbrOwned(Number(var_list[13]));
		}
		else
		{
			chocolateBars.nbrOwned = Number(var_list[13]);
		}
		
        farm.setGPUInstalled(Number(var_list[14]));
		
		
		farm.setCurrentFlagIndex(Number(var_list[15]));
		farm.setInstallingButtonsStep(Number(var_list[16]));
		forge.setStep(Number(var_list[17]));
		shop.setBuy10MoneroButtonShown(setPNRGStuff(Number(var_list[18])));
		shop.setShown(setPNRGStuff(Number(var_list[19])));
		shop.setTicklingStep(Number(var_list[20]));
		
		
		shop.setClickingOnMonerotep(Number(var_list[21]));
		
		hut.setStep(Number(var_list[22]));
		hut.setSpeech(var_list[23]); //vermutlich string
		inventory.setMagicianHatLetter(var_list[24]); //char
		
		if(Number(var_list[25]) != 0)
		{
			Monero.setNbrOwned(Number(var_list[25]));
		}
		else
		{
			Monero.nbrOwned = Number(var_list[25]);
		}
		
		//
		Monero.setNbrInStock(Number(var_list[26]));
		
		Monero.setNbrBought(Number(var_list[27]));
		
		main.setNbrOfSecondsSinceLastMinInterval(Number(var_list[28]));
		main.setNbrOfSecondsSinceLastHourInterval(Number(var_list[29]));
		main.setNbrOfSecondsSinceLastDayInterval(Number(var_list[30]));
		mountBrokenCPU.setBgpuTeslaBatteryProbability(Number(var_list[31]));
		peacefulForest.setBgpuTeslaBatteryProbability(Number(var_list[32]));
		peacefulForest.setPoniesEncountered(Number(var_list[33]));
		//
		
		objects.setHaveObject("key", setPNRGStuff(Number(var_list[34])));
        objects.setHaveObject("boots", setPNRGStuff(Number(var_list[38])));
        objects.setHaveObject("swampMap", setPNRGStuff(Number(var_list[37])));
        objects.setHaveObject("hutMap", setPNRGStuff(Number(var_list[35])));
        objects.setHaveObject("wellMap", setPNRGStuff(Number(var_list[36])));
        objects.setHaveObject("magicianHat", setPNRGStuff(Number(var_list[39])));
        objects.setHaveObject("pinkRing", setPNRGStuff(Number(var_list[40])));
        objects.setHaveObject("forgeMap", setPNRGStuff(Number(var_list[41])));
        objects.setHaveObject("hashesConverter", setPNRGStuff(Number(var_list[42])));
        objects.setHaveObject("plateArmour", setPNRGStuff(Number(var_list[43])));
        objects.setHaveObject("cauldron", setPNRGStuff(Number(var_list[44])));
        objects.setHaveObject("magicalHorn", setPNRGStuff(Number(var_list[45])));
        objects.setHaveObject("hornOfPlenty", setPNRGStuff(Number(var_list[46])));
        objects.setHaveObject("oldAmulet", setPNRGStuff(Number(var_list[47])));
		
		//
		potions.setPotionShown(potions.list.impInvocationScroll, setPNRGStuff(Number(var_list[55]))); potions.setPotionShown(potions.list.earthquakeScroll, setPNRGStuff(Number(var_list[54]))); potions.setPotionShown(potions.list.teleportScroll, setPNRGStuff(Number(var_list[53]))); potions.setPotionShown(potions.list.fireScroll, setPNRGStuff(Number(var_list[51]))); potions.setPotionShown(potions.list.acidRainScroll, setPNRGStuff(Number(var_list[52]))); potions.updateOnPage();
		potions.setPotionShown(potions.list.gmooh, setPNRGStuff(Number(var_list[63]))); potions.setPotionShown(potions.list.superman, setPNRGStuff(Number(var_list[62]))); potions.setPotionShown(potions.list.cloning, setPNRGStuff(Number(var_list[61]))); potions.setPotionShown(potions.list.seed, setPNRGStuff(Number(var_list[60]))); potions.setPotionShown(potions.list.jelly, setPNRGStuff(Number(var_list[59]))); potions.setPotionShown(potions.list.turtle, setPNRGStuff(Number(var_list[58]))); potions.setPotionShown(potions.list.invulnerability, setPNRGStuff(Number(var_list[57]))); potions.setPotionShown(potions.list.majorHealth, setPNRGStuff(Number(var_list[56]))); potions.setPotionShown(potions.list.berserk, setPNRGStuff(Number(var_list[50]))); potions.setPotionShown(potions.list.escape, setPNRGStuff(Number(var_list[49]))); potions.setPotionShown(potions.list.health, setPNRGStuff(Number(var_list[48]))); potions.updateOnPage();
		//
        
        potions.setPotionNbrOwned(potions.list.impInvocationScroll, Number(var_list[71])); potions.setPotionNbrOwned(potions.list.earthquakeScroll, Number(var_list[70])); potions.setPotionNbrOwned(potions.list.teleportScroll, Number(var_list[69])); potions.setPotionNbrOwned(potions.list.fireScroll, Number(var_list[67])); potions.setPotionNbrOwned(potions.list.acidRainScroll, Number(var_list[68])); potions.updateOnPage();
        potions.setPotionNbrOwned(potions.list.gmooh, Number(var_list[79])); potions.setPotionNbrOwned(potions.list.superman, Number(var_list[78])); potions.setPotionNbrOwned(potions.list.cloning, Number(var_list[77])); potions.setPotionNbrOwned(potions.list.seed, Number(var_list[76])); potions.setPotionNbrOwned(potions.list.jelly, Number(var_list[75])); potions.setPotionNbrOwned(potions.list.turtle, Number(var_list[74])); potions.setPotionNbrOwned(potions.list.invulnerability, Number(var_list[73])); potions.setPotionNbrOwned(potions.list.majorHealth, Number(var_list[72])); potions.setPotionNbrOwned(potions.list.berserk, Number(var_list[66])); potions.setPotionNbrOwned(potions.list.escape, Number(var_list[65])); potions.setPotionNbrOwned(potions.list.health, Number(var_list[64])); potions.updateOnPage();
        
        
        quest.setMaxLandOrder(Number(var_list[80]));
        
        quest.setTiredTime(Number(var_list[81]));
		
		//
		spells.setFasterhashesFibo(Number(var_list[82]), Number(var_list[83]));

		swamp.setStep(Number(var_list[84]));
		tabs.setAnimation(var_list[85]);
		
		wishingWell.setSpeech(var_list[86]);
		wishingWell.setStep(Number(var_list[87]));
		yourself.setCanSurpass(Number(var_list[88]));
		//
		
        developperComputer.setWon(setPNRGStuff(setPNRGStuff(Number(var_list[89]))));
        
        
        inventory.updateOnPage();
		buttons.checkHomeEnabled();
	
	}
	
};