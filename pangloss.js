import 'leaflet/dist/leaflet.js';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';

let map = L.map("Map");
map.attributionControl.setPrefix("");
map.attributionControl.addAttribution("<a href='https://www.openstreetmap.org/copyright' target='_blank'>Map background © OpenStreetMap</a>");

// OSM layer
let osmLayer = new L.TileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png");
map.addLayer(osmLayer);

let coordinateList = [
    [8.385, 46.798],
    [8.285, 46.698]
];
let data = [];
coordinateList.forEach(function (coordinate) {
    data.push({
        id: data.length,
        properties: [],
        geometry: {
            type: "Point",
            coordinates: coordinate
        },
        type: "Feature"
    });
});

function style(feature) {
    return {
        radius: 8,
        fillColor: "#9f5dea",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
}

let benchLayer = L.geoJSON(data, {
    style: style,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng)
    }
});

let markerCluster = L.markerClusterGroup({
    chunkedLoading: true,
    disableClusteringAtZoom: 16,
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    iconCreateFunction: function (cluster) {
        let childCount = cluster.getChildCount();
        return new L.DivIcon({ html: '<div><span><b>' + childCount + '</b></span></div>', className: 'marker-cluster marker-cluster-large', iconSize: new L.Point(40, 40) });
    }
});
markerCluster.addLayer(benchLayer);
map.addLayer(markerCluster);

map.setView([ 46.798, 8.385 ], 8);

