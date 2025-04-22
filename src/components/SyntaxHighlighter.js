// SyntaxHighlighter.js - Handles syntax highlighting for code
import { Debug } from '../utils/Debug';
import { ResourceLoader } from '../utils/ResourceLoader';
import { MergeContentFormatter } from '../utils/MergeContentFormatter';
import languageMap from '../data/highlightjs-languages.json';
import { DOMUtils } from '../utils/DOMUtils';
import Selectors from '../constants/Selectors';
import { TranslationManager } from '../utils/TranslationManager';
import { LoaderManager } from '../utils/LoaderManager';

import { ThemeManager } from './ThemeManager';

/**
 * Manages syntax highlighting functionality
 */
export class SyntaxHighlighter {
    /**
     * @param {DiffViewer} diffViewer - Parent DiffViewer component
     */
    constructor(diffViewer) {
        this.diffViewer = diffViewer;
        this.highlightJsLoaded = false;
        this.resourceLoader = ResourceLoader.getInstance();
        this.themeManager = ThemeManager.getInstance();
        this.language = 'plaintext'; // Default language

        // Get theme from ThemeManager instead of localStorage directly
        const currentTheme = this.themeManager.getCurrentTheme();
        this.theme = currentTheme.mode || 'light';

        Debug.log('SyntaxHighlighter: Initialized', null, 2);
    }

    /**
     * Initialize the highlighter with the language
     */
    async initialize() {
        // First, load highlight.js core
        await this.loadHighlightJs();

        // Only proceed with language setup if highlight.js loaded successfully
        if (this.highlightJsLoaded) {
            // Get filepath from runtimeProps
            const filepath = this.diffViewer.getRuntimeProps().filepath || '';

            // Set initial language using the prioritized logic
            await this.setLanguage(filepath);

            Debug.log('SyntaxHighlighter: Initialized with language:', this.language, 2);
        } else {
            Debug.warn('SyntaxHighlighter: Initialization incomplete - highlight.js failed to load', null, 2);
        }
    }

    /**
     * Load highlightjs and required language components
     */
    async loadHighlightJs() {
        try {
            Debug.log('SyntaxHighlighter: Loading highlight.js core', null, 2);

            // Use resource loader to load syntax highlighter core
            await this.diffViewer.resourceLoader.loadSyntaxHighlighterCore();

            this.highlightJsLoaded = true;
            Debug.log('SyntaxHighlighter: highlight.js loaded successfully', null, 2);
            return true;
        } catch (error) {
            Debug.error('SyntaxHighlighter: Failed to load highlight.js:', error, 2);
            return false;
        }
    }

    /**
     * Highlight all code elements in batches
     * @param {Element|Document} container - Container with code elements
     */
    highlightAll(container = document) {
        if (!this.highlightJsLoaded || !window.hljs) {
            Debug.warn('SyntaxHighlighter: Cannot highlight code - highlight.js not loaded', null, 2);
            return;
        }

        // Use DOMUtils.getElements for consistent element selection with error handling
        const elements = DOMUtils.getElements(
            `${Selectors.DIFF.LINE_CONTENT}:not(${Selectors.DIFF.LINE_CONTENT_EMPTY}):not(${Selectors.DIFF.LINE_PLACEHOLDER})`,
            container
        );

        if (!elements) {
            Debug.log('SyntaxHighlighter: No code elements found to highlight', null, 2);
            return;
        }

        const codeElements = Array.from(elements).filter(el => el.textContent.trim());
        Debug.log(`SyntaxHighlighter: Found ${codeElements.length} code elements to highlight`, null, 2);

        // Only show loader for large files (more than 100 elements)
        let loaderId = null;
        if (codeElements.length > 100) {
            // Get translation manager for loading message
            const translationManager = TranslationManager.getInstance();
            const loaderManager = LoaderManager.getInstance();
            const loadingMessage = translationManager.get('applyingSyntaxHighlighting', 'Applying syntax highlighting...');

            // Show loading indicator
            loaderId = loaderManager.showLoader(loadingMessage, {
                fullscreen: true,
                zIndex: 1000
            });

            Debug.log('SyntaxHighlighter: Showing loader for large file highlighting', null, 2);
        }

        // Small batch size for smoother UI updates
        const batchSize = 30;
        let index = 0;

        // Performance tracking
        const startTime = performance.now();

        // Function to process a batch
        const processBatch = () => {
            if (index >= codeElements.length) {
                // Hide loader if shown
                if (loaderId) {
                    const loaderManager = LoaderManager.getInstance();
                    loaderManager.hideLoader(loaderId);

                    // Log performance metrics
                    const endTime = performance.now();
                    const duration = endTime - startTime;
                    Debug.log(`SyntaxHighlighter: Highlighting complete for ${codeElements.length} elements in ${duration.toFixed(2)}ms`, null, 2);
                } else {
                    Debug.log('SyntaxHighlighter: Highlighting complete', null, 2);
                }
                return;
            }

            // Process next batch
            const end = Math.min(index + batchSize, codeElements.length);
            for (let i = index; i < end; i++) {
                this.highlightElement(codeElements[i]);
            }

            // Update loader message with progress if shown
            if (loaderId && index % (batchSize * 5) === 0) { // Update every 5 batches
                const loaderManager = LoaderManager.getInstance();
                const translationManager = TranslationManager.getInstance();
                const progress = Math.round((index / codeElements.length) * 100);
                const progressMessage = translationManager.get('applyingSyntaxHighlightingProgress',
                    'Applying syntax highlighting ({0}%)').replace('{0}', progress);

                loaderManager.updateLoaderMessage(loaderId, progressMessage);
            }

            // Move to next batch
            index = end;

            // Schedule next batch - use requestAnimationFrame for better performance
            requestAnimationFrame(() => {
                setTimeout(processBatch, 0);
            });
        };

        // Start batch processing
        processBatch();
    }

    /**
     * Apply syntax highlighting to a single element
     * @param {Element} element - Element to highlight
     * @param {boolean} withLineNumbers - Whether to add line numbers
     */
    highlightElement(element, withLineNumbers = false) {
        if (!this.highlightJsLoaded || !window.hljs || !element) return;

        try {
            // Use DOMUtils.toggleClass for consistent class manipulation
            if (!element.classList.contains(this.language)) {
                // Remove existing language classes first
                const languageClasses = element.className.split(' ')
                    .filter(cls => cls.startsWith('language-'));

                languageClasses.forEach(cls => {
                    element.classList.remove(cls);
                });

                // Add the correct language class
                element.classList.add(this.language);
            }

            // Use the MergeContentFormatter utility
            MergeContentFormatter.resetHighlighting(element);

            // Apply highlighting
            window.hljs.highlightElement(element);

            // Add line numbers if needed
            if (withLineNumbers && window.hljs.lineNumbersBlock) {
                window.hljs.lineNumbersBlock(element);
            }
        } catch (error) {
            Debug.error('SyntaxHighlighter: Error highlighting element:', error, 2);
        }
    }

    /**
     * Set the language for syntax highlighting
     * @param {string} filepath - File path to derive language from
     */
    async setLanguage(filepath) {
        // Get runtime properties
        const runtimeProps = this.diffViewer.getRuntimeProps();

        // Try to determine language using the prioritized logic
        let newLanguage = 'plaintext';
        let sourceUsed = 'default';

        // 1. Try to guess language from filepath if provided
        if (filepath && typeof filepath === 'string' && filepath.includes('.')) {
            const extension = filepath.split('.').pop().toLowerCase();
            if (extension) {
                newLanguage = languageMap[extension] || extension;
                sourceUsed = 'filepath';
                Debug.log(`SyntaxHighlighter: Language determined from filepath extension: ${extension}`, null, 2);
            }
        }

        // 2. If no language determined from filepath, try diffData.language
        if (newLanguage === 'plaintext' && sourceUsed === 'default' && runtimeProps.diffData?.language) {
            newLanguage = runtimeProps.diffData.language;
            sourceUsed = 'diffData';
            Debug.log(`SyntaxHighlighter: Language determined from diffData: ${newLanguage}`, null, 2);
        }

        // 3. If still no language, use plaintext as fallback
        if (newLanguage === 'plaintext' && sourceUsed === 'default') {
            Debug.log('SyntaxHighlighter: No language could be determined, using plaintext as fallback', null, 2);
        }

        // Only load if different from current language
        if (this.language !== newLanguage) {
            this.language = newLanguage;

            Debug.log(`SyntaxHighlighter: Setting language to ${newLanguage} (source: ${sourceUsed})`, null, 2);

            // Only load if needed and not already loaded
            if (this.highlightJsLoaded && !this.resourceLoader.loadedLanguages.has(newLanguage)) {
                Debug.log(`SyntaxHighlighter: Loading language ${newLanguage}`, null, 2);

                // Get translation manager for loading message
                const translationManager = TranslationManager.getInstance();
                const loaderManager = LoaderManager.getInstance();
                const loadingMessage = translationManager.get('loadingLanguage', 'Loading language: {0}')
                    .replace('{0}', newLanguage);

                // Try to use the main loader ID from diffViewer
                const mainLoaderId = this.diffViewer.mainLoaderId;

                if (!mainLoaderId) {
                    Debug.warn('SyntaxHighlighter: No main loader ID available from DiffViewer for language loading', null, 2);
                }

                try {
                    // Update the main loader message if available
                    if (mainLoaderId) {
                        loaderManager.updateLoaderMessage(mainLoaderId, loadingMessage);
                    }

                    // Use dynamic import to load the language on demand
                    await this.resourceLoader.loadLanguage(newLanguage);

                    // No need to hide the main loader as it's managed elsewhere
                } catch (error) {
                    Debug.error(`SyntaxHighlighter: Error loading language ${newLanguage}:`, error, 2);
                }
            } else {
                Debug.log(`SyntaxHighlighter: Language ${newLanguage} already loaded`, null, 3);
            }

            Debug.log(`SyntaxHighlighter: Language set to ${this.language}`, null, 2);
        } else {
            Debug.log(`SyntaxHighlighter: Language already set to ${this.language}`, null, 3);
        }
    }
}
