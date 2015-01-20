/* jshint -W030 */
require('./helpers');

var initConfig = require('../lib');

describe('load-grunt-initconfig', function () {
  describe('by default', function () {
    before(function () {
      this.mockGrunt = {
        initConfig: sinon.spy()
      };
      initConfig(this.mockGrunt);
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

  describe('when then `dir` option is specified', function () {
    before(function () {
      this.mockGrunt = {
        initConfig: sinon.spy()
      };
      initConfig(this.mockGrunt, { dir: 'test/samples/custom_dir' });
    });
    it('calls the grunt.initConfig method with the expected values', function () {
      expect(this.mockGrunt.initConfig).to.have.been.calledOnce;
      expect(this.mockGrunt.initConfig).to.have.been.calledWith({
        clean: [".tmp"],
        copy: { all: { dest: ".tmp/", expand: true, src: ["lib/**"] } }
      });
    });
  });
});
