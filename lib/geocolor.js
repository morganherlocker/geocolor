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
    var normals = normalize(breaks, 50)
    _.each(fc.features, function(f){
      _.each(breaks, function(b1, i){
        var b2 = breaks[i + 1]
        color = Color("rgb(255, 0, 0)")
        //color.lightness(50)
        var colorHex = color.lightness(100 - normals[i+1]).hexString()
        var colorHex = color.hexString()
        if(f.properties[z] >= b1 && f.properties[z] < b2){
          //console.log(normals[i + 1])
          //console.log(color.darken(normals[i + 1]).hexString())
          f.properties['marker-color'] = colorHex
        }
        else if(f.properties[z] === b2){
          f.properties['marker-color'] = colorHex
        }
      })
    })
    //console.log(JSON.stringify(fc, null, 2))
    return fc
  }
  else{
    return new Error('unsupported classification: ' + z)
  }
}

function normalize(array, value)
{ 
  var normals = []
  var max = ss.max(array)
  _.each(array, function(val){
    normals.push((val / max) * value)
  })
  //console.log(normals)
  return normals
}

