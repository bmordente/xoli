'use strict';
module.exports = function( grunt ) {

    /**
     * Carrega todas as Task
     * Não sendo necessário declarar grunt.registerTask();
    */
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    var moment = require('moment');
    moment().format();

    var appConfig = {

        // Metadata
        pkg: grunt.file.readJSON("package.json"),
        bower: grunt.file.readJSON("bower.json"),

        copy: {
          main: {
            files: [
              // JQuery
              {expand: true, cwd: 'bower_components/jquery/', src: ['jquery.js'], dest: '<%= pkg.assets_dir %>/js/'},

              // Modernizr
              {expand: true, cwd: 'bower_components/modernizr/', src: ['modernizr.js'], dest: '<%= pkg.assets_dir %>/js/'},

              // Bootstrap scss
              {expand: true, cwd: 'bower_components/sass-bootstrap/lib/', src: ['_*.scss'], dest: '<%= pkg.assets_dir %>/sass/bootstrap/'},

              // Bootstrap js
              {expand: true, cwd: 'bower_components/sass-bootstrap/dist/js', src: ['bootstrap.js'], dest: '<%= pkg.assets_dir %>/js/'},

              // Respond.js
              {expand: true, cwd: 'bower_components/respondJS/src/', src: ['respond.js'], dest: '<%= pkg.assets_dir %>/js/'},

              // Html5shiv.js
              {expand: true, cwd: 'bower_components/html5shiv/dist/', src: ['html5shiv.js'], dest: '<%= pkg.assets_dir %>/js/'},
            ],
          },
          servidor: {
            files: [
              // Repositório
              {expand: true, src: ['Repositorio/**/*'], dest: '<%= pkg.homologacao_dir %>'}

            ],
          },
        },

        gitclone: {
            main: {
              options: {
                repository: '<%= pkg.git_repo %>',
                branch: "master",
                directory: '.'
              }
            }
          },

        gitpull: {
            your_target: {
                options: {
                    remote: '<%= pkg.git_repo %>',
                    branch: 'master'
                }
            }
        },


        // Usando o Compass para compilar arquivos Sass/Scss para CSS
        compass: {
            dist: {
                options: {
                    force: true,
                    outputStyle: 'compressed',
                    relativeAssets: true,
                    noLineComments: true,
                    httpPath: "<%= pkg.http_path %>",
                    cssDir: '<%= pkg.css_dir %>',
                    sassDir: "<%= pkg.sass_dir %>",
                    imagesDir: "<%= pkg.images_dir %>",
                    javascriptsDir: "<%= pkg.javascripts_dir %>",
                    spriteLoadPath: "<%= pkg.sprite_load_path %>",
                    boring: false,
                    environment: "production",
                    color_output: false,
                }
            }
        },

        // Uglify para concatenar, minificar e fazer mapa de códigos
        uglify: {
            plugins: {
                files: {
                    '<%= pkg.dist_dir %>/js/responsivo.min.js': [
                        '<%= pkg.assets_dir %>/js/html5shiv.js',
                        '<%= pkg.assets_dir %>/js/modernizr.js',
                        '<%= pkg.assets_dir %>/js/respond.js'
                    ],
                    '<%= pkg.dist_dir %>/js/main.min.js':[
                       '<%= pkg.assets_dir %>/js/jquery.js',
                       '<%= pkg.assets_dir %>/js/bootstrap.js',
                       '<%= pkg.assets_dir %>/js/analytics.js',
                       '<%= pkg.assets_dir %>/js/geral.js'
                    ]
                }
            }
        },

        // Otimização de Imagens
        imagemin: {
            dynamic: {
                options: {
                    force: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= pkg.assets_dir %>/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= pkg.dist_dir %>/img/'
                }]
            }
        },

        bumpup: {
            setters: {
                timestamp: function (oldTimestamp, releaseType, options, buildMeta) {
                    return moment.utc().format('D/M/YYYY, H:mm:ss');
                }
            },
            file: 'package.json'
        },


        watch: {
          compass: {
            files: ['<%= pkg.assets_dir %>/sass/**/*.{scss,sass}', '<%= pkg.assets_dir %>/js/*.js'],
            tasks: ['compass', 'uglify']
          }
        },

        browserSync: {
            default_options: {
                bsFiles: {
                    src: ['<%= pkg.dist_dir %>/css/*.css', '*.*', '<%= pkg.dist_dir %>/js/*.js']
                }
            },
            options: {
                watchTask:true,
                browser: ["firefox"],
                server: {
                    baseDir: "./"
                }
            }
        }
    };

    // Iniciando as configurações do Grunt
    grunt.initConfig( appConfig );


    grunt.registerTask('browser', [ 'browserSync', 'compass', 'uglify', 'watch' ]);

    // Tarefa padrão
    grunt.registerTask('default', [ 'compass', 'uglify', 'imagemin']);

    grunt.registerTask( "copiar", [ 'copy:servidor', 'notify' ] );

    grunt.registerTask( "css", [ 'compass', 'notify:compass' ] );


    // Compass + Notify
    // grunt.registerTask('compilarCSS', [ 'compass', 'notify:compass' ]);

    // Concatenar e minificar arquivos de javascript
    // grunt.registerTask('uglifyJS', [ 'uglify', 'notify:uglify' ]);

    // Compass + Csslint
    // grunt.registerTask('lintarCSS', [ 'compass', 'csslint:strict' ]);

    // Registrar task 'i' para otimizar imagens com imagemin
    // grunt.registerTask('otimizar', [ 'imagemin', 'notify:image' ]);

    // Browser sync
    // grunt.loadNpmTasks('grunt-browser-sync');

    // Aliases para as tarefas
    // grunt.registerTask( "b", [ "browserSync" ] );
    // grunt.registerTask( "c", [ "compilarCSS" ] );
    // grunt.registerTask( "l", [ "lintarCSS" ] );
    // grunt.registerTask( "i", [ "otimizar" ] );
    // grunt.registerTask( "u", [ "uglifyJS" ] );
    // grunt.registerTask( "w", [ "watch" ] );
    
};
