var should = require('should'),
    fs = require('fs'),
    geocolor = require('../index')

describe('geocolor', function(){
  it('should take a set of points and classify based on jenks, then output geojson with color styles', function(){
    var geo = JSON.parse(fs.readFileSync(__dirname+'/in/points1.geojson'))
    geo.should.be.ok
    geo.features.should.be.ok
    console.log(geo)
  })
})
