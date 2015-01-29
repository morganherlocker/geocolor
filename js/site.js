var geojson = {}
var fields = []
var styleOpts = ['fill', 'fill-opacity', 'stroke', 'stroke-opacity', 'marker-color', 'stroke-width', 'marker-size', 'marker-symbol']

$(function(){
  // Setup codemirror
  var textarea = $('#styles')[0]
  var editor = CodeMirror.fromTextArea(textarea,{
    mode: 'application/json',
    matchBrackets: true,
    tabSize: 2,
    lineNumbers: true
  })
  //editor.setSize(300, 100);
  editor.setValue('{\n  \n}')

  // Setup help popups
  setupHelp()

  // Load Sample
  $('#sample').click(function(){
    geojson = sample
    fields = Object.keys(geojson.features[0].properties)
    populateZSelect('jenksZSelect')
    populateZSelect('quantilesZSelect')
    populateZSelect('equalIntervalsZSelect')
    populateZSelect('customZSelect')

    map.featureLayer.setGeoJSON(geojson)
    map.fitBounds(map.featureLayer.getBounds());
    map.featureLayer.eachLayer(setPopups)

    $('#classification').val('Quantiles')
    $('#classification').trigger('change')
    $('#quantilesZSelect').val('Population Density')
    $('#quantilesColor1').val('green')
    $('#quantilesColor2').val('yellow')
    $('#quantilesColor3').val('red')
    $('#colorize').trigger('click')
  })

  // Upload File
  $('#dropFile').on('change', function(evt){
    $('#legend').hide()
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
    $('#legend').hide()
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
    var styles = JSON.parse(editor.getValue())
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

    // Setup Legend
    setupLegend(classification)
  })
  
  // Export Geojson
  $('#export').click(function(){
    //var content = '<h3>Geojson</h3><hr>'
    //content+= '<textarea id="geojsonExport" rows="8" cols="40" class="form-control">'+JSON.stringify(geojson)+'</textarea>'
    //vex.dialog.alert(content)
    var gist = {
      "description": "geocolor.geojson",
      "public": true,
      "files": {
        "geocolor.geojson": {
          "content": JSON.stringify(geojson, null, 2)
        }
      }
    }

    $.post('https://api.github.com/gists', JSON.stringify(gist), function(res){
      window.open('https://cdn.rawgit.com/anonymous/'+res.id+'/raw/geocolor.geojson', '_self')
    })
  })

  // Create Gist
  $('#gist').click(function(){
    var gist = {
      "description": "geocolor map",
      "public": true,
      "files": {
        "geocolor.geojson": {
          "content": JSON.stringify(geojson, null, 2)
        },
        "index.html": {
          "content": shareTemplate
        }
      }
    }

    $.post('https://api.github.com/gists', JSON.stringify(gist), function(res){
      var content = '<h3>Share</h3><hr>'
      content+= '<p><a target="_blank" href="http://bl.ocks.org/anonymous/raw/'+res.id+'">http://bl.ocks.org/anonymous/raw/'+res.id+'</a>'
      vex.dialog.alert(content)
    })
  })
})

function setPopups(layer){
  var content = '<div class="propertiesPopup">'
  content += '<table id="propertiesTable" class="table table-striped">'
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
    var help = '<h3>Geojson File</h3><hr>'
    help+= '<p>Input a valid <a target="_blank" href="http://geojson.org/">geojson</a> file containing a FeatureCollection.'
    vex.dialog.alert(help)
  })

  $('#classificationHelp').click(function(){
    var help = '<h3>Classification</h3><hr>'
    help+= '<p>The classification option determines how colors will be assigned. '
    help+= '<a target="_blank" href="http://en.wikipedia.org/wiki/Jenks_natural_breaks_optimization">Jenks</a>'
    help+= ', <a target="_blank" href="http://en.wikipedia.org/wiki/Quantile">Quantiles</a>'
    help+= ', and Equal Intervals '
    help+= 'all work well for graduated color ramps.'
    vex.dialog.alert(help)
  })

  $('.zFieldHelp').click(function(){
    var help = '<h3>Z Field</h3><hr>'
    help+= '<p>The z field is what determines a feature\'s relative color. This could be anything from population to density of crime.'
    vex.dialog.alert(help)
  })

  $('.breaksHelp').click(function(){
    var help = '<h3>Breaks</h3><hr>'
    help+= '<p>Breaks are the values at which data is divided. More breaks means more subtle color shifts.'
    vex.dialog.alert(help)
  })

  $('#stylesHelp').click(function(){
    var help = '<h3>Styles</h3><hr>'
    help+= '<p>The Styles field allows you to enter any valid <a target="_blank" href="https://github.com/mapbox/simplestyle-spec/tree/master/1.1.0">simplestyle-spec</a> style. '
    help+= 'These styles will be applied across all features.'
    help+= '<p>If you had a set of polygons and wanted to change the stroke width and fill opacity, you could enter the following:'
    help+= '<pre><code>{\n  "stroke:thickness": "1",\n  "fill-opacity": 0.4\n}</code></pre>'
    vex.dialog.alert(help)
  })

  $('#aboutLink').click(function(){
    var help = '<h3>About Geocolor</h3><hr>'
    help+= '<p>Geocolor is a web app and javascript library for creating quick geographic data visualizations such as '
    help+= '<a target="_blank" href="http://en.wikipedia.org/wiki/Choropleth_map">choropleths</a>. '
    help+= '<p>Geocolor is <a target="_blank" href="https://github.com/morganherlocker/geocolor">open source</a> under the <a href="https://raw.githubusercontent.com/morganherlocker/geocolor/gh-pages/LICENSE">MIT License</a>.'
    help+= '<p>Created by <a target="_blank" href="https://twitter.com/morganherlocker">@morganherlocker</a>.'
    vex.dialog.alert(help)
  })
}

function setupLegend(classification){
  if(classification === 'Jenks' || classification === 'Quantiles' || classification === 'Equal Interval' || classification === 'Custom') {
    $('#legend').empty()
    // Labels
    var legend = '<h5>'+geojson.legend.title+'</h5>'
    legend+= '<div id="labels">'
    geojson.legend.symbols.forEach(function(symbol){
      legend+='<div>'+parseFloat(symbol.from).toFixed(2)+' - '+parseFloat(symbol.to).toFixed(2)+'</div>'
    })
    legend+='</div>'

    // Symbols
    legend+= '<div id="symbols">'
    geojson.legend.symbols.forEach(function(symbol){
      legend+='<div class="symbolBox" style="background-color:'+symbol.color+'"></div>'
    })
    legend+='</div>'
    
    $('#legend').append(legend)
    $('#legend').show()
  }
  else {
    $('#legend').hide()
  }
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
