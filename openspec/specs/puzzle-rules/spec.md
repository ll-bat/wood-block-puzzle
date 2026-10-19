# puzzle-rules Specification

## Purpose
Define the pure 8x8 board representation, legal placement rules, stability, and simultaneous line clearing.
## Requirements
### Requirement: Eight-by-eight occupancy board
The puzzle domain SHALL model a board as exactly 8 rows by 8 columns in which every cell is either empty or occupied.

#### Scenario: Create an empty board
- **WHEN** a caller creates an empty puzzle board
- **THEN** all 64 cells are empty

#### Scenario: Reject occupancy outside the board
- **WHEN** a caller attempts to construct a board containing a row or column outside the inclusive range 0 through 7
- **THEN** board validation rejects the input

### Requirement: Stable initial challenge board
An initial challenge board SHALL be valid only when none of its rows and none of its columns is completely occupied.

#### Scenario: Accept a stable board
- **WHEN** an initial board has at least one empty cell in every row and every column
- **THEN** initial-board validation accepts it

#### Scenario: Reject a completed initial row
- **WHEN** an initial board contains all eight occupied cells in any row
- **THEN** initial-board validation rejects it

#### Scenario: Reject a completed initial column
- **WHEN** an initial board contains all eight occupied cells in any column
- **THEN** initial-board validation rejects it

### Requirement: Legal fixed-orientation placement
A placement SHALL be legal when every occupied cell of the selected fixed-orientation shape lies inside the board and overlaps no occupied board cell. The legality check SHALL NOT mutate the board.

#### Scenario: Accept a non-overlapping placement
- **WHEN** all cells of an in-bounds placement correspond to empty board cells
- **THEN** the placement is reported as legal and the input board remains unchanged

#### Scenario: Reject an overlapping placement
- **WHEN** at least one cell of a placement corresponds to an occupied board cell
- **THEN** the placement is reported as illegal and the input board remains unchanged

### Requirement: Immediate completed-line clearing
After each legal placement, the system SHALL add all cells of the placed shape, identify every completely occupied row and column, and clear the union of those rows and columns before returning the next board state.

#### Scenario: Clear one completed row
- **WHEN** a legal placement completes exactly one row and no column
- **THEN** every cell in that row is empty in the returned board and no other occupied cell is removed

#### Scenario: Clear one completed column
- **WHEN** a legal placement completes exactly one column and no row
- **THEN** every cell in that column is empty in the returned board and no other occupied cell is removed

#### Scenario: Clear multiple completed lines simultaneously
- **WHEN** a legal placement completes more than one row or column
- **THEN** every completed row and column is determined from the board after placement and their union is cleared in one transition

#### Scenario: Clear intersecting row and column
- **WHEN** a legal placement simultaneously completes a row and a column
- **THEN** both complete lines are cleared and their intersection is treated as one board cell in the cleared union

#### Scenario: Preserve incomplete lines
- **WHEN** a legal placement leaves a row or column with at least one empty cell
- **THEN** cells in that incomplete line are preserved unless they also belong to a different completed line

### Requirement: Deterministic immutable transition result
Applying the same legal placement to the same board SHALL always return the same next board and clearing metadata without modifying the input board. The metadata SHALL identify every row and column cleared by the transition.

#### Scenario: Repeat a transition
- **WHEN** the same board and legal placement are applied twice
- **THEN** both results contain identical next boards and identical cleared row and column indices

#### Scenario: Inspect the source board after a transition
- **WHEN** a legal placement is applied to a board
- **THEN** the source board retains its original occupancy

### Requirement: UI-independent puzzle rules
Catalog validation, board validation, placement enumeration, placement legality, and placement transitions SHALL operate without reading or writing DOM state, animation state, or the existing global `Boxes` store.

#### Scenario: Execute rules in a non-browser environment
- **WHEN** the puzzle-rule modules are executed in Node.js without a document object
- **THEN** shape, board, placement, and clearing operations remain available and deterministic

