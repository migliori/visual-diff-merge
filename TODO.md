# Example Use Cases for Visual-Diff-Merge

## Direct File Upload Interface
- Users upload two files directly through a web form
- Useful for comparing local files without server storage requirements

## Git Repository Integration
- Compare files between different commits/branches in a Git repository
- Allow users to specify repo URL, file path, and two references (commit hashes/tags)

## URL-based Comparison
- Input two URLs to raw file content (GitHub raw URLs, Gists, etc.)
- Tool fetches both files and compares them

## Clipboard/Text Input
- Two text areas where users can paste content to compare
- Useful for quick ad-hoc comparisons of snippets

## API Endpoint
- REST API accepting two file contents or references
- Enables integration with other tools and workflows

## Database Content Comparison
- Compare two revisions of content stored in a database
- Useful for CMS systems with content versioning

## Directory Diff Mode
- Compare entire directories and allow selection of specific files to diff
- Show a tree view of changes similar to what git clients provide

## IDE/Editor Integration
- Browser extension or plugin for code editors to send files directly to the diff tool
- "Compare with..." right-click menu option

## Revision History Viewer
- Time-based slider to compare a file at different points in its history
- Similar to GitHub's history view but with your merge capabilities

## Conflict Resolution Tool
- Focus on resolving merge conflicts from failed git merges
- Parse and visualize .orig conflict files
