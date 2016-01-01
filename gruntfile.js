module.exports = function(grunt) {

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		jade: {
			compile:{
				options: {
					pretty: true,
				},
				files: [{
					expand: true,
					cwd: 'development/jade/',
					src: ['**/*.jade'],
					dest: 'test/',
					ext: '.html'
				}]
			}
		},

		stylus: {
			compile: {
				options: {
					compress: false,
				},
				files: {
					'test/css/main.css': ['development/stylus/main.styl']
				}
			}
        },

		watch: {
			stylus: {
				files: 'development/stylus/*.styl',
				tasks: ['stylus']
			},
			jade: {
				files: 'development/jade/*.jade',
				tasks: ['jade']
			}
		}
	});

	grunt.registerTask('test', [
      'jade',
      'stylus', 
      'watch']
    );
}