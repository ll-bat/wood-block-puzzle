# puzzle-generation Specification

## Purpose
Define deterministic gameplay-derived board simulation and bounded generation of solvable puzzle collections.
## Requirements
### Requirement: Deterministic seeded generation
The generator SHALL accept an unsigned 32-bit integer seed and SHALL derive every board-simulation, shape-sampling, ordering, placement choice, and filter decision from deterministic inputs. The same supported versions, seed, generation configuration, difficulty model, and prior accepted candidates SHALL produce the same accepted puzzle records and deterministic statistics.

#### Scenario: Repeat collection generation
- **WHEN** two collection runs use the same seed, versions, model, and configuration
- **THEN** their puzzle records, filtering decisions, and candidate acceptance statistics are identical

#### Scenario: Reject an invalid seed
- **WHEN** a seed is not an integer in the inclusive range 0 through 4294967295
- **THEN** generation rejects the configuration before producing candidates

### Requirement: Gameplay-derived stable boards
The generator SHALL derive an initial challenge board from an empty board by simulating a configured positive number of complete three-shape gameplay batches. Every simulated placement SHALL be legal, SHALL use its fixed orientation, and SHALL apply immediate clearing. A batch SHALL affect the derived board only when all three shapes in that batch were placed successfully.

#### Scenario: Replay simulated board history
- **WHEN** the simulation history is replayed from an empty board
- **THEN** every placement is legal, every transition matches the recorded result, and the final replayed board equals the derived board

#### Scenario: Produce a stable derived board
- **WHEN** gameplay simulation completes
- **THEN** the returned board contains no completed row or column

#### Scenario: Exhaust batch attempts
- **WHEN** no complete legal batch is found within the configured per-batch attempt limit
- **THEN** that board simulation fails without returning a partially applied batch

### Requirement: Three-shape tray sampling
Each challenge tray draw SHALL contain exactly three independently sampled identifiers from the active catalog. Sampling SHALL allow the same identifier to appear two or three times. A candidate board SHALL perform exactly the configured positive number of tray draws unless simulation fails before tray search.

#### Scenario: Sample a candidate tray
- **WHEN** the generator performs one tray draw
- **THEN** that draw contains exactly three known fixed-orientation shape identifiers

#### Scenario: Preserve duplicate draws
- **WHEN** seeded sampling selects one shape identifier multiple times
- **THEN** those duplicates remain present in the candidate tray

#### Scenario: Sample a configured tray pool
- **WHEN** a simulated board uses a search width greater than one
- **THEN** every tray draw independently consumes the seeded random stream

### Requirement: Solver-backed puzzle acceptance
The generator SHALL exact-solve every sampled tray. Only solvable tray draws SHALL proceed to quality, difficulty, mechanism, and diversity analysis, and at most one fully eligible draw per board candidate SHALL become a puzzle record. Unsolvable draws SHALL contribute to tray workload statistics; a board candidate SHALL be counted as an unsolvable rejection only when none of its tray draws is solvable.

#### Scenario: Accept one eligible tray from a pool
- **WHEN** one or more sampled trays are solver-proven and pass every configured filter
- **THEN** deterministic ranking selects exactly one record for that board

#### Scenario: Reject a board with no solvable tray
- **WHEN** exact search proves every sampled tray unsolvable
- **THEN** the board contributes one unsolvable candidate rejection

### Requirement: Bounded collection generation and statistics
Collection generation SHALL continue until it accepts the requested positive puzzle count or reaches a configured positive maximum board-candidate count. It SHALL report requested count, accepted count, candidate attempts, unsolvable rejections, simulation failures, quality rejections, difficulty rejections, mechanism rejections, exact-duplicate rejections, near-duplicate rejections, tray evaluations, and solvable tray evaluations. Each board candidate SHALL contribute to exactly one accepted or rejection category. Failure to reach the requested count SHALL produce an explicit exhaustion error carrying final statistics.

#### Scenario: Fulfill a targeted collection request
- **WHEN** enough eligible candidates are found within the board-candidate limit
- **THEN** the result contains exactly the requested number of records and all terminal outcomes sum to candidate attempts

#### Scenario: Exhaust candidate attempts
- **WHEN** search and filters prevent the requested count before the candidate limit is reached
- **THEN** collection generation fails with final terminal and workload statistics

