"use strict";

const gulp = require('gulp');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglifyjs = require('gulp-uglifyjs');
const imagemin = require('gulp-imagemin');
const cache    = require('gulp-cache');
const pngquant = require('imagemin-pngquant'); //библиотека для работы с png
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const prettify = require('gulp-html-prettify');
const browserSync  = require('browser-sync');
const flatten  = require('gulp-flatten');
const deploy  = require('gulp-gh-pages');

gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});

gulp.task('html', function() {
	return gulp.src('./src/templates/pages/*.*')
		.pipe(pug())
		.pipe(prettify({indent_size: 4}) )
		.pipe(gulp.dest('./dist'))
		.pipe( browserSync.reload({stream: true}) ) ;

})

gulp.task('style', function() {
	return gulp.src('./src/assets/style/main.styl')
		.pipe(stylus({
            'include css': true
        }))
		.pipe(autoprefixer(
			['last 15 versions'], { cascade: true })
		)
		.pipe( gulp.dest('./dist/assets/css') )
		.pipe( browserSync.reload({stream: true}) ) ;
})

gulp.task('js', function() {
	return gulp.src([
			'./node_modules/jquery/dist/jquery.min.js',
			'./src/assets/libs/owl.carousel/dist/owl.carousel.min.js',
      './src/assets/libs/selectize/dist/js/standalone/selectize.js',
      './src/assets/libs/jquery.maskedinput/src/jquery.maskedinput.js',
			'./src/blocks/**/*.js',
			'./src/assets/js/*.js'
		])
		.pipe( concat('main.js') )
		.pipe( gulp.dest('./dist/assets/js') )
        .pipe( browserSync.reload({stream: true}) )
})

gulp.task('js:prod', function() {
	return gulp.src([
			'./src/assets/libs/owl.carousel/dist/owl.carousel.min.js',
      './src/assets/libs/selectize/dist/js/standalone/selectize.js',
      './src/assets/libs/jquery.maskedinput/src/jquery.maskedinput.js',
			'./src/blocks/**/*.js',
			'./src/assets/js/*.js'
		])
		.pipe( concat('main.js') )
		.pipe( gulp.dest('./dist/assets/js') )
        .pipe( browserSync.reload({stream: true}) )
})

gulp.task('img', function() {
	return gulp.src([
			'./src/blocks/**/*.+(png|jpg|jpeg|gif|svg)',
			'./src/assets/images/**/*.+(png|jpg|jpeg|gif|svg)'
		])
		.pipe(flatten({ includeParents: 0 }))
		.pipe( gulp.dest('./dist/assets/images') );
})

gulp.task('fonts', function() {
	return gulp.src('./src/assets/fonts/**/*')
		.pipe(gulp.dest('./dist/assets/fonts'))
});

gulp.task('connect', function() {
	browserSync({
		server: {
			baseDir: './dist' // Директория для сервера
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('style:min', function(){
	return gulp.src('./dist/assets/css/main.css')
		.pipe(cssnano())
		.pipe(gulp.dest('./dist/assets/css'))
})
gulp.task('js:min', function(){
	return gulp.src('./dist/assets/js/main.js')
		.pipe(uglifyjs())
		.pipe(gulp.dest('./dist/assets/js'))
})

gulp.task('img:min', function() {
	return gulp.src('./dist/assets/images/**/*')
		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('clear', function() {
	return del.sync('./dist'); // Удаляем папку dist перед сборкой
})

gulp.task('reload', function(){
	return browserSync.reload
})
gulp.task('watch', function() {
	gulp.watch(['./src/assets/style/**/*.*', './src/blocks/**/*.styl'], ['style']);
	gulp.watch(['./src/blocks/**/*.pug','./src/templates/**/*.pug'],  ['html'] );
	gulp.watch(['./src/blocks/**/*.js',	'./src/assets/js/*.js'], ['js']);
});
gulp.task('min', ['style:min', 'js:min', 'img:min']);

gulp.task('default', ['style', 'js', 'html', 'fonts', 'img']);
gulp.task('default:prod', ['style', 'js:prod', 'html', 'fonts', 'img']);
gulp.task('dev', ['default', 'connect', 'watch']);

gulp.task('prod', ['default:prod'], function(){
	gulp.start('min')
});
