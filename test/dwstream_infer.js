var chainStream = require('../')
var test = require('tape')
var bufferFrom = require('buffer-from')

test('dwStream Type Interface Works As Expected', function(t) {
  var dwStream = chainStream()
  t.equal(dwStream.inferEncoding(['dweb']), 'array', 'array')
  t.equal(dwStream.inferEncoding(bufferFrom('dweb')), 'buffer', 'buffer')
  t.equal(dwStream.inferEncoding(undefined), 'buffer', 'buffer')
  t.equal(dwStream.inferEncoding(new Uint8Array(1)), 'uint8array', 'uint8array')
  t.equal(dwStream.inferEncoding('dweb'), 'string', 'string')
  t.equal(dwStream.inferEncoding(''), 'string', 'string')
  t.equal(dwStream.inferEncoding({dweb: "rules"}), 'object', 'object')
  t.equal(dwStream.inferEncoding(1), 'buffer', 'buffer')
  t.end()
})
