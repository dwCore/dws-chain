var chainStream = require('../')
var test = require('tape')
var TA = require('typedarray')
var U8 = typeof Uint8Array !== 'undefined' ? Uint8Array : TA.Uint8Array
var bufferFrom = require('buffer-from')

test('dwStream Chain Test: String -> Buffer Stream', function (t) {
  t.plan(2)
  var dwStreamStrings = chainStream({ encoding: 'buffer'}, function(out) {
    t.ok(Buffer.isBuffer(out))
    t.equal(out.toString('utf8'), 'dweb rules')
  })
  dwStreamStrings.write("dweb ")
  dwStreamStrings.write("rules")
  dwStreamStrings.end()
})

test('dwStream Chain Test: String Stream', function (t) {
  t.plan(2)
  var dwStreamStrings = chainStream({ encoding: 'string' }, function(out) {
    t.equal(typeof out, 'string')
    t.equal(out, 'dweb rules')
  })
  dwStreamStrings.write("dweb ")
  dwStreamStrings.write("rules")
  dwStreamStrings.end()
})

test('dwStream Chain Test: End Block', function (t) {
  t.plan(1)
  var endStreamBlock = chainStream({ encoding: 'string' }, function(out) {
    t.equal(out, 'dweb is just getting started')
  })
  endStreamBlock.write("dweb ")
  endStreamBlock.write("is just ")
  endStreamBlock.end("getting started")
})

test('dwStream Chain Test: String From Mixed Write Encodings', function (t) {
  t.plan(2)
  var dwStreamStrings = chainStream({ encoding: 'string' }, function(out) {
    t.equal(typeof out, 'string')
    t.equal(out, 'dweb rocks')
  })
  dwStreamStrings.write('dw')
  dwStreamStrings.write(bufferFrom('eb '))
  var u8 = new U8(5)
  u8[0] = 114; u8[1] = 111; u8[2] = 99; u8[3] = 107; u8[4] = 115
  dwStreamStrings.end(u8)
})

test('dwStream Chain Test: String From Buffers With Multibyte Characters', function (t) {
  t.plan(2)
  var dwStreamStrings = chainStream({ encoding: 'string' }, function(out) {
    t.equal(typeof out, 'string')
    t.equal(out, '☃☃☃☃☃☃☃☃')
  })
  var snowman = bufferFrom('☃')
  for (var i = 0; i < 8; i++) {
    dwStreamStrings.write(snowman.slice(0, 1))
    dwStreamStrings.write(snowman.slice(1))
  }
  dwStreamStrings.end()
})

test('dwStream Chain Test: String Infer Encoding With Empty String Bhunk', function (t) {
  t.plan(2)
  var dwStreamStrings = chainStream(function(out) {
    t.equal(typeof out, 'string')
    t.equal(out, 'dweb rocks')
  })
  dwStreamStrings.write("")
  dwStreamStrings.write("dweb ")
  dwStreamStrings.write("rocks")
  dwStreamStrings.end()
})

test('dwStream Chain Test: To String Numbers', function (t) {
  var dwStreamWrite = chainStream(function (str) {
    t.equal(str, 'a1000')
    t.end()
  })

  dwStreamWrite.write('a')
  dwStreamWrite.write(1000)
  dwStreamWrite.end()
})
