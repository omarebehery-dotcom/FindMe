var map = L.map('map').setView([25.6872, 32.6396], 13); // إحداثيات الأقصر
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// إضافة موقعك الحالي
navigator.geolocation.getCurrentPosition((pos) => {
    L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map).bindPopup("أنت هنا");
    map.setView([pos.coords.latitude, pos.coords.longitude], 14);
});

// دالة البحث الأساسية (باستخدام Nominatim)
async function searchPlace() {
    const query = document.getElementById('search-input').value;
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`);
    const data = await res.json();
    if (data.length > 0) {
        map.setView([data[0].lat, data[0].lon], 15);
        L.marker([data[0].lat, data[0].lon]).addTo(map).bindPopup(data[0].display_name).openPopup();
    }
}
