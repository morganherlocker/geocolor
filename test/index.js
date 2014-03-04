var should = require('should'),
    fs = require('fs'),
    geocolor = require('../index')

describe('geocolor', function(){
  it('should take a set of points and classify based on jenks, then output geojson with color styles', function(){
    var geo = JSON.parse(fs.readFileSync(__dirname+'/in/cities.geojson'))
    geo.features[0].should.be.ok

    geo = geocolor.jenks(geo, 'Population', 3, ['green', 'yellow', 'red'])
    geo.should.be.ok
    geo.features.should.be.ok
    geo.features[0].properties['marker-color'].should.be.ok
    fs.writeFileSync(__dirname+'/out/styled.geojson', JSON.stringify(geo, null, 2))
  })
  it('should take a set of points and classify based on quantiles, then output geojson with color styles', function(){
    var geo = JSON.parse(fs.readFileSync(__dirname+'/in/cities.geojson'))
    geo.features[0].should.be.ok

    geo = geocolor.quantiles(geo, 'Population', 4, ['green', 'yellow', 'red'])
    geo.should.be.ok
    geo.features.should.be.ok
    geo.features[0].properties['marker-color'].should.be.ok
    fs.writeFileSync(__dirname+'/out/styled2.geojson', JSON.stringify(geo, null, 2))
  })
  it('should take a set of points and classify based on equal intervals, then output geojson with color styles', function(){
    var geo = JSON.parse(fs.readFileSync(__dirname+'/in/cities.geojson'))
    geo.features[0].should.be.ok

    geo = geocolor.equalIntervals(geo, 'Population', 'interval', 5, ['green', 'yellow', 'red'])
    geo.should.be.ok
    geo.features.should.be.ok
    geo.features[0].properties['marker-color'].should.be.ok
    fs.writeFileSync(__dirname+'/out/styled3.geojson', JSON.stringify(geo, null, 2))
  })
  it('should take a set of points and classify based on custom breaks, then output geojson with color styles', function(){
    var geo = JSON.parse(fs.readFileSync(__dirname+'/in/cities.geojson'))
    geo.features[0].should.be.ok

    geo = geocolor.custom(geo, 'Population', [0,200000,300000,400000,500000,800000,1000000,1000000000], ['white', 'purple'])
    geo.should.be.ok
    geo.features.should.be.ok
    geo.features[0].properties['marker-color'].should.be.ok
    fs.writeFileSync(__dirname+'/out/styled4.geojson', JSON.stringify(geo, null, 2))
  })
  xit('should take a set of points and classify based on equal intervals, then output geojson with color styles', function(){
    var geo = JSON.parse(fs.readFileSync(__dirname+'/in/cities.geojson'))
    geo.features[0].should.be.ok

    geo = geocolor(geo, 'Population', 'interval', 5, ['green', 'yellow', 'red'])
    geo.should.be.ok
    geo.features.should.be.ok
    geo.features[0].properties['marker-color'].should.be.ok
    fs.writeFileSync(__dirname+'/out/styled5.geojson', JSON.stringify(geo, null, 2))
  })
  it('should take a set of polygons and classify based on jenks, then output geojson with color styles', function(){
    var geo = JSON.parse(fs.readFileSync(__dirname+'/in/sc.geojson'))
    geo.features[0].should.be.ok

    geo = geocolor.jenks(geo, 'poverty', 7, ['blue', 'red'])
    geo.should.be.ok
    geo.features.should.be.ok
    geo.features[0].properties['fill'].should.be.ok
    fs.writeFileSync(__dirname+'/out/styled7.geojson', JSON.stringify(geo, null, 2))
  })
})
