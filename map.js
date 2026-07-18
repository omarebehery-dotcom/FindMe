// ===============================
// FindMe - map.js
// ===============================

// إنشاء الخريطة

const map = L.map("map", {
    zoomControl: false
}).setView([30.0444, 31.2357], 14);

// طبقة الخريطة

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution: ""
    }
).addTo(map);

// Marker المستخدم

let userMarker = null;

// دائرة الدقة

let accuracyCircle = null;

// الموقع الحالي

let currentLat = null;
let currentLng = null;

// تشغيل GPS

function startGPS() {

    if (!navigator.geolocation) {

        alert("GPS غير مدعوم");

        return;

    }

    navigator.geolocation.watchPosition(

        updatePosition,

        gpsError,

        {

            enableHighAccuracy: true,

            timeout: 10000,

            maximumAge: 0

        }

    );

}

// تحديث الموقع

function updatePosition(position) {

    currentLat = position.coords.latitude;
    currentLng = position.coords.longitude;

    let accuracy = position.coords.accuracy;

    // أول مرة

    if (userMarker == null) {

        userMarker = L.marker([currentLat, currentLng])
            .addTo(map)
            .bindPopup("📍 موقعك الحالي");

    } else {

        userMarker.setLatLng([currentLat, currentLng]);

    }

    // دائرة الدقة

    if (accuracyCircle == null) {

        accuracyCircle = L.circle(
            [currentLat, currentLng],
            {

                radius: accuracy,

                color: "#2196F3",

                fillColor: "#2196F3",

                fillOpacity: .15

            }

        ).addTo(map);

    } else {

        accuracyCircle.setLatLng([currentLat, currentLng]);

        accuracyCircle.setRadius(accuracy);

    }

    map.setView([currentLat, currentLng], 17);

}

// خطأ GPS

function gpsError(error) {

    switch(error.code){

        case 1:

            alert("يجب السماح للموقع");

            break;

        case 2:

            alert("تعذر تحديد الموقع");

            break;

        case 3:

            alert("انتهى وقت انتظار GPS");

            break;

        default:

            alert("خطأ غير معروف");

    }

}

// زر الرجوع للموقع

function centerLocation(){

    if(currentLat!=null){

        map.setView([currentLat,currentLng],18);

    }

}

// الصفحة الرئيسية

function goHome(){

    centerLocation();

}

// إخفاء شاشة البداية

window.onload=function(){

    setTimeout(function(){

        let splash=document.getElementById("splash");

        splash.style.display="none";

    },2000);

    startGPS();

};
