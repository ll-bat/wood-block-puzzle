# Design

## Folder-backed catalog

The conventional source directory is `public/puzzles`. The Node server recursively discovers regular `.json` files, sorts normalized relative paths lexicographically, parses every document, and returns a versioned catalog containing source path and document. Invalid JSON fails the whole request with the responsible path; no puzzle is silently omitted.

The browser validates each source using the existing standalone-record or collection-envelope validators, flattens entries in source-path then record order, and rejects duplicate puzzle ids. It never trusts server parsing as puzzle validation.

## Generator output

Without `--output`, the command creates `public/puzzles` and writes a deterministic filename containing difficulty, seed, count, and an FNV-1a fingerprint of the serialized collection. Different generated content receives another file; an identical rerun resolves to the same path. Explicit `--output` remains supported, and JSON is no longer sent to stdout by default.

## Authoritative drag interaction

Challenge tray buttons use Pointer Events. Pointer-down creates a full-board-scale ghost above the pointer. Pointer movement derives a normalized board anchor from actual DOM cell geometry and highlights every in-bounds shape cell as legal or invalid. Pointer-up calls `ChallengeSession.place`; the UI does not independently decide placement or clearing.

An accepted transition first renders `placedBoard` and applies the existing placement pulse. If rows or columns clear, the controller invokes the existing `BlockCrashAnimation` for the union of cleared cells and then renders authoritative `boardAfter`. Input remains disabled during this sequence. Switching, reset, or replay invalidates pending animation work.

Click and keyboard anchor placement remain available as an accessibility fallback. Pointer cancellation or a drop outside the board restores the piece without changing the session.

## Compatibility

Explicit query-string and window-global sources retain precedence. Standalone records and ordinary collection envelopes remain loadable. Relax and Build Up modes are unchanged.
