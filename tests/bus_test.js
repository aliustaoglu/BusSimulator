var expect = chai.expect;

describe("bus", function() {
  describe("BusClass", function() {
    this.timeout(15000);
    it("Bus can set position-X", function() {
      var myBus = new bus();
      myBus.setPosition(3 ,2, 0);
      expect(myBus.x).to.equal(3);
    });

    it("Bus can set position-Y", function() {
      var myBus = new bus();
      myBus.setPosition(3 ,2, 0);
      expect(myBus.y).to.equal(2);
    });

    it("Bus can set position-ORIENT", function() {
      var myBus = new bus();
      myBus.setPosition(3 ,2, 0);
      expect(myBus.orient).to.equal(0);
    });




  });

    describe("PlatformClass", function() {
        this.timeout(15000);
        it("Platform can init", function() {
        var myBus = new bus();
        myBus.setPosition(3 ,2, 0);
        var myPlatform = new platform();
        expect(myBus.x).to.equal(3);
        });
    });

    describe("CommandClass", function() {
        this.timeout(15000);
            
        it("Command can init-1", function() {
            var myCommand = new command();
            var com = myCommand.splitCommand("place 2, 1, west");
            expect(com.params[0].trim()).to.equal("2");
        });
        
        it("Command can init-2", function() {
            var myCommand = new command();
            var com = myCommand.splitCommand("place 2, 1, west");
            expect(com.params[1].trim()).to.equal("1");
        });

        it("Command can init-3", function() {
            var myCommand = new command();
            var com = myCommand.splitCommand("place 2, 1, west");
            expect(com.params[2].trim()).to.equal("west");
        });

        it("Command can init-4", function() {
            var myCommand = new command();
            var com = myCommand.splitCommand("place 2, 1, west");
            expect(com.command).to.equal("PLACE");
        });
    });

});