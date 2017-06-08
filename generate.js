#!/usr/bin/env node
const fs = require('fs')
function useMethods() {
  const acc = ['export class A {', '  constructor() { this._private0(0) }']
  for (let i = 0; i < 1000; i++) {
    acc.push('  _private' + i + '(counter) {')
    if (i === 1000) acc.push('    return counter + ' + i)
    else acc.push('    return counter + ' + i + ' + this._private' + (i + 1) + '(counter)')
    acc.push('  }')
  }
  acc.push('}')
  return acc.join("\n")
}

function useFuncs(){
  const acc = ['let A', ';(function() {', 'A = class _ {', '  constructor() { _private0(0) }', '}']
  for (let i = 0; i < 1000; i++) {
    acc.push('function _private' + i + '(counter) {')
    if (i === 1000) acc.push('  return counter + ' + i)
    else acc.push('  return counter + ' + i + ' + _private' + (i + 1) + '(counter)')
    acc.push('}')
  }
  acc.push('})()', 'export default A')
  return acc.join("\n")
}
fs.writeFileSync('class.es6', useMethods())
fs.writeFileSync('funcs.es6', useFuncs())
