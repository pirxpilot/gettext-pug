const { readFile, writeFile, mkdir, readdir } = require('node:fs/promises');
const { dirname, join, relative } = require('node:path');

module.exports = filterAndCopy;

const dirs = new Map();

async function ensureDir(file) {
  const dir = dirname(file);

  let promise = dirs.get(dir);
  if (!promise) {
    promise = mkdir(dir, { recursive: true });
    dirs.set(dir, promise);
  }
  await promise;
}

function getFileDest(fileSrc, dirSrc, dirDest) {
  const rpath = relative(dirSrc, fileSrc);
  return join(dirDest, rpath);
}

async function processFile(fileSrc, fileDest, filter) {
  const [dataSrc] = await Promise.all([readFile(fileSrc, 'utf8'), ensureDir(fileDest)]);
  const dataDest = filter(dataSrc);
  await writeFile(fileDest, dataDest);
}

async function filterAndCopy(dirSrc, dirDest, regex, filter) {
  const files = await readdir(dirSrc, {
    recursive: true
  });
  const tasks = files
    .filter(file => regex.test(file))
    .map(file => {
      const fileSrc = join(dirSrc, file);
      const fileDest = getFileDest(fileSrc, dirSrc, dirDest);
      return processFile(fileSrc, fileDest, filter);
    });
  return Promise.all(tasks);
}
