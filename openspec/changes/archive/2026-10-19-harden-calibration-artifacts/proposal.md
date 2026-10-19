# Change: Harden Calibration Artifacts

## Why

Calibration profiles are portable decision artifacts. Their validator currently checks types and boundaries, but it can accept internally inconsistent minimum-sample declarations, tier counts, or loss values. Durable specifications also retain generated placeholder purpose text after archiving.

## What Changes

- Reject calibration profiles whose declared samples do not satisfy their own configured minima.
- Recompute and verify profile loss from declared targets and observed rates.
- Reject unknown or incomplete fields in versioned profile objects and their fixed-key subobjects.
- Add regression tests for tampered profile metadata.
- Replace placeholder purposes in the durable puzzle specifications with concise descriptions.

## Impact

- Affected spec: `difficulty-calibration`
- Affected code: calibration profile validation and tests
- Compatibility: profiles emitted by the existing fitter remain valid; only malformed or extended format-1 profiles are rejected.
