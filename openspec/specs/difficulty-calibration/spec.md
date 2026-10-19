# difficulty-calibration Specification

## Purpose
Define anonymous play outcomes, deterministic difficulty reports, and versioned threshold calibration profiles.
## Requirements
### Requirement: Valid anonymous player outcomes
Outcome format version `1` SHALL contain a puzzle id, supported source difficulty model, non-negative predicted score, matching predicted tier, completion boolean, accepted-move count, invalid-attempt count, hints-used count, and optional non-negative duration seconds. It SHALL contain no player identifier and SHALL reject unknown fields that imply identity. Input validation SHALL snapshot accepted outcomes without mutating caller data.

#### Scenario: Record a completed attempt
- **WHEN** a structurally valid anonymous completed outcome is submitted
- **THEN** it is accepted as an immutable calibration observation

#### Scenario: Reject incompatible prediction metadata
- **WHEN** the predicted tier does not match the declared model score or the model is unsupported
- **THEN** outcome validation rejects it

### Requirement: Deterministic outcome aggregation
Calibration analysis SHALL report total and completed samples plus integer completion-rate basis points overall, by predicted tier, and by exact score. It SHALL report average accepted moves, invalid attempts, hints, and available durations using deterministic integer or fixed-decimal values, and SHALL identify violations of the expected easy-to-hard completion ordering.

#### Scenario: Aggregate a mixed outcome set
- **WHEN** valid outcomes cover multiple tiers and scores
- **THEN** every observation contributes exactly once to overall, tier, and score aggregates

#### Scenario: Detect inverted observed tiers
- **WHEN** a harder predicted tier has a higher observed completion rate than an easier tier with data
- **THEN** the report identifies that adjacent ordering violation

### Requirement: Versioned threshold calibration profiles
Profile fitting SHALL require configured positive minimum total and per-resulting-tier samples. It SHALL deterministically choose integer easy/medium boundaries minimizing squared completion-rate error against configured target rates, require nonempty qualifying easy, medium, and hard groups, and return a versioned profile containing the source model, sample fingerprint, sample counts, targets, boundaries, and loss. Insufficient or unsuitable data SHALL be rejected without a profile. Profile validation SHALL reject unknown or incomplete format fields, sample counts that violate the profile's declared minima, and loss values inconsistent with its declared target and observed rates.

#### Scenario: Fit a sufficient dataset
- **WHEN** validated outcomes provide qualifying samples across candidate score ranges
- **THEN** repeated fitting returns the same boundaries, fingerprint, and loss

#### Scenario: Reject sparse data
- **WHEN** total or per-resulting-tier samples do not meet configured minima
- **THEN** profile fitting reports that calibration data is insufficient

#### Scenario: Reject internally inconsistent profile metadata
- **WHEN** a profile's fields, sample counts, or loss disagree with its versioned invariants
- **THEN** profile validation rejects the artifact

### Requirement: Profile-based tier classification
A supported calibration profile SHALL classify a non-negative `casual-v1` score as easy at or below `easyMax`, medium at or below `mediumMax`, and hard above `mediumMax`. Applying a profile SHALL NOT change raw metrics, score, reason codes, or the historical tier stored in a puzzle record.

#### Scenario: Apply learned boundaries
- **WHEN** scores occur below, between, and above profile boundaries
- **THEN** they classify as easy, medium, and hard respectively

### Requirement: Offline calibration command
The project SHALL provide an offline Node command that reads an outcome-array JSON file, validates observations, writes a deterministic analysis report and optional fitted profile, supports minimum-sample and target-rate options, and exits nonzero for invalid or insufficient data when profile fitting is requested.

#### Scenario: Analyze an outcome file
- **WHEN** the command receives a valid input path without profile fitting
- **THEN** it writes a deterministic aggregate report

#### Scenario: Fit a profile from a file
- **WHEN** profile fitting is requested with sufficient valid data
- **THEN** the command writes the report and deterministic versioned profile

