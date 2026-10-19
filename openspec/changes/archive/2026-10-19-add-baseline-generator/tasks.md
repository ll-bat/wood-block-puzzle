## 1. Deterministic Randomness and Sampling

- [x] 1.1 Implement unsigned-32-bit seed validation, deterministic pseudo-random values, bounded integer selection, and deterministic array shuffling.
- [x] 1.2 Implement independent three-shape catalog sampling with replacement.
- [x] 1.3 Add reproducibility, range, invalid-seed, deterministic-shuffle, known-shape, and duplicate-preservation tests.

## 2. Gameplay-Derived Board Simulation

- [x] 2.1 Implement tentative three-shape batch simulation using shuffled order, uniformly selected legal placements, pure transitions, and commit-only-on-completion behavior.
- [x] 2.2 Implement configured multi-batch board simulation with bounded per-batch attempts, stable output, and replayable history.
- [x] 2.3 Add tests that replay every transition, prove complete batches and stable final boards, verify deterministic output, and exercise batch-attempt exhaustion without partial commit.

## 3. Baseline Collection Generation

- [x] 3.1 Implement validated generation configuration for positive counts and limits, unsigned seed, and positive simulation batches.
- [x] 3.2 Implement solver-backed candidate acceptance and deterministic puzzle identifiers from seed and candidate index.
- [x] 3.3 Implement bounded collection generation with accepted, attempted, unsolvable, and simulation-failure statistics plus an exhaustion error carrying final statistics.
- [x] 3.4 Add tests for exact requested counts, solver-replayable witnesses, reproducible collections, internally consistent statistics, unsolvable rejection, simulation failure, and candidate exhaustion.

## 4. Puzzle Record Format

- [x] 4.1 Implement exact 16-character hexadecimal conversion and validation for every board and mask value.
- [x] 4.2 Implement versioned standalone puzzle records and collection envelopes with deterministic provenance and no runtime-dependent fields.
- [x] 4.3 Implement record deserialization and full witness replay validation, including versions, tray indices, shapes, anchors, transitions, clearing metadata, and intermediate boards.
- [x] 4.4 Add JSON round-trip, unsupported-version, malformed-hex, tampered-witness, provenance, envelope-consistency, and deterministic-byte-output tests.

## 5. Offline Command and Verification

- [x] 5.1 Add a thin Node CLI with help and validated count, seed, simulation-batch, batch-attempt, candidate-attempt, output, and pretty-print options.
- [x] 5.2 Add a Node-targeted Webpack build configuration plus `build:generator` and `generate-puzzles` npm scripts.
- [x] 5.3 Export reusable generation and record APIs through `src/puzzle/index.js`, run the complete tests and strict OpenSpec validation, verify existing and standalone bundles, and execute CLI help, file-output, reproducibility, and invalid-option smoke tests.
