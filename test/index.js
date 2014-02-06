var should = require('should'),
    fs = require('fs'),
    geocolor = require('../index')

describe('geocolor', function(){
  it('should take a set of points and classify based on jenks, then output geojson with color styles', function(){
    var geo = JSON.parse(fs.readFileSync(__dirname+'/in/points1.geojson'))
    geo.features[0].should.be.ok

    geo = geocolor(geo, 'elevation', 'jenks', 5, ['green', 'yellow', 'red'])
    geo.should.be.ok
    geo.features.should.be.ok
    geo.features[0].properties['marker-color'].should.be.ok
    fs.writeFileSync(__dirname+'/out/styled.geojson', JSON.stringify(geo, null, 2))
  })
  it('should take a set of points and classify based on quantiles, then output geojson with color styles', function(){
    var geo = JSON.parse(fs.readFileSync(__dirname+'/in/points1.geojson'))
    geo.features[0].should.be.ok

    geo = geocolor(geo, 'elevation', 'quantile', 7, ['green', 'yellow', 'red'])
    geo.should.be.ok
    geo.features.should.be.ok
    geo.features[0].properties['marker-color'].should.be.ok
    fs.writeFileSync(__dirname+'/out/styled2.geojson', JSON.stringify(geo, null, 2))
  })
  it('should take a set of points and classify based on equal intervals, then output geojson with color styles', function(){
    var geo = JSON.parse(fs.readFileSync(__dirname+'/in/points1.geojson'))
    geo.features[0].should.be.ok

    geo = geocolor(geo, 'elevation', 'interval', 7, ['green', 'yellow', 'red'])
    geo.should.be.ok
    geo.features.should.be.ok
    geo.features[0].properties['marker-color'].should.be.ok
    fs.writeFileSync(__dirname+'/out/styled3.geojson', JSON.stringify(geo, null, 2))
  })
})
