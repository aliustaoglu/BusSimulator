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
        .attr({"x": x*width + x, "y":y*height + y, "width": width, "height":height})
        .style({ "fill": "yellow", "stroke": "blue", "stroke-width" : 1});
    }
    //---------------------------------------------------------------------
    this.paintBus = function(myBus){
        var polygon = "";
        busScale = { x: 350, y:350 }; // below is a 350x350 svg
        var scale;
        polygon = this.getBusSvg();
        var busContainer = svg.append("g");
        for (var i=0; i<polygon.length;i++)
            busContainer.append("path").attr("d", polygon[i]);
       
        var position;
        switch(myBus.orient){
            case DIRECTION.SOUTH:
            position = [(myBus.x + 1) * this.width, ((this.rows - myBus.y) * this.height) + this.rows - myBus.y - 1];
            scale = [width / busScale.x, -1 * height / busScale.y ];
            busContainer.attr("transform","translate(" + position.join(",") + "), scale(" + scale.join(",") + "), rotate(90)");
            break;
            case DIRECTION.EAST:
            scale = [-1 * width / busScale.x, height / busScale.y ];
            position = [(myBus.x + 1) * this.width + myBus.x, ((this.rows - myBus.y - 1) * this.height)];
            busContainer.attr("transform","translate(" + position.join(",") + "), scale(" + scale.join(",") + "), rotate(0)");
            break;
            case DIRECTION.WEST:
            scale = [width / busScale.x, height / busScale.y ];
            position = [(myBus.x) * this.width + myBus.x, ((this.rows - myBus.y - 1) * this.height)];
            busContainer.attr("transform","translate(" + position.join(",") + "), scale(" + scale.join(",") + "), rotate(0)");
            break;
            case DIRECTION.NORTH:
            scale = [-1 * width / busScale.x, height / busScale.y ];
            position = [(myBus.x) * this.width, ((this.rows - myBus.y - 1) * this.height) + this.rows - myBus.y - 1];
            busContainer.attr("transform","translate(" + position.join(",") + "), scale(" + scale.join(",") + "), rotate(90)");
            break;
        }
        if (!myBus.isValidMove) {
            busContainer.selectAll("path").style({"fill": "red", "stroke": "blue", "stroke-width" : 1});
        } else {
            busContainer.selectAll("path").style({"fill": "black"});
        }
    }
    //---------------------------------------------------------------------
    // Below is a bus svg coordinates found on the internet
    // Could be anything as long as the size is known
    this.getBusSvg = function(){
        polygon = ["M77.695,208.593c-17.985,0-32.562,14.571-32.562,32.559c0,17.988,14.576,32.559,32.562,32.559\n" +
			"c17.992,0,32.564-14.57,32.564-32.559C110.259,223.163,95.687,208.593,77.695,208.593z M77.695,255.306\n" +
			"c-7.818,0-14.153-6.334-14.153-14.154c0-7.822,6.335-14.154,14.153-14.154c7.819,0,14.159,6.332,14.159,14.154\n"+
			"C91.854,248.972,85.514,255.306,77.695,255.306z",
            "M268.854,208.593c-17.986,0-32.561,14.571-32.561,32.559c0,17.988,14.574,32.559,32.561,32.559\n" +
			"c17.992,0,32.564-14.57,32.564-32.559S286.846,208.593,268.854,208.593z M268.854,255.306c-7.818,0-14.154-6.334-14.154-14.154\n"+
			"c0-7.822,6.336-14.154,14.154-14.154c7.82,0,14.16,6.332,14.16,14.154C283.014,248.972,276.674,255.306,268.854,255.306z",
            "M330.998,76.741H38.915c-10.701,0-21.207,8.579-23.348,19.064L3.892,138.423C1.751,148.908,0,166.242,0,176.944v44.751\n"+
			"c0,10.7,8.756,19.456,19.457,19.456h19.839c0-21.17,17.226-38.395,38.398-38.395c21.174,0,38.401,17.223,38.401,38.395h114.358\n"+
			"c0-21.17,17.227-38.395,38.398-38.395c21.176,0,38.402,17.223,38.402,38.395h23.74c10.703,0,19.457-8.754,19.457-19.456V96.197\n"+
			"C350.455,85.496,341.699,76.741,330.998,76.741z M80.856,158.836H35.512l7.186-17.019c1.254-2.97-0.137-6.394-3.106-7.648\n"+
			"c-2.972-1.254-6.395,0.138-7.647,3.107l-8.91,21.103c-6.015-1.581-9.676-7.214-8.437-13.89l10.46-41.74\n"+
			"c1.465-7.891,9.23-14.348,17.256-14.348h38.543L80.856,158.836L80.856,158.836z M167.439,158.836H92.53V88.401h74.909V158.836z\n"+
			 "M254.021,158.836h-74.908V88.401h74.908V158.836z M338.523,144.244c0,8.026-6.566,14.593-14.594,14.593h-58.234V88.402h58.234\n"+
			"c8.027,0,14.594,6.567,14.594,14.593V144.244z"];
        return polygon;
    }
    //---------------------------------------------------------------------
    
}