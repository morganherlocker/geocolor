var geojson = {}
var fields = []
var styleOpts = ['fill', 'fill-opacity', 'stroke', 'stroke-opacity', 'marker-color', 'stroke-width', 'marker-size', 'marker-symbol']

$(function(){
  setupHelp()

  // Upload File
  $('#dropFile').on('change', function(evt){
    console.log(evt)
    var reader = new FileReader();
    reader.readAsText(evt.currentTarget.files[0]);
    reader.onload = function(e) {
      geojson = JSON.parse(e.target.result)
      fields = Object.keys(geojson.features[0].properties)
      populateZSelect('jenksZSelect')
      populateZSelect('quantilesZSelect')
      populateZSelect('equalIntervalsZSelect')
      populateZSelect('customZSelect')

      map.featureLayer.setGeoJSON(geojson)
      map.fitBounds(map.featureLayer.getBounds());
      map.featureLayer.eachLayer(setPopups)
    }
  })

  // Select Classification Options
  $('#classification').change(function(){
    var classification = $('#classification').val()
    if(classification === 'Jenks'){
      $('#jenksControls').show()
      $('#quantilesControls').hide()
      $('#equalIntervalsControls').hide()
      $('#randomControls').hide() 
      $('#customControls').hide()
    }
    else if(classification === 'Quantiles'){
      $('#quantilesControls').show()
      $('#jenksControls').hide()
      $('#equalIntervalsControls').hide()
      $('#randomControls').hide()
      $('#customControls').hide()
    }
    else if(classification === 'Equal Interval'){
      $('#equalIntervalsControls').show()
      $('#jenksControls').hide()
      $('#quantilesControls').hide()
      $('#randomControls').hide()
      $('#customControls').hide()
    }
    else if(classification === 'Random'){
      $('#randomControls').show()
      $('#jenksControls').hide()
      $('#quantilesControls').hide()
      $('#equalIntervalsControls').hide()
      $('#customControls').hide()
    }
    else if(classification === 'All'){
      $('#jenksControls').hide()
      $('#quantilesControls').hide()
      $('#equalIntervalsControls').hide()
      $('#randomControls').hide()
      $('#customControls').hide()
    }
    else if(classification === 'Custom'){
      $('#customControls').show()
      $('#jenksControls').hide()
      $('#quantilesControls').hide()
      $('#equalIntervalsControls').hide()
      $('#randomControls').hide()
    }
  })

  // Colorize Features
  $('#colorize').click(function(){
    var classification = $('#classification').val()
    var styles = JSON.parse($('#styles').val())
    var colors = []

    if(classification === 'Jenks'){
      var z = $('#jenksZSelect option:selected').text()
      colors.push($('#jenksColor1 option:selected').text())
      if(!($('#jenksColor2 option:selected').text() === '--')){
        colors.push($('#jenksColor2 option:selected').text())
      }
      colors.push($('#jenksColor3 option:selected').text())
      var numBreaks = parseFloat($('#jenksNumBreaks').val())

      geojson = geocolor.jenks(geojson, z, numBreaks, colors, styles)
      map.featureLayer.setGeoJSON(geojson)
      map.featureLayer.eachLayer(setPopups)
    }
    else if(classification === 'Quantiles'){
      var z = $('#quantilesZSelect option:selected').text()
      colors.push($('#quantilesColor1 option:selected').text())
      if(!($('#quantilesColor2 option:selected').text() === '--')){
        colors.push($('#quantilesColor2 option:selected').text())
      }
      colors.push($('#quantilesColor3 option:selected').text())
      var numBreaks = parseFloat($('#quantilesNumBreaks').val())

      geojson = geocolor.quantiles(geojson, z, numBreaks, colors, styles)
      map.featureLayer.setGeoJSON(geojson)
      map.featureLayer.eachLayer(setPopups)
    }
    else if(classification === 'Equal Interval'){
      var z = $('#equalIntervalsZSelect option:selected').text()
      colors.push($('#equalIntervalsColor1 option:selected').text())
      if(!($('#equalIntervalsColor2 option:selected').text() === '--')){
        colors.push($('#equalIntervalsColor2 option:selected').text())
      }
      colors.push($('#equalIntervalsColor3 option:selected').text())
      var numBreaks = parseFloat($('#equalIntervalsNumBreaks').val())

      geojson = geocolor.equalIntervals(geojson, z, numBreaks, colors, styles)
      map.featureLayer.setGeoJSON(geojson)
      map.featureLayer.eachLayer(setPopups)
    }
    else if(classification === 'Random'){
      if(!($('#randomColor1 option:selected').text() === '--')){
        colors.push($('#randomColor1 option:selected').text())
      }
      if(!($('#randomColor2 option:selected').text() === '--')){
        colors.push($('#randomColor2 option:selected').text())
      }
      if(!($('#randomColor3 option:selected').text() === '--')){
        colors.push($('#randomColor3 option:selected').text())
      }
      if(!($('#randomColor4 option:selected').text() === '--')){
        colors.push($('#randomColor4 option:selected').text())
      }
      if(!($('#randomColor5 option:selected').text() === '--')){
        colors.push($('#randomColor5 option:selected').text())
      }

      geojson = geocolor.random(geojson, colors, styles)
      map.featureLayer.setGeoJSON(geojson)
      map.featureLayer.eachLayer(setPopups)
    }
    else if(classification === 'All'){
      geojson = geocolor.all(geojson, styles)
      map.featureLayer.setGeoJSON(geojson)
      map.featureLayer.eachLayer(setPopups)
    }
    else if(classification === 'Custom'){
      var z = $('#customZSelect option:selected').text()
      colors.push($('#customColor1 option:selected').text())
      if(!($('#customColor2 option:selected').text() === '--')){
        colors.push($('#customColor2 option:selected').text())
      }
      colors.push($('#customColor3 option:selected').text())
      var breaks = $('#customBreaks').val().split(',').map(function(x){return parseFloat(x)})

      geojson = geocolor.custom(geojson, z, breaks, colors, styles)
      map.featureLayer.setGeoJSON(geojson)
      map.featureLayer.eachLayer(setPopups)
    }
  })
})

function setPopups(layer){
  var content = '<div class="propertiesPopup">'
  content += '<table class="table table-striped">'
  fields.forEach(function(field){
    if(!contains(styleOpts, field)){
      content += '<tr>'
      content+='<td><b>'+field+'</b></td><td>'+layer.feature.properties[field]+'</td>'
      content += '</tr>'
    }
  })
  content += '</table>'
  content += '</div>'

  layer.bindPopup(content);
}

function populateZSelect(id){
  $('#'+id).empty()
  fields.forEach(function(field){
    if(!contains(styleOpts, field)){
      $('#'+id).append('<option>'+field+'</option>')
    }
  })
}

function setupHelp(){
  $('#geojsonFileHelp').click(function(){
    var help = '<h3>Geojson File</h3>'
    help+= '<p>Input a valid <a href="http://geojson.org/">geojson</a> file containing a FeatureCollection.'
    vex.dialog.alert(help)
  })

  $('#classificationHelp').click(function(){
    var help = '<h3>Classification</h3>'
    help+= '<p>The classification option determines how colors will be assigned. '
    help+= '<a href="http://en.wikipedia.org/wiki/Jenks_natural_breaks_optimization">Jenks</a>'
    help+= ', <a href="http://en.wikipedia.org/wiki/Quantile">Quantiles</a>'
    help+= ', and Equal Intervals '
    help+= 'all work well for graduated color ramps.'
    vex.dialog.alert(help)
  })

  $('.zFieldHelp').click(function(){
    var help = '<h3>Z Field</h3>'
    help+= '<p>The z field is what determines a feature\'s relative color. This could be anything from population, to density of cats.'
    vex.dialog.alert(help)
  })

  $('.breaksHelp').click(function(){
    var help = '<h3>Breaks</h3>'
    help+= '<p>Breaks are the values at which data is divided. More breaks means more subtle color shifts.'
    vex.dialog.alert(help)
  })

  $('#stylesHelp').click(function(){
    var help = '<h3>Styles</h3>'
    help+= '<p>The Styles field allows you to enter any valid <a href="https://github.com/mapbox/simplestyle-spec/tree/master/1.1.0">simplestyle-spec styles</a>. '
    help+= 'These styles will be applied across all features.'
    help+= '<p>If you had a set of polygons and wanted to change the stroke width and fill opacity, you could enter the following:'
    help+= '<pre><code>{\n  "stroke:thickness": "1",\n  "fill-opacity": 0.4\n}</code></pre>'
    vex.dialog.alert(help)
  })
}

function contains(a, obj) {
  var i = a.length;
  while (i--) {
   if (a[i] === obj) {
      return true;
   }
  }
  return false;
}