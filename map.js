\let map, directionsService, directionsRenderer;
let userLocation;
let currentMode = 'DRIVING';
let destination = null;

function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

    navigator.geolocation.getCurrentPosition((pos) => {
        userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        map = new google.maps.Map(document.getElementById("map"), { zoom: 15, center: userLocation });
        directionsRenderer.setMap(map);
        new google.maps.Marker({ position: userLocation, map: map, icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' });
    });

    const input = document.getElementById("destination-input");
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener("place_changed", () => {
        destination = autocomplete.getPlace().geometry.location;
        calculateRoute();
    });
}

function calculateRoute() {
    directionsService.route({
        origin: userLocation,
        destination: destination,
        travelMode: google.maps.TravelMode[currentMode]
    }, (response, status) => {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
            const route = response.routes[0].legs[0];
            document.getElementById('route-info').innerHTML = `الوقت: ${route.duration.text} | المسافة: ${route.distance.text}`;
        }
    });
}

function changeMode(mode) {
    currentMode = mode;
    if (destination) calculateRoute();
}

window.onload = initMap;
