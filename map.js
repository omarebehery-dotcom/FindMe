// ===============================
// FindMe - map.js
// Part 1
// ===============================

// إنشاء الخريطة
const map = L.map("map", {
    zoomControl: false,
    preferCanvas: true
}).setView([30.0444, 31.2357], 15);

// طبقة الخريطة
L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 20,
        attribution: "&copy; OpenStreetMap"
    }
).addTo(map);

// المتغيرات
let currentLat = null;
let currentLng = null;
let currentSpeed = 0;
let currentHeading = 0;

let followUser = true;

let accuracyCircle = null;

// السيارة
const carIcon = L.divIcon({
    className: "car-icon",
    html: "🚗",
    iconSize: [40,40],
    iconAnchor: [20,20]
});

let carMarker = null;

// GPS
let watchId = null;

// تشغيل GPS
function startGPS(){

    if(!navigator.geolocation){

        alert("هذا الجهاز لا يدعم GPS");

        return;

    }

    watchId = navigator.geolocation.watchPosition(

        updatePosition,

        gpsError,

        {

            enableHighAccuracy:true,

            maximumAge:0,

            timeout:10000

        }

    );

}
// ===============================
// FindMe - map.js
// Part 2
// ===============================

// تحديث الموقع
function updatePosition(position){

    currentLat = position.coords.latitude;
    currentLng = position.coords.longitude;

    // تحويل السرعة إلى km/h
    currentSpeed = position.coords.speed
        ? position.coords.speed * 3.6
        : 0;

    currentHeading = position.coords.heading || 0;

    // إنشاء السيارة
    if(carMarker == null){

        carMarker = L.marker(
            [currentLat, currentLng],
            {
                icon: carIcon
            }
        ).addTo(map);

    }else{

        carMarker.setLatLng(
            [currentLat, currentLng]
        );

    }

    // تدوير السيارة
    const icon = document.querySelector(".car-icon");

    if(icon){

        icon.style.transform =
            `rotate(${currentHeading}deg)`;

    }

    // دائرة الدقة
    const accuracy = position.coords.accuracy;

    if(accuracyCircle == null){

        accuracyCircle = L.circle(
            [currentLat,currentLng],
            {
                radius:accuracy,
                color:"#1976D2",
                fillColor:"#1976D2",
                fillOpacity:.15,
                weight:2
            }
        ).addTo(map);

    }else{

        accuracyCircle.setLatLng(
            [currentLat,currentLng]
        );

        accuracyCircle.setRadius(
            accuracy
        );

    }

    // تحديث السرعة
    if(typeof updateSpeed === "function"){

        updateSpeed(currentSpeed);

    }

    // تحديث السيارة
    if(typeof updateCar === "function"){

        updateCar(
            currentLat,
            currentLng,
            currentHeading
        );

    }
        // تحديث الملاحة
    if(typeof updateNavigation === "function"){

        updateNavigation(
            currentLat,
            currentLng
        );

    }

    // تنبيهات الطريق
    if(typeof checkAlerts === "function"){

        checkAlerts(
            currentLat,
            currentLng
        );

    }

    // متابعة المستخدم
    if(followUser){

        map.panTo(

            [currentLat,currentLng],

            {

                animate:true

            }

        );

    }

    // تحديث الطريق أثناء الملاحة
    if(typeof updateRoute === "function"){

        updateRoute();

    }

}

// أخطاء GPS
function gpsError(error){

    switch(error.code){

        case error.PERMISSION_DENIED:

            alert("يرجى السماح للتطبيق بالوصول إلى الموقع.");
            break;

        case error.POSITION_UNAVAILABLE:

            alert("تعذر تحديد الموقع الحالي.");
            break;

        case error.TIMEOUT:

            alert("انتهى وقت انتظار تحديد الموقع.");
            break;

        default:

            alert("حدث خطأ أثناء تحديد الموقع.");

    }

}

// زر موقعي
function centerLocation(){

    if(currentLat == null){

        return;

    }

    followUser = true;

    map.flyTo(

        [currentLat,currentLng],

        18,

        {

            animate:true,

            duration:1

        }

    );

}
// ===============================
// FindMe - map.js
// Part 4
// ===============================

// الرئيسية
function goHome(){

    centerLocation();

}

// تكبير
function zoomIn(){

    map.zoomIn();

}

// تصغير
function zoomOut(){

    map.zoomOut();

}

// إيقاف متابعة GPS
function stopGPS(){

    if(watchId !== null){

        navigator.geolocation.clearWatch(watchId);

        watchId = null;

    }

}

// عند تحريك الخريطة يدوياً
map.on("dragstart",function(){

    followUser = false;

});

// الضغط مرتين يرجع متابعة الموقع
map.on("dblclick",function(){

    followUser = true;

    centerLocation();

});

// الحصول على الموقع الحالي
function getCurrentLocation(){

    return{

        lat:currentLat,

        lng:currentLng,

        speed:currentSpeed,

        heading:currentHeading

    };

}

// التأكد أن الموقع جاهز
function hasLocation(){

    return currentLat !== null &&
           currentLng !== null;

}

// تشغيل التطبيق
window.addEventListener("load",function(){

    const splash = document.getElementById("splash");

    startGPS();

    if(splash){

        setTimeout(function(){

            splash.style.opacity = "0";

            setTimeout(function(){

                splash.style.display = "none";

            },500);

        },1500);

    }

});

// عند إغلاق الصفحة
window.addEventListener("beforeunload",function(){

    stopGPS();

});