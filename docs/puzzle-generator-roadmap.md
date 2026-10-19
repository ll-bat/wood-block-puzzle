# Wood Block Puzzle Challenge Generator Roadmap

## Objective

Build a reliable, configurable system that generates varied, challenging, and provably solvable three-shape scenarios for the 8x8 Wood Block Puzzle game.

The implementation will proceed as a sequence of independently reviewable OpenSpec changes. Completed changes will be archived into the project's durable specifications before dependent work begins.

## Agreed Rules and Scope

- The board contains 8 rows and 8 columns.
- A challenge begins in a stable state with no completed row or column.
- The tray contains exactly three shapes and may contain duplicates.
- Shapes have fixed orientations; players cannot rotate or reflect them.
- Every supported shape is edge-connected.
- A shape may initially have no legal placement if another placement can create room for it.
- Completed rows and columns are detected after every placement and cleared simultaneously.
- A challenge is solved after all three shape instances are legally placed.
- Initial difficulty classification targets casual players.
- Whole-puzzle rotations and reflections are equivalent for exact duplicate detection.

## Shape Catalog

The initial `CORE_25` catalog contains:

- One single-cell shape.
- Horizontal and vertical straight lines of lengths 2, 3, 4, and 5.
- Solid 2x2 and 3x3 squares.
- Solid 2x3 and 3x2 rectangles.
- All four fixed orientations of the three-cell corner.
- All four fixed orientations of the five-cell large corner.
- All four fixed orientations of the four-cell T shape.

Catalog changes will be versioned so stored challenges remain reproducible.

## Architecture

The feature is divided into three boundaries:

1. A pure puzzle domain shared by browser and Node.js code.
2. Offline generation and analysis tools that depend on the pure domain.
3. An integration adapter that presents stored challenges through the existing browser game.

The exact solver is the correctness oracle for every generation strategy. Difficulty evaluation is a separate concern and will be calibrated iteratively.

## Milestones

### 1. Introduce Puzzle Core

OpenSpec change: `introduce-puzzle-core`

- Define and validate `CORE_25`.
- Introduce a compact 64-cell board representation.
- Precompute fixed-orientation placements.
- Implement pure legality, placement, stability, and simultaneous-clear behavior.
- Establish automated rule and catalog tests.

Exit criterion: the domain can deterministically apply any legal placement without using DOM or UI state.

### 2. Add Exact Puzzle Solver

Planned OpenSpec change: `add-exact-puzzle-solver`

- Search every legal order and placement for a three-shape tray.
- Handle duplicate shapes without duplicate logical branches.
- Memoize equivalent subproblems.
- Return a complete solution witness and intermediate board states.
- Classify legal and winning first moves.

Exit criterion: the solver proves solvability or unsolvability for test scenarios and supplies a replayable witness.

### 3. Add Baseline Generator

Planned OpenSpec change: `add-baseline-generator`

- Produce stable, gameplay-derived candidate boards.
- Sample three-shape trays with deterministic seeds.
- Filter candidates through the exact solver.
- Define a versioned puzzle JSON representation.
- Provide an offline generation command and operational statistics.

Exit criterion: a deterministic command produces a requested number of valid, solvable challenge records.

### 4. Add Difficulty Evaluation and Deduplication

Planned OpenSpec change: `add-difficulty-evaluation`

- Measure branching, winning-move ratios, order dependence, required clears, initially blocked shapes, and delayed failures.
- Evaluate simple casual-player heuristics and misleading moves.
- Assign preliminary easy, medium, and hard tiers.
- Canonicalize whole-puzzle symmetries and reject exact duplicates.
- Add basic near-duplicate and board-quality filters.

Exit criterion: generated puzzles can be filtered by a documented, reproducible preliminary difficulty model and exact duplicates are removed.

### 5. Integrate Challenge Mode

Planned OpenSpec change: `integrate-challenge-mode`

- Load versioned challenge records.
- Render their board and fixed tray through the existing browser game.
- Use challenge-specific success and failure conditions.
- Verify browser transitions against the pure rules engine.
- Support solution replay or equivalent diagnostic output.

Exit criterion: a player can load and complete a stored generated challenge in the existing application.

### 6. Add Advanced Generation and Calibration

Planned OpenSpec change: `add-advanced-generation`

- Add guided mutation and heuristic search where baseline rejection sampling is insufficient.
- Target specific reasoning mechanisms without admitting easier unintended solutions.
- Improve diversity and near-duplicate detection.
- Parallelize generation if measurements justify it.
- Record casual-player outcomes and recalibrate difficulty thresholds.

Exit criterion: the generator efficiently supplies varied puzzles across target difficulty tiers, and recorded player outcomes can be compared with predicted difficulty.

## Success Criteria

- Every accepted puzzle is stable, legal, and accompanied by a verified solution witness.
- Puzzle generation is deterministic when given the same versions, configuration, and seed.
- Trivial and duplicate puzzles can be filtered without compromising solvability guarantees.
- The system can generate collections at useful scale.
- Difficulty labels increasingly correlate with casual-player completion and error data.

## Deferred Decisions

- Final difficulty thresholds and weights.
- Whether advanced generation needs simulated annealing, quality-diversity search, constraint solving, or a mixture.
- Final proportions of gameplay-derived and constructed boards.
- Performance optimizations beyond measurements from the baseline implementation.
