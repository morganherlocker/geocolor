// Used https://github.com/mapbox/geojson.io/blob/gh-pages/data/share.html as the basis for this template

shareTemplate = "<!DOCTYPE html> \
<html> \
<head> \
  <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' /> \
  <style> \
  body { margin:0; padding:0; } \
  #map { position:absolute; top:0; bottom:0; width:100%; } \
  .marker-properties { \
    border-collapse:collapse; \
    font-size:11px; \
    border:1px solid #eee; \
    margin:0; \
} \
.marker-properties th { \
    white-space:nowrap; \
    border:1px solid #eee; \
    padding:5px 10px; \
} \
.marker-properties td { \
    border:1px solid #eee; \
    padding:5px 10px; \
} \
.marker-properties tr:last-child td, \
.marker-properties tr:last-child th { \
    border-bottom:none; \
} \
.marker-properties tr:nth-child(even) th, \
.marker-properties tr:nth-child(even) td { \
    background-color:#f7f7f7; \
} \
  </style> \
  <script src='http://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.js'></script> \
  <script src='http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js' ></script> \
  <link href='http://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.css' rel='stylesheet' /> \
</head> \
<body> \
<div id='map'></div> \
<script type='text/javascript'> \
var map = L.mapbox.map('map'); \
\
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { \
    attribution: '&copy; <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors' \
  }).addTo(map); \
\
$.getJSON('geocolor.geojson', function(geojson) { \
    map.featureLayer.setGeoJSON(geojson); \
    \
    var bounds = map.featureLayer.getBounds(); \
    if (bounds.isValid()) { \
        map.fitBounds(map.featureLayer.getBounds()); \
    } else { \
        map.setView([0, 0], 2); \
    } \
    map.featureLayer.eachLayer(function(l) { \
        showProperties(l); \
    }); \
}); \
\
function showProperties(l) {\
    var properties = l.toGeoJSON().properties, table = '';\
    for (var key in properties) {\
        table += '<tr><th>' + key + '</th>' +\
            '<td>' + properties[key] + '</td></tr>';\
    }\
    if (table) l.bindPopup('<table class=\"marker-properties display\">' + table + '</table>');\
}\
</script>\
</body>\
</html>"