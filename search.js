// ====================================
// FindMe - search.js
// ====================================

let destination = null;
let destinationMarker = null;

// البحث عن مكان
async function searchPlace() {

    const input = document.getElementById("searchInput");

    const query = input.value.trim();

    if (query === "") {

        alert("اكتب اسم المكان");

        return;

    }

    try {

        const response = await fetch(

            "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +

            encodeURIComponent(query)

        );

        const data = await response.json();

        if (data.length === 0) {

            alert("المكان غير موجود");

            return;

        }

        destination = {

            lat: parseFloat(data[0].lat),

            lng: parseFloat(data[0].lon),

            name: data[0].display_name

        };
                if (destinationMarker) {

            map.removeLayer(destinationMarker);

        }

        destinationMarker = L.marker(

            [destination.lat, destination.lng]

        ).addTo(map);

        destinationMarker.bindPopup(

            "📍 " + destination.name

        ).openPopup();

        map.flyTo(

            [destination.lat, destination.lng],

            16,

            {

                animate: true,

                duration: 1

            }

        );

        // بدء الملاحة تلقائياً
        if (typeof drawRoute === "function") {

            drawRoute(

                currentLat,

                currentLng,

                destination.lat,

                destination.lng

            );

        }

    }

    catch (error) {

        console.error(error);

        alert("تعذر البحث");

    }

}
// البحث عند الضغط على Enter
document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("searchInput");

    if (input) {

        input.addEventListener("keydown", function (e) {

            if (e.key === "Enter") {

                searchPlace();

            }

        });

    }

});

// حذف الوجهة
function clearSearch() {

    if (destinationMarker) {

        map.removeLayer(destinationMarker);

        destinationMarker = null;

    }

    destination = null;

    const input = document.getElementById("searchInput");

    if (input) {

        input.value = "";

    }

}

// الحصول على الوجهة الحالية
function getDestination() {

    return destination;

}

// هل توجد وجهة؟
function hasDestination() {

    return destination !== null;

}

// بدء الملاحة من زر "ابدأ الملاحة"
function startNavigation() {

    if (!destination) {

        alert("ابحث عن وجهة أولاً");

        return;

    }

    if (typeof drawRoute === "function") {

        drawRoute(

            currentLat,

            currentLng,

            destination.lat,

            destination.lng

        );

    }

}
