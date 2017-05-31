DIRECTION = {
  NONE : -1,
  EAST : 0,
  NORTH : 1,
  WEST : 2,
  SOUTH : 3
}

$(function() {
  var ExamplesView = Backbone.View.extend({
    id: "console",
    initialize: function() {
      $("#console").html(this.getTemplate());
    },
    getTemplate: function() {
      var examples = this.getExamples()[this.options];
      var commands = examples.split(";");
      this.sampleCommands = commands.slice();
      var html = "<p>" + this.options.toUpperCase() + " Example</p>"
      html += '<select id="listExamples" size="15" style="width:430px;">';
      var i = 0;
      while (commands.length>0){
        var c = commands.shift();
        html += "<option value='step" + commands.length + "'>" + c + "</option>"
        
      }
      html+='</select><br /><button type="button" onclick="executeStep()" class="btn btn-primary">Execute Step</button><div id="status"></div>';
      return html;
    },
    getExamples : function(){
      var examples = {
        "bouncing" : "place 0,0,north;move;move;move;move;move;right;move;right;move;move;move;move;move;left;move;left;move;move;move;move;move;right;move;right;move;move;move;move;move;left;move;left;move;move;move;move;move",
        "chesshorse" : "place 4,4,south;move;move;right;move;move;move;move",
        "cross" : "place 0,0,north;move;right;move;left;move;right;move;left;move;right;move;left;move;right;move;right;move;right;move;left;move;right;move;left;move;right;move;left;move;right;move;right",
        "eight": "place 1,0,north;move;move;right;move;move;left;move;move;left;move;move;left;move;move;left;move;move;right;move;move;right;move;move;right",
        "fullscan": "place 0,0,north;move;move;move;move;right;move;right;move;move;move;move;left;move;left;move;move;move;move;right;move;right;move;move;move;move;left;move;left;move;move;move;move",
        "nokiasnake": "place 0,0,north;move;move;move;move;right;move;move;right;move;move;move;right;move;left;move;left;move;move;move;move",
        "randomcorrupted": "This;data;does;not;make;any;sense;therefore;it;should;be;ignored;not;crash",
        "randomerror": "move;place x,y,z;place 1,0,south;right;move;move;left",
        "tour": "place 0,0,north;move;move;move;move;right;move;move;move;move;right;move;move;move;move;right;move;move;move;move;right"
      }
      return examples;
    }
    

  });
  

  var MainView = Backbone.View.extend({
    initialize: function(){
      $("#console").html(this.template());
      $("#txtCommand").keypress(function(e){
        if (e.which == 13) {
            $('#btnCommand').trigger( "click" );
            e.preventDefault();
        }
      });
    },
    template: function(){
      return '<div class="col-4" id="console">'+
              '<div class="control">'+
                  'Command: <input type="text" id="txtCommand" style="width:300px"></input>'+
                  '<input id="btnCommand" type="button" value="Send" onClick="execCommand()" /><br />'+
                  '<div>Command History:</div>'+
                  '<select id="listHistory" size="15" style="width:430px;" ondblclick="executeHistory()">'+
                  '</select>'+
                  '<div id="status"></div>'+
              '</div>'+
          '</div>'+
      '</div>'
    }
  })

var AboutView = Backbone.View.extend({
    initialize: function(){
      $("#console").html(this.template());
    },
    template: function(){
      return "Pure JS Single Page App written by Cuneyt Aliustaoglu. It does not need server side so can run in any browser.<br /> Tested on <b>Google Chrome</b>.";
    }
  })

  var AppRouter = Backbone.Router.extend({
      routes: {
          "" : "mainRoute",
          "examples/:example": "examplesRoute",
          "about" : "aboutRoute"
      }
  });

  var app_router = new AppRouter;

  app_router.on('route:examplesRoute', function(example) {
      this.view = new ExamplesView(example);
  });
  app_router.on('route:mainRoute', function(actions) {
      this.view = new MainView();
  });
  app_router.on('route:aboutRoute', function(actions) {
      this.view = new AboutView();
  });

  Backbone.history.start();




  // Create a 5x5 sized platform (It could be mxn sized if desired)
  var myPlatform = new platform('.platform', 5, 5, 70, 70)
  var myBus = new bus(-1, -1, "NONE", myPlatform);
  this.sampleCommands = [];
  myPlatform.init();
  
  var myCommand = new command(myPlatform, myBus);

  this.execCommand = function(){
    var strCommand = $('#txtCommand').val();
    myCommand.setCommand(strCommand);
  }

  this.executeHistory = function(){
    var command = $('#listHistory').find(":selected").text();
    $('#txtCommand').val(command);
    $('#btnCommand').trigger( "click" );
  }

  this.executeStep = function(){
    var commandOption = $("#listExamples option[value='step" + ($("#listExamples").children().length-1) + "']");
    var com = myCommand.isCommandValid(commandOption.text());
    if (com=="") {
      myCommand.executeCommand(commandOption.text());
      commandOption.remove();
    }
    $("#status").html(com);
  }


  



});


