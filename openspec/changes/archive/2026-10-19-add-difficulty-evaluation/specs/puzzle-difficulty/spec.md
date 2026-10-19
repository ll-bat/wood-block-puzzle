## ADDED Requirements

### Requirement: Exact deterministic difficulty features
Difficulty analysis SHALL accept a valid solvable puzzle and deterministically report legal, winning, losing, immediate-dead-end, and delayed-losing first-move counts; winning-first-move ratio in integer basis points; distinct and viable shape-order counts; initially blocked tray-instance count; and the minimum number of cleared lines over any complete solution. It SHALL reject an unsolvable puzzle rather than assign it a difficulty.

#### Scenario: Analyze first-move risk
- **WHEN** a solvable puzzle has both winning and losing legal first moves
- **THEN** the reported counts and basis-point ratio exactly match exhaustive solver classification

#### Scenario: Identify a delayed failure
- **WHEN** a losing first move leaves at least one legal second move but no complete solution
- **THEN** it contributes to the delayed-losing count rather than the immediate-dead-end count

#### Scenario: Measure required clearing
- **WHEN** every complete solution clears at least one row or column
- **THEN** the minimum cleared-line count is positive

#### Scenario: Reject an unsolvable puzzle
- **WHEN** difficulty analysis receives a puzzle with no complete solution
- **THEN** it rejects the puzzle without assigning a tier

### Requirement: Explainable casual move heuristic
The preliminary casual model SHALL rank every legal first move by immediate cleared-line count followed by remaining legal second-move count. It SHALL report how many moves tie for the best heuristic value and how many of those best moves are solver-classified as losing.

#### Scenario: Detect a misleading attractive move
- **WHEN** a losing first move ties for the highest heuristic value
- **THEN** it is counted as a misleading heuristic-best move

#### Scenario: Preserve solver truth
- **WHEN** the heuristic prefers a losing move
- **THEN** the move remains classified as losing and the heuristic does not affect solvability

### Requirement: Versioned preliminary score and tier
Difficulty evaluation SHALL use the documented `casual-v1` integer scoring model to produce a non-negative score, an `easy`, `medium`, or `hard` tier, and stable reason codes from the exact features. The same puzzle and model version SHALL always produce identical output.

#### Scenario: Repeat difficulty evaluation
- **WHEN** the same puzzle is evaluated twice
- **THEN** its model version, metrics, score, tier, and reasons are identical

#### Scenario: Avoid solution-count-only classification
- **WHEN** two puzzles have the same logical solution count but different decision-risk features
- **THEN** the model evaluates their recorded features independently rather than deriving the tier from solution count alone

### Requirement: Difficulty target matching
Generation SHALL support target values `any`, `easy`, `medium`, and `hard`. `any` SHALL accept every solvable puzzle that passes non-difficulty filters; a named tier SHALL accept only a puzzle assigned exactly that tier by the configured model.

#### Scenario: Generate an unrestricted candidate
- **WHEN** the target is `any`
- **THEN** the candidate is not rejected because of its assigned tier

#### Scenario: Reject a tier mismatch
- **WHEN** a solvable candidate's assigned tier differs from the named target
- **THEN** generation counts a difficulty rejection and does not add the candidate
