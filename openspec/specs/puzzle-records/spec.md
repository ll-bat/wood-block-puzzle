# puzzle-records Specification

## Purpose
Define versioned JSON puzzle records, replayable provenance, verified witnesses, and collection envelopes.
## Requirements
### Requirement: JSON-safe versioned puzzle record
Every stored puzzle SHALL declare record format version `1`, rules version `wood-block-8x8/v1`, and catalog version `core-25/v1`. All board and mask values SHALL use exactly 16 lowercase hexadecimal characters so a record can be serialized with standard JSON without BigInt values.

#### Scenario: Serialize a board value
- **WHEN** a puzzle-domain board or transition mask is written to a record
- **THEN** it is represented as a 16-character lowercase hexadecimal string

#### Scenario: Reject an incompatible record version
- **WHEN** a record declares an unsupported format, rules, or catalog version
- **THEN** record deserialization rejects it

### Requirement: Self-contained puzzle and witness data
A newly generated puzzle record SHALL contain a deterministic identifier, the initial board, exactly three shape identifiers, gameplay-derived provenance, exactly three solution steps, and versioned difficulty metadata. Gameplay provenance SHALL identify source seed, board-candidate attempt, simulation batches, simulation history, configured tray search width, and selected tray draw. Each solution step SHALL contain the original shape index, shape identifier, anchor, boards before placement, after placement, and after clearing, cleared row and column indices, and cleared mask. Legacy format-1 records without difficulty or advanced search provenance SHALL remain readable.

#### Scenario: Create a targeted puzzle record
- **WHEN** targeted generation accepts a solvable tray draw
- **THEN** its record contains all data required to reconstruct the puzzle, replay its solution, inspect difficulty, and identify its search selection

#### Scenario: Read a legacy record
- **WHEN** a valid format-1 record lacks difficulty or advanced search fields
- **THEN** deserialization accepts it and reports absent optional metadata

### Requirement: Record round-trip validation
Deserializing a puzzle record SHALL validate its versions, hexadecimal values, stable initial board, known tray shapes, unique use of all three original shape indices, legal witness placements, clearing metadata, intermediate boards, and any declared difficulty metadata. Declared difficulty metadata SHALL exactly match recomputation under its supported model version. Serialization followed by deserialization SHALL preserve the puzzle, witness, and difficulty values.

#### Scenario: Round-trip a generated record
- **WHEN** a generated record is serialized to JSON, parsed, and deserialized
- **THEN** the reconstructed BigInt puzzle and witness replay successfully and its difficulty metadata matches recomputation

#### Scenario: Reject a tampered witness
- **WHEN** any witness anchor, shape identity, board value, or clearing result disagrees with rule-engine replay
- **THEN** record deserialization rejects the record

#### Scenario: Reject tampered difficulty metadata
- **WHEN** a stored metric, score, tier, reason, or model version does not match supported recomputation
- **THEN** record deserialization rejects the record

### Requirement: Versioned collection envelope
A generated collection SHALL use format version `1`, declare the rules and catalog versions, include the deterministic generation configuration and statistics, and contain the accepted puzzle-record array. The envelope SHALL contain no runtime-duration field that would make repeated seeded output differ.

#### Scenario: Serialize a collection
- **WHEN** collection generation succeeds
- **THEN** standard JSON serialization produces an envelope containing exactly the accepted records and deterministic generation metadata

### Requirement: Offline generation command
The offline Node.js generation command SHALL accept generation and filter options plus tray-search width and repeatable or comma-separated required-mechanism options. By default it SHALL create `public/puzzles` and write one collection JSON document to a deterministic content-addressed filename there. An explicit output path SHALL override that destination. It SHALL report concise terminal and tray-workload statistics separately and exit nonzero with a useful error for invalid options or exhausted generation.

#### Scenario: Generate into the default catalog
- **WHEN** the command succeeds without an explicit output path
- **THEN** it writes the requested collection beneath `public/puzzles` and reports that path

#### Scenario: Generate a targeted collection file
- **WHEN** the command is invoked with a valid explicit output path and targeting options
- **THEN** it writes the requested eligible records and reports tray evaluations and categorized rejections

#### Scenario: Reject an unsupported mechanism
- **WHEN** the command receives an unknown required mechanism
- **THEN** it exits nonzero before candidate generation

