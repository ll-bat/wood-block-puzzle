## 1. Solver Input and State

- [x] 1.1 Implement immutable validation for a stable board and exactly three known shape identifiers, preserving original tray indices and allowing duplicates.
- [x] 1.2 Add tests for valid duplicate trays and rejection of unstable boards, wrong tray lengths, unknown shapes, and mutated caller input.

## 2. Exact Existence and Witness Search

- [x] 2.1 Implement deterministic legal-move enumeration that visits one representative per remaining shape identifier and every legal precomputed placement.
- [x] 2.2 Implement exact memoized existence search keyed by board and remaining shape multiset without heuristic pruning.
- [x] 2.3 Implement canonical witness reconstruction with original tray indices and complete transition metadata.
- [x] 2.4 Add tests for solvable, unsolvable, non-given-order, clearing-dependent, initially blocked, deterministic, and replayable witness scenarios.

## 3. First-Move Classification

- [x] 3.1 Implement classification of every distinct legal first move as winning or losing using shared exact continuation search.
- [x] 3.2 Add tests for winning, immediate losing, delayed losing, aggregate count consistency, and duplicate-shape first-move deduplication.

## 4. Solution and Order Statistics

- [x] 4.1 Implement memoized logical solution counting with duplicate-instance collapse, safe-integer protection, and optional limit-plus-one saturation.
- [x] 4.2 Implement unique shape-order permutation generation and exact fixed-order viability search.
- [x] 4.3 Add tests for exact counts, count capping semantics, duplicate-shape counts, and viable-order reporting.

## 5. Public Analysis API

- [x] 5.1 Implement one composed immutable analysis result containing solvability, witness, first-move classifications and counts, solution count status, and viable orders.
- [x] 5.2 Export the solver alongside the core through a documented UI-independent `src/puzzle/index.js` boundary.
- [x] 5.3 Run the complete automated suite, strict OpenSpec validation, existing application build, and direct puzzle API browser bundle; resolve regressions and record all tasks complete.
