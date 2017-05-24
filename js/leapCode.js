var light = false;
var pressed = false;
var soundIn = true;
var soundOut = false;
var HandIn = false;

var output = document.getElementById('output');
var display = document.getElementById('display');
var displayValue = document.getElementById('outputValue');

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

        // console.log(rollTest)

        posThumb = hand.palmPosition[1];

        // Tap Funktion ///////////////////////////////////////
        if (hand.pinchStrength <= 0.80 && pressed) {
            pressed = false;
            $("#verticalSlider").css("background-color", "black")
            // analogLED6.toggle();
            setScale()
        }

        if (hand.pinchStrength > 0.80 && !pressed) {
            pressed = true;
            $("#verticalSlider").css("background-color", "limegreen")
            // analogLED6.toggle();
            setScale()
        }

        // Show Volume ///////////////////////////////////////
        if (hand.pinchStrength > 0.80) {
        }

        if (hand.pinchStrength < 0.80) {
        }

        // var range = Math.round(map(posThumb, 50, 300, 0, 100));
        var range = Math.min(
            Math.max(
                Math.round(map(posThumb, 50, 300, 0, scaleMax))
                , 0)
            , scaleMax);

        var rangeRotation = Math.round(map(rollTest, -90, 90, 9, -9));

        var rangeLED = Math.round(map(posThumb, 50, 300, 0, 255));

        if (saveRange !== range) {
            console.log(range)
            saveRange = range;
            scaleRedToGreen(range)
        }
        if (saveRotation !== rangeRotation) {
            // console.log(rangeRotation)
            saveRotation = rangeRotation;
        }

        displayValue.innerHTML = "Wert: "+range
        //fuck();

        // $("#verticalSlider").height(range+"%");
        $("#verticalSlider").height(range*sliderHeightScale+"%");
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

var toggleScale = true
var scaleMax = 10
var sliderHeightScale = 10

function setScale() {
    if(toggleScale) {
        scaleMax = 100
        sliderHeightScale = 1
    } else {
        scaleMax = 10
        sliderHeightScale = 10
    }
    toggleScale = !toggleScale
}