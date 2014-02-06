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
    var normals = normalize(breaks, 255)
    _.each(fc.features, function(f){
      _.each(breaks, function(b1, i){
        var b2 = breaks[i + 1]
        if(f.properties[z] >= b1 && f.properties[z] < b2){
          color = Color("rgb(255, 0, 0)")
          console.log(normals[i+1])
          console.log(color.darken(normals[i + 1]).hexString())
          f.properties['marker-color'] = Color("rgb("+normals[i + 1]+","+normals[i + 1]+",255)").hexString()
        }
        else if(f.properties[z] === b2){
          f.properties['marker-color'] = Color("rgb("+normals[i + 1]+","+normals[i + 1]+",255)").hexString()
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

