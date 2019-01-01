[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][deps-image]][deps-url]
[![Dev Dependency Status][deps-dev-image]][deps-dev-url]

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

[npm-image]: https://img.shields.io/npm/v/gettext-pug.svg
[npm-url]: https://npmjs.org/package/gettext-pug

[travis-url]: https://travis-ci.org/pirxpilot/gettext-pug
[travis-image]: https://img.shields.io/travis/pirxpilot/gettext-pug.svg

[deps-image]: https://img.shields.io/david/pirxpilot/gettext-pug.svg
[deps-url]: https://david-dm.org/pirxpilot/gettext-pug

[deps-dev-image]: https://img.shields.io/david/dev/pirxpilot/gettext-pug.svg
[deps-dev-url]: https://david-dm.org/pirxpilot/gettext-pug?type=dev
