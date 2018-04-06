// Johnny-Fife uses stdin, which causes Electron to crash
// this reroutes stdin, so it can be used

var analogLED1
var analogLED2
var analogLED3
var analogLED4
var analogLED5
var analogLED6
var digitalLED1
var digitalLED2
var digitalLED3
var digitalLED4
var digitalLED5
var digitalLED6
var digitalLED7
var digitalLED8


var Readable = require("stream").Readable;
var util = require("util");
util.inherits(MyStream, Readable);
function MyStream(opt) {
    Readable.call(this, opt);
}
MyStream.prototype._read = function () {
};
// hook in our stream
process.__defineGetter__("stdin", function () {
    if (process.__stdin) return process.__stdin;
    process.__stdin = new MyStream();
    return process.__stdin;
});

var five = require("johnny-five");
var board = new five.Board({
    repl: false // does not work with browser console
});

board.on("ready", function () {
    console.log('%cArduino ready, click button to toggle onboard LED.', 'color: green;');
    console.log("Anwendung "+app+" aktiv")


    // Create a standard `led` component instance
    analogLED1 = new five.Led(3);
    analogLED2 = new five.Led(5);
    analogLED3 = new five.Led(6);
    analogLED4 = new five.Led(9);
    analogLED5 = new five.Led(10);
    analogLED6 = new five.Led(11);

    digitalLED1 = new five.Led(0);
    digitalLED2 = new five.Led(1);
    digitalLED3 = new five.Led(2);
    digitalLED4 = new five.Led(4);
    digitalLED5 = new five.Led(7);
    digitalLED6 = new five.Led(8);
    digitalLED7 = new five.Led(12);
    digitalLED8 = new five.Led(13);

});

function windowApp(scaleLevel, confirmed){

    var bLED = getLEDBr(scaleLevel)

    if (app === 1) {
        //MOTOR PIN 9 0,
        var fanSpeed = function () {
            var fanSpeed = map(scaleLevel, 0, scaleMax, 20, 150)
            if(fanSpeed === 20) {fanSpeed = 0}
            return fanSpeed
        }
        analogLED4.brightness(fanSpeed())
        console.log(fanSpeed())


        if (scaleLevel === 0 || scaleLevel >= scaleMax && !confirmed) {
            console.log("Max/Min")

            setTimeout(function () {
                analogLED1.brightness(bLED[0]/3) //PIN 3 = green
                analogLED2.brightness(bLED[1]/5) //PIN 5 = red
            }, 150);
            setTimeout(function () {
                analogLED1.brightness(bLED[0]) //PIN 3 = green
                analogLED2.brightness(bLED[1]) //PIN 5 = red
            }, 300)
            setTimeout(function () {

                analogLED1.brightness(bLED[0]/3) //PIN 3 = green
                analogLED2.brightness(bLED[1]/5) //PIN 5 = red
            }, 450)
            setTimeout(function () {
                analogLED1.brightness(bLED[0]) //PIN 3 = green
                analogLED2.brightness(bLED[1]) //PIN 5 = red
            }, 600)

        }
    }
    console.log(bLED)
    // console.log("current: "+ scaleLevel)
    analogLED1.brightness(bLED[0]) //PIN 3 = green
    analogLED2.brightness(bLED[1]) //PIN 5 = red

    if (app === 2 && confirmed) {
        dontActivate=true
        console.log("dontactivate "+dontActivate)

        setTimeout(function () {
            digitalLED5.on() //forward
            analogLED4.brightness(100)
            console.log("%cforward, 255", "color: green;")
        }, 300);
        setTimeout(function () {
            analogLED4.brightness(0)
            digitalLED5.off() //backward
            console.log("%cbackward, 0", "color: green;")
        }, 600);
        setTimeout(function () {
            digitalLED5.off() //backward
            analogLED4.brightness(100)
            console.log("%cbackward, 255", "color: green;")
        }, 600);
        setTimeout(function () {
            digitalLED5.off() //backward
            analogLED4.brightness(0)
            console.log("%cbackward, 0", "color: green;")
            toggleTimeout()
        }, 1000);

    }

}

//Standby brightness (former standby pulse)
function winPulse(scaleLevel) {
    var bLED = getLEDBr(scaleLevel)

    if (app === 1) {
        var fanSpeed = function () {
            var fanSpeed = map(scaleLevel, 0, scaleMax, 40, 255)
            if(fanSpeed === 40) {fanSpeed = 0}
            return fanSpeed
        }

        analogLED4.brightness(fanSpeed())
        console.log(fanSpeed()+" reset")
    }

    //LED Standby
    console.log(scaleLevel)
    analogLED1.brightness(bLED[0]/3) //PIN 3 = green
    analogLED2.brightness(bLED[1]/5) //PIN 5 = red


}

function windowAppConfirm(scaleLevel) {
    var bLED = getLEDBr(scaleLevel)

    // setTimeout(function () {
    analogLED1.brightness(bLED[0]/3) //PIN 3 = green
    analogLED2.brightness(bLED[1]/5) //PIN 5 = red
    // }, 100);

}

function getLEDBr(scaleLevel) {
    var bLED = []
    bLED[0] = Math.max(6 * scaleLevel * stepPercent / 10, 0)
    bLED[1] = -25.5 * scaleLevel * stepPercent / 10 + 255

    console.log("Grün: "+bLED[0]+" Rot: "+ bLED[1])
    return bLED


}