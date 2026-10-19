## ADDED Requirements

### Requirement: Versioned core catalog
The system SHALL expose a shape catalog identified as `core-25/v1` containing exactly the following 25 fixed-orientation shapes:

- `SINGLE`
- `LINE_2_HORIZONTAL`, `LINE_2_VERTICAL`
- `LINE_3_HORIZONTAL`, `LINE_3_VERTICAL`
- `LINE_4_HORIZONTAL`, `LINE_4_VERTICAL`
- `LINE_5_HORIZONTAL`, `LINE_5_VERTICAL`
- `SQUARE_2`, `SQUARE_3`
- `RECTANGLE_2_ROWS_3_COLUMNS`, `RECTANGLE_3_ROWS_2_COLUMNS`
- `SMALL_CORNER_TOP_LEFT`, `SMALL_CORNER_TOP_RIGHT`, `SMALL_CORNER_BOTTOM_LEFT`, `SMALL_CORNER_BOTTOM_RIGHT`
- `LARGE_CORNER_TOP_LEFT`, `LARGE_CORNER_TOP_RIGHT`, `LARGE_CORNER_BOTTOM_LEFT`, `LARGE_CORNER_BOTTOM_RIGHT`
- `T_STEM_UP`, `T_STEM_RIGHT`, `T_STEM_DOWN`, `T_STEM_LEFT`

Each identifier SHALL resolve to one normalized occupied-cell pattern and SHALL remain stable within the catalog version.

#### Scenario: Load the core catalog
- **WHEN** a caller loads catalog `core-25/v1`
- **THEN** the catalog contains exactly 25 uniquely identified fixed-orientation shapes

#### Scenario: Resolve the downward-stem T shape
- **WHEN** a caller resolves `T_STEM_DOWN`
- **THEN** its normalized occupied cells are `(0,0)`, `(0,1)`, `(0,2)`, and `(1,1)`

### Requirement: Normalized shape definitions
The system SHALL represent every shape as a nonempty set of unique integer row and column offsets whose minimum row and minimum column are both zero.

#### Scenario: Accept a normalized definition
- **WHEN** a shape contains unique integer offsets, includes an offset in row zero and an offset in column zero, and satisfies all other shape rules
- **THEN** shape validation accepts the definition

#### Scenario: Reject duplicate occupied cells
- **WHEN** a shape definition contains the same row and column offset more than once
- **THEN** shape validation rejects the definition with a validation error

#### Scenario: Reject a definition with a nonzero origin offset
- **WHEN** every occupied cell of a shape has a row greater than zero or every occupied cell has a column greater than zero
- **THEN** shape validation rejects the definition with a validation error

### Requirement: Edge-connected shapes
Every catalog shape SHALL be connected through shared cell edges. Diagonal contact alone SHALL NOT establish connectivity.

#### Scenario: Accept an edge-connected corner
- **WHEN** shape validation receives occupied cells `(0,0)`, `(0,1)`, and `(1,0)`
- **THEN** the shape passes connectivity validation

#### Scenario: Reject diagonal-only cells
- **WHEN** shape validation receives only occupied cells `(0,0)` and `(1,1)`
- **THEN** the shape fails connectivity validation

### Requirement: Fixed orientation
The system SHALL treat every orientation as a distinct catalog shape and SHALL NOT rotate or reflect a selected shape while enumerating placements.

#### Scenario: Enumerate a horizontal line
- **WHEN** placements are requested for `LINE_3_HORIZONTAL`
- **THEN** every placement occupies three cells in one row and no vertical orientation is included

#### Scenario: Select the corresponding vertical line
- **WHEN** placements are requested for `LINE_3_VERTICAL`
- **THEN** every placement occupies three cells in one column

### Requirement: In-bounds placement enumeration
For a catalog shape, the system SHALL enumerate each distinct translation whose occupied cells lie entirely within the 8x8 board exactly once. Each result SHALL identify the shape, its anchor row and column, and its occupied board cells.

#### Scenario: Enumerate single-cell placements
- **WHEN** placements are requested for `SINGLE`
- **THEN** exactly 64 placements are returned

#### Scenario: Enumerate 2-row by 3-column rectangle placements
- **WHEN** placements are requested for `RECTANGLE_2_ROWS_3_COLUMNS`
- **THEN** exactly 42 placements are returned

#### Scenario: Exclude out-of-bounds translations
- **WHEN** placements are requested for any catalog shape
- **THEN** no returned placement contains a row or column outside the inclusive range 0 through 7
