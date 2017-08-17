const vm = require('vm')

const regex = /`/gm

function escape (template) {
  return `\`${template.replace(regex, '\\`')}\``
}

function compile (template, defaultContext, ops) {
  if (typeof template !== 'string') {
    throw new Error('Template must be a string')
  }
  const options = Object.assign({timeout: 500}, ops)
  const script = new vm.Script(escape(template))
  return (context) => {
    try {
      return script.runInNewContext(Object.assign({}, defaultContext, context), options)
    } catch (err) {
      throw new Error('Failed to compile template', err)
    }
  }
}

module.exports = compile
module.exports.default = compile
