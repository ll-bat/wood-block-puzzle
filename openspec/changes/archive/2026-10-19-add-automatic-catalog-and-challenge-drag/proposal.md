# Change: Add Automatic Puzzle Catalog and Challenge Drag Interaction

## Why

Generated collections currently require an explicit output path and Challenge URL. Challenge play also uses select-then-click interaction rather than the existing game's smooth drag, hover, placement, and line-clear feedback.

## What Changes

- Add a conventional `public/puzzles` directory and a deterministic server catalog endpoint that discovers every JSON file below it.
- Make the generation command write content-addressed collection files into that directory when `--output` is omitted.
- Make Challenge Mode load the automatic catalog by default while retaining explicit source overrides.
- Add pointer drag/drop for all `core-25/v1` shapes, legal/invalid board hover feedback, placement animation, and Relax-style line-clear animation.
- Keep the exact Challenge session authoritative and preserve click/keyboard placement as a fallback.

## Impact

- Affected specs: `challenge-mode`, `puzzle-records`
- New spec: `puzzle-catalog`
- Affected code: server catalog discovery, generator output, challenge loading/controller, styles, tests, and documentation
