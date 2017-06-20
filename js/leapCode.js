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
console.log("Gerät im Standby")

var waitingForUser = true
var range = 5
var winPulseStartOnce = true
var freezeValue = false
var savedValue = 5

// Sobald die Hand über der Leap ist, wird die Funktion ausgeführt und wiederholt
Leap.loop({background: true, frameEventName: 'animationFrame'}, {

    hand: function (hand) {
        HandIn = true;
        output.innerHTML = hand.pinchStrength.toPrecision(2);

        var rollTest = (hand.roll()*(180/Math.PI)).toPrecision(2);

        // console.log(rollTest)

        posThumb = hand.palmPosition[1];
        // console.log("palmPos2: "+hand.palmPosition[2])

        // var range = Math.round(map(posThumb, 50, 300, 0, 100));
        range = Math.min(
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

        // Tap Funktion ///////////////////////////////////////
        // if (hand.pinchStrength <= 0.80 && pressed) {
        //     pressed = false;
        //     $("#verticalSlider").css("background-color", "black")
        //     // analogLED6.toggle();
        //     // setScale()
        //     windowAppConfirm(range)
        // }
        //
        // if (hand.pinchStrength > 0.80 && !pressed) {
        //     pressed = true;
        //     $("#verticalSlider").css("background-color", "limegreen")
        //     // analogLED6.toggle();
        //     // setScale()
        // }

        // Show Volume ///////////////////////////////////////
        // if (hand.pinchStrength > 0.80) {
        // }
        //
        // if (hand.pinchStrength < 0.80) {
        // }

        //Setze waitingForUser nur dann false wenn die hand unter 150mm enfernt ist
        // und WinApp aktiv ist
        // waitingForUser false sorgt dann weiter unten für die ausführung des Experiments
        if (hand.palmPosition[2] < 150 && waitingForUser && toggleWinApp) {
            waitingForUser = false
            console.log("Warte auf eingabe")
        } else if (hand.palmPosition[2] > 150 && !waitingForUser){
            waitingForUser = true
            winPulseStartOnce = true
            freezeValue = false

            console.log("Gerät im Standby")
        }

        if (winPulseStartOnce) {
            winPulseStartOnce = !winPulseStartOnce
            winPulse(savedValue)
        }

        //Confirm Value
        if (hand.pinchStrength <= 0.80 && pressed) {
            pressed = false;
            $("#verticalSlider").css("background-color", "black")
            windowApp(range, true)
            freezeValue = false
        }

        if (hand.pinchStrength > 0.80 && !pressed) {
            pressed = true;
            $("#verticalSlider").css("background-color", "limegreen")
            windowAppConfirm(range)
            savedValue = range
            console.log("Value saved: "+ savedValue)
            freezeValue = true
        }

        if (saveRange !== range) {
            // console.log("Aktuell:"+range)
            saveRange = range;

            switch(activeElementID) {
                case 1:
                    scaleRedToGreen(range)
                    break
                case 2:
                    vibrationMaxMinCombined(range)
                    break
                case 3:
                    vibrationNoMaxMin(range)
                    break
                case 4:
                    vibrationMaxMinCombined(range)
                    break
                case 5:
                    scaleBlackWhite(range)
                    break
                case 6:
                    stepsBlackWhite(range)
                    break
                case 7:
                    blinkBlackWhite(range)
                    break
                case 8:
                    rowBlackWhite(range)
            }
            //Führe Experiment nur dann aus wenn waitingForUser false, also WinApp aktiv ist
            //und die hand im Bereich ist
            if(activeElementID === 9 && !waitingForUser && !freezeValue) {
                windowApp(range, false)
                $("#verticalSlider").height(range*stepPercent+"%");
                $("#horizontalSlider").css({"transform" : "rotate("+ rangeRotation*10 +"deg)"})
            }

        }

        if (saveRotation !== rangeRotation) {
            // console.log(rangeRotation)
            saveRotation = rangeRotation;
        }

        // displayValue.innerHTML = "Wert: "+range
        //fuck();

        // $("#verticalSlider").height(range+"%");
        if (activeElementID !== 9) {
            $("#verticalSlider").height(range*stepPercent+"%");
            $("#horizontalSlider").css({"transform" : "rotate("+ rangeRotation*10 +"deg)"})
        }
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
    // analogLED1.off()
    // analogLED2.off()
    // analogLED3.stop()
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

var varB = true
function varBrightness() {
    varB = !varB
    if (varB){console.log("var on")} else {
        console.log("var off")
    }
}

var toggleWinApp = false
function toggleWindowApplication() {
    toggleWinApp = !toggleWinApp
    if(toggleWinApp){
        for(let el of document.querySelectorAll('.legacy')) el.style.display = 'none'
        for(let el of document.querySelectorAll('.windowApplication')) el.style.display = 'block'
    } else {
        waitingForUser = true
        for(let el of document.querySelectorAll('.legacy')) el.style.display = 'block'
        for(let el of document.querySelectorAll('.windowApplication')) el.style.display = 'none'
    }
}