var mountBrokenCPU = {

    // Variables
    bgpuTeslaBatteryProbability : 50,

    // Functions
    onload : function(){
        land.addLand("School", 28, 1, this.load.bind(this), this.getText.bind(this));
    },
    
    setBgpuTeslaBatteryProbability : function(value){
        this.bgpuTeslaBatteryProbability = value;
    },
    
    load : function(){
        for(var i = 1; i < quest.things.length; i++){
            if(random.flipACoin()){
                // If we're not at the top of the mount
                if(i < 12 || i > 15){
                    // 1 chance out of x we spawn a TBT (Tesla battery !!)
                    if(random.oneChanceOutOf(this.bgpuTeslaBatteryProbability)){
                        this.setBgpuTeslaBatteryProbability(this.bgpuTeslaBatteryProbability + 50);
                        quest.things[i] = quest.makeBgpuTeslaBattery();
                    }
                    // 1 chance out of 7 we spaw a GSB
                    else if(random.oneChanceOutOf(7)) quest.things[i] = land.createMob("SBC", 20, 5 + random.getRandomIntUpTo(5), "broken CPU", "A sick very broken CPU. It smells.", [drops.createDrop("hashes", 3 + random.getRandomIntUpTo(3))]);
                    // Else we spawn a BCP
                    else quest.things[i] = land.createMob("BCP", 20, 20, "broken CPU", "A nasty broken CPU.", [drops.createDrop("hashes", 3 + random.getRandomIntUpTo(3))]);
                }
                else{
                    quest.things[i] = land.createMob("OBC", 30, 30, "1Ccpu", "An overclocked broken CPU. Oh, he has a 1 core, too.", [drops.createDrop("hashes", 9 + random.getRandomIntUpTo(9)), drops.createDrop("object", "key", random.oneChanceOutOf(2)), drops.createDrop("object", "boots", random.oneChanceOutOf(5)), drops.createDrop("object", "swampMap", random.oneChanceOutOf(5)), drops.createDrop("object", "hutMap", random.oneChanceOutOf(5))]);
                }
            }
        }
    },
    
    getText : function(){
        var text = "";
        
        text += "                                    "; for(var i = 12; i < 16; i++) text += quest.things[i].text; text += "\n";
        text += "                           "; for(var i = 9; i < 12; i++) text += quest.things[i].text; text += "/ \\/ \\/ \\/ \\"; for(var i = 16; i < 19; i++) text += quest.things[i].text; text += "\n";
        text += "                  "; for(var i = 6; i < 9; i++) text += quest.things[i].text; text += "/ \\/ \\/ \\  /   \\  \\  / \\/ \\/ \\"; for(var i = 19; i < 22; i++) text += quest.things[i].text; text += "\n";
        text += "         "; for(var i = 3; i < 6; i++) text += quest.things[i].text; text += "/ \\/ \\/ \\   \\ /   \\/     \\  \\/  /   \\  / \\/ \\/ \\"; for(var i = 22; i < 25; i++) text += quest.things[i].text; text += "\n";
        text += ""; for(var i = 0; i < 3; i++) text += quest.things[i].text; text += "/ \\/ \\/ \\  /  /   \\   /    /       \\ /  /     \\/  /   \\  / \\/ \\/ \\"; for(var i = 25; i < 28; i++) text += quest.things[i].text;
    
        return text;
    }

};
