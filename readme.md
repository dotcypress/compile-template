[![NPM Version](https://img.shields.io/npm/v/compile-template.svg?style=flat-square)](https://www.npmjs.com/package/compile-template)
[![node](https://img.shields.io/node/v/compile-template.svg?style=flat-square)](https://www.npmjs.com/package/compile-template)
[![Build Status](https://img.shields.io/travis/dotcypress/compile-template.svg?branch=master&style=flat-square)](https://travis-ci.org/dotcypress/compile-template)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

# compile-template
> 📠 Micro templates for Node.js

> `js template literals` + `node vm` = `profit`

**Captain obvious alert**: 🚨 The node vm module is not a security mechanism. Do not use untrusted code in templates.

### Installation

Install from NPM:

```js
$ npm install compile-template --save
```

**Note**: `compile-template` requires Node `4.0.0` or later

### Example

```js
const compile = require('compile-template')

const template = compile('foo=${41+value}')
const string = template({value: 1})
assert(string === 'foo=42')

const template = compile('foo=${41+value}', {value: 1})
assert(template() === 'foo=42')
```
