var filterAndCopy = require('../lib/filter-copy');
var tmpdir = require('os').tmpdir();

describe('filter-copy', function () {
  it('filter and copy jade files', function (done) {
    var from = __dirname + '/fixtures';
    var to = tmpdir + '/fixtures';

    function filter(str, fn) {
      var result =  'TEST\n' + str.slice(0, 100) + '\n';
      process.nextTick(function() {
        fn(null, result);
      });
    }

    filterAndCopy(from, to, /\.(pug|jade)$/, filter, done);
  });
});
