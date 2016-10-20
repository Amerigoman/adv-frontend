var destDir = 'copy_static';

var gulp = require('gulp');
var bower = require('gulp-bower');       // слить библиотеки
var gulpif = require('gulp-if');         // если выполняеться условие (1-й аргумент), то выполнить (то, что во 2-м)

var concat = require('gulp-concat');     // слияние файлов в один
var less = require('gulp-less');         // компилятор для LESS

var argv = require('yargs').argv;        // получить аргументы переданные в командной строке
var debug = require( 'gulp-debug' );
var clean = require( 'gulp-clean' );     // очистить, например, заданную папку
var livereload = require('gulp-livereload'); // плагин для живой перезагрузки
var csscomb = require('gulp-csscomb');
var jscs = require('gulp-jscs');         // JSCS — поправить стили в исходных файлах
var runSequence = require('run-sequence'); // выполнить таски в заданой очередности

var cssnano = require('gulp-cssnano');    // минифицировать CSS-файлы
var uglify = require('gulp-uglify');      // минифицировать JS-файлы
var jshint  = require('gulp-jshint');     // JSHint — вывести ошибки.
var htmlhint = require("gulp-htmlhint");  // htmlhint — поправить стили в исходных файлах
var htmlmin = require('gulp-htmlmin');    // минифицировать html-файлы
var browserSync = require('browser-sync');// почти полный аналог livereload
var autoprefixer = require('gulp-autoprefixer'); // добавляет вендорные префиксы к css-стилям
var sourcemaps = require('gulp-sourcemaps'); // для того чтобы после минификации ваши файлы 
                                             // оставались читаемы через отладку браузером


gulp.task('default', ['libs', 'build']);

gulp.task('bower', function () {
    return bower('libs');
});

gulp.task('build', ['copy-static', 'css']);

gulp.task('libs', function() {
    return gulp.src('libs/**/*.min.js')
        .pipe( gulp.dest('client_src/libs') );
});

gulp.task('copy-static', function () {
    return gulp.src(['client_src/**/*.{png,jpg,svg}', 'client_src/*.html'])
        .pipe( gulp.dest(destDir) );
});

gulp.task('css', function() {
    return gulp.src('client_src/css/**/*.*')
        .pipe( concat('style.css') )
        .pipe( less() )
        .pipe( gulpif(argv.prod, cssnano()) )
        .pipe( gulp.dest('copy_static/css') );
});

gulp.task('clean', function() {
    return gulp.src('copy_static/*', {read: false})
        .pipe( clean( { force: true } ) );
});

gulp.task( 'watch', function () {
    livereload.listen( { start: true } );

    gulp.watch('client_src/**/*.{png,jpg,svg,html,js}', ['copy-static'] );
    gulp.watch('client_src/css/**/*.*', ['css'] );
} );

gulp.task('js', function() {
    return gulp.src('client_src/js/**/*.js')
        .pipe( sourcemaps.init() )
        .pipe( concat('main.js') )
        .pipe( gulpif(argv.prod, uglify()) )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest(destDir + '/js') );
});

gulp.task('style', function() {
  runSequence(['jscs', 'jshint', 'htmlhint']);
});

gulp.task('jscs', function() {
    return gulp.src('client_src/js/**/*.js')
        .pipe( jscs( {fix: true}) )
        .pipe( gulp.dest('client_src/js') );
});

gulp.task('jshint', function () {
    return gulp.src('client_src/js/**/*.js')
        .pipe( jshint() )
        .pipe( jshint.reporter('default') );
});

gulp.task('htmlhint', function () {
    return gulp.src('client_src/**/*.{html,hml}')
        .pipe( htmlhint() )
        .pipe( htmlhint.reporter() )
        .pipe( htmlhint.failReporter( { suppress: true } ) );
});
 
gulp.task('html', function() {
  return gulp.src('client_src/**/*.{html,hml}')
    .pipe( gulpif(argv.prod, htmlmin( {collapseWhitespace: true, removeComments: true} ) ) )
    .pipe( gulp.dest(destDir) );
});

gulp.task( 'reload-page', function () {
    browserSync.init({
        server: 'client_src'
    });

    browserSync.watch('client_src/**/*.*').on('change', browserSync.reload);
} );

gulp.task( 'reload-page', function () {
    browserSync.init({
        server: 'client_src'
    });

    browserSync.watch('client_src/**/*.*').on('change', browserSync.reload);
} );

gulp.task('prefix', function() {
    gulp.src('client_src/css/*.*')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false }))
        .pipe(gulp.dest(destDir + '/css'))
});


/****************************************************/
/****************** FROM_LECTION ********************/
/****************************************************/






//CODESTYLE
gulp.task('csscomb', function () {
    return gulp.src('styles/*.less')
        .pipe(csscomb().on('error', handleError))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

//CODESTYLE//

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
    return this;
}

