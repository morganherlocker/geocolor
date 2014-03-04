var _ = require('lodash'),
    ss = require('simple-statistics'),
    chroma = require('chroma-js')

module.exports = {

  // JENKS
  jenks: function(fc, z, numBreaks, colors){
    var vals = _.chain(fc.features)
      .pluck('properties')
      .pluck(z)
      .value()
    var breaks = ss.jenks(vals, numBreaks)
    var normals = normalize(breaks,1)
    fc = colorize(fc, z, colors, breaks, normals)
    return fc
  },

  // QUANTILE
  quantile: function(fc, z, numBreaks, colors){
    var vals = _.chain(fc.features)
      .pluck('properties')
      .pluck(z)
      .value()
    var min = ss.min(vals)
    var max = ss.max(vals)
    var interval = 1 / numBreaks
    var quants = [0]
    var currentBreak = 0
    for(var i=0;i<numBreaks;i++){
      currentBreak += interval
      quants.push(currentBreak)
    }
    var breaks = ss.quantile(vals, quants)
    var normals = normalize(breaks,1)
    fc = colorize(fc, z, colors, breaks, normals)
    return fc
  }

  // EQUAL INTERVAL
  equalInterval: function(fc, z, numBreaks, colors){
    var vals = _.chain(fc.features)
      .pluck('properties')
      .pluck(z)
      .value()
    var min = ss.min(vals)
    var max = ss.max(vals)
    var interval = (max - min) / numBreaks
    var breaks = [0]
    var currentBreak = 0
    for(var i=0;i<=numBreaks;i++){
      currentBreak += interval
      breaks.push(currentBreak)
    }
    var normals = normalize(breaks,1)
    fc = colorize(fc, z, colors, breaks, normals)
    return fc
  }
}

function colorize(fc, z, colors, breaks, normals){
  var scale = chroma.scale(colors);
  _.each(fc.features, function(f){
    _.each(breaks, function(b1, i){
      var b2 = breaks[i + 1]
      var colorHex = scale(normals[i+1]).hex()
      if(f.properties[z] >= b1 && f.properties[z] < b2){
        f = setColor(f, colorHex)
      }
      else if(f.properties[z] === b2){
        f = setColor(f, colorHex)
      }
    })
  })
  return fc
}

function setColor(feature, colorHex){
  if(feature.geometry.type === 'Point'){
    feature.properties['marker-color'] = colorHex
    return feature
  }
  else if(feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon'){
    feature.properties['fill'] = colorHex
    feature.properties['stroke'] = '#000000'
    return feature
  }
}

function normalize(array, value)
{
  var normals = []
  var max = ss.max(array)
  _.each(array, function(val){
    normals.push((val / max) * value)
  })
  return normals
}
