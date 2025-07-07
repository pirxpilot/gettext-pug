const { describe, it } = require('node:test');

const filterAndCopy = require('../lib/filter-copy');
const tmpdir = require('node:os').tmpdir();

describe('filter-copy', () => {
  it('filter and copy jade files', (_, done) => {
    const from = `${__dirname}/fixtures`;
    const to = `${tmpdir}/fixtures`;

    function filter(str, fn) {
      const result = `TEST\n${str.slice(0, 100)}\n`;
      process.nextTick(() => {
        fn(null, result);
      });
    }

    filterAndCopy(from, to, /\.(pug|jade)$/, filter, done);
  });
});
