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

    geo = geocolor.equalIntervals(geo, 'Population', 5, ['green', 'yellow', 'red'])
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
  it('should take a set of points and classify based on equal intervals, then output geojson with color styles', function(){
    var geo = JSON.parse(fs.readFileSync(__dirname+'/in/cities.geojson'))
    geo.features[0].should.be.ok

    geo = geocolor.equalIntervals(geo, 'Population', 7, ['white', 'red'])
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
  it('should take a set of polygons and classify based on quantiles, then output geojson with color styles', function(){
    var geo = JSON.parse(fs.readFileSync(__dirname+'/in/sc.geojson'))
    geo.features[0].should.be.ok

    geo = geocolor.jenks(geo, 'poverty', 15, ['green', 'yellow', 'red'])
    geo.should.be.ok
    geo.features.should.be.ok
    geo.features[0].properties['fill'].should.be.ok
    fs.writeFileSync(__dirname+'/out/styled8.geojson', JSON.stringify(geo, null, 2))
  })
  it('should take a set of polygons and classify based on quantiles, then output geojson with color styles', function(){
    var geo = JSON.parse(fs.readFileSync(__dirname+'/in/rivers-west.json'))
    geo.features[0].should.be.ok

    geo = geocolor.jenks(geo, 'MEANV', 10, ['green', 'yellow', 'red'])
    geo.should.be.ok
    geo.features.should.be.ok
    geo.features[0].properties['stroke'].should.be.ok
    fs.writeFileSync(__dirname+'/out/styled9.geojson', JSON.stringify(geo, null, 2))
  })
  it('should take a set of polygons and assign random colors, then output geojson with color styles', function(){
    var geo = JSON.parse(fs.readFileSync(__dirname+'/in/sc.geojson'))
    geo.features[0].should.be.ok

    geo = geocolor.random(geo, ['green', 'yellow', 'red', 'blue', 'purple', 'orange', 'pink'])
    geo.should.be.ok
    geo.features.should.be.ok
    geo.features[0].properties['fill'].should.be.ok
    //fs.writeFileSync(__dirname+'/out/styled10.geojson', JSON.stringify(geo, null, 2))
  })
  it('should take a set of polygons and assign random colors with a custom opacity and stroke, then output geojson with color styles', function(){
    var geo = JSON.parse(fs.readFileSync(__dirname+'/in/sc.geojson'))
    geo.features[0].should.be.ok

    var style = {
      'stroke': 'white',
      'fill-opacity': .4
    }
    geo = geocolor.random(geo, ['green', 'red'], style)
    geo.should.be.ok
    geo.features.should.be.ok
    geo.features[0].properties['fill'].should.be.ok
    geo.features[0].properties['fill-opacity'].should.equal(.4)
    geo.features[0].properties['stroke'].should.equal('#ffffff')
    //fs.writeFileSync(__dirname+'/out/styled11.geojson', JSON.stringify(geo, null, 2))
  })
  it('should take a set of polygons and assign a set of styles, then output geojson', function(){
    var geo = JSON.parse(fs.readFileSync(__dirname+'/in/sc.geojson'))
    geo.features[0].should.be.ok

    var style = {
      'stroke': 'white',
      'fill-opacity': .7,
      'fill': 'blue'
    }
    geo = geocolor.all(geo, style)
    geo.should.be.ok
    geo.features.should.be.ok
    geo.features[0].properties['fill'].should.be.ok
    geo.features[0].properties['fill-opacity'].should.equal(.7)
    geo.features[0].properties['stroke'].should.equal('#ffffff')
    fs.writeFileSync(__dirname+'/out/styled12.geojson', JSON.stringify(geo, null, 2))
  })
  it('should create a legend attribute', function(){
    var geo = JSON.parse(fs.readFileSync(__dirname+'/in/sc.geojson'))
    geo.features[0].should.be.ok

    geo = geocolor.jenks(geo, 'poverty', 3, ['green', 'yellow', 'red'])
    geo.should.be.ok
    geo.features.should.be.ok
    geo.legend.should.be.ok
    geo.legend.symbols[0].from.should.be.ok
    geo.legend.symbols[0].to.should.be.ok
    geo.legend.symbols[0].color.should.be.ok
    geo.legend.title.should.equal('poverty')
    fs.writeFileSync(__dirname+'/out/styled13.geojson', JSON.stringify(geo, null, 2))
  })
})
