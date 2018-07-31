const babelify = require("babelify");
const browserify = require("browserify");
const fs = require("fs");
const uglify = require("uglify-js");
browserify("./main.js")
  .transform(babelify, {presets:["env"]})
  .bundle()
  .pipe(fs.createWriteStream("./main_trans.js"))
  .on("finish", ()=> {
    var f = fs.readFileSync("./main_trans.js","utf-8");
    var uglified = uglify.minify(f);
    fs.writeFileSync("./main_dist.js", uglify.minify(f).code);
  });