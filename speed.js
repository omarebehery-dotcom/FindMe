// =====================================
// FindMe - speed.js
// =====================================

const speedBox = document.getElementById("speed");

// تحديث السرعة
function updateSpeed(speedKmh){

    if(!speedBox) return;

    let speed = 0;

    if(speedKmh != null && !isNaN(speedKmh)){

        speed = Math.round(speedKmh);

    }

    speedBox.innerHTML =
    "🚗 " + speed + " km/h";

    if(speed < 40){

        speedBox.style.background="#2ecc71";

    }

    else if(speed < 80){

        speedBox.style.background="#f39c12";

    }

    else if(speed < 120){

        speedBox.style.background="#e67e22";

    }

    else{

        speedBox.style.background="#e74c3c";

    }

}

// الحصول على السرعة الحالية
function getCurrentSpeed(){

    return speedBox ?
        speedBox.innerText :
        "0 km/h";

}











