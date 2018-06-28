var chainStream = require('../')
var test = require('tape')

test('dwStream Array Test', function (t) {
  t.plan(1)
  var dwStreamArray = chainStream({ encoding: 'array' }, function(out) {
    t.deepEqual(out, [1,2,3,4,5,6])
  })
  dwStreamArray.write([1,2,3])
  dwStreamArray.write([4,5,6])
  dwStreamArray.end()
})
