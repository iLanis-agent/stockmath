// Stock Math engine: the cases an order takes, the weeks a stock lasts, the shelves the cases need, and the cost a unit. Exact integers, half-up on display only. No named constants; every number is the owner's own entry.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _m(v) {
  var w = Math.floor(v / 100), f = String(v % 100).padStart(2, "0");
  return w + "." + f;
}
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _pl(n, one, many) { return n + (n === 1 ? one : many); }
var _UN = "the units must be from 1 to 1000000 with no decimal places";
var _PC = "the units a case must be from 1 to 1000 with no decimal places";
var _WK = "the units a week must be from 1 to 100000 with no decimal places";
var _CW = "the case width must be from 1 to 100 with no decimal places";
var _SW = "the shelf width must be from 1 to 1000 with no decimal places";
var _FT = "the case must fit on the shelf";
var _PR = "the case price must be from 0.01 to 999.99 with up to 2 decimal places";

function casesTruth(units, perCase) {
  var u = _i(units, _UN, 7, 1, 1000000), p = _i(perCase, _PC, 4, 1, 1000);
  var k = Math.floor((u + p - 1) / p), last = u - (k - 1) * p;
  return "The " + _pl(u, " unit", " units") + " at " + _pl(p, " unit", " units") + " a case make " + _pl(k, " case", " cases") + ", the last case holding " + last + ".";
}
function weeksTruth(units, perWeek) {
  var u = _i(units, _UN, 7, 1, 1000000), w = _i(perWeek, _WK, 6, 1, 100000);
  var k = Math.floor(u / w), left = u - k * w;
  return "The " + _pl(u, " unit", " units") + " at " + _pl(w, " unit", " units") + " a week last " + _pl(k, " week", " weeks") + " with " + _pl(left, " unit", " units") + " left.";
}
function spaceTruth(cases, caseWidth, shelfWidth) {
  var c = _i(cases, "the cases must be from 1 to 1000000 with no decimal places", 7, 1, 1000000), cw = _i(caseWidth, _CW, 3, 1, 100), sw = _i(shelfWidth, _SW, 4, 1, 1000);
  if (cw > sw) throw new Error(_FT);
  var per = Math.floor(sw / cw), over = sw - per * cw;
  var k = Math.floor((c + per - 1) / per), last = c - (k - 1) * per;
  return "The " + _pl(c, " case", " cases") + " at " + _pl(cw, " inch", " inches") + " wide sit " + per + " to a " + sw + " inch shelf, " + _pl(over, " inch", " inches") + " left over; " + _pl(k, " shelf", " shelves") + " hold them, the last shelf taking " + last + ".";
}
function costTruth(cases, price, units) {
  var c = _i(cases, "the cases must be from 1 to 1000000 with no decimal places", 7, 1, 1000000), p = _p(price, _PR, 3, 2, 1, 99999), u = _i(units, _UN, 7, 1, 1000000);
  var cc = c * p;
  var pu = Math.floor((2 * cc + u) / (2 * u));
  return "The " + _pl(c, " case", " cases") + " at $" + _m(p) + " a case come to $" + _m(cc) + ", $" + _m(pu) + " a unit.";
    }
