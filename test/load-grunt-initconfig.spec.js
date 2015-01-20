/* jshint -W030 */
require('./helpers');

var initConfig = require('../lib');

describe('load-grunt-initconfig', function () {
  before(function () {
    this.mockGrunt = {
      initConfig: sinon.spy()
    };
    initConfig(this.mockGrunt); // this will init from wherever the current proc is started
  });
  it('calls the grunt.initConfig method with the expected values', function () {
    expect(this.mockGrunt.initConfig).to.have.been.calledOnce;
    expect(this.mockGrunt.initConfig).to.have.been.calledWith({
      clean: [".tmp"],
      copy: { all: { dest: ".tmp/", expand: true, src: ["lib/**"] } },
      jshint: { all: ["Gruntfile.js", "lib/**/*.js", "test/**/*.js"] },
      mochaTest: { test: { src: ["test/*.spec.js"] } }
    });
  });
});
