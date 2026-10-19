# difficulty-calibration Delta

## MODIFIED Requirements

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
