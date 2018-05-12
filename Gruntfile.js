const packages = [
  'packages/api/Gruntfile.js',
];

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    hub: {
      build: {
        src: packages,
        tasks: ['build'],
        options: { concurrent: 1 }
      },
      watch: {
        src: packages,
        tasks: ['default']
      },
      test: {
        src: packages,
        tasks: ['test:ci']
      },
      start: {
        src: ['packages/api/Gruntfile.js'],
        tasks: ['start']
      }
    }
  });

  grunt.loadNpmTasks('grunt-hub');

  grunt.registerTask('build', ['hub:build']);
  grunt.registerTask('build:ci', ['hub:build', 'hub:start']);
  grunt.registerTask('watch', ['hub:watch']);
  grunt.registerTask('test', ['hub:test']);
  grunt.registerTask('default', ['watch']);
};