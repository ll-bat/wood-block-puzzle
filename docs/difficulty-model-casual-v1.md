# Preliminary Difficulty Model: `casual-v1`

## Status

`casual-v1` is a deterministic calibration hypothesis for casual players. It is useful for filtering, comparison, and data collection, but it has not yet been validated against player outcomes. A later calibration that changes weights or boundaries must use a new model version.

Solvability is always decided independently by the exact solver. Logical solution count is not an input to this score.

## Exact Metrics

- `legalFirstMoveCount`: distinct legal first placements, collapsing interchangeable duplicate shapes.
- `winningFirstMoveCount`: first moves with at least one complete continuation.
- `losingFirstMoveCount`: legal first moves without a complete continuation.
- `immediateDeadEndFirstMoveCount`: losing first moves after which no second placement is legal.
- `delayedLosingFirstMoveCount`: losing first moves that still allow at least one second placement.
- `winningFirstMoveRatioBasisPoints`: `floor(winning * 10000 / legal)`.
- `distinctShapeOrderCount`: distinct identifier permutations of the tray.
- `viableShapeOrderCount`: distinct identifier orders with at least one solution.
- `initiallyBlockedShapeCount`: tray instances with no legal placement on the initial board.
- `minimumClearedLineCount`: minimum total rows and columns cleared by any complete solution.
- `heuristicBestMoveCount`: first moves tied under the casual heuristic.
- `misleadingHeuristicBestMoveCount`: heuristic-best moves that are actually losing.

The casual heuristic first maximizes lines cleared immediately, then maximizes the number of legal second moves. It is intentionally simple and is only one feature of the model.

## Score

| Condition | Points | Reason code |
|---|---:|---|
| Winning ratio ≤ 10% | +4 | `VERY_FEW_WINNING_FIRST_MOVES` |
| Winning ratio ≤ 25% | +3 | `FEW_WINNING_FIRST_MOVES` |
| Winning ratio ≤ 50% | +2 | `MINORITY_WINNING_FIRST_MOVES` |
| Winning ratio below 100% | +1 | `SOME_LOSING_FIRST_MOVES` |
| Exactly one viable order when multiple orders exist | +2 | `SINGLE_VIABLE_ORDER` |
| Some, but not all, orders viable | +1 | `RESTRICTED_SHAPE_ORDER` |
| Every solution must clear at least one line | +2 | `CLEAR_REQUIRED` |
| At least one tray instance initially blocked | +2 | `SHAPE_INITIALLY_BLOCKED` |
| At least one delayed losing first move | +1 | `DELAYED_FAILURES` |
| At least one heuristic-best move is losing | +2 | `MISLEADING_BEST_MOVE` |
| Three or fewer legal first moves and score is positive | −1 | `LOW_CHOICE_OBVIOUSNESS_REDUCTION` |

Only the strongest winning-ratio row applies. All other applicable rows accumulate. The final score cannot become negative.

## Tiers

| Tier | Score |
|---|---:|
| Easy | 0–3 |
| Medium | 4–7 |
| Hard | 8 or more |

The model stores its raw metrics and reason codes with each generated puzzle so future calibration can be compared without reconstructing why the old label was assigned.
