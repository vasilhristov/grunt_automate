module.exports = function (grunt) {
    // congiguration
    grunt.initConfig({
        uncss: {
            test: {
                files: [{
                    src: './test/index.html',
                    dest: './test/clean-css/style.css'
                }]
            }
        },

        cssmin: {
            target: {
                files: {
                    './test/minified-css/style.min.css': ['./test/clean-css/style.css']
                }
            }
        },

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
                    './test/tinypng/': './test/img/*.png'
                }
            }
        },

        tinyimg: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './test/img',
                    src: ['**/*.{png,jpg,svg}'],
                    dest: './test/tinyimg'
                }]
            }
        }

    })

    // loads all the plugins
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-tinypng');
    grunt.loadNpmTasks('grunt-tinyimg');

    // register default task
    grunt.registerTask("default", ["uncss" , "cssmin", "tinyimg"])
}