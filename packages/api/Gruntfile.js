'use strict';

const webpack = require('webpack');
const path = require('path');
const { merge } = require('lodash');
const readdirSync = require('fs').readdirSync;

module.exports = grunt => {
  require('load-grunt-tasks')(grunt, {
    config: '../../package.json',
    scope: 'devDependencies',
    requireResolution: true
  });

  grunt.initConfig({
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      prod: {
        NODE_ENV: 'production'
      }
    },
    nodemon: {
      dev: {
        script: './dist/index.js',
        options: {
          cwd: __dirname
        }
      }
    },
    clean: {
      node: './dist'
    },
    copy: {
      prod: {
        expand: true,
        flatten: true,
        src: 'public/views/*',
        dest: 'dist/views/'
      }
    },
    watch: {
      node: {
        files: ['./src/**/*.ts', './src/**/*.tsx', './src/index.ts'],
        options: { spawn: false },
        tasks: ['webpack:node']
      }
    },
    webpack: {
      node: require('../../webpack/server').configure({
        entryPoint: path.join(__dirname, 'src/index'),
        filename: 'index.js'
      })
    },
    concurrent: {
      target: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.registerTask('build:node', ['clean', 'webpack:node']);
  grunt.registerTask('build', ['clean', 'webpack:node', 'copy']);
  grunt.registerTask('server', ['clean', 'env:dev', 'webpack:node', 'nodemon']);
  grunt.registerTask('start', ['concurrent']);
};
