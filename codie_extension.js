(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    
    ext.move = function(direction, distance, speed, callback) {
        console.log('Move function called');
        $.ajax({
              url: 'http://localhost:8391/action/godistance',
              data: {
                  distance: distance*10,
                  speedLeft: distance=='forward'?speed:speed*-1,
                  speedRight: distance=='forward'?speed:speed*-1
              },
              dataType: 'jsonp',
              success: function() {
                  console.log('Ajax call success');
                  callback();
              },
              error: function(jqXHR, textStatus, errorThrown) {
                  console.log('Ajax call fail - Status: '+textStatus+' - Error text: '+jqXHR.responseText);
                  callback();
              },
              timeout: 1000000
        });
    };
    
    /*ext.my_first_block = function() {
        // Code that gets executed when the block is run
    };
    
    // Functions for block with type 'w' will get a callback function as the 
    // final argument. This should be called to indicate that the block can
    // stop waiting.
    ext.wait_random = function(callback) {
        wait = Math.random();
        console.log('Waiting for ' + wait + ' seconds');
        window.setTimeout(function() {
            callback();
        }, wait*1000);
    };
    
    ext.power = function(base, exponent) {
        return Math.pow(base, exponent);
    };
    
    ext.get_temp = function(location, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=imperial',
              dataType: 'jsonp',
              success: function( weather_data ) {
                  // Got the data - parse it and return the temperature
                  temperature = weather_data['main']['temp'];
                  callback(temperature);
              }
        });
    };
    
    ext.set_alarm = function(time) {
       window.setTimeout(function() {
           alarm_went_off = true;
       }, time*1000);
    };
    
    ext.when_alarm = function() {
       // Reset alarm_went_off if it is true, and return true
       // otherwise, return false.
       if (alarm_went_off === true) {
           alarm_went_off = false;
           return true;
       }
       
       return false;
    };*/
    
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            //[' ', 'my first block', 'my_first_block'],
            ['w', 'go %m.direction %n cms with %n % speed', 'move', 'forward', 10, 100], // Waiting block, blocking until execution finishes
            // Block type, block name, function name, param1 default value, param2 default value
            /*['r', '%n ^ %n', 'power', 2, 3], // Non-blocking reporter block
            ['R', 'current temperature in city %s', 'get_temp', 'Boston, MA'], // Blocking reporter block
            ['', 'run alarm after %n seconds', 'set_alarm', '2'],
            ['h', 'when alarm goes off', 'when_alarm'],
            ['w', 'turn motor on for %n secs',             'motorOnFor', 1],
            [' ', 'turn motor on',                         'allMotorsOn'],
            [' ', 'turn motor off',                        'allMotorsOff'],
            [' ', 'set motor power %n',                    'startMotorPower', 100],
            [' ', 'set motor direction %m.motorDirection', 'setMotorDirection', 'this way'],
            ['h', 'when distance %m.lessMore %n',          'whenDistance', '<', 20],
            ['h', 'when tilt %m.eNe %n',                   'whenTilt', '=', 1],
            ['r', 'distance',                              'getDistance'],
            ['r', 'tilt',                                  'getTilt']*/
        ],
        menus: {
            direction: ['forward', 'backwards'],
        },
        url: 'http://info.scratch.mit.edu/WeDo'
    };
    
    // Register the extension
    ScratchExtensions.register('Codie extension', descriptor, ext);
})({});