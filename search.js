// search.js

let searchMarker = null;

async function searchPlace() {

    const text = document
        .getElementById("searchInput")
        .value
        .trim();

    if (text === "") return;

    const url =
        "https://nominatim.openstreetmap.org/search?format=json&q=" +
        encodeURIComponent(text);

    try {

        const response = await fetch(url);

        const data = await response.json();

        if (data.length === 0) {

            alert("المكان غير موجود");

            return;

        }

        const place = data[0];

        const lat = parseFloat(place.lat);

        const lon = parseFloat(place.lon);

        if (searchMarker) {

            map.removeLayer(searchMarker);

        }

        searchMarker = L.marker([lat, lon]).addTo(map);

        searchMarker.bindPopup(place.display_name).openPopup();

        map.setView([lat, lon], 16);

    } catch (e) {

        console.log(e);

        alert("حدث خطأ");

    }

}
