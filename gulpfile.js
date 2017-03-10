'use strict';

let gulp         = require('gulp'),
    rename       = require('gulp-rename'),
    json_minify  = require('gulp-json-minify')

gulp.task('default', [ "copy_watch" ])

gulp.task("copy", function () {
    gulp.src("development/js/example_response.json", { base: process.cwd() })
        .pipe(rename('character_sheet__player_name.json'))
        .pipe(json_minify())
        .pipe(gulp.dest("public/data"))
})

gulp.task("copy_watch", [ "copy" ], function () {
    gulp.watch(['development/js/example_response.json'], ['copy'])
})
