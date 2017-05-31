function command(myPlatform, myBus){
    var myCommand = "";
    var myPlatform = myPlatform;
    var myBus = myBus;

    var validCommands = ["PLACE", "MOVE", "LEFT", "RIGHT", "REPORT"];
    var validFirstCommands = ["PLACE", "HELP"];
    //--------------------------------------------------------------
    this.splitCommand = function(myCommand){
        myCommand = myCommand.trim();
        var ind = myCommand.trim().indexOf(' ');
        var command = myCommand.toUpperCase();
        if (ind>0)
            command = myCommand.substr(0,  ind+1).trim().toUpperCase();
        var params = myCommand.substr(ind+1).replace(/\s\s+/g, '').trim().split(",");
        return {command: command, params: params};
    }
    //--------------------------------------------------------------
    // Check if this is a legit command
    this.isCommandValid = function(cmd){
        if (cmd !== undefined)
            myCommand = cmd;
        var err = "";
        var command = this.splitCommand(myCommand).command;
        var params = this.splitCommand(myCommand).params;
        if (command === "")
            err = "No command.";
        if (!myBus.isInitialized) {
            if (validFirstCommands.indexOf(command.toUpperCase())<0)
                err = "Not a valid first command. Bus needs to be placed on platform first";
        }
        if (validFirstCommands.indexOf(command.toUpperCase())<0){
                if (validCommands.indexOf(command.toUpperCase())<0 || params.length!=1)
                    err = "Not a valid command";
            } else {
                if (params.length != 3)
                    err = "Not a valid command";
                else{
                    if (DIRECTION[params[2].trim().toUpperCase()] === undefined)
                        err = "Not a valid direction";
                    if (params[0] != parseInt(params[0],10) || params[0] != parseInt(params[0],10))
                        err = "Not valid coordinates";
                    if ((params[0] > myPlatform.rows-1) || (params[1] > myPlatform.cols-1))
                        err = "Not valid coordinates";
                }
            }
        this.cmd = { command :  command, params: params};
        if (err != "")
            err = "<span style='color:red'>" + err + "</span>"
        return err;
    }
    //--------------------------------------------------------------
    this.setCommand = function(strCommand){
        myCommand= strCommand.replace(/\s\s+/g, ' ').trim(); // Replace all whitespaces with single whitespace
        var commandCheck = this.isCommandValid();
        if (commandCheck !="") {
            $("#status").html(commandCheck);
            return;
        } else {
            $("#status").html("");
            this.executeCommand(myCommand);
            $('#listHistory').append($('<option>', { 
                value: strCommand,
                text : strCommand 
            }));
        }

        
    }
    //--------------------------------------------------------------
    this.executeCommand = function(myCommand){
        d3.select(myPlatform.selector).selectAll("path").remove();
        myBus.isInitialized = true;
        var cmd = this.splitCommand(myCommand);
        switch (cmd.command.toUpperCase()){
            case "PLACE":
            myBus.place(parseInt(cmd.params[0]), parseInt(cmd.params[1]), parseInt(DIRECTION[cmd.params[2].toUpperCase().trim()]));
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
        myPlatform.paintBus(myBus);
    }
    //--------------------------------------------------------------

    //--------------------------------------------------------------
    
}