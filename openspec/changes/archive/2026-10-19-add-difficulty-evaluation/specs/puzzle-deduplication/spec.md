## ADDED Requirements

### Requirement: Rule-preserving whole-puzzle symmetry
The system SHALL support all eight rotations and reflections of the square board. Applying a symmetry to a puzzle SHALL transform both occupied board cells and every fixed-orientation tray shape into the corresponding `core-25/v1` identifier while preserving duplicates.

#### Scenario: Rotate an oriented shape
- **WHEN** a puzzle containing a horizontal line is rotated by 90 degrees
- **THEN** the transformed tray contains the corresponding vertical line identifier

#### Scenario: Preserve puzzle behavior
- **WHEN** a legal placement sequence and its puzzle are transformed by the same symmetry
- **THEN** the transformed sequence remains legal with equivalent clearing behavior

### Requirement: Canonical exact puzzle identity
The canonical puzzle key SHALL be the lexicographically smallest fixed-width board and sorted-tray representation among all eight whole-puzzle symmetries. It SHALL be deterministic and SHALL treat rotations, reflections, and tray permutations as equal without merging puzzles whose transformed boards or trays differ.

#### Scenario: Canonicalize equivalent puzzles
- **WHEN** two puzzles differ only by whole-puzzle rotation, reflection, or tray ordering
- **THEN** they have the same canonical key

#### Scenario: Distinguish a different tray
- **WHEN** two puzzles have symmetry-equivalent boards but non-equivalent trays
- **THEN** they have different canonical keys

### Requirement: Symmetry-aware near-duplicate distance
Near-duplicate distance SHALL be the minimum occupied-cell Hamming distance between boards over symmetries that make their sorted transformed trays equal. If no symmetry aligns the trays, the puzzles SHALL not be near duplicates. The configured threshold SHALL be a non-negative integer, where zero adds no rejection beyond exact canonical duplicates.

#### Scenario: Compare near-equivalent boards
- **WHEN** two puzzles have symmetry-compatible trays and their best-aligned boards differ by no more than the positive threshold
- **THEN** the later candidate is classified as a near duplicate

#### Scenario: Ignore incompatible trays
- **WHEN** no whole-puzzle symmetry makes two trays equal
- **THEN** their board similarity does not cause near-duplicate rejection

### Requirement: Basic board-quality filters
Generation SHALL support inclusive occupied-cell and legal-first-move bounds. A solvable candidate outside any configured bound SHALL be rejected as a quality failure before tier and diversity acceptance.

#### Scenario: Reject an overly sparse board
- **WHEN** a candidate contains fewer occupied cells than the configured minimum
- **THEN** generation counts a quality rejection

#### Scenario: Accept boundary values
- **WHEN** occupied-cell and legal-first-move counts equal inclusive configured bounds
- **THEN** those bounds do not reject the candidate

### Requirement: Collection duplicate filtering
Generation SHALL reject a candidate whose canonical key was already accepted and SHALL separately count exact-duplicate and near-duplicate rejections. Duplicate comparison order SHALL be deterministic, and retained records SHALL preserve generation order.

#### Scenario: Reject an exact symmetry duplicate
- **WHEN** a later candidate is symmetry-equivalent to an accepted puzzle
- **THEN** it is absent from the collection and increments exact duplicate rejections

#### Scenario: Preserve deterministic order
- **WHEN** identical seeded filtered generation is repeated
- **THEN** the same non-duplicate records are retained in the same order
