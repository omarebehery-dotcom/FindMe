// ======================================
// FindMe - alerts.js
// ======================================

// آخر تنبيه
let lastAlert = "";

// سرعة التنبيه
const SPEED_LIMIT = 90;

// هل التنبيهات تعمل؟
let alertsEnabled = true;

// تشغيل / إيقاف التنبيهات
function toggleAlerts(){

    alertsEnabled = !alertsEnabled;

}

// التحقق من التنبيهات
function checkAlerts(lat,lng){

    if(!alertsEnabled){

        return;

    }

    // تنبيه السرعة
    if(currentSpeed > SPEED_LIMIT){

        showAlert(

            "⚠️ لقد تجاوزت السرعة المسموح بها"

        );

    }

}

// عرض التنبيه
function showAlert(message){

    if(lastAlert === message){

        return;

    }

    lastAlert = message;

    // صوت
    if(typeof speak === "function"){

        speak(message);

    }

    // نافذة
    const box = document.createElement("div");

    box.className = "alert-box";

    box.innerHTML = message;

    box.style.position = "fixed";
    box.style.top = "90px";
    box.style.left = "50%";
    box.style.transform = "translateX(-50%)";
    box.style.background = "#E53935";
    box.style.color = "#fff";
    box.style.padding = "15px 25px";
    box.style.borderRadius = "12px";
    box.style.fontWeight = "bold";
    box.style.zIndex = "999999";
    box.style.boxShadow = "0 5px 15px rgba(0,0,0,.3)";

    document.body.appendChild(box);

    setTimeout(function(){

        box.remove();

        lastAlert = "";

    },3000);

}

// تغيير حد السرعة
function setSpeedLimit(limit){

    if(!isNaN(limit)){

        limit = Number(limit);

        if(limit > 0){

            SPEED_LIMIT = limit;

        }

    }

}

// هل التنبيهات تعمل؟
function alertsRunning(){

    return alertsEnabled;

}