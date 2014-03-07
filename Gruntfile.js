module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({

    // Metadata
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! \n * <%= pkg.title || pkg.name %> v<%= pkg.version %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
      ' * License: <%= pkg.license %>\n' +
      ' */\n',

    uglify: {
      options: {
        banner: '<%= banner %>',
        report: 'gzip'
      },
      build: {
        src: 'src/vibrator.js',
        dest: 'build/vibrator.min.js'
      }
    },

    jshint: {
      jshintrc: '.jshintrc',
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['src/*.js']
      }
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true,
        coverageReporter: {
          type: 'text',
          dir: 'coverage/'
        }
      },
      watch: {
        configFile: 'test/karma.conf.js',
        singleRun: false,
        reporters: ['progress']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['jshint', 'karma:unit', 'uglify']);
  grunt.registerTask('test', ['karma:watch']);
  grunt.registerTask('build', ['default']);
};