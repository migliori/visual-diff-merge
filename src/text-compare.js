/**
 * Text Comparison Entry Point
 * Entry point for text-compare.html example
 */

import { TextCompareManager } from './components/browser/TextCompareManager';
import { EndpointDiscovery } from './utils/EndpointDiscovery';

// Initialize endpoint discovery as a global instance for reuse
window.vdmEndpointDiscovery = EndpointDiscovery.getInstance();

// Export TextCompareManager to global scope
window.TextCompareManager = TextCompareManager;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Create the manager instance
    const manager = new TextCompareManager();

    // Initialize the manager (async operation)
    await manager.initialize();

    // Store in global window object after initialization is complete
    window.textCompareManager = manager;
});
