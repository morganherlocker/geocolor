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
      var z = $('#jenksZ').val()
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
      var z = $('#quantilesZ').val()
      colors.push($('#quantilesColor1 option:selected').text())
      if(!($('#quantilesColor2 option:selected').text() === '--')){
        colors.push($('#quantilesColor2 option:selected').text())
      }
      colors.push($('#quantilesColor3 option:selected').text())
      var numBreaks = parseFloat($('#quantilesNumBreaks').val())

      geojson = geocolor.quantiles(geojson, z, numBreaks, colors, styles)
      map.featureLayer.setGeoJSON(geojson);
    }
    else if(classification === 'Equal Interval'){
      var z = $('#equalIntervalsZ').val()
      colors.push($('#equalIntervalsColor1 option:selected').text())
      if(!($('#equalIntervalsColor2 option:selected').text() === '--')){
        colors.push($('#equalIntervalsColor2 option:selected').text())
      }
      colors.push($('#equalIntervalsColor3 option:selected').text())
      var numBreaks = parseFloat($('#equalIntervalsNumBreaks').val())

      geojson = geocolor.equalIntervals(geojson, z, numBreaks, colors, styles)
      map.featureLayer.setGeoJSON(geojson);
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
      map.featureLayer.setGeoJSON(geojson);
    }
    else if(classification === 'All'){
      geojson = geocolor.all(geojson, styles)
      map.featureLayer.setGeoJSON(geojson);
    }
    else if(classification === 'Custom'){
      var z = $('#customZ').val()
      colors.push($('#customColor1 option:selected').text())
      if(!($('#customColor2 option:selected').text() === '--')){
        colors.push($('#customColor2 option:selected').text())
      }
      colors.push($('#customColor3 option:selected').text())
      var breaks = $('#customBreaks').val().split(',').map(function(x){return parseFloat(x)})

      geojson = geocolor.custom(geojson, z, breaks, colors, styles)
      map.featureLayer.setGeoJSON(geojson);
    }
  })

  // Toggle JSON style view
  $('#styleToggle').click(function(){
    $('#styleUI').toggle()
    $('#styleJson').toggle()
  })
})