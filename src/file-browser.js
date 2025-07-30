/**
 * File Browser entry point
 * Exports the FileBrowserManager for use in the file browser example
 */

import { FileBrowserManager } from './components/browser/FileBrowserManager';
import { BrowserUIManager } from './components/viewer/BrowserUIManager';

// Export the FileBrowserManager class for direct use
export { FileBrowserManager, BrowserUIManager };

// Also expose to window object for backwards compatibility
if (typeof window !== 'undefined') {
    window.FileBrowserManager = FileBrowserManager;
    window.BrowserUIManager = BrowserUIManager;
}
