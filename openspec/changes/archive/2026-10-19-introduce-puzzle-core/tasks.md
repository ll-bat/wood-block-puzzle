## 1. Test and Module Foundation

- [x] 1.1 Add Vitest as a development dependency and define a non-watch `npm test` command.
- [x] 1.2 Create the UI-independent `src/puzzle/core/` module boundary and a corresponding test location that runs without browser globals.

## 2. Shape Model and Catalog

- [x] 2.1 Implement normalized coordinate-shape validation for nonempty definitions, integer and unique coordinates, origin normalization, board fit, and edge connectivity.
- [x] 2.2 Add shape-validation tests covering valid edge-connected shapes and invalid duplicate, non-normalized, out-of-bounds, and diagonal-only definitions.
- [x] 2.3 Define the versioned `core-25/v1` catalog with all 25 agreed identifiers and fixed coordinate patterns.
- [x] 2.4 Add catalog tests that verify identifier uniqueness, exact membership and count, expected cell patterns, all T orientations, and successful validation of every catalog entry.

## 3. Board Representation

- [x] 3.1 Implement BigInt bit indexing, empty-board creation, board-range validation, and occupied-cell queries for the 8x8 board.
- [x] 3.2 Implement immutable conversions between bitboards, occupied coordinates, and 8x8 occupancy matrices for diagnostics and later integration.
- [x] 3.3 Add board tests covering all boundary cells, invalid bits and coordinates, round-trip conversions, and source-value immutability.

## 4. Placement Enumeration

- [x] 4.1 Implement immutable placement records and precompute every in-bounds anchor and bit mask for each `core-25/v1` shape without runtime rotation or reflection.
- [x] 4.2 Add placement tests covering the required counts for `SINGLE` and the 2-row by 3-column rectangle, board boundaries, uniqueness, and orientation preservation.

## 5. Puzzle Rules

- [x] 5.1 Implement stable-initial-board validation that rejects any completed row or column.
- [x] 5.2 Implement non-mutating placement-legality checks and defensive rejection of overlapping or invalid placements.
- [x] 5.3 Implement the deterministic placement transition that detects completed rows and columns from one post-placement board and clears their union simultaneously.
- [x] 5.4 Add rule tests for stable and unstable initial boards, legal and overlapping placements, no-clear transitions, single-row and single-column clears, multiple clears, crossing clears, incomplete-line preservation, metadata, determinism, and input immutability.

## 6. Verification

- [x] 6.1 Export a documented public puzzle-core API without imports from DOM, animation, drawer, event, or mutable UI-store modules.
- [x] 6.2 Run the complete automated test suite and production Webpack build, resolving any Node/browser compatibility or regression failures.
