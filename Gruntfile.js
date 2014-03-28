module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            sass: {
                files: ['sass/**/*.{scss,sass}','sass/_partials/**/*.{scss,sass}'],
                tasks: ['sass:dist']
            },
            livereload: {
                files: ['*.html', '*.php', 'js/**/*.{js,json}', 'css/*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
                options: {
                    livereload: true
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'css/styles.css': 'sass/styles.scss'
                },
                options: {
                    sourcemap: 'true'
                }
            }
        }
    });
    grunt.registerTask('default', ['watch']);
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
