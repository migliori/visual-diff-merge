/**
 * String utility functions for the diff viewer
 */
export class StringUtils {
    /**
     * Escape HTML special characters to prevent XSS
     * @param {string} unsafe - The potentially unsafe string to escape
     * @returns {string} - HTML escaped string
     */
    static escapeHtml(unsafe) {
        if (!unsafe || typeof unsafe !== 'string') return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/\//g, "&#x2F;")
            .replace(/\\/g, "&#x5C;")
            .replace(/`/g, "&#x60;");
    }

    /**
     * Escape a string for use in an HTML attribute
     * @param {string} str - String to escape
     * @returns {string} Escaped string
     */
    static escapeAttribute(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
}
