/* eslint-disable */
"use strict";

// Пакеты, использующиеся при обработке
const { series, parallel, src, dest, watch } = require("gulp");
const atImport = require("postcss-import");
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();
const csso = require("gulp-csso");
const debug = require("gulp-debug");
const del = require("del");
const mqPacker = require("css-mqpacker");
const path = require("path");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const replace = require("postcss-replace");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify-es").default;
const webpack = require("webpack-stream");
const version = require("gulp-version-number");
const flatten = require("gulp-flatten");
const svgSprite = require("gulp-svg-sprite");

// Глобальные настройки этого запуска
const mode = process.env.MODE || "development";

// Список и настройки плагинов postCSS
let postCssPlugins = [
  autoprefixer(),
  mqPacker({
    sort: true,
  }),
  replace({
    commentsOnly: false,
    data: {
      js: "/js/",
      css: "/css/",
      img: "/img/",
      fonts: "/fonts/",
      pages: "/",
      assets: "/assets/",
      get icon() {
        return `${this.img}svgSprite.svg#`;
      },
    },
    pattern: "/{{([^\\s]+?)}}/",
  }),
  atImport(),
];

function generateSvgSprite() {
  return src("resources/symbols/*.svg")
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            dest: ".",
            sprite: "svgSprite.svg",
            inline: true,
            bust: false,
          },
        },
      }),
    )
    .pipe(dest("public/assets/img/"));
}

function compileSass() {
  return src("resources/scss/style.scss", { sourcemaps: true })
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.log(err.message);
          this.emit("end");
        },
      }),
    )
    .pipe(debug({ title: "Compiles:" }))
    .pipe(sass({ includePaths: [__dirname + "/", "node_modules"] }, ""))
    .pipe(postcss(postCssPlugins))
    .pipe(
      csso({
        restructure: false,
        comments: false,
      }),
    )
    .pipe(dest(`public/assets/css/`, { sourcemaps: mode === "development" ? "." : false }))
    .pipe(browserSync.stream());
}

function updateCssVersion() {
  return src(`application/src/Presentation/templates/inc/css.tpl`)
    .pipe(
      version({
        value: "%DT%",
        append: {
          key: "_v",
          cover: 1,
          to: ["css"],
        },
      }),
    )
    .pipe(dest(`application/src/Presentation/templates/inc/`));
}

function compileJs() {
  return src(`resources/js/entry.js`)
    .pipe(plumber())
    .pipe(
      webpack({
        mode: mode,
        entry: {
          bundle: `./resources/js/entry.js`,
          index: "./resources/js/pages/index.js",
        },
        devtool: mode === "development" ? "eval-source-map" : false,
        output: {
          filename: "[name].js",
        },
        resolve: {
          alias: {
            Utils: path.resolve(__dirname, "resources/js/utils/"),
          },
        },
        module: {
          rules: [
            {
              test: /\.(js)$/,
              exclude: /(node_modules)/,
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
              },
            },
          ],
        },
      }),
    )
    .pipe(sourcemaps.init())
    .pipe(
      uglify({
        output: {
          comments: false,
        },
      }),
    )
    .pipe(sourcemaps.write("./"))
    .pipe(dest(`public/assets/js/`));
}

function updateJsVersion() {
  return src(`application/src/Presentation/templates/inc/js.tpl`)
    .pipe(
      version({
        value: "%DT%",
        append: {
          key: "_v",
          cover: 1,
          to: ["js"],
        },
      }),
    )
    .pipe(dest(`application/src/Presentation/templates/inc/`));
}

function copyImages() {
  return src("resources/img/**/*.*", { base: "resources/img/" })
    .pipe(flatten({ includeParents: 0 }))
    .pipe(dest("public/assets/img"));
}
function copyFavicon() {
  return src("resources/favicon/**/*.*", { base: "resources/favicon/" })
    .pipe(flatten({ includeParents: 0 }))
    .pipe(dest("public/assets/favicon"));
}

function copyFonts() {
  return src("resources/fonts/**/*.*").pipe(dest("public/assets/fonts"));
}

// Очищаем папки от файлов, сгенерированных в прошлый раз
function clear() {
  return del([
    `public/assets/js/**/*`,
    `public/assets/css/**/*`,
    `public/assets/img/**/*`,
    `public/assets/json/**/*`,
    `public/assets/fonts/**/*`,
  ]);
}

function reload(done) {
  browserSync.reload();
  done();
}

function serve() {
  browserSync.init({
    proxy: "127.0.0.1:8104",
    port: 3080,
    open: false,
    notify: false,
  });

  // Шаблоны tpl: все события
  watch([`templates/**/*.tpl`], { events: ["all"], delay: 100 }, reload);

  // Стилевые глобальные файлы: все события
  watch(
    [`resources/scss/**/*.scss`],
    { events: ["all"], delay: 100 },
    series(compileSass, updateCssVersion),
  );

  // Скриптовые глобальные файлы: все события
  watch([`resources/js/**/*.js`], { events: ["all"], delay: 100 }, series(compileJs, reload));

  // Спрайт SVG
  watch(
    [`resources/symbols/*.svg`, `resources/symbols/svgAsBg.xml`],
    { events: ["all"], delay: 100 },
    series(generateSvgSprite, reload),
  );

  // Копирование шрифтов
  watch([`resources/fonts/`], { events: ["all"], delay: 100 }, series(copyFonts, reload));
}

// Список задач
exports.generateSvgSprite = generateSvgSprite;
exports.compileSass = compileSass;
exports.updateCssVersion = updateCssVersion;
exports.compileJs = compileJs;
exports.updateJsVersion = updateJsVersion;
exports.copyImages = copyImages;
exports.copyFonts = copyFonts;
exports.clearBuildDir = clear;

// Сборка проекта
exports.build = series(
  clear,
  parallel(copyImages, copyFavicon, copyFonts, generateSvgSprite, compileSass, compileJs),
  parallel(updateJsVersion, updateCssVersion),
);

exports.default = series(
  clear,
  parallel(copyImages, copyFavicon, copyFonts, generateSvgSprite, compileSass, compileJs),
  parallel(updateJsVersion, updateCssVersion),
  serve,
);
