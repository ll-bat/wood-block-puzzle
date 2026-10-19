# Design

## Validated collection snapshot

The loader will return the selected challenge together with an immutable array of every validated entry. Collection validation and record deserialization happen once at load time. The browser controller switches among these in-memory entries without refetching or trusting raw JSON.

## Browser navigation

The Challenge panel will show a position label, Previous/Next buttons, and a scrollable grid of one-based number buttons. The active button uses `aria-current`; Previous and Next are disabled at the collection boundaries. A standalone record produces one active number with both directional buttons disabled.

Selecting another puzzle cancels replay, clears piece selection and attempt counters, constructs a fresh authoritative session, redraws board and tray, and updates navigation. It does not record an unfinished attempt as a loss.

## Source configuration

Existing `window.WOOD_BLOCK_CHALLENGE_SOURCE` and `window.WOOD_BLOCK_CHALLENGE_SELECTOR` values retain precedence. When globals are absent, `challenge`, `challengeIndex`, and `challengeId` URL parameters configure the source and initial selection. `challengeIndex` is zero-based to match the loader API; the UI remains one-based for players.
