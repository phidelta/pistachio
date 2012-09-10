/*
** © 2012 by YOUSURE Tarifvergleich GmbH
*/

module.exports = render;
module.exports.text = loadText;
module.exports.file = loadFile;
module.exports.render = render;

var readFile = require('fs').readFile;
var pistachio = require('../lib/pistachio.js');

function render(fn, data, callback) {
  if ('string' === typeof fn) {
    loadFile(fn, function(err, tpl) {
      if (err) return callback(err);
      return render(tpl, data, callback);
    });
    return;
  }
  process.nextTick(function() {
    var err, val;
    try {
      val=fn(data);
    } catch(ex) {
      err=ex;
    }
    callback(err, val);
  });
}

function loadFile(file, callback) {
  readFile(file, 'utf-8', function(err, text) {
    if (err) return callback(err);
    return loadText(text, callback);
  });
}

function loadText(text, callback) {
  process.nextTick(function() {
    var err, val;
    try {
      val = eval(text);
      if ('function' !== typeof val) throw new Error('Invalid Template');
    } catch(ex) {
      err = ex;
    }
    callback(err, val);
  });
}
