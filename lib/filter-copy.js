const { autoInject } = require('async');
const { eachfile } = require('find');
const { readFile, writeFile, mkdir } = require('node:fs');
const { dirname, join, relative } = require('node:path');

module.exports = filterAndCopy;

const dirs = Object.create(null);

function ensureDir(file, fn) {
  const dir = dirname(file);

  if (dirs[dir]) {
    return process.nextTick(fn);
  }

  mkdir(dir, { recursive: true }, err => {
    dirs[dir] = !err;
    fn(err);
  });
}

function getFileDest(fileSrc, dirSrc, dirDest) {
  const rpath = relative(dirSrc, fileSrc);
  return join(dirDest, rpath);
}

function processFile(fileSrc, fileDest, filter, fn) {
  autoInject(
    {
      dataSrc: fn => readFile(fileSrc, 'utf8', fn),
      _dirDest: fn => ensureDir(fileDest, fn),
      dataDest: (dataSrc, fn) => filter(dataSrc, fn),
      write: (_dirDest, dataDest, fn) => writeFile(fileDest, dataDest, fn)
    },
    fn
  );
}

function filterAndCopy(dirSrc, dirDest, regex, filter, fn) {
  eachfile(regex, dirSrc, (fileSrc, fn) => {
    const fileDest = getFileDest(fileSrc, dirSrc, dirDest);
    processFile(fileSrc, fileDest, filter, fn);
  }).end(fn);
}
