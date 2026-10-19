## Why

Challenge generation and exact validation require one deterministic implementation of Wood Block Puzzle rules that can run efficiently outside the browser UI. The current placement and clearing behavior is coupled to DOM-backed mutable stores, so it cannot safely serve as the foundation for exhaustive solving or large-scale generation.

## What Changes

- Add a versioned `CORE_25` catalog of normalized, fixed-orientation, edge-connected shapes.
- Add pure validation for shape definitions, initial board stability, and legal placements.
- Add a compact 64-cell board model and precomputed in-bounds placements for catalog shapes.
- Add a pure transition operation that places one shape and simultaneously clears every completed row and column.
- Add automated tests for the catalog and rule semantics, including crossing and multi-line clears.
- Keep the existing interactive game behavior unchanged in this change; browser integration will be proposed separately.

## Capabilities

### New Capabilities

- `puzzle-shapes`: Defines the versioned core shape catalog, fixed orientations, normalization, connectivity, and valid in-bounds placements.
- `puzzle-rules`: Defines stable 8x8 challenge boards, legal placement, and immediate simultaneous row and column clearing as pure deterministic behavior.

### Modified Capabilities

None.

## Impact

- Adds a new UI-independent puzzle-domain area under `src/puzzle/core/`.
- Adds an automated test setup because the project currently has no test command.
- Establishes APIs later consumed by the solver, offline generator, and browser integration adapter.
- Does not yet change random tray selection, live gameplay, challenge loading, or existing rendering and animation code.
