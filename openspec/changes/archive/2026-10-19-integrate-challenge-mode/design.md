## Context

The browser game has an existing 8×8 DOM layout, box store, random tray renderer, drag handlers, and a separate clearing implementation. That code supports only part of `core-25/v1` and predates the exact BigInt rules engine. Generated records, by contrast, are versioned, replay-validated, and use the exact engine as their correctness oracle.

Challenge Mode must support every catalog shape and guarantee that what the player sees is the same transition the generator and solver validate. The existing visual layout is useful, but its legacy placement/clearing chain cannot be the authority for challenges.

## Goals / Non-Goals

**Goals:**

- Load standalone records or collection entries only after strict record validation.
- Model play in a deterministic DOM-independent session.
- Render the board and all 25 fixed-orientation catalog shapes using existing page containers.
- Support duplicate tray shapes by preserving original tray indices.
- Report success after three accepted placements and failure only when remaining shapes have no legal placement.
- Reset the exact challenge and show its stored solution diagnostically.
- Keep Relax and Build Up behavior unchanged.

**Non-Goals:**

- Redesign the entire game UI or legacy modes.
- Add collection browsing, accounts, scores, persistence, or progression.
- Add drag animation or line-clear animation to Challenge Mode.
- Treat the stored solution as unique or require the player to follow it.
- Fetch challenges from a remote service.

## Decisions

### Make a pure `ChallengeSession` authoritative

The session is constructed from a strictly deserialized record. It owns the current BigInt board, remaining original tray indices, accepted move history, and status. A placement resolves the catalog placement and calls the pure `isLegalPlacement` and `applyPlacement` functions. The UI receives the exact transition and redraws `boardAfter`.

This prevents drift between generated solutions and browser play. The legacy `$boxes.updateMatrix` and `BoxOnboardCrasher` path remains untouched for existing modes but is not used to decide challenge moves.

Alternative considered: extend the current drag handler chain. Rejected because it has a smaller shape catalog, generates a new tray after all pieces are used, and contains an independent clearing algorithm.

### Use original tray indices as piece identity

Each of the three visible pieces has index 0, 1, or 2 even when identifiers are duplicated. The session consumes an index exactly once. Selection and disabled state use that index rather than the shape identifier.

Alternative considered: remove pieces by identifier. Rejected because duplicate pieces would become ambiguous.

### Use select-then-anchor interaction

The player selects a tray piece and then chooses the board cell that will be its normalized top-left anchor. Tray entries and board cells receive keyboard activation in addition to pointer activation. Illegal anchors do not mutate state and produce concise feedback.

This is reliable for every shape and avoids coupling the milestone to the legacy drag coordinate offsets. Dragging can be added later without changing session semantics.

### Render from catalog cells, not the legacy figure registry

Challenge tray shapes are drawn directly from immutable catalog cell offsets. This covers all 25 shapes, including orientations missing from `AllFigures`, without widening or renaming the legacy registry.

Alternative considered: add mappings into `AllFigures`. Rejected because maintaining two catalog definitions would invite drift.

### Support object, collection, and URL sources

The loader accepts a parsed standalone record, a collection envelope plus optional id/index selection, or a same-origin JSON URL fetched through an injected fetch function. The browser mode uses `window.WOOD_BLOCK_CHALLENGE_SOURCE` when present and otherwise loads the bundled starter asset.

Every selected record passes `deserializePuzzleRecord`; collection envelopes pass `deserializeCollectionEnvelope`. Loader failures are rendered as Challenge Mode errors rather than falling back to unchecked data.

### Replay stored solutions as diagnostics

The session independently replays the stored three-step witness with the pure engine and returns verified frames. The browser control resets the visual board, disables play during replay, and renders each frame in order. It does not mutate the player's session into a partially replayed state; reset returns to normal play.

## Risks / Trade-offs

- **Click-anchor placement is less tactile than dragging** → Keep interaction explicit and accessible now; drag can become another controller over the same session.
- **Legacy global handlers can accumulate across mode changes** → Challenge Mode registers only handlers on newly redrawn elements and avoids singleton event chains.
- **Asynchronous loading may fail** → Show a stable error panel and do not initialize an unvalidated session.
- **Starter asset becomes stale after format changes** → Validate it in automated tests through the same loader.
- **Failure is known by the solver before the board is physically stuck** → Preserve normal game semantics and declare failure only when no remaining piece has a legal placement.

## Migration Plan

1. Add record selection/loading and pure session tests.
2. Add the browser renderer/controller and menu registration.
3. Add and validate a bundled starter record.
4. Verify the browser bundle and a DOM smoke path alongside all pure tests.

Rollback removes the Challenge menu entry, browser mode, starter asset, and challenge modules; existing modes and record formats remain unchanged.
