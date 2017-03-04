//identify turf, which gets installed via npm before running this script
var turf = require('turf');

// use fs (filesystem) module to read and write geojson as a variable
var fs = require('fs');

// load the data as a variable
var roads = fs.readFileSync('./data/uganda-roads.geojson');
var trafficData = fs.readFileSync('./data/uganda-traffic.geojson');

// parse the geojson into an _object_
roads = JSON.parse(roads);
trafficData = JSON.parse(trafficData);

// buffer roads
var unit = 'kilometers';
var buffered = turf.buffer(roads, 1/3, unit);
fs.writeFileSync('./data/buffered-roads.json', JSON.stringify(buffered));
console.log('buffered roads');
console.log('...');
console.log('saved buffered-roads.json');

// find the diff between roads buffer and trafficData
// from turf API: this returns a polygon feature showing the area of p1 excluding the area of p2
var diff = turf.difference(trafficData, buffered);

//output the diff
fs.writeFileSync('./diff.geojson', JSON.stringify(diff));

console.log('saved diff.geojson');
