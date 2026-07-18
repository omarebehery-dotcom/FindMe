// navigation.js

let routeLine = null;

const ORS_API_KEY = "PUT_YOUR_OPENROUTESERVICE_API_KEY_HERE";

async function navigateTo(lat, lng) {

    if (!userMarker) {
        alert("لم يتم تحديد موقعك بعد");
        return;
    }

    const start = userMarker.getLatLng();

    const url =
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson";

    const body = {
        coordinates: [
            [start.lng, start.lat],
            [lng, lat]
        ]
    };

    try {

        const response = await fetch(url, {

            method: "POST",

            headers: {

                "Authorization": ORS_API_KEY,

                "Content-Type": "application/json"

            },

            body: JSON.stringify(body)

        });

        const data = await response.json();

        if (routeLine) {
            map.removeLayer(routeLine);
        }

        routeLine = L.geoJSON(data, {

            style: {

                color: "#2196F3",

                weight: 6

            }

        }).addTo(map);

        map.fitBounds(routeLine.getBounds());

    } catch (e) {

        console.error(e);

        alert("تعذر رسم المسار");

    }

}

// مثال
// navigateTo(30.0444,31.2357);
