/**
 * URL Comparison Entry Point
 * Entry point for url-compare.html example
 */

import { UrlCompareManager } from './components/browser/UrlCompareManager';
import { EndpointDiscovery } from './utils/EndpointDiscovery';

// Initialize endpoint discovery as a global instance for reuse
window.vdmEndpointDiscovery = EndpointDiscovery.getInstance();

// Export UrlCompareManager to global scope
window.UrlCompareManager = UrlCompareManager;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Create the manager instance
    const manager = new UrlCompareManager();

    // Initialize the manager (async operation)
    await manager.initialize();

    // Store in global window object after initialization is complete
    window.urlCompareManager = manager;
});
