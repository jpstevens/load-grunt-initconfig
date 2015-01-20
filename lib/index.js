(function () {

  'use strict';

  var fs = require('fs'),
      path = require('path');

  module.exports = function (grunt) {
    var config = fs.readdirSync(path.resolve(process.cwd(), '.initconfig'))
    .filter(function (fileName) {
      return !!fileName.match(/^(.*)\.js(on)?$/);
    })
    .reduce(function (obj, fileName) {
      var taskName = getTaskName(fileName),
          taskConfig = getTaskConfig(fileName, grunt);
      if (taskName && taskConfig) {
        obj[getTaskName(fileName)] = getTaskConfig(fileName, grunt);
      }
      return obj;
    }, {});
    grunt.initConfig(config);
  };

  function getTaskConfig (fileName, grunt) {
    var taskName = getTaskName(fileName);
    var absoluteFilePath = path.resolve(process.cwd(), '.initconfig', taskName);
    try {
      var config = require(absoluteFilePath);
      return (typeof config === 'function') ? config(grunt) : config;
    } catch (err) {
      throw err;
    }
  }

  function getTaskName (fileName) {
    return fileName.replace(/\.js(on)?$/, "");
  }

})();
