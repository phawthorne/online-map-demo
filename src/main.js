/* **** Leaflet **** */

// Base layer
// CartoDB Positron
var cartodb = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>', minZoom: 4, maxZoom: 9});

// Solution layers
var sustCur = L.tileLayer('Colombia/sustainable_current/{z}/{x}/{y}.png', {tms: true, opacity: 0.7, attribution: "", minZoom: 5, maxZoom: 9});
var nearest = L.tileLayer('Colombia/nearest/{z}/{x}/{y}.png', {tms: true, opacity: 0.7, attribution: "", minZoom: 5, maxZoom: 9});
var paretoAg = L.tileLayer('Colombia/pareto_max_ag_value/{z}/{x}/{y}.png', {tms: true, opacity: 0.7, attribution: "", minZoom: 5, maxZoom: 9});
var paretoBio = L.tileLayer('Colombia/pareto_max_biodiversity/{z}/{x}/{y}.png', {tms: true, opacity: 0.7, attribution: "", minZoom: 5, maxZoom: 9});

// Map
var map = L.map('map', {
    center: [4.671328914970367, -74.66408910910411],
    zoom: 6,
    minZoom: 5,
    maxZoom: 9,
    layers: [cartodb]
});

var basemaps = {"Background Map": cartodb}
// var basemaps = {"OpenStreetMap": osm, "CartoDB Positron": cartodb}
var groupedOverlays = {
    "Frontier Solutions": {
        "Sustainble Current": sustCur, 
        "Nearest": nearest, 
        "Pareto Max Ag Value": paretoAg,
        "Pareto Max Biodiversity": paretoBio
    }
};
var options = {
    exclusiveGroups:["Frontier Solutions"]
}

// Title
var title = L.control();
title.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'ctl title');
    this.update();
    return this._div;
};
title.update = function(props) {
    this._div.innerHTML = "Scenarios";
};
title.addTo(map);

// Add base layers
var layerControl = L.control.groupedLayers(basemaps, groupedOverlays, options);
map.addControl(layerControl);

// Fit to overlay bounds (SW and NE points with (lat, lon))
// map.fitBounds([[-4.236909072799711, -66.86689793330432], [13.579566902740444, -82.4612802849039]]);
