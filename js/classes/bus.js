function bus(x, y, orient){
    this.isInitialized = false;
    this.x = x;
    this.y = y;
    this.orient = orient;
    this.isValidMove = false;

    this.setPosition = function(newX, newY, newOrient){
        if (newX !== null) this.x = newX;
        if (newY !== null) this.y = newY;
        if (newOrient!==null) this.orient = newOrient;
    }

    this.place = function(newX, newY, newOrient){
        this.setPosition(newX, newY, newOrient);
        //return [newX, newY, newOrient];
    }

    this.move = function(){

    }

    this.left = function(){
        
    }

    this.right = function(){
        
    }

    this.report = function(){
        alert("report");
    }

}