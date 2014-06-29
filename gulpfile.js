var gulp = require('gulp');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var header = require('gulp-header');
var streamify = require('gulp-streamify');
var qunit = require('gulp-qunit');
var pkg = require('./package.json');

var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
].join('\n');

var filePath = {
    src: './src/*.js',
    dest: './openui5/googlemaps'
};

gulp.task('clean', function() {
    return gulp.src(filePath.dest, {
        read: false
    }).pipe(clean());
});

//TODO - all scripts tasks with one stream
gulp.task('scripts-dbg', function() {
    gulp.src(filePath.src)
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(rename({
            suffix: '-dbg'
        }))
        .pipe(gulp.dest(filePath.dest));
});

gulp.task('scripts-min', function() {
    gulp.src(filePath.src)
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(filePath.dest))
        .pipe(concat('library-all.js'))
        .pipe(gulp.dest(filePath.dest));
});

// JSHint task
gulp.task('lint', function() {
    gulp.src('./src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
    gulp.watch('./src/*.js', ['lint']);
});

gulp.task('test', function() {
    return gulp.src('./test/*.qunit.html')
        .pipe(qunit());
});

gulp.task('develop ', ['build', 'watch']);
gulp.task('build', ['scripts-dbg', 'scripts-min']);
gulp.task('cleanbuild', ['clean']);