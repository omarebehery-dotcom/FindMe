// ====================================
// FindMe - search.js
// ====================================

let searchMarker = null;

// البحث عند الضغط على Enter
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("searchInput");

    input.addEventListener("keypress", function(e){

        if(e.key === "Enter"){

            searchPlace();

        }

    });

});

// البحث عن مكان

async function searchPlace(){

    const query = document
        .getElementById("searchInput")
        .value
        .trim();

    if(query === ""){

        alert("اكتب اسم المكان");

        return;

    }

    try{

        const response = await fetch(

            "https://nominatim.openstreetmap.org/search?format=json&limit=5&q="

            + encodeURIComponent(query)

        );

        const data = await response.json();

        if(data.length === 0){

            alert("لم يتم العثور على المكان");

            return;

        }

        const place = data[0];

        const lat = parseFloat(place.lat);

        const lon = parseFloat(place.lon);

        // حذف العلامة القديمة

        if(searchMarker){

            map.removeLayer(searchMarker);

        }

        // إضافة العلامة

        searchMarker = L.marker([lat, lon]).addTo(map);

        searchMarker.bindPopup(

            "<b>" +

            place.display_name +

            "</b><br><br>" +

            "<button onclick='navigateTo("+

            lat+

            ","+

            lon+

            ")'>🚗 ابدأ الملاحة</button>"

        ).openPopup();

        // تحريك الخريطة

        map.flyTo([lat, lon], 16,{

            animate:true,

            duration:2

        });

    }

    catch(error){

        console.log(error);

        alert("حدث خطأ أثناء البحث");

    }

}

// حذف نتيجة البحث

function clearSearch(){

    document.getElementById("searchInput").value="";

    if(searchMarker){

        map.removeLayer(searchMarker);

        searchMarker=null;

    }

}
