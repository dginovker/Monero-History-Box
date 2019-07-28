var farm = {
    
    // Variables
    GPUInstalled : 0, // The number of GPU Installed in the farm
    productionDelayType : "none", // On which delay does the farm product Monero (day, hour, min, sec...)
    MoneroPerDay : 0, // How many Monero the farm produce every day
    MoneroProduction : 0, // How many Monero the farm produce every day, hour, min, sec.. depending on the production delay type
    maxMoneroPerDay : 8640000, // = 100/sec
    flagsList : [" ~ ", " * ", "cnd", " ! ", " + ", " ? ", "/|\\"], // List of ascii flags which can appear on the farm
    currentFlagIndex : 0, // Index in the list of the current flag shown
    installingButtonsStep : 0, // Step of the Monero installing buttons : (= which buttons are shown, 1000, 100.. ?)
    
    // Functions
    calculateMoneroPerDay : function(){
        if(this.GPUInstalled <= 293){ // sqrt(86400) = 293
            this.MoneroPerDay = Math.pow(this.GPUInstalled, 2); // 293 will give 85849
        }
        else{ // When we're counting in Monero/sec, this function is used instead of the other one. It will stabilize the curve.
            var prod = (this.GPUInstalled - 122) * 500; // 194 will give 86000
            if(prod < this.maxMoneroPerDay) this.MoneroPerDay = prod;
            else this.MoneroPerDay = this.maxMoneroPerDay;
        }
    },
    
    setInstallingButtonsStep : function(value){
        // Set the value
        this.installingButtonsStep = value;
        
        // Update on page
        switch(this.installingButtonsStep){
            case 1:
                htmlInteraction.setInnerHtml("Monero_buttons", "<button class=\"home_button\" id=\"install_1_Monero\" onClick=\"farm.installMonero(1);\">Install 1 Monero</button>");
            break;
            case 2:
                htmlInteraction.setInnerHtml("Monero_buttons", "Install <button class=\"home_button\" id=\"install_1_Monero\" onClick=\"farm.installMonero(1);\">1</button><button class=\"home_button\" id=\"install_10_Monero\" onClick=\"farm.installMonero(10);\" style=\"visibility:hidden\">10</button> Monero");
            break;
            case 3:
                htmlInteraction.setInnerHtml("Monero_buttons", "Install <button class=\"home_button\" id=\"install_1_Monero\" onClick=\"farm.installMonero(1);\">1</button><button class=\"home_button\" id=\"install_10_Monero\" onClick=\"farm.installMonero(10);\" style=\"visibility:hidden\">10</button><button class=\"home_button\" id=\"install_100_Monero\" onClick=\"farm.installMonero(100);\" style=\"visibility:hidden\">100</button> Monero");
            break;
            case 4:
                htmlInteraction.setInnerHtml("Monero_buttons", "Install <button class=\"home_button\" id=\"install_1_Monero\" onClick=\"farm.installMonero(1);\">1</button><button class=\"home_button\" id=\"install_10_Monero\" onClick=\"farm.installMonero(10);\" style=\"visibility:hidden\">10</button><button class=\"home_button\" id=\"install_100_Monero\" onClick=\"farm.installMonero(100);\" style=\"visibility:hidden\">100</button><button class=\"home_button\" id=\"install_1000_Monero\" onClick=\"farm.installMonero(1000);\" style=\"visibility:hidden\">1000</button> GPUs (1 XMR = 1 GPU)");
            break;
        }
        
        // Check the buttons
        buttons.checkMoneroInstallingButtons();
    },
    
    clickedOnTheBigMonero : function(){
        // Increment the current flag index
        this.setCurrentFlagIndex(this.currentFlagIndex + 1);
    },
    
    setCurrentFlagIndex : function(value){
        // Set the new value and correct it if incorrect
        this.currentFlagIndex = value;
        if(this.currentFlagIndex >= this.flagsList.length || this.currentFlagIndex < 0) this.currentFlagIndex = 0;
        
        // Update on the page
        htmlInteraction.setInnerHtml("farm_big_Monero", this.flagsList[this.currentFlagIndex]);
    },
    
    checkVisibility : function(){
        if(objects.list.key.have){
            htmlInteraction.setElementVisibility("farm", true);
        }
    },
    
    installMonero : function(number){
        if(Monero.nbrOwned >= number){
            Monero.setNbrOwned(Monero.nbrOwned - number);
            this.setGPUInstalled(this.GPUInstalled + number);
        }
    },
    
    setGPUInstalled : function(value){
        // We change the value
        this.GPUInstalled = value;
        
        // We update on page
        htmlInteraction.setInnerHtml("GPU_Installed", "GPU Installed : " + this.GPUInstalled);
        
        // We re calculate stuff
        this.calculateMoneroPerDay();
        this.calculateMoneroProductionFromMoneroPerDay();
    },
    
    calculateMoneroProductionFromMoneroPerDay : function(){
        if(this.MoneroPerDay < 24){
            this.setProductionDelayType("day");
            this.setMoneroProduction(Math.floor(this.MoneroPerDay));
        }
        else if(this.MoneroPerDay < 1440){
            this.setProductionDelayType("hour");
            this.setMoneroProduction(Math.floor(this.MoneroPerDay/24));
        }
        else if(this.MoneroPerDay < 86400){
            this.setProductionDelayType("min");
            this.setMoneroProduction(Math.floor(this.MoneroPerDay/1440));
        }
        else{
            this.setProductionDelayType("sec");
            this.setMoneroProduction(Math.floor(this.MoneroPerDay/86400));
        }
    },

    setProductionDelayType: function(value){
        this.productionDelayType = value;
    },
    
    setMoneroProduction : function(value){
        this.MoneroProduction = value;
        htmlInteraction.setInnerHtml("Monero_production", "Production : " + this.MoneroProduction + " Monero/" + this.productionDelayType);
    },
    
    setMaxMoneroPerDay : function(value){
        // We set the max Monero per day
        this.maxMoneroPerDay = value;
        
        // We re calculate stuff
        this.calculateMoneroPerDay();
        this.calculateMoneroProductionFromMoneroPerDay();
    }
    
};
