var Monero = {
    
    // Variables
    nbrOwned : 0,
    nbrBought : 0,
    nbrInStock : 1000,
    stockShortage : false,
    
    // Functions
    buy1 : function(){
        if(hashes.nbrOwned >= shop.oneMoneroPrice && this.nbrInStock >= 1){
            hashes.setNbrOwned(hashes.nbrOwned - shop.oneMoneroPrice);
            this.setNbrOwned(this.nbrOwned + 1);
            this.setNbrBought(this.nbrBought + 1);
            this.setNbrInStock(this.nbrInStock - 1);
            shop.setMerchantSpeech("Thanks for them hash'rs! Here's your " + this.getContributor() + " inspired payout of Monero.");
        }
    },
    
    buy10 : function(){
        if(hashes.nbrOwned >= shop.tenMoneroPrice && this.nbrInStock >= 10){
            hashes.setNbrOwned(hashes.nbrOwned - shop.tenMoneroPrice);
            this.setNbrOwned(this.nbrOwned + 10);
            this.setNbrBought(this.nbrBought + 10);
            this.setNbrInStock(this.nbrInStock - 10);

            let tenContributors = "";
            for (let i = 0; i < 10; i ++)
                tenContributors += this.getContributor() + "\n";
            shop.setMerchantSpeech("Thanks for buyin'! Here's your ten Monero. Inspired by a number of generous folk: " + tenContributors);
        }
        else shop.setMerchantSpeech("I'm sorry, we don't have enough Monero in stock to sell you ten of them. We currently have " + this.nbrInStock + " Monero in stock.");
    },
    
    getContributor : function(){
        var contributor = ["moneromooo-monero", "fluffypony", "stoffu", "hyc", "warptangent", "tewinget", "mbg033", "Jaqueeee", "radfish", "mikezackles", "vtnerd", "anonimal", "NanoAkron", "ph4r05", "TheCharlatan", "kenshi84", "mathstuf", "oranjuice", "xiphon", "Gingeropolous", "iDunk5400", "IPGlider", "MoroccanMalinois", "luigi1111", "jtgrassie", "cslashm", "rfree2monero", "rbrunner7", "ranok", "glv2", "erikd", "cryptochangements34", "erciccione", "Neozaru", "ston1th", "naughtyfox", "emesik", "codehalo", "selsta", "jakoblind", "vickio", "vdo", "oyvkva", "moneroexamples", "Doy-lee", "mrwhythat", "m2049r", "leonklingele", "dersen#52dave-andersen", "bigreddmachine", "Timo614", "SChernykh", "xmr-eric", "tmoravec", "paulshapiro", "jeandudey", "homdx", "cole-lightfighter", "MaxXor", "vasild", "tomsmeding", "nvmd", "jcktm", "h4sh3d", "guzzijones", "fireice-uk", "campassi", "bclermont", "Jkat", "zone117x", "xnbya", "vicsn", "thaerkh", "paybee", "ordtrogen", "ndorf", "me0wmix", "lancillotto", "jwinterm", "jonathancross", "fhirschmann", "cmars", "SarangNoether", "JollyMort", "who-biz", "rockhouse", "rex4539", "omani", "normoes", "jsejcksn", "h908714124", "glemercier", "gene-telligent", "einsteinsfool", "Sylvyrfysh", "JesusRami", "0AnythingTechPro", "dsc__"]
        var community = ["dEBRUYNE_1", "SamsungGalaxyPlayer", "needmoney90"];
        var core = ["fluffypony", "smooth_xmr", "tacotime", "luigi1111", "NoodleDoodle", "ArticMine", "Othe", "eizh", "davidlatapie", "binaryFate"];
        var originals = ["Satoshi Nakamoto", "Nicolas van Saberhagen", "DStrange", "Antonio Juarez"];
        
        var chances = [];
        if(this.nbrBought < 10) chances = [1];
        else if(this.nbrBought < 10) chances = [1];
        else if(this.nbrBought < 15) chances = [0.9, 1];
        else if(this.nbrBought < 20) chances = [0.8, 1];
        else if(this.nbrBought < 25) chances = [0.7, 1];
        else if(this.nbrBought < 30) chances = [0.5, 1];
        else if(this.nbrBought < 35) chances = [0.4, 0.9, 1];
        else if(this.nbrBought < 40) chances = [0.3, 0.8, 1];
        else if(this.nbrBought < 45){
            if(this.nbrBought == 42 && random.flipACoin()) return "space";
            else chances = [0.2, 0.7, 1];
        }
        else if(this.nbrBought < 50) chances = [0.1, 0.6, 1];
        else if(this.nbrBought < 55) chances = [0.1, 0.5, 1];
        else if(this.nbrBought < 60) chances = [0.1, 0.4, 0.9];
        else if(this.nbrBought < 65) chances = [0.1, 0.3, 0.8];
        else if(this.nbrBought < 70) chances = [0.1, 0.2, 0.7];
        else if(this.nbrBought < 75) chances = [0.1, 0.2, 0.6];
        else if(this.nbrBought < 80) chances = [0.1, 0.2, 0.5];
        else if(this.nbrBought < 85) chances = [0.1, 0.2, 0.4];
        else if(this.nbrBought == 1337 && random.flipACoin()) return "leet";
        else chances = [0.1, 0.2, 0.3];
        
        var r = random.getRandomFloat()
        if(r < chances[0]) return random.pickRandomly(contributor);
        else if(r < chances[1]) return random.pickRandomly(community);
        else if(r < chances[2]) return random.pickRandomly(core);
        else return random.pickRandomly(originals);
    },
    
    delivery : function(){
        this.setNbrInStock(this.nbrInStock + 15 + random.getRandomIntUpTo(10));
        window.setTimeout(this.delivery.bind(this), 900000); // One delivery every 15 minutes
    },
    
    setNbrOwned : function(value){
        this.nbrOwned = value;
        if(this.nbrOwned != 1) htmlInteraction.setInnerHtml("Monero", "You have " + this.nbrOwned + " Monero!");
        else htmlInteraction.setInnerHtml("Monero", "You have 1 Monero!");
        htmlInteraction.setElementVisibility("Monero", true);
        buttons.checkMonero();
        cauldron.updateActionsInfoOnPage();
        computer.updateMonero();
    },
    
    setNbrBought : function(value){
        this.nbrBought = value;
    },
    
    setNbrInStock : function(value){
        // Set the value
        this.nbrInStock = value;
        
        // If > 100, decrease it
        if(this.nbrInStock > 140) this.nbrInStock = 140;
        
        // Handle Monero stock shortage
        if(this.stockShortage == false && this.nbrInStock == 0){
            this.stockShortage = true;
            buttons.checkMoneroStockShortage();
        }
        else if(this.stockShortage == true && this.nbrInStock != 0){
            this.stockShortage = false;
            buttons.checkMoneroStockShortage();
        }
    }
    
};
