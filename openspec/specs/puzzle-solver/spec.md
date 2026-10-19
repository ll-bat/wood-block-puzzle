# puzzle-solver Specification

## Purpose
Define exact solvability search, solution witnesses, and first-move classification for three-shape puzzles.
## Requirements
### Requirement: Valid three-shape solver input
The solver SHALL accept a stable 8x8 board and exactly three shape identifiers from one supported catalog. Duplicate shape identifiers SHALL be valid. It SHALL reject an unstable board, an unknown shape, or any tray whose length is not three.

#### Scenario: Accept duplicate shapes
- **WHEN** the solver receives a stable board and a tray containing the same known shape identifier more than once
- **THEN** the input is accepted for solving

#### Scenario: Reject an unstable board
- **WHEN** the solver receives an initial board with a completed row or column
- **THEN** it rejects the puzzle before searching

#### Scenario: Reject an invalid tray
- **WHEN** the solver receives fewer or more than three shapes or an unknown shape identifier
- **THEN** it rejects the puzzle before searching

### Requirement: Exact three-shape solvability
The solver SHALL report a puzzle as solvable if and only if at least one sequence of legal fixed-orientation placements, choosing the three shapes in any order and applying immediate clearing after every placement, places all three shapes. Search SHALL NOT discard a legal branch through heuristic pruning.

#### Scenario: Find a solution in a non-given order
- **WHEN** all three shapes can be placed only by selecting an order different from their tray order
- **THEN** the solver reports the puzzle as solvable

#### Scenario: Reject an unsolvable puzzle
- **WHEN** no legal ordering and placement sequence can place all three shapes
- **THEN** the solver reports the puzzle as unsolvable

#### Scenario: Unlock a blocked shape through clearing
- **WHEN** a shape has no legal initial placement but a preceding placement clears space that makes it legal
- **THEN** the solver includes that clearing-dependent branch in exact solvability search

### Requirement: Replayable solution witness
For a solvable puzzle, the solver SHALL return one three-step witness. Each step SHALL identify the original tray index, shape identifier, anchor row and column, board before placement, board immediately after placement, board after clearing, and cleared row and column indices. For an unsolvable puzzle, no witness SHALL be returned.

#### Scenario: Replay a solvable witness
- **WHEN** a returned witness is replayed from the initial board using the puzzle rules
- **THEN** every step is legal, its transition data matches the replay, and all three original shape instances are consumed exactly once

#### Scenario: Request a witness for an unsolvable puzzle
- **WHEN** witness search completes for an unsolvable puzzle
- **THEN** the result indicates unsolvability and contains no witness

### Requirement: Logical handling of duplicate shapes
At any search state, choosing one of multiple remaining instances with the same shape identifier and the same placement SHALL constitute one logical branch. A witness SHALL still identify one canonical remaining original tray index so it can be replayed against the tray.

#### Scenario: Analyze three identical shapes
- **WHEN** the tray contains three identical shape identifiers
- **THEN** exchanging the identities of those identical instances does not multiply the logical solution count or first-move count

#### Scenario: Record a duplicate instance in a witness
- **WHEN** a witness places one of multiple identical remaining shapes
- **THEN** it records the lowest remaining original tray index for that shape

### Requirement: First-move classification
The solver SHALL enumerate every distinct legal first move and classify it as winning when at least one continuation places both remaining shapes, or losing otherwise. A distinct first move is identified by shape identifier and anchor; duplicate tray instances do not create additional distinct first moves.

#### Scenario: Classify a winning first move
- **WHEN** a legal first placement has at least one complete continuation
- **THEN** that first move is returned once with a winning classification

#### Scenario: Classify a delayed losing first move
- **WHEN** a legal first placement allows further legal play but no sequence places both remaining shapes
- **THEN** that first move is returned with a losing classification

#### Scenario: Report first-move totals
- **WHEN** puzzle analysis completes
- **THEN** it reports legal and winning first-move counts consistent with the returned classifications

### Requirement: Logical solution count and viable orders
Puzzle analysis SHALL count distinct logical complete placement sequences and SHALL report every distinct shape-identifier order for which at least one complete placement sequence exists. Sequences that differ by a shape identifier or anchor SHALL be distinct; sequences that differ only by exchanging identical instances SHALL not be distinct.

#### Scenario: Count solutions with duplicate shapes
- **WHEN** complete sequences differ only in which identical tray instance is named
- **THEN** they contribute one logical solution rather than multiple solutions

#### Scenario: Report viable shape orders
- **WHEN** only some distinct permutations of the tray's shape identifiers can place all three shapes
- **THEN** analysis returns exactly those viable identifier orders

#### Scenario: Apply a solution-count limit
- **WHEN** analysis is configured with a positive solution limit smaller than the actual logical solution count
- **THEN** it reports the limit as the count and marks the count as capped only after establishing that at least one additional solution exists

### Requirement: Deterministic UI-independent analysis
For the same puzzle and options, the solver SHALL return the same classifications, counts, viable orders, and canonical witness without mutating its input. Solver behavior SHALL be available in Node.js without DOM, animation, event, or mutable UI-store state.

#### Scenario: Repeat analysis
- **WHEN** the same puzzle is analyzed twice with the same options
- **THEN** the observable analysis results are identical and the input board and tray are unchanged

#### Scenario: Analyze without browser globals
- **WHEN** the solver runs in Node.js without a document object
- **THEN** exact solving and analysis remain available

