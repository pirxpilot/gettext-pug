const { describe, it } = require('node:test');
const fs = require('node:fs');
const gettextPug = require('../');

function read(name) {
  return fs.readFileSync(`${__dirname}/fixtures/${name}`, 'utf8');
}

describe('gettext-pug', () => {
  it('should convert jade file', t => {
    const str = read('example.jade');
    const result = gettextPug(str);
    const ref = read('example.js');
    t.assert.equal(result, ref);
  });

  it('should convert jade with attributes', t => {
    const str = read('second_attribute.jade');
    const result = gettextPug(str);
    const ref = read('second_attribute.js');
    t.assert.equal(result, ref);
  });

  it('should convert ES6 string templates', t => {
    const str = read('str-template.jade');
    const result = gettextPug(str);
    const ref = read('str-template.js');
    t.assert.equal(result, ref);
  });
});
