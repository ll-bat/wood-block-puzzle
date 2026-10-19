# challenge-mode Delta

## MODIFIED Requirements

### Requirement: Browser source configuration
Challenge Mode SHALL load the automatic local puzzle catalog when no explicit source is configured. It SHALL retain support for explicit window-global source and selector configuration and SHALL otherwise accept a same-origin source plus optional initial zero-based index or exact id from URL query parameters. Invalid index parameters SHALL be ignored in favor of normal default selection, and explicit globals SHALL take precedence over URL configuration.

#### Scenario: Start without source configuration
- **WHEN** the player opens the application normally and selects Challenge
- **THEN** Challenge Mode loads every validated puzzle discovered in the default catalog

#### Scenario: Open an explicit generated collection URL
- **WHEN** the page URL declares a challenge collection source without window-global overrides
- **THEN** selecting Challenge loads that collection and its configured or first puzzle

### Requirement: Existing-layout challenge rendering
The browser SHALL expose Challenge in the game menu and SHALL render the validated initial board, three fixed tray pieces, used/selected states, feedback, and terminal status through the existing board and tray containers. For collection sources it SHALL render Previous, Next, and direct one-based puzzle-number controls, identify the active puzzle, disable directional controls at collection boundaries, and start a fresh authoritative session when selection changes. It SHALL render shapes from `core-25/v1` catalog cells and SHALL redraw the board from the authoritative session after every accepted move. It SHALL NOT generate a replacement tray after the three challenge pieces are consumed.

#### Scenario: Start Challenge Mode
- **WHEN** the player selects Challenge and the configured source loads
- **THEN** the existing 8×8 layout displays the selected record board and exactly its three tray instances

#### Scenario: Navigate a collection
- **WHEN** the player chooses Previous, Next, or a numbered puzzle
- **THEN** the browser activates that validated entry as a fresh session and updates navigation state

#### Scenario: Drag and place through the browser
- **WHEN** the player drags an unused piece over a legal normalized anchor and releases it
- **THEN** the browser submits that anchor to the authoritative session, consumes the piece, and renders its exact transition

#### Scenario: Render any catalog shape
- **WHEN** a challenge tray contains any supported catalog identifier
- **THEN** its fixed cell arrangement is rendered without requiring a legacy figure mapping

## ADDED Requirements

### Requirement: Drag preview and cancellation
Challenge Mode SHALL render a board-scale drag ghost and highlight in-bounds shape cells while a piece moves over the board. Legal anchors SHALL receive valid feedback and overlaps or invalid anchors SHALL receive invalid feedback. Pointer cancellation or release without a valid board anchor SHALL remove temporary visuals without mutating the Challenge session. Click selection plus keyboard-activatable anchors SHALL remain available.

#### Scenario: Hover a legal anchor
- **WHEN** a dragged shape fits at the pointer-derived anchor
- **THEN** its exact occupied cells are highlighted as a valid placement

#### Scenario: Cancel a drag
- **WHEN** dragging is cancelled or released away from a valid anchor
- **THEN** the ghost and hover cells disappear and the puzzle state is unchanged

### Requirement: Authoritative placement and clear animation
After an accepted drop, Challenge Mode SHALL temporarily lock placement input, render and animate the transition's `placedBoard`, animate the union of its completed rows and columns with the existing clearing effect, and finish on the transition's authoritative `boardAfter`. UI animation SHALL NOT independently determine or mutate cleared cells. Navigation, reset, or replay SHALL invalidate pending interaction work.

#### Scenario: Animate a simultaneous clear
- **WHEN** an accepted placement completes one or more rows and columns
- **THEN** every cell in their union animates once and the final rendered board equals authoritative `boardAfter`
