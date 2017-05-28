function bus(x, y, orient, plt){
    this.platform = plt;
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
        this.isValidMove = true;
        this.isInitialized = true;
    }

    this.move = function(){
        var pos = { x : this.x, y: this.y, orient:this.orient };
        switch (pos.orient){
            case DIRECTION.EAST:
            pos.x++; break;
            case DIRECTION.NORTH:
            pos.y++; break;
            case DIRECTION.WEST:
            pos.x--; break;
            case DIRECTION.SOUTH:
            pos.y--; break;
        }
        this.isValidMove = pos.x>=0 && pos.y>=0 && pos.x< this.platform.cols && pos.y<this.platform.rows;

        if (this.isValidMove) {
            this.x = pos.x;
            this.y = pos.y;
        }
    }

    this.left = function(){
        var val = this.orient;
        var newVal = (val + 1) % 4;
        this.orient = newVal;
        this.isValidMove = true;
    }

    this.right = function(){
        var val = this.orient;
        var newVal = (val + 3) % 4;
        this.orient = newVal;
        this.isValidMove = true;
    }

    this.report = function(){
        alert("x:" + this.x + "\ny:" + this.y + "\norient:" + this.orient);
    }

}