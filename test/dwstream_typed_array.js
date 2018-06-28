var chainStream = require('../')
var test = require('tape')
var TA = require('typedarray')
var U8 = typeof Uint8Array !== 'undefined' ? Uint8Array : TA.Uint8Array
var bufferFrom = require('buffer-from')

test('dwStream Chain Test: Typed array stream', function (t) {
  t.plan(2)
  var a = new U8(5)
  a[0] = 97; a[1] = 98; a[2] = 99; a[3] = 100; a[4] = 101;
  var b = new U8(3)
  b[0] = 32; b[1] = 102; b[2] = 103;
  var c = new U8(4)
  c[0] = 32; c[1] = 120; c[2] = 121; c[3] = 122;

  var dwStreamArrays = chainStream({ encoding: 'Uint8Array' }, function(out) {
    t.equal(typeof out.subarray, 'function')
    t.deepEqual(bufferFrom(out).toString('utf8'), 'abcde fg xyz')
  })
  dwStreamArrays.write(a)
  dwStreamArrays.write(b)
  dwStreamArrays.end(c)
})

test('dwStream Chain Test: Array from strings, buffers, and arrays', function (t) {
  t.plan(2)
  var dwStreamArrays = chainStream({ encoding: 'Uint8Array' }, function(out) {
    t.equal(typeof out.subarray, 'function')
    t.deepEqual(bufferFrom(out).toString('utf8'), 'abcde fg xyz')
  })
  dwStreamArrays.write('abcde')
  dwStreamArrays.write(bufferFrom(' fg '))
  dwStreamArrays.end([ 120, 121, 122 ])
})
