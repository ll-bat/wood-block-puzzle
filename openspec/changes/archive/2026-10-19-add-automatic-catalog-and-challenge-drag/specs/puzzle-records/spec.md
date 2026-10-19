# puzzle-records Delta

## MODIFIED Requirements

### Requirement: Offline generation command
The offline Node.js generation command SHALL accept generation and filter options plus tray-search width and repeatable or comma-separated required-mechanism options. By default it SHALL create `public/puzzles` and write one collection JSON document to a deterministic content-addressed filename there. An explicit output path SHALL override that destination. It SHALL report concise terminal and tray-workload statistics separately and exit nonzero with a useful error for invalid options or exhausted generation.

#### Scenario: Generate into the default catalog
- **WHEN** the command succeeds without an explicit output path
- **THEN** it writes the requested collection beneath `public/puzzles` and reports that path

#### Scenario: Generate a targeted collection file
- **WHEN** the command is invoked with a valid explicit output path and targeting options
- **THEN** it writes the requested eligible records and reports tray evaluations and categorized rejections

#### Scenario: Reject an unsupported mechanism
- **WHEN** the command receives an unknown required mechanism
- **THEN** it exits nonzero before candidate generation
