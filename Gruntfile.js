// tinypng api key
const API_KEY = 'egouIJM8Ley4XEq4g8Wbtr4g9jXxrnbh';

module.exports = function (grunt) {

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

        // 03 
        tinypng: {
            options: {
                apiKey: API_KEY,
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

        // 04 
        tinyimg: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './test/img',
                    src: ['**/*.{png,jpg,svg}'],
                    dest: './test/_outcome/tinyimg'
                }]
            }
        },

        // 05
        cdn: {
            options: {
                cdn: 'http://cdn.cloudfront.net/container/'
            },
            dist: {
                cwd: './test/',
                dest: './test/_outcome/',
                src: ['index.html', 'css/*.css']
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-tinypng');
    grunt.loadNpmTasks('grunt-tinyimg');
    grunt.loadNpmTasks('grunt-cdn');

    grunt.registerTask("default", ["tinyimg", "tinypng", "uncss", "cssmin"]);
}