## Context

The archived `puzzle-shapes` and `puzzle-rules` specifications provide immutable shape definitions, precomputed placements, stable-board validation, and deterministic transitions. The solver can therefore operate entirely on BigInt boards and catalog identifiers.

The search horizon is fixed at three placements. A loose upper bound is six shape orders times the placement combinations for those shapes, so exhaustive search is practical and preferable to heuristic search for correctness.

## Goals / Non-Goals

**Goals:**

- Prove solvability or unsolvability without heuristic pruning.
- Produce a deterministic witness that can be replayed against the original tray.
- Treat duplicate shape instances logically while preserving tray indices in witnesses.
- Reuse equivalent subproblems through memoization.
- Classify every logical legal first move and count logical complete sequences.
- Identify every viable logical shape order.

**Non-Goals:**

- Selecting the aesthetically best solution.
- Assigning puzzle difficulty.
- Generating boards or shape trays.
- Searching beyond the current three-shape challenge.
- Persisting or rendering analysis results.

## Decisions

### Represent the tray as indexed immutable instances

Validated input shape identifiers will become immutable `{ shapeId, shapeIndex }` instances, where `shapeIndex` is the original zero-based tray position. Search removes instances without modifying the caller's array.

At each state, the solver visits only the first remaining instance of each distinct shape identifier. This collapses branches that differ only by exchanging identical instances. Because remaining instances retain their original indices and are visited in ascending index order, a witness naturally selects the lowest remaining index for a duplicate.

Alternative considered:

- **Treat every tray slot as distinct:** simpler bookkeeping but inflates solution and first-move counts by factorial factors that carry no gameplay meaning.

### Use exhaustive depth-first search over pure transitions

For each distinct remaining shape, the solver iterates its precomputed placements in deterministic row-major order, filters overlaps, applies the core transition, and recurses. Shape representatives are visited in current tray-index order. Search succeeds only at depth three.

No move-scoring heuristic removes or reorders branches. This preserves exact behavior and a stable canonical witness.

Alternatives considered:

- **Search each of six orders separately for basic solvability:** correct but repeats equivalent suffix work and complicates duplicate handling.
- **Beam or heuristic pruning:** rejected because the solver is the generator's correctness oracle.

### Memoize by board and remaining shape multiset

Existence and counting caches will key states by the hexadecimal board plus sorted remaining shape identifiers. Original duplicate indices are deliberately excluded because they do not affect future legal behavior.

Existence memoization stores booleans, not witness steps. After solvability is known, witness reconstruction traverses winning states using the actual remaining indexed instances. This prevents a cached witness from referring to an instance index absent from an equivalent state.

Counting uses a separate memo because its return value and early-stop threshold differ from boolean existence.

### Separate existence, witness reconstruction, and analysis

The implementation will expose:

- Input validation.
- One-witness solvability search.
- First-move classification.
- Logical solution counting with an optional positive integer limit.
- Full puzzle analysis composing those operations with shared existence memoization.

Witness steps copy the core transition fields and add the original tray index and shape identifier. Returned arrays and records are frozen to match the immutable core boundary.

Alternative considered:

- **Enumerate and store every full solution:** rejected because callers usually need a witness and aggregate statistics, not a potentially large collection of redundant histories.

### Count past a configured limit by one

When a solution limit is supplied, dynamic counting saturates internally at `limit + 1`. Reporting clamps this value back to `limit`; the capped flag is true only when the internal count exceeds the limit. This distinguishes exactly `limit` solutions from more than `limit` solutions.

Without a limit, the solver returns the exact logical count. With three moves the theoretical count remains within JavaScript's safe integer range for the supported board and catalog, and additions will still guard against unsafe overflow.

### Determine viable orders independently and exactly

The solver will generate unique permutations of the three shape identifiers and run a fixed-order existence search for each. Duplicate identifiers naturally reduce the number of permutations. A fixed-order memo keyed by board and order position prevents repeated suffix work.

This small independent calculation keeps order statistics explicit and testable rather than inferring them from capped solution enumeration.

### Extend the shared puzzle boundary without touching UI code

Solver modules will live under `src/puzzle/solver/`, and `src/puzzle/index.js` will re-export both core and solver APIs. Solver code imports only the pure core. Existing `src/puzzle/core/index.js` remains valid for focused consumers.

No existing DOM-backed gameplay module will import the solver in this milestone.

## Risks / Trade-offs

- **Analysis can revisit many states on open boards** → Use separate memoized existence, counting, and fixed-order searches and benchmark representative worst cases.
- **Caching by multiset loses original indices** → Cache only behavioral values and reconstruct witnesses using the live indexed-instance state.
- **Large first-move results retain several BigInt board values** → This is bounded by legal placements for three shapes and is intentional for downstream difficulty analysis.
- **Meaning of solution count could be misunderstood** → Specify logical identity precisely and test duplicate-shape counts against labeled-instance behavior.
- **Capped counting might be mistaken for exact counting** → Return an explicit `solutionCountCapped` flag and prove one solution beyond the limit before setting it.

## Migration Plan

1. Add solver input and state utilities over the existing public core.
2. Implement memoized exact existence search and witness reconstruction.
3. Implement first-move classification, logical counting, and viable-order analysis.
4. Export the solver through the shared puzzle boundary and run Node and browser bundling verification.

The change is additive. Rollback removes the solver directory, root puzzle export, and solver tests without changing the archived core behavior or existing game runtime.
