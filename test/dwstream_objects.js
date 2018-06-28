var chainStream = require('../')
var test = require('tape')

test('dwStream Chain Test: Writing Objects', function (t) {
  var dwStream = chainStream({encoding: "objects"}, chainStreamed)
  function chainStreamed(objs) {
    t.equal(objs.length, 2)
    t.deepEqual(objs[0], {"the": "dweb"})
    t.deepEqual(objs[1], {"is": "better"})
  }
  dwStream.write({"the": "dweb"})
  dwStream.write({"is": "better"})
  dwStream.end()
  t.end()
})


test('dwStream Chain Test: Switch To Objects Encoding If No Encoding Specified And Objects Are Written', function (t) {
  var dwStream = chainStream(chainStreamed)
  function chainStreamed(objs) {
    t.equal(objs.length, 2)
    t.deepEqual(objs[0], {"the": "dweb"})
    t.deepEqual(objs[1], {"changes": "everything"})
  }
  dwStream.write({"the": "dweb"})
  dwStream.write({"changes": "everything"})
  dwStream.end()
  t.end()
})
