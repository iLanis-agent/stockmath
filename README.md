# Stock Math

Stockroom case, week, shelf and cost arithmetic. The 850 units at 24 units a case make 36 cases, the last case holding 10.

## Named constants

None. Every number is the owner's own entry.

## What it computes

- **The cases truth** - the units (1 to 1000000) divided by the units a case (1 to 1000), rounded up, with the size of the last case.
- **The weeks truth** - the units on hand divided by the units used a week (1 to 100000), with the units left over.
- **The space truth** - the cases a shelf takes side by side from the case width (1 to 100 inches) and shelf width (1 to 1000 inches), the inches left over, and the shelves the cases need. The case must fit on the shelf.
- **The cost truth** - the cases times the case price ($0.01 to $999.99) to the cent, and spread over the units, half rounded up.

## Boundary

Arithmetic only. Counting applied as written. It has not seen any stockroom, supplier or budget and does not know whether stock will really last, shelves will hold the weight or a price will hold, and it gives no verdict that an order is wise or a stock level is right. Every number is the owner's own entry.

## Files

- `index.html` - landing page with the boundary and starting examples.
- `app.html` - the calculator; every box recomputes on each keystroke.
- `engine.js` - the four truths, shared by the page and the tests.
- `oracle.py` - an independent Python re-implementation; writes `expected.json`.
- `test.js` - runs the engine against `expected.json` (98 cases, 20 error cases).

## Tests

```
python3 oracle.py
node test.js
```
