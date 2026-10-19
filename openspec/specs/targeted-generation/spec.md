# targeted-generation Specification

## Purpose
Define multi-tray search, reasoning-mechanism targeting, novelty ranking, and deterministic workload accounting.
## Requirements
### Requirement: Deterministic multi-tray search
For each successfully simulated board, targeted generation SHALL independently sample the configured positive `traySearchWidth` number of three-shape trays from the same seeded random stream, unless an earlier unrecoverable error occurs. It SHALL exact-solve every sampled tray, analyze every solvable tray, and deterministically select at most one accepted puzzle for that board. Width one SHALL retain single-tray proposal behavior.

#### Scenario: Search a tray pool
- **WHEN** tray search width is greater than one
- **THEN** one board candidate evaluates that many seeded tray draws and accepts no more than one

#### Scenario: Repeat targeted search
- **WHEN** two runs use identical configuration, versions, and seed
- **THEN** sampled trays, selection, records, provenance, and workload statistics are identical

### Requirement: Reasoning-mechanism targeting
Targeted generation SHALL accept zero or more distinct mechanism identifiers from `clear-required`, `initially-blocked`, `order-restricted`, `delayed-failure`, and `misleading-best-move`. An eligible puzzle SHALL satisfy every requested mechanism according to its exact difficulty metrics. Unsupported or duplicate identifiers SHALL be rejected during configuration validation.

#### Scenario: Require clearing and a blocked shape
- **WHEN** both `clear-required` and `initially-blocked` are configured
- **THEN** every accepted puzzle has positive minimum cleared lines and at least one initially blocked tray instance

#### Scenario: Reject a mechanism mismatch
- **WHEN** solvable, quality-eligible, tier-eligible trays exist but none satisfies every requested mechanism
- **THEN** the board attempt is counted as a mechanism rejection

### Requirement: Novelty-aware deterministic selection
Among tray-pool candidates that pass solvability, quality, tier, mechanism, and configured duplicate-distance filters, targeted generation SHALL prefer greater minimum symmetry-aware distance from accepted puzzles, then closeness to the documented target-tier score preference, then lower tray-draw index. An empty diversity tracker SHALL assign equal maximum novelty to all candidates.

#### Scenario: Prefer a more novel eligible puzzle
- **WHEN** two eligible tray draws differ in nearest compatible-puzzle distance
- **THEN** the draw with greater distance is selected

#### Scenario: Break an equal-rank tie
- **WHEN** novelty and target-score distance are equal
- **THEN** the earlier seeded tray draw is selected

### Requirement: Advanced provenance and workload statistics
Every record selected from a tray pool SHALL identify its configured search width and selected zero-based tray draw. Collection statistics SHALL include tray evaluations, solvable tray evaluations, and mechanism rejections. Each board candidate SHALL still contribute to exactly one terminal accepted or rejection category, while workload counters SHALL be reported separately.

#### Scenario: Inspect a guided record
- **WHEN** a record is selected from a multi-tray search
- **THEN** its provenance identifies the width and selected draw that produced it

#### Scenario: Reconcile advanced statistics
- **WHEN** targeted generation finishes or exhausts
- **THEN** terminal outcomes sum to board candidate attempts and solvable tray evaluations do not exceed tray evaluations

### Requirement: Measured parallelization decision
The implementation SHALL document the measured reason for enabling or deferring parallel generation. When parallelism is deferred, generation behavior SHALL remain bounded and expose sufficient workload statistics for a later decision.

#### Scenario: Run without worker infrastructure
- **WHEN** current measured throughput does not justify parallel overhead
- **THEN** targeted generation remains synchronous and deterministic while reporting tray workload

