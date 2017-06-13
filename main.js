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



    // // toggle onboard led using button element
    // $('button').on('click', function () {
    //     analogLED6.toggle();
    // });
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
    //PIN 3 green, 5 red
    analogLED1.brightness(Math.max(6*scaleLevel*stepPercent/10, 0)) //PIN 3 = green
    analogLED2.brightness((-25.5*scaleLevel*stepPercent/10+255)) //PIN 5 = red
    console.log("Grün: "+Math.max(8*scaleLevel*stepPercent/10, 0)+
        " Rot: "+ (-25.5*scaleLevel*stepPercent/10+255))
}

function vibrationMaxMin(scaleLevel) {

    //PIN 7 DIGITAL LED
    // console.log("scaleLevel: " + scaleLevel + " scaleMax: " + scaleMax)
    if (scaleLevel === 0 || scaleLevel >= scaleMax) {
        console.log("Max/Min")

        setTimeout(function(){
            digitalLED5.on()}, 0);
        setTimeout(function(){digitalLED5.off()}, 50);
        // setTimeout(function(){analogLED3.on()}, 500);
        // setTimeout(function(){analogLED3.off()}, 550);
        // setTimeout(function(){analogLED3.on()}, 950);
        // setTimeout(function(){analogLED3.off()}, 1000);
    } else if (varB){
        setTimeout(function(){digitalLED5.on()
            // console.log("test"+scaleMax)
            }, 0);
        setTimeout(function(){digitalLED5.off()
            // console.log("test"+scaleMax)
            }, 1.25*scaleLevel*stepPercent/10+28.75);
    } else {
        setTimeout(function(){digitalLED5.on()
            // console.log("test"+scaleMax)
        }, 0);
        setTimeout(function(){digitalLED5.off()
            // console.log("test"+scaleMax)
        }, nvMS);
    }
}

function vibrationNoMaxMin(scaleLevel) {

    //PIN 7
    // console.log("scaleLevel: " + scaleLevel + " scaleMax: " + scaleMax)
        setTimeout(function(){digitalLED5.on()
            // console.log("test"+scaleMax)
        }, nvMS);
        setTimeout(function(){digitalLED5.off()
            // console.log("test"+scaleMax)
        }, nvMS*2);
}

function vibrationMaxMinCombined(scaleLevel) {

    //PIN 3 green, 5 red
    analogLED1.brightness(Math.max(8*scaleLevel*stepPercent/10, 0)) //PIN 3 = green
    analogLED2.brightness((-25.5*scaleLevel*stepPercent/10+255)) //PIN 5 = red
    console.log("Grün: "+Math.max(8*scaleLevel*stepPercent/10, 0)+
        " Rot: "+ (-25.5*scaleLevel*stepPercent/10+255))

    //PIN 7 digital led
    // console.log("scaleLevel: " + scaleLevel + " scaleMax: " + scaleMax)
    if (scaleLevel === 0 || scaleLevel >= scaleMax) {
        console.log("Max/Min")

        setTimeout(function(){
            digitalLED5.on()}, 50);
        setTimeout(function(){digitalLED5.off()}, 100);
        // setTimeout(function(){analogLED3.on()}, 500);
        // setTimeout(function(){analogLED3.off()}, 550);
        // setTimeout(function(){analogLED3.on()}, 950);
        // setTimeout(function(){analogLED3.off()}, 1000);
    } else {
        setTimeout(function(){digitalLED5.on()
            // console.log("test"+scaleMax)
        }, nvMS);
        setTimeout(function(){digitalLED5.off()
            // console.log("test"+scaleMax)
        }, nvMS*2);
    }
}

function nonInteractiveExperiments(exp) {

    if(exp === 1) {
        analogLED3.pulse({
            easing: "inOutSine",
            duration: 3500,
            cuePoints: [0, 1],
            keyFrames: [5, 100],
            // onstop: function() {
            //     this.wait(2000, function () {
            //     })
            // }
        })
    }
    if(exp === 2) {
        analogLED3.stop()
        analogLED3.brightness(100)
    }
    if(exp === 3) {
        analogLED3.stop()
        setTimeout(function(){analogLED3.brightness(100)}, 200);
        setTimeout(function(){analogLED3.brightness(0)}, 250);
        setTimeout(function(){analogLED3.brightness(100)}, 450);
        setTimeout(function(){analogLED3.brightness(0)}, 600);
    }
}

function scaleBlackWhite(scaleLevel) {
    //PIN 6
    analogLED3.brightness(Math.max(9.5*scaleLevel*stepPercent/10+5, 0)) //PIN 3 = green

}

function stepsBlackWhite(scaleLevel) {
    //PIN 6
    if (varB){analogLED3.brightness(Math.max(8*scaleLevel*stepPercent/10+3, 0))} else {
        analogLED3.brightness(80)
    }

    setTimeout(function(){analogLED3.off()}, 100);
}

function blinkBlackWhite(scaleLevel) {
    //PIN 6
    //Widerstand dazwischenschalten
    analogLED3.blink(-70*scaleLevel*stepPercent/10+800)
//    Math.max(3*scaleLevel*stepPercent/10+3, 0)

}

function rowBlackWhite(scaleLevel) {
    //PIN 3, 5, 6, 9
    var stepInternal = scaleLevel*stepPercent/10
    console.log(stepInternal)

    if(stepInternal > 1.25){analogLED1.brightness(5)} else {analogLED1.off()}
    if(stepInternal > 3.75){analogLED2.brightness(5)} else {analogLED2.off()}
    if(stepInternal > 6.25){analogLED3.brightness(5)} else {analogLED3.off()}
    if(stepInternal > 8.75){analogLED4.brightness(5)} else {analogLED4.off()}

//    Math.max(3*scaleLevel*stepPercent/10+3, 0)
}

function windowApp(scaleLevel){
    console.log(scaleLevel)
}