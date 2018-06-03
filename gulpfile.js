"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");
var jsmin = require("gulp-jsmin");
var run = require("run-sequence");
var del = require("del");

gulp.task("style", function () {
  gulp.src("scss/**/*.scss")
    .pipe(plumber())
          .pipe(sass())
          .pipe(postcss([
            autoprefixer({browsers: [
                "last 2 versions"
              ]}),
            mqpacker({
              sort: true
            })
          ]))
          .pipe(gulp.dest("build/css"))
          .pipe(minify())
          .pipe(rename("style.min.css"))
          .pipe(gulp.dest("build/css"))
          .pipe(server.stream());
});

gulp.task("script", function () {
  return gulp.src("build/js/*.js")
          .pipe(jsmin())
          .pipe(rename({suffix: '.min'}))
          .pipe(gulp.dest("build/js"))
});

gulp.task("images", function () {
  return gulp.src("build/img/*")
          .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
              plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
              ]
            })
          ]));
});

gulp.task("copy", function () {
  return gulp.src("*.html")
          .pipe(gulp.dest("build"));
});

gulp.task("update", ["copy"], function (done) {
  server.reload();
  done();
});

gulp.task("serve", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch("scss/**/*.scss", ["style"]);
  gulp.watch("*.html", ["update"]);
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "fonts/*",
    "img/*",
    "js/**/*",
    "*.html"
  ], {
    base: "."
  })
          .pipe(gulp.dest("build"));
});

gulp.task("build", function (fn) {
  run(
          "clean",
          "copy",
          "style",
          "script",
          "images",
          fn
          );
}); 
