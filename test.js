const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { cases: casesTruth, weeks: weeksTruth, space: spaceTruth, cost: costTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the units must be from 1 to 1000000 with no decimal places",
  "the units a case must be from 1 to 1000 with no decimal places",
  "the units a week must be from 1 to 100000 with no decimal places",
  "the case width must be from 1 to 100 with no decimal places",
  "the shelf width must be from 1 to 1000 with no decimal places",
  "the case must fit on the shelf",
  "the cases must be from 1 to 1000000 with no decimal places",
  "the case price must be from 0.01 to 999.99 with up to 2 decimal places"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
