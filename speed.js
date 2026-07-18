// speed.js

const speedElement = document.getElementById("speed");

let lastSpeed = 0;

function startSpeed() {

    if (!navigator.geolocation) {

        speedElement.innerHTML = "GPS";

        return;

    }

    navigator.geolocation.watchPosition(

        updateSpeed,

        showSpeedError,

        {

            enableHighAccuracy: true,

            maximumAge: 0,

            timeout: 10000

        }

    );

}

function updateSpeed(position) {

    let speed = position.coords.speed;

    if (speed == null || isNaN(speed)) {

        speed = lastSpeed;

    } else {

        speed = speed * 3.6;

        lastSpeed = speed;

    }

    speed = Math.round(speed);

    speedElement.innerHTML = speed + " km/h";

    // تغيير اللون حسب السرعة

    if (speed < 40) {

        speedElement.style.background = "#2ecc71";

    }

    else if (speed < 80) {

        speedElement.style.background = "#f39c12";

    }

    else {

        speedElement.style.background = "#e74c3c";

    }

}

function showSpeedError() {

    speedElement.innerHTML = "-- km/h";

}

startSpeed();
