/*eslint no-template-curly-in-string: "ignore"*/
require('should')
const test = require('ava')
const compile = require('../')

test('undefined template', (t) => {
  t.throws(() => {
    compile()
  })
})

test('null template', (t) => {
  t.throws(() => {
    compile(null)
  })
})

test('object template', (t) => {
  t.throws(() => {
    compile({})
  })
})

test('empty template', (t) => {
  compile('')().should.be.equal('')
})

test('template', (t) => {
  compile('foo')().should.be.equal('foo')
})

test('smartass template', (t) => {
  compile('`f\`\``///````//````\``/`\/``//``\`/`\``/`()${1}oo`')().should.be.equal('`f\`\``///````//````\``/`\/``//``\`/`\``/`()1oo`')
})

test('interpolation', (t) => {
  compile('foo=${41+1}')().should.be.equal('foo=42')
})

test('interpolation with context', (t) => {
  compile('foo=${41+one}')({one: 1}).should.be.equal('foo=42')
})

test('interpolation with functions', (t) => {
  compile('foo=${dec(43)}')({
    dec: (x) => x - 1
  }).should.be.equal('foo=42')
})

test('interpolation with default context', (t) => {
  const template = compile('foo=${dec(5)}${1+value}', {
    dec: (x) => x - 1
  })
  template({value: 1}).should.be.equal('foo=42')
})
