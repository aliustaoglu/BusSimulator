function command(myPlatform, myBus){
    var myCommand = "";
    var myPlatform = myPlatform;
    var myBus = myBus;

    var validCommands = ["PLACE", "MOVE", "LEFT", "RIGHT", "REPORT"];
    var validFirstCommands = ["PLACE", "HELP"];
    //--------------------------------------------------------------
    // Check if this is a legit command
    var isCommandValid = function(){
        var commands = myCommand.split(" ");
        if (commands.length<1)
            return "No command.";
        if (!myBus.isInitialized) {
            if (validFirstCommands.indexOf(commands[0].toUpperCase())<0)
                return "Not a valid first command. Bus needs to be placed on platform first";
        } else {
            if (validFirstCommands.indexOf(commands[0].toUpperCase())<0){
                if (validCommands.indexOf(commands[0].toUpperCase())<0 || commands.length!=1)
                    return "Not a valid command";
            } else {
                if (commands.length != 4)
                    return "Not a valid command";

            }
        }
        return "";
    }
    //--------------------------------------------------------------
    this.setCommand = function(strCommand){
        myCommand= strCommand.replace(/\s\s+/g, ' ').trim(); // Replace all whitespaces with single whitespace
        myBus.isInitialized = true;
        var commandCheck = isCommandValid();
        if (commandCheck !="") {
            alert(commandCheck);
            return;
        } else {
            this.executeCommand(myCommand);
            $('#listHistory').append($('<option>', { 
                value: strCommand,
                text : strCommand 
            }));
        }

        
    }
    //--------------------------------------------------------------
    this.executeCommand = function(myCommand){
        //d3.select(myPlatform.selector).selectAll("polygon").remove();
        d3.select(myPlatform.selector).selectAll("path").remove();
        myBus.isInitialized = true;
        var commands = myCommand.toUpperCase().split(" ");
        
        //myBus[commands[0].toLowerCase()].call(commands);

        switch (commands[0]){
            case "PLACE":
            myBus.place(parseInt(commands[1]), parseInt(commands[2]), parseInt(DIRECTION[commands[3].toUpperCase()]));
            break;
            case "MOVE": 
            myBus.move();
            break; 
            case "LEFT": 
            myBus.left();
            break;
            case "RIGHT":
            myBus.right(); 
            break; 
            case "REPORT": 
            myBus.report();
            break;
        }


        //myBus.x = 4;
        //myBus.y = 4;
        //myBus.orient = DIRECTION.SOUTH;

        myPlatform.paintBus(myBus);
    }
    //--------------------------------------------------------------

    //--------------------------------------------------------------
    
}