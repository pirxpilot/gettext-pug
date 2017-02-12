var fs = require('fs');
var gettextPug = require('../');


function read(name) {
  return fs.readFileSync(__dirname + '/fixtures/' + name, 'utf8');
}

describe('gettext-pug', function () {
  it('should convert jade file', function () {
    var str = read('example.jade');
    var result = gettextPug(str);
    var ref = read('example.js');
    result.should.eql(ref);
  });

  it('should convert jade with attributes', function () {
    var str = read('second_attribute.jade');
    var result = gettextPug(str);
    var ref = read('second_attribute.js');
    result.should.eql(ref);
  });
});
