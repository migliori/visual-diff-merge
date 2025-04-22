/**
 * File Upload Entry Point
 * Entry point for file-upload.html example
 */

import { FileUploadManager } from './components/browser/FileUploadManager';
import { EndpointDiscovery } from './utils/EndpointDiscovery';

// Initialize endpoint discovery as a global instance for reuse
window.vdmEndpointDiscovery = EndpointDiscovery.getInstance();

// Export FileUploadManager to global scope
window.FileUploadManager = FileUploadManager;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.fileUploadManager = new FileUploadManager();
});
