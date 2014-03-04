geocolor
========



geocolor classifies data contained in geojson properties, and assigns color values based on the [simplestyle-spec](https://github.com/mapbox/simplestyle-spec/blob/master/1.1.0/README.md). This means that when your geojson is rendered in github, [gists](https://gist.github.com/morganherlocker/b963cc241018326f1d16), mapbox, or other simplestyle-spec compliant renderers, you will get nice styles that help to visualize your data.

##Install

```bash
npm install geocolor
```

##Colors

The color gradient is defined by simply passing an array of colors with as many stops as you want.

##Classification

Curently supported classifications:

- equal intervals
- quantiles
- jenks
- custom

##Example

![gradient](https://raw2.github.com/morganherlocker/geocolor/master/img/Screen%20Shot%202014-02-06%20at%203.55.30%20PM.jpg)

```js
var geocolor = require('geocolor')

var cities = {
  // [point data](https://github.com/morganherlocker/geocolor/blob/master/test/in/cities.geojson)
}

var z = 'Population',
    numberOfBreaks = 5,
    colors = ['green', 'yellow', 'red']

// jenks
geoJenks = geocolor.jenks(cities, z, numberOfBreaks, colors)
console.log(geoJenks)

// quantiles
geoQuantiles = geocolor.quantiles(cities, z, numberOfBreaks, colors)
console.log(geoQuantiles)

// equal intervals
geoEqualIntervals = geocolor.equalIntervals(cities, z, numberOfBreaks, colors)
console.log(geoEqualIntervals)

// custom breaks
geoCustom = geocolor.custom(cities, z, [0,200000,300000,400000,500000,800000,1000000,1000000000], colors)
console.log(geoCustom)
```

##Dev

Running tests:

```bash
npm test
```

##More Examples

![choloropleth](http://morganherlocker.com/img/poverty_styled.jpg)

![gradient](https://raw2.github.com/morganherlocker/geocolor/master/img/Screen%20Shot%202014-02-06%20at%203.13.09%20PM.jpg)

![gradient](https://raw2.github.com/morganherlocker/geocolor/master/img/Screen%20Shot%202014-02-06%20at%209.57.54%20AM.jpg)
