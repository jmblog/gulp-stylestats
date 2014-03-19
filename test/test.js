'use strict';

var fs = require('fs');
var path = require('path');
var assert = require('assert');
var gutil = require('gulp-util');
var stylestats = require('../index');

it('should log css statistics', function (done) {

  var count = 0;
  var cssPath = 'test/fixtures/test.css';
  var file = new gutil.File({
    path: cssPath,
    cwd: 'test/',
    base: path.dirname(cssPath),
    contents: fs.readFileSync(cssPath)
  });
  var stream = stylestats();
  
  stream.on('data', function (newFile) {
    count++;
  });
  
  stream.on('end', function (error) {
    assert.strictEqual(count, 1);
    done();
  });
  
  stream.write(file);
  stream.end();
});

it('should log multiple css statistics', function (done) {

  var count = 0;
  var cssPath1 = 'test/fixtures/test.css';
  var cssPath2 = 'test/fixtures/kite.css';
  var file1 = new gutil.File({
    path: cssPath1,
    cwd: 'test/',
    base: path.dirname(cssPath1),
    contents: fs.readFileSync(cssPath1)
  });
  var file2 = new gutil.File({
    path: cssPath2,
    cwd: 'test/',
    base: path.dirname(cssPath2),
    contents: fs.readFileSync(cssPath2)
  });
  var stream = stylestats();

  stream.on('data', function (newFile) {
    count++;
  });

  stream.on('end', function (error) {
    assert.strictEqual(count, 2);
    done();
  });

  stream.write(file1);
  stream.write(file2);
  stream.end();
});