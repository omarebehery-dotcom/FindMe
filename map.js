// 1. تحديد مكان المستخدم فور فتح الصفحة
function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("المتصفح لا يدعم تحديد الموقع.");
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    // رسم الخريطة في موقعك
    const map = L.map('map').setView([lat, lng], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
    // إضافة ماركر لمكانك
    L.marker([lat, lng]).addTo(map).bindPopup("أنت هنا!").openPopup();

    // 2. جلب اسم المنطقة (Reverse Geocoding)
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then(res => res.json())
        .then(data => {
            const areaName = data.display_name;
            // عرض اسم المنطقة في واجهة التطبيق
            document.getElementById('route-info').innerHTML = `📍 موقعك الحالي: ${areaName}`;
        });
}

function showError(error) {
    console.log("تعذر تحديد الموقع: " + error.message);
}

window.onload = initMap;
