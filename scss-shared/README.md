# SCSS Shared Foundation

This directory contains shared SCSS resources used across the application, diff-viewer, and documentation.

## Structure

- `index.scss` - Main entry point that forwards all shared resources
- `abstracts/` - Contains abstractions (variables, functions, mixins)
  - `_color-system.scss` - Color utilities, functions, and mixins
  - `_variables.scss` - Shared variables for colors, spacing, etc.
  - `_utilities.scss` - Common utility mixins and functions

## Usage

### Application (src/scss)

The application files in `src/scss/abstracts/` forward these shared resources.

### Examples

Example styles import the shared foundation:

```scss
@use '../../scss-shared' as shared;
@use '../../scss-shared/abstracts/variables' as vars;
@use '../../scss-shared/abstracts/color-system' as colors;
```

### Documentation

Documentation styles also import the shared foundation:

```scss
@use '../../scss-shared' as shared;
@use '../../scss-shared/abstracts/variables' as vars;
@use '../../scss-shared/abstracts/color-system' as colors;
```

## Compilation

- Main app styles are compiled via webpack
- Examples and docs are compiled via `scripts/compile-scss.js`
- All imports are resolved from the project root
