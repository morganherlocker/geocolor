geocolor
========

*style geojson based on data classifications*


This module uses [turf](https://github.com/morganherlocker/turf) to classify data contained in geojson properties, and assign color values based on the [simplestyle-spec](https://github.com/mapbox/simplestyle-spec/blob/master/1.1.0/README.md). This means that when your geojson is rendered in github, gists, mapbox, or other simplestyle-spec compliant renderers, you will get nice styles that help to visualize what's what in your data.

##Example

![gradient](https://raw2.github.com/morganherlocker/geocolor/master/img/Screen%20Shot%202014-02-06%20at%209.57.54%20AM.jpg)

```js
var geocolor = require('geocolor')

var geo = {
  // [point data](https://gist.github.com/morganherlocker/b05c4afcf721adcb3df2)
}

geo = geocolor(g, 'elevation', 'jenks', 5, 'red')

// properties now contains style info with encoded colors
console.log(geo) 
```

##Dev

Running tests:

```bash
npm test
```
