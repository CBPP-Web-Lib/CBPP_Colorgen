const HSLtoRGB = require("hsl-to-rgb-for-reals");
const RGBtoHSL = require("rgb-to-hsl");
const HexToRGB = require("hex-rgb");
const RGBToHex = require("rgb-hex");
const { rgb2lab, lab2rgb } = require("rgb-lab");

/*var HSLtoRGB = RGBtoHSL = function(r, g, b) {
  return [r, g, b];
};*/

module.exports = function(start, end, n, curve, uselab) {
  var rgb;
  if (typeof(curve)!=="function") {
    curve = function(n) {return n;};
  }
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
  var startTargetSpace, endTargetSpace;
  if (uselab) {
    startTargetSpace = rgb2lab(start);
    endTargetSpace = rgb2lab(end);
  } else {
    startTargetSpace = noPercent(RGBtoHSL.apply(null, start));
    endTargetSpace = noPercent(RGBtoHSL.apply(null, end));
    if (startTargetSpace[0] - endTargetSpace[0] < -180) {
      startTargetSpace[0] += 360;
    } else if (startTargetSpace[0] - endTargetSpace[0] > 180) {
      endTargetSpace[0] += 360;
    }
  }
  
  var test = [];
  var r = [];
  for (var i = 0; i<n; i++) {
    p = curve(i/(n-1));
    var c = [];
    for (var j = 0; j<3;j++) {
      c[j] = (endTargetSpace[j]-startTargetSpace[j])*p + startTargetSpace[j];
    }
    if (!uselab) {
      c[0] = (c[0]+360)%360;
      rgb = HSLtoRGB.apply(null, c);
    } else {
      rgb = lab2rgb(c);
    }
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
