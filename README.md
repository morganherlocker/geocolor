geocolor
========

geocolor classifies data contained in geojson properties, and assigns color values based on the [simplestyle-spec](https://github.com/mapbox/simplestyle-spec/blob/master/1.1.0/README.md). This means that when your geojson is rendered in github, gists, mapbox, or other simplestyle-spec compliant renderers, you will get nice styles that help to visualize your data.

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

![gradient](https://raw2.github.com/morganherlocker/geocolor/master/img/Screen%20Shot%202014-02-06%20at%203.13.09%20PM.jpg)

```js
var geocolor = require('geocolor')

var g = {
  // [point data](https://gist.github.com/morganherlocker/b05c4afcf721adcb3df2)
}

var z = 'elevation',
    classification = 'jenks', // 'quantile' and 'interval' also supported
    numberOfBreaks = 5,
    colors = ['green', 'yellow', 'red']

geo = geocolor(g, z, classification, numberOfBreaks, colors)

// properties now contains style info with encoded colors
console.log(geo) 
```

##Dev

Running tests:

```bash
npm test
```
