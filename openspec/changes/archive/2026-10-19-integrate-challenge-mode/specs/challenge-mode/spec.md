## ADDED Requirements

### Requirement: Validated challenge loading
Challenge Mode SHALL load a standalone puzzle record or one selected record from a collection envelope only after validating supported versions, board data, tray shapes, provenance, witness replay, and any difficulty metadata. A collection selection SHALL support deterministic index selection and exact puzzle-id selection. Invalid data, a failed request, or a missing selection SHALL produce a load error without starting a session.

#### Scenario: Load a standalone record
- **WHEN** a valid standalone record object is supplied
- **THEN** the loader returns that validated challenge

#### Scenario: Select a collection record by id
- **WHEN** a valid collection and one contained puzzle id are supplied
- **THEN** the loader returns exactly that validated puzzle

#### Scenario: Reject corrupted challenge data
- **WHEN** loaded challenge data fails record or collection validation
- **THEN** Challenge Mode reports an error and creates no playable session

### Requirement: Authoritative challenge session
A challenge session SHALL initialize from the record's board and three original tray indices. It SHALL accept a move only when the selected index remains unused and its fixed-orientation shape has a legal placement at the requested normalized anchor. Every accepted move SHALL use the pure rules engine's immediate simultaneous clearing transition, consume exactly that tray index, and leave the record and caller input unchanged.

#### Scenario: Place a selected shape
- **WHEN** an unused tray index is legally placed
- **THEN** the session returns the exact pure-engine transition, updates to `boardAfter`, and consumes only that index

#### Scenario: Reject an illegal placement
- **WHEN** a placement is out of bounds, overlaps the board, or uses an already consumed index
- **THEN** the session reports rejection without changing its board, history, remaining pieces, or status

#### Scenario: Place duplicate shapes independently
- **WHEN** two tray indices contain the same shape identifier
- **THEN** placing one index leaves the other duplicate available

### Requirement: Challenge completion and failure
The session SHALL report `won` immediately after all three tray indices have been legally placed. While pieces remain, it SHALL report `lost` only when no legal placement exists for any remaining index; otherwise it SHALL remain `active`. Terminal sessions SHALL reject further player moves until reset.

#### Scenario: Complete a challenge by another valid solution
- **WHEN** the player legally consumes all three indices in any successful order and anchors
- **THEN** the session reports `won` even when the moves differ from the stored witness

#### Scenario: Reach a stuck state
- **WHEN** an accepted move leaves remaining pieces and none has a legal placement
- **THEN** the session reports `lost`

#### Scenario: Reset a challenge
- **WHEN** a won, lost, or active session is reset
- **THEN** its initial board, three unused indices, empty move history, and `active` status are restored

### Requirement: Existing-layout challenge rendering
The browser SHALL expose Challenge in the game menu and SHALL render the validated initial board, three fixed tray pieces, used/selected states, feedback, and terminal status through the existing board and tray containers. It SHALL render shapes from `core-25/v1` catalog cells and SHALL redraw the board from the authoritative session after every accepted move. It SHALL NOT generate a replacement tray after the three challenge pieces are consumed.

#### Scenario: Start Challenge Mode
- **WHEN** the player selects Challenge and the configured source loads
- **THEN** the existing 8×8 layout displays the record board and exactly its three tray instances

#### Scenario: Select and place through the browser
- **WHEN** the player selects an unused piece and activates a legal board anchor
- **THEN** the browser renders the session's resulting board and marks that piece used

#### Scenario: Render any catalog shape
- **WHEN** a challenge tray contains any supported catalog identifier
- **THEN** its fixed cell arrangement is rendered without requiring a legacy figure mapping

### Requirement: Stored solution diagnostics
The session SHALL replay the stored solution from the initial board through the pure engine and return three verified transition frames without changing current player state. The browser SHALL provide controls to show these frames and to reset the playable challenge.

#### Scenario: Replay a stored solution
- **WHEN** solution diagnostics are requested
- **THEN** all three frames match the record witness and end after consuming all tray indices

#### Scenario: Preserve player state during diagnostic construction
- **WHEN** replay frames are requested from a partially played session
- **THEN** the session's board, remaining indices, history, and status are unchanged
