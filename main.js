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



    // toggle onboard led using button element
    $('button').on('click', function () {
        analogLED6.toggle();
    });
});

function digitalScale(scaleLEDCount) {
    digitalLED1
    digitalLED2
    digitalLED3
    digitalLED4
    digitalLED5
    digitalLED6
    analogLED5
    analogLED6
    digitalLED7
    digitalLED8
}

function scaleRedToGreen(scaleLevel) {
    analogLED1.brightness(Math.max(8*scaleLevel*sliderHeightScale/10, 0)) //PIN 3 = green
    analogLED2.brightness((-25.5*scaleLevel*sliderHeightScale/10+255)) //PIN 5 = red
    console.log("Grün: "+Math.max(8*scaleLevel*sliderHeightScale/10, 0)+
        " Rot: "+ (-25.5*scaleLevel*sliderHeightScale/10+255))

}

function vibrationMaxMin(scaleLevel) {
    if (scaleLevel === 0 || scaleLevel === scaleMax) {
        console.log("trigger" + scaleLevel + " " + scaleMax)

        setTimeout(function(){analogLED1.on()}, 50);
        setTimeout(function(){analogLED1.off()}, 100);
        setTimeout(function(){analogLED1.on()}, 150);
        setTimeout(function(){analogLED1.off()}, 200);
        setTimeout(function(){analogLED1.on()}, 250);
        setTimeout(function(){analogLED1.off()}, 300);
    }
    setTimeout(function(){analogLED1.on()}, 50);
    setTimeout(function(){analogLED1.off()}, 100);
}