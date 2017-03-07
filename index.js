//identify turf, which gets installed via npm before running this script
var turf = require('turf');
// use fs (filesystem) module to read and write geojson as a variable
var fs = require('fs');

// load the data as a variable
var roads = fs.readFileSync('./data/mgcp_clip.geojson');
var trafficData = fs.readFileSync('./data/test3.json');
console.log('data loaded');

// parse the geojson into an _object_
var roads = JSON.parse(roads);
var trafficData = JSON.parse(trafficData);
console.log('data parsed');

// combine featurecollection into multipolygon feature
var roads = turf.combine(roads);
var trafficData = turf.combine(trafficData);

// buffer roads
var unit = 'kilometers';
console.log('buffering roads');
var buffered = turf.buffer(roads, 1/10, unit);
console.log('roads buffered');

fs.writeFileSync('./data/buffered-roads.json', JSON.stringify(buffered));
console.log('...');
console.log('saved buffered-roads.json');
var buffered = fs.readFileSync('./data/buffered-roads.json');
var buffered = JSON.parse(buffered);
var buffered = turf.combine(buffered);
fs.writeFileSync('./data/buffered-roads.json', JSON.stringify(buffered));

// find the diff between roads buffer and trafficData
// from turf API: this returns a polygon feature showing the area of p1 excluding the area of p2
console.log('finding the diff');
var differenced = turf.difference(trafficData, buffered);
console.log('success!');

//output the diff
fs.writeFileSync('./diff.geojson', JSON.stringify(difference));

console.log('saved diff.geojson');
