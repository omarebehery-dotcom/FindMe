// إنشاء الخريطة
const map = L.map('map').setView([30.0444, 31.2357], 13);

// طبقة OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

let userMarker = null;

// إخفاء شاشة البداية
window.onload = () => {
    setTimeout(() => {
        document.getElementById("splash").style.display = "none";
    }, 2000);

    startGPS();
};

// تشغيل GPS
function startGPS() {

    if (!navigator.geolocation) {
        alert("GPS غير مدعوم في هذا المتصفح");
        return;
    }

    navigator.geolocation.watchPosition(updateLocation, locationError, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000
    });

}

// تحديث الموقع
function updateLocation(position) {

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    // السرعة
    let speed = position.coords.speed;

    if (speed == null || isNaN(speed)) {
        speed = 0;
    } else {
        speed = (speed * 3.6).toFixed(0);
    }

    document.getElementById("speed").innerHTML = speed + " km/h";

    if (userMarker == null) {

        userMarker = L.marker([lat, lng]).addTo(map);

    } else {

        userMarker.setLatLng([lat, lng]);

    }

    map.setView([lat, lng], 17);

}

// أخطاء GPS
function locationError(error) {

    alert("تعذر الحصول على الموقع");

}

// زر GPS
function centerLocation() {

    if (userMarker) {
        map.setView(userMarker.getLatLng(), 17);
    }

}

// الصفحة الرئيسية
function goHome() {

    if (userMarker) {
        map.setView(userMarker.getLatLng(), 17);
    }

}

// إعدادات
function openSettings() {

    alert("قريباً");

}

// المرور
function toggleTraffic() {

    alert("ميزة المرور قريباً");

}
