# challenge-appearance Specification

## ADDED Requirements

### Requirement: Coordinated selectable themes
The browser SHALL render board wells, occupied board cells, tray cubes, drag cubes, and clear overlays from one coordinated visual palette. Challenge Mode SHALL offer at least three labeled palette choices below its controls, apply a choice immediately, and restore the saved choice on reload.

#### Scenario: Choose a cube style
- **WHEN** the player selects a different style from the Challenge theme picker
- **THEN** the board and cubes change together and the same style is restored after reload

### Requirement: Tactile board presentation
The browser SHALL visually distinguish recessed empty wells from dimensional occupied cubes and SHALL place the 8x8 grid within a bordered, slightly rounded board frame without changing board geometry or interaction anchors.

#### Scenario: Render a challenge board
- **WHEN** Challenge Mode draws a validated puzzle
- **THEN** all 64 authoritative cells remain aligned inside the decorative frame

### Requirement: Varied authoritative clear feedback
Line clearing SHALL use multiple short visual variants and MAY stagger cells within a completed line. Effects SHALL animate only cells identified by the authoritative transition, SHALL not determine game state, and SHALL provide a reduced-motion treatment.

#### Scenario: Clear completed lines
- **WHEN** a placement transition identifies completed row or column cells
- **THEN** those cells receive varied staggered effects while the final board remains `boardAfter`
