// =====================================
// FindMe - compass.js
// =====================================

const compassArrow = document.getElementById("compassArrow");
const compassText = document.getElementById("compassText");

function rotateCompass(angle){

    if(compassArrow){

        compassArrow.style.transform =
        `rotate(${-angle}deg)`;

    }

    if(compassText){

        compassText.innerHTML =
        Math.round(angle) + "°";

    }

}

// تشغيل البوصلة
function startCompass(){

    if(!window.DeviceOrientationEvent){

        compassText.innerHTML =
        "غير مدعومة";

        return;

    }

    // أجهزة iPhone

    if(typeof DeviceOrientationEvent.requestPermission ===
    "function"){

        DeviceOrientationEvent
        .requestPermission()

        .then(permission=>{

            if(permission==="granted"){

                window.addEventListener(

                    "deviceorientation",

                    compassHandler,

                    true

                );

            }

        })

        .catch(console.error);

    }

    // أجهزة Android

    else{

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

// تحديث الاتجاه

function compassHandler(event){

    let heading;

    if(event.webkitCompassHeading !== undefined){

        heading = event.webkitCompassHeading;

    }

    else{

        heading = 360 - event.alpha;

    }

    rotateCompass(heading);

}

// بدء البوصلة

startCompass();
