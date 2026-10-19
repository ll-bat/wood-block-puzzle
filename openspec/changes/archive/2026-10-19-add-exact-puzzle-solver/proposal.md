## Why

The generator needs a correctness oracle that can prove whether all three offered shapes can be placed under the actual clearing rules. The completed pure puzzle core makes it possible to add an exhaustive solver without depending on rendering, animation, or browser state.

## What Changes

- Add exact solvability search across every distinct shape order and every legal fixed-orientation placement.
- Support duplicate shapes while avoiding logically duplicated branches caused only by exchanging identical tray instances.
- Memoize equivalent board and remaining-shape states without changing exact results.
- Return a replayable three-step witness for solvable puzzles, including placement anchors, boards, and cleared lines.
- Classify every distinct legal first move as winning or losing.
- Report exact or explicitly capped solution counts and the distinct shape orders that can solve a puzzle.
- Add deterministic tests for solvable, unsolvable, order-dependent, clearing-dependent, and duplicate-shape scenarios.

## Capabilities

### New Capabilities

- `puzzle-solver`: Defines exact three-shape solvability, solution witnesses, logical solution counting, viable shape orders, and first-move classification.

### Modified Capabilities

None.

## Impact

- Adds pure solver modules and tests under `src/puzzle/` using the existing puzzle-core API.
- Extends the public puzzle API with validation, witness search, and analysis functions.
- Does not yet generate boards or trays, assign difficulty labels, persist puzzle records, or modify the interactive game.
- Adds no runtime dependency and does not alter existing UI behavior.
