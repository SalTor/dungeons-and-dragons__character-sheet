"use strict";

let gulp         = require("gulp"),
    rename       = require("gulp-rename"),
    json_minify  = require("gulp-json-minify"),
    browserSync  = require("browser-sync")

gulp.task("default", [ "copy", "confirmation" ])
gulp.task("release", [ "default" ])
gulp.task("dev",     [ "copy_watch" ])
gulp.task("server",  [ "copy", "browserSync" ])

gulp.task("copy", function () {
    gulp.src("source/js/example_response.json", { base: process.cwd() })
        .pipe(rename("character_sheet__player_name.json"))
        .pipe(json_minify())
        .pipe(gulp.dest("public/data"))
})

gulp.task("copy_watch", [ "copy" ], function () {
    gulp.watch(["source/js/example_response.json"], ["copy"])
})

gulp.task("browserSync", [], function () {
    browserSync.init({
        server: { baseDir: "./public" }
    });
})



let console_spacer = `[        ]`,
    console_linebreak = `=============================================================`

gulp.task("confirmation", [], function () {
    console.log(`${console_spacer}`)
    console.log(`${console_spacer} ${console_linebreak}`)
    console.log(`${console_spacer}`)
    console.log(`${console_spacer} \tSample data is available and the app has been built`)
    console.log(`${console_spacer}`)
    console.log(`${console_spacer} ${console_linebreak}`)
    console.log(`${console_spacer}`)
})
