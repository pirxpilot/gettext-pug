const { describe, it } = require('node:test');

const filterAndCopy = require('../lib/filter-copy');
const tmpdir = require('node:os').tmpdir();

describe('filter-copy', () => {
  it('filter and copy jade files', async () => {
    const from = `${__dirname}/fixtures`;
    const to = `${tmpdir}/fixtures`;

    function filter(str) {
      return `TEST\n${str.slice(0, 100)}\n`;
    }

    await filterAndCopy(from, to, /\.(pug|jade)$/, filter);
  });
});
