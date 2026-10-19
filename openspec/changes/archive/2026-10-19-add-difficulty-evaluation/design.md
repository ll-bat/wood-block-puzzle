## Context

The baseline generator produces deterministic, reachable, solver-proven challenges, but it knows only whether a candidate is solvable. Difficulty for a three-piece puzzle is primarily about the quality of the player's first decision: how many plausible choices lose, whether order or clearing is constrained, and whether locally attractive moves are traps. The exact solver already supplies first-move classifications and viable orders, while the depth is bounded at three, making additional exhaustive feature extraction inexpensive enough for offline generation.

The initial audience is casual players. No player-outcome dataset exists yet, so tiers must be explicitly preliminary, reproducible, inspectable, and versioned rather than presented as validated psychometric truth.

## Goals / Non-Goals

**Goals:**

- Compute exact, deterministic decision features without relying on solution count alone.
- Provide a documented `casual-v1` integer scoring model and explanations.
- Filter generation by tier and basic board quality while retaining an unrestricted mode.
- Canonicalize exact whole-puzzle symmetries, including transformed fixed-orientation shapes.
- Provide conservative symmetry-aware near-duplicate filtering.
- Persist and revalidate difficulty metadata and deterministic rejection statistics.

**Non-Goals:**

- Claim that preliminary tiers are empirically calibrated.
- Model drag accuracy, visual salience, timing, scoring, or player history.
- Remove every perceptual near-duplicate.
- Add stochastic simulations, machine learning, guided mutation, or parallel generation.
- Change the board bit representation or puzzle rules.

## Decisions

### Extract exact decision features at depth three

Difficulty analysis reuses exact first moves and viable orders, then exhaustively computes the minimum number of cleared lines on any solution. Losing first moves are divided into immediate dead ends and delayed failures based on whether a legal second move remains. Initially blocked tray instances are counted before play.

This captures distinct reasoning mechanisms and keeps each metric independently inspectable. A single solution count is retained only as optional solver analysis, because a low count can result from an obviously forced move and is not inherently difficult.

Alternative considered: use solution count as the primary score. Rejected because it conflates placement geometry with decision ambiguity and contradicts the project requirement.

### Use one explicit casual heuristic to identify traps

Each legal first move receives a simple lexicographic preference represented as an integer: immediate cleared lines dominate, followed by the number of legal second moves left. A heuristic-best move is misleading when it is solver-classified as losing. The model records the number of tied best moves and misleading best moves.

This is intentionally understandable and testable. It is not asserted to reproduce all human choices; later calibration can add or replace heuristic policies under a new model version.

Alternative considered: a weighted blend of compactness, holes, and shape size. Rejected for the first model because those weights would be harder to explain without player data.

### Version an integer score and preserve raw metrics

`casual-v1` uses integer points for low winning-move ratios, restricted order, required clears, blocked pieces, delayed losing moves, and misleading heuristic-best moves. Very small legal choice sets receive a small obviousness reduction. Scores map to fixed easy, medium, and hard boundaries.

Winning ratios are stored in basis points rather than binary floating-point values. Every record stores the model version, score, tier, raw metrics, and reason codes. Deserialization recomputes the analysis and rejects stale or tampered metadata.

Alternative considered: tier directly from hard-coded compound predicates. Rejected because an integer score is easier to inspect, sort, and recalibrate while raw metrics prevent information loss.

### Transform the complete puzzle under all eight square symmetries

Deduplication applies each dihedral transform to all 64 board coordinates and to each shape's local cells. Transformed shape cells are normalized to a top-left origin and resolved back to a catalog identifier. Tray identifiers are sorted because tray order does not affect the challenge. The lexicographically smallest transformed board-and-tray representation is the canonical key.

This preserves fixed orientations correctly: rotating a horizontal line also changes its identifier to the corresponding vertical line. Transforming only the board would incorrectly merge non-equivalent puzzles.

Alternative considered: canonicalize only board occupancy. Rejected because the available tray is part of the puzzle. The existing BigInt board representation remains unchanged; conversion across 64 cells is bounded and clearer than adding transform-specific bit tricks.

### Define near duplicates by symmetry-aware board Hamming distance

Two puzzles are near duplicates only when some whole-puzzle symmetry makes their sorted tray identifiers equal. Their distance is the minimum board-cell Hamming distance across those matching transforms. A configurable threshold rejects a candidate against prior accepted puzzles; exact canonical keys are checked first and reported separately.

The baseline uses an in-memory tray-orbit bucket and pairwise comparison inside that bucket. This is deterministic and adequate for initial collections; indexing methods can be added if measurements show a scale problem.

Alternative considered: compare feature vectors. Rejected because similar metrics do not imply visually or tactically similar puzzles.

### Extend format 1 additively

Every newly generated record includes difficulty metadata, but the rules/catalog and board encoding remain unchanged. The current reader continues to accept legacy format-1 records without difficulty metadata and strictly validates the metadata when present. Collection statistics add categorized rejection fields; consistency uses the sum of every terminal candidate outcome.

This avoids an artificial record-version bump while retaining old generated files. A future incompatible schema change will require a new format version.

## Risks / Trade-offs

- **Preliminary tiers may correlate poorly with real players** → Name and store the model version, retain raw features, and reserve calibration for player outcome data.
- **A greedy heuristic is too narrow** → Treat it as one explicit feature rather than the definition of difficulty.
- **Strict hard filters may exhaust rejection sampling** → Keep limits explicit, return categorized final statistics, and allow `any` difficulty.
- **Near-duplicate checks are quadratic within a tray bucket** → Use conservative thresholds and measure before adding an index.
- **Additive format-1 metadata could be misunderstood as universal** → Make metadata optional on read, mandatory for new generation, and validate its declared model version.

## Migration Plan

1. Add exact difficulty analysis and fixture/property tests.
2. Add symmetry transforms, canonical keys, distance, and equivalence tests.
3. Extend generation configuration, acceptance filters, records, and statistics.
4. Extend CLI options and complete deterministic smoke tests.
5. Archive the specs after all builds and strict validation pass.

Rollback removes the new modules and filter options; core rules and exact solver remain unchanged. Legacy format-1 records remain readable throughout.

## Open Questions

- Tier thresholds and point weights are calibration hypotheses and should be revisited after casual-player outcome collection.
- The useful default near-duplicate distance for large published collections remains a measurement question; exact deduplication is safe as the default.
