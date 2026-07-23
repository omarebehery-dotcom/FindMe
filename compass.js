// =====================================
// FindMe - compass.js
// =====================================

const compassArrow = document.getElementById("compassArrow");
const compassText = document.getElementById("compassText");

let compassRunning = false;

// تدوير البوصلة
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

// تحديث الاتجاه
function compassHandler(event){

    let heading = null;

    if(event.webkitCompassHeading !== undefined){

        heading = event.webkitCompassHeading;

    }

    else if(event.absolute === true && event.alpha !== null){

        heading = 360 - event.alpha;

    }

    else if(event.alpha !== null){

        heading = 360 - event.alpha;

    }

    if(heading !== null){

        rotateCompass(heading);

    }

}

// تشغيل البوصلة
function startCompass(){

    if(compassRunning){

        return;

    }

    compassRunning = true;

    if(!window.DeviceOrientationEvent){

        if(compassText){

            compassText.innerHTML = "غير مدعومة";

        }

        return;

    }

    // iPhone
    if(typeof DeviceOrientationEvent.requestPermission === "function"){

        DeviceOrientationEvent.requestPermission()

        .then(permission=>{

            if(permission === "granted"){

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

// إيقاف البوصلة
function stopCompass(){

    window.removeEventListener(

        "deviceorientation",

        compassHandler,

        true

    );

    window.removeEventListener(

        "deviceorientationabsolute",

        compassHandler,

        true

    );

    compassRunning = false;

}

// زر البوصلة
function openCompass(){

    startCompass();

    if(compassText){

        compassText.innerHTML = "🧭";

    }

}

// تشغيل تلقائي
window.addEventListener("load",function(){

    startCompass();

});
