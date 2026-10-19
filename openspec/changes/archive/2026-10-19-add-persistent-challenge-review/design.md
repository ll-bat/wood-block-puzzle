# Design

Generated puzzle files remain immutable because their names and contents are deterministic generation artifacts and because their existing `difficulty` field contains algorithmic metrics. Human review state is stored in `data/challenge-progress.json`, keyed by stable puzzle id, with `solved` and `manualDifficulty` fields.

The catalog endpoint synchronizes missing entries to `{ solved: false, manualDifficulty: "easy" }`. A JSON PATCH endpoint accepts a puzzle id plus a partial review update, rejects unknown ids and invalid values, and replaces the sidecar through a same-directory temporary file and rename.

Challenge Mode keeps review state separately from immutable validated puzzle records. Its filter maps visible controls to original collection indices, so numbers stay stable. Winning persists solved state before scheduling a guarded auto-advance to the next puzzle in the active filter.

