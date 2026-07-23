// ======================================
// FindMe - traffic.js
// ======================================

let trafficEnabled = false;
let trafficLayer = null;

// تشغيل / إيقاف المرور
function toggleTraffic(){

    if(trafficEnabled){

        disableTraffic();

    }else{

        enableTraffic();

    }

}

// تشغيل
function enableTraffic(){

    if(trafficEnabled) return;

    trafficEnabled = true;

    // طبقة بديلة (حتى يتم إضافة مزود مرور حقيقي)
    trafficLayer = L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            maxZoom:20,

            opacity:0.45,

            attribution:"© OpenStreetMap"

        }

    );

    trafficLayer.addTo(map);

    showTrafficStatus("🟢 تم تشغيل طبقة المرور");

}

// إيقاف
function disableTraffic(){

    trafficEnabled = false;

    if(trafficLayer){

        map.removeLayer(trafficLayer);

        trafficLayer = null;

    }

    showTrafficStatus("⚪ تم إيقاف طبقة المرور");

}

// حالة المرور
function isTrafficEnabled(){

    return trafficEnabled;

}

// الرسالة
function showTrafficStatus(text){

    let status = document.getElementById("trafficStatus");

    if(!status){

        status = document.createElement("div");

        status.id = "trafficStatus";

        status.style.position="fixed";
        status.style.bottom="100px";
        status.style.left="50%";
        status.style.transform="translateX(-50%)";
        status.style.padding="12px 18px";
        status.style.background="#222";
        status.style.color="#fff";
        status.style.borderRadius="12px";
        status.style.fontWeight="bold";
        status.style.zIndex="99999";
        status.style.boxShadow="0 0 10px rgba(0,0,0,.4)";

        document.body.appendChild(status);

    }

    status.innerHTML = text;

    clearTimeout(status.timer);

    status.timer = setTimeout(function(){

        if(status){

            status.remove();

        }

    },2500);

}
