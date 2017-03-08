'use strict';

let gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    source       = require('vinyl-source-stream'),
    sourcemaps   = require('gulp-sourcemaps'),
    bourbon      = require('node-bourbon'),
    babel        = require('gulp-babel'),
    browserSync  = require('browser-sync').create(),
    header       = require('gulp-header'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename')

let sass_dir = './development/scss/dungeons_and_dragons_character_sheet.scss',
    current_dir = './',
    build_dir = './public/build',
    date         = new Date(),
    months       = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
    time = date.getMinutes() < 10 ? `${date.getHours()}:0${date.getMinutes()}` : `${date.getHours()}:${date.getMinutes()}`,
    today        = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}@${time}`,
    last_built   = `Last built on - ${today}`,
    equal_signs  = '='.repeat(last_built.length),
    header_banner = `/*!\n\t${equal_signs}\n\t${last_built}\n\t${equal_signs}\n*/\n\n`,
    uglify_options = {
        output: { comments: false },
        compress: {
            booleans: true,
            comparisons: true,
            conditionals: true,
            dead_code: true,
            drop_console: true,
            loops: true,
            unused: true,
            warnings: true
        }
    }

gulp.task('default', ['browser-sync'])
gulp.task('build',   ['css', 'js'])

gulp.task('css', function() {
    let production = gutil.env.production

    return sass(sass_dir, { style: 'compressed', loadPath: require('node-bourbon').includePaths, sourcemap: !production, cacheLocation: './public/build/css/.sass-cache' })
        .on('error', sass.logError)
        .pipe(production ? gutil.noop() : sourcemaps.init({ loadMaps: true }))
        .pipe(autoprefixer({browsers: ['last 4 versions']}))
        .pipe(production ? gutil.noop() : sourcemaps.write())
        .pipe(gulp.dest(`${build_dir}/css`))
        .pipe(production ? gutil.noop() : browserSync.stream())
})

gulp.task('js', function () {
    let production = gutil.env.production

    return gulp.src([`./development/js/dungeons_and_dragons_character_sheet.js`])
        .pipe(production ? gutil.noop() : sourcemaps.init({ loadMaps: true }))
        .pipe(concat(`dungeons_and_dragons_character_sheet.min.js`, { newLine: `;\n\n` }))
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(header(header_banner, { today }))
        .pipe(production ? gutil.noop() : sourcemaps.write('./maps'))
        .pipe(production ? uglify(uglify_options) : gutil.noop())
        .pipe(gulp.dest(`${build_dir}/js`))
        .pipe(production ? gutil.noop() : browserSync.stream())
})

gulp.task("copy", function () {
    gulp.src([ "node_modules/normalize.css/normalize.css" ])
        .pipe(gulp.dest("public/build/css"))

    gulp.src("development/js/example_response.json", { base: process.cwd() })
        .pipe(rename('character_sheet__player_name.json'))
        .pipe(gulp.dest("public/data"))
})

gulp.task('browser-sync', ["copy", "css", "js"], function() {
    browserSync.init({ server: { baseDir: './public' } })

    gulp.watch(['./development/scss/**/*.scss', './development/scss/*.scss'], ['css'])
    gulp.watch(['./development/js/dungeons_and_dragons_character_sheet.js'], ['js'])

    gulp.watch(['public/index.html'])
        .on('change', function () {

            browserSync.reload()
        })
})
