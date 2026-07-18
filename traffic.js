// ======================================
// FindMe Professional Traffic
// traffic.js
// ======================================

let trafficEnabled = false;
let trafficLayer = null;

// تشغيل / إيقاف المرور
function toggleTraffic() {

    if (trafficEnabled) {

        disableTraffic();

    } else {

        enableTraffic();

    }

}

// تشغيل
function enableTraffic() {

    trafficEnabled = true;

    trafficLayer = L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            maxZoom: 20,

            opacity: 0.35,

            updateWhenZooming: true,

            updateWhenIdle: true,

            keepBuffer: 8

        }

    );

    trafficLayer.addTo(map);

    showTrafficStatus("🟢 Traffic ON");

}

// إيقاف
function disableTraffic() {

    trafficEnabled = false;

    if (trafficLayer) {

        map.removeLayer(trafficLayer);

        trafficLayer = null;

    }

    showTrafficStatus("⚪ Traffic OFF");

}

// رسالة أسفل الشاشة
function showTrafficStatus(text) {

    let status = document.getElementById("trafficStatus");

    if (!status) {

        status = document.createElement("div");

        status.id = "trafficStatus";

        status.style.position = "absolute";
        status.style.bottom = "110px";
        status.style.left = "50%";
        status.style.transform = "translateX(-50%)";
        status.style.padding = "12px 20px";
        status.style.background = "#222";
        status.style.color = "#fff";
        status.style.borderRadius = "12px";
        status.style.fontWeight = "bold";
        status.style.zIndex = "9999";
        status.style.boxShadow = "0 0 15px rgba(0,0,0,.4)";

        document.body.appendChild(status);

    }

    status.innerHTML = text;

    clearTimeout(status.timer);

    status.timer = setTimeout(() => {

        status.remove();

    }, 2500);

}
