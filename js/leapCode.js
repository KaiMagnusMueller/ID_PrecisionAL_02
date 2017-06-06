var light = false;
var pressed = false;
var soundIn = true;
var soundOut = false;
var HandIn = false;

var output = document.getElementById('output');

var posThumb;

var saveRange = 0;
var saveRotation = 0;
var activeElementID = 1;

// Sobald die Hand über der Leap ist, wird die Funktion ausgeführt und wiederholt
Leap.loop({background: true}, {

    hand: function (hand) {
        HandIn = true;
        output.innerHTML = hand.pinchStrength.toPrecision(2);

        var rollTest = (hand.roll()*(180/Math.PI)).toPrecision(2);

        // console.log(rollTest)

        posThumb = hand.palmPosition[1];

        // Tap Funktion ///////////////////////////////////////
        if (hand.pinchStrength <= 0.80 && pressed) {
            pressed = false;
            $("#verticalSlider").css("background-color", "black")
            // analogLED6.toggle();
            // setScale()
        }

        if (hand.pinchStrength > 0.80 && !pressed) {
            pressed = true;
            $("#verticalSlider").css("background-color", "limegreen")
            // analogLED6.toggle();
            // setScale()
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

        // true = linear
        // false = quadratic

        if(linearOrQuadratic) {

        } else {
            range = Math.pow(range, 2)/ scaleMax
        }

        if (saveRange !== range) {
            console.log("Aktuell:"+range)
            saveRange = range;

            if(activeElementID === 1) {scaleRedToGreen(range)}
            if(activeElementID === 2) {vibrationMaxMin(range)}
            if(activeElementID === 3) {vibrationNoMaxMin(range)}
            if(activeElementID === 4) {vibrationMaxMinCombined(range)}
            // if(activeElementID === 5) {fadeInOut()}


        }

        if (saveRotation !== rangeRotation) {
            // console.log(rangeRotation)
            saveRotation = rangeRotation;
        }

        // displayValue.innerHTML = "Wert: "+range
        //fuck();

        // $("#verticalSlider").height(range+"%");
        $("#verticalSlider").height(range*stepPercent+"%");
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
//Oberes Maximum
var scaleMax = 10
//Schrittgröße in Pixeln
var stepPercent = 10

var linearOrQuadratic = true
// true = linear
// false = quadratic

function setScale() {
    if(toggleScale) {
        scaleMax = 100
        stepPercent = 1
        console.log("scaleMax: "+scaleMax+" stepPercent: "+stepPercent)

    } else {
        scaleMax = 10
        stepPercent = 10
        console.log("scaleMax: "+scaleMax+" stepPercent: "+stepPercent)

    }
    toggleScale = !toggleScale
}

function setScaleCustom() {
    scaleMax = document.getElementById("ScaleInput").value;
    stepPercent = 100 / scaleMax
    console.log("scaleMax: "+scaleMax+" stepPercent: "+stepPercent)

}

function setExperiment(EID) {
    activeElementID = EID
    console.log("Experiment: "+activeElementID)
    analogLED1.off()
    analogLED2.off()
}

function toggleLinearQuadratic() {
    linearOrQuadratic = !linearOrQuadratic
    if(linearOrQuadratic) {
        document.getElementById("ToggleLinearQuadratic").innerHTML = "Linear Scaling"
    } else {
        document.getElementById("ToggleLinearQuadratic").innerHTML = "Quadratic Scaling"
    }
}

var nvMS = 35;

function setVStrength(vStrength) {
    nvMS = vStrength
    console.log("nvMS: "+nvMS)
}