(function () {

  'use strict';

  var fs = require('fs'),
      path = require('path');

  function ConfigInitializer (grunt, opts) {
    this.grunt = grunt;
    this.opts = opts || {};
  }

  ConfigInitializer.prototype.initConfig = function () {
    var config = this.getConfig();
    this.grunt.initConfig(config);
  };

  ConfigInitializer.prototype.getConfig = function () {
    var configPath = this.getConfigPath();
    return fs.readdirSync(configPath)
    .filter(function (fileName) {
      return !!fileName.match(/^(.*)\.js(on)?$/);
    })
    .reduce(function (obj, fileName) {
      var taskName = this.getTaskName(fileName),
          taskConfig = this.getTaskConfig(fileName);
      if (taskName && taskConfig) obj[taskName] = taskConfig;
      return obj;
    }.bind(this), {});
  };

  ConfigInitializer.prototype.getTaskConfig = function (fileName) {
    var taskName = this.getTaskName(fileName);
    var requirePath = path.resolve(this.getConfigPath(), taskName);
    try {
      var config = require(requirePath);
      return (typeof config === 'function') ? config(this.grunt) : config;
    } catch (err) {
      throw err;
    }
  };

  ConfigInitializer.prototype.getTaskName = function (fileName) {
    return fileName.replace(/\.js(on)?$/, "");
  };

  ConfigInitializer.prototype.getConfigPath = function () {
    return path.resolve(process.cwd(), (this.opts.dir || '.initconfig'));
  };

  module.exports = function (grunt, opts) {
    var initializer = new ConfigInitializer(grunt, opts);
    initializer.initConfig();
  };

})();
