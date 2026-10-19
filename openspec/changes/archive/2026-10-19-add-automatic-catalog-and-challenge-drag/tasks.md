## 1. Automatic Puzzle Catalog

- [x] 1.1 Implement recursive deterministic JSON discovery and a versioned server catalog endpoint.
- [x] 1.2 Validate and flatten catalog sources in the browser, rejecting invalid files and duplicate ids.
- [x] 1.3 Default Challenge Mode to the automatic catalog while preserving explicit source overrides.
- [x] 1.4 Add discovery, catalog loading, ordering, duplicate, and failure tests.

## 2. Generator Folder Output

- [x] 2.1 Implement deterministic content-addressed default filenames under `public/puzzles`.
- [x] 2.2 Preserve explicit output paths and update CLI help and terminal summaries.
- [x] 2.3 Add filename and default-output smoke tests.

## 3. Authoritative Challenge Drag UI

- [x] 3.1 Add pointer drag ghost and board-anchor calculation for every catalog shape.
- [x] 3.2 Add legal/invalid hover highlighting and snap-back cancellation without session mutation.
- [x] 3.3 Route valid drops through ChallengeSession and keep click/keyboard fallback.
- [x] 3.4 Animate placed cells and authoritative simultaneous clears while input is locked.
- [x] 3.5 Cancel pending drag/animation work on navigation, reset, and replay.

## 4. Verification and Documentation

- [x] 4.1 Document automatic generation, discovery, ordering, failures, and explicit overrides.
- [x] 4.2 Run unit tests, strict OpenSpec validation, all builds, generator/catalog smoke tests, and browser drag/navigation smoke tests.
