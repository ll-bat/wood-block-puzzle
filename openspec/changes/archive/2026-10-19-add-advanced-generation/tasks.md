## 1. Target Mechanisms and Novelty

- [x] 1.1 Define and validate supported reasoning-mechanism identifiers and exact metric predicates.
- [x] 1.2 Extend diversity tracking with deterministic nearest compatible-puzzle distance.
- [x] 1.3 Add mechanism, empty-tracker, symmetry-distance, and novelty-order tests.

## 2. Multi-Tray Search

- [x] 2.1 Extend configuration with positive tray-search width and unique required mechanisms.
- [x] 2.2 Implement deterministic tray-pool solving, analysis, staged filtering, novelty/score ranking, and one-record selection.
- [x] 2.3 Extend provenance and statistics with selected draw, workload counters, and mechanism rejection.
- [x] 2.4 Add width-one compatibility, multi-draw, selection-order, forced-outcome, exhaustion, and reproducibility tests.

## 3. Targeted Generation Command

- [x] 3.1 Add CLI tray-width and required-mechanism parsing, validation, help, and workload summary.
- [x] 3.2 Document the measured decision to defer worker parallelism and benchmark baseline versus targeted yield.
- [x] 3.3 Add deterministic targeted-file, invalid-mechanism, and workload-statistic smoke tests.

## 4. Outcome Data and Reports

- [x] 4.1 Implement strict immutable anonymous outcome validation with score/tier consistency.
- [x] 4.2 Implement deterministic overall, tier, and score aggregation plus ordering-violation detection.
- [x] 4.3 Add valid, invalid, caller-mutation, aggregation, empty-group, and inversion tests.

## 5. Calibration Profiles

- [x] 5.1 Implement deterministic dataset fingerprinting, boundary search, sample constraints, target loss, and versioned profiles.
- [x] 5.2 Implement strict profile validation and profile-based score classification.
- [x] 5.3 Add sufficient-data, sparse-data, deterministic-fit, tie-break, tamper, and boundary-classification tests.

## 6. Calibration Command and Verification

- [x] 6.1 Add the offline outcome analysis/profile command, Node bundle, and npm scripts.
- [x] 6.2 Export targeted-generation and calibration APIs and document outcome/profile workflows.
- [x] 6.3 Run all tests, strict OpenSpec validation, browser build, both Node command builds, standalone bundle, and CLI smoke tests.
