import { StringUtils } from './StringUtils';
import { Debug } from './Debug';

/**
 * Formats merge content for various displays
 */
export class MergeContentFormatter {
    /**
     * Format merged content for preview
     * @param {string} content - Raw content to format
     * @param {string} extension - File extension
     * @param {boolean} withLineNumbers - Whether to add line numbers
     * @returns {string} Formatted HTML
     */
    static formatPreview(content, extension = '', withLineNumbers = true) {
        // Ensure we have valid content
        if (!content) {
            Debug.warn('MergeContentFormatter: Empty content for preview formatting', null, 2);
            return '<pre><code>No content available</code></pre>';
        }

        // Store original content for copy operations
        const originalContent = content;

        // Safely escape content
        const escapedContent = StringUtils.escapeHtml(content);

        // Map extension to language class for highlight.js
        const languageClass = MergeContentFormatter.getLanguageClass(extension);

        // Add data attribute for line numbers if requested
        const lineNumberAttr = withLineNumbers ? 'data-line-numbers="true"' : '';

        // Store original content in a data attribute for reliable copying
        const result = `<pre ${lineNumberAttr}><code class="${languageClass}" data-original-code="${StringUtils.escapeAttribute(originalContent)}">${escapedContent}</code></pre>`;

        // Replace console.log with Debug utility
        Debug.log('MergeContentFormatter: Preview HTML generated', { preview: result.substring(0, 150) + '...' }, 2);

        return result;
    }

    /**
     * Get language class from file extension
     * @param {string} extension - File extension
     * @returns {string} Language class for syntax highlighting
     */
    static getLanguageClass(extension = '') {
        if (!extension) {
            return '';
        }

        // Map common extensions to highlight.js language classes
        const extensionMap = {
            'js': 'javascript',
            'ts': 'typescript',
            'py': 'python',
            'rb': 'ruby',
            'java': 'java',
            'cs': 'csharp',
            'php': 'php',
            'html': 'html',
            'css': 'css',
            'json': 'json',
            'xml': 'xml',
            'yml': 'yaml',
            'yaml': 'yaml',
            'md': 'markdown',
            'sql': 'sql'
        };

        return extensionMap[extension.toLowerCase()] || extension.toLowerCase();
    }

    /**
     * Format count of unresolved conflicts
     * @param {number} count - Number of unresolved conflicts
     * @param {Object} translations - Translation strings
     * @returns {string} Formatted message
     */
    static formatUnresolvedCount(count, translations = {}) {
        if (count === 1) {
            return (translations.unresolvedChunkSingular || 'There is %COUNT% unresolved chunk remaining.')
                .replace('%COUNT%', count);
        } else {
            return (translations.unresolvedChunksPlural || 'There are %COUNT% unresolved chunks remaining.')
                .replace('%COUNT%', count);
        }
    }

    /**
     * Prepare code for highlighting
     * @param {string} code - Code to prepare
     * @returns {string} Prepared code
     */
    static prepareCode(code) {
        // Clean up line endings
        const cleanCode = code.replace(/\r\n/g, '\n');
        return cleanCode;
    }

    /**
     * Reset element highlighting state
     * @param {Element} element - Element to reset
     * @returns {string|null} Original text content or null
     */
    static resetHighlighting(element) {
        if (!element) return null;

        // Remove data-highlighted attribute
        if (element.hasAttribute('data-highlighted')) {
            element.removeAttribute('data-highlighted');
        }

        // Store the original content
        const originalText = element.textContent;

        // Reset element content
        element.textContent = originalText;

        return originalText;
    }
}
