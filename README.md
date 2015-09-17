# Blackwell coding standard for front-end development

This document contains the guidelines and best practices for the front-end web development team.

## Structure

```
    .
    ├── dist
    │   ├── images
    │   ├── scripts
    │   └── styles
    └── src
        ├── inc
        │   ├── meta
        │   ├── scripts-bottom
        │   ├── ...
        │   └── nav
        ├── sass
        │   ├── modules
        │   └── partials
        └── scripts
```

## Project's dependencies

- [browser-sync] (https://www.npmjs.com/package/browser-sync) Keep multiple browsers & devices in sync when building websites.
- [del] (https://www.npmjs.com/package/del) The UNIX command rm -rf for node
- [gulp] (https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) Automate and enhance your workflow
- [gulp-autoprefixer] (https://www.npmjs.com/package/gulp-autoprefixer) Prefix CSS with Autoprefixer, PostCSS plugin to parse CSS and add vendor prefixes using values from Can I Use
- [gulp-cache] (https://github.com/jgable/gulp-cache) A temp file based caching proxy task for gulp.
- [gulp-concat] (https://www.npmjs.com/package/gulp-concat) Concatenates files
- [gulp-file-include] (https://www.npmjs.com/package/gulp-file-include) A plugin of gulp for file include
- [gulp-imagemin] (https://www.npmjs.com/package/gulp-imagemin) Minify PNG, JPEG, GIF and SVG images
- [gulp-jshint] (https://www.npmjs.com/package/gulp-jshint) JSHint plugin for gulp
- [gulp-minify-css] (https://www.npmjs.com/package/gulp-minify-css) Minify css with clean-css.
- [gulp-minify-html] (https://www.npmjs.com/package/gulp-minify-html) Minify html with minimize.
- [gulp-rename] (https://www.npmjs.com/package/gulp-rename) A gulp plugin to rename files easily.
- [gulp-sass] (https://www.npmjs.com/package/gulp-sass) Gulp plugin for sass
- [gulp-uglify] (https://www.npmjs.com/package/gulp-uglify) Minify files with UglifyJS.


## Project Setup

1. Install [Node.js] (https://nodejs.org/download)
2. Run ( from your project folder ) :

    ```
    $ npm install
    ```


## Usage

Run ( from your project folder ) :

    ```
    $ gulp
    ```