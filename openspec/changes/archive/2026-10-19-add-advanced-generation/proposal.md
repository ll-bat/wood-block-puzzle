## Why

Pure rejection sampling can produce every preliminary tier, but it wastes solver work when a narrow tier or reasoning mechanism is requested and provides no feedback loop from actual players. The final roadmap milestone should improve targeted yield and diversity while introducing a reproducible outcome format and calibration workflow before any claim that difficulty labels are empirically reliable.

## What Changes

- Add deterministic multi-tray search on each reachable simulated board, ranking eligible candidates by target fit and novelty.
- Add filters for required clearing, initially blocked shapes, restricted order, delayed failures, and misleading heuristic-best moves.
- Extend diversity tracking with nearest symmetry-aware distance for novelty ranking.
- Extend generation provenance and statistics with search-width, evaluated-tray, solvable-tray, and mechanism-rejection data.
- Define validated anonymous player-outcome records and deterministic aggregation reports.
- Derive versioned calibration profiles from sufficient outcome samples and apply their learned tier boundaries without rewriting `casual-v1` feature scores.
- Add an offline calibration command.
- Explicitly defer worker parallelism because measured generation throughput does not yet justify its determinism and packaging cost.

## Capabilities

### New Capabilities

- `targeted-generation`: Multi-tray deterministic search, reasoning-mechanism targets, novelty ranking, and advanced provenance/statistics.
- `difficulty-calibration`: Player-outcome validation, aggregation, calibration reporting, learned threshold profiles, and profile-based tier classification.

### Modified Capabilities

- `puzzle-generation`: Candidate attempts may evaluate a configured tray pool while preserving bounded deterministic terminal outcomes.
- `puzzle-records`: Adds advanced search provenance/statistics and offline targeted-generation options.

## Impact

- Extends generation and diversity modules and adds calibration modules under `src/puzzle/calibration/`.
- Adds a Node-targeted calibration command, Webpack configuration, npm scripts, documentation, and tests.
- Keeps the exact solver as the acceptance oracle and leaves browser Challenge Mode and `casual-v1` raw scoring unchanged.
- Adds no runtime dependency and no background worker infrastructure.
