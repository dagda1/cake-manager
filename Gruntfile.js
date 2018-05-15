const packages = ['packages/api/Gruntfile.js', 'packages/frontend/Gruntfile.js'];

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
        src: packages[1],
        tasks: ['test']
      },
      start: {
        src: packages,
        tasks: ['start']
      }
    }
  });

  grunt.loadNpmTasks('grunt-hub');

  grunt.registerTask('build', ['hub:build']);
  grunt.registerTask('watch', ['hub:watch']);
  grunt.registerTask('test', ['hub:test']);
  grunt.registerTask('start', ['hub:start']);
  grunt.registerTask('default', ['start']);
};
