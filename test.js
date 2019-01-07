var colorgen = require("./main.js");
var colors = colorgen("#0C61A4","#ECF2F8", 6, function(n) {
  var o = 0-Math.pow(n-1,2)+1;
  return o;
});
console.log(colors);
//should output [ '#0c61a4', '#3f96e0', '#91bce4', '#c6daed', '#e3ecf5', '#ecf2f8' ];
