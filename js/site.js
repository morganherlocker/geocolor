var geojson = {}
$(function(){

  // Upload File
  $('#dropFile').on('change', function(evt){
    console.log(evt)
    var reader = new FileReader();
    reader.readAsText(evt.currentTarget.files[0]);
    reader.onload = function(e) {
      geojson = JSON.parse(e.target.result)
      map.featureLayer.setGeoJSON(geojson);
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
    }
    else if(classification === 'Quantiles'){
      $('#quantilesControls').show()
      $('#jenksControls').hide()
      $('#equalIntervalsControls').hide()
      $('#randomControls').hide()
    }
    else if(classification === 'Equal Interval'){
      $('#equalIntervalsControls').show()
      $('#jenksControls').hide()
      $('#quantilesControls').hide()
      $('#randomControls').hide()
    }
    else if(classification === 'Random'){
      $('#randomControls').show()
      $('#jenksControls').hide()
      $('#quantilesControls').hide()
      $('#equalIntervalsControls').hide()
    }
    else if(classification === 'All'){
      $('#jenksControls').hide()
      $('#quantilesControls').hide()
      $('#equalIntervalsControls').hide()
      $('#randomControls').hide()
    }
  })

  // Colorize Features
  $('#colorize').click(function(){
    var classification = $('#classification').val()
    var z = $('#jenksZ').val()
    var styles = JSON.parse($('#styles').val())
    var colors = []

    if(classification === 'Jenks'){
      colors.push($('#jenksColor1 option:selected').text())
      if(!($('#jenksColor2 option:selected').text() === '--')){
        colors.push($('#jenksColor2 option:selected').text())
      }
      colors.push($('#jenksColor3 option:selected').text())
      var numBreaks = parseFloat($('#jenksNumBreaks').val())

      geojson = geocolor.jenks(geojson, z, numBreaks, colors, styles)
      map.featureLayer.setGeoJSON(geojson);
    }
    else if(classification === 'Quantiles'){
      var numBreaks = $('#quantilesNumBreaks').val()
      geojson = geocolor.quantiles(geojson, numBreaks, styles)
      map.featureLayer.setGeoJSON(geojson);
    }
    else if(classification === 'Equal Interval'){
      var numBreaks = $('#equalIntervalsNumBreaks').val()
      geojson = geocolor.equalIntervals(geojson, numBreaks, styles)
      map.featureLayer.setGeoJSON(geojson);
    }
    else if(classification === 'Random'){
      map.featureLayer.setGeoJSON(geojson);
    }
    else if(classification === 'All'){
      geojson = geocolor.all(geojson, styles)
      map.featureLayer.setGeoJSON(geojson);
    }
  })
})