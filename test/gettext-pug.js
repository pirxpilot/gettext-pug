const fs = require('fs');
const gettextPug = require('../');

function read(name) {
  return fs.readFileSync(`${__dirname}/fixtures/${name}`, 'utf8');
}

describe('gettext-pug', function () {
  it('should convert jade file', function () {
    const str = read('example.jade');
    const result = gettextPug(str);
    const ref = read('example.js');
    result.should.eql(ref);
  });

  it('should convert jade with attributes', function () {
    const str = read('second_attribute.jade');
    const result = gettextPug(str);
    const ref = read('second_attribute.js');
    result.should.eql(ref);
  });
});
