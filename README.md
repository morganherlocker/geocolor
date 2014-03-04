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

##Example

![gradient](https://raw2.github.com/morganherlocker/geocolor/master/img/Screen%20Shot%202014-02-06%20at%203.55.30%20PM.jpg)

```js
var geocolor = require('geocolor')

var cities = {
  // [point data](https://github.com/morganherlocker/geocolor/blob/master/test/in/cities.geojson)
}

var z = 'Population',
    classification = 'jenks', // 'quantile' and 'interval' also supported
    numberOfBreaks = 5,
    colors = ['green', 'yellow', 'red']

geo = geocolor(cities, z, classification, numberOfBreaks, colors)

// properties now contains style info with encoded colors
console.log(geo)
```

##Dev

Running tests:

```bash
npm test
```

##More Examples

![gradient](https://raw2.github.com/morganherlocker/geocolor/master/img/Screen%20Shot%202014-02-06%20at%203.13.09%20PM.jpg)

![gradient](https://raw2.github.com/morganherlocker/geocolor/master/img/Screen%20Shot%202014-02-06%20at%209.57.54%20AM.jpg)
