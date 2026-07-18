// ====================================
// FindMe - navigation.js
// ====================================

// ضع مفتاح OpenRouteService هنا
const ORS_API_KEY = "YOUR_API_KEY";

let routeLayer = null;

// رسم الطريق

async function navigateTo(destinationLat, destinationLng){

    if(currentLat == null || currentLng == null){

        alert("انتظر حتى يتم تحديد موقعك");

        return;

    }

    try{

        const response = await fetch(

            "https://api.openrouteservice.org/v2/directions/driving-car/geojson",

            {

                method:"POST",

                headers:{

                    "Authorization":ORS_API_KEY,

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    coordinates:[

                        [currentLng,currentLat],

                        [destinationLng,destinationLat]

                    ]

                })

            }

        );

        const data = await response.json();

        if(routeLayer){

            map.removeLayer(routeLayer);

        }

        routeLayer = L.geoJSON(data,{

            style:{

                color:"#007BFF",

                weight:6

            }

        }).addTo(map);

        map.fitBounds(routeLayer.getBounds());

        // معلومات الرحلة

        if(data.features.length){

            const summary = data.features[0].properties.summary;

            const distance = (summary.distance/1000).toFixed(1);

            const duration = Math.round(summary.duration/60);

            alert(
                "المسافة: " + distance + " كم\n" +
                "الوقت المتوقع: " + duration + " دقيقة"
            );
        }

    }

    catch(error){

        console.log(error);

        alert("تعذر رسم المسار");

    }

}

// حذف الطريق

function clearRoute(){

    if(routeLayer){

        map.removeLayer(routeLayer);

        routeLayer = null;

    }

}
