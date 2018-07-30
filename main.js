var HSLtoRGB = require("hsl-to-rgb-for-reals");
var RGBtoHSL = require("rgb-to-hsl");
var HexToRGB = require("hex-rgb");
var RGBToHex = require("rgb-hex");

/*var HSLtoRGB = RGBtoHSL = function(r, g, b) {
  return [r, g, b];
};*/

module.exports = function(start, end, n) {
  var rgb;
  var is_hex = false;
  if (typeof(start)==="string") {
    rgb = HexToRGB(start);
    start = [rgb.red, rgb.green, rgb.blue];
    is_hex = true;
  }
  if (typeof(end)==="string") {
    rgb = HexToRGB(end);
    end = [rgb.red, rgb.green, rgb.blue];
    is_hex = true;
  }
  var p;
  var startHSL = noPercent(RGBtoHSL.apply(null, start));
  var endHSL = noPercent(RGBtoHSL.apply(null, end));
  if (startHSL[0] - endHSL[0] < -180) {
    startHSL[0] += 360;
  } else if (startHSL[0] - endHSL[0] > 180) {
    endHSL[0] += 360;
  }
  var test = [];
  var r = [];
  for (var i = 0; i<n; i++) {
    p = i/(n-1);
    var c = [];
    for (var j = 0; j<3;j++) {
      c[j] = (endHSL[j]-startHSL[j])*p + startHSL[j];
    }
    c[0] = (c[0]+360)%360;
    rgb = HSLtoRGB.apply(null, c);
    if (is_hex) {
      r.push("#" + RGBToHex(rgb[0], rgb[1], rgb[2]));
    } else {
      r.push("rgb("+rgb.join(",") + ")");
    }
    test.push(c);
  }
  return r;
};

function noPercent(c) {
  for (var i = 0, ii = c.length; i<ii; i++) {
    if (typeof(c[i])==="string") {
      if (c[i].indexOf("%")!==-1) {
        c[i] = c[i].replace("%","")/100;
      }
    }
  }
  return c;
}
