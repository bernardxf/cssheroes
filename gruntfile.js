module.exports = function(grunt) {
    "use strict";

    // autoload modules from package.json
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    var platform = grunt.option('platform') || 'padrao';
    var type = grunt.option('type') || 'build';
    var config = grunt.file.readJSON('development/diff/'+platform+'/config.json');

    // tasks configurations
    grunt.initConfig({
        
        // setting all the references of the project
        refs : {
          local:{
            dev:{
              path: "development/",
              images: "development/images/"
            },
            test:{
              path: "test/"
            },
            build:{
              path: "build/"
            },
            deploy:{
              path: "projetos/www/"
            }
          },
          resources : {
            raiz: 'resources/',
            images: 'resources/images/'
          }
        },

        // Limpando Pastas
        clean: {
          images: {
            src: ["<%= refs.local.dev.images %>"]
          },
          test: {
            src: ["<%= refs.local.test.path %>"]
          },
          build: {
            src: ["<%= refs.local.build.path %>"]
          },
          test_final: {
            src: ["<%= refs.local.test.path %>assets/styles/**/*.styl",
                  "<%= refs.local.test.path %>includes.html",
                  "<%= refs.local.test.path %>**/*.jade"]
          },
          build_final: {
            src: ["<%= refs.local.build.path %>assets/styles/**/*.styl",
                  "<%= refs.local.build.path %>includes.html",
                  "<%= refs.local.build.path %>assets/scripts/smartphone/",
                  "<%= refs.local.build.path %>**/*.jade"]
          },
          deploy: {
            src: ["<%= refs.local.deploy.path %>"]
          }
        },

        // Criação das Imagens Minificadas para inicialização do Desenvolvimento
        imagemin: {
          options: {
            optimizationLevel: 7,
            progressive: true
          },
          dev: {
            files: [{
              expand: true,
              cwd: '<%= refs.resources.images %>',
              src: ['**/*'],
              dest: '<%= refs.local.dev.path %>images/'
            }]
          }
        },

        //copiando arquivos
        copy: {
          img: {
            files: [{
              expand: true,
              cwd: '<%= refs.resources.images %>',
              src: ['*.gif', 'avatar/*.gif'],
              dest: '<%= refs.local.dev.path %>images/'
            }]
          },
          test: {
            files: [{
              expand: true,
              cwd: '<%= refs.local.dev.path %>fonts/',
              src: config.fonts,
              dest: '<%= refs.local.test.path %>assets/fonts/'
            },{
              expand: true,
              cwd: '<%= refs.local.dev.path %>images/',
              src: config.images,
              dest: '<%= refs.local.test.path %>assets/images/'
            },{
              expand: true,
              cwd: '<%= refs.local.dev.path %>sounds/',
              src: config.sounds,
              dest: '<%= refs.local.test.path %>assets/sounds/'
            }]
          },

          test_scripts: {
            files: [{
              expand: true,
              cwd: '<%= refs.local.dev.path %>scripts/',
              src: config.scripts,
              dest: '<%= refs.local.test.path %>assets/scripts/'
            }]
          },

          test_stylus: {
            files: [{
              expand: true,
              cwd: '<%= refs.local.dev.path %>stylus/',
              src: config.stylus,
              dest: '<%= refs.local.test.path %>assets/styles/'
            }]
          },

          test_jade: {
            files: [{
              expand: true,
              cwd: '<%= refs.local.dev.path %>jade/',
              src: config.jade,
              dest: '<%= refs.local.test.path %>'
            }]
          },

          build: {
            files: [{
              expand: true,
              cwd: '<%= refs.local.dev.path %>fonts/',
              src: config.fonts,
              dest: '<%= refs.local.build.path %>assets/fonts/'
            },{
              expand: true,
              cwd: '<%= refs.local.dev.path %>images/',
              src: config.images,
              dest: '<%= refs.local.build.path %>assets/images/'
            },{
              expand: true,
              cwd: '<%= refs.local.dev.path %>sounds/',
              src: config.sounds,
              dest: '<%= refs.local.build.path %>assets/sounds/'
            },{
              expand: true,
              cwd: '<%= refs.local.dev.path %>scripts/',
              src: config.scripts,
              dest: '<%= refs.local.build.path %>assets/scripts/'
            },{
              expand: true,
              cwd: '<%= refs.local.dev.path %>stylus/',
              src: config.stylus,
              dest: '<%= refs.local.build.path %>assets/styles/'
            },{
              expand: true,
              cwd: '<%= refs.local.dev.path %>jade/',
              src: config.jade,
              dest: '<%= refs.local.build.path %>'
            }]
          },

          deploy: {
            files: [{
              expand: true,
              cwd: '<%= refs.local.' + type + '.path %>',
              src: ['**'],
              dest: '<%= refs.local.deploy.path %>'
            }]
          },


          build_diff: {
            files: [{
              expand: true,
              cwd: '<%= refs.local.dev.path %>diff/' + platform + '/images/',
              src: ['**'],
              dest: '<%= refs.local.build.path %>assets/images/'
            },{
              expand: true,
              cwd: '<%= refs.local.dev.path %>diff/' + platform + 'sounds/',
              src: ['**'],
              dest: '<%= refs.local.build.path %>assets/sounds/'
            },{
              expand: true,
              cwd: '<%= refs.local.dev.path %>diff/' + platform + '/scripts/',
              src: ['**'],
              dest: '<%= refs.local.build.path %>assets/scripts/'
            },{
              expand: true,
              cwd: '<%= refs.local.dev.path %>diff/' + platform + '/stylus/',
              src: ['**'],
              dest: '<%= refs.local.build.path %>assets/styles/'
            },{
              expand: true,
              cwd: '<%= refs.local.dev.path %>diff/' + platform + '/jade/',
              src: ['**'],
              dest: '<%= refs.local.build.path %>'
            },{
              expand: true,
              cwd: '<%= refs.local.dev.path %>diff/' + platform + '/',
              src: ['manifest.webapp'],
              dest: '<%= refs.local.build.path %>'
            }]
          },

          test_diff: {
            files: [{
              expand: true,
              cwd: '<%= refs.local.dev.path %>diff/' + platform + '/images/',
              src: ['**'],
              dest: '<%= refs.local.test.path %>assets/images/'
            },{
              expand: true,
              cwd: '<%= refs.local.dev.path %>diff/' + platform + 'sounds/',
              src: ['**'],
              dest: '<%= refs.local.test.path %>sounds/'
            },{
              expand: true,
              cwd: '<%= refs.local.dev.path %>diff/' + platform + '/',
              src: ['manifest.webapp'],
              dest: '<%= refs.local.test.path %>'
            }]
          },

          diff_scripts: {
            files: [{
              expand: true,
              cwd: '<%= refs.local.dev.path %>diff/' + platform + '/scripts/',
              src: ['**'],
              dest: '<%= refs.local.test.path %>assets/scripts/'
            }]
          },

          diff_stylus: {
            files: [{
              expand: true,
              cwd: '<%= refs.local.dev.path %>diff/' + platform + '/stylus/',
              src: ['**'],
              dest: '<%= refs.local.test.path %>assets/styles/'
            }]
          },

          diff_jade: {
            files: [{
              expand: true,
              cwd: '<%= refs.local.dev.path %>diff/' + platform + '/jade/',
              src: ['**'],
              dest: '<%= refs.local.test.path %>'
            }]
          }
        },

        // Stylus CSS
        stylus: {
          test: {
            options: {
                compress: false,
                paths: ['stylus']
            },
            files: {
                '<%= refs.local.test.path %>assets/styles/main.css': ['<%= refs.local.test.path %>assets/styles/main.styl']
            }
          },
          build: {
            options: {
                paths: ['stylus']
            },
            files: {
                '<%= refs.local.build.path %>assets/styles/main.css': ['<%= refs.local.build.path %>assets/styles/main.styl']
            }
          }
        },

        /**
        * Compila jade para html
        */
        jade: {
          test: {
            options: {
              pretty: true,
              data: {
                versao: (new Date()).getTime()
              }
            },
            files: [{
              expand: true,
              cwd: '<%= refs.local.test.path %>',
              src: ['**/*.jade'],
              dest: '<%= refs.local.test.path %>',
              ext: '.html'
            }]
          },
          build: {
            options: {
              pretty: true,
              data: {
                versao: (new Date()).getTime()
              }
            },
            files: [{
              expand: true,
              cwd: '<%= refs.local.build.path %>',
              src: ['**/*.jade'],
              dest: '<%= refs.local.build.path %>',
              ext: '.html'
            }]
          }
        },

        usemin: {
            html: ['<%= refs.local.build.path %>/**/*.html'],
            options: {
                dirs: ['<%= refs.local.build.path %>']
            }
        },

        htmlcompressor: {
          compile: {
            files: [{
              expand: true,
              cwd: '<%= refs.local.build.path %>',
              src: ['**/*.html'],
              dest: '<%= refs.local.build.path %>',
            }],
            options: {
              preserveServerScript: true
            }
          }
        },

        uglify: {
          test: {
            files: [{
              expand: true,
              src: ['<%= refs.local.test.path %>assets/scripts/smartphone/*.js'],
              dest: '<%= refs.local.test.path %>assets/scripts/core.js'
            }]
          },
          build: {
            files: [{
              src: ['<%= refs.local.build.path %>assets/scripts/smartphone/*.js'],
              dest: '<%= refs.local.build.path %>assets/scripts/core.js'
            }]
          }
        },

        watch: {
            copy_stylus: {
                files: '<%= refs.local.dev.path %>**/*.styl',
                tasks: ['copy:test_stylus', 'copy:diff_stylus', 'stylus:test','clean:test_final']
            },
            copy_scripts: {
                files: '<%= refs.local.dev.path %>**/*.js',
                tasks: ['copy:test_scripts', 'copy:diff_scripts']
            },
            copy_jade: {
                files: '<%= refs.local.dev.path %>**/*.jade',
                tasks: ['copy:test_jade','copy:diff_jade','jade:test','clean:test_final']
            }
        },

        shell: {
            cordova: {
                options: {
                  stdout: true
                },
                command: 'cd projetos && cordova build ' + platform + ' && cd ..'
            }
        },

        rsync: {
            options: {
                recursive: true
            },
            dist: {
                options: {
                    src: "build/",
                    dest: "jogo/",
                    host: "truco@trucoon.com.br",
                    syncDestIgnoreExcl: false /* NAO ALTERAR */
                }
            },
        },

    });

    

    // task registration
    // Inicialização do imagemin para desenvolvimento
    grunt.registerTask('minificarImagem', [
      'clean:images', 
      'imagemin',
      'copy:img'
    ]);

    // Teste
    grunt.registerTask('test', [
      'clean:test',
      'copy:test', 
      'copy:test_scripts', 
      'copy:test_stylus', 
      'copy:test_jade', 
      'copy:test_diff',
      'copy:diff_scripts', 
      'copy:diff_stylus', 
      'copy:diff_jade', 
      'stylus:test',
      'jade:test',
      'clean:test_final',
      'watch']
    );

    grunt.registerTask('build', 'Compilando app', function() {
      grunt.task.run([
        'clean:build',
        'copy:build', 
        'copy:build_diff',
        'stylus:build',
        'uglify:build',
        'jade:build',
        'clean:build_final',
        'usemin',
        'htmlcompressor'
      ]);

      if(platform == 'android' || platform == 'ios' || platform == 'wp8')
        grunt.task.run(['deploy']);
      else if(platform == 'web')
        grunt.task.run(['rsync']);
    });

    grunt.registerTask('deploy', [
      'clean:deploy',
      'copy:deploy',
      'shell:cordova']
    );
};