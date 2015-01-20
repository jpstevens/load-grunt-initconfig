(function () {

  'use strict';

  module.exports = function (grunt) {
    // load tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    // require init config
    require('./lib')(grunt);
    // register tasks
    grunt.registerTask('test', ['copy', 'jshint', 'clean', 'mochaTest']);
    grunt.registerTask('default', ['test']);
  };

})();
