'use strict';
module.exports = function( grunt ) {

    /**
     * Carrega todas as Task
     * Não sendo necessário declarar grunt.registerTask();
    */
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.loadNpmTasks('grunt-copy-to');

    var moment = require('moment');
    moment().format();

    var appConfig = {

        // Metadata
        pkg: grunt.file.readJSON("package.json"),

        // Usando o Compass para compilar arquivos Sass/Scss para CSS
        compass: {
            dist: {
                options: {
                    force: true,
                    httpPath: "/",
                    cssDir: "dist/css",
                    sassDir: "assets/sass",
                    imagesDir: "assets/img/",
                    javascriptsDir: "assets/js",
                    outputStyle: 'expanded',
                    relativeAssets: true,
                    noLineComments: false,
                    boring: false
                }
            }
        },

        // Uglify para concatenar, minificar e fazer mapa de códigos
        uglify: {
            plugins: {
                files: {
                    'dist/js/plugins.min.js': [
                        'assets/js/jquery.js',
                        'assets/js/bootstrap.js',
                        'assets/js/analytics.js'
                    ],
                    'dist/js/main.min.js':[
                       'assets/js/jquery.js',
                       'assets/js/bootstrap.js',
                       'assets/js/analytics.js',
                       'assets/js/geral.js'
                    ]
                }
            }
        },

        // Linting arquivos CSS com csslint
        csslint: {
            dev: {
                csslintrc: '.csslintrc'
            },
            strict: {
                src: ['assets/sass/*.scss']
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
                    cwd: 'assets/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/img/'
                }]
            }
        },

        // Notificações na Tela
        notify: {
            compass: {
                options: {
                    title: "SASS - <%= pkg.title %>",
                    message: "Compilado e minificado com sucesso!"
                }
            },
            uglify: {
                options: {
                    title: "Javascript - <%= pkg.title %>",
                    message: "Compilado e minificado com sucesso!"
                }
            },
            image: {
                options: {
                    title: "<%= pkg.title %>",
                    message: "Imagens otimizadas com sucesso!"
                }
            }
        },

        //Copia arquivos
        copyto: {
            stuff: {
                files: [
                    {cwd: 'assets/', src: ['**/*.css'], dest: '<%= pkg.dist %>/dist/', expand: true}
                ],
                options: {
                    processContent: function(content, path) {
                        return content;
                    }
                }
            },
            html: {
                files: [
                    {cwd: 'assets/', src: ['**/*.html', '**/*.aspx', '**/*.ascx'], dest: '<%= pkg.dist %>/', expand: true}
                ],
                options: {
                    processContent: function(content, path) {
                        return content;
                    }
                }
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

        //Watch
        watch: {

            compass: {
                files: 'assets/sass/**/*.{scss,sass}',
                tasks: 'compass'
            },
            allFiles: {
                files: 'assets/**',
                tasks: ['bumpup', 'copyto']
            }
        },
            
        browserSync: {
            dist: {
                options: {
                    browser: ["firefox"],
                    //proxy: "daily.iveco.bhtec.com.br:80",
                    //startPath: "/",
                    watchTask: true
                },
                bsFiles: {
                    src: [
                        '<%= pkg.dist %>/dist/css/*.css',
                        '<%= pkg.dist %>/**/*.html',
                        '<%= pkg.dist %>/**/*.htm',
                        '<%= pkg.dist %>/**/*.aspx',
                        '<%= pkg.dist %>/**/*.ascx',
                        '<%= pkg.dist %>/dist/js/*.js'
                    ]
                }
            },
            local: {
                bsFiles: {
                    src: [
                        'assets/css/*.css',
                        'assets/**/*.html',
                        'assets/**/*.htm',
                        'assets/**/*.aspx',
                        'assets/**/*.ascx',
                        'assets/dist/js/*.js'
                    ]
                },
                options: {
                    server: {
                        browser: ["firefox"],
                        //baseDir: "./",
                        
                        //proxy: "daily.iveco.bhtec.com.br:80",
                        startPath: "./",
                        //watchTask: true
                    },
                    
                }
            }
        }
    };

    // Iniciando as configurações do Grunt
    grunt.initConfig( appConfig );

    // Tarefa padrão
    grunt.registerTask('default', [ 'compass', 'uglify', 'imagemin' ]);

    //Tarefa homologação
    grunt.registerTask( "watch", [ 'browserSync:dist', 'watch'] );
    grunt.registerTask( "local", [ 'browserSync:local', 'watch:compass'] );
};
