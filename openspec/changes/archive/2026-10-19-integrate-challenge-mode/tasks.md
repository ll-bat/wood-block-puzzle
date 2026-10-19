## 1. Challenge Loading

- [x] 1.1 Implement standalone and collection record selection by index or id with strict validation.
- [x] 1.2 Implement injected-fetch URL loading and useful load errors.
- [x] 1.3 Add standalone, collection, selection, malformed-data, missing-id, and fetch-failure tests.

## 2. Authoritative Session

- [x] 2.1 Implement immutable-input session initialization, legal placement, index consumption, and pure transition history.
- [x] 2.2 Implement active, won, and stuck-lost outcomes plus exact reset behavior.
- [x] 2.3 Implement non-mutating stored-witness diagnostic replay.
- [x] 2.4 Add legal, illegal, duplicate, alternate-solution, terminal, reset, clearing, and replay tests.

## 3. Browser Challenge Mode

- [x] 3.1 Add the Challenge game constant, menu entry, game dispatch, and default/injected source selection.
- [x] 3.2 Implement existing-layout board rendering and catalog-driven three-piece tray rendering.
- [x] 3.3 Implement pointer/keyboard piece selection, anchor placement, used state, feedback, win/loss status, and reset.
- [x] 3.4 Implement timed stored-solution display with play disabled during diagnostics.
- [x] 3.5 Add focused adapter tests for board synchronization and all-catalog shape rendering.

## 4. Starter Challenge and Verification

- [x] 4.1 Add one bundled starter record and validate it through the production loader in tests.
- [x] 4.2 Add Challenge Mode styles without changing existing mode behavior.
- [x] 4.3 Export reusable challenge APIs and run all tests, strict OpenSpec validation, browser build, generator build, standalone bundle, and starter-asset smoke checks.
