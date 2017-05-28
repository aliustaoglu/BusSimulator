DIRECTION = {
  NONE : -1,
  EAST : 0,
  NORTH : 1,
  WEST : 2,
  SOUTH : 3
}

$(function() {
  // Create a 5x5 sized platform (It could be mxn sized if desired)
  var myPlatform = new platform('.platform', 5, 5, 70, 70)
  var myBus = new bus(-1, -1, "NONE", myPlatform);
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

  $("#txtCommand").keypress(function(e){
    if (e.which == 13) {
        $('#btnCommand').trigger( "click" );
        e.preventDefault();
    }
  })
  
});