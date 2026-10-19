# puzzle-catalog Specification

## Purpose
TBD - created by archiving change add-automatic-catalog-and-challenge-drag. Update Purpose after archive.
## Requirements
### Requirement: Deterministic folder discovery
The application server SHALL recursively discover regular `.json` files under `public/puzzles`, order them by normalized relative path, parse every file, and return a versioned catalog containing each public source path and document. Missing or empty directories SHALL return an empty catalog. Invalid JSON or an unreadable discovered file SHALL fail the catalog request and identify its relative path.

#### Scenario: Discover several puzzle files
- **WHEN** nested puzzle JSON files exist below the catalog directory
- **THEN** the endpoint returns every document once in deterministic relative-path order

#### Scenario: Encounter malformed JSON
- **WHEN** any discovered JSON file cannot be parsed
- **THEN** the entire request fails with that file's relative path

### Requirement: Validated catalog aggregation
Challenge loading SHALL independently validate every catalog document as a supported standalone record or collection envelope, flatten entries in source order and record order, retain source provenance, and reject duplicate puzzle identifiers. An empty catalog SHALL produce a useful load error rather than an empty playable session.

#### Scenario: Aggregate valid sources
- **WHEN** a catalog contains valid standalone and collection documents
- **THEN** all validated records are available through one immutable Challenge collection

#### Scenario: Reject duplicate ids
- **WHEN** two catalog documents declare the same puzzle id
- **THEN** Challenge loading rejects the catalog as ambiguous

