# challenge-mode Delta

## MODIFIED Requirements

### Requirement: Validated challenge loading
Challenge Mode SHALL load a standalone puzzle record or a collection envelope only after validating supported versions, board data, tray shapes, provenance, witness replay, and any difficulty metadata. A loaded source SHALL expose an immutable snapshot of every validated entry and SHALL support deterministic initial index or exact puzzle-id selection. Invalid data, a failed request, or a missing selection SHALL produce a load error without starting a session.

#### Scenario: Load a standalone record
- **WHEN** a valid standalone record object is supplied
- **THEN** the loader returns that validated challenge as a one-entry source

#### Scenario: Select a collection record by id
- **WHEN** a valid collection and one contained puzzle id are supplied
- **THEN** the loader returns exactly that validated puzzle together with all validated collection entries

#### Scenario: Reject corrupted challenge data
- **WHEN** loaded challenge data fails record or collection validation
- **THEN** Challenge Mode reports an error and creates no playable session

### Requirement: Existing-layout challenge rendering
The browser SHALL expose Challenge in the game menu and SHALL render the validated initial board, three fixed tray pieces, used/selected states, feedback, and terminal status through the existing board and tray containers. For collection sources it SHALL render Previous, Next, and direct one-based puzzle-number controls, identify the active puzzle, disable directional controls at collection boundaries, and start a fresh authoritative session when selection changes. It SHALL render shapes from `core-25/v1` catalog cells and SHALL redraw the board from the authoritative session after every accepted move. It SHALL NOT generate a replacement tray after the three challenge pieces are consumed.

#### Scenario: Start Challenge Mode
- **WHEN** the player selects Challenge and the configured source loads
- **THEN** the existing 8×8 layout displays the selected record board and exactly its three tray instances

#### Scenario: Navigate a collection
- **WHEN** the player chooses Previous, Next, or a numbered puzzle
- **THEN** the browser activates that validated entry as a fresh session and updates navigation state

#### Scenario: Select and place through the browser
- **WHEN** the player selects an unused piece and activates a legal board anchor
- **THEN** the browser renders the session's resulting board and marks that piece used

#### Scenario: Render any catalog shape
- **WHEN** a challenge tray contains any supported catalog identifier
- **THEN** its fixed cell arrangement is rendered without requiring a legacy figure mapping

## ADDED Requirements

### Requirement: Browser source configuration
Challenge Mode SHALL retain support for explicit window-global source and selector configuration and SHALL otherwise accept a same-origin source plus optional initial zero-based index or exact id from URL query parameters. Invalid index parameters SHALL be ignored in favor of normal default selection, and explicit globals SHALL take precedence over URL configuration.

#### Scenario: Open a generated collection URL
- **WHEN** the page URL declares a challenge collection source without window-global overrides
- **THEN** selecting Challenge loads that collection and its configured or first puzzle
