// ====================================
// FindMe - routing.js
// Part 1
// ====================================

// ضع مفتاح OpenRouteService الحقيقي هنا
const ORS_API_KEY = "YOUR_API_KEY";

// متغيرات عامة
let routeLayer = null;
let currentRoute = null;
let destinationLat = null;
let destinationLng = null;

// آخر موقع تم تحديث الطريق منه
let lastRouteUpdate = null;

// هل الملاحة تعمل؟
let navigationRunning = false;
// ====================================
// رسم الطريق الحقيقي
// ====================================

async function drawRoute(startLat, startLng, endLat, endLng){

    if(!ORS_API_KEY || ORS_API_KEY === "YOUR_API_KEY"){

        alert("ضع مفتاح OpenRouteService داخل routing.js");

        return;

    }

    destinationLat = endLat;
    destinationLng = endLng;

    navigationRunning = true;

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

                        [startLng,startLat],

                        [endLng,endLat]

                    ]

                })

            }

        );

        if(!response.ok){

            throw new Error("API Error");

        }

        const data = await response.json();

        if(!data.features || data.features.length===0){

            alert("لم يتم العثور على طريق.");

            return;

        }

        currentRoute = data;

        if(routeLayer){

            map.removeLayer(routeLayer);

        }

        routeLayer = L.geoJSON(data,{

            style:{

                color:"#1976D2",

                weight:7,

                opacity:0.9

            }

        }).addTo(map);

        map.fitBounds(routeLayer.getBounds());

        const summary = data.features[0].properties.summary;

        const distance = (summary.distance/1000).toFixed(1);

        const duration = Math.round(summary.duration/60);

        const trip = document.getElementById("tripInfo");

        if(trip){

            trip.innerHTML =
            "🛣 " + distance +
            " كم | ⏱ " +
            duration + " دقيقة";

        }

        lastRouteUpdate = {

            lat:startLat,

            lng:startLng

        };

    }

    catch(err){

        console.error(err);

        alert("تعذر رسم الطريق.");

    }

}
// ====================================
// تحديث الطريق أثناء الحركة
// ====================================

async function updateRoute(){

    if(

        !navigationRunning ||

        currentLat == null ||

        currentLng == null ||

        destinationLat == null ||

        destinationLng == null

    ){

        return;

    }

    // لا تعيد رسم الطريق إلا إذا تحركت أكثر من 30 متر
    if(lastRouteUpdate){

        const moved = map.distance(

            [lastRouteUpdate.lat,lastRouteUpdate.lng],

            [currentLat,currentLng]

        );

        if(moved < 30){

            checkArrival();

            return;

        }

    }

    await drawRoute(

        currentLat,

        currentLng,

        destinationLat,

        destinationLng

    );

    checkArrival();

}
// ====================================
// حذف الطريق
// ====================================

function clearRoute(){

    if(routeLayer){

        map.removeLayer(routeLayer);

        routeLayer = null;

    }

    currentRoute = null;

    navigationRunning = false;

    destinationLat = null;

    destinationLng = null;

    lastRouteUpdate = null;

    const trip = document.getElementById("tripInfo");

    if(trip){

        trip.innerHTML = "المسافة: -- | الوقت: --";

    }

}

// ====================================
// إيقاف الملاحة
// ====================================

function stopNavigation(){

    clearRoute();

    followUser = true;

    if(currentLat && currentLng){

        map.flyTo(

            [currentLat,currentLng],

            18,

            {

                animate:true,

                duration:1

            }

        );

    }

}

// ====================================
// الوصول إلى الوجهة
// ====================================

function checkArrival(){

    if(

        destinationLat == null ||

        destinationLng == null ||

        currentLat == null ||

        currentLng == null

    ){

        return;

    }

    const distance = map.distance(

        [currentLat,currentLng],

        [destinationLat,destinationLng]

    );

    if(distance <= 30){

        stopNavigation();

        if(typeof speak === "function"){

            speak("لقد وصلت إلى وجهتك");

        }

        alert("🎉 وصلت إلى الوجهة");

    }

}

// ====================================
// معرفة حالة الملاحة
// ====================================

function isNavigating(){

    return navigationRunning;

}