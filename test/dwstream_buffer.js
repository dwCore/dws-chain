var chainStream = require('../')
var test = require('tape')
var TA = require('typedarray')
var U8 = typeof Uint8Array !== 'undefined' ? Uint8Array : TA.Uint8Array
var bufferFrom = require('buffer-from')

test('dwStream Buffer Test', function (t) {
  t.plan(2)
  var dwStreamBuffers = chainStream(function(out) {
    t.ok(Buffer.isBuffer(out))
    t.equal(out.toString('utf8'), 'dWeb is the new decentralized web')
  })
  dwStreamBuffers.write(bufferFrom('dWeb is the new ', 'utf8'))
  dwStreamBuffers.write(bufferFrom('decentralized web'))
  dwStreamBuffers.end()
})

test('dwStream Writable Buffers Test', function (t) {
  t.plan(2)
  var dwStreamBuffers = chainStream(function(out) {
    t.ok(Buffer.isBuffer(out))
    t.equal(out.toString('utf8'), 'dWeb is not the centralized web')
  })
  dwStreamBuffers.write(bufferFrom('dWeb'))
  dwStreamBuffers.write(' is not the centralized ')
  var u8 = new U8(3)
  u8[0] = 119; u8[1] = 101; u8[2] = 98
  dwStreamBuffers.write(u8)
  dwStreamBuffers.end()
})
