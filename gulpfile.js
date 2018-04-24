// Require Gulp first!
var gulp = require('gulp'),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    browserSync = require('browser-sync'),
    eslint = require('gulp-eslint');
// This is a very basic Gulp task,
// with a name and some code to run
// when this task is called:

gulp.task('lint', function() {

    return gulp
        .src(['js/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});



gulp.task("scripts", gulp.series('lint', function() {
    return gulp
        .src("./js/*.js")
        .pipe(uglify())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(gulp.dest("./build/js"));
}));

gulp.task("browser-sync", function(done) {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })

    gulp
        .watch(['build/js/*.js', 'style.css'])
        .on('change', browserSync.reload);
    done();
})
gulp.task("watch", function(done) {
    gulp.watch("js/*.js", gulp.series("scripts"));

    done();
});

gulp.task('default', gulp.parallel('browser-sync', 'watch'));



// console.log('Hello Daniellino');