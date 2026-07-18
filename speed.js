// =====================================
// FindMe - speed.js
// =====================================

const speedBox = document.getElementById("speed");

let lastSpeed = 0;

// تحديث السرعة
function updateSpeed(position){

    let speed = position.coords.speed;

    if(speed == null || isNaN(speed)){

        speed = lastSpeed;

    }else{

        speed = speed * 3.6; // m/s -> km/h

        lastSpeed = speed;

    }

    speed = Math.round(speed);

    speedBox.innerHTML = speed + " km/h";

    // تغيير اللون حسب السرعة

    if(speed < 40){

        speedBox.style.background = "#2ecc71";

    }

    else if(speed < 80){

        speedBox.style.background = "#f39c12";

    }

    else if(speed < 120){

        speedBox.style.background = "#e67e22";

    }

    else{

        speedBox.style.background = "#e74c3c";

    }

}

// مراقبة الموقع
if(navigator.geolocation){

    navigator.geolocation.watchPosition(

        updateSpeed,

        function(error){

            console.log(error);

            speedBox.innerHTML = "-- km/h";

        },

        {

            enableHighAccuracy:true,

            maximumAge:0,

            timeout:10000

        }

    );

}
