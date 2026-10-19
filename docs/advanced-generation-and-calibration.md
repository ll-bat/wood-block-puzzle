# Targeted Generation and Difficulty Calibration

## Targeted generation

The generator can evaluate several independently sampled trays on each reachable gameplay-derived board:

```bash
npm run generate-puzzles -- \
  --count 100 \
  --seed 4242 \
  --difficulty hard \
  --tray-search-width 4 \
  --require-feature delayed-failure,misleading-best-move \
  --pretty
```

Supported reasoning mechanisms are:

- `clear-required`
- `initially-blocked`
- `order-restricted`
- `delayed-failure`
- `misleading-best-move`

All requested mechanisms must match exact difficulty metrics. Search never substitutes a convenient stored solution for exhaustive solver truth.

### Initial benchmark

The following local measurement used seed `4242`, six simulation batches, a hard target, 100 accepted puzzles, and a 2,000-board limit:

| Tray width | Boards attempted | Trays evaluated | Solvable trays | Wall time |
|---:|---:|---:|---:|---:|
| 1 | 741 | 736 | 490 | 1.74 s |
| 4 | 249 | 992 | 634 | 2.14 s |

Width four reduced required board candidates by about 66%, while increasing total wall time by about 23% because it performed more solver analyses. This is useful when board construction or rare mechanism targeting dominates, but width one remains the throughput-oriented default.

Worker parallelism is deferred. Current bounded synchronous runs are operationally adequate, and workers would require deterministic random-stream partitioning and merge ordering. `trayEvaluations` and `solvableTrayEvaluations` provide the workload evidence needed to revisit that decision.

## Generate and browse puzzle files

Without `--output`, the generator creates `public/puzzles` and writes a deterministic content-addressed filename such as:

```text
public/puzzles/puzzles-hard-seed-4242-count-100-c0a85950.json
```

Different generated content receives a different fingerprint. Repeating an identical generation resolves to the same path rather than creating duplicate catalog entries. Use `--output <path>` to override the destination or `--output -` for JSON on standard output.

Start the application, open `http://localhost:3000`, and select **Challenge**. No query parameter or developer-console configuration is required. The server recursively discovers every `.json` file beneath `public/puzzles`; Challenge validates all of them and combines their records into one Previous/Next/numbered catalog.

Files are ordered by normalized relative path, followed by their internal puzzle order. Malformed JSON, invalid records, and duplicate puzzle ids fail visibly with the responsible source instead of being silently skipped.

An explicit same-origin source remains available for diagnostics:

```text
http://localhost:3000/?challenge=/some-collection.json&challengeIndex=12
```

The optional index is zero-based, while buttons shown to players are one-based. `challengeId` selects an exact id. Existing `window.WOOD_BLOCK_CHALLENGE_SOURCE` and `window.WOOD_BLOCK_CHALLENGE_SELECTOR` values take precedence over URL parameters and the default catalog.

Challenge pieces can be dragged like Relax Mode pieces. The full-size ghost and board cells indicate whether the current anchor is legal. An accepted drop uses the exact rules-engine transition, pulses newly placed blocks, and uses the existing flying-block effect for every simultaneously cleared row and column. Click selection and keyboard board anchors remain available as a fallback.

## Anonymous outcome data

Calibration accepts a JSON array of outcome format `1`. Each observation contains only puzzle prediction and play-result fields:

```json
{
  "formatVersion": 1,
  "puzzleId": "puz-0000002a-000017",
  "modelVersion": "casual-v1",
  "predictedScore": 8,
  "predictedTier": "hard",
  "completed": false,
  "acceptedMoveCount": 2,
  "invalidAttemptCount": 1,
  "hintsUsed": 0,
  "durationSeconds": 47.5
}
```

Unknown fields are rejected, which prevents identifiers or unrelated telemetry from silently entering calibration artifacts.

When Challenge Mode plays a generated record containing difficulty metadata, it dispatches a local browser event after a win or stuck loss:

```js
window.addEventListener('wood-block-challenge-outcome', event => {
  // Store or submit event.detail only with the player's consent.
  console.log(event.detail);
});
```

The application does not transmit or persist these observations automatically.

Analyze outcomes without fitting a profile:

```bash
npm run calibrate-puzzles -- \
  --input examples/calibration-outcomes.example.json \
  --output calibration-report.json \
  --pretty
```

Fit learned easy/medium boundaries when enough data exists:

```bash
npm run calibrate-puzzles -- \
  --input casual-player-outcomes.json \
  --fit-profile \
  --min-samples 100 \
  --min-tier-samples 20 \
  --target-easy 8000 \
  --target-medium 5500 \
  --target-hard 3000 \
  --output calibration-profile.json \
  --pretty
```

A profile reclassifies an existing integer `casual-v1` score using learned boundaries. It does not alter raw puzzle metrics, feature weights, reason codes, or the historical tier stored in a puzzle record.

Calibration profile format `1` is a closed interchange format. Validation rejects unknown or missing fields, declared sample counts below the profile's own total or per-tier minima, and a loss value that does not match the declared target and observed completion rates. The dataset fingerprint can be independently verified only when the original outcome observations are available.
