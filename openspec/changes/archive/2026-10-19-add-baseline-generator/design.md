## Context

The project now has a versioned shape catalog, pure deterministic rules, and an exact three-shape solver. The next useful increment is a deliberately simple proposal mechanism that can establish acceptance rates, performance, and the natural distribution of solver features before difficulty optimization is introduced.

The package remains CommonJS at the Node entry-point level while browser source uses Webpack-resolved ES modules. The offline command must reuse those modules without forcing a repository-wide module-format migration.

## Goals / Non-Goals

**Goals:**

- Produce reproducible stable boards that are reachable through legal gameplay.
- Sample duplicate-capable three-shape trays and retain only solver-proven puzzles.
- Store every accepted puzzle and witness in a JSON-safe, versioned form.
- Generate bounded collections from an offline command with useful deterministic statistics.
- Keep reusable generation logic independent of Node filesystem and process APIs.

**Non-Goals:**

- Difficulty scoring or minimum challenge thresholds.
- Symmetry canonicalization, duplicate removal, or near-duplicate detection.
- Matching the unpublished tray distribution of a particular commercial game.
- Guided mutation, constraint solving, evolutionary search, or parallel generation.
- Loading generated puzzles in the current UI.

## Decisions

### Use a small explicit seeded PRNG

Generation will use a local 32-bit Mulberry-style pseudo-random function whose state and arithmetic are fully specified by the implementation. All helpers receive this random source rather than calling `Math.random`.

Seeds are unsigned 32-bit integers. This provides fast deterministic replay in Node and browsers without an external dependency. It is not intended for cryptographic use.

Alternatives considered:

- **`Math.random`:** rejected because runs cannot be reproduced.
- **A random-number package:** unnecessary for this baseline and would add version-dependent behavior.
- **Cryptographic randomness:** rejected because unpredictability is not a requirement and would undermine seeded replay.

### Simulate complete random gameplay batches

Board simulation starts empty. For each configured batch, it independently samples three shapes, shuffles their placement order, and chooses uniformly among currently legal placements. The tentative board is committed only if all three placements succeed. A failed tentative batch is retried from the unchanged pre-batch board with new seeded choices up to the configured limit.

The returned history contains every committed placement and transition, allowing reachability tests. The final board is stable because every committed transition applies immediate clearing.

This process guarantees reachability but does not claim to reproduce a commercial game's hidden distribution or a representative human strategy.

Alternatives considered:

- **Independent random occupied cells:** simpler but produces boards that may look artificial and have no gameplay provenance.
- **Use the exact solver to choose every simulated batch:** guarantees completion but its deterministic first witness overemphasizes top-left placements and is more expensive.
- **Commit partial batches:** rejected because captured states would not occur at a normal three-piece tray boundary.

### Use rejection sampling as the baseline

After board simulation, the generator samples a fresh three-shape tray with replacement and invokes exact witness search. Solvable candidates become records; unsolvable candidates are counted and rejected. Simulation failures are separately counted. Generation stops at the requested count or a hard candidate limit.

This intentionally makes no difficulty claim. Acceptance-rate and solver data from this baseline will guide the next milestone.

### Keep deterministic statistics separate from runtime measurements

The collection envelope records requested and accepted counts, candidate attempts, unsolvable rejections, and simulation failures. Wall-clock duration is reported only in the command's human-readable summary, not in the JSON envelope, so identical seeded runs remain byte-equivalent when formatting is equal.

### Encode every board and mask as fixed-width hexadecimal

Record format `1` writes BigInt values as 16 lowercase hexadecimal characters without a prefix. Deserialization requires this exact representation and reconstructs BigInt values only after version checks.

Each record repeats rules and catalog versions so it remains meaningful outside a collection. A collection envelope also declares them and requires every child record to agree.

Alternatives considered:

- **Decimal strings:** valid but less aligned with the bitboard representation and harder to inspect by byte.
- **Two numeric 32-bit words:** JSON-safe but exposes an internal optimization and complicates manual inspection.
- **Native BigInt in JSON:** unavailable in standard JSON serialization.

### Validate records by replay, not schema shape alone

Deserialization will check required types and versions, reconstruct the puzzle, then replay the three stored steps through the core rules. It will compare placement identity, every intermediate board, clearing indices, and masks, while verifying each original tray index is consumed once.

This makes stored witnesses trustworthy inputs for later UI integration and catches corruption that a structural JSON schema alone would miss.

### Bundle the CLI for Node with Webpack

Reusable PRNG, simulation, generation, and record modules remain browser-compatible and avoid filesystem imports. A thin CLI module owns argument parsing and file output. A dedicated CommonJS Webpack configuration targets Node and emits an ignored executable bundle under `dist/tools/`.

The npm command builds that bundle and then runs it, avoiding a package-wide `type: module` change that would require migrating the current Express server and Webpack configurations.

Alternatives considered:

- **Convert the repository to native ESM:** too broad for this milestone and risks existing server and build behavior.
- **Duplicate generator logic in CommonJS:** rejected because the command and browser consumers would drift.
- **Add a runtime TypeScript/ESM loader:** unnecessary new production tooling.

## Risks / Trade-offs

- **Random simulations can fail on crowded boards** → Bound per-batch attempts, discard failed simulations, count them explicitly, and bound total candidates.
- **Uniform random placements may not resemble skilled casual play** → Treat provenance as reachable gameplay, not human behavior; add policy mixtures only after baseline measurements.
- **Rejection sampling may produce mostly easy puzzles** → This milestone establishes correctness and data; difficulty filters belong to the next change.
- **Output identifiers are tied to run provenance rather than global canonical content** → Include seed and candidate index now; symmetry-based canonical identity belongs to deduplication work.
- **A Node bundle is rebuilt for each command invocation** → Favor predictable source parity initially; a direct prebuilt invocation remains available after `build:generator`.

## Migration Plan

1. Add deterministic random, simulation, and sampling modules with replay tests.
2. Add solver-backed bounded collection generation and statistics.
3. Add fixed-width serialization, record creation, deserialization, and replay validation.
4. Add the Node-targeted command bundle and npm scripts.
5. Verify deterministic API output, CLI output, full tests, the existing browser build, and standalone puzzle bundling.

The change is additive. Rollback removes generation modules, their tests, the generator build configuration and scripts; existing core, solver, and game behavior remain unchanged.
