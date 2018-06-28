var toBuffer = require('to-buffer')
var tou8 = require('buffer-to-uint8array');
var bufinit = toBuffer('rocks', 'utf8')
var buf = new Buffer(bufinit);
var a = tou8(buf);
console.log(bufinit)
console.log(a)
