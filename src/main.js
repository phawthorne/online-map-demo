
const countryCenters = {
  "Colombia": [4.671328914970367, -74.66408910910411],
  "Germany": [51.169129469814806, 10.589647427706087]
}

function updateSummaryTable(countryName) {
  const objectives = ["crop-value", "biodiversity", "carbon", "cancer-cases"];
  objectives.forEach(objName => {
    max_key = `${objName}-max`;
    pareto_key = `${objName}-pareto`;
    document.getElementById(max_key)
      .innerHTML = nciSummary[countryName][max_key];
    document.getElementById(pareto_key)
      .innerHTML = nciSummary[countryName][pareto_key];
  });
}


function updateMap(countryName) {
  // Base layer
  // CartoDB Positron
  var cartodb = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>', minZoom: 4, maxZoom: 9});

  // Solution layers
  solutionMapOptions = {tms: true, opacity: 0.7, attribution: "", minZoom: 5, maxZoom: 9}
  var sustCur = L.tileLayer(countryName + '/sustainable_current/{z}/{x}/{y}.png', solutionMapOptions);
  var nearest = L.tileLayer(countryName + '/nearest/{z}/{x}/{y}.png', solutionMapOptions);
  var paretoAg = L.tileLayer(countryName + '/pareto_max_ag_value/{z}/{x}/{y}.png', solutionMapOptions);
  var paretoBio = L.tileLayer(countryName + '/pareto_max_biodiversity/{z}/{x}/{y}.png', solutionMapOptions);

  // Map
  var map = L.map('map', {
    center: countryCenters[countryName],
    zoom: 6,
    minZoom: 5,
    maxZoom: 9,
    layers: [cartodb]
  });

  var basemaps = {"Background Map": cartodb}
  // var basemaps = {"OpenStreetMap": osm, "CartoDB Positron": cartodb}
  var groupedOverlays = {
    "Frontier Solutions": {
      "Sustainable Current": sustCur, 
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
}

function handleCountrySelect() {
  const countryName = document.getElementById("country-select").value;

  document.getElementById("country-name")
    .innerHTML = countryName;
  document.getElementById("nci-frontier-plot")
    .innerHTML = `<img src='${countryName}/econ_vs_non_econ.png' id='frontier-img'/>`
  document.getElementById("nci-map").innerHTML = "<div id='map'></div>";
  updateSummaryTable(countryName);
  updateMap(countryName);
  }
  


updateMap("Colombia")
updateSummaryTable("Colombia")