## Context

The filtered generator currently samples one random tray for each independently simulated reachable board. A 50-puzzle measurement generated in roughly 0.4 seconds and produced all preliminary tiers, but hard-only filtering rejected substantially more candidates. Solver evaluation is therefore affordable, while discarding a board after one unsuitable tray is wasteful. Diversity tracking already understands exact symmetry and near distance, and every difficulty result exposes distinct reasoning mechanisms.

No casual-player outcome dataset exists. `casual-v1` is explicitly preliminary; calibration infrastructure must retain its score and learn separate profile boundaries rather than silently changing historical labels.

## Goals / Non-Goals

**Goals:**

- Improve targeted-tier and target-mechanism yield with deterministic bounded tray search.
- Prefer novel eligible candidates without weakening exact solvability or filter guarantees.
- Preserve reproducibility and explain every additional solver evaluation in statistics/provenance.
- Validate anonymous outcome observations and aggregate completion behavior by predicted tier and score.
- Produce deterministic, versioned calibration profiles only from sufficient samples.
- Provide offline generation and calibration commands.

**Non-Goals:**

- Claim empirical calibration before real data is collected.
- Store player identity, free text, device identifiers, or network addresses.
- Automatically replace `casual-v1` labels in existing records.
- Implement genetic algorithms, arbitrary bitboard mutation, or reverse clearing.
- Add worker threads before profiling demonstrates a throughput need.

## Decisions

### Search several trays on one reachable board

`traySearchWidth` independently samples one or more three-shape trays for the simulated board. Every draw is solver-checked; solvable draws receive exact difficulty analysis. Filters are applied to the pool in the same semantic order as before: quality, tier, requested mechanisms, then diversity. The best remaining candidate is selected deterministically.

This reuses expensive board simulation and explores the strongest source of local variation without mutating the board into an unreachable state. Width one retains baseline behavior.

Alternatives considered:

- Arbitrary occupied-cell mutation: rejected because it destroys gameplay provenance.
- Reverse construction through line clears: deferred because clear transitions are many-to-one and need a separate proof strategy.
- Evolutionary populations: unnecessary until bounded tray search is measured.

### Target explicit reasoning mechanisms

Supported target identifiers map directly to exact metrics: `clear-required`, `initially-blocked`, `order-restricted`, `delayed-failure`, and `misleading-best-move`. All requested mechanisms must be present. The exact solver still searches every solution, so targeting a stored witness cannot hide an easier unintended solution.

### Rank by novelty, then stable target preference

The diversity tracker reports minimum symmetry-aware Hamming distance to accepted puzzles with compatible tray orbits. Infinite distance is treated as maximally novel. Among candidates that pass hard filters, selection prefers greater novelty, then a stable score target within the requested tier, then earlier seeded draw index.

Easy targets prefer score 2, medium 6, hard 10, and unrestricted generation prefers score 6 to avoid pushing every collection toward an extreme. These preferences affect only ranking inside an already eligible pool.

Alternative considered: random selection among eligible trays. Rejected because it wastes the available diversity signal and makes search width less useful.

### Keep candidate outcomes and tray evaluations separate

One simulated board remains one candidate attempt and contributes exactly one terminal outcome: accepted, simulation failure, no solvable tray, quality rejection, difficulty rejection, mechanism rejection, exact duplicate, or near duplicate. `trayEvaluations` and `solvableTrayEvaluations` are additional workload counters and do not participate in the terminal-outcome sum.

The record provenance stores search width and selected zero-based tray draw so a chosen puzzle can be explained and regenerated.

### Use anonymous, minimal outcome records

Outcome format 1 stores puzzle id, source difficulty model, predicted score and tier, completion boolean, accepted-move count, invalid-attempt count, hints used, and optional duration seconds. It contains no player or device identifier. Validation rejects incompatible model versions and inconsistent values.

Aggregation reports sample counts and integer completion-rate basis points overall, by tier, and by exact score. Integer ratios keep reports deterministic across environments.

### Learn threshold profiles without changing feature weights

A calibration profile searches integer `easyMax` and `mediumMax` boundaries over observed scores. For each valid pair with a nonempty sample in all three resulting tiers, loss is the sum of squared differences between observed completion rates and configurable target rates. Ties choose the lexicographically smaller boundaries.

Profiles require a configurable minimum total sample and minimum sample per resulting tier. They declare format version, source model, deterministic normalized-data fingerprint, sample count, target rates, boundaries, and loss. Applying a profile changes only tier assignment for a score; raw `casual-v1` metrics, score, reasons, and stored historical tier remain intact.

Alternative considered: retrain feature weights. Rejected because the initial datasets will be too small and a threshold profile is more interpretable.

### Do not parallelize yet

Current measured throughput is hundreds of puzzles per second for mixed generation on this development environment, and targeted tray evaluation is synchronous but bounded. Worker threads would complicate seeded stream partitioning, deterministic merge order, bundles, and errors. Instrumentation added here will expose solver workload; parallel execution remains justified only after representative large runs show a bottleneck.

## Risks / Trade-offs

- **Wide tray pools multiply solver cost** → Bound width, expose workload counters, and default to one.
- **Novelty preference may bias difficulty distribution** → Apply tier/mechanism filters first and retain score/metric metadata.
- **Mechanism combinations may be rare** → Bound attempts and report mechanism rejections explicitly.
- **Calibration can overfit sparse outcomes** → Enforce total and per-tier sample minima and store loss/sample counts.
- **Completion rates can be confounded by UI or player population** → Treat profiles as dataset-specific artifacts and keep source-model history.

## Migration Plan

1. Extend diversity distance and implement tray-pool evaluation/ranking.
2. Add mechanism filters, configuration, provenance, statistics, and CLI options.
3. Add outcome validation, aggregation, profile fitting, and the calibration command.
4. Benchmark baseline versus guided target yield and verify deterministic output.
5. Archive the specs after all tests and builds pass.

Width-one generation and records without advanced provenance remain supported. Rollback removes advanced options and calibration modules without changing core rules, solver behavior, or existing records.
