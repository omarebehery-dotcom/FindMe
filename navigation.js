// ====================================
// FindMe - navigation.js
// Part 1
// ====================================

// بدء الملاحة
async function startNavigation(){

    if(currentLat == null || currentLng == null){

        alert("انتظر حتى يتم تحديد موقعك.");

        return;

    }

    const input = document
        .getElementById("searchInput")
        .value
        .trim();

    if(input === ""){

        alert("اكتب الوجهة أولاً.");

        return;

    }

    try{

        const response = await fetch(

            "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +

            encodeURIComponent(input)

        );

        const result = await response.json();

        if(result.length === 0){

            alert("لم يتم العثور على المكان.");

            return;

        }

        const destinationLat =
            parseFloat(result[0].lat);

        const destinationLng =
            parseFloat(result[0].lon);

        await drawRoute(

            currentLat,

            currentLng,

            destinationLat,

            destinationLng

        );

    }

    catch(error){

        console.error(error);

        alert("تعذر بدء الملاحة.");

    }

}
// ====================================
// تحديث الملاحة أثناء الحركة
// ====================================

function updateNavigation(lat, lng){

    currentLat = lat;
    currentLng = lng;

    // إذا كانت الملاحة تعمل
    if(typeof isNavigating === "function"){

        if(isNavigating()){

            updateRoute();

        }

    }

}

// ====================================
// الذهاب إلى الوجهة مباشرة
// ====================================

async function navigateTo(lat,lng){

    if(currentLat == null || currentLng == null){

        alert("انتظر تحديد موقعك.");

        return;

    }

    await drawRoute(

        currentLat,

        currentLng,

        lat,

        lng

    );

}
// ====================================
// إيقاف الملاحة
// ====================================

function stopNavigation(){

    if(typeof clearRoute === "function"){

        clearRoute();

    }

    const tripInfo = document.getElementById("tripInfo");

    if(tripInfo){

        tripInfo.innerHTML =
        "المسافة: -- | الوقت: --";

    }

}

// ====================================
// حذف الملاحة
// ====================================

function clearNavigation(){

    stopNavigation();

}

// ====================================
// هل الملاحة تعمل؟
// ====================================

function navigationRunning(){

    if(typeof isNavigating === "function"){

        return isNavigating();

    }

    return false;

}

// ====================================
// الوصول للوجهة
// ====================================

function arrivedDestination(){

    stopNavigation();

    if(typeof speak === "function"){

        speak("لقد وصلت إلى وجهتك");

    }

    alert("🎉 وصلت إلى الوجهة");

}