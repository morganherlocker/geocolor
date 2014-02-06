var _ = require('lodash'),
    ss = require('simple-statistics')

module.exports = function(fc, z, classification, numBreaks, colors){
  if(classification === 'jenks'){
    var vals = _.chain(fc.features)
      .pluck('properties')
      .pluck(z)
      .value()
    
    var breaks = ss.jenks(vals, numBreaks)
    console.log(vals)
    console.log(breaks)
    _.each(fc.features, function(f){
      _.each(breaks, function(b, i){
        if(f.properties[z] >= b && f.properties[z] < breaks[i + 1]){
          
        }
      })
    })
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