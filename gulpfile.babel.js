import gulp from 'gulp';
import notify from 'gulp-notify';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import babelify from 'babelify';
import ngAnnotate from 'browserify-ngannotate';
import sync from 'browser-sync';
import rename from 'gulp-rename';
import templateCache from 'gulp-angular-templatecache';
import uglify from 'gulp-uglify';
import merge from 'merge-stream';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import autoprefix from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import svgstore from 'gulp-svgstore';
import gulpPrint from 'gulp-print';
import eslint from 'gulp-eslint';
import sourcemaps from 'gulp-sourcemaps';
import {argv} from 'yargs';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import inject from 'gulp-inject';
import util from 'gulp-util';
import wiredep from 'wiredep';
import del from 'del';
import nodemon from 'gulp-nodemon';

const browserSync = sync.create();

const scss = {
  sassOpts: {
    outputStyle: 'nested',
    precison: 3,
    errLogToConsole: true,
    includePaths: ['./app/src/sass/']
  }
};
const port = process.env.PORT || '7203';

const errorLogger = (error) => {
  log(`*** start of errors ***`);
  log(error);
  log(`*** End of errors ***`);
  this.emit('end');
}

const clean = (path) => {
  log(`Cleaning ${path}`);
  del(path);
}

const log = (msg) => {
  if (typeof msg === 'object') {
    for (let item in msg) {
      if (msg.hasOwnProperty(item)) {
        util.log(util.colors.blue(msg[item]));
      }
    }
  } else {
    util.log(util.colors.blue(msg));
  }
}

//var port = process.env.PORT || config.defaultPort;

// Where our files are located
var jsFiles   = "app/src/js/**/*.js";
var viewFiles = "app/src/js/**/*.html";

var interceptErrors = function(error) {
    var args = Array.prototype.slice.call(arguments);

    // Send error to notification center with gulp-notify
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);

    // Keep gulp from hanging on this task
    this.emit('end');
};

gulp.task('eslint', () => {
    log(`Running eslint`);
    return gulp.src(['./app/src/js/**/*.js','!node_modules/**'])
      .pipe(gulpPrint())
      .pipe(eslint())
      .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
      .pipe(eslint.failAfterError());
});

gulp.task('sass', ['clean-styles'], () => {
  log(`Generating app css`);
  return gulp.src('./app/src/sass/**/*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(gulpPrint())
    .pipe(sass(scss.sassOpts))
    .pipe(autoprefix())
    .pipe(concat('app.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./temp/css/'));
});

gulp.task('vendor-css', () => {
  log('Generating vendor css');
  return gulp.src([
    './node_modules/angular-material/angular-material.css'
  ])
    .pipe(gulpIf(argv.verbose, gulpPrint()))
    .pipe(sass())
    .pipe(autoprefix())
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./temp/css/'));
});

gulp.task('clean-styles', (done) => {
  log(`Cleaning css`);
  const files = './temp/css/app/*.css';
  clean(files);
  done();
});


gulp.task('clean', (done) => {
  log(`Cleaning temp`);
  const files = './temp/';
  clean(files);
  done();
});

gulp.task('sass-watcher', () => {
  gulp.watch(['./app/src/sass/**/*.{scss,sass}'], ['sass']);
});

gulp.task('compress-images', function() {
    return gulp.src('./app/src/assets/images/*')
      .pipe(imagemin({optimizationLevel: 4}))
      .pipe(gulp.dest('./temp/assets/images/'))
});

gulp.task('copyfonts', function() {
    return gulp.src('./app/src/assets/fonts/**/*.{ttf,woff,eof,svg}')
      .pipe(gulp.dest('./temp/assets/fonts/'));
});

gulp.task('copysvg', function() {
    return gulp.src('./app/src/assets/svg/**/*.svg')
      .pipe(svgstore())
      .pipe(gulp.dest('./temp/assets/svg/'));
});

gulp.task('browserify', ['views', 'vendor-css', 'compress-images', 'copyfonts', 'copysvg', 'sass'], function() {
    return browserify('./app/src/js/app.js')
        .transform(babelify, {presets: ["es2015"]})
        .transform(ngAnnotate)
        .bundle()
        .on('error', interceptErrors)
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('main.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./temp/js/'));
});

gulp.task('js', () => {
  return browserify('./app/src/js/app.js')
    .transform(babelify, {presets: ["es2015"]})
    .transform(ngAnnotate)
    .bundle()
    .on('error', interceptErrors)
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('main.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./temp/js/'));
});

gulp.task('html', function() {
    return gulp.src("app/src/index.html")
        .on('error', interceptErrors)
        .pipe(gulp.dest('./temp/'));
});

gulp.task('views', function() {
    return gulp.src(viewFiles)
        .pipe(templateCache({
            standalone: true
        }))
        .on('error', interceptErrors)
        .pipe(rename("app.templates.js"))
        .pipe(gulp.dest('./app/src/js/config/'));
});

// This task is used for building production ready
// minified JS/CSS files into the dist/ folder
gulp.task('build', ['html', 'browserify'], function() {
    var html = gulp.src("build/index.html")
        .pipe(gulp.dest('./build/'));

    var js = gulp.src("build/main.js")
        .pipe(uglify())
        .pipe(gulp.dest('./build/'));

    return merge(html,js);
});

gulp.task('default', ['html', 'browserify'], function() {

    browserSync.init(['./temp/**/**.**'], {
        server: "./temp",
        port: 4000,
        notify: false,
        ui: {
            port: 4001
        }
    });

  gulp.watch(['./app/src/sass/**/*.{scss,sass}'], ['sass']);
  gulp.watch("app/src/index.html", ['html']);
    gulp.watch(viewFiles, ['views']);
    gulp.watch(jsFiles, ['js']);
});

gulp.task('serve-dev', ['html', 'browserify'], function() {
  var isDev = true;
  var options = {
    script: './app/server/app.js',
    delayTime: 1,
    env: {
      'PORT': port,
      'NODE_ENV': isDev ? 'dev' : 'build'
    },
    watch: ['./app/server/']
  };

  return nodemon(options);

});