## ADDED Requirements

### Requirement: JSON-safe versioned puzzle record
Every stored puzzle SHALL declare record format version `1`, rules version `wood-block-8x8/v1`, and catalog version `core-25/v1`. All board and mask values SHALL use exactly 16 lowercase hexadecimal characters so a record can be serialized with standard JSON without BigInt values.

#### Scenario: Serialize a board value
- **WHEN** a puzzle-domain board or transition mask is written to a record
- **THEN** it is represented as a 16-character lowercase hexadecimal string

#### Scenario: Reject an incompatible record version
- **WHEN** a record declares an unsupported format, rules, or catalog version
- **THEN** record deserialization rejects it

### Requirement: Self-contained puzzle and witness data
A puzzle record SHALL contain a deterministic identifier, the initial board, exactly three shape identifiers, gameplay-derived provenance, and exactly three solution steps. Each solution step SHALL contain the original shape index, shape identifier, anchor, boards before placement, after placement, and after clearing, cleared row and column indices, and cleared mask.

#### Scenario: Create an accepted puzzle record
- **WHEN** the generator accepts a solvable candidate
- **THEN** its record contains all data required to reconstruct the puzzle and replay the stored solution without rerunning generation

#### Scenario: Identify generation provenance
- **WHEN** a puzzle record is inspected
- **THEN** its provenance identifies gameplay-derived generation, source seed, candidate attempt index, and configured simulation batch count

### Requirement: Record round-trip validation
Deserializing a puzzle record SHALL validate its versions, hexadecimal values, stable initial board, known tray shapes, unique use of all three original shape indices, legal witness placements, clearing metadata, and intermediate boards. Serialization followed by deserialization SHALL preserve the puzzle and witness values.

#### Scenario: Round-trip a generated record
- **WHEN** a generated record is serialized to JSON, parsed, and deserialized
- **THEN** the reconstructed BigInt puzzle and witness replay successfully to the recorded values

#### Scenario: Reject a tampered witness
- **WHEN** any witness anchor, shape identity, board value, or clearing result disagrees with rule-engine replay
- **THEN** record deserialization rejects the record

### Requirement: Versioned collection envelope
A generated collection SHALL use format version `1`, declare the rules and catalog versions, include the deterministic generation configuration and statistics, and contain the accepted puzzle-record array. The envelope SHALL contain no runtime-duration field that would make repeated seeded output differ.

#### Scenario: Serialize a collection
- **WHEN** collection generation succeeds
- **THEN** standard JSON serialization produces an envelope containing exactly the accepted records and deterministic generation metadata

### Requirement: Offline generation command
The project SHALL provide an offline Node.js command that accepts count, seed, simulation-batch, batch-attempt, candidate-attempt, output-path, and pretty-print options. It SHALL write one collection JSON document to the requested file or to standard output, report a concise summary separately, and exit nonzero with a useful error for invalid options or exhausted generation.

#### Scenario: Generate a collection file
- **WHEN** the command is invoked with valid options and an output path
- **THEN** it writes a valid collection containing the requested number of solvable records and reports its summary

#### Scenario: Print command help
- **WHEN** the command is invoked with the help option
- **THEN** it describes all supported options without running generation
