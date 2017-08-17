/*eslint no-template-curly-in-string: "ignore"*/
const test = require('ava')
const compile = require('./')

test('undefined template', (t) => t.throws(compile))

test('null template', (t) => t.throws(() => compile(null)))

test('object template', (t) => t.throws(() => compile({})))

test('empty template', (t) => t.is(compile('')(), ''))

test('template', (t) => t.is(compile('foo')(), 'foo'))

test('smartass template', (t) => {
  t.is(compile('`f\`\``///````//````\``/`\/``//``\`/`\``/`()${1}oo`')(), '`f\`\``///````//````\``/`\/``//``\`/`\``/`()1oo`')
})

test('interpolation', (t) => t.is(compile('foo=${41+1}')(), 'foo=42'))

test('interpolation with context', (t) => t.is(compile('foo=${41+one}')({one: 1}), 'foo=42'))

test('interpolation with functions', (t) => {
  t.is(compile('foo=${dec(43)}')({
    dec: (x) => x - 1
  }), 'foo=42')
})

test('interpolation with default context', (t) => {
  const template = compile('foo=${dec(5)}${1+value}', {
    dec: (x) => x - 1
  })
  t.is(template({value: 1}), 'foo=42')
})

test('interpolation error', (t) => {
  const template = compile('foo=${dec(5)}${1+value}')
  t.throws(template)
})

test('timeout error', (t) => {
  const template = compile('foo=${Array.from(new Array(100500)).reduce((acc) => acc.split("").join("") + ".", "")}', null, {timeout: 100})
  t.throws(() => template())
})
