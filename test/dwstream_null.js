var chainStream = require('../')
var test = require('tape')

test('dwStream Lacking Callback Test', function (t) {
  var dwStream = chainStream()
  dwStream.write('dwstream')
  dwStream.end(' chain')
  t.end()
})

test('dwStream Chain Test: No Encoding Set, No Data', function (t) {
  var dwStream = chainStream(function(data) {
    t.deepEqual(data, [])
    t.end()
  })
  dwStream.end()
})

test('dwStream Chain Test: Encoding Set To String, No Data', function (t) {
  var dwStream = chainStream({ encoding: 'string' }, function(data) {
    t.deepEqual(data, '')
    t.end()
  })
  dwStream.end()
})
