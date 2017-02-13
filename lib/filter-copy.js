var async = require('async');
var find = require('find');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');

module.exports = filterAndCopy;

var dirs = Object.create(null);

function ensureDir(file, fn) {
  var dirname = path.dirname(file);

  if (dirs[dirname]) {
    return process.setImmediate(fn);
  }

  mkdirp(dirname, function(err) {
    dirs[dirname] = !err;
    fn(err);
  });
}

function getFileDest(fileSrc, dirSrc, dirDest) {
  var relative = path.relative(dirSrc, fileSrc);
  return path.join(dirDest, relative);
}

function processFile(fileSrc, fileDest, filter, fn) {
  async.autoInject({
    dataSrc: function (fn) {
      fs.readFile(fileSrc, 'utf8', fn);
    },
    dirDest: function (fn) {
      ensureDir(fileDest, fn);
    },
    dataDest: function(dataSrc, fn) {
      filter(dataSrc, fn);
    },
    writeFile: function(dirDest, dataDest, fn) {
      fs.writeFile(fileDest, dataDest, fn);
    }
  }, fn);
}

function filterAndCopy(dirSrc, dirDest, regex, filter, fn) {
  find.file(regex, dirSrc, function(files) {
    async.each(files, function(fileSrc, fn) {
      var fileDest = getFileDest(fileSrc, dirSrc, dirDest);
      processFile(fileSrc, fileDest, filter, fn);
    }, fn);
  });
}
