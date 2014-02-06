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
    //console.log(geo)
  })
  xit('should take a set of points and classify based on quantiles, then output geojson with color styles', function(){
    var geo = JSON.parse(fs.readFileSync(__dirname+'/in/points1.geojson'))
    geo.features[0].should.be.ok

    geo = geocolor(geo, 'elevation', 'quantile', 5, 'red')
    geo.should.be.ok
    geo.features.should.be.ok
    geo.features[0].properties['marker-style'].should.be.ok
    //console.log(geo)
  })
})
