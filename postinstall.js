const babelify = require("babelify");
const browserify = require("browserify");
const fs = require("fs");
browserify("./main.js")
  .transform(babelify, {presets:["env"]})
  .bundle()
  .pipe(fs.createWriteStream("./main_trans.js"));