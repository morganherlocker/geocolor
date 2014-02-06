var _ = require('lodash'),
    ss = require('simple-statistics'),
    Color = require('color')

module.exports = function(fc, z, classification, numBreaks, color){
  if(classification === 'jenks'){
    var vals = _.chain(fc.features)
      .pluck('properties')
      .pluck(z)
      .value()
    var color = Color("rgb(255, 255, 255)")
    var breaks = ss.jenks(vals, numBreaks)
    _.each(fc.features, function(f){
      _.each(breaks, function(b1, i){
        var b2 = breaks[i + 1]
        if(f.properties[z] >= b1 && f.properties[z] < b2){
          console.log(normalize(b2,240))
          f.properties['marker-color'] = color.red(normalize(b2,240))
        }
        else if(f.properties[z] === b2){
          f.properties['marker-color'] = color.red(normalize(b2,240))
        }
      })
    })
    
    //
    //_.each(fc.features, function(f){console.log(f.properties)})
    //

    return fc
  }
  else{
    return new Error('unsupported classification: ' + z)
  }
}

function normalize(array, value)
{ 
 for( var i = 0, len = array.length; i < len; i++ )
 {
  if( parseInt(array[i]) > value) array[i] = value;
 }
}

