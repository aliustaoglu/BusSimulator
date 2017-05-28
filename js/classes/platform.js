// Draw the platform on the selector
function platform(selector, rows, cols, height, width){
    this.svg = null;
    this.selector = selector;
    this.rows = rows;
    this.cols = cols;
    this.height = height;
    this.width = width;
    this.init = function(){
        paintPlatform();
        for (var i=0;i<cols;i++)
            for (var j=0;j<rows;j++)
                paintPark(i, j);
    }
    //---------------------------------------------------------------------
    var paintPlatform = function(){
        this.svg = d3.select(selector).append('svg')
            .attr({width: cols*width + cols,height: rows*height + rows });
    }
    //---------------------------------------------------------------------
    var paintPark = function(x, y){
        var sq = svg.append("rect")
            .attr({"x": x*width + x, "y":y*height + y})
            .style({"width": width, "height":height, "fill": "yellow", "stroke": "blue", "stroke-width" : 1})
            ;
    }
    //---------------------------------------------------------------------
    this.paintBus = function(myBus){
        this.transposeRow(myBus);
        
        var axis = myBus.x * this.width + myBus.x;
        var ordinat = myBus.y * this.height + myBus.y;
        var polygon = "";
        switch(myBus.orient){
            case DIRECTION.SOUTH:
            polygon = [axis, ordinat, axis + this.width / 2, ordinat + this.height, axis + this.width, ordinat].join(",");
            break;
            case DIRECTION.EAST:
            polygon = [axis, ordinat, axis, ordinat + this.height, axis + this.width, ordinat + this.height / 2].join(",");
            break;
            case DIRECTION.WEST:
            polygon = [axis + this.width, ordinat, axis, ordinat + this.height / 2, axis + this.width, ordinat + this.height].join(",");
            break;
            case DIRECTION.NORTH:
            polygon = [axis, ordinat + this.height, axis + this.width / 2, ordinat, axis + this.width, ordinat + this.height].join(",");
            break;
        }

        var busContainer = svg.append("polygon").attr("points", polygon);
    }
    //---------------------------------------------------------------------
    // Because our (0, 0) point is SOUTHWEST
    this.transposeRow = function(myBus){
        myBus.y = this.rows - 1 - myBus.y;
    }

    
}