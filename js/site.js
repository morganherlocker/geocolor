$(function(){
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
})
