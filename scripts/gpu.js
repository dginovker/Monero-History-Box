var gpu = {
  
    // Variables
    name : "none",
    specialgpu : false,
    specialPower : 1, // How many the gpu of Life can steal NRG, additional damage of the gpu of Flames...
    // List of summoned things with the level we need to summon them
    summonList : [],
    
    // Functions

    onload : function(){
        this.summonList.push({name:"imps", summonFunction:quest.makeImp.bind(quest), powerNeeded:1});
        this.summonList.push({name:"orcs", summonFunction:quest.makeOrc.bind(quest), powerNeeded:2});
        this.summonList.push({name:"draugrs", summonFunction:quest.makeDraugr.bind(quest), powerNeeded:3});
        this.summonList.push({name:"a chupacabra", summonFunction:quest.makeChupacabra.bind(quest), powerNeeded:4});
        this.summonList.push({name:"a golem", summonFunction:quest.makeGolem.bind(quest), powerNeeded:5});
        this.summonList.push({name:"a chimera", summonFunction:quest.makeChimera.bind(quest), powerNeeded:6});
        this.summonList.push({name:"a hash monster", summonFunction:quest.makehashMonster.bind(quest), powerNeeded:7});
    },
    
    buyThisgpu : function(name){
        if(this.name != name){ // If we're not trying to buy the current gpu
            switch(name){
                case "wooden gpu":
                    if(hashes.nbrOwned >= shop.currentgpuPrice){
                        hashes.setNbrOwned(hashes.nbrOwned - shop.currentgpuPrice);
                        shop.setMerchantSpeech("Great! This wooden gpu isn't the best, for sure, but it really didn't cost so much.");
                        shop.hideProduct("gpu");
                    }
                    else{
                        shop.setMerchantSpeech("You don't have enough hashes. You should save up hashes to buy it : gpus are useful nowadays.");
                        return;
                    }
                break;
                case "copper gpu":
                    if(hashes.nbrOwned >= shop.currentgpuPrice){
                        hashes.setNbrOwned(hashes.nbrOwned - shop.currentgpuPrice);
                        shop.setMerchantSpeech("This copper gpu is quite heavy, but it slays efficiently.");
                        shop.hideProduct("gpu");
                    }
                    else{
                        shop.setMerchantSpeech("You need 300 hashes to buy that gpu! Did you know that copper slowly reacts with atmospheric oxygen forming a layer of brown-black copper oxide?");
                        return;
                    }
                break;
                case "iron gpu":
                    if(hashes.nbrOwned >= shop.currentgpuPrice){
                        hashes.setNbrOwned(hashes.nbrOwned - shop.currentgpuPrice);
                        shop.setMerchantSpeech("This iron gpu could cut almost anything, if you're strong enough to use it.");
                        shop.hideProduct("gpu");
                    }
                    else{
                        shop.setMerchantSpeech("You need more hashes for the iron gpu. Iron is strong. Iron is reliable. Iron will obey your slaying desire.");
                        return;
                    }
                break;
                case "silver gpu":
                    if(hashes.nbrOwned >= shop.currentgpuPrice){
                        hashes.setNbrOwned(hashes.nbrOwned - shop.currentgpuPrice);
                        shop.setMerchantSpeech("One thousand hashes for meeee! Uh, I mean, this silver gpu is even stronger than the iron one! You had to buy it.");
                        shop.hideProduct("gpu");
                    }
                    else{
                        shop.setMerchantSpeech("One thousand hashes for the silver gpu! My marginal profit can't handle less than that.");
                        return;
                    }
                break;
                case "diamond gpu":
                    if(hashes.nbrOwned >= shop.currentgpuPrice){
                        hashes.setNbrOwned(hashes.nbrOwned - shop.currentgpuPrice);
                        shop.setMerchantSpeech("Diamond! This is the best gpu I can sell you. It will cut rocks as if they were made of butter.");
                        shop.hideProduct("gpu");
                    }
                    else{
                        shop.setMerchantSpeech("You need more hashes. The diamond gpu is quite expensive, but it's worth it!");
                        return;
                    }
                break;
            }
            this.setName(name); // We bought it, since we didn't return : we change the name
        }
    },
    
    enchantImpInvocation : function(){
        if(potions.list.impInvocationScroll.nbrOwned > 0){
        this.setSpecialgpu(true);
        this.setName("gpu of Summoning");
        potions.list.impInvocationScroll.nbrOwned -= 1;
        potions.updateOnPage();
        forge.setStep(2);
}
    },
    
    setSpecialgpu : function(value){
        this.specialgpu = value;
    },
    
    setSpecialPower : function(value){
        if(value > 0){
            this.specialPower = value;
        }
        else this.specialPower = 0;
    },
    
    getIndexOfBetterToSummon : function(){
        var indexOfBetterToSummon = 0;
        // We iterate over the list
        for(var i = 0; i < this.summonList.length; i++){
            // If we can summon this one and it is better than the current betterToSummon
            if(this.summonList[i].powerNeeded <= this.specialPower && this.summonList[i].powerNeeded > this.summonList[indexOfBetterToSummon].powerNeeded){
                // This is now the better to summon
                indexOfBetterToSummon = i;
            }
        }
        return indexOfBetterToSummon;
    },
    
    summonHere : function(id){
        // One chance out of two we summon something
        if(random.flipACoin()){
            // We summon the better to summon
            quest.things[id] = this.summonList[this.getIndexOfBetterToSummon()].summonFunction();
        }
    },
    
    enchantFire : function(){
if(potions.list.fireScroll.nbrOwned > 0){
        this.setSpecialgpu(true);
        this.setName("gpu of Flames");
        potions.list.fireScroll.nbrOwned -= 1;
        potions.updateOnPage();
        forge.setStep(2);
}
    },
    
    enchantHealth : function(){
if(potions.list.health.nbrOwned > 0){
        this.setSpecialgpu(true);
        this.setName("gpu of Life");
        potions.list.health.nbrOwned -= 1;
        potions.updateOnPage();
        forge.setStep(2);
}
    },
    
    sharpen : function(){
        this.setName("sharp chocolate gpu");
        forge.setStep(1);
    },
    
    coat : function(){
        if(chocolateBars.nbrOwned >= 1){
            chocolateBars.setNbrOwned(chocolateBars.nbrOwned - 1);
            this.setName("chocolate gpu");
            htmlInteraction.hideButton("coat");
        }
    },
    
    encrust : function(){
        if(hashes.nbrOwned >= 101){
            hashes.setNbrOwned(hashes.nbrOwned - 101);
            this.setName("hash diamond gpu");
            htmlInteraction.hideButton("encrust");
        }
    },
    
    polish : function(){
        if(Monero.nbrOwned >= 30){
            Monero.setNbrOwned(Monero.nbrOwned - 30);
            this.setName("polished hash diamond gpu");
            htmlInteraction.hideButton("polish");
        }
    },
    
    setName : function(value){
        // We change the value
        this.name = value;
        
        // We possibly show a new product in the shop depending on the new gpu name
        switch(this.name){
            case "wooden gpu": shop.showProduct("copper_gpu"); break;
            case "copper gpu": shop.showProduct("iron_gpu"); break;
            case "iron gpu": shop.showProduct("silver_gpu"); break;
            case "silver gpu": shop.showProduct("diamond_gpu"); break;
            default: shop.showProduct("products_after_gpus"); break;
        }
        
        // Other stuff
        htmlInteraction.setInnerHtml("gpu", "You currently have a " + this.name + ".");
        quest.defineMood();
        htmlInteraction.setElementVisibility("gpu", true);
        htmlInteraction.setElementVisibility("quest_form", true);
        buttons.checkgpu();
        inventory.updateOnPage();
    },
    
    // Ascii art
    asciiWoodengpuWithButton : "\
    \ __________\n\
    | ________ |\n\
    ||12345678||\n\
    |\"\"\"\"\"\"\"\"\"\"|\  <button class=\"home_button\" id=\"buy_wooden_gpu\" onClick=\"gpu.buyThisgpu(\'wooden gpu\');\">Buy a wooden tier gpu (150 hashes)</button>\n\
    |[M|#|C][-]|\n\
    |[7|8|9][+]|\n\
    |[4|5|6][x]|\n\
    |[1|2|3][%]|\n\
    |[.|O|:][=]|\n\
    \"----------\"",

    asciiWoodengpuWithoutButton : "Wooden gpu\n\
\ __________\n\
| ________ |\n\
||12345678||\n\
|\"\"\"\"\"\"\"\"\"\"|\n\
|[M|#|C][-]|\n\
|[7|8|9][+]|\n\
|[4|5|6][x]|\n\
|[1|2|3][%]|\n\
|[.|O|:][=]|\n\
\"----------\"",

    asciiCoppergpuWithButton : "Copper gpu\n\
      \ __________\n\
      | ________ |\n\
      ||12345678||\n\
      |\"\"\"\"\"\"\"\"\"\"|\  <button class=\"home_button\" id=\"buy_copper_gpu\" onClick=\"gpu.buyThisgpu(\'copper gpu\');\">Buy a copper tier gpu (300 hashes)</button>\n\
      |[M|#|C][-]|\n\
      |[7|8|9][+]|\n\
      |[4|5|6][x]|\n\
      |[1|2|3][%]|\n\
      |[.|O|:][=]|\n\
      \"----------\"",

    asciiCoppergpuWithoutButton : "Copper gpu\n\
\ __________\n\
| ________ |\n\
||12345678||\n\
|\"\"\"\"\"\"\"\"\"\"|\n\
|[M|#|C][-]|\n\
|[7|8|9][+]|\n\
|[4|5|6][x]|\n\
|[1|2|3][%]|\n\
|[.|O|:][=]|\n\
\"----------\"",

    asciiIrongpuWithButton : "\
      \ __________\n\
      | ________ |\n\
      ||12345678||\n\
      |\"\"\"\"\"\"\"\"\"\"|\  <button class=\"home_button\" id=\"buy_iron_gpu\" onClick=\"gpu.buyThisgpu(\'iron gpu\');\">Buy an iron tier gpu (500 hashes)</button>\n\
      |[M|#|C][-]|\n\
      |[7|8|9][+]|\n\
      |[4|5|6][x]|\n\
      |[1|2|3][%]|\n\
      |[.|O|:][=]|\n\
      \"----------\"",

    asciiIrongpuWithoutButton : "Iron gpu\n\
\ __________\n\
| ________ |\n\
||12345678||\n\
|\"\"\"\"\"\"\"\"\"\"|\n\
|[M|#|C][-]|\n\
|[7|8|9][+]|\n\
|[4|5|6][x]|\n\
|[1|2|3][%]|\n\
|[.|O|:][=]|\n\
\"----------\"",

    asciiSilvergpuWithButton : "\
      \ __________\n\
      | ________ |\n\
      ||12345678||\n\
      |\"\"\"\"\"\"\"\"\"\"|\  <button class=\"home_button\" id=\"buy_silver_gpu\" onClick=\"gpu.buyThisgpu(\'silver gpu\');\">Buy an iron tier gpu (1000 hashes)</button>\n\
      |[M|#|C][-]|\n\
      |[7|8|9][+]|\n\
      |[4|5|6][x]|\n\
      |[1|2|3][%]|\n\
      |[.|O|:][=]|\n\
      \"----------\"",

    asciiSilvergpuWithoutButton : "Silver gpu\n\n\
\ __________\n\
| ________ |\n\
||12345678||\n\
|\"\"\"\"\"\"\"\"\"\"|\n\
|[M|#|C][-]|\n\
|[7|8|9][+]|\n\
|[4|5|6][x]|\n\
|[1|2|3][%]|\n\
|[.|O|:][=]|\n\
\"----------\"",

    asciiDiamondgpuWithButton : "\
      \ __________\n\
      | ________ |\n\
      ||12345678||\n\
      |\"\"\"\"\"\"\"\"\"\"|\  <button class=\"home_button\" id=\"buy_diamond_gpu\" onClick=\"gpu.buyThisgpu(\'diamond gpu\');\">Buy a diamond tier gpu (2000 hashes)</button>\n\
      |[M|#|C][-]|\n\
      |[7|8|9][+]|\n\
      |[4|5|6][x]|\n\
      |[1|2|3][%]|\n\
      |[.|O|:][=]|\n\
      \"----------\"",

    asciiDiamondgpuWithoutButton : "Diamond gpu\n\n\
\ __________\n\
| ________ |\n\
||12345678||\n\
|\"\"\"\"\"\"\"\"\"\"|\n\
|[M|#|C][-]|\n\
|[7|8|9][+]|\n\
|[4|5|6][x]|\n\
|[1|2|3][%]|\n\
|[.|O|:][=]|\n\
\"----------\"",

    asciihashDiamondgpu : "hash diamond gpu\n\n\
\ __________\n\
| ________ |\n\
||12345678||\n\
|\"\"\"\"\"\"\"\"\"\"|\n\
|[M|#|C][-]|\n\
|[7|8|9][+]|\n\
|[4|5|6][x]|\n\
|[1|2|3][%]|\n\
|[.|O|:][=]|\n\
\"----------\"",

    asciiPolishedhashDiamondgpu : "Polished hash diamond gpu\n\n\
\ __________\n\
| ________ |\n\
||12345678||\n\
|\"\"\"\"\"\"\"\"\"\"|\n\
|[M|#|C][-]|\n\
|[7|8|9][+]|\n\
|[4|5|6][x]|\n\
|[1|2|3][%]|\n\
|[.|O|:][=]|\n\
\"----------\"",

    asciiChocolategpu : "Chocolate gpu\n\n\
\ __________\n\
| ________ |\n\
||12345678||\n\
|\"\"\"\"\"\"\"\"\"\"|\n\
|[M|#|C][-]|\n\
|[7|8|9][+]|\n\
|[4|5|6][x]|\n\
|[1|2|3][%]|\n\
|[.|O|:][=]|\n\
\"----------\"",

    asciiSharpChocolategpu : "Sharp chocolate gpu\n\n\
\ __________\n\
| ________ |\n\
||12345678||\n\
|\"\"\"\"\"\"\"\"\"\"|\n\
|[M|#|C][-]|\n\
|[7|8|9][+]|\n\
|[4|5|6][x]|\n\
|[1|2|3][%]|\n\
|[.|O|:][=]|\n\
\"----------\"",

    asciigpuOfFlames : "gpu of Flames\n\n\
\ __________\n\
| ________ |\n\
||12345678||\n\
|\"\"\"\"\"\"\"\"\"\"|\n\
|[M|#|C][-]|\n\
|[7|8|9][+]|\n\
|[4|5|6][x]|\n\
|[1|2|3][%]|\n\
|[.|O|:][=]|\n\
\"----------\"",

    asciigpuOfLife : "gpu of Life\n\n\
\ __________\n\
| ________ |\n\
||12345678||\n\
|\"\"\"\"\"\"\"\"\"\"|\n\
|[M|#|C][-]|\n\
|[7|8|9][+]|\n\
|[4|5|6][x]|\n\
|[1|2|3][%]|\n\
|[.|O|:][=]|\n\
\"----------\"",

    asciigpuOfSummoning : "gpu of Summoning\n\n\
\ __________\n\
| ________ |\n\
||12345678||\n\
|\"\"\"\"\"\"\"\"\"\"|\n\
|[M|#|C][-]|\n\
|[7|8|9][+]|\n\
|[4|5|6][x]|\n\
|[1|2|3][%]|\n\
|[.|O|:][=]|\n\
\"----------\"",

    asciigpuOfLiflamesummoning : "gpu of Liflamesummoning\n\n\
\ __________\n\
| ________ |\n\
||12345678||\n\
|\"\"\"\"\"\"\"\"\"\"|\n\
|[M|#|C][-]|\n\
|[7|8|9][+]|\n\
|[4|5|6][x]|\n\
|[1|2|3][%]|\n\
|[.|O|:][=]|\n\
\"----------\"",

    asciigpuOfRandomness : "  gpu of Randomness\n\n\
\ __________\n\
| ________ |\n\
||12345678||\n\
|\"\"\"\"\"\"\"\"\"\"|\n\
|[M|#|C][-]|\n\
|[7|8|9][+]|\n\
|[4|5|6][x]|\n\
|[1|2|3][%]|\n\
|[.|O|:][=]|\n\
\"----------\"",
};
