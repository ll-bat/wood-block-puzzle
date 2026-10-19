## 1. Exact Difficulty Features

- [x] 1.1 Implement exact first-move risk, delayed failure, blocked-piece, viable-order, and minimum-clearing feature extraction.
- [x] 1.2 Implement the documented casual first-move heuristic and misleading-best-move detection.
- [x] 1.3 Add feature tests covering deterministic results, count invariants, clearing requirements, delayed failures, and unsolvable rejection.

## 2. Versioned Difficulty Model

- [x] 2.1 Implement `casual-v1` integer scoring, reason codes, tier boundaries, and target matching.
- [x] 2.2 Add score/tier fixture tests, repeatability tests, and tests proving solution count is not the scoring input.

## 3. Symmetry and Diversity

- [x] 3.1 Implement all eight board-coordinate and catalog-shape transforms with invariant tests.
- [x] 3.2 Implement canonical puzzle keys across board symmetry and tray permutations.
- [x] 3.3 Implement symmetry-aware Hamming distance plus exact and near-duplicate tracking.
- [x] 3.4 Add rotation, reflection, duplicate-shape, non-equivalent-tray, exact-key, and distance-threshold tests.

## 4. Filtered Generation

- [x] 4.1 Extend validated configuration with difficulty target, near-duplicate threshold, and inclusive board-quality bounds.
- [x] 4.2 Apply solvability, quality, difficulty, exact-duplicate, and near-duplicate filters in deterministic order.
- [x] 4.3 Extend terminal-outcome statistics and exhaustion reporting for every rejection category.
- [x] 4.4 Add forced-category, boundary, reproducibility, exact-duplicate, near-duplicate, and filtered-exhaustion tests.

## 5. Records and Command

- [x] 5.1 Add generated difficulty metadata and strict recomputation validation while preserving legacy format-1 record reads.
- [x] 5.2 Extend collection validation for filter configuration and categorized statistics.
- [x] 5.3 Add and validate CLI difficulty, distance, occupancy, and legal-move options with categorized summaries.
- [x] 5.4 Add record tampering, legacy compatibility, JSON round-trip, CLI help, reproducibility, and invalid-option tests.

## 6. Verification

- [x] 6.1 Export reusable difficulty and deduplication APIs through `src/puzzle/index.js`.
- [x] 6.2 Run all tests, strict OpenSpec validation, existing browser build, generator build, standalone domain bundle, and CLI smoke tests.
