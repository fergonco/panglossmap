import 'leaflet/dist/leaflet.js';

let map = L.map("Map");
map.attributionControl.setPrefix("");
map.attributionControl.addAttribution("Map background © OpenStreetMap");

// OSM layer
let osmLayer = new L.TileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png");
map.addLayer(osmLayer);

map.setView([ 46.798, 8.385 ], 8);
