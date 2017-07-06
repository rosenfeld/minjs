#!/usr/bin/env node
const fs = require('fs')
function useMethods() {
  const acc = [';(function() {']
  for (let i = 0; i < 10000; i++) {
    acc.push('  window.console.log(' + i + ')')
  }
  acc.push('})();')
  return acc.join("\n")
}

function useFuncs(){
  const acc = [';(function() {', '  function log(v){ window.console.log(v) }']
  for (let i = 0; i < 10000; i++) {
    acc.push('  log(' + i + ')')
  }
  acc.push('})();')
  return acc.join("\n")
}
fs.writeFileSync('no-helper.js', useMethods())
fs.writeFileSync('with-helper.js', useFuncs())
