## MODIFIED Requirements

### Requirement: Self-contained puzzle and witness data
A newly generated puzzle record SHALL contain a deterministic identifier, the initial board, exactly three shape identifiers, gameplay-derived provenance, exactly three solution steps, and versioned difficulty metadata. Gameplay provenance SHALL identify source seed, board-candidate attempt, simulation batches, simulation history, configured tray search width, and selected tray draw. Each solution step SHALL contain the original shape index, shape identifier, anchor, boards before placement, after placement, and after clearing, cleared row and column indices, and cleared mask. Legacy format-1 records without difficulty or advanced search provenance SHALL remain readable.

#### Scenario: Create a targeted puzzle record
- **WHEN** targeted generation accepts a solvable tray draw
- **THEN** its record contains all data required to reconstruct the puzzle, replay its solution, inspect difficulty, and identify its search selection

#### Scenario: Read a legacy record
- **WHEN** a valid format-1 record lacks difficulty or advanced search fields
- **THEN** deserialization accepts it and reports absent optional metadata

### Requirement: Offline generation command
The offline Node.js generation command SHALL accept the existing generation and filter options plus tray-search width and repeatable or comma-separated required-mechanism options. It SHALL write one collection JSON document to the requested file or standard output, report concise terminal and tray-workload statistics separately, and exit nonzero with a useful error for invalid options or exhausted generation.

#### Scenario: Generate a targeted collection file
- **WHEN** the command is invoked with valid search and mechanism options
- **THEN** it writes the requested eligible records and reports tray evaluations and categorized rejections

#### Scenario: Reject an unsupported mechanism
- **WHEN** the command receives an unknown required mechanism
- **THEN** it exits nonzero before candidate generation
