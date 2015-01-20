# load-grunt-initconfig

[![Build Status](https://travis-ci.org/jpstevens/load-grunt-initconfig.svg?branch=master)](https://travis-ci.org/jpstevens/load-grunt-initconfig)

Separate your long configuration into bite-sized chunks.

## Installation

```
npm install load-grunt-initconfig --save-dev
```

## Usage

`load-grunt-initconfig` will look for config files in the `.initconfig`
directory. Here is an example:
```
$ tree -a
.
├── .initconfig
|   ├── clean.js
|   ├── copy.json
|   ├── jshint.js
|   └── mochaTest.json
└── Gruntfile.js
```

**NOTE** The file name (e.g. `mochaTest.json`) maps to the grunt task `mochaTest`.

Below is an example Gruntfile.js:

```javascript
module.exports = function (grunt) {
  // load tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  // require init config
  require('load-grunt-initconfig')(grunt); // this is the important bit
  // register tasks
  grunt.registerTask('test', ['copy', 'jshint', 'clean', 'mochaTest']);
  grunt.registerTask('default', ['test']);
};
```

In our example, this will require the config files `.initconfig/clean.js`,
`.initconfig/copy.json`, `.initconfig/jshint.js` and `.initconfig/mochaTest.js`,
combine them into a single config object, then call the `grunt.initConfig`
method with that config object.

## Config File Examples

There are two ways to include your config files, as `json` or `javascript`:

**.json**
Example for `jshint.js`:
```json
{
  "options": {
    "jshintrc": ".jshintrc"
  },
  "all": {
    "src": ["src/**/*.js"]
  }
}
```

For `javascript`, you can choose whether or not to inject the `grunt` object into your config:

**javascript (with injection)**
Example for `jshint.js`:
```javascript
// if you DO need injection, return an Function
module.exports = function (grunt) {
  return {
    options: {
      jshintrc: ".jshintrc"
    },
    all: {
      src: ["src/**/*.js"]
    }
  };
};
```

**javascript (without injection)**
Example for `jshint.js`:
```javascript
// if you don't need injection, return an Object
module.exports = {
  options: {
    jshintrc: ".jshintrc"
    },
    all: {
      src: ["src/**/*.js"]
    }
  }
};
```

## More Info

If you are still unsure how the package works, check out the `Gruntfile.js` and
`.initconfig` for this project on
[GitHub](https://github.com/jpstevens/load-grunt-initconfig); it uses
`load-grunt-initconfig` to test itself!
