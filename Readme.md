[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# gettext-pug

Helper for applying [xgettext] to jade/pug files
It transforms Jade/Pug templates into simplified JAvaScript that can be parsed by xgettext.

## Install

```sh
$ npm install --save gettext-pug
```

## Usage

Programmatically:

```js
var gettextPug = require('gettext-pug');
var javascript = gettextPug(jadeOrPugTemplate);
```

Command line - to prep and process a directory of .jade/.pug templates:

```sh
$ gettext-pug [from-directory] [to-directory]
$ xgettext [files-in-to-directory]

```

## License

MIT © [Damian Krzeminski](https://pirxpilot.me)

[xgettext]: https://www.gnu.org/software/gettext/manual/html_node/xgettext-Invocation.html#xgettext-Invocation

[npm-image]: https://img.shields.io/npm/v/gettext-pug
[npm-url]: https://npmjs.org/package/gettext-pug

[build-url]: https://github.com/pirxpilot/gettext-pug/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/pirxpilot/gettext-pug/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/gettext-pug
[deps-url]: https://libraries.io/npm/gettext-pug

