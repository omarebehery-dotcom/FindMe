// =====================================
// FindMe - speed.js (Fixed)
// =====================================

const speedBox = document.getElementById("speed");

// تحديث السرعة
function updateSpeed(speedMS) {

    if (!speedBox) return;

    let speed = 0;

    if (speedMS !== null && speedMS !== undefined) {

        speed = Math.round(speedMS * 3.6);

    }

    speedBox.innerHTML = speed + " km/h";

    // تغيير اللون حسب السرعة

    if (speed < 40) {

        speedBox.style.background = "#2ecc71";

    }

    else if (speed < 80) {

        speedBox.style.background = "#f39c12";

    }

    else if (speed < 120) {

        speedBox.style.background = "#e67e22";

    }

    else {

        speedBox.style.background = "#e74c3c";

    }

}
