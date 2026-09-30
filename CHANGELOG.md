# Changelog — visual-diff-merge

All notable changes to this project will be documented in this file.

## [1.0.2] — 2026-09-30

### Fixed
- **Merge destination dropdown empty (detached node)**: `MergeUIController.populateMergeDestinations()` now re-resolves the live `#vdm-merge__destination-dropdown` node from the DOM before populating options. Previously the reference captured in `initialize()` could become detached when `BrowserUIManager.generateMergeControls()` (re)built the merge controls, so all destination options were written into a dead node and the dropdown rendered empty. Changing the merge destination was impossible; the default (`new`) still worked by accident.

## [1.0.1] — 2026-09-30

### Fixed
- Resilient autoloader for composer deployments (api).

## [1.0.0] — 2026-09-30

### Added
- `Config::loadArray()` and `Config::setConfigPath()` for composer integrations.
