// traffic.js

let trafficLayer = null;

let trafficEnabled = false;

function toggleTraffic() {

    if (trafficEnabled) {

        if (trafficLayer) {

            map.removeLayer(trafficLayer);

        }

        trafficEnabled = false;

        alert("Traffic OFF");

    } else {

        trafficLayer = L.tileLayer(

            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",

            {

                maxZoom: 19,

                opacity: 0.6

            }

        );

        trafficLayer.addTo(map);

        trafficEnabled = true;

        alert("Traffic ON");

    }

}










