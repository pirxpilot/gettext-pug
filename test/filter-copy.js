const filterAndCopy = require('../lib/filter-copy');
const tmpdir = require('os').tmpdir();

describe('filter-copy', function () {
  it('filter and copy jade files', function (done) {
    const from = `${__dirname}/fixtures`;
    const to = `${tmpdir}/fixtures`;

    function filter(str, fn) {
      const result =  `TEST\n${str.slice(0, 100)}\n`;
      process.nextTick(function() {
        fn(null, result);
      });
    }

    filterAndCopy(from, to, /\.(pug|jade)$/, filter, done);
  });
});
