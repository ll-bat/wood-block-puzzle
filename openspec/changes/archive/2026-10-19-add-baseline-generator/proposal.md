## Why

The exact solver can validate individual puzzles, but the project still lacks a repeatable way to propose candidate boards and trays at collection scale. A deterministic baseline generator is needed before difficulty filters or advanced search can be measured and justified.

## What Changes

- Add a seeded pseudo-random source and deterministic generation configuration.
- Produce stable gameplay-derived boards by simulating complete three-shape batches with legal placements and normal clearing.
- Sample exactly three catalog shapes independently so duplicate shapes can occur.
- Reject unsolvable candidates through the exact solver and retain one verified solution witness for every accepted puzzle.
- Define a versioned, JSON-safe puzzle record and collection envelope using fixed-width hexadecimal board values.
- Add an offline command for generating a requested collection and reporting acceptance and rejection statistics.
- Add reproducibility, reachability, serialization, validation, exhaustion, and command-level tests.

## Capabilities

### New Capabilities

- `puzzle-generation`: Defines deterministic gameplay-derived candidate creation, solver-backed acceptance, collection generation, limits, and generation statistics.
- `puzzle-records`: Defines the versioned JSON-safe puzzle and collection formats, round-trip validation, provenance, and offline generation command.

### Modified Capabilities

None.

## Impact

- Adds generation and record modules under `src/puzzle/generation/` and exports their reusable APIs through `src/puzzle/index.js`.
- Adds a Node-targeted Webpack configuration and npm scripts for the offline command.
- Uses the existing `core-25/v1` catalog, pure transitions, and exact solver without changing their behavior.
- Does not yet score difficulty, remove symmetry-equivalent puzzles, perform guided mutation, or integrate challenges into the browser UI.
