# Change: Add Challenge Collection Navigation

## Why

Challenge Mode can select one record from a generated collection, but players cannot discover or move among the other records in the browser. Loading a generated review pack currently also requires developer-console globals.

## What Changes

- Preserve all validated collection entries when a challenge source is loaded.
- Render Previous, Next, and directly clickable one-based puzzle-number controls.
- Mark the active puzzle, disable unavailable boundaries, and start a fresh session when selection changes.
- Accept a same-origin challenge source and initial index/id from URL query parameters while retaining existing window-global configuration.
- Keep standalone records usable as a one-puzzle collection.

## Impact

- Affected spec: `challenge-mode`
- Affected code: challenge loading, browser controller, game configuration, styles, and tests
- Compatibility: existing standalone sources and `WOOD_BLOCK_CHALLENGE_*` globals continue to work.
