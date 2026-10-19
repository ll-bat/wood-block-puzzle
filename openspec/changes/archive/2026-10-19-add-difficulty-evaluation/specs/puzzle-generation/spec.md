## MODIFIED Requirements

### Requirement: Deterministic seeded generation
The generator SHALL accept an unsigned 32-bit integer seed and SHALL derive every board-simulation, shape-sampling, ordering, placement choice, and filter decision from deterministic inputs. The same supported versions, seed, generation configuration, difficulty model, and prior accepted candidates SHALL produce the same accepted puzzle records and deterministic statistics.

#### Scenario: Repeat collection generation
- **WHEN** two collection runs use the same seed, versions, model, and configuration
- **THEN** their puzzle records, filtering decisions, and candidate acceptance statistics are identical

#### Scenario: Reject an invalid seed
- **WHEN** a seed is not an integer in the inclusive range 0 through 4294967295
- **THEN** generation rejects the configuration before producing candidates

### Requirement: Solver-backed puzzle acceptance
The generator SHALL consider a candidate for quality, difficulty, and diversity filtering only when the exact solver can place all three sampled shapes and returns a complete replayable witness. Unsolvable candidates SHALL be rejected and counted separately without appearing in the collection.

#### Scenario: Accept a fully eligible solvable candidate
- **WHEN** exact witness search succeeds and the candidate passes every configured filter
- **THEN** the generator adds one puzzle record containing that witness and difficulty analysis

#### Scenario: Reject an unsolvable candidate
- **WHEN** exact witness search proves that a candidate cannot place all three shapes
- **THEN** the candidate is counted as an unsolvable rejection and no later filter analyzes it

### Requirement: Bounded collection generation and statistics
Collection generation SHALL continue until it accepts the requested positive puzzle count or reaches a configured positive maximum candidate-attempt count. It SHALL report requested count, accepted count, candidate attempts, unsolvable rejections, simulation failures, quality rejections, difficulty rejections, exact-duplicate rejections, and near-duplicate rejections. Each candidate attempt SHALL contribute to exactly one accepted or rejection category. Failure to reach the requested count SHALL produce an explicit exhaustion error carrying the final statistics.

#### Scenario: Fulfill a filtered collection request
- **WHEN** enough eligible candidates are found within the attempt limit
- **THEN** the result contains exactly the requested number of records and all categorized outcomes sum to candidate attempts

#### Scenario: Exhaust candidate attempts
- **WHEN** filters prevent the requested count before the candidate limit is reached
- **THEN** collection generation fails with final categorized statistics
