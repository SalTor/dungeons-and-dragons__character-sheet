const gulp        = require('gulp')
const rename      = require('gulp-rename')
const json_minify = require('gulp-json-minify')
const browserSync = require('browser-sync')

gulp.task('default', [ 'copy_watch' ])
gulp.task('release', [ 'copy' ])
gulp.task('dev',     [ 'copy_watch' ])
gulp.task('server',  [ 'copy', 'browserSync' ])

gulp.task('copy', function () {
    gulp.src('source/js/example_response.json', { base: process.cwd() })
        .pipe(rename('character_sheet__player_name.json'))
        .pipe(json_minify())
        .pipe(gulp.dest('public/data'))
})

gulp.task('copy_watch', [ 'copy' ], function () {
    gulp.watch(['source/js/example_response.json'], ['copy'])
})

gulp.task('browserSync', [], function () {
    browserSync.init({
        server: { baseDir: './public' }
    });
})