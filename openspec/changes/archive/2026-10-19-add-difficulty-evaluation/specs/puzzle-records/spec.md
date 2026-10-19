## MODIFIED Requirements

### Requirement: Self-contained puzzle and witness data
A newly generated puzzle record SHALL contain a deterministic identifier, the initial board, exactly three shape identifiers, gameplay-derived provenance, exactly three solution steps, and versioned difficulty metadata. Each solution step SHALL contain the original shape index, shape identifier, anchor, boards before placement, after placement, and after clearing, cleared row and column indices, and cleared mask. Legacy format-1 records without difficulty metadata SHALL remain readable.

#### Scenario: Create an accepted puzzle record
- **WHEN** the generator accepts a solvable candidate
- **THEN** its record contains all data required to reconstruct the puzzle, replay the stored solution, and inspect its difficulty result without rerunning generation

#### Scenario: Identify generation provenance
- **WHEN** a puzzle record is inspected
- **THEN** its provenance identifies gameplay-derived generation, source seed, candidate attempt index, and configured simulation batch count

#### Scenario: Read a legacy record
- **WHEN** a valid format-1 record has no difficulty field
- **THEN** deserialization accepts it and reports no stored difficulty result

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

### Requirement: Offline generation command
The offline Node.js command SHALL accept count, seed, simulation-batch, batch-attempt, candidate-attempt, output-path, pretty-print, difficulty target, near-duplicate distance, occupied-cell bounds, and legal-first-move bounds. It SHALL write one collection JSON document to the requested file or standard output, report a concise categorized summary separately, and exit nonzero with a useful error for invalid options or exhausted generation.

#### Scenario: Generate a filtered collection file
- **WHEN** the command is invoked with valid filter options and an output path
- **THEN** it writes a valid collection containing the requested number of eligible records and reports categorized rejection statistics

#### Scenario: Print command help
- **WHEN** the command is invoked with the help option
- **THEN** it describes all supported generation and filter options without running generation
