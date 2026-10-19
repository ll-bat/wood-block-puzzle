## Context

See `proposal.md` for motivation. The current game represents boards as mutable matrices backed by `Box` objects and performs line clearing through a helper that also coordinates animations. Shape definitions are string patterns consumed by rendering classes. Those dependencies make the existing path unsuitable for exhaustive search, offline generation, or deterministic unit testing.

This change establishes an additive, UI-independent domain boundary. Later changes will build the solver and generator on this boundary and will separately adapt the interactive game to it.

## Goals / Non-Goals

**Goals:**

- Provide one versioned and validated definition of the agreed 25 fixed-orientation shapes.
- Represent 8x8 occupancy compactly and immutably.
- Make legality and simultaneous clearing deterministic and inexpensive.
- Precompute reusable placement information for every catalog shape.
- Run the domain and its tests in Node.js without browser globals while keeping it bundleable for the browser.

**Non-Goals:**

- Searching for three-shape solutions.
- Generating or ranking challenges.
- Replacing the existing live game's state and animation path.
- Persisting puzzle JSON records.
- Adding shapes outside `core-25/v1`.

## Decisions

### Use a BigInt bitboard

The board will be an unsigned 64-bit logical value stored as JavaScript `BigInt`. Bit `row * 8 + column` represents one occupied cell. Public constructors will reject negative values and values with bits above position 63.

This representation makes overlap, union, and clearing direct bit operations and makes boards immutable by value. A matrix conversion utility will exist at the domain boundary for tests and later UI integration.

Alternatives considered:

- **Two 32-bit numbers:** likely faster in some engines but substantially increases masking and carry complexity. It remains a possible internal optimization if benchmarks later justify it.
- **An 8x8 array:** easiest to inspect but allocates and iterates much more during the future solver's search. It will be supported only as an import/export view.
- **A JavaScript Number:** rejected because its 53 bits of integer precision cannot represent all 64 cells exactly.

### Keep coordinate patterns authoritative for shapes

Each catalog entry will declare an identifier and normalized `[row, column]` offsets. Initialization will validate non-emptiness, integer and unique coordinates, normalized origin, board fit, and edge connectivity. Rendering strings and matrices are derived views rather than authoritative definitions.

All four required orientations are explicit entries. Runtime placement enumeration never rotates or reflects a shape.

Alternatives considered:

- **Continue using whitespace-sensitive display strings:** rejected because display parsing concerns would remain coupled to domain validity.
- **Store one family shape and generate rotations at runtime:** rejected because orientation is part of a piece's identity and an accidental rotation would violate game rules.

### Precompute immutable placement records

Catalog initialization will create every valid anchor translation for each shape. A placement record contains the shape identifier, anchor row, anchor column, and its board mask. Records are reused by callers and cannot be changed through the public API.

This shifts coordinate translation work out of the future solver's inner loop. The maximum catalog is small enough that the memory cost is negligible.

### Make clearing one pure transition

The transition operation will first union the placement mask with the board, then derive all completed row and column masks from that same post-placement board, union those masks, and clear the union once. It will return the resulting board plus sorted cleared row and column indices.

This definition prevents sequential-clear behavior from affecting which other lines qualify and directly implements simultaneous clearing.

Illegal placements will not produce a transition. Callers may use a legality predicate for filtering; the transition API will also reject illegal input defensively.

### Add a new domain boundary instead of refactoring the UI now

New modules will live under `src/puzzle/core/` and will not import existing DOM, drawer, event, or store modules. Existing gameplay remains unchanged for this milestone.

Alternatives considered:

- **Immediately replace existing placement and clearing code:** rejected because it combines a foundational behavior change with UI migration and animation regression risk.
- **Reuse existing matrix helpers inside the domain:** rejected because they import browser-dependent constants and global state conventions.

### Use Vitest for domain tests

Vitest will be added as a development dependency and exposed through a non-watch `npm test` command. It can load the project's ES modules without converting the existing package to native Node ESM or adding a separate transpilation configuration.

Alternatives considered:

- **Node's built-in test runner:** attractive for avoiding a dependency, but the current package is CommonJS while source files use bundler-oriented ES module syntax; adopting it cleanly would require a wider module-format migration.
- **Browser-only manual tests:** rejected because the solver foundation requires fast, deterministic regression coverage.

## Risks / Trade-offs

- **BigInt performance differs between JavaScript engines** → Keep the board API representation-independent and benchmark during solver work before considering two-word storage.
- **BigInt cannot be serialized directly as JSON** → Serialization belongs to a later milestone and will use an explicit fixed-width string encoding.
- **The new engine can temporarily diverge from existing gameplay behavior** → Specify rules precisely now and add cross-engine compatibility tests during challenge-mode integration before making it authoritative for the UI.
- **Shape orientation names can be interpreted inconsistently** → Lock every identifier to explicit coordinate scenarios and visual/catalog tests within `core-25/v1`.
- **Adding a test dependency increases installation size** → Limit the dependency to development and use it for all subsequent pure solver and generator tests.

## Migration Plan

1. Add the test runner and pure domain modules without changing existing imports.
2. Validate the complete catalog at module initialization and cover its public behavior with tests.
3. Add board, placement, and transition tests, including simultaneous crossing-line cases.
4. Leave the existing game path active; subsequent OpenSpec changes consume the new domain incrementally.

Rollback is additive: remove the new domain directory, tests, and development dependency. No stored data or existing runtime API is migrated by this change.
