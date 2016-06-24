module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Download external resources
        curl: {
            geticons: {
                src: 'http://game-icons.net/archives/svg/zip/000000/transparent/game-icons.net.svg.zip',
                dest: 'tmp/game-icons.net.svg.zip'
            }
        },
        // Unzip resources
        unzip: {
            unzipicons: {
                src: 'tmp/game-icons.net.svg.zip',
                dest: 'tmp/icons/'
            }
        },
        //Create webfont
        webfont: {
            gamefont: {
                src: 'tmp/icons/**/*.svg',
                dest: 'src/gameiconsfont/fonts',
                destCss: 'src/gameiconsfont/less',
                options: {
                    hashes: false,
                    font: 'game-icons-font',
                    template: 'templates/less/template.less',
                    types: ['ttf', 'svg'],
                    stylesheet: 'less',
                    ie7: true,
                    htmlDemo:false,
                    customOutputs: [{
                            template: 'templates/html/template.html',
                            dest: 'src/gameiconsfont/html/game-icons-font.html'
                        }],
                    //syntax: 'bootstrap',
                    templateOptions: {
                        baseClass: 'gi',
                        classPrefix: 'gi-'
                    }
                }
            }
        },
        //create woff
        ttf2woff: {
            default: {
                src: ['src/gameiconsfont/fonts/*.ttf'],
                dest: 'src/gameiconsfont/fonts/'
            }
        },
        //create woff2
        ttf2woff2: {
            default: {
                src: ['src/gameiconsfont/fonts/*.ttf'],
                dest: 'src/gameiconsfont/fonts/'
            }
        },
        //create eot
        ttf2eot: {
            default: {
                src: ['src/gameiconsfont/fonts/*.ttf'],
                dest: 'src/gameiconsfont/fonts/'
            }
        },
        //create css
        less: {
            development: {
                options: {
                    paths: ['src/gameiconsfont/css'],
                },
                files: {
                    'src/gameiconsfont/css/game-icons-font.css': 'src/gameiconsfont/less/game-icons-font.less'
                }
            },
            production: {
                options: {
                    compress: true,
                    paths: ['src/gameiconsfont/css'],
                },
                files: {
                    'src/gameiconsfont/css/game-icons-font.min.css': 'src/gameiconsfont/less/game-icons-font.less'
                }
            }
        }
    });

    // Load the plugin that provides the “uglify” task.
    grunt.loadNpmTasks('grunt-webfont');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-ttf2woff');
    grunt.loadNpmTasks('grunt-ttf2woff2');
    grunt.loadNpmTasks('grunt-ttf2eot');

    // Default task(s).
    grunt.registerTask('default', ['curl', 'unzip', 'webfont','ttf2woff','ttf2woff2','ttf2eot','less']);
    //Only Compile css
    grunt.registerTask('compilecss', ['webfont','ttf2woff','ttf2woff2','ttf2eot','less']);

};