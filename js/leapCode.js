var light = false;
var pressed = false;
var soundIn = true;
var soundOut = false;
var HandIn = false;

var output = document.getElementById('output');

var posThumb;

var saveRange = 0;
var saveRotation = 0;
var activeElementID = 9;
console.log("Gerät im Standby")

var waitingForUser = true
var range = 5
var winPulseStartOnce = true
var freezeValue = false
var savedValue = 5

//Ventilator oder Automat
var app = 2
var dontActivate = false


// Sobald die Hand über der Leap ist, wird die Funktion ausgeführt und wiederholt
Leap.loop({background: true, frameEventName: 'animationFrame'}, {

    hand: function (hand) {
        HandIn = true;
        output.innerHTML = hand.pinchStrength.toPrecision(2);

        var rollTest = (hand.roll()*(180/Math.PI)).toPrecision(2);

        posThumb = hand.palmPosition[1];

        // console.log(hand.palmPosition)

        if(app === 1){
            range = Math.min(
            Math.max(
                Math.round(map(posThumb, 125, 300, 0, scaleMax))
                , 0)
            , scaleMax);}

        if(app === 2){range = scaleMax}


        var rangeRotation = Math.round(map(rollTest, -90, 90, 9, -9));

        //Setze waitingForUser nur dann false wenn die hand unter 150mm enfernt ist
        // und WinApp aktiv ist
        // waitingForUser false sorgt dann weiter unten für die ausführung des Experiments
        if (hand.palmPosition[2] < 150 && hand.palmPosition[2] > -150 && hand.palmPosition[0] < 150 && hand.palmPosition[0] > -150 && waitingForUser) {
            waitingForUser = false
            $("#verticalSlider").css("background-color", "dimgrey")
            console.log("Warte auf eingabe")
            var bLED = getLEDBr(range)
            analogLED1.brightness(bLED[0]) //PIN 3 = green
            analogLED2.brightness(bLED[1]) //PIN 5 = red

        } else if (!waitingForUser && (hand.palmPosition[2] > 150 || hand.palmPosition[2] < -150 || hand.palmPosition[0] > 150 || hand.palmPosition[0] < -150)){
            waitingForUser = true
            winPulseStartOnce = true
            freezeValue = false
            $("#verticalSlider").css("background-color", "black")
            console.log("Gerät im Standby")
        }

        if (winPulseStartOnce) {
            winPulseStartOnce = !winPulseStartOnce
            winPulse(savedValue)
            $("#verticalSlider").height(savedValue*stepPercent+"%");

        }

        //Confirm Value
        if (hand.pinchStrength <= 0.80 && pressed) {
            pressed = false;
            $("#verticalSlider").css("background-color", "dimgrey")
            if(dontActivate === false){windowApp(range, true)}
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

            //Führe Experiment nur dann aus wenn waitingForUser false, also WinApp aktiv ist
            //und die hand im Bereich ist
            if(activeElementID === 9 && !waitingForUser && !freezeValue) {
                windowApp(range, false)
                $("#verticalSlider").height(range*stepPercent+"%");
                $("#horizontalSlider").css({"transform" : "rotate("+ rangeRotation*10 +"deg)"})
            }

        }

        if (activeElementID !== 9) {
            $("#verticalSlider").height(range*stepPercent+"%");
        }
    }
});

function map(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function setApplication(id) {
    app = id
    console.log("Anwendung "+app+" aktiv")
    //1 = ventilator
    //2 = Automat
}

function toggleTimeout() {
    console.log("dontactivate "+dontActivate)
    dontActivate = !dontActivate
    console.log("dontactivate "+dontActivate)

}

//Oberes Maximum
var scaleMax = 5
//Schrittgröße in Pixeln
var stepPercent = 20