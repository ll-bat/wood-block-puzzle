# Design

Profile format `1` is a closed, versioned interchange format. Validation will require the exact documented top-level fields and exact `easy`, `medium`, and `hard` keys for rate/count maps. It will enforce total and per-tier sample minima and recompute squared-error loss using the same integer formula as fitting.

The validator cannot reproduce the dataset fingerprint or observed completion rates without the source observations. Those values remain provenance claims; the validator checks only invariants available from the self-contained profile.

Specification-purpose cleanup is documentation-only and does not change runtime behavior.
