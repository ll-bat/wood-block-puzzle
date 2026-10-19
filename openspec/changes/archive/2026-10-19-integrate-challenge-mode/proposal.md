## Why

Generated challenges are currently available only as offline JSON, so they cannot yet be played or verified through the browser game. The next increment must connect validated records to the existing board while keeping the pure rules engine authoritative instead of duplicating challenge behavior in legacy UI logic.

## What Changes

- Add a browser- and Node-compatible challenge record loader for standalone records and collection envelopes.
- Add a DOM-independent challenge session that tracks the board, original tray indices, legal moves, completion, failure, reset, and stored-solution replay.
- Add a Challenge menu mode that renders all `core-25/v1` shapes, the initial board, selection state, move feedback, and terminal status through the existing game layout.
- Apply every player move through the pure puzzle rules and render the resulting simultaneous clearing transition.
- Add reset and diagnostic solution-replay controls.
- Ship one validated starter challenge while allowing an injected record, collection, or URL source.

## Capabilities

### New Capabilities

- `challenge-mode`: Loading validated records, authoritative challenge sessions, browser rendering and interaction, terminal outcomes, reset, and solution replay.

### Modified Capabilities

None.

## Impact

- Adds challenge session and loading modules under `src/puzzle/challenge/`.
- Adds a browser mode under `src/general/game_types/`, a menu entry, styles, and a starter challenge asset.
- Reuses `Layout` and `Boxes` for rendering but does not register legacy random-tray placement or clearing handlers.
- Changes no Relax or Build Up game rules and adds no dependency.
