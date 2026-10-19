## Why

The baseline generator proves solvability but accepts puzzles without estimating their decision difficulty or diversity, so large collections can be trivial, repetitive, or misleadingly labeled. A deterministic, inspectable preliminary model is needed now to gather useful calibration data for casual players without treating raw solution count as difficulty.

## What Changes

- Add exact decision features covering first-move risk, order restriction, required clearing, initially blocked pieces, delayed failures, and a simple casual-player move heuristic.
- Add a versioned preliminary scoring model that explains and assigns `easy`, `medium`, or `hard` tiers.
- Add whole-puzzle dihedral symmetry transforms and canonical identity across the board and fixed-orientation tray.
- Add configurable exact-duplicate, conservative near-duplicate, occupancy, and legal-first-move quality filters.
- Extend deterministic generation configuration, rejection statistics, stored records, validation, and the offline command with difficulty and diversity controls.
- Keep solvability as an independent exact prerequisite and preserve unrestricted generation through the `any` tier.

## Capabilities

### New Capabilities

- `puzzle-difficulty`: Deterministic feature extraction, casual heuristic evaluation, versioned preliminary scoring, tier assignment, and tier matching.
- `puzzle-deduplication`: Rule-preserving whole-puzzle symmetry, canonical identity, symmetry-aware distance, and collection diversity filters.

### Modified Capabilities

- `puzzle-generation`: Adds quality, difficulty, and diversity acceptance filters with categorized rejection statistics.
- `puzzle-records`: Adds validated difficulty metadata and command options for the new filters.

## Impact

- Adds pure analysis modules under `src/puzzle/difficulty/` and symmetry utilities under `src/puzzle/deduplication/`.
- Extends generator configuration, records, statistics, CLI arguments, public exports, and automated tests.
- Uses the current exact solver and `core-25/v1` catalog without changing game rules or solvability semantics.
- Adds no runtime dependency and does not integrate challenges into the browser UI.
