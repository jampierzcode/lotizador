<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lotizador</title>
    <style>
    #map {
        height: 500px;
    }

    .leaflet-tile-pane {
        max-width: 600px;
        margin: 0 auto;
    }
    </style>
</head>

<body>
    <div id="map"></div>

    <label for="lot-name">Nombre del lote:</label>
    <input type="text" id="lot-name"><br>

    <label for="lot-price">Precio:</label>
    <input type="text" id="lot-price"><br>

    <button onclick="savePolygon()">Guardar</button>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js"></script>

    <script>
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('../../img/lote.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
        maxNativeZoom: 17,
        noWrap: true
    }).addTo(map);

    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    var drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems
        },
        draw: {
            polygon: true,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
            rectangle: false
        }
    });
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, function(e) {
        var layer = e.layer;
        drawnItems.addLayer(layer);
    });

    function savePolygon() {
        var polygons = [];
        drawnItems.eachLayer(function(layer) {
            if (layer instanceof L.Polygon) {
                var polygon = {
                    name: document.getElementById('lot-name').value,
                    price: document.getElementById('lot-price').value,
                    coordinates: layer.getLatLngs()[0].map(function(latLng) {
                        return [latLng.lat, latLng.lng];
                    })
                };
                polygons.push(polygon);
            }
        });

        // Aquí puedes hacer algo con el array de polígonos en formato JSON
        console.log(polygons);
    }
    </script>
</body>

</html>