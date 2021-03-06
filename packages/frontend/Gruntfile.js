'use strict';

const webpack = require('webpack');
const path = require('path');
const { merge } = require('lodash');
const readdirSync = require('fs').readdirSync;
const testConfig = require('../../tasks/test').config;

const nodeExternals = readdirSync(path.join(__dirname, '../../node_modules'))
  .filter(x => !/\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`;
    return externals;
  }, {});

const externals = {
  ...nodeExternals,
  './stats.json': 'commonjs ./stats.json',
  './server.js': 'commonjs ./server.js'
};

module.exports = grunt => {
  require('load-grunt-tasks')(grunt, {
    config: '../../package.json',
    scope: 'devDependencies',
    requireResolution: true
  });

  grunt.loadTasks('../../tasks');

  grunt.initConfig({
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      prod: {
        NODE_ENV: 'production'
      }
    },
    test: testConfig,
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
        tasks: ['webpack:server']
      }
    },
    webpack: {
      client: require('../../webpack/client').configure({
        entryPoint: path.join(__dirname, 'src/client/index')
      }),
      server: require('../../webpack/server').configure({
        entryPoint: path.join(__dirname, 'src/server/index'),
        filename: 'server.js'
      }),
      node: require('../../webpack/server').configure({
        entryPoint: path.join(__dirname, 'src/index'),
        filename: 'index.js',
        externals: {
          ...nodeExternals,
          './stats.json': 'commonjs ./stats.json',
          './server.js': 'commonjs ./server.js'
        }
      })
    }
  });

  grunt.registerTask('build:node', ['clean', 'webpack:node']);
  grunt.registerTask('build', ['clean', 'webpack:client', 'webpack:server', 'webpack:node', 'copy']);
  grunt.registerTask('server', ['clean', 'env:dev', 'webpack:node', 'nodemon']);
  grunt.registerTask('start', ['server']);
};
