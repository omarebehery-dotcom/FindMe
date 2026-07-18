// =====================================
// FindMe - traffic.js
// =====================================

let trafficLayer = null;

let trafficEnabled = false;

// تشغيل وإيقاف طبقة المرور
function toggleTraffic(){

    if(trafficEnabled){

        if(trafficLayer){

            map.removeLayer(trafficLayer);

        }

        trafficEnabled = false;

        alert("تم إيقاف طبقة المرور");

        return;

    }

    trafficLayer = L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            maxZoom:19,

            opacity:0.5

        }

    );

    trafficLayer.addTo(map);

    trafficEnabled = true;

    alert("تم تشغيل طبقة المرور");

}

// معرفة حالة المرور
function isTrafficEnabled(){

    return trafficEnabled;

}
