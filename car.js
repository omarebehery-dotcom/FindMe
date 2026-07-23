// ======================================
// FindMe - car.js
// ======================================

// آخر موقع
let lastLat = null;
let lastLng = null;

// تحديث السيارة
function updateCar(lat, lng) {

    if (!carMarker) return;

    // تحريك السيارة
    carMarker.setLatLng([lat, lng]);

    // حساب الاتجاه
    if (lastLat !== null && lastLng !== null) {

        const angle = getBearing(
            lastLat,
            lastLng,
            lat,
            lng
        );

        const icon = document.querySelector(".car-icon");

        if (icon) {

            icon.style.transform =
                `rotate(${angle}deg)`;

        }

    }

    lastLat = lat;
    lastLng = lng;

}

// حساب الاتجاه
function getBearing(lat1, lon1, lat2, lon2) {

    const dLon = (lon2 - lon1) * Math.PI / 180;

    lat1 *= Math.PI / 180;
    lat2 *= Math.PI / 180;

    const y =
        Math.sin(dLon) * Math.cos(lat2);

    const x =
        Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) *
        Math.cos(lat2) *
        Math.cos(dLon);

    return (
        Math.atan2(y, x) *
        180 /
        Math.PI +
        360
    ) % 360;

}

// الحصول على مكان السيارة
function getCarLocation(){

    return {

        lat:lastLat,

        lng:lastLng

    };

}ء
