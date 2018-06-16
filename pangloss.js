import 'leaflet/dist/leaflet.js';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';

let map = L.map("Map");
map.attributionControl.setPrefix("");
map.attributionControl.addAttribution("<a href='https://www.openstreetmap.org/copyright' target='_blank'>Map background © OpenStreetMap</a>");

// OSM layer
let osmLayer = new L.TileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png");
map.addLayer(osmLayer);

let coordinateList = [
[0.942638,48.961817],
[121.4737021,31.2303904],
[1.553376,44.486067],
[2.2855723,48.8577083],
[2.3522219,48.856614],
[4.3517211,50.8503463],
[4.4970097,52.1601144],
[5.798617999999999,46.14385],
[5.826179,46.10759900000001],
[5.8507466,45.9592788],
[5.885835,46.042896],
[5.905196000000001,46.167409],
[5.979909999999999,46.236466],
[5.99152,46.07163],
[5.999084,46.251997],
[6.0013782,46.1696093],
[6.02513,46.2437479],
[6.036173,46.308912],
[6.041151999999999,46.264617],
[6.058036,46.3341909],
[6.0679661,46.2544962],
[6.069864,46.317077],
[6.070988,46.2283204],
[6.0764849,46.1771419],
[6.081338,46.144516],
[6.098042,46.304598],
[6.098655000000001,46.269647],
[-61.04931879999999,10.826784],
[6.108669,46.25763200000001],
[6.114479999999999,46.329831],
[6.1145793,46.1668075],
[6.1231633,46.2331904],
[6.129384,45.899247],
[6.133937899999999,46.1919166],
[6.136039999999999,46.358168],
[6.1431577,46.2043907],
[6.1435559,46.2420331],
[6.1546616,46.2644048],
[6.1657813,46.2876938],
[6.1695935,46.3033989],
[6.1899179,45.95074899999999],
[6.208959,46.18468499999999],
[6.258241,46.174611],
[6.2698809,46.4203001],
[6.3397549,46.4612971],
[6.347874399999999,45.76629260000001],
[6.396810899999999,46.000847],
[6.496130099999999,46.5088127],
[6.6583,46.83086],
[6.6765547,45.5082417],
[6.832783800000001,47.1034892],
[-78.700575,38.0695815],
[8.8003398,46.4780683]
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

