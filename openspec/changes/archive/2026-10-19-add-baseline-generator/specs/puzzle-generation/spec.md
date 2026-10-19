## ADDED Requirements

### Requirement: Deterministic seeded generation
The generator SHALL accept an unsigned 32-bit integer seed and SHALL derive every board-simulation, shape-sampling, ordering, and placement choice from its seeded pseudo-random source. The same supported versions, seed, and generation configuration SHALL produce the same accepted puzzle records and deterministic statistics.

#### Scenario: Repeat collection generation
- **WHEN** two collection runs use the same seed, versions, and configuration
- **THEN** their puzzle records and candidate acceptance statistics are identical

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
Each challenge candidate SHALL contain exactly three independently sampled identifiers from the active catalog. Sampling SHALL allow the same identifier to appear two or three times.

#### Scenario: Sample a candidate tray
- **WHEN** the generator proposes a challenge candidate
- **THEN** the candidate contains exactly three known fixed-orientation shape identifiers

#### Scenario: Preserve duplicate draws
- **WHEN** seeded sampling selects one shape identifier multiple times
- **THEN** those duplicates remain present in the candidate tray

### Requirement: Solver-backed puzzle acceptance
The baseline generator SHALL accept a candidate only when the exact solver can place all three sampled shapes and returns a complete replayable witness. Unsolvable candidates SHALL be rejected without appearing in the collection.

#### Scenario: Accept a solvable candidate
- **WHEN** exact witness search succeeds for a simulated board and sampled tray
- **THEN** the generator adds one puzzle record containing that witness

#### Scenario: Reject an unsolvable candidate
- **WHEN** exact witness search proves that a candidate cannot place all three shapes
- **THEN** the candidate is counted as rejected and is absent from accepted records

### Requirement: Bounded collection generation and statistics
Collection generation SHALL continue until it accepts the requested positive puzzle count or reaches a configured positive maximum candidate-attempt count. It SHALL report requested count, accepted count, candidate attempts, unsolvable rejections, and simulation failures. Failure to reach the requested count SHALL produce an explicit exhaustion error carrying the final statistics.

#### Scenario: Fulfill a collection request
- **WHEN** enough solvable candidates are found within the attempt limit
- **THEN** the result contains exactly the requested number of puzzle records and internally consistent statistics

#### Scenario: Exhaust candidate attempts
- **WHEN** the candidate-attempt limit is reached before accepting the requested count
- **THEN** collection generation fails with statistics that describe all attempts made

