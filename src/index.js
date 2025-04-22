import { DiffViewer } from './components/DiffViewer';
import { ResourceLoader } from './utils/ResourceLoader';
import availableThemes from './data/highlightjs-themes.json';
import { ThemeManager } from './components/ThemeManager';
import { Debug } from './utils/Debug';
import { ConfigUtils } from './utils/ConfigUtils';
import { DOMUtils } from './utils/DOMUtils';
import Selectors from './constants/Selectors';
import { BrowserUIManager } from './components/viewer/BrowserUIManager';
import { EndpointDiscovery } from './utils/EndpointDiscovery';
import { LoaderManager } from './utils/LoaderManager';
import { TranslationManager } from './utils/TranslationManager';
import AlertManager from './utils/AlertManager';
import { DiffConfigManager } from './utils/DiffConfigManager';

// Module-level singleton instance
let browserUIManagerInstance = null;

// Initialize endpoint discovery early
const endpointDiscovery = EndpointDiscovery.getInstance();

// Add copyright link to forms with vdm-form class
function addCopyrightLink() {
    // Find all forms with the vdm-form class
    const forms = document.querySelectorAll('.vdm-form');

    forms.forEach(form => {
        // Check if the copyright link already exists to prevent duplicates
        const existingLink = form.parentNode.querySelector('.vdm-copyright-link');
        if (existingLink) return;

        // Create the copyright link element
        const linkContainer = document.createElement('div');
        linkContainer.className = 'vdm-copyright-link';
        linkContainer.style.cssText = 'text-align: right; font-size: 11px; margin-top: 4px; opacity: 0.7;';

        // Create the actual link
        linkContainer.innerHTML = '<a href="https://visual-diff-merge.miglisoft.com/" rel="noopener" target="_blank" style="text-decoration: none; color: inherit;">Powered by Visual-Diff-Merge</a>';

        // Insert the link after the form
        form.parentNode.insertBefore(linkContainer, form.nextSibling);
    });
}

// Run the function when DOM is loaded
document.addEventListener('DOMContentLoaded', addCopyrightLink);

// Also run it when the window loads (for dynamically created forms)
window.addEventListener('load', addCopyrightLink);

window.enableDiffViewer = async function () {
    // Initialize debug with configured log level
    const debug = window.diffConfig?.debug || false;
    const logLevel = window.diffConfig?.logLevel || 1;
    Debug.initialize(debug, '[DiffViewer]', logLevel);

    // Initialize centralized loader management
    const loaderManager = LoaderManager.getInstance();

    const translationManager = TranslationManager.getInstance();

    // Run the copyright link function again to catch any dynamically added forms
    addCopyrightLink();

    // Initialize translation manager if needed and if config contains translations
    if (window.diffConfig?.translations && !translationManager.isInitialized()) {
        const configLang = window.diffConfig.lang || 'en';
        Debug.log(`Initializing TranslationManager with language: ${configLang}`, null, 2);
        translationManager.initialize(configLang, window.diffConfig.translations);
    }

    // Get loading message from translations or use default
    const initialMessage = translationManager.get('loadingDiff', 'Loading diff...');

    // Try to adopt any early loader that might exist from URL/file components
    // This ensures a smooth transition from early loading to main app loading
    const mainLoaderId = loaderManager.adoptEarlyLoader(initialMessage);

    try {
        // PHASE 1: PREPARATION - level 1 log (phase boundary)
        Debug.log('INITIALIZATION - PHASE 1: PREPARATION', null, 1);

        loaderManager.updateLoaderMessage(mainLoaderId, translationManager.get('loadingContent', 'Loading content...'));

        // Check for identical files first
        if (window.diffConfig?.isIdentical) {
            // Get message from translations
            const message = translationManager.get('filesIdenticalMessage', 'The files are identical. No differences found.');
            DOMUtils.showMessage(Selectors.DIFF.CONTENT_WRAPPER.name(), message, 'info');

            // Hide the loader since we're done
            loaderManager.hideMainLoader(mainLoaderId);

            return;
        }

        // Make sure serverSaveEnabled is explicitly set in the diffConfig
        // This ensures the BrowserUIManager can access it before creating UI controls
        if (window.diffConfig) {
            // If serverSaveEnabled is undefined, explicitly set it to false
            if (typeof window.diffConfig.serverSaveEnabled === 'undefined') {
                window.diffConfig.serverSaveEnabled = false;
                Debug.log('Setting default serverSaveEnabled=false in diffConfig', null, 2);
            } else {
                // Ensure it's a boolean value, not a string
                window.diffConfig.serverSaveEnabled = !!window.diffConfig.serverSaveEnabled;
                Debug.log(`Found serverSaveEnabled=${window.diffConfig.serverSaveEnabled} in diffConfig`, null, 2);
            }
        }

        // Discover API endpoint early in the initialization process
        try {
            loaderManager.updateLoaderMessage(mainLoaderId, translationManager.get('discoveringEndpoints', 'Discovering API endpoints...'));
            const apiEndpoint = await endpointDiscovery.getEndpoint();
            Debug.log('API endpoint discovered', apiEndpoint, 2);

            // Update diffConfig with discovered endpoint
            if (window.diffConfig && !window.diffConfig.apiEndpoint) {
                window.diffConfig.apiEndpoint = apiEndpoint;
            }
        } catch (error) {
            Debug.warn('API endpoint discovery failed, using fallbacks', error, 1);
        }

        // Check for identical files first
        if (window.diffConfig?.isIdentical) {
            // Get message from translations
            const message = translationManager.get('filesIdenticalMessage', 'The files are identical. No differences found.');
            DOMUtils.showMessage(Selectors.DIFF.CONTENT_WRAPPER.name(), message, 'info');

            // Hide the loader since we're done
            loaderManager.hideMainLoader(mainLoaderId);

            return;
        }

        // Check if we already have an active instance and destroy it
        if (window.diffViewer) {
            Debug.log('Cleaning up previous instance', null, 1);
            loaderManager.updateLoaderMessage(mainLoaderId, translationManager.get('cleaningUpPrevious', 'Cleaning up previous instance...'));

            if (typeof window.diffViewer.destroy === 'function') {
                await window.diffViewer.destroy();
            }
            window.diffViewer = null;
        }

        // Clean up UI manager if it exists
        if (window.vdmBrowserUIManager) {
            Debug.log('Cleaning up browser UI manager', null, 1);
            if (typeof window.vdmBrowserUIManager.destroy === 'function') {
                window.vdmBrowserUIManager.destroy();
            }
            window.vdmBrowserUIManager = null;
        }

        // Level 1 log - overall initialization started
        Debug.log('INITIALIZATION - STARTING', null, 1);

        // Validate configuration
        loaderManager.updateLoaderMessage(mainLoaderId, translationManager.get('validatingConfig', 'Validating configuration...'));
        const validationResult = ConfigUtils.validateConfig(window.diffConfig);
        if (!validationResult.isValid) {
            Debug.error(validationResult.error);
            loaderManager.hideMainLoader(mainLoaderId);
            return;
        }

        // High-level summary of what we're loading
        Debug.log('CONFIGURATION SUMMARY', ConfigUtils.getConfigSummary(window.diffConfig), 1);

        // PHASE 2: SERVICES INITIALIZATION - level 1 log
        Debug.log('INITIALIZATION - PHASE 2: SERVICES', null, 1);
        loaderManager.updateLoaderMessage(mainLoaderId, translationManager.get('initializingServices', 'Initializing services...'));

        // Get saved theme preferences
        const themePrefs = ConfigUtils.getThemePreferences(window.diffConfig);

        // 1. Configure ResourceLoader WITHOUT theme loading
        const resourceLoader = ResourceLoader.getInstance();
        resourceLoader.configure({
            availableThemes: availableThemes,
            currentTheme: themePrefs.mode,
            currentThemeFamily: themePrefs.family,
            language: ConfigUtils.getFileExtension(window.diffConfig.filepath, 'php')
        });

        // 2. Initialize ThemeManager as the ONLY theme loader
        const themeManager = ThemeManager.getInstance();
        themeManager.initialize({
            theme: window.diffConfig.theme
        }, resourceLoader);

        // PHASE 2.5: UI PREPARATION - Generate required DOM elements first
        Debug.log('INITIALIZATION - PHASE 2.5: UI PREPARATION', null, 1);
        loaderManager.updateLoaderMessage(mainLoaderId, translationManager.get('preparingUI', 'Preparing UI elements...'));

        // Detect if we're in file browser mode - container wrapper exists but diff container doesn't
        const containerWrapper = document.getElementById(Selectors.CONTAINER.WRAPPER.name());
        const diffContainer = document.getElementById(Selectors.DIFF.CONTAINER.name());
        const isFileBrowser = containerWrapper && !diffContainer;

        // If in file browser mode, create UI elements BEFORE initializing DiffViewer
        if (isFileBrowser) {
            Debug.log('Creating browser UI elements before DiffViewer initialization', null, 1);

            // Create a temporary BrowserUIManager with config options
            const tempUIManager = new BrowserUIManager({
                options: window.diffConfig || {}
            });

            // Generate UI elements - container wrapper already exists from the PHP template
            tempUIManager.initialize();

            // Store reference and clean up later
            browserUIManagerInstance = tempUIManager;
            window.vdmBrowserUIManager = tempUIManager;

            // Wait a short time to ensure DOM elements are fully created (important!)
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        // PHASE 3: COMPONENT INITIALIZATION - level 1 log
        Debug.log('INITIALIZATION - PHASE 3: COMPONENTS', null, 1);
        loaderManager.updateLoaderMessage(mainLoaderId, translationManager.get('initializingComponents', 'Initializing components...'));

        // Now that DOM elements should exist, get the container - checking several times if needed
        let container = document.querySelector(Selectors.DIFF.VIEWER);
        let attempts = 0;
        const maxAttempts = 5;

        // If we're in file browser mode and container isn't found immediately, try a few times
        if (isFileBrowser) {
            while (!container && attempts < maxAttempts) {
                Debug.log(`Container element ${Selectors.DIFF.VIEWER} not found, attempt ${attempts + 1}/${maxAttempts}`, null, 2);
                await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms between attempts
                container = document.querySelector(Selectors.DIFF.VIEWER);
                attempts++;
            }
        }

        if (!container) {
            Debug.error(`Container element ${Selectors.DIFF.VIEWER} not found after ${attempts} attempts`);
            loaderManager.hideMainLoader(mainLoaderId);
            return;
        }

        // Show the container (hide loading indicator if it exists)
        const loadingElement = document.querySelector(Selectors.LOADER.MAIN);
        if (loadingElement) {
            loadingElement.style.display = 'none';
            Debug.log('Loading element hidden', null, 2);
        }

        if (container) {
            container.style.display = 'flex'; // Changed from 'block' to 'flex'
            Debug.log('Container element shown', null, 2);
        }

        // 3. Create DiffViewer with runtime properties and pass the mainLoaderId
        const diffViewer = new DiffViewer({
            // Runtime properties
            diffData: window.diffConfig.diffData,
            serverSaveEnabled: window.diffConfig.serverSaveEnabled || false,
            // SECURITY: Use only fileRefId and filenames, not server paths
            fileRefId: window.diffConfig.fileRefId || '',
            oldFileRefId: window.diffConfig.oldFileRefId || '',
            newFileName: window.diffConfig.newFileName || '',
            oldFileName: window.diffConfig.oldFileName || '',
            isIdentical: window.diffConfig.isIdentical || false,
            filepath: window.diffConfig.filepath,

            // Dependencies (not config values)
            resourceLoader: resourceLoader,
            themeManager: themeManager,
            endpointDiscovery: endpointDiscovery,

            // Pass the centralized loader management ID
            mainLoaderId: mainLoaderId
        });

        // Store reference
        window.diffViewer = diffViewer;

        // If we created a temporary UI manager, update it with the actual diffViewer instance
        if (isFileBrowser && browserUIManagerInstance) {
            browserUIManagerInstance.setDiffViewer(diffViewer);
            // Set the browserUIManager on the diffViewer to ensure proper bidirectional reference
            diffViewer.setBrowserUIManager(browserUIManagerInstance);
        }

        // PHASE 4: RESOURCE LOADING - level 1 log
        Debug.log('INITIALIZATION - PHASE 4: RESOURCES', null, 1);
        loaderManager.updateLoaderMessage(mainLoaderId, translationManager.get('loadingResources', 'Loading resources...'));

        // 4. Load core dependencies - syntax highlighter ONLY, no theme
        await resourceLoader.loadSyntaxHighlighterCore();

        // 5. Load theme ONCE through ThemeManager
        loaderManager.updateLoaderMessage(mainLoaderId, translationManager.get('loadingTheme', 'Loading theme...'));
        await themeManager.loadInitialTheme();

        // PHASE 5: UI INITIALIZATION - level 1 log
        Debug.log('INITIALIZATION - PHASE 5: UI', null, 1);
        loaderManager.updateLoaderMessage(mainLoaderId, translationManager.get('initializingUI', 'Initializing UI...'));

        // 7. Initialize UI after all resources are loaded
        await diffViewer.initialize();

        // Mark as loaded using DOMUtils
        const diffContainerElement = document.querySelector(Selectors.DIFF.CONTAINER);
        if (diffContainerElement) {
            diffContainerElement.classList.add(Selectors.STATUS.LOADED.name());
        }

        // PHASE 6: COMPLETION - level 1 log
        Debug.log('INITIALIZATION - COMPLETE', null, 1);

        // Hide the loader now that initialization is complete
        loaderManager.hideMainLoader(mainLoaderId);

        return diffViewer;
    } catch (error) {
        Debug.error('Error initializing diff viewer:', error);
        const viewerElement = document.querySelector(Selectors.DIFF.VIEWER);
        if (viewerElement) {
            // Use AlertManager for error display
            const alertManager = AlertManager.getInstance();

            // Get error message from translations if possible
            const errorTitle = translationManager.get('errorLoadingDiff', 'Error loading diff');
            const errorMessage = `
                <h4>${errorTitle}</h4>
                <p>${error instanceof Error ? error.message : String(error)}</p>
            `;

            const alertElement = alertManager.showError(errorMessage, {
                timeout: 0, // Don't auto-dismiss
                translate: false, // Message is already prepared with translations
                className: 'vdm-w-100' // Make alert fill the container width
            });

            // Clear the viewer and add the alert
            viewerElement.innerHTML = '';
            viewerElement.appendChild(alertElement);
            viewerElement.style.display = 'flex';
        }

        // Always hide the loader on error
        loaderManager.hideMainLoader(mainLoaderId);
    }
};

// Explicitly export the BrowserUIManager to the global window object
// This ensures it's available to external scripts like file-browser.js
window.BrowserUIManager = BrowserUIManager;

// Export the LoaderManager to the global window object so it can be used
// by components before the main app initializes
window.LoaderManager = LoaderManager;

// Make TranslationManager available globally
window.TranslationManager = TranslationManager;

// Make AlertManager available globally
window.AlertManager = AlertManager;

// Make DiffConfigManager available globally
window.DiffConfigManager = DiffConfigManager;

// Export components for module bundlers
export {
    DiffViewer,
    BrowserUIManager,
    EndpointDiscovery,
    LoaderManager,
    DiffConfigManager
};
