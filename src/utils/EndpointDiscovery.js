import { Debug } from './Debug';
import { BaseSingleton } from './BaseSingleton';

/**
 * Utility for discovering API endpoints
 * Provides centralized access to API endpoints
 */
export class EndpointDiscovery extends BaseSingleton {
    // Singleton instance
    static #instance = null;

    // Cached endpoint URL
    #apiEndpoint = null;

    // Promise for ongoing discovery
    #discoveryPromise = null;

    /**
     * Get the singleton instance
     * @returns {EndpointDiscovery} The singleton instance
     */
    static getInstance() {
        if (!EndpointDiscovery.#instance) {
            EndpointDiscovery.#instance = new EndpointDiscovery();
        }
        return EndpointDiscovery.#instance;
    }

    /**
     * Discover the API endpoint URL
     * @returns {Promise<string>} Base API endpoint URL
     */
    async discoverEndpoint() {
        // Return cached endpoint if available
        if (this.#apiEndpoint) {
            Debug.log('EndpointDiscovery: Using cached API endpoint', this.#apiEndpoint, 2);
            return this.#apiEndpoint;
        }

        try {
            // First check window.diffConfig.apiEndpoint
            if (window.diffConfig?.apiEndpoint) {
                Debug.log('EndpointDiscovery: Using configured API endpoint', window.diffConfig.apiEndpoint, 2);
                this.#apiEndpoint = window.diffConfig.apiEndpoint;
                return this.#apiEndpoint;
            }

            // Try to determine endpoint based on script location
            const scriptEndpoint = this.#determineEndpointFromScript();
            if (scriptEndpoint) {
                Debug.log('EndpointDiscovery: Determined API endpoint from script location', scriptEndpoint, 2);
                this.#apiEndpoint = scriptEndpoint;
                return this.#apiEndpoint;
            }

            // Fall back to endpoint-config.php discovery
            Debug.log('EndpointDiscovery: Discovering API endpoint from endpoint-config.php', null, 2);

            // Generate URL to endpoint-config.php
            const configUrl = this.#getEndpointConfigUrl();

            Debug.log('EndpointDiscovery: Fetching from', configUrl, 2);

            // Fetch endpoint configuration
            const response = await fetch(configUrl);

            if (!response.ok) {
                throw new Error(`Failed to fetch endpoint config: ${response.statusText}`);
            }

            const data = await response.json();
            Debug.log('EndpointDiscovery: Endpoint discovery response', data, 2);

            // Check if we have a valid apiEndpoint in the response
            if (data?.apiEndpoint !== undefined) {
                this.#apiEndpoint = data.apiEndpoint;
                Debug.log('EndpointDiscovery: Successfully discovered API endpoint', this.#apiEndpoint, 1);
                return this.#apiEndpoint;
            } else {
                throw new Error('Invalid endpoint config response: apiEndpoint not found');
            }
        } catch (error) {
            Debug.log('EndpointDiscovery: Error discovering endpoint', error, 1);

            // Fall back to relative endpoint as a last resort
            this.#apiEndpoint = './api/';
            Debug.log('EndpointDiscovery: Using fallback endpoint', this.#apiEndpoint, 1);
            return this.#apiEndpoint;
        }
    }

    /**
     * Get endpoint URL with efficient caching
     * @param {string} [endpointName] Optional specific endpoint name (e.g., 'ajaxDiffMerge')
     * @returns {Promise<string>} API endpoint URL
     */
    async getEndpoint(endpointName) {
        // First get the base endpoint URL
        if (!this.#apiEndpoint) {
            // If a discovery is already in progress, return that promise
            if (this.#discoveryPromise) {
                await this.#discoveryPromise;
            } else {
                // Start a new discovery and cache the promise
                this.#discoveryPromise = this.discoverEndpoint();

                try {
                    // Wait for discovery to complete
                    await this.#discoveryPromise;
                } finally {
                    // Clear the discovery promise regardless of outcome
                    this.#discoveryPromise = null;
                }
            }
        }

        // Now we should have the base endpoint URL
        if (!endpointName) {
            // Return the base URL if no specific endpoint requested
            return this.#apiEndpoint;
        }

        // For specific endpoints, map the name to the appropriate file
        const endpointMap = {
            'ajaxDiffMerge': 'ajax-diff-merge.php',
            'diffProcessor': 'diff-processor.php',
            'getFileContent': 'get-file-content.php',
            'endpointsConfig': 'endpoint-config.php',  // <-- Changed to endpoint-config.php (singular)
            'endpoints': 'endpoints-config.php'        // <-- Keep original endpoints-config.php mapping
        };

        // Get the file name for the requested endpoint
        let fileName = endpointMap[endpointName];

        // If no mapping exists, use a default pattern
        if (!fileName) {
            // Convert camelCase to kebab-case with .php extension
            fileName = endpointName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + '.php';
        }

        // Ensure the base URL ends with a slash
        const baseUrl = this.#apiEndpoint.endsWith('/') ? this.#apiEndpoint : this.#apiEndpoint + '/';

        Debug.log(`EndpointDiscovery: Resolved ${endpointName} to endpoint`, baseUrl + fileName, 2);

        return baseUrl + fileName;
    }

    /**
     * Get a complete API URL for a specific endpoint file
     * @param {string} endpointFile Filename to append to the base URL
     * @returns {Promise<string>} Full API URL
     */
    async getApiUrl(endpointFile) {
        const baseUrl = await this.getEndpoint();
        return `${baseUrl}${endpointFile}`;
    }

    /**
     * Attempt to determine API endpoint based on script location
     * @private
     * @returns {string|null} Determined endpoint or null
     */
    #determineEndpointFromScript() {
        try {
            // Find our script tag
            const scripts = document.querySelectorAll('script');
            let scriptUrl = null;

            for (const script of scripts) {
                if (script.src && (
                    script.src.includes('diff-viewer.js') ||
                    script.src.includes('diff-viewer.min.js')
                )) {
                    scriptUrl = script.src;
                    break;
                }
            }

            if (!scriptUrl) {
                return null;
            }

            // Get the directory path by removing the filename
            let basePath = scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1);

            // If it's in a /dist/ directory, adjust to parent
            if (basePath.endsWith('/dist/')) {
                basePath = basePath.substring(0, basePath.length - 5);
            }

            // Append 'api/' to the base path
            return `${basePath}api/`;
        } catch (error) {
            Debug.log('EndpointDiscovery: Error determining endpoint from script', error, 2);
            return null;
        }
    }

    /**
     * Generate URL to endpoint-config.php
     * @private
     * @returns {string} URL to endpoint-config.php
     */
    #getEndpointConfigUrl() {
        // Try to use the base URL of the current page
        const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);

        // Assume endpoint-config.php is in the /api/ directory
        if (baseUrl.includes('/diff-viewer/')) {
            // If we're in diff-viewer, go up one level
            return `${baseUrl.substring(0, baseUrl.lastIndexOf('/diff-viewer/'))}api/endpoint-config.php`;
        } else {
            // Default case - look for api in the current directory
            return `${baseUrl}api/endpoint-config.php`;
        }
    }
}
