var light = false;
var pressed = false;
var soundIn = true;
var soundOut = false;
var HandIn = false;

var output = document.getElementById('output');
var display = document.getElementById('display');

var posThumb;

var saveRange = 0;
var saveRotation = 0;

// Sobald die Hand über der Leap ist, wird die Funktion ausgeführt und wiederholt
Leap.loop({background: true}, {

    hand: function (hand) {
        HandIn = true;
        output.innerHTML = hand.pinchStrength.toPrecision(2);

        display.innerHTML = hand.pinchStrength.toPrecision(2);

        var rollTest = (hand.roll()*(180/Math.PI)).toPrecision(2);

        console.log(rollTest)

        posThumb = hand.palmPosition[1];

        // Tap Funktion ///////////////////////////////////////
        if (hand.pinchStrength <= 0.80 && pressed) {
            pressed = false;
            $("#verticalSlider").css("background-color", "black")
            analogLED6.toggle();
        }

        if (hand.pinchStrength > 0.80 && !pressed) {
            pressed = true;
            $("#verticalSlider").css("background-color", "limegreen")
            analogLED6.toggle();
        }

        // Show Volume ///////////////////////////////////////
        if (hand.pinchStrength > 0.80) {
        }

        if (hand.pinchStrength < 0.80) {
        }

        // var range = Math.round(map(posThumb, 50, 300, 0, 100));
        var range = Math.round(map(posThumb, 50, 300, 0, 10));
        var rangeRotation = Math.round(map(rollTest, -90, 90, 9, -9));

        var rangeLED = Math.round(map(posThumb, 50, 300, 0, 255));

        if (saveRange !== range) {
            console.log(range)
            saveRange = range;
        }
        if (saveRotation !== rangeRotation) {
            console.log(rangeRotation)
            saveRotation = rangeRotation;
        }

        //fuck();

        // $("#verticalSlider").height(range+"%");
        $("#verticalSlider").height(range*10+"%");
        $("#horizontalSlider").css({"transform" : "rotate("+ rangeRotation*10 +"deg)"})

        // if (led.on() == true){
        //     led.brightness(rangeLED);
        // }
    }
});

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function map(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
