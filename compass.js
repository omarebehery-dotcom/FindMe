// compass.js

let compassArrow = document.getElementById("compassArrow");
let compassText = document.getElementById("compassText");

function rotateCompass(heading) {

    if (compassArrow) {
        compassArrow.style.transform = `rotate(${-heading}deg)`;
    }

    if (compassText) {
        compassText.innerHTML = Math.round(heading) + "°";
    }

}

function startCompass() {

    if (!window.DeviceOrientationEvent) {

        if (compassText) {
            compassText.innerHTML = "Compass Not Supported";
        }

        return;
    }

    // iPhone
    if (typeof DeviceOrientationEvent.requestPermission === "function") {

        DeviceOrientationEvent.requestPermission()

            .then(permission => {

                if (permission === "granted") {

                    window.addEventListener(
                        "deviceorientation",
                        compassHandler,
                        true
                    );

                }

            })

            .catch(console.error);

    }

    // Android
    else {

        window.addEventListener(
            "deviceorientationabsolute",
            compassHandler,
            true
        );

        window.addEventListener(
            "deviceorientation",
            compassHandler,
            true
        );

    }

}

function compassHandler(event) {

    let heading;

    if (event.webkitCompassHeading !== undefined) {

        heading = event.webkitCompassHeading;

    } else {

        heading = 360 - event.alpha;

    }

    rotateCompass(heading);

}

startCompass();
