const mozjpeg = require('imagemin-mozjpeg');

module.exports = function (grunt) {
    // congiguration
    grunt.initConfig({
        // 01
        uncss: {
            test: {
                files: [{
                    src: './test/index.html',
                    dest: './test/_outcome/clean-css/style.css'
                }]
            }
        },

        // 02
        cssmin: {
            target: {
                files: {
                    './test/_outcome/minified-css/style.min.css': ['./test/_outcome/clean-css/style.css']
                }
            }
        },

        // 03 Tinypng
        tinypng: {
            options: {
                apiKey: "egouIJM8Ley4XEq4g8Wbtr4g9jXxrnbh",
                checkSigs: true,
                sigFile: 'dest/file_sigs.json',
                summarize: true,
                showProgress: true,
                stopOnImageError: true
            },
            compress: {
                files: {
                    './test/_outcome/tinypng/': './test/img/*.png'
                }
            },

            compress: {
                expand: true,
                src: ['**/*.{png,jpg,jpeg}'],
                cwd: './test/img/',
                dest: './test/_outcome/tinypng'
            }
        },

        // 04 Tinyimg
        tinyimg: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './test/img',
                    src: ['**/*.{png,jpg,svg}'],
                    dest: './test/_outcome/tinyimg'
                }]
            }
        }
    })

    // loads all the plugins
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-tinypng');
    grunt.loadNpmTasks('grunt-tinyimg');

    // -- start with 'grunt' command (starts all the registered tasks added in the brackets)
    grunt.registerTask("default", ["tinyimg", "tinypng", "uncss", "cssmin"])
}

