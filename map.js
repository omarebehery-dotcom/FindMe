var map = L.map('map').setView([30.0444, 31.2357], 13); // إحداثيات افتراضية (القاهرة)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let userMarker, routingControl;

// 1. تحديد موقعك تلقائياً
navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    userMarker = L.marker([lat, lng]).addTo(map).bindPopup("أنت هنا").openPopup();
    map.setView([lat, lng], 14);
});

// 2. البحث وحساب الطريق
async function calculateRoute() {
    const destName = document.getElementById('destination').value;
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${destName}`);
    const data = await response.json();

    if (data.length > 0) {
        const destLat = data[0].lat;
        const destLng = data[0].lon;

        if (routingControl) map.removeControl(routingControl);

        routingControl = L.Routing.control({
            waypoints: [
                L.latLng(userMarker.getLatLng().lat, userMarker.getLatLng().lng),
                L.latLng(destLat, destLng)
            ],
            routeWhileDragging: true,
            language: 'ar'
        }).addTo(map);

        // إظهار الوقت والمسافة
        routingControl.on('routesfound', function(e) {
            const routes = e.routes;
            const summary = routes[0].summary;
            document.getElementById('info').innerHTML = 
                `المسافة: ${(summary.totalDistance / 1000).toFixed(1)} كم | الوقت التقريبي: ${Math.round(summary.totalTime / 60)} دقيقة`;
        });
    } else {
        alert("لم يتم العثور على المكان");
    }
}
