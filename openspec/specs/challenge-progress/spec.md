# challenge-progress Specification

## Purpose
TBD - created by archiving change add-persistent-challenge-review. Update Purpose after archive.
## Requirements
### Requirement: Persistent local review state
The server SHALL maintain a versioned sidecar record keyed by puzzle id. Every catalog puzzle SHALL default to unsolved and manual difficulty `easy`; existing valid review values SHALL survive catalog reloads. Updates SHALL accept only known puzzle ids, boolean solved state, and `easy`, `medium`, or `hard` manual difficulty, and SHALL replace the sidecar atomically.

#### Scenario: Initialize newly discovered puzzles
- **WHEN** a catalog contains puzzle ids absent from review storage
- **THEN** each receives unsolved and easy defaults that are persisted

#### Scenario: Update one puzzle
- **WHEN** a valid partial review update is submitted for a known puzzle
- **THEN** its changed fields persist without changing other fields or puzzles

#### Scenario: Reject invalid review data
- **WHEN** an update names an unknown puzzle or invalid field value
- **THEN** the server rejects it without changing stored progress

### Requirement: Manual difficulty workflow
Challenge Mode SHALL show Easy, Medium, and Hard assignment controls for the active puzzle and persist a selection immediately. It SHALL provide an All/Easy/Medium/Hard filter, render only matching numbered navigation items while retaining original catalog numbers, and make Previous and Next operate within that filtered sequence.

#### Scenario: Assign and filter difficulty
- **WHEN** a curator changes a puzzle from easy to hard and selects the hard filter
- **THEN** the puzzle remains available in the hard subset after reload

### Requirement: Solved progress workflow
Challenge Mode SHALL persist solved state only after all three pieces are legally placed. Solved navigation items SHALL be green; failed attempts SHALL receive no persistent failed styling. After showing a solved celebration, the UI SHALL move to the next puzzle in the active difficulty filter when one exists.

#### Scenario: Complete a filtered puzzle
- **WHEN** the active puzzle is won and another puzzle follows it in the selected subset
- **THEN** the current number becomes green and the next matching puzzle opens after the solved acknowledgement

