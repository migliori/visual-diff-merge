/**
 * File Browser entry point
 * Exports the FileBrowserManager for use in the file browser example
 */

import { FileBrowserManager } from './components/browser/FileBrowserManager';

// Export the FileBrowserManager class for direct use
export { FileBrowserManager };

// Also expose to window object for backwards compatibility
if (typeof window !== 'undefined') {
    window.FileBrowserManager = FileBrowserManager;
}
